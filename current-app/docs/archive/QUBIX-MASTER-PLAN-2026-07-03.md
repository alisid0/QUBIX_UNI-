# QUBIX-MASTER-PLAN.md — canonical plan & agent handoff

> Place at repo root next to CLAUDE.md. This file consolidates every product
> decision from the July 2026 planning sessions and is the single source of
> truth for WHAT to build and WHY. CLAUDE.md remains the source of truth for
> HOW the codebase works (architecture, conventions, pipeline). If this file
> and older docs in `docs/` disagree, this file wins. Supersedes:
> CONTENT-MAP.md, CURRICULUM.md, HUBS.md, BRIDGES.md, PYRAMIDS.md,
> GROUND-ZERO.md, FLOOR-LAYOUT-SPEC.md and any per-topic planning docs.

---

## 1. Identity & audience (LOCKED)

- **Brand**: Qubix (user-facing). **Codename**: Strata (code/docs/commits).
  Never put "Strata" on a user-facing screen.
- **Tagline**: "Build simple machines. Assemble grand systems. Understand how
  the world really works."
- **Audience**: general curious learners — teens to adults, artists,
  musicians, filmmakers, students NOT on exam tracks. NEVER exam-centric.
  No JEE/GCSE framing anywhere in content or copy. Real-world angles come
  from music, film, games, money, news, tech.
- **Product philosophy** (lives in SYSTEMS, not structure — see §2): learning
  = knowing + understanding + the ability to recall + applying it somewhere
  you never thought it applied. Manifesto copy: *"Learning isn't knowing.
  It's understanding, remembering, and using it somewhere unexpected."*
- **Product weighting**: **50/50 split between BB content and assessments.**
  Assessment (quizzes, recall, mastery) is half the product, equal in design,
  build, and production priority to boards.

## 2. Ontology (LOCKED — structure carries NO meaning)

Anatomy model. Meaning emerges from organisation; no level "means" anything:

| Level | Anatomy | Definition |
|---|---|---|
| Floor | cell | One screen's worth of idea. Swipe down = next floor (deeper) |
| BB | tissue | Title + 3–5 floors. Swipe across = next BB |
| Topic | organ | A Main BB + 4–6 Baby BBs = one path in `paths.js` |
| Category | organ system | One of 5 Home groupings |

**Forbidden**: floor-role labels (hook/bedrock/payoff/anchor/etc.), tying
floors or BBs to pedagogical stages (knowing/understanding/recall), any
template that dictates what a given floor is "for".

**Surviving mechanical conventions** (conventions, not meanings):
1. Quiz questions are written against the deepest floor.
2. Every floor must read fine as a stopping point.
3. Floor counts: ~20% of BBs have 3 floors, ~70% have 4, ~10% have 5; the
   5-floor BBs carry the path's best media.
4. Main BB = a topic's lead board; Baby BBs = its 4–6 extensions. A path =
   1 Main + its Babies. This maps to the EXISTING Reader axes — no
   interaction rewrite.

## 3. The value loop (the product in one cycle)

Wander (swipe boards in a path) → Dig (descend floors) → Check (path quiz)
→ **Recall on schedule** (day 1 / 7 / 21 spaced checks) → Apply (bridges +
Machine Workshop) → mastery decays → boards return to the recall queue.

Mastery states already implemented in `src/lib/stores/progress.js`
(`strata-progress-v2`): unwandered → wandered → checked → well_read →
recalled → mastered_1 → mastered_2. The recall scheduler (§7.1) is the
missing piece that closes the loop.

## 4. Navigation: no map, three doors (LOCKED)

The Map tab is retired. Progression is data (a graph), never a screen.

- **Onboarding**: "What do you want to learn first?" over the six ROOT hubs
  (§5). One tap.
- **After finishing any topic, Home offers exactly 3 cards**:
  - **Deeper** — same subject, next node down the branch (hand-authored edge)
  - **Bridge** — cross-subject payoff (hand-authored edge; card copy explains
    the crossing: "you've been using these all through Motion")
  - **Fresh** — computed: entry topic of the least-recently-touched category;
    falls back to next-least-recent on collision/exhaustion; converts to a
    recall card if everything is exhausted
- **Soft gating only**: unmet-prerequisite suggestions show "best after X"
  and route to X — never a locked door.
- Topics grid remains the browse-all escape hatch.
- Data shape: new `src/lib/content/topicGraph.js`:
  `{ topicId: { category, needs: [], deeper: id, bridge: id } }`.
  Resolver ≈ 40 lines over the progress store.

## 5. Progression tree (bridge-first, LOCKED)

Bridges are planted FIRST as hubs; topics sprout from them. Three depths:

**ROOTS (Gen 1 — self-contained, the six onboarding doors):**
1. Logic & Boolean algebra → Logic gates · Set theory & relations · Induction
2. Binary & encoding → Computer organization · Combinational circuits · Sequential circuits
3. Functions & mappings → Quadratics & polynomials · Sequences & series · Complex numbers
4. Coordinates & transformations → Coordinate geometry · Trigonometry · Conic sections
5. Dimensional analysis & scaling → 1D Kinematics · Properties of matter · States of matter
6. Counting & combinatorics → Probability · Binomial theorem · Algorithms

**TRUNK (Gen 2–3 — unlock when a feeder branch reaches them):**
- Vectors (← Coordinates) → Laws of motion · 2D & projectile motion · Work, energy & power
- Motion⇄Calculus (← Scaling + Functions) → Limits · Differentiation · Integration (→ twig: Differential equations)
- Data from experiments (← Counting) → Statistics · Atomic structure (→ twigs: Bonding → Organic → Biomolecules; Modern physics) · Periodic table (→ twig: s/p-block)
- Graph theory (← Logic) → Data structures · Current electricity (circuits are graphs; → twig: Redox/electrochemistry) · Networks & communication
- Matrices & transformations (← Coordinates + Vectors) → 3D geometry · Rotational dynamics
- Vector fields (← Vectors + Differentiation) → Gravitation · Electrostatics · Magnetism & EMI
- Fourier/waves (← Trig + Sequences) → Waves & oscillations · Sound (musician tentpole) · Optics (filmmaker tentpole) · EM waves
- Probability distributions (← Probability + Statistics) → Thermodynamics · Chemical equilibrium (→ twig: Ionic equilibrium)

**CANOPY (Gen 4 — convergence, nothing sprouts; visible greyed from day 1 as
destination marketing):** Eigenvalues · Optimization · Stochastic processes ·
Linear algebra in QM · **ML Foundations** (the crown: statistics + matrices +
optimization meet).

Rules: max 2 hard feeders per topic (extra connections are dual-tag moments);
twigs never gate outside their subject; a bridge hub unlocks for suggestion
when ANY feeder reaches it; bridge BBs are single rows dual-listed in
`paths.js` (`pathsForCard()` already supports this).

## 6. Content program

### 6.1 The 5 categories (Home screen; 24-month atlas ≈ 115 unique Main BBs)
1. Numbers & Mathematical Foundations
2. Motion, Forces & Energy
3. Matter, Atoms & Reactions
4. Logic, Computation & Digital Systems
5. Grand Machines & Interdisciplinary Bridges (where bridge/canopy topics
   surface for browsing)

Full atlas ≈ 125 listed Mains (≈115 after bridge dedupe) × (1 + 4–6 babies)
≈ 625–875 boards over 24 months. NOT a launch promise.

### 6.2 LAUNCH CUT — 20 topics, ~185 boards, zero empty topic cards

| Topic (Main + babies) | Cat | Boards | Source |
|---|---|---|---|
| Units, dimensions & dimensional analysis (bridge) | 2 | 14 | LIVE 13 + 1 new |
| Scale, estimation & experimental error (bridge) | 2 | 8 | LIVE 5 + 3 new |
| 1D Kinematics | 2 | 12 | NEW (BB-946–950 seed) |
| Laws of motion | 2 | 14 | LIVE |
| Work, energy & power | 2 | 8 | NEW |
| Thermodynamics & heat | 2 | 8 | NEW |
| Current electricity | 2 | 10 | REFORMAT (ELECTRICITY-DRAFT.js) |
| Coordinate geometry | 1 | 15 | LIVE |
| Quadratics & polynomials | 1 | 10 | NEW |
| Matrices | 1 | 10 | REFORMAT (MATRICES-DRAFT.js) |
| Probability | 1 | 7 | NEW |
| Statistics | 1 | 6 | NEW |
| Limits & continuity | 1 | 6 | NEW |
| Atomic structure | 3 | 10 | LIVE |
| Bonding & molecular architecture | 3 | 13 | LIVE |
| Reactions & the mole | 3 | 4 | LIVE |
| Periodic table & periodicity | 3 | 6 | NEW |
| Binary & number systems | 4 | 8 | NEW |
| Logic: gates + Boolean (bridge) | 4 | 8 | NEW |
| Vectors (flagship bridge; BB #001 lives here) | 5 | 8 | NEW |

Launch bridges (all with a live bank): Vectors · Logic · Dimensional
analysis · Experimental statistics.
Totals: ~185 boards = 74 res-upgrade (live) + 20 reformat + ~91 new.

### 6.3 Release calendar
- **Day 45**: Differentiation · Trigonometry · 2D & projectile motion ·
  Inside the machine (computer organization + memory) · Workshop v1
- **Day 90**: Networks (packets/IP/DNS) · Making sense of data (bridge) ·
  Integration · Sequences & series
- **Month 6**: waves + sound (musician tentpole) · circular/rotational ·
  gravitation · functions-deep · 3D/coordinate transforms · combinational
  circuits · states of matter
- **Month 9**: optics (filmmaker tentpole) · electrostatics · magnetism ·
  algorithms · data structures · graph theory deep · complex numbers ·
  distributions · redox · organic basics
- **Month 12**: modern physics · semiconductors ("how chips work") · EM
  waves · ML foundations · eigenvalues · **Fourier** (artist flagship) ·
  optimization · equilibria · biomolecules
- Date-squeeze valve: slide Limits + Statistics to day 45. NEVER ship an
  unfinished topic; nothing visible shows "0/N".
- Content ships via Supabase (`dynamicBoards.js` fetch-on-open) — users never
  update the app for content. Add a "What's new" surface on Home/Topics.

## 7. BUILD BACKLOG (priority order for Claude Code)

### 7.1 Recall scheduler (joint P0 — the assessment engine)
In `progress.js`: when a board reaches `checked`, stamp `dueAt` (+1d); each
passed recall advances the interval (1→7→21d) and the mastery state
(checked → recalled → mastered_1 → mastered_2); a miss resets the interval.
Persist alongside `strata-progress-v2`; sync via existing `progress` table
for signed-in users. Home surfaces due boards as "Today's session".

### 7.2 Quiz.svelte redesign (joint P0 — the assessment face)
The last chalk-styled view; assessment is 50% of the product and cannot live
in legacy UI. Rebuild on `qubix-tokens.css` (`--qx-*`), Mulish, light+dark.
Support mixed question formats: retrieval, spot-the-error, order-the-steps,
numeric estimate, visual-pick. A wrong answer deep-links to the source
board's deepest floor (this hinge joins the two product halves).

### 7.3 Home two-door layout (P1)
Equal-weight doors: **Today's session** (due recalls + mixed check-in,
~3–4 min) and **Continue your path** (current topic's next boards). Either
alone counts as a streak day. Plus the three suggestion cards (§4) after a
topic completes, and the "What's new" surface.

### 7.4 topicGraph.js + suggestion resolver (P1)
Per §4/§5. `category` field added to paths. Onboarding = six root doors.

### 7.5 Machine Workshop (P2 — ships day 45)
Parts inventory + assemblable machines (first: the bicycle). `parts`
metadata (1–2 per BB) authored into every board from BB #001 and stored on
the `cards` row NOW — retrofitting parts later is the expensive path.
Workshop absorbs the retired Map's "feeling of accumulation" job with Stats.

### 7.6 Supporting
- Questions move to Supabase alongside cards (bank size §8 makes
  `questions.js` static file untenable); author flow gains question fields.
- Leaderboard/social backend stays FROZEN (placeholder flags remain).
- SEO splash copy: replace "Brilliant alternative" framing with the
  manifesto line; custom domain decision precedes deleting `middleware.js`
  (site currently 401-gated = correctly invisible to crawlers).

## 8. Assessment standard (50% of the product)

- **5–7 questions per BB**, mixed formats (see 7.2), written against the
  deepest floor AT AUTHORING TIME — enough variety to survive 4 spaced
  recalls without the question itself being memorised.
- Launch bank ≈ 1,000–1,200 questions. Tone follows the audience lock:
  curious, real-world, never exam-drill.
- Wrong answers map to their source board (seed data for recall + deep-link).

## 9. Media standard (master_creation)

Every BB at final res before ingestion sign-off: text floors + one
illustration (flat-vector framework via `gen-image-prompts.mjs`) + ElevenLabs
audio per floor + question set; Manim floor only where motion IS the concept
(~25% of BBs); interactive/Three.js only for ~8–10 showpieces (draggable
vector resultant, rotatable 3D molecule, matrix image-filter, circuit
sandbox, truth-table→gate toggle, Monty Hall, derivative zoom, unit circle).
Pipeline unchanged: JSON batch → `scripts/ingest-bbs.mjs` text pass → media
upsert pass (kicker-number matching), buckets `card-images`/`card-audio`.

## 10. Production system

- **Mode 1 (BB #001–#010)**: one BB at a time, end-to-end to final res.
  Establishes templates, voice, and true hours/BB. Exit: three consecutive
  BBs without inventing anything new.
- **Mode 2 (BB #011+)**: days 1–4 text sprints (2–3 Mains/day: floors +
  baby titles + question set + media briefs + parts) · day 5 illustration &
  audio batch · day 6 animation batch · day 7 ingest + phone review + weekly
  voice-consistency pass. Final res is the only "done"; it is reached in
  batched passes.
- Honest projection: ~55–65 Mains at final res per 45 days (NOT 3/day×45).
  The launch cut of 20 topics fits with headroom.

## 11. Current codebase state (as of this handoff)

Per CLAUDE.md: Svelte/Vite SPA live; Supabase auth+progress wired with
guest/localStorage fallback; mastery machine implemented; Qubix design system
everywhere except Quiz.svelte; dynamic BB pipeline live (cards 85+ via
Supabase); Author flow exists (localStorage only, not yet wired to a review
table); leaderboard/stats medals are placeholder; review build password-gated
at qubix.university via `middleware.js` (fails open without
BASIC_AUTH_PASSWORD env var).

**BB count at final res (text+audio+illustration+question set): 0.**

## 12. Immediate next action

**BB #001**: Vectors Main BB — "Why 5 + 5 isn't always 10". Five floors
ending at vector addition proper; payoff material: crosswinds, game physics,
GPS headings (no exam framing); one flat-vector illustration; one Manim
scene (two arrows sweeping through angles, resultant shrinking 10→0);
audio per floor; 5–7 mixed-format questions vs the deepest floor; 1–2
Workshop parts defined; dual-tagged categories 1+2; ingest, open on a phone,
stranger-test, sign off. Then BB #002.

## 13. Decision log (for archaeology)

| Date | Decision |
|---|---|
| 2026-06-20 | Public name = Qubix; Strata stays codename |
| 2026-07-03 | Recall loop = core wedge; scheduler specced |
| 2026-07-03 | Audience = general curious learners; exam framing banned |
| 2026-07-03 | Floor-role labels abolished; anatomy ontology adopted |
| 2026-07-03 | Map retired; three-door suggestion model + bridge-first tree |
| 2026-07-03 | Launch cut = 20 topics ≈ 185 boards; calendar through M12 |
| 2026-07-03 | Main/Baby BB = path mapping (no interaction rewrite) |
| 2026-07-03 | Machine Workshop adopted; parts metadata from day one |
| 2026-07-03 | Product weighting locked 50/50 content/assessment |
| 2026-07-03 | Production: Mode 1 (serial, #001–#010) → Mode 2 (batched) |
