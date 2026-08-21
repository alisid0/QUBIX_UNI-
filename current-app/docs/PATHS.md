# Paths & mastery system — spec for implementation

Status: **design only.** No code, storage, or quizzes built yet. This documents the structure so the data model, backend, and quizzes can be built against it. Cards live in `index.html` (the `DECK` array); this defines how they group into **paths** and how a learner's progress through a path is tracked.

---

## 1. Concept

- A **board** = one card in the deck (37 today).
- A **path** = a curated, ordered sequence of related boards — a coherent learning journey a student walks through. State and mastery attach to the **path**, not the individual board.
- Paths are grouped under three **subjects**: Physics, Maths, Chemistry.

Paths are **curated**, not auto-derived from the `topic` tag (raw tags fragment into single-card groups with gaps). The mapping below is the source of truth.

---

## 2. The path map (37 cards → 6 paths)

**Update:** P4, the old M3, M2 (Trigonometry), and the wave-mechanics half of the old P5 have all been merged into one umbrella path, **M3 · Coordinate geometry** (~220 BBs at full scope, see `COORDINATE-GEOMETRY.md` for the full sequence, `CONTENT-MAP.md` for the high-level pointer). Coordinate geometry isn't a topic alongside vectors, kinematics, trig, and waves — it's the lens they're all taught through, which is why these paths kept colliding (cards 26/27 across two paths was the first sign; trig's unit circle and waves' sine graphs were the second). What's left of the old P5 is genuinely optics (ray-based, not graph-driven) — renamed **P5 · Optics** in `CONTENT-MAP.md`.

### Physics
**P1 · Forces & motion** — cards 3, 4, 5, 6, 7, 8, 9
Rocks don't move → friction → surface up close → F=ma → the bus → third law → stopping → crumple zones.

**P2 · Energy** — cards 10, 11
Energy → energy is never lost.

**P3 · Gravity** — card 16
Everything pulls on everything. *(stub; will grow)*

### Maths
**M1 · Getting infinitely close** — cards 12, 13, 14, 15
Limits → measuring a circle → functions → applying a limit.

**M3 · Coordinate geometry** — cards 17, 18, 19, 20, 24 (trig) · 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32 (vectors/grid/curves)
What trig is → right triangle → sin/cos/tan → captain's problem → radians → scalars & vectors → resultants → resolving → three accelerators → number line → the grid → falling rock → the perfect arc → Dot's parabola → Dash's line → the kissing curves. Cross-subject: vectors, kinematics, and waves here keep their `tags.subject:physics`; trig, lines, and curves keep `tags.subject:maths`. The path itself sits under Maths because the grid is the throughline. Full 17-tier sequence (the plane → lines → curves → trig → waves → polar → parametric → complex plane → conics → vector fields → matrices → optimization) is in `COORDINATE-GEOMETRY.md`.

### Chemistry
**C1 · Into the atom** — cards 33, 34, 35, 36, 37
Science of exceptions → the mole → elements → the atom → subatomic particles.

---

## 3. OPEN DECISIONS (not yet settled by the author — resolve before building)

1. ~~Can a card belong to more than one path?~~ **Resolved.** P4 and M3 merged into one path (cards 26/27 no longer split across two).
2. **Intro cards.** Cards 1 (The whole game) and 2 (Stuff takes up space) are currently in **no path** — treated as deck intro. Confirm: leave unpathed, or assign.
3. **Content redundancy across paths.** Card 25 (three accelerators) and Card 6 (the bus) both teach velocity/acceleration, split across the new M3 and P1. Author chose to keep both earlier; flagged here as intentional, confirm it stays.
4. Act tags in `index.html` are still provisional (chemistry sits under Act II "Energy"; cards 25–29 under Act I). **Acts are removed per NOMENCLATURE.md** — paths are the sections now; this needs the eyebrow/`ACTS` code fix flagged there (still pending the content map rollout).

---

## 4. Progression states (per path, per learner)

A path climbs these six states based on learner activity:

| State | Trigger |
|-------|---------|
| **Wandered** | Opened the path once. |
| **Checked** | Opened the string of related boards in the path. |
| **Well read** | Took the path's quiz once and passed once. |
| **Recalled** | Returned to the path ~7 days later. |
| **Mastered once** | Passed the quiz with ≥9/10. |
| **Mastered twice** | Recalled the whole path after ~28 days AND passed quiz ≥9/10. |

Notes for implementation:
- States are ordered; a learner progresses upward. (Decide: can a state be lost/decay if not recalled? Not specified yet.)
- "Quiz" does not exist yet — to be built later. States 3, 5, 6 depend on it.
- Time gaps (7 days, 28 days) imply per-path timestamps in the stored record.

---

## 5. The three values (to define precisely later)

Three metrics are to be derived per path (and presumably rolled up per subject / overall):

- **Reading value** — from opening / reading activity (Wandered, Checked, Recalled).
- **Testing value** — from quiz performance (Well read, Mastered once/twice).
- **Recall value** — from returning after time gaps and re-passing (Recalled, Mastered twice).

Exact formulas are **not yet specified.** Author to define how each state contributes to each value, and how the three combine into an overall mastery picture.

---

## 6. Storage (later)

Progress will be stored via a backend (not built yet). The per-learner record will need, per path: current state, timestamps of key events (first open, quiz passes, last recall), and quiz scores. Design the schema so the six states and three values can be computed from stored events rather than stored as flags only.

---

## 7. What to do next (for Claude Code)

1. Resolve the open decisions in §3 with the author.
2. Add a `paths` manifest (subject → path → ordered card numbers) — likely a separate JSON/JS object rather than per-card fields, so a card can join multiple paths.
3. Define the value formulas (§5) and the state-transition rules (§4) precisely.
4. Build quizzes (separate workstream) — states 3/5/6 unblock once quizzes exist.
5. Build the backend/storage (§6).
Do not hard-code progress in the browser; the deck (`index.html`) stays a pure content+render layer until the backend lands.
