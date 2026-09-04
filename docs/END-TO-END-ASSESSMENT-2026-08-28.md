# End-to-end assessment — 28 August 2026

Status: **assessment for founder review. No curriculum status is changed.**
Scope: the live site at `https://qubix.university/`, the root Svelte app that
deploys there, curriculum governance, launch gates, and the unused `current-app/`
tree. Verified against commit `6b1454b` on `main`.

This document records what is true today. It does not approve, release or deploy
anything.

---

## Verdict

**A first-time visitor can start learning.** Production opens on Volume 0
(Shared Foundations): a briefing, a Superstore academy of 19 missions, and a
reader of 8 written chapters / 35 sessions. The first mission is interactive and
teaches a real idea. Desktop and phone layouts both work.

**Nothing the visitor can play is `APPROVED` or `RELEASED` curriculum.** The
site says so on its own landing page. That labelling is honest. The counts
around it are not.

**The product is not ready for a public, paid or store launch.** The live app
has no privacy policy, no terms, no account-deletion page, and always-on Vercel
Analytics with no consent control. GitHub has no CI. Play and App Store records
do not exist.

The right way to read the site: a founder-reviewable, playable draft of a data
science academy, with a mathematics/physics pilot still reachable by URL.

---

## 1. What production actually is

The live domain serves the **repository-root** Svelte app, not `current-app/`.

| Check | Result |
|---|---|
| Live HTML / service worker / manifest | Root app (`qubix-university-v2`, PWA name still “Variables and Rates of Change”) |
| `.vercelignore` | Excludes `current-app/` |
| `vercel.json` | `npm run build` → `dist/` |
| `/privacy.html`, `/terms.html` | **404** |
| Production `/` | `RoleFoundations.svelte` — Volume 0 landing |
| Local `/` | `Home.svelte` — mathematics/physics pilot |

This last split is still the most expensive trap in the repo: measuring local
`/` is measuring a page real visitors never see.

Security headers on the live response are strong: CSP, HSTS, `X-Frame-Options:
DENY`, `nosniff`, locked permissions-policy. CSP still allows
`https://*.supabase.co` and `https://*.vercel-insights.com`.

---

## 2. The visitor journey (walked, 28 August 2026)

Walked on the live domain at desktop (~1280) and phone (390×844).

1. **`/`** — “Learn data science on the shop floor.” CTA “Begin your first
   briefing.” Honest line: *Everything here is an AI draft under founder
   review.* Stats: 19 missions · 8 rooms · 7 ranks. Complete path quoted as
   7 h 32 min.
2. **First briefing** — Chapter 1 session 1, *Data is a record, not reality*,
   loads. Reader is labelled `AI DRAFT · AUTHORING ONLY`.
3. **Mission 001, Process a Sale** — Playable. Scanning a line updates the
   basket and a live lineage of observe / look up / derive. This is teaching,
   not decoration.
4. **`?mode=game`** — Academy hub. 0 / 2,210 XP, Pre-Intern Candidate, 1 mission
   open, 18 locked. Sequential unlock is enforced.
5. **`?mode=wiki`** — Loads. 379 mapped topics, 17 phases. Catalogue, not a
   course.
6. **`/?prototype=variables-and-rates`** — Mathematics pilot, 10 subtopics.
   *A Letter for a Number* is interactive. Weaker draft labelling than Volume 0.
7. **`/library/index.html`** — Loads.
8. **Phone** — Homepage and first briefing reflow. No horizontal-scroll trap on
   the pages checked. Type remains readable.

A newcomer can begin in under a minute, with no account.

---

## 3. Curriculum truth

Founder-only `APPROVED` / `RELEASED`. An implemented screen is not approval.
`curriculum/STATUS.md` is the current record; `STATE.md` (generated 2026-08-26)
is stale.

### Narrow founder approvals, 28 August 2026

| Item | Scope | Public learner release |
|---|---|---|
| 5 figures (join fan-out, sampling spread, grain collapse, base-rate alarm, outlier-pull still) | Figure only | Sessions that contain them stay `AI_DRAFT` |
| `DSA-SEQ-001`, `DSA-INTRO-000` | Authoring samples | Workshop-only; not on the mission roster |
| `DSA-ARR-002` | — | Still `AI_DRAFT` |

### Still `AI_DRAFT`

- Every named board in `curriculum/STATUS.md`, including the five Variables and
  Rates of Change boards and *Force and Acceleration*.
- All 8 Volume 0 chapters and all 19 academy missions.
- Wiki, Superstore world, pre-intern ebooks.
- Curriculum declaration, prerequisite map and main map: still awaiting founder
  review.

**Live is not approved.** Publishing Volume 0 for people to try did not move
those gates.

---

## 4. What is broken, stale or misleading

These are the things a visitor can see that are currently untrue.

### P0 — homepage counts

The landing page computes `writtenChapters` from the 8-chapter registry, then
divides it by a **hardcoded 7-title list** in `RoleFoundations.svelte`. Live
text:

> **8 of 7** Volume 0 chapters written

Chapter 8, *Chance and Inference*, is written (`shared-foundations-part-eight.js`)
and reachable by URL, but missing from:

- the “What you will learn” list
- `SiteNav` subject strip (`Data … Explaining`, seven items)
- the hardcoded `CHAPTERS` titles in `SiteFooter.svelte`

`index.html` SEO splash still says **seven chapters and 17 missions**. The
`<svelte:head>` description still says **seven** chapters. The PWA manifest
still describes the old calculus pilot.

### P0 — legal pages on the live product

`/privacy.html` and `/terms.html` 404. The deploying app has no legal URLs at
all. `current-app/public/privacy.html` and `terms.html` exist, but that tree is
not what Vercel publishes.

`src/main.js` calls `inject()` from `@vercel/analytics` on every production
page load, with no consent gate. `docs/DATA-INVENTORY.md` already flagged this.

### P1 — gated URLs fail open to the wrong product

`?mode=dsa-introduction-preview` is correctly **not** the DSA lesson in
production. It falls through to `Home.svelte`, the mathematics/physics home.
A visitor who is sent that URL sees a different product, not a 404 and not
Volume 0.

### P1 — document and working-list drift

| Document | What it still says | What is true |
|---|---|---|
| `docs/AGENT-ONBOARDING.md` | Production `/` is staging/dummy mode | Production `/` is RoleFoundations |
| Root `README.md` | `/` is Home, then the boards; nine live boards | `/` is Volume 0; maths is a prototype URL |
| `STATE.md` | 0 approved, 7 chapters, 18 missions | Figures + DSA samples approved; 8 chapters, 19 missions |
| `TODO.md` | 16 missions, 28 sessions; dataset unused | 19 missions, 35 sessions; `?lab=sql` queries the sample DB |
| `docs/HANDOVER-2026-08-27-THE-DATASET.md` | Product reads no rows | Data console and several build guards query SQLite |
| `current-app/AGENTS.md` | Git push does not update the public app | Root `main` is what `qubix.university` builds |

`GameHub.svelte` still hardcodes a six-room subset with old mission numbers;
the landing page and `store-map.js` use eight rooms.

---

## 5. Dual-product risk

Two complete applications share one repository and one domain name.

| | Root (live) | `current-app/` (in git, not served) |
|---|---|---|
| What it is | Volume 0 academy + maths pilot + wiki + library | Strata-era Reader PWA, 1,145+ cards, auth, workshops |
| Auth | Optional Google on `Home.svelte` only — **not on the production landing** | Full email / Google / deletion / export |
| Progress | `localStorage` (`qx.superstore.progress.v1`) | Supabase |
| Legal pages | None | Present |
| Capacitor | `university.qubix.app` Android + iOS shells | None |
| Deploy | Vercel project `qubix-university` from root `main` | `.vercelignore`d |

Agents that start from `current-app/AGENTS.md` will edit and “release” the
wrong product. Keep treating `current-app/` as an inherited catalogue, not as
production, until the founder explicitly says otherwise.

---

## 6. Launch gates (`docs/PRODUCT-AND-LAUNCH-PLAN.md`)

Fixed identity is in place: **Qubix**, Arcave Technologies, `qubix.university`,
`university.qubix.app`, no ads, Maths and Physics as separate subjects, 13+ as
a policy decision.

Still open, and blocking any honest public/paid/store launch:

- Legal operator, address, company number, ICO status
- Privacy Policy and Terms **on the deploying app**, legally reviewed
- Working deletion fulfilment (root inventory still records a queue nothing
  drains; `current-app` had a verified Edge Function that this live surface
  does not expose)
- Age gate in software (13+ is policy, not code, on the Volume 0 landing)
- EU 13-versus-16
- Whether Vercel Analytics stays
- Retention periods
- Free / Plus boundary and prices
- Play app record, signing, TWA/`assetlinks.json`
- Apple enrolment, Sign in with Apple, TestFlight
- GitHub CI
- Remote lesson schema / release manifests (P2)
- No board `RELEASED`

`current-app/docs/PUBLIC-BETA-CHECKLIST.md` is a 2026-07-29 checklist for the
**other** app. Do not tick Volume 0 launch items from it.

---

## 7. Engineering health

Production build on this checkout: **passed** (`npm ci` then `npm run build`,
exit 0, ~19 s of Vite after the guard chain). Known Vite warning: `index`
chunk ~897 kB / 266 kB gzip, plus `three.module` 735 kB when a Three.js
mission loads.

The prebuild guard set is the strongest part of the project. It stops
position-biased quizzes, missing chapters, drifted figures, unreachable
routes, and Three.js assets that do not obey their contract. It did **not**
catch the 8-of-7 chapter list, because that list is hardcoded in the landing
page rather than derived from `SHARED_FOUNDATIONS`.

Other engineering notes:

- Sample SQLite is built at prebuild: **16.12 MB** / **4.26 MB gzip**,
  220,888 rows. UI copy in `App.svelte` still says “11 MB”.
- The SQL Console **mission** is still a clause-picker over twelve printed
  rows. Real SQL is the separate `?lab=sql` console.
- Academy progress is device-local. Closing the tab keeps it; another device
  does not.
- No `.github/workflows`. The only automated gate is Vercel’s build of `main`.
- Runtime `npm audit --omit=dev`: one moderate Svelte 4 SSR advisory. Fixing
  it via `npm audit fix --force` would jump to Svelte 5. Leave it.
- No service-role keys or live secrets found in tracked files.

---

## 8. What remains unapproved

Everything a learner can open, plus the governance documents themselves.

The founder has approved five figures and two DSA authoring samples. Those
approvals are digest-locked. They do not place DSA on the roster, do not
approve Volume 0, and do not approve the mathematics pilot.

---

## One recommended next action

**Make the homepage tell the truth about chapter 8.** Add *Chance and
Inference* to the landing chapter list and the subject strip so “8 of 7”
cannot appear, and derive those titles from `SHARED_FOUNDATIONS` instead of a
second hardcoded list. That is one small engineering change. It is not
curriculum approval.

Do not, in the same change, publish legal pages, mark Volume 0 approved, or
touch `current-app/`.
