# Qubix product and launch plan

Status: founder direction recorded; implementation remains gated by the checklist below
Last updated: 2026-08-12

This is the authoritative product-level plan for Qubix. Curriculum records remain
the authority for the status, provenance and release of individual learning
boards. A product or store release never changes a board's curriculum status.

## 1. Fixed product decisions

- Public product and app name: **Qubix**
- Purchased domain and canonical website: **https://qubix.university/**
- Publisher: **Arcave Technologies**
- Android application ID and iOS bundle ID: **`university.qubix.app`**
- Category: **Education**
- Product type: general interactive learning for curious people, including but
  not limited to students
- Initial subjects: **Maths** and **Physics**, kept as separate subject areas
- Product is not a school, examination board, qualification provider, prescribed
  syllabus or homework-answer service
- Market reference: an affordable alternative in the interactive-learning space
  occupied by Brilliant, without copying another company's content, design,
  wording or interactions
- Initial commercial model: free installation and a useful free preview, with
  the complete product offered through **Qubix Plus**
- Advertising: none at launch

Proposed public promise:

> Understand Maths and Physics through visual, interactive learning.

Proposed campaign line:

> Don't just read it. See it. Move it. Understand it.

## 2. Audience and terminology

Qubix is for curious adults, professionals, lifelong learners and students. The
learning catalogue is organised by subject, topic, path and lesson rather than
school year or examination specification.

Use these public product terms:

| Prefer | Avoid unless technically necessary |
|---|---|
| learner | student |
| learning catalogue | curriculum |
| subject and topic | school subject and syllabus |
| learning path | course year or grade |
| learning progress | syllabus progress |

The existing repository uses `curriculum` as a governance term for source,
prerequisite and founder-approval records. Do not mechanically rename those
files or statuses. The terminology change applies to the public product.

The launch age decision is still open. The current recommendation is 13+ for
independent accounts, with a Children's Code assessment because people under 18
may still be likely to access the service.

## 3. Product and technical architecture

Keep the existing web-first stack:

- Svelte, TypeScript migration and Vite for the learner app, website and Factory
- Capacitor for Android and iOS packaging
- PixiJS and Three.js, loaded only for lessons that require them
- Supabase Auth, Postgres, Storage and Edge Functions
- Vercel for `qubix.university`, previews and production hosting
- GitHub for source history, review and CI
- Playwright plus unit tests for release verification
- PostHog EU for consent-controlled analytics and surveys, after consent exists
- Sentry for privacy-filtered error monitoring
- a dedicated email provider for authentication, transactional mail and an
  optional newsletter
- Google Play Billing and Apple in-app purchase; consider RevenueCat only when
  cross-store subscriptions are implemented

Do not rewrite the product in Flutter or separate native applications without a
measured limitation that Capacitor cannot solve.

## 4. Content delivery without app updates

The mobile application is a stable, safe renderer. Published lessons are
versioned structured data and media fetched from the Qubix backend. Remote
content must never contain executable JavaScript, unrestricted HTML or arbitrary
CSS.

The intended release flow is:

1. Create a lesson in the local/private Factory.
2. Save it as a draft with source and copyright provenance.
3. Run schema, factual, accessibility, technical and media-rights checks.
4. Preview it in staging.
5. Receive the founder's explicit approval.
6. Create an immutable published lesson version.
7. Atomically update the production release manifest.
8. Let clients download only changed lessons and assets.
9. Cache the last valid release for offline learning.
10. Roll the manifest back if a release is defective.

Each release needs a release ID, `content_schema_version`,
`minimum_app_version`, publication time, lesson-version references, asset
checksums and approval/audit records.

A lesson using existing safe components can ship without a store update. A new
interaction engine, native capability, SDK, permission or breaking schema change
requires an Android/iOS application release.

The new Qubix schema must be audited and authorised before applying migrations.
Do not inherit the old Strata schema merely because files exist in `supabase/`.

## 5. Data and security rules

- Minimise personal data. Do not collect date of birth, address, telephone,
  gender or precise location without an approved need.
- Keep authentication, profiles, progress, consent, entitlements, content and
  audit records logically separated.
- Enable and test Row Level Security on every exposed table and Storage bucket.
- A learner may read published content and only their own personal records.
- Factory and administration require named roles, least privilege and MFA.
- The Supabase service-role key must never enter the client, repository, browser
  storage, Vercel public variables or chat.
- Keep secrets in platform secret stores and document rotation ownership.
- Record all publishing and sensitive administrative actions in an audit log.
- Add rate limits, input validation and content sanitisation to sensitive
  server-side functions.
- Back up the database, independently back up irreplaceable assets and test a
  restoration procedure.
- Securely back up store signing material with documented ownership and recovery.
- Add dependency checks, static checks and release tests to GitHub CI.
- Maintain an incident-response procedure and processor/subprocessor register.
- Use OWASP MASVS as the mobile-security baseline.

## 6. Privacy and legal requirements

Before public release, publish and link from both the app and website:

- Qubix Privacy Policy
- Qubix Terms of Use
- account-deletion page at a stable public URL
- cookie/analytics notice and consent controls where required
- data-retention schedule
- processor list

Authentication is not marketing consent. Newsletters require a separate,
optional, unchecked consent, consent timestamp, source, policy version and an
unsubscribe route.

If accounts can be created in the app, provide both an in-app deletion path and
an external web deletion route. Deletion must be operational, not merely a queue
with no fulfilment process. Delete associated user data except records retained
for a clearly documented legal, security or fraud-prevention reason.

Google Play Data Safety and Apple App Privacy answers must match the released
code and every third-party SDK. Re-audit them whenever an SDK, permission or
data practice changes.

Founder facts still required for final policies:

- exact legal operator, company number and country of establishment
- business/legal address
- support, privacy, deletion and legal-notice email addresses
- ICO registration status and number, if applicable
- minimum account age and treatment of younger users
- approved retention periods
- final subscription/cancellation wording
- legal authority for final policy and processor approval

Obtain professional UK legal review before final public approval, especially if
the service is likely to be accessed by children.

## 7. Design and accessibility

- Preserve the existing five-colour Qubix token system unless the founder
  approves a design-system change.
- Use one coherent component system across web, Android and iOS.
- Target WCAG 2.2 AA.
- Test keyboard operation, screen readers, contrast, scalable text, reduced
  motion and generous touch targets.
- Test phone, tablet and desktop layouts and low-bandwidth/offline behaviour.
- Do not make the public listing look like a children's game unless child age
  groups and the corresponding policy obligations are deliberately selected.
- Real store screenshots must show actual, available functionality.

## 8. Commercial model

Recommended launch structure:

### Qubix Free

- a small, genuinely useful selection of Maths and Physics experiences
- one rotating challenge
- no advertising
- no payment details required

### Qubix Plus

- complete learning catalogue
- all interactive simulations and challenges
- unlimited learning
- cross-device progress
- offline access
- future subject releases
- permanently ad-free

Provisional prices for testing, not yet founder-approved:

- GBP 4.99 monthly
- GBP 39.99 annually

Do not spend materially on acquisition until the Plus catalogue, billing,
onboarding, retention and cancellation flows work. Measure customer acquisition
cost against paying and retained members, not raw installations.

## 9. Discoverability and marketing

Qubix is a paid learning membership with a useful free preview, not a free app
funded by advertising.

Initial Google Play metadata direction:

- App name: `Qubix`
- Category: Education
- Short-description direction: `Learn Maths and Physics through interactive lessons, puzzles and visual tools.`
- Primary terms: learn maths, learn physics, interactive learning, visual maths,
  physics simulations, maths puzzles and problem solving

Never put competitor names in store metadata and never imply endorsement or a
relationship with Brilliant or another provider.

The marketing engine is a real interactive demonstration:

1. Publish a surprising Maths or Physics question.
2. Show a short visual interaction on X, video platforms or search.
3. Let the visitor try a useful sample immediately at `qubix.university`.
4. Offer the app and Qubix Plus after value has been demonstrated.

Create indexable, people-first Maths and Physics topic pages. Do not create a
large volume of shallow AI-written pages for search manipulation.

Competitors and benchmarks to monitor:

1. Brilliant: direct interactive STEM competitor
2. Kinnu: lifelong-learning and habit competitor
3. Imprint: visual adult-learning competitor
4. Khan Academy: major free substitute
5. PhET: Physics simulation benchmark
6. Mathigon: interactive Maths benchmark
7. Elevate: daily engagement and habit benchmark

## 10. Online infrastructure budget

Existing Arcave hosting is approximately GBP 20/month. ElevenLabs, Claude,
Cursor and X are operating/production/marketing subscriptions and should be
recorded separately rather than counted again as Qubix hosting.

Current planning range for additional Qubix online infrastructure:

- Supabase production: approximately GBP 19/month before VAT
- email: GBP 0-15/month initially
- PostHog: free tier initially
- Sentry: free tier initially
- GitHub: free tier initially
- independent backup allowance: approximately GBP 5/month

Reserve GBP 40-55/month additional including VAT and contingency during early
launch. Keep hard spend limits and alerts enabled. Video hosting, high event
volumes and email volume need separate forecasting if introduced.

## 11. Platform status

### Google Play

- Arcave Technologies developer identity: verified
- private and public developer phone: verified
- app creation: unlocked
- Play app record: not yet created
- signed Android App Bundle and keystore: not yet created

### Apple

- native Capacitor iOS project: present
- public app name in local native configuration: Qubix
- bundle ID in local project: `university.qubix.app`
- iOS deployment target: 15.0
- Apple Developer account/enrolment: sign-in and team status still to be completed
- App Store Connect record: not created
- certificates/signing/TestFlight upload: require macOS and Xcode
- Sign in with Apple: required before iOS review if Google sign-in remains

## 12. Priority checklist

### P0 - founder decisions

- [x] Fix public name as Qubix.
- [x] Fix canonical domain as `qubix.university`.
- [x] Fix publisher as Arcave Technologies.
- [x] Fix package/bundle ID as `university.qubix.app`.
- [x] Define Qubix as general interactive learning, not a prescribed curriculum.
- [x] Keep Maths and Physics as separate subjects.
- [x] Choose no advertising at launch.
- [x] Decide minimum account age. **13**, founder decision 2026-08-12: Qubix is
      not for under-13s. This removes COPPA and satisfies UK GDPR. It does not
      settle the EU, where member states set the age between 13 and 16, nor is
      the age enforced anywhere in the software yet. See
      [Data Inventory](./DATA-INVENTORY.md).
- [ ] Supply legal operator, address, company and contact details.
- [ ] Approve the final free/Plus boundary and prices.

### P1 - governance, security and privacy

- [x] Complete the data inventory. Written 2026-08-12 from the code and the
      migrations: [Data Inventory](./DATA-INVENTORY.md). Purposes and lawful
      bases are drafted there; **retention periods are still unset**, and it
      records two gaps found while writing it: the account-deletion queue is
      not processed by anything, and Vercel Analytics is enabled and
      undeclared.
- [ ] Draft and legally review Privacy Policy and Terms.
- [ ] Publish stable privacy, terms and deletion URLs.
- [ ] Implement working in-app and web account deletion fulfilment.
- [ ] Audit every Supabase table and Storage policy.
- [ ] Add administrator MFA, role separation and publishing audit logs.
- [ ] Establish database/asset backups and test restoration.
- [ ] Establish incident response, secret rotation and processor register.
- [ ] Add GitHub CI security and dependency gates.

### P2 - remote content platform

- [ ] Design and founder-authorise a Qubix-specific content schema.
- [ ] Separate Maths and Physics subject/topic structures.
- [ ] Define the safe renderer component allow-list.
- [ ] Add immutable lesson versions and release manifests.
- [ ] Add schema-version and minimum-app-version compatibility checks.
- [ ] Add changed-content download, checksums, offline cache and rollback.
- [ ] Add Factory draft/review/preview/publish audit workflow.
- [ ] Preserve source, provenance, copyright and founder-approval gates.

### P3 - product completion

- [ ] Implement email login alongside Google login.
- [ ] Verify production Google OAuth and native redirect handling.
- [ ] Add Sign in with Apple for iOS.
- [ ] Complete profiles, cross-device progress and entitlement handling.
- [ ] Complete accessibility and design-system QA.
- [ ] Optimise PixiJS/Three.js loading, media and offline behaviour.
- [ ] Replace/approve final native icon, splash and store assets.
- [ ] Test on representative physical Android and iOS devices.

### P4 - measurement and communications

- [ ] Create a minimal analytics event plan tied to learning outcomes.
- [ ] Implement consent controls before PostHog EU.
- [ ] Keep session replay disabled initially.
- [ ] Configure privacy-filtered Sentry monitoring.
- [ ] Select/configure email delivery.
- [ ] Add separate newsletter opt-in and unsubscribe.
- [ ] Add surveys only with appropriate consent and purpose.

### P5 - Android launch

- [ ] Create the Qubix Play app record.
- [ ] Generate and securely back up the Android signing key.
- [ ] Build and upload the signed AAB to Internal Testing.
- [ ] Complete store listing, screenshots, feature graphic and preview video.
- [ ] Complete target audience, content rating, Data Safety and app access.
- [ ] Run pre-launch report and physical-device testing.
- [ ] Run a genuine closed beta and resolve feedback.
- [ ] Launch through a staged production rollout with monitoring.

### P6 - iOS launch

- [ ] Sign in and confirm/complete Arcave Apple Developer enrolment.
- [ ] Register `university.qubix.app` in Certificates, IDs & Profiles.
- [ ] Create the Qubix App Store Connect record.
- [ ] Configure capabilities, entitlements and Sign in with Apple.
- [ ] Audit required privacy manifests and SDK declarations.
- [ ] Configure certificates and automatic signing in Xcode on a Mac.
- [ ] Archive and upload build 1 to TestFlight.
- [ ] Complete screenshots, description, age rating and App Privacy.
- [ ] Run TestFlight review and device testing.
- [ ] Submit for App Review only after all legal/product gates pass.

### P7 - commercial growth

- [ ] Reach a launch catalogue capable of supporting paid membership.
- [ ] Implement store billing and server-verified entitlements.
- [ ] Create the Qubix Plus catalogue/paywall and cancellation routes.
- [ ] Measure first-lesson completion, day-7/day-30 retention and conversion.
- [ ] Begin ASO and people-first search content.
- [ ] Test creator partnerships and a small paid campaign only after retention.
- [ ] Stop channels whose acquisition cost does not support member economics.

## 13. Release rules for future agents

1. Read `AGENTS.md`, the onboarding documents and this plan before product work.
2. Keep product work separate from curriculum approval.
3. Make changes small, attributable and reversible.
4. Never infer permission to apply database migrations, publish lessons, deploy,
   submit a store release or spend money.
5. Never expose credentials, service-role keys, signing keys or verification
   codes.
6. Test production builds and the changed path at phone and desktop sizes.
7. For mobile work, sync the generated web bundle and verify native identity.
8. Update this checklist when a gate is actually completed; do not mark work
   done because a draft, local screen or external form exists.
9. Report exact files changed, tests, commit, push and deployment state.
10. The founder remains the sole authority for public lesson approval and final
    legal/commercial decisions.
