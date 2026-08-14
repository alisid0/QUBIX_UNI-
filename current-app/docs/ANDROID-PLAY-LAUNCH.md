# Android Play Store Launch Plan

This file is the Android launch control sheet for Qubix. The first public mobile test should ship as a Play Store app while preserving the web app as the main content engine.

## Recommended Release Shape

Use a Trusted Web Activity (TWA) for the first Android release.

Why:
- The Play Store app can load the live Qubix web app.
- New BBs, edited text, images, audio, and workshops built from existing interaction types can go live through the web/backend without forcing users to update the Android app.
- The Android app stays small and mostly acts as a trusted, full-screen mobile shell.
- It keeps the iPad/tablet web version aligned with Android.

Use native Android or Capacitor later only if we need heavier native features:
- deep native push notification behavior
- offline download packs
- native payments beyond web/Play billing constraints
- device APIs that the web cannot access cleanly

## Update Model

### No Store Update Needed

These should ship from web/Supabase/CDN:
- new BBs
- edited floors
- new images, GIFs, and audio
- topic ordering
- workshop data using existing interaction components
- snippets
- small copy or SEO updates
- reward text and content labels

Users receive these on reload/reopen. The service worker should remain network-first for app navigation and frequently changing media.

### Store Update Needed

These need a new Android release:
- new Android wrapper
- package/signing changes
- new native notification bridge
- Play Billing integration
- new native permission
- new app icon/name in the launcher
- target SDK updates
- major web shell changes that must be bundled inside the Android project

### Vercel Code Deploy Needed

These need a web deploy but not a Play Store update:
- new Svelte workshop component
- reward logic changes
- app navigation changes
- Supabase client changes
- service worker changes
- app shell UI changes

## Decisions To Lock Before Creating The Android Project

Do not publish until these are final:

| Decision | Current Recommendation | Why It Matters |
| --- | --- | --- |
| Public app name | Qubix | Store listing, launcher name, legal pages |
| Final web domain | Custom Qubix domain, not the Vercel preview domain | TWA verification uses domain ownership |
| Android package id | `app.qubix.learn` or `com.qubix.app` | Hard to change after release |
| Support email | Founder-owned support inbox | Required for store trust and user support |
| Privacy page URL | `/privacy.html` | Required for Play Data Safety and listing |
| Terms page URL | `/terms.html` | Trust and legal clarity |
| First release region | Limited English-speaking release | Easier feedback loop |
| Age/audience | General education, not child-directed unless deliberately built for children | Affects Play policy and declarations |

## Technical Checklist

### PWA Readiness

- Manifest exists at `/manifest.webmanifest`.
- Service worker exists at `/sw.js`.
- App is served over HTTPS.
- Icons exist at 192px and 512px.
- Maskable icon exists.
- Start URL is `/`.
- Scope is `/`.
- App is usable in portrait mobile layout.
- App can run as a standalone PWA.
- Live URL returns 200.

### TWA / Bubblewrap Checklist

- Install Android Studio or Android SDK on the build machine.
- Install Java/JDK supported by current Android tooling.
- Use Bubblewrap to generate the Android project from the live manifest.
- Configure package id.
- Configure launcher name.
- Generate signing key locally and store it securely.
- Build Android App Bundle (`.aab`) for Play Console.
- Get SHA-256 certificate fingerprint.
- Add `/.well-known/assetlinks.json` to the live site with the package id and SHA-256 fingerprint.
- Rebuild/redeploy the web app so asset links are live.
- Validate TWA opens without browser address bar.

Asset Links template:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "app.qubix.learn",
      "sha256_cert_fingerprints": [
        "REPLACE_WITH_RELEASE_SIGNING_SHA256"
      ]
    }
  }
]
```

Do not put this template into `public/.well-known/assetlinks.json` until the package id and signing fingerprint are final.

## Play Console Checklist

Required setup:
- Google Play Developer account.
- Create app in Play Console.
- App name: Qubix.
- Default language: English.
- App type: App.
- Category: Education.
- Free or paid: Free for first market test.
- Privacy policy URL.
- App access declaration.
- Ads declaration.
- Content rating questionnaire.
- Target audience and content declaration.
- Data Safety form.
- Store listing text.
- Screenshots.
- Feature graphic.
- App icon.
- Internal testing release.
- Closed testing release if required by the developer account.
- Production release only after tester feedback.

## Store Listing Draft

Short description:

Learn science, maths, chemistry, and computing in bite-sized interactive boards.

Full description draft:

Qubix is a microlearning app for STEM. Learn physics, mathematics, chemistry, and computer science through short swipeable boards, then prove understanding with interactive workshops.

Each topic starts simple and builds layer by layer. Read a clear explanation, explore examples, answer short questions, and earn Ws as understanding grows.

Qubix is designed for learners who want fast, focused study sessions without heavy textbook friction.

Launch topics include:
- Physics: units, dimensions, electricity, optics, and thermodynamics
- Mathematics: coordinate geometry, exponents, matrices, trigonometry, and differentiation
- Chemistry: atoms, bonding, molecular structure, and reactions
- Computer Science: binary, logic, code, hardware, networks, systems, and AI foundations

## Screenshot Set

Minimum first set:
- Home screen with four subject areas.
- BB reader floor view.
- Workshop subject grid.
- Coordinate geometry workbook.
- Chemistry/atom builder.
- Physics workshop.
- W Score/progress screen.

Google Play screenshot notes:
- Use real app screens, not mockups only.
- Avoid text so small it cannot be read on the store page.
- Keep brand consistent.
- Show one clear interaction per screenshot.

## Notification Plan

Start with in-app notifications only:
- new topic available
- workshop completed
- Ws earned
- streak window open

Add web push later:
- only after users understand the value
- opt-in only
- no shame language
- max one useful reminder in a 48-hour learning window

Possible push messages:
- "Your 48-hour streak window is still open."
- "A new 5-minute workshop is ready."
- "You are one short session away from finishing this topic."

For Android native push, use Firebase Cloud Messaging only after the retention loop is validated.

## First Release Plan

1. Lock public name, domain, package id, support email.
2. Finish launch-critical text/media/reward QA.
3. Generate Play Store screenshots from live app.
4. Generate TWA Android project.
5. Build signed `.aab`.
6. Add real `assetlinks.json`.
7. Submit internal testing release.
8. Test install on at least 3 Android devices.
9. Fix store/pre-launch report issues.
10. Run closed test or production limited release.

## Quality Gates Before Production

- App opens directly into Qubix without browser chrome.
- Login/guest flow works.
- Workshops complete.
- Ws update as expected.
- Back button behavior is acceptable.
- Offline/poor network state is not broken.
- Terms and privacy are reachable.
- No placeholder text in store listing.
- No broken images in key paths.
- No `[object Object]` in workshops.
- Live web app and Android app show the same core content.

