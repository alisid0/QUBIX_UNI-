import fs from 'node:fs';

// Auth existed in this repository for weeks and no learner could reach it.
//
// AuthButton.svelte was complete: Google OAuth, the 13+ statement, sign out and
// account deletion. Its only mount was Home.svelte. When the learning floor took
// over "/" on 2026-09-01, Home fell through to the final {:else} branch of
// App.svelte and the sign-in control went with it. Nothing failed, nothing
// warned, and the site shipped for two days with an account system nobody could
// open.
//
// A build that cannot see that is the actual defect, so these checks assert the
// two things that were silently untrue: that the control is mounted somewhere a
// learner passes through, and that the credential stays a public anon key.

let failed = false;
const check = (condition, label) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}`);
  if (!condition) failed = true;
};

const read = name => fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');

const authButton = read('src/lib/components/AuthButton.svelte');
const siteNav = read('src/lib/components/SiteNav.svelte');
const client = read('src/lib/supabase.js');
const progress = read('src/lib/stores/progress.js');
const env = read('.env.example');

// The regression that prompted this file.
check(siteNav.includes('AuthButton'),
  'the shared navigation mounts the account control');
check(/import\s+AuthButton\s+from\s+'\.\/AuthButton\.svelte'/.test(siteNav),
  'the navigation imports the one account component rather than a copy');

// Both sign-in routes the founder asked for.
check(authButton.includes('signInWithPassword') && authButton.includes('signUp('),
  'a learner can sign in with an email and password, and create that account');
check(authButton.includes("provider: 'google'"),
  'a learner can sign in with Google');

// A password route without a way back is a support queue, not a feature.
check(authButton.includes('resetPasswordForEmail'),
  'a forgotten password can be reset');
check(authButton.includes('PASSWORD_RECOVERY') && authButton.includes('updateUser'),
  'a reset link lands on a form that actually sets the new password');

// Founder decision, 2026-08-12. Stated before an account exists, not filed in a
// document somewhere.
check(/13 or over/.test(authButton),
  'the 13+ statement is shown before an account is created');
check(!/localStorage[^\n]*age|age[^\n]*localStorage/i.test(authButton),
  'the age statement is not persisted, so a shared device is asked again');

// Deletion has to remain reachable: both app stores require it.
check(authButton.includes('fulfil_my_account_deletion'),
  'a learner can still delete the account and its progress');

// Telling someone which addresses are registered is a disclosure, not a courtesy.
check(/If that email has an account/.test(authButton),
  'the reset reply does not reveal whether an address is registered');

// The browser may only ever hold the anon key.
check(client.includes('VITE_SUPABASE_ANON_KEY') && !/service_role|SERVICE_ROLE/.test(client),
  'the browser client is built from the anon key alone');
check(!/service_role|SERVICE_ROLE/.test(authButton + siteNav + progress),
  'no service-role credential appears in any browser component');
check(env.includes('VITE_SUPABASE_URL=') && env.includes('VITE_SUPABASE_ANON_KEY='),
  'the public Supabase variables stay documented');

// Signing in is what makes progress follow a learner between devices.
check(progress.includes('learner_progress') && progress.includes('onAuthStateChange'),
  'progress syncs to the learner_progress table when the session changes');

console.log(failed
  ? '\nAuth checks failed\n'
  : '\nsign-in is reachable, recoverable and keyed only with the public anon key\n');
process.exit(failed ? 1 : 0);
