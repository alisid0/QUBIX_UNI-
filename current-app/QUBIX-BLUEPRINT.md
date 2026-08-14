# QUBIX-BLUEPRINT.md — the canonical product spec (streamline epoch)

> **Authority.** This file is the single source of truth for WHAT to build and
> WHY. It **fully replaces** `QUBIX-MASTER-PLAN.md` (archived at
> `docs/archive/QUBIX-MASTER-PLAN-2026-07-03.md`); where they disagree, this
> file wins. `CLAUDE.md` remains the source of truth for HOW the codebase works
> (architecture, conventions, pipeline, security). Written 2026-07-05 from
> decisions made with the founder; every decision here is settled unless marked
> OPEN.
>
> **Audience for this doc:** DeepSeek (implementation) and any other agent.
> Phases in §10 are ordered; do them in order. Each phase lists exact files,
> acceptance criteria, and guardrails. Ask before inventing anything not
> specced here.

---

## 1. Product in one paragraph

Qubix teaches the *concepts* behind four subjects through four *gateways*:
**The Line** (maths), **The Atom** (chemistry + biochemistry), **The Bit**
(computing + networks), **The Unit** (physics). **Content exists to make the
user aware of ideas; tests, assessments and quizzes are where learning is
reinforced, made recallable, and confidence is built.** The two halves are
equal: 50/50 product weighting between boards (BBs) and assessment. The
motivation layer is a **streak**, a currency called **Ws** (wins — never call
them XP), **consistency-based points**, and a **leaderboard of learner
cohorts**.

- **Brand:** Qubix (user-facing). **Codename:** Strata (code/docs/commits).
  Never put "Strata" on a user-facing screen.
- **Audience:** general curious learners — teens to adults, artists, musicians,
  filmmakers. **NEVER exam-centric.** No JEE/GCSE framing anywhere. Real-world
  angles come from music, film, games, money, news, tech.
- **Tagline:** "Build simple machines. Assemble grand systems. Understand how
  the world really works."

## 2. The Four Gateways (LOCKED — structure already live)

`PATH_GROUPS` in [src/lib/content/paths.js](src/lib/content/paths.js) is the
canonical grouping. Every topic (path) belongs to exactly one gateway. The old
5-category / six-root model from the archived master plan is **dead**.

| Gateway | id | Subject scope | Live entry (`firstTopic`) |
|---|---|---|---|
| The Line | `line` | maths | `LINE_001` |
| The Atom | `atom` | chemistry + biochemistry | `ATOM_001` |
| The Bit | `bit` | computing + networks | `BIT_001` |
| The Unit | `unit` | physics | `PHY_UNITS` |

**Known data bug to fix (Phase 1):** `PHY_FORCES` (Forces & Newton's laws,
live) and `PHY_INTRO` (Foundations & frontiers, live) are in `PATHS` but in no
gateway's `paths` array — add both to `unit.paths` so they're reachable from
the Path tab.

## 3. Ontology (LOCKED — anatomy model, structure carries NO meaning)

| Level | Anatomy | Definition |
|---|---|---|
| Floor | cell | One screen's worth of idea. Swipe down = deeper |
| BB | tissue | Title + 3–5 floors. Swipe across = next BB |
| Topic (path) | organ | An ordered list of BBs in `paths.js` |
| Gateway | organ system | One of the four doors (§2) |

**Forbidden:** floor-role labels (hook/bedrock/payoff/etc.), tying floors or
BBs to pedagogical stages, any template dictating what a floor is "for".
Surviving conventions: quiz questions are written against the deepest floor;
every floor must read fine as a stopping point; ~20% of BBs have 3 floors,
~70% have 4, ~10% have 5.

**Identity:** a BB's permanent id is its **`bbid`** (auto-increment integer in
Supabase, assigned at draft, never reused; `sort_order` is display-only). The
migration `supabase/migrations/0003_bbid.sql` exists but is **not yet applied**
— see Phase 6.

## 4. The learning loop (settles the previously-parked assessment question)

**Vocabulary (LOCKED 2026-07-05).** The user-facing word family is **Check**:
in-flow = **"Quick check"**, end-of-topic = **"Topic check"**, spaced =
**"Recall"**; interactive checkpoints stay **"Workshop"**. Never "test" or
"exam" anywhere user-facing; "quiz" survives only in internal code/storage
keys (`quizzes`, `recordQuizResult`), never in UI copy. The **Topic check is
always available** from a topic's detail screen — zero boards read required
(copy: "No reading required — jump in"). **Explanations are universal:** every
answer, right or wrong, shows the why (fluke-guess insurance); the only
exception is the first miss of a two-attempt question, which withholds the
answer until the retry is spent.

```
Wander (swipe BBs) → Dig (descend floors)
  → Checkpoint (in-flow quiz every 3rd BB — LIVE)
  → Workshop (interactive checkpoint after designated BBs — LIVE)
  → Path quiz (end of a topic — LIVE, view needs redesign)
  → Recall on schedule (day 1 / 7 / 21 spaced checks — TO BUILD, Phase 4)
  → mastery decays → BB returns to the recall queue
```

All five assessment touchpoints coexist. Mastery states already implemented in
[src/lib/stores/progress.js](src/lib/stores/progress.js) (localStorage key
`strata-progress-v2`): `unwandered → wandered → checked → well_read → recalled
→ mastered_1 → mastered_2`. The recall scheduler (Phase 4) closes the loop.
A wrong answer anywhere should eventually deep-link to the source BB's deepest
floor (Phase 5 wires this in the quiz redesign).

## 5. App surface — THE STREAMLINE (this is the core of this doc)

### 5.1 What survives: 3 tabs + 1 mode

| Surface | Replaces | Content |
|---|---|---|
| **Home** (tab) | Home | Header, Today's session, Continue, the four gateway doors |
| **Path** (tab) | Topics | The 4 gateways with covered + future topics |
| **W Score** (tab) | Stats (+ Leaderboard folded in) | Ws, streak, consistency, league, medals |
| **Snippet Mode** (full-screen mode) | Snippets tab | No-pressure browse feed, entered from Home header |

### 5.2 What is CUT

- **Map tab and Map.svelte view** — retired entirely. Remove the tab, the
  route (`currentView === 'map'`), the import in `App.svelte`, and the entry in
  `BottomNav.svelte`. Progression is data, never a screen.
- **Snippets as a tab** — the view survives but as a *mode* (§5.6), not a tab.
- **Leaderboard.svelte / OtherUserStats.svelte as separate views** — folded
  into the W Score tab (§5.5). Remove their routes when Phase 3 lands.
- **Author.svelte from any visible nav** — stays reachable by direct route
  (`author`) for internal use only. No user-facing entry point.

### 5.3 Home tab (spec)

Header row (left → right):
1. **Avatar** (initial) → tapping opens W Score tab.
2. Greeting (`Hi, {name}`) + level line (keep existing level derivation).
3. **Streak chip** (flame + days) — existing.
4. **W chip** (new, Phase 2): `W {total}` — tapping opens W Score.
5. **Snippet Mode button** (new, Phase 1): distinct icon button (use the
   existing `snippets` icon) that pushes the full-screen Snippet Mode.
6. **⋯ settings** — existing `SettingsMenu` (theme, text size, account,
   logout, privacy). Unchanged.

Body, in order:
1. **Today's session** card (Phase 4; until then keep the current
   Start-learning CTA): due recalls + a 3–4 min mixed check-in. Either this OR
   Continue counts as a streak day.
2. **Continue card** — existing (ring, topic, x/y boards).
3. **The four doors** — a 2×2 grid of gateway cards (Line / Atom / Bit /
   Unit), each showing name + boards-read progress within that gateway.
   Tapping → Path tab scrolled to that gateway (or directly into
   `firstTopic` if the gateway is untouched).

### 5.4 Path tab (spec) — rename of Topics

One scrolling page, four sections in fixed order: **Line, Atom, Bit, Unit**.
Each section:
- Gateway header: icon, name, one-line tagline, `x/y boards` progress.
- **Covered (live) topics**: list rows → tap opens the existing `PathView`
  (topic detail). Row shows name, boards count, state chip from
  `progress.getPathState()`: `Not started` / `n/m` / `Done ✓`.
- **Future topics**: greyed rows with a `Soon` chip, NOT tappable. Data lives
  in a new `ROADMAP` const in `paths.js` (gateway id → array of topic names).
  Initial roadmap content:
  - `line`: Quadratics & polynomials · Limits & continuity · Probability ·
    Statistics · Matrices
  - `atom`: Periodic table & periodicity · Organic basics · Biomolecules
  - `bit`: Binary & number systems · Logic gates & Boolean · Networks
    (packets/IP/DNS)
  - `unit`: 1D Kinematics · Work, energy & power · Thermodynamics & heat ·
    Current electricity
- Never show "0/N" on a future topic; they are names + `Soon` only.

### 5.5 W Score tab (spec) — rename of Stats, absorbs Leaderboard

Tab label: **"W Score"**. Sections top → bottom:
1. **Hero:** total Ws (big number, e.g. `W 128`) + `this week: {n} pts`.
2. **Streak + consistency:** streak count + the existing 7-day activity bars
   (`progress.getActivity(7)`), `n of 7 days` summary.
3. **League** (Phase 3): your cohort ranked by weekly consistency points —
   see §7. Until Phase 3 ships, omit the section entirely (no placeholder
   ranks — the old fake-leaderboard pattern is retired).
4. **Boards read / Quizzes / Topics** metric row — existing.
5. **Medals** — existing `progress.getMedals()` row.

Keep it a bottom-nav tab (no back-chevron). Theme toggle stays in ⋯ on Home.

### 5.6 Snippet Mode (spec)

- Entered ONLY from the Home header button. Full-screen (no bottom nav), with
  a close **✕** returning to Home.
- Content: the existing snippets feed (`Snippets.svelte` internals) as a
  vertical swipe/scroll of "Did you know?" cards.
- **Explicitly no pressure:** no Ws earned, no streak effect, no progress
  tracking, no counters. It is the rest space of the app. Copy at top:
  "Snippets — browse, no score."

### 5.7 Reader / PathView / Quiz

Interaction model unchanged (two-axis: ←→ BBs, ↑↓ floors; checkpoint quiz
every 3rd BB; workshops at their authored boundaries). Quiz.svelte gets a
visual redesign in Phase 5 (last chalk-styled view) but its route/flow stays.

## 6. The W economy (Phase 2)

**Naming:** the currency is **Ws** ("wins"). Singular "W". UI shows `W 128`.
Never "XP", never "points" for the currency itself ("points" is reserved for
weekly league points, §7).

### 6.1 Earning table (Ws for all activity — small for reading, big for winning)

| Action | Ws | Constraint (anti-farming) |
|---|---|---|
| Open a BB for the first time | **+1** | once per BB ever (key: bbid) |
| Reach a BB's deepest floor, first time | **+2** | once per BB ever |
| Checkpoint quiz: each correct answer | **+1** | first attempt at that checkpoint boundary only |
| Checkpoint perfect (3/3) | **+2** bonus | same |
| Workshop interaction correct | **+1** | first completion of that workshop only |
| Workshop completed | **+3** bonus | once per workshop |
| Path quiz: each correct answer | **+1** | every attempt (retakes allowed) |
| Path quiz first pass (≥60%) | **+5** bonus | once per topic |
| Path quiz perfect | **+10** bonus | once per topic |
| Recall check passed when due (Phase 4) | **+5** | only when the scheduler marked it due |

Re-reading, re-opening, and replaying a passed checkpoint earn **zero**. The
only repeatable W source is the recall loop — by design (that's the learning).

### 6.2 Implementation

- Extend the progress store (`src/lib/stores/progress.js`). Migrate storage to
  `version: 3` **preserving all v2 data** (boards/paths/quizzes/activity).
  New block: `ws: { total: number, events: [{t, type, amount, ref}] }` — cap
  `events` at the most recent 200 (trim on push).
- New API: `progress.awardWs(type, ref, amount)` (idempotent per the
  constraint column — check before award), `progress.getWs()`,
  `progress.getWeeklyPoints()` (§7).
- Hook points: `recordBoardOpen` (first-open W), a new
  `recordDeepestFloor(bbid)` called by Reader when depth = last floor,
  `CheckpointQuiz.finishCheckpoint`, workshop completion handler,
  `recordQuizResult`.
- Surfaces: W chip on Home header; W Score hero. A small `+n W` toast/pulse on
  award is welcome but must respect `prefers-reduced-motion`.

## 7. Consistency points + League (Phase 3, local-first)

- **Weekly league points** = `Ws earned this ISO week` + `10 × active days
  this week`. Consistency is the multiplier that matters: 7 quiet days beat
  one binge.
- **League** = a cohort of ~20–30 learners ranked by weekly points, resetting
  Monday 00:00 local. "Category of learners" = your cohort.
- **Local-first implementation:** define a provider interface now so the
  backend can drop in later without UI changes:
  ```js
  // src/lib/stores/league.js
  // getLeague() -> { name: 'Copper League', resetsAt: ISO,
  //                  members: [{ name, points, isYou }] }
  ```
  Ship `LocalLeagueProvider`: a deterministic simulated cohort (seeded from
  the user id so it's stable within a week), points drawn to bracket the
  user's own weekly points. **Label the section clearly: "Preview league —
  goes live with accounts."** No fake real-person implication.
- Real Supabase backend (tables `ws_events`, `league_members` + RLS) is a
  later phase; NOT in scope for DeepSeek now. The frozen placeholder
  `Leaderboard.svelte` and its fake ranks are deleted in this phase.

## 8. Streak (existing, restated)

- A **streak day** = any day with ≥1 W-earning action (open, dig, any
  assessment). Snippet Mode never counts.
- Streak logic already exists (`computeStreak` in progress.js) — keep, but
  re-point "activity" to W events in Phase 2 so the definitions coincide.

## 9. Media, content & pipeline standards (carried over — still true)

- Content ships via Supabase (`dynamicBoards.js` fetch-on-open); users never
  update the app for content. BB pipeline: JSON batch →
  `scripts/ingest-bbs.mjs` text pass → media upsert pass. Buckets
  `card-images` / `card-audio`.
- Per-floor media attaches in [src/lib/content/boardMedia.js](src/lib/content/boardMedia.js)
  keyed by board number → floor index. **Every media URL must carry a
  content-hash cache-bust** (`?v=<md5-prefix>`) because the service worker is
  cache-first (see `public/sw.js`). Pattern examples: BB 1094, BB 1130.
- Pixel-art GIF pipeline (established, keep): frames → ffmpeg two-pass
  palettegen/paletteuse (`scripts/anim-to-gif.mjs`), 640×640, no dither for
  flat art / light bayer for gradients, hold text frames ≥2s.
- Audio: ElevenLabs per floor, `{text, img?, audio?}` layer objects.
- Editorial: CONTENT.md voice; no em-dashes in BB prose; no exam framing.
- Design: `qubix-tokens.css` 5-colour system, Mulish, light+dark. Quiz.svelte
  is the ONLY remaining chalk view until Phase 5. Never hard-code hex.

## 10. BUILD PLAN for DeepSeek (in order; each phase = one PR-sized unit)

> Global guardrails for every phase: don't break the two-axis Reader; use
> `--qx-*` tokens only; no new fonts; no exam framing in any copy;
> `SUPABASE_SERVICE_ROLE_KEY` never client-side; after merging, deploy with
> `npm run deploy` (there is NO git-push auto-deploy); verify the gate still
> returns 401 anonymously.

### Phase 1 — Surface streamline (nav + renames + snippet mode + cuts)
**Files:** `src/App.svelte`, `src/lib/components/qubix/BottomNav.svelte`,
`src/views/Topics.svelte` → `src/views/Path.svelte`, `src/views/Stats.svelte`
→ `src/views/WScore.svelte`, `src/views/Home.svelte`,
`src/lib/content/paths.js` (ROADMAP + unit.paths fix), delete route/tab for
`Map.svelte`.
1. Tabs become `home | path | wscore` (labels: Home, Path, W Score). Update
   `TAB_VIEWS`/`TAB_ORDER`/`PUSH_VIEWS` in App.svelte accordingly.
2. Path tab per §5.4 (gateway sections, covered + `Soon` rows, ROADMAP const).
   Add `PHY_FORCES`, `PHY_INTRO` to `unit.paths`.
3. W Score tab per §5.5 items 2/4/5 (hero + league wait for Phases 2–3).
4. Home per §5.3 (gateway doors grid; snippet-mode header button).
5. Snippet Mode per §5.6 (full-screen push view, ✕ exits; remove snippets tab).
6. Cut Map (tab + route + import). Leave `Map.svelte` file deletion to a
   follow-up commit after one review pass.
**Accept:** app builds; 3 tabs render; all 4 gateways browsable; snippet mode
opens/closes from Home; no route can reach Map; deep links `?path=` still work.

### Phase 2 — W economy
Per §6. **Files:** `progress.js` (v3 migration + awardWs/getWs), `Reader.svelte`
(deepest-floor hook), `CheckpointQuiz.svelte`, workshop completion handler,
`Home.svelte` (W chip), `WScore.svelte` (hero).
**Accept:** fresh user earns exactly +1/+2 on first open/dig and nothing on
re-reads; checkpoint/workshop/path-quiz awards match §6.1; totals survive
reload; v2 users keep all history.

### Phase 3 — League (local-first)
Per §7. **Files:** new `src/lib/stores/league.js`, `WScore.svelte` (league
section), delete `Leaderboard.svelte` + `OtherUserStats.svelte` routes.
**Accept:** league renders a stable simulated cohort labeled as preview;
weekly points formula matches §7; Monday reset works (fake the clock in a test).

### Phase 4 — Recall scheduler (the assessment engine)
In `progress.js`: when a board reaches `checked`, stamp `dueAt = +1d`; each
passed recall advances interval 1→7→21d and mastery state (`checked →
recalled → mastered_1 → mastered_2`); a miss resets the interval to 1d.
Home gains **Today's session** (§5.3) sourcing due boards; each due item runs
a short check (reuse CheckpointQuiz with questions filtered to that board's
topic) and awards +5 W on pass. Either Today's session or Continue counts as
a streak day.
**Accept:** a board checked today appears due tomorrow; pass → next due in 7d;
miss → due again in 1d; Ws awarded only when due.

### Phase 5 — Quiz.svelte redesign (kill the last chalk view)
Rebuild on `--qx-*` tokens, Mulish, light+dark. Keep the flow + question bank
wiring (`getPathQuestions`). Add: wrong answer shows "Review this idea" →
deep-links to the source BB's deepest floor (requires tagging questions with
their source bbid as banks migrate — do a best-effort topic-level link until
then). Remove `tokens.css` from the app when nothing references it.
**Accept:** no chalk styles remain anywhere; both themes clean; deep-link
works from a wrong answer.

### Phase 6 — BBID adoption (identity hardening; can run parallel to 2–5)
Status: `supabase/migrations/0003_bbid.sql` exists; **blocked on the founder
running it in the Supabase SQL editor.** Once applied:
1. `scripts/ingest-bbs.mjs` + `scripts/ingest-final-review.mjs`: stamp the
   assigned `bbid` back into source docs; upsert by `bbid` (never
   delete-and-renumber).
2. `dynamicBoards.js`: fetch/cache by `bbid`.
3. `paths.js`, `boardMedia.js`, workshops keys: values already equal bbid at
   snapshot time — add a comment header switching their meaning to bbid.
**Accept:** re-running an ingest twice changes no bbid; media stays attached.

## 11. OPEN items (decided later — do not implement)

- Real league backend (Supabase tables + RLS + cohort assignment).
- Public launch switch (Supabase auth config, remove `BASIC_AUTH_PASSWORD`).
- Machine Workshop "parts" metadata (from the archived plan) — parked.
- Custom domain.

## 12. Decision log

| Date | Decision |
|---|---|
| 2026-06-20 | Public name = Qubix; Strata stays codename |
| 2026-07-03 | Anatomy ontology; floor-role labels abolished |
| 2026-07-03 | BBID = auto-increment integer in Supabase; sort_order display-only; stamp bbid into source docs |
| 2026-07-04 | Four gateways (Line/Atom/Bit/Unit) replace subject pills |
| 2026-07-05 | **Streamline:** 3 tabs = Home / Path / W Score + Snippet Mode from Home header; Map cut; Leaderboard folds into W Score; Author hidden |
| 2026-07-05 | Currency = **Ws**, earned for all activity (small read / big win), anti-farming per §6.1 |
| 2026-07-05 | League = weekly consistency points, fully specced, **local-first**; fake-rank placeholder retired |
| 2026-07-05 | Assessment stack settled: checkpoints + workshops + path quiz + spaced recall (1/7/21d) |
| 2026-07-05 | This file **fully replaces** QUBIX-MASTER-PLAN.md (archived) |
