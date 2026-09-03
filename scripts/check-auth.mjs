import fs from 'node:fs';
import { PRIVACY_POLICY_VERSION, marketingConsentAvailable } from '../src/lib/legal.js';

// Two defects this file exists to prevent, both of which were real.
//
// The first: auth existed for weeks and no learner could reach it. AuthButton
// was complete, and its only mount was Home.svelte. When the learning floor
// took over "/" on 2026-09-01, Home fell through to the final else branch of
// App.svelte and the account control went with it. Nothing failed and nothing
// warned. A build that cannot see that is the actual defect.
//
// The second is not yet a defect and these checks are how it stays that way.
// Consent under UK GDPR must be freely given, specific, informed and a positive
// act. Every one of those four is a property of code that a refactor can quietly
// remove: a checkbox gains a `checked`, an opt-in gets folded into the terms, a
// consent is written against a privacy policy that was never published. So each
// one is asserted rather than trusted to review.

let failed = false;
const check = (condition, label) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}`);
  if (!condition) failed = true;
};

const read = name => fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const exists = name => fs.existsSync(new URL(`../${name}`, import.meta.url));

const authButton = read('src/lib/components/AuthButton.svelte');
const siteNav = read('src/lib/components/SiteNav.svelte');
const signIn = read('src/views/SignIn.svelte');
const marketing = read('src/lib/marketing.js');
const consentSql = read('supabase/qubix/0004_marketing_consent.sql');
const client = read('src/lib/supabase.js');
const progress = read('src/lib/stores/progress.js');
const app = read('src/App.svelte');
const paths = read('src/lib/routes/clean-paths.js');
const vercel = JSON.parse(read('vercel.json'));
const env = read('.env.example');

// ---- Reachability. The regression that prompted this file. ----------------

check(siteNav.includes('AuthButton'),
  'the shared navigation mounts the account control');
check(authButton.includes('href="/signin"'),
  'a signed-out learner is sent to the sign-in page');
check(app.includes("params.get('mode') === 'signin'") && app.includes("import('./views/SignIn.svelte')"),
  'the sign-in page is mounted on its own route');
check(paths.includes("parts[0] === 'signin'"),
  'the /signin path resolves to the sign-in page');
check(vercel.rewrites.some(r => r.source === '/signin' && r.destination === '/index.html'),
  'Vercel serves the clean /signin route to the application');

// One form, one place. Two copies of a password field is how the reset flow
// ends up fixed on one of them.
check(!authButton.includes('signInWithPassword') && !authButton.includes('type="password"'),
  'the navigation control holds no second copy of the sign-in form');

// ---- Both routes in, and a way back from a forgotten password. ------------

check(signIn.includes('signInWithPassword') && signIn.includes('signUp('),
  'a learner can sign in with an email and password, and create that account');
check(signIn.includes("provider: 'google'"),
  'a learner can sign in with Google');
check(signIn.includes('resetPasswordForEmail'),
  'a forgotten password can be reset');
check(signIn.includes('PASSWORD_RECOVERY') && signIn.includes('updateUser'),
  'a reset link lands on a form that actually sets the new password');
check(/redirectTo:\s*`\$\{origin\(\)\}\/signin`/.test(signIn),
  'the reset link returns to the page that can handle a recovery session');

// ---- Age. Founder decisions of 2026-08-12 and 2026-09-03. -----------------

check(/I am \{MINIMUM_AGE\} or over/.test(signIn),
  'the 13+ statement is shown before an account is created');
check(!/localStorage[^\n]*age|age[^\n]*localStorage/i.test(signIn),
  'the age statement is not persisted, so a shared device is asked again');

// ---- Consent. Four properties, each one assertable. -----------------------

// Freely given: creating an account must not depend on the opt-in.
check(/if \(!ageConfirmed\)/.test(signIn) && !/if \(!wantsEmail\)/.test(signIn),
  'account creation is refused without the age statement, and never because of the email opt-in');

// A positive act: unticked by default, and never pre-set anywhere.
check(/let wantsEmail = false/.test(signIn) && /let adultConfirmed = false/.test(signIn),
  'both email checkboxes start unticked');
check(!/bind:checked=\{wantsEmail\}[^>]*checked/.test(signIn),
  'the email opt-in carries no default checked attribute');

// Specific: adults only, and the database refuses anything else.
check(/wantsEmail && adultConfirmed/.test(signIn),
  'consent is only recorded when the learner also states they are 18 or over');
check(/check \(not granted or \(granted_at is not null and adult_declared\)\)/.test(consentSql),
  'the database refuses a granted consent with no timestamp or no adult statement');

// Informed: no published policy, no offer.
check(marketing.includes('marketingConsentAvailable') && /if \(!marketingConsentAvailable\)/.test(marketing),
  'consent cannot be recorded while no privacy policy is published');
check(/\{#if marketingConsentAvailable\}/.test(signIn),
  'the opt-in is not offered while no privacy policy is published');
check(!marketingConsentAvailable || exists('public/privacy.html') || vercel.rewrites.some(r => r.source === '/privacy'),
  `a privacy policy is published, as required by PRIVACY_POLICY_VERSION = ${JSON.stringify(PRIVACY_POLICY_VERSION)}`);

// Withdrawable, at least as easily as it was given, and without erasing the
// evidence that they asked to stop.
check(marketing.includes('withdrawConsent') && authButton.includes('withdrawConsent'),
  'a learner can unsubscribe from the same menu that holds their account');
check(/granted:\s*false/.test(marketing) && /withdrawn_at:\s*new Date/.test(marketing),
  'withdrawal is recorded as a withdrawal rather than a deleted row');
check(!/grant[^\n]*delete[^\n]*marketing_consent|delete on table public\.marketing_consent to authenticated/.test(consentSql),
  'no delete grant on the consent table, so a withdrawal cannot be erased');

// Evidence: the plan asks for timestamp, source and policy version.
for (const column of ['granted_at', 'source', 'policy_version']) {
  check(consentSql.includes(column) && marketing.includes(column),
    `every consent records ${column}`);
}

// ---- The registration wall. Founder decision, 2026-09-03. ----------------

const access = read('src/lib/access.js');
const gate = read('src/lib/components/LearningGate.svelte');
const assistant = read('src/lib/components/WorkshopAssistant.svelte');
const tutorApi = read('api/tutor.js');

// Behaviour rather than pattern matching. A regex over this file asserts how it
// is written; these assert what it does, which is the thing that matters and
// the thing a rewrite can quietly change.
const store = new Map();
globalThis.localStorage = {
  getItem: key => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: key => store.delete(key)
};
const { FREE_ITEMS, canOpen, itemIdFor, openedItems, recordOpen } = await import('../src/lib/access.js');
const ids = search => itemIdFor(new URLSearchParams(search));

check(FREE_ITEMS === 3, 'a signed-out visitor may open three items');
check(app.includes('<LearningGate') && app.includes('itemIdFor(params)'),
  'missions and reader sessions are gated at the route, not per view');

check(ids('mode=game&mission=shared-book&chapter=3&session=2') === 'read:3.2'
  && ids('mode=game&mission=shared-book') === null,
  'each reading session counts separately, so the book is not one free item');
check(['foundations', 'store', 'role-game'].every(hub => ids(`mode=game&mission=${hub}`) === null)
  && ids('mode=start') === null,
  'hubs and maps stay open, so a visitor can still see where they would be going');
check(ids('mode=game&mission=checkout') === 'mission:checkout',
  'a mission is one item');

for (const id of ['mission:a', 'mission:b', 'mission:c']) { recordOpen(id); }
check(openedItems().length === 3, 'three opens are counted');
check(canOpen('mission:a'), 'returning to something already opened does not spend another item');
check(!canOpen('mission:d'), 'a fourth, unseen item meets the wall');
recordOpen('mission:d');
check(openedItems().length === 3, 'the wall cannot be walked past by recording another open');

// A private window, or a browser set to block site data, must read a lesson
// rather than meet a wall that signing in would not remove either.
globalThis.localStorage = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('blocked'); },
  removeItem() { throw new Error('blocked'); }
};
check(openedItems().length === 0 && canOpen('mission:anything'),
  'blocked storage fails open rather than walling a private window');
check(gate.includes("state = 'checking'") || /let state = 'checking'/.test(gate),
  'the wall waits for the session before deciding, so it cannot flash at a signed-in learner');
check(gate.includes('clearAllowance'),
  'signing in clears the allowance rather than leaving a spent counter behind');

// The gate that actually enforces. The wall above is a conversion device.
check(/export async function verifyLearner/.test(tutorApi)
  && /mode === 'learner' && !\(await verifyLearner\(req\)\)/.test(tutorApi),
  'the tutor refuses an unauthenticated learner question server-side');
check(tutorApi.indexOf('questionIsInScope(mode, question, context, sources)') < tutorApi.indexOf('await verifyLearner(req)'),
  'the free scope gate runs before the session check, so off-topic costs nothing');
check(/Authorization: `Bearer \$\{token\}`/.test(assistant) && /auth\.getSession\(\)/.test(assistant),
  'the assistant sends the session token and lets the server decide');
check(assistant.includes('localResponse') && assistant.includes('requiresSignIn'),
  'the deterministic assistant still answers when the model needs an account');

// ---- Credentials. The browser may only ever hold the anon key. ------------

check(client.includes('VITE_SUPABASE_ANON_KEY') && !/service_role|SERVICE_ROLE/.test(client),
  'the browser client is built from the anon key alone');
check(!/service_role|SERVICE_ROLE/.test(authButton + siteNav + progress + signIn + marketing),
  'no service-role credential appears in any browser component');
check(env.includes('VITE_SUPABASE_URL=') && env.includes('VITE_SUPABASE_ANON_KEY='),
  'the public Supabase variables stay documented');
check(progress.includes('learner_progress') && progress.includes('onAuthStateChange'),
  'progress syncs to the learner_progress table when the session changes');

console.log(failed
  ? '\nAuth checks failed\n'
  : `\nsign-in is reachable and recoverable; consent is optional, adult-only, withdrawable${marketingConsentAvailable ? '' : ' and not yet offered'}\n`);
process.exit(failed ? 1 : 0);
