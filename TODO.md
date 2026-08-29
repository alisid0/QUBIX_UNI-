# Qubix working to-do list

Last updated: 2026-08-26  
Working branch: `foundation`  
Purpose: the short, practical list for completing the current Qubix website and learner experience.

This file does not replace the curriculum approval rules in
[`00-CURRICULUM-DECLARATION.md`](./00-CURRICULUM-DECLARATION.md) or the broader
[`docs/PRODUCT-AND-LAUNCH-PLAN.md`](./docs/PRODUCT-AND-LAUNCH-PLAN.md). The
data-backed teaching sequence remains defined by
[`docs/CURRICULUM-MASTER-PLAN.md`](./docs/CURRICULUM-MASTER-PLAN.md). Curriculum
work still moves one Bite-sized Board at a time, and only the founder may mark
learning material `APPROVED` or `RELEASED`.

## Current snapshot

- The latest `foundation` branch contains 28 reading sessions and 16 playable missions.
- The complete Volume 0 path is approximately 6 h 04 min.
- The public site still shows the earlier 13-mission version until an explicitly approved `main` deployment.
- The six main Superstore room panels are structurally ready for final pixel artwork.
- A deterministic 54-table Superstore dataset and committed sample now exist, but no learner route queries them yet.
- Volume 0 is an AI draft under founder review. Volumes I-IV are planned, not written.

## How to use this list

1. Work from the top unless the founder deliberately reprioritises an item.
2. Complete and verify one narrow task at a time.
3. Tick a box only when its acceptance criteria are satisfied.
4. Keep work on `foundation`; pushing to `main` is a separate production-deployment decision.
5. Do not treat a commit, push or deployment as curriculum approval.

## P0 - make the current foundation release-ready

### 1. Review and synchronise production

- [ ] Review the `foundation` versus `main` diff before deployment.
- [ ] Run every production build guard successfully.
- [ ] Smoke-test the homepage, reader, game hub, first mission and store map on desktop.
- [ ] Repeat the critical path at a phone width.
- [ ] Confirm the founder wants the reviewed commit published to production.
- [ ] Push the exact reviewed commit to `main`.
- [ ] Verify the live site reports 16 missions, 28 reading sessions and a 6 h 04 min path.
- [ ] Verify the three new mission-to-reading links on the live site.

Acceptance: GitHub `foundation`, GitHub `main` and the live site all represent the same reviewed commit, with no broken critical route.

### 2. Add the six final Superstore room images

- [ ] Goods In pixel image.
- [ ] Stock Room pixel image.
- [ ] Data Office pixel image.
- [ ] Checkout pixel image.
- [ ] Aisles pixel image.
- [ ] Board Room pixel image.
- [ ] Keep the approved H2 room-panel treatment: permanent text overlay, black rectangular border and deliberate shadow.
- [ ] Give each image a real instructional or environmental purpose; do not use unrelated decorative art.
- [ ] Export responsive, compressed WebP/AVIF versions with sensible fallbacks.
- [ ] Add meaningful alternative text where the image carries information; use empty alternative text when it is purely decorative.
- [ ] Check legibility and cropping at phone, tablet and desktop widths.

Acceptance: no production room panel says `IMAGE TO COME`, the six rooms feel like one visual world, and text remains readable without relying on the image.

### 3. Finish the learner's immediate navigation loop

- [ ] Add a prominent `Continue where you left off` action when progress exists.
- [ ] Make every locked mission explain exactly what unlocks it.
- [ ] Ensure a reader can always move to its related mission and back without losing position.
- [ ] Ensure completed exercises visibly stay completed after reload.
- [ ] Refine the horizontally scrolling chapter navigation on small phones.
- [ ] Check all empty, first-use, completed and reset-progress states.

Acceptance: a returning learner can identify the next useful action in under five seconds on desktop or mobile.

## P1 - connect real data and strengthen learning

### 4. Connect the course to the Superstore dataset

- [ ] Serve the committed `data-sample/` through the application's public asset path.
- [ ] Add the agreed in-browser SQL engine and load it only on routes that need it.
- [ ] Create a small `src/lib/data/` boundary for opening the data, running a query and returning typed rows.
- [ ] Rebuild the SQL Console so its first exercise executes against the real twelve taught sales.
- [ ] Compute quoted Superstore figures from the dataset at build time instead of typing them into prose.
- [ ] Add a guard that fails when learner-facing figures drift from the dataset.
- [ ] Keep the full 7.7-million-row dataset generated or release-hosted; do not commit it to Git.

Acceptance: a learner can run `SELECT` against the committed sample, receive real rows, and the build detects any mismatch between the data and quoted figures.

### 5. Improve feedback and mastery

- [ ] Replace simple right/wrong feedback with a concise explanation of why each answer is right or unsafe.
- [ ] Let learners retry without losing the explanation from the previous attempt.
- [ ] Add a short end-of-chapter mastery check that samples the chapter's key outcomes.
- [ ] Build a review queue from missed concepts rather than from arbitrary daily activity.
- [ ] Add a chapter summary showing strengths, misconceptions and the recommended next step.
- [ ] Test every mission with both correct and incorrect paths through completion.

Acceptance: mistakes produce useful learning evidence, and learners know what to review next.

### 6. Add ethical return and retention mechanics

- [ ] Show one clear resume card on the homepage and game hub.
- [ ] Offer an optional weekly learning goal based on sessions, not time pressure.
- [ ] Record completion history locally without punitive streak loss.
- [ ] Add a gentle reminder preference only after consent and account infrastructure exist.
- [ ] Measure first briefing completion, first mission completion and chapter completion.
- [ ] Avoid dark patterns, artificial urgency and meaningless reward inflation.

Acceptance: Qubix gives learners a reason to return because unfinished understanding is visible, not because they are punished for leaving.

### 7. Create cross-device continuity

- [ ] Finalise the approved account model and minimum-age handling.
- [ ] Complete production authentication and account deletion before promoting accounts.
- [ ] Sync progress through an authorised, audited Qubix Supabase schema with Row Level Security.
- [ ] Resolve local-versus-cloud progress conflicts safely.
- [ ] Provide export, deletion and sign-out controls.
- [ ] Keep the entire first useful learning experience available without an account.

Acceptance: a signed-in learner can continue safely on another machine, while anonymous learning still works and privacy promises remain accurate.

## P2 - accessibility, performance and trust

### 8. Complete a WCAG 2.2 AA accessibility pass

- [ ] Test every critical flow with keyboard only.
- [ ] Test visible focus, skip navigation and logical focus order.
- [ ] Check colour contrast, including small uppercase labels and muted text.
- [ ] Test at 200% browser zoom and with large system text.
- [ ] Honour reduced-motion preferences in animated missions.
- [ ] Test important pages with a screen reader.
- [ ] Confirm touch targets and spacing on representative phones.
- [ ] Add automated accessibility checks to CI, followed by manual verification.

Acceptance: the homepage-to-first-mission path works without a mouse and has no known WCAG 2.2 AA blocker.

### 9. Set and meet a performance budget

- [ ] Record mobile Lighthouse/Web Vitals baselines for the homepage, reader and first mission.
- [ ] Reduce the approximately 465 KB uncompressed main JavaScript bundle.
- [ ] Keep Three.js and PixiJS out of routes that do not use them.
- [ ] Review whether the approximately 717 KB Three.js chunk can be deferred or reduced.
- [ ] Compress and correctly size all room artwork.
- [ ] Preload only critical fonts and remove unused weights.
- [ ] Test on a throttled connection and lower-powered phone.
- [ ] Add a bundle-size regression check to CI.

Acceptance: the reader loads without game engines, the first screen becomes usable quickly on a modest mobile connection, and later commits cannot silently exceed the agreed budget.

### 10. Improve public trust and release clarity

- [ ] Keep `AI_DRAFT` visible until the founder completes the relevant review gate.
- [ ] Add a clear publisher/about page and explain who creates and reviews Qubix material.
- [ ] Show learning outcomes and prerequisites before a learner starts a chapter.
- [ ] Keep source and licence notes attached to the material they support.
- [ ] Publish and link reviewed Privacy Policy, Terms and account-deletion pages before account promotion.
- [ ] State plainly whether Qubix offers qualifications or completion certificates.
- [ ] Add a visible content version or last-reviewed date to released learning material.

Acceptance: a new visitor can understand who operates Qubix, what it teaches, how material is reviewed and what happens to their data.

## P3 - discoverability and engineering durability

### 11. Improve search and sharing

- [ ] Give each chapter and major library page a unique title and description.
- [ ] Create stable, indexable URLs for public learning pages where practical.
- [ ] Add appropriate structured data without overstating accreditation or approval.
- [ ] Add social preview images using the final Qubix visual system.
- [ ] Keep staging, authoring and review-only routes out of the public sitemap.
- [ ] Add useful internal links between the homepage, chapters, library and missions.

Acceptance: a shared chapter link has an accurate preview, and search engines can discover public learning content without indexing authoring surfaces.

### 12. Reduce mission duplication and increase test coverage

- [ ] Extract the shared mission shell without flattening mission-specific interactions.
- [ ] Split oversized view and content modules where this improves comprehension or loading.
- [ ] Add end-to-end tests for resume, unlock, completion, reset and mobile navigation.
- [ ] Keep the existing chapter, exercise, mission, rehearsal, timing, palette, map, figure, scroll and asset guards mandatory.
- [ ] Add privacy-filtered production error monitoring only after its policy and consent implications are reviewed.
- [ ] Document recovery for failed deployment and corrupted learner progress.

Acceptance: shared UI changes are made once, critical learner-state regressions are caught automatically, and a failed release has a documented recovery path.

## P4 - expand only after the foundation is trusted

### 13. Review Volume 0 deliberately

- [ ] Review one Bite-sized Board at a time under the founder review protocol.
- [ ] Record amendments, source provenance and approval decisions in the canonical curriculum records.
- [ ] Do not bulk-mark the 28 reading sessions or 16 missions as approved.
- [ ] Identify which Volume 0 outcomes need stronger practice before expanding the catalogue.

Acceptance: every released board has a traceable source, review history and explicit founder decision.

### 14. Begin later volumes in dependency order

- [ ] Choose the first Volume I outcome only after the Volume 0 release gate is credible.
- [ ] Map its prerequisites before drafting it.
- [ ] Draft and review one board, one interaction and one decision cycle at a time.
- [ ] Do not advertise a later-volume game as playable until it exists and has been tested.
- [ ] Reuse the established reader/exercise/mission pattern when it genuinely fits the learning objective.

Acceptance: catalogue growth does not outrun quality, provenance or founder review capacity.

## Recommended milestone order

1. **Visual-complete foundation:** tasks 1-3.
2. **Data-backed learning beta:** tasks 4-6.
3. **Trustworthy cross-device beta:** tasks 7-10.
4. **Discoverable and maintainable product:** tasks 11-12.
5. **Reviewed catalogue expansion:** tasks 13-14.

## Definition of done for every implementation task

- [ ] The change is narrow, attributable and reversible.
- [ ] Relevant automated checks pass.
- [ ] The production build passes.
- [ ] The changed interaction is tested at desktop and phone widths.
- [ ] Wrong-answer, empty, loading and completed states are checked where relevant.
- [ ] Source, licence, privacy and curriculum status remain accurate.
- [ ] This list and any authoritative documentation are updated honestly.
- [ ] The commit is pushed to `foundation`; production is changed only with a separate explicit instruction.

## Continue on another machine

```bash
git clone https://github.com/alisid0/QUBIX_UNI-.git
cd QUBIX_UNI-
git switch foundation
git pull --ff-only origin foundation
```

Start each new work session by choosing the first unticked task whose prerequisites are complete.
