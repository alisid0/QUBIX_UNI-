# Qubix sign-in

Status: implementation architecture. This document does not approve or release
curriculum.

Learners sign in two ways, both against the same Supabase project: an email
address with a password, or Google. Signing in is optional. Everything on the
site works without an account; the only thing an account buys is progress that
follows the learner between devices, written to `learner_progress`.

## What the application already does

| Piece | Where |
|---|---|
| Sign in, create account, reset, recovery, Google | `src/views/SignIn.svelte` at `/signin` |
| Account menu, sign out, unsubscribe, delete | `src/lib/components/AuthButton.svelte` |
| Mounted for every hub screen | `src/lib/components/SiteNav.svelte` |
| Browser client, PKCE, session persistence | `src/lib/supabase.js` |
| Progress sync on session change | `src/lib/stores/progress.js` |
| Marketing consent read and write | `src/lib/marketing.js` |
| Policy version gate | `src/lib/legal.js` |
| Tables, row-level security, deletion | `supabase/qubix/000{1,2,3,4}_*.sql` |
| Build guard | `scripts/check-auth.mjs` (`npm run check:auth`) |

The form lives on `/signin` only. The navigation holds a link, not a second
copy, and `check-auth.mjs` fails the build if a password field reappears in the
navigation component: two copies is how a reset flow ends up fixed on one of
them.

The 13+ statement appears before an account is created. It is a founder
decision of 2026-08-12, it is not verification, and it is deliberately not
persisted so a shared device is asked again.

## The state this replaces

`VITE_SUPABASE_URL` pointed at `wmetdmfsniqrshuaoodc.supabase.co`, which no
longer resolves in DNS. A paused Supabase project still answers; a deleted one
stops resolving. That project is gone and its user records with it, so the steps
below build a new one rather than trying to reconnect the old.

## 1 · Create the Supabase project

In the Supabase dashboard, create a project. Note the project URL
(`https://<ref>.supabase.co`) and the **anon public** key from
*Project Settings → API*.

Never copy the `service_role` key into this repository, Vercel's client
variables, or a chat. `scripts/check-auth.mjs` fails the build if it appears in
a browser component.

## 2 · Create the tables

In *SQL Editor*, run these three files in order, whole and unedited:

```text
supabase/qubix/0001_account_deletion_requests.sql
supabase/qubix/0002_learning_progress.sql
supabase/qubix/0003_fulfil_account_deletion.sql
supabase/qubix/0004_marketing_consent.sql
```

They create `learner_progress` and `account_deletion_requests`, enable row-level
security so a learner can reach only their own row, and add
`fulfil_my_account_deletion()`, which erases the caller's progress and auth user.
Deletion has to work: both app stores require it.

## 3 · Switch on email and password

*Authentication → Providers → Email*: enable it, and leave **Confirm email**
on. The application expects confirmation to be required. It tells a new learner
to open the link rather than pretending they are signed in, because `signUp`
returns a user but no session while confirmation is pending.

*Authentication → URL Configuration*:

```text
Site URL       https://qubix.university
Redirect URLs  https://qubix.university/**
               https://*-ali-s-projectz.vercel.app/**
               http://localhost:8000/**
```

The middle line lets Vercel preview deployments sign in. The last matches the
dev server port in `vite.config.js`. Password reset and email confirmation both
return to these URLs, so a missing entry shows up as a link that opens the site
signed out with no explanation.

## 4 · Switch on Google

In the Google Cloud console:

1. Create or select a project.
2. *APIs and Services → OAuth consent screen*. External. App name
   `Qubix University`, your support email, and `qubix.university` as an
   authorised domain.
3. *Credentials → Create credentials → OAuth client ID → Web application*.
4. Authorised JavaScript origins: `https://qubix.university`
5. Authorised redirect URIs: `https://<ref>.supabase.co/auth/v1/callback`

Copy the client ID and client secret into *Supabase → Authentication →
Providers → Google* and enable it.

The redirect URI is Supabase's callback, not a Qubix route. Pointing it at
`qubix.university` is the usual first mistake and produces
`redirect_uri_mismatch`.

While the consent screen is in **Testing**, only accounts listed as test users
can sign in. Publishing it is a Google review step, so do it before a public
launch rather than on the day.

## 5 · Point the site at the project

```bash
vercel env rm VITE_SUPABASE_URL production
vercel env rm VITE_SUPABASE_ANON_KEY production
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

Repeat for `preview`. These two are `VITE_`-prefixed on purpose: they are public
browser configuration, and the anon key is safe there precisely because
row-level security, not secrecy, is what protects the data.

Vite reads environment variables at build time, so a new value needs a
**redeploy**, not just a restart.

## 6 · Check it

```bash
npm run check:auth     # the guards
npm run build          # the full chain
```

Then on the deployment: sign in with a new email, confirm from the message,
sign out, sign in again, reset the password from the link, and delete the
account. Deletion should leave nothing behind in `learner_progress` and one
`fulfilled` row in `account_deletion_requests`.

## Promotional email

`PRODUCT-AND-LAUNCH-PLAN.md` sets the requirement: "Authentication is not
marketing consent. Newsletters require a separate, optional, unchecked consent,
consent timestamp, source, policy version and an unsubscribe route." The
`marketing_consent` table and `src/lib/marketing.js` are that requirement,
built.

### It is switched off, deliberately

`PRIVACY_POLICY_VERSION` in `src/lib/legal.js` is `null`, so the opt-in does not
render and `grantConsent` refuses. Consent has to be *informed*, and a checkbox
on a site with no published privacy policy collects a tick rather than a
consent: the learner has not been told who processes their address, why, for how
long, or how to stop it.

To switch it on:

1. publish the privacy policy at `/privacy`
2. set `PRIVACY_POLICY_VERSION` to the date it was published
3. run `npm run check:auth`

Step 3 fails if step 2 happened without step 1. The ordering is enforced by the
build rather than by remembering.

### What the design commits to

- **Freely given.** The opt-in is never a condition of creating an account. The
  build asserts that account creation is refused for a missing age statement and
  never for a missing opt-in.
- **A positive act.** Both boxes start unticked and carry no default `checked`.
- **Specific.** Adults only, per the founder decision of 2026-09-03. A second
  18+ statement appears when the box is ticked, and the database refuses a
  granted consent without it. This is a declaration, not verification, the same
  standing as the 13+ statement.
- **Withdrawable.** One press in the account menu, no confirmation in the way.
  Withdrawal is an update that stamps `withdrawn_at`, never a delete: erasing
  the row erases the evidence that they asked to stop, and the next import adds
  them straight back. There is no delete grant on the table.

### Before anything is actually sent

- **Pick a provider and keep it apart from transactional mail.** Promotional
  complaints landing on the same sending reputation is how password resets start
  going to spam. Different sender, ideally a different subdomain.
- **Suppression outlives deletion.** A deleted account cascades its consent row
  away, which is correct for erasure but means a stale export could re-add
  someone who unsubscribed. Before sending at any volume, keep a hashed-email
  suppression list, justified as necessary for honouring the unsubscribe, and
  check exports against it.
- **Every message needs a working unsubscribe link**, not only the in-app
  toggle. PECR requires it in the message itself.
- **Under-18s are excluded at the point of consent, not at send time.** If that
  ever changes, the exclusion has to move into the export as well.

## Known limits before a public launch

- Google's consent screen must be published, or only test users can sign in.
- Supabase's default email sender is rate limited and is not meant for
  production volume. Connect a real SMTP provider in
  *Authentication → Emails* before launch, or confirmations will silently stop
  arriving.
- There is no email-change flow in the interface yet, only password.
- The age statement is a declaration, not verification, and is recorded nowhere.
