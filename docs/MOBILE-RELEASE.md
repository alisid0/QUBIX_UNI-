# Mobile release

Status: native packaging foundation only. No store submission has been made.

## Application identity

- Display name: `Qubix`
- Confirmed Android application ID and iOS bundle ID: `university.qubix.app`
- Web application: `https://qubix.university/`
- Capacitor web output: `dist/`

The founder confirmed this identity on 2026-08-12. Treat the identifier as
permanent.

## Local workflow

1. Run `npm run mobile:sync` after changing the Svelte application.
2. Run `npm run mobile:android` to open the Android project.
3. On macOS with Xcode, run `npm run mobile:ios` to open the iOS project.

The native projects package the generated learner bundle. The Factory remains
source-only and must continue to be excluded by `scripts/build-pilot.mjs` and
the existing deployment checks.

## Release gates

- Confirm whether the publisher is an individual or organisation.
- Complete Apple Developer enrolment and App Store Connect setup. The Google
  Play developer identity and both developer phone records are verified.
- Audit and authorise a Qubix-specific Supabase schema before applying it.
- Configure Google OAuth for web and native redirect URLs.
- Add Sign in with Apple before an iOS submission if social sign-in remains.
- Add cloud progress synchronization and account deletion.
- Complete privacy, age-rating and store data disclosures.
- Test signed builds on physical iOS and Android devices.

Curriculum status is unaffected by native packaging. Store availability must
not be represented as curriculum approval.
