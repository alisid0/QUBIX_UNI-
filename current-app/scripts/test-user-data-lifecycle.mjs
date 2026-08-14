// test-user-data-lifecycle.mjs — complements scripts/test-rls-isolation.mjs.
//
// test-rls-isolation.mjs (Codex) proves user A cannot reach user B's rows
// across seven user_* tables. This file covers the gaps found in the
// 2026-07-21 security audit, which that test does not reach:
//
//   F-03  internal_username derived from the email local-part
//   F-04  issue_reports accepted unauthenticated inserts
//   F-05  storage objects do not cascade on account deletion
//   F-06  ON DELETE SET NULL leaves a device fingerprint on issue_reports
//   F-07  issue report details are editable after submission
//
// Every check is a regression test for a specific finding. If a check fails,
// the finding is still open in the database you pointed this at.
//
// RUN:
//   node --env-file=.env.staging.local scripts/test-user-data-lifecycle.mjs --staging
//
// Exits non-zero on any failure. All created identities, reports and storage
// objects are removed in a finally block that runs even if creation or any
// intermediate assertion throws.
//
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (setup, teardown and neutral
// verification only — never used for the assertions themselves), SUPABASE_ANON_KEY
// (the key a real browser holds). VITE_-prefixed variants accepted as fallback.
// Optional: QUBIX_STAGING_HOST to pin the expected staging host explicitly.

// NOTE: @supabase/supabase-js is imported dynamically after the guard block,
// not statically here. ESM hoists static imports above all other code, so a
// missing or broken node_modules would crash this file before the production
// guard runs. A safety check that an unrelated dependency failure can skip is
// not a safety check.
import { readFileSync } from 'node:fs';

const URL_ = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!URL_ || !SERVICE || !ANON) {
  console.error('Missing env. Need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY.');
  console.error('Run: node --env-file=.env.staging.local scripts/test-user-data-lifecycle.mjs --staging');
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Environment guard — fail closed
// ---------------------------------------------------------------------------
// This script creates and deletes accounts. Four gates, all must pass:
//
//   1. --staging passed explicitly.
//   2. Target host resolves and is parseable.
//   3. Target host !== the production host in .env.production.
//   4. Target host === the expected staging host.
//
// Gate 4 is not redundant with gate 3. Gate 3 only proves "not production";
// a typo, a stale shell variable or a third Supabase project would still pass
// it. Gate 4 pins the target to one known host.
//
// On circularity: when run as documented with --env-file=.env.staging.local,
// SUPABASE_URL and the expected host come from the same file, so gate 4 is
// trivially satisfied. That is intended — it guards the realistic accident,
// which is SUPABASE_URL being overridden on the command line or inherited from
// a shell that was pointed somewhere else. Set QUBIX_STAGING_HOST to pin it
// independently of whatever env file is loaded.
//
// RLS_ALLOW_PROD is deliberately NOT honoured. Verify production isolation with
// read-only checks, never by creating and deleting accounts in it.

const normaliseHost = (u) => {
  // The repo is edited on Windows via OneDrive, so env files carry CRLF. A
  // trailing \r makes raw string comparison differ and silently passes the
  // guard — an earlier version of this file did exactly that. Compare parsed
  // hostnames instead, immune to line endings, trailing slashes, quotes, case.
  const cleaned = String(u ?? '').replace(/[\r\n]/g, '').trim().replace(/^['"]|['"]$/g, '');
  if (!cleaned) return '';
  try {
    return new globalThis.URL(cleaned).host.toLowerCase();
  } catch (_) {
    return cleaned.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  }
};

function readEnvValue(file, key) {
  try {
    const contents = readFileSync(new globalThis.URL(file, import.meta.url), 'utf8');
    const line = contents.split(/\r?\n/).find((l) => l.startsWith(`${key}=`));
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

const targetHost = normaliseHost(URL_);
if (!targetHost) {
  console.error('Refusing to run: could not parse a hostname from SUPABASE_URL.');
  process.exit(2);
}

const productionRaw = readEnvValue('../.env.production', 'VITE_SUPABASE_URL');
if (!productionRaw) {
  console.error('Refusing to run: could not read VITE_SUPABASE_URL from .env.production.');
  console.error('Without it, "this is not production" cannot be confirmed.');
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
if (targetHost !== stagingHost) {
  console.error('REFUSING TO RUN: target is not the configured staging host.');
  console.error(`  target:   ${targetHost}`);
  console.error(`  expected: ${stagingHost}`);
  process.exit(2);
}

// --- Guards passed. Only now load the client library. ----------------------

let createClient;
try {
  ({ createClient } = await import('@supabase/supabase-js'));
} catch (e) {
  console.error('Could not load @supabase/supabase-js. Run `pnpm install` first.');
  console.error(e.message);
  process.exit(2);
}

const admin = createClient(URL_, SERVICE, { auth: { autoRefreshToken: false, persistSession: false } });

let failures = 0;
let checks = 0;
const ok = (m) => { checks++; console.log(`  ok    ${m}`); };
const fail = (m, detail) => {
  checks++; failures++;
  console.log(`  FAIL  ${m}`);
  if (detail) console.log(`        ${detail}`);
};
const assert = (cond, m, detail) => (cond ? ok(m) : fail(m, detail));

const stamp = Date.now();
const PASSWORD = `Lifecycle!test-${stamp}`;
const emailFor = (who) => `lifecycle-${who}-${stamp}@rls-test.example.com`;

// ---------------------------------------------------------------------------
// Cleanup registry — everything created is registered immediately, so the
// finally block can remove it even if the next line throws.
// ---------------------------------------------------------------------------
const created = { userIds: [], reportIds: [], storagePaths: [] };

async function makeUser(who) {
  const email = emailFor(who);
  const { data, error } = await admin.auth.admin.createUser({
    email, password: PASSWORD, email_confirm: true
  });
  if (error) throw new Error(`createUser ${who}: ${error.message}`);
  created.userIds.push(data.user.id);
  return { id: data.user.id, email, localPart: email.split('@')[0] };
}

async function clientFor(email) {
  const c = createClient(URL_, ANON, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await c.auth.signInWithPassword({ email, password: PASSWORD });
  if (error) throw new Error(`signIn ${email}: ${error.message}`);
  return c;
}

/**
 * Assert that an update was BLOCKED.
 *
 * An update that RLS filters out returns no error and no rows — the absence of
 * an error proves nothing on its own. Two independent confirmations:
 *   1. .select() returns zero affected rows.
 *   2. The service client re-reads the row and the protected value is unchanged.
 * Both must hold. (2) is the one that matters: it is the ground truth, read
 * through a client that bypasses RLS entirely.
 */
async function assertUpdateBlocked({ client, table, id, patch, column, expected, label }) {
  const { data, error } = await client.from(table).update(patch).eq('id', id).select();

  const rowsAffected = Array.isArray(data) ? data.length : (data ? 1 : 0);
  const blockedAtApi = !!error || rowsAffected === 0;

  const { data: after, error: readErr } = await admin
    .from(table).select(column).eq('id', id).maybeSingle();

  if (readErr) {
    fail(`${label} — could not verify via service client`, readErr.message);
    return;
  }
  if (!after) {
    fail(`${label} — row vanished; cannot verify`, 'expected the row to still exist');
    return;
  }

  const unchanged = after[column] === expected;

  assert(
    blockedAtApi && unchanged,
    label,
    !unchanged
      ? `VALUE CHANGED: ${table}.${column} is now ${JSON.stringify(after[column])}, expected ${JSON.stringify(expected)}`
      : `update reported ${rowsAffected} affected row(s) with no error`
  );
}

/**
 * Assert that an issue-report insert was blocked using the service client as
 * ground truth. PostgREST can reject the requested representation after an
 * insert has already succeeded, so the caller's error/data response alone is
 * not reliable evidence that no row was written.
 */
async function assertIssueReportInsertBlocked({ client, row, label }) {
  const { error: insertError } = await client.from('issue_reports').insert(row);
  const { data: persisted, error: readError } = await admin
    .from('issue_reports')
    .select('id')
    .eq('message', row.message);

  if (readError) {
    fail(`${label} — could not verify via service client`, readError.message);
    return;
  }

  const rows = Array.isArray(persisted) ? persisted : [];
  rows.forEach((persistedRow) => {
    if (persistedRow?.id && !created.reportIds.includes(persistedRow.id)) {
      created.reportIds.push(persistedRow.id);
    }
  });

  assert(
    rows.length === 0,
    label,
    `insert wrote ${rows.length} row(s)${insertError ? ` despite client error: ${insertError.message}` : ''}`
  );
}

async function main() {
  console.log(`\nTarget:  ${targetHost}`);
  console.log(`Staging: ${stagingHost} (matched)`);
  console.log('Guards:  --staging present, host != production, host == staging\n');

  const A = await makeUser('a');
  const B = await makeUser('b');
  const clientA = await clientFor(A.email);
  const clientB = await clientFor(B.email);

  // -------------------------------------------------------------------------
  console.log('F-03 — usernames must not encode the email local-part');
  // -------------------------------------------------------------------------
  {
    const { data } = await admin
      .from('user_profiles').select('internal_username').eq('user_id', A.id).maybeSingle();
    const uname = data?.internal_username || '';
    assert(
      uname && !uname.startsWith(A.localPart),
      'internal_username is not derived from the email local-part',
      `got "${uname}" for local-part "${A.localPart}"`
    );
  }

  // -------------------------------------------------------------------------
  console.log('\nF-04 — issue_reports must reject unauthenticated inserts');
  // -------------------------------------------------------------------------
  {
    const anonClient = createClient(URL_, ANON, { auth: { persistSession: false } });
    await assertIssueReportInsertBlocked({
      client: anonClient,
      row: { category: 'bug', message: `anonymous insert probe ${stamp}` },
      label: 'anonymous insert into issue_reports is rejected'
    });
  }
  {
    await assertIssueReportInsertBlocked({
      client: clientA,
      row: {
        user_id: B.id,
        category: 'bug',
        message: `spoofed attribution probe ${stamp}`
      },
      label: 'user A cannot insert an issue_report attributed to user B'
    });
  }

  // -------------------------------------------------------------------------
  console.log('\nF-07 — report details must be immutable after submission');
  // -------------------------------------------------------------------------
  const ORIGINAL_MESSAGE = `original message from B ${stamp}`;
  let reportIdB = null;
  {
    const { data, error } = await clientB.from('issue_reports').insert({
      user_id: B.id,
      category: 'bug',
      message: ORIGINAL_MESSAGE,
      route: '/reader',
      user_agent: 'lifecycle-test-agent',
      screenshot_path: `${B.id}/placeholder.png`,
      viewport: { width: 390, height: 844, devicePixelRatio: 3 },
      metadata: { probe: true, stamp }
    }).select('id').single();

    if (error) {
      fail('user B could not create a baseline report', error.message);
    } else {
      reportIdB = data.id;
      created.reportIds.push(reportIdB);
      ok('user B created a baseline report');

      await assertUpdateBlocked({
        client: clientB, table: 'issue_reports', id: reportIdB,
        patch: { message: 'edited after submission' },
        column: 'message', expected: ORIGINAL_MESSAGE,
        label: 'user B cannot edit their own report message after submission'
      });

      await assertUpdateBlocked({
        client: clientB, table: 'issue_reports', id: reportIdB,
        patch: { status: 'fixed' },
        column: 'status', expected: 'open',
        label: 'user B cannot set an arbitrary status (only "closed")'
      });

      await assertUpdateBlocked({
        client: clientA, table: 'issue_reports', id: reportIdB,
        patch: { message: 'A editing B' },
        column: 'message', expected: ORIGINAL_MESSAGE,
        label: "user A cannot edit user B's report"
      });
    }
  }

  // -------------------------------------------------------------------------
  console.log('\nF-05 / F-06 — deletion must remove storage and strip fingerprints');
  // -------------------------------------------------------------------------
  {
    const objectPath = `${B.id}/${stamp}-probe.txt`;
    const { error: upErr } = await clientB.storage
      .from('issue-screenshots')
      .upload(objectPath, new Blob(['probe'], { type: 'text/plain' }));

    if (!upErr) created.storagePaths.push(objectPath);
    assert(!upErr, 'user B can upload a screenshot to their own folder', upErr?.message);

    const { error: crossReadErr } = await clientA.storage
      .from('issue-screenshots').download(objectPath);
    assert(!!crossReadErr, "user A cannot download user B's screenshot",
      crossReadErr ? undefined : 'download SUCCEEDED — storage policy is open');

    // Exercise the same full deletion path as the app. The Edge Function first
    // removes private Storage objects, then calls the relational-data RPC, and
    // finally removes the auth identity with its service-role client.
    const { error: delErr } = await clientB.functions.invoke('delete-account', {
      body: { confirm: 'DELETE MY ACCOUNT' },
    });
    assert(!delErr, 'delete-account Edge Function completed', delErr?.message);

    if (!delErr) {

      // F-05 — the storage object must be gone, not orphaned.
      const { data: listed } = await admin.storage
        .from('issue-screenshots').list(B.id, { limit: 100 });
      const remaining = listed?.length ?? 0;
      if (remaining === 0) created.storagePaths = created.storagePaths.filter((p) => !p.startsWith(`${B.id}/`));
      assert(remaining === 0,
        'F-05: screenshots are removed on account deletion',
        `${remaining} object(s) still present under ${B.id}/`);

      // F-06 — a surviving report must carry no fingerprint of any kind.
      if (reportIdB) {
        const { data: row } = await admin
          .from('issue_reports')
          .select('user_id, user_agent, screenshot_path, viewport, metadata')
          .eq('id', reportIdB).maybeSingle();

        if (!row) {
          ok('report was deleted outright (acceptable — no fingerprint can remain)');
          created.reportIds = created.reportIds.filter((r) => r !== reportIdB);
        } else {
          const isEmptyObject = (v) =>
            v === null || (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0);

          assert(row.user_id === null,
            'F-06: surviving report has null user_id',
            `user_id still ${JSON.stringify(row.user_id)}`);
          assert(row.user_agent === null,
            'F-06: surviving report has null user_agent',
            `user_agent still ${JSON.stringify(row.user_agent)}`);
          assert(row.screenshot_path === null,
            'F-06: surviving report has null screenshot_path',
            `screenshot_path still ${JSON.stringify(row.screenshot_path)}`);
          assert(isEmptyObject(row.viewport),
            'F-06: surviving report has cleared viewport',
            `viewport still ${JSON.stringify(row.viewport)} — screen dimensions are a fingerprint`);
          assert(isEmptyObject(row.metadata),
            'F-06: surviving report has cleared metadata',
            `metadata still ${JSON.stringify(row.metadata)} — arbitrary client data`);
        }
      }

      const { data: stillThere } = await admin.auth.admin.getUserById(B.id);
      if (!stillThere?.user) created.userIds = created.userIds.filter((id) => id !== B.id);
      assert(!stillThere?.user,
        'auth identity is removed, not just the learning data',
        stillThere?.user ? 'auth.users row survives — this is not full deletion' : undefined);
    }
  }
}

/**
 * Remove everything this run created. Runs in finally, so it must tolerate
 * partial state: resources that were never created, already deleted by the
 * test itself, or left behind by a throw mid-assertion.
 */
async function cleanup() {
  const problems = [];

  for (const path of created.storagePaths) {
    try {
      const { error } = await admin.storage.from('issue-screenshots').remove([path]);
      if (error) problems.push(`storage ${path}: ${error.message}`);
    } catch (e) { problems.push(`storage ${path}: ${e.message}`); }
  }

  for (const id of created.reportIds) {
    try {
      const { error } = await admin.from('issue_reports').delete().eq('id', id);
      if (error) problems.push(`report ${id}: ${error.message}`);
    } catch (e) { problems.push(`report ${id}: ${e.message}`); }
  }

  for (const id of created.userIds) {
    try {
      const { error } = await admin.auth.admin.deleteUser(id);
      // "not found" is success here — the test may have deleted it already.
      if (error && !/not found|does not exist/i.test(error.message)) {
        problems.push(`user ${id}: ${error.message}`);
      }
    } catch (e) { problems.push(`user ${id}: ${e.message}`); }
  }

  // Belt and braces: anything this run left behind, matched by its stamp.
  try {
    await admin.from('issue_reports').delete().like('message', `%${stamp}%`);
  } catch (_) { /* best effort */ }

  if (problems.length) {
    console.log('\nCLEANUP INCOMPLETE — remove these manually:');
    problems.forEach((p) => console.log(`  - ${p}`));
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Cleanup is guaranteed: it runs whether main() completes, asserts, or throws.
// ---------------------------------------------------------------------------
let aborted = null;
try {
  await main();
} catch (e) {
  aborted = e;
} finally {
  const clean = await cleanup();
  if (!clean) failures++;
}

if (aborted) {
  console.error(`\nAborted: ${aborted.message}`);
  console.error('Cleanup ran. Check the report above for anything left behind.');
  process.exit(1);
}

console.log(`\n${checks - failures}/${checks} checks passed`);
if (failures) {
  console.log(`${failures} FAILURE(S) — findings remain open in this database.\n`);
  process.exit(1);
}
console.log('All lifecycle checks passed.\n');
