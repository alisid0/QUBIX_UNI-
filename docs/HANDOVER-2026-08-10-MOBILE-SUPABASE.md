# Qubix University mobile and Supabase handover

Date: 2026-08-10

Branch: `foundation`

Scope: native packaging foundation, Supabase production connection, cloud
progress, and release-account preparation.

## Outcome

The existing Svelte/Vite learner application now has generated Capacitor
projects for Android and iOS. The production build is connected locally to the
dedicated `Qubix Production` Supabase project, and authenticated progress can
be synchronized between devices.

No curriculum status changed. Native packaging and infrastructure work do not
mark any board `APPROVED` or `RELEASED`.

## Mobile foundation

- Capacitor version: `8.5.0`
- Display name: `Qubix University`
- Provisional application and bundle identifier: `university.qubix.app`
- Android target and compile SDK: API 36
- Web assets directory: `dist/`
- Native projects: `android/` and `ios/`

The identifier must be confirmed before the first store build is uploaded.
Android Studio/Java and a signed release keystore are not installed on this
machine. Xcode validation requires a Mac and an Apple Developer account.

## Supabase production

- Project: `Qubix Production`
- Project reference: `wmetdmfsniqrshuaoodc`
- Region: `eu-west-2` (London)
- Site URL: `https://qubix.university/`
- Google provider: enabled
- Email confirmation: enabled
- Anonymous sign-in: disabled

Two Qubix-specific tables were added without modifying inherited data:

- `learner_progress`: one private JSON learning-state record per authenticated
  user, protected by row-level select/insert/update/delete policies.
- `account_deletion_requests`: authenticated deletion-request queue with
  user-owned insert/select policies and no client update/delete permission.

The database also contains dormant Strata-era physics cards and `user_*`
progress tables. They were audited and deliberately left untouched. The app
does not use them.

Only the public project URL and publishable key are used by the browser client.
The local values are in ignored `.env.local`; no credential or service-role key
is included in Git.

## Application changes

- Local progress remains the offline fallback.
- Signed-in progress is loaded from and saved to `learner_progress`.
- The newest complete state wins when local and cloud copies differ.
- Failed synchronization does not discard local progress.
- The account menu now supports sign-out and a two-step deletion request.
- Deletion requests are recorded for later administrative fulfilment.

## External-account status

- Google Play Console organisation verification has been submitted and is
  awaiting Google's response.
- The Play app record and Android App Bundle have not been created/uploaded.
- Apple Developer sign-in and verification remain incomplete.
- The Supabase Google OAuth test reached Google's account chooser; the founder
  still needs to select the intended first test identity.

## Verification completed

- Production Vite build passed.
- Capacitor synchronization passed for Android and iOS.
- Android is configured for API 36.
- Topic grid, subtopic dialog, lesson opening, and back-to-topics navigation
  passed a browser smoke test.
- Supabase SQL editor reported successful creation of both Qubix tables.
- Google OAuth reached the configured Google account chooser.
- No service-role key, database password, signing key, or `.env.local` file is
  included in the tracked change.

## Unresolved release gates

1. Select the first Google test identity and verify sign-in plus cloud sync.
2. Add Qubix production/mobile redirect URLs to the Supabase allow list and
   remove the obsolete Strata Vercel redirect. The production Site URL is
   already correct, but the dashboard's Add URL control did not respond.
3. Add the two public Supabase client variables to the Vercel project and
   redeploy `qubix.university`.
4. Establish an administrative process that fulfils queued account-deletion
   requests by deleting the Auth user and cascaded learner data.
5. Confirm `university.qubix.app` as permanent.
6. Replace default native icons/splash assets and build signed test packages.
7. Complete Apple Developer enrollment and add Sign in with Apple before iOS
   review if Google sign-in remains available.
8. Review the package audit report: the latest install reported 12 dependency
   findings (9 moderate and 3 high). Do not apply a breaking forced upgrade
   without testing.

## Deployment state at handover creation

This report accompanies a GitHub commit on the private `foundation` branch.
It does not represent a Vercel, Supabase Edge Function, App Store, or Google
Play production release.
