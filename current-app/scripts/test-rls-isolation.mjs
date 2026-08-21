// test-rls-isolation.mjs — the launch security gate.
//
// Proves Row Level Security actually isolates users: creates two throwaway
// accounts (A and B), seeds a row in every user-data table for B, then, acting
// as A with a normal anon-key session (exactly what a real client uses),
// asserts A can never read, insert-as, update, or delete B's data — across all
// nine tables — and that export_my_data()/delete_my_account() are correctly
// self-scoped. Cleans up both accounts at the end.
//
// Run against STAGING first (after migrations 0004 + 0005 are applied):
//   node --env-file=.env.staging.local scripts/test-rls-isolation.mjs --staging
// This destructive test is staging-only. Exits non-zero on any failure.
//
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (setup/teardown + neutral
// verification only — never used for the RLS assertions themselves), and
// SUPABASE_ANON_KEY (the key real clients hold). VITE_-prefixed variants are
// accepted as fallbacks. Optional: QUBIX_STAGING_HOST to pin the expected
// staging host independently of the loaded env file.
import { readFileSync } from 'node:fs';

const URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!URL || !SERVICE || !ANON) {
  console.error('Missing env. Need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY.');
  console.error('Run with: node --env-file=.env.staging.local scripts/test-rls-isolation.mjs --staging');
  process.exit(2);
}

// This script creates and deletes accounts. Fail closed unless all four gates
// pass: explicit staging intent, a parseable target, target != production, and
// target == the configured staging host. RLS_ALLOW_PROD is deliberately not
// supported; production isolation must be verified with non-destructive checks.
const normaliseHost = (value) => {
  const cleaned = String(value ?? '').replace(/[\r\n]/g, '').trim().replace(/^['"]|['"]$/g, '');
  if (!cleaned) return '';
  try {
    return new globalThis.URL(cleaned).host.toLowerCase();
  } catch (_) {
    try {
      return new globalThis.URL(`https://${cleaned}`).host.toLowerCase();
    } catch (_) {
      return '';
    }
  }
};

function readEnvValue(file, key) {
  try {
    const contents = readFileSync(new globalThis.URL(file, import.meta.url), 'utf8');
    const line = contents.split(/\r?\n/).find((entry) => entry.startsWith(`${key}=`));
    return line ? line.slice(key.length + 1) : null;
  } catch (_) {
    return null;
  }
}

if (!process.argv.includes('--staging')) {
  console.error('Refusing to run without an explicit --staging flag.');
  console.error('This script creates and deletes accounts. It must never target production.');
  process.exit(2);
}

const targetHost = normaliseHost(URL);
if (!targetHost) {
  console.error('Refusing to run: could not parse a hostname from SUPABASE_URL.');
  process.exit(2);
}

const productionRaw = readEnvValue('../.env.production', 'VITE_SUPABASE_URL');
if (!productionRaw) {
  console.error('Refusing to run: could not read VITE_SUPABASE_URL from .env.production.');
  process.exit(2);
}
if (targetHost === normaliseHost(productionRaw)) {
  console.error('REFUSING TO RUN: target matches the production Supabase host.');
  console.error(`  target: ${targetHost}`);
  process.exit(2);
}

const stagingRaw =
  process.env.QUBIX_STAGING_HOST || readEnvValue('../.env.staging.local', 'VITE_SUPABASE_URL');
if (!stagingRaw) {
  console.error('Refusing to run: no expected staging host available.');
  console.error('Set QUBIX_STAGING_HOST, or provide .env.staging.local with VITE_SUPABASE_URL.');
  process.exit(2);
}
const stagingHost = normaliseHost(stagingRaw);
if (!stagingHost || targetHost !== stagingHost) {
  console.error('REFUSING TO RUN: target is not the configured staging host.');
  console.error(`  target:   ${targetHost}`);
  console.error(`  expected: ${stagingHost || '(invalid)'}`);
  process.exit(2);
}

let createClient;
try {
  ({ createClient } = await import('@supabase/supabase-js'));
} catch (e) {
  console.error('Could not load @supabase/supabase-js. Run `pnpm install` first.');
  console.error(e.message);
  process.exit(2);
}

const admin = createClient(URL, SERVICE, { auth: { autoRefreshToken: false, persistSession: false } });

let failures = 0;
const ok = (m) => console.log(`  ok    ${m}`);
const fail = (m) => { console.log(`  FAIL  ${m}`); failures++; };
const assert = (cond, m) => (cond ? ok(m) : fail(m));

const stamp = Date.now();
const mkEmail = (who) => `rls-test-${who}-${stamp}@rls-test.example.com`;
const PASSWORD = `Rls!test-${stamp}`;

// One representative row per user table. Composite-PK tables (board/path/daily)
// have no id; the rest use a uuid id. user_profiles is auto-created by trigger.
const now = new Date().toISOString();
const TABLES = [
  { t: 'user_board_progress',      row: (uid) => ({ user_id: uid, bbid: 900001 }) },
  { t: 'user_path_progress',       row: (uid) => ({ user_id: uid, path_id: 'RLS_TEST_PATH' }) },
  { t: 'user_quiz_attempts',       row: (uid) => ({ user_id: uid, path_id: 'RLS_TEST_PATH', score: 1, total: 2 }) },
  { t: 'user_workshop_attempts',   row: (uid) => ({ user_id: uid, module_id: 'rls-test', score: 1, total: 2 }) },
  { t: 'user_w_events',            row: (uid) => ({ user_id: uid, event_type: 'rls_test', event_ref: `ref-${stamp}`, amount: 1 }) },
  { t: 'user_daily_activity',      row: (uid) => ({ user_id: uid, activity_date: '2020-01-01' }) },
  { t: 'user_engagement_sessions', row: (uid) => ({ user_id: uid, started_at: now, ended_at: now }) },
];

async function makeUser(who) {
  const email = mkEmail(who);
  const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
  if (error) throw new Error(`createUser ${who}: ${error.message}`);
  return { id: data.user.id, email };
}

async function clientFor(email) {
  const c = createClient(URL, ANON, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await c.auth.signInWithPassword({ email, password: PASSWORD });
  if (error) throw new Error(`signIn ${email}: ${error.message}`);
  return c;
}

async function run() {
  console.log('RLS isolation test\n');
  let A, B, aClient, bClient;

  try {
    A = await makeUser('a');
    B = await makeUser('b');
    aClient = await clientFor(A.email);
    bClient = await clientFor(B.email);
    ok(`created + signed in two users (A=${A.id.slice(0, 8)}, B=${B.id.slice(0, 8)})`);

    // Seed one B-owned row per table via service role (bypasses RLS for setup).
    for (const { t, row } of TABLES) {
      const { error } = await admin.from(t).insert(row(B.id));
      if (error) fail(`seed B.${t}: ${error.message}`);
    }

    // ---- profile auto-creation + isolation ----
    {
      const aSelf = await aClient.from('user_profiles').select('user_id');
      assert(!aSelf.error && aSelf.data?.length === 1 && aSelf.data[0].user_id === A.id,
        'user_profiles: A sees exactly its own auto-created profile');
      const aSeesB = await aClient.from('user_profiles').select('user_id').eq('user_id', B.id);
      assert(!aSeesB.error && (aSeesB.data?.length || 0) === 0,
        'user_profiles: A cannot read B\'s profile');
    }

    // ---- per-table CRUD isolation as A ----
    for (const { t, row } of TABLES) {
      // SELECT: A must not see B's row.
      const sel = await aClient.from(t).select('user_id').eq('user_id', B.id);
      assert(!sel.error && (sel.data?.length || 0) === 0, `${t}: A cannot SELECT B's rows`);

      // INSERT-as-B: with-check must reject a row owned by B.
      const ins = await aClient.from(t).insert(row(B.id)).select();
      assert(ins.error || (ins.data?.length || 0) === 0, `${t}: A cannot INSERT a row owned by B`);

      // UPDATE B's row: must affect nothing.
      const upd = await aClient.from(t).update({ user_id: B.id }).eq('user_id', B.id).select();
      assert(!upd.error && (upd.data?.length || 0) === 0, `${t}: A's UPDATE of B's rows affects nothing`);

      // DELETE B's row: must affect nothing (verify via admin the row survives).
      await aClient.from(t).delete().eq('user_id', B.id);
      const survive = await admin.from(t).select('user_id').eq('user_id', B.id);
      assert(!survive.error && (survive.data?.length || 0) >= 1, `${t}: A cannot DELETE B's rows`);

      // Own-row INSERT + SELECT must succeed for A.
      const own = await aClient.from(t).insert(row(A.id)).select();
      assert(!own.error && (own.data?.length || 0) === 1, `${t}: A can write + read its own row`);
    }

    // ---- export_my_data is self-scoped ----
    {
      const { data, error } = await aClient.rpc('export_my_data');
      if (error) { fail(`export_my_data: ${error.message}`); }
      else {
        assert(data?.user_id === A.id, 'export_my_data: returns A\'s user_id');
        const leaked = JSON.stringify(data || {}).includes(B.id);
        assert(!leaked, 'export_my_data: contains no trace of B');
      }
    }

    // ---- delete_my_account is self-scoped ----
    {
      const { error } = await aClient.rpc('delete_my_account');
      assert(!error, 'delete_my_account: A can delete itself');
      // A's auth identity should be gone...
      const goneA = await admin.auth.admin.getUserById(A.id);
      assert(goneA.error || !goneA.data?.user, 'delete_my_account: A\'s auth identity removed');
      // ...its cascade cleared A's data...
      const aData = await admin.from('user_board_progress').select('user_id').eq('user_id', A.id);
      assert(!aData.error && (aData.data?.length || 0) === 0, 'delete_my_account: A\'s data cascade-deleted');
      // ...and B is completely untouched.
      const bStillThere = await admin.from('user_board_progress').select('user_id').eq('user_id', B.id);
      assert(!bStillThere.error && (bStillThere.data?.length || 0) >= 1, 'delete_my_account: B\'s data untouched');
      A = null; // already deleted; skip teardown for A
    }
  } catch (e) {
    fail(`unexpected: ${e.message}`);
  } finally {
    // Teardown: remove whichever test users remain (cascades their data).
    for (const u of [A, B]) {
      if (u?.id) { try { await admin.auth.admin.deleteUser(u.id); } catch (_) {} }
    }
  }

  console.log(`\n${failures === 0 ? 'PASS — RLS isolation holds.' : `FAIL — ${failures} isolation problem(s).`}`);
  process.exit(failures === 0 ? 0 : 1);
}

run();
