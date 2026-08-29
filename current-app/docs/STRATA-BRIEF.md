# STRATA — complete project brief (single source of truth)

> **ARCHIVED — NOT A SOURCE OF TRUTH.** The static chalkboard application
> described here is retired. Use `README.md` and
> `docs/SOURCE-OF-TRUTH.md` for current architecture and media policy.

> **For Claude Code:** read this whole file first. It contains everything — what the project is, how the code works, the full content map, the design system, the editorial voice, and the planned mastery system. You should not need any other file to get oriented. (Other `.md` files in the repo are legacy/partial; this one supersedes them.)
>
> **Naming:** the locked vocabulary is in **NOMENCLATURE.md** — use those terms (BB, Floor, Tier, Path, Subject, Topic) and no synonyms. Note two things settled there: a "card/board" is now officially a **BB**; a depth-step inside it is a **Floor**; and **"Act" is removed** — paths are the sections, and the reader eyebrow should show the path name (a flagged code change, not yet done).

---

## 0. What this is

**Strata** is a swipeable, tap-to-descend STEM microlearning deck. Hand-drawn chalk on a green chalkboard. Pure static site — one HTML file, no framework, no build step, no dependencies except web fonts.

Two axes of interaction:
- **Swipe ← / →** (or arrow keys, or on-screen arrows): move **across** cards.
- **Tap "dig in" / ↓** : descend into **deeper layers** of the same card. **↑** ascends.

Each card ("board") teaches one idea. Layer 0 is the swipe-card face; deeper layers go: concrete → definition → in action → the law/maths. A card may have an illustration on layer 0.

**Run it:**
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Serve from the project root so `images/` resolves. Don't open via `file://` (images/fonts may fail).

**Files that matter:**
```
index.html        the reader: deck (37 cards) + engine + styling, all in one file
images/           card-01.png … card-11.png  (illustrations; cards 1–11 only)
design/           app-shell design prototypes (auth, map, leaderboard) — see §9
draft/index.html  older unedited remainder, NOT publishable, ignore for now
```

---

## 1. How a card is defined

All content lives in the `DECK` array in `index.html`. The helper:

```js
function C(act, kicker, title, layers, img, tags){
  return {act, kicker, title, layers, img: img||null, tags: tags||null};
}
```

- **act** — `"I"`…`"V"`. Groups cards into the section shown in the eyebrow (see ACTS object).
- **kicker** — e.g. `"Card 07"`. The label shown in the eyebrow. Must stay continuous (Card 01, 02, …).
- **title** — shown on text layers.
- **layers** — array of HTML strings, one per depth. `null` skips that depth. Layer 0 = swipe card.
- **img** — `"images/card-NN.png"` **or `null`**. ⚠️ Must be `null` if there's no image, never omitted — see the bug note in §5.
- **tags** — `{subject, topic, concept, ground, buildsOn:[...]}`. Metadata. `buildsOn` lists prerequisite card labels (a dependency graph). `ground` is the **tier** (difficulty band): `g0` = tier 0 = the base of the two pyramids. All cards are currently `g0`/t0. See PYRAMIDS.md for the full model.

**Verbatim sample (Card 21):**
```js
  C("V","Card 21","How much isn't enough",[
    "<p>You're at your house and you want to get to the playground...</p>...",
    "<p>So let's fix the directions...</p>...",
    "<p>Physics splits these into two kinds of quantity. A <strong>scalar</strong>...</p>...",
    "<p>Look at your walk again...</p>...",
    "<p>So how long is the bird's flight?...</p><div class='formula'>R² = x² + y²<span class='gloss'>The resultant squared equals the two sides squared and added.</span></div>..."
  ],null,{subject:"physics",topic:"vectors",concept:"scalars-vectors; resultant; pythagoras",ground:"g0",buildsOn:["Card 06"]}),
```

**Engine behaviour for layer 0:** if `img` is set, layer 0 shows the image full-bleed (no card text); deeper layers render their text. If `img` is `null`, layer 0 shows text like any other layer.

**The counter** ("01 / NN") is hardcoded in the HTML AND auto-derived from `DECK.length` by JS. Update the hardcoded value when you add/remove cards, or it flashes wrong for a moment.

---

## 2. The full deck (37 cards)

ACTS (the five section labels, from the `ACTS` object — note these are provisional, see §6):
```
I   · Things move, and something makes them
II  · Energy and the idea of change
III · Getting infinitely close
IV  · Gravity, and the pull between things
V   · Trigonometry, vectors and angles
```

| # | Act | Subject | Topic | Img | Title |
|---|-----|---------|-------|-----|-------|
| 1 | I | physics | foundations | ✅ | The whole game |
| 2 | I | physics | matter | ✅ | Stuff takes up space |
| 3 | I | physics | mechanics | ✅ | Rocks do not move (on their own) |
| 4 | I | physics | mechanics | ✅ | The thing your eyes can't see |
| 5 | I | physics | mechanics | ✅ | The second big rule |
| 6 | I | physics | mechanics | ✅ | A bus between stops |
| 7 | I | physics | mechanics | ✅ | It always pushes back |
| 8 | I | physics | mechanics | ✅ | How hard the stop is |
| 9 | I | physics | mechanics | ✅ | Why crumple zones exist |
| 10 | II | physics | energy | ✅ | Energy |
| 11 | II | physics | energy | ✅ | Energy is never lost |
| 12 | III | maths | calculus | ⬜ | Limits |
| 13 | III | maths | calculus | ⬜ | Measuring a circle |
| 14 | III | maths | functions | ⬜ | Functions |
| 15 | III | maths | calculus | ⬜ | Applying a limit |
| 16 | IV | physics | gravity | ⬜ | Everything pulls on everything |
| 17 | V | maths | trigonometry | ⬜ | What trigonometry is |
| 18 | V | maths | trigonometry | ⬜ | The parts of a right triangle |
| 19 | V | maths | trigonometry | ⬜ | Sine, cosine, tangent |
| 20 | V | maths | trigonometry | ⬜ | Cracking the captain's problem |
| 21 | V | physics | vectors | ⬜ | How much isn't enough |
| 22 | V | physics | vectors | ⬜ | When two things push at once |
| 23 | V | physics | vectors | ⬜ | Splitting a diagonal |
| 24 | V | maths | trigonometry | ⬜ | The made-up 360 |
| 25 | I | physics | mechanics | ⬜ | The three accelerators |
| 26 | I | maths | coordinate-geometry | ⬜ | The infinite tightrope |
| 27 | I | maths | coordinate-geometry | ⬜ | The grid of reality |
| 28 | I | physics | kinematics | ⬜ | The two lives of a falling rock |
| 29 | I | physics | kinematics | ⬜ | The perfect arc |
| 30 | V | maths | coordinate-geometry | ⬜ | Dot and the square game |
| 31 | V | maths | coordinate-geometry | ⬜ | Dash and the staircase |
| 32 | V | maths | coordinate-geometry | ⬜ | The kissing curves |
| 33 | II | chemistry | foundations | ⬜ | The science of exceptions |
| 34 | II | chemistry | stoichiometry | ⬜ | The chemist's dozen |
| 35 | II | chemistry | periodic-table | ⬜ | The cosmic menu |
| 36 | II | chemistry | atomic-structure | ⬜ | The 80th cut |
| 37 | II | chemistry | atomic-structure | ⬜ | The three puzzle pieces |

**Illustrations:** floor-0 images exist for BBs 1–11 and 21 (BBs 1–9 and 21 are **1:1 square**; 10–11 floor-0 still older landscape). Deeper-floor (textbook) diagrams now exist for BB10 (`card-10-b`), BB11 (`card-11-b`), and BB21 (`card-21-b`). Remaining BBs (12–20, 22–37) floor-0 art and most deeper-floor diagrams are still to be made — see IMAGE-PROMPTS.md. Naming: floor-0 = `card-NN.png`; deeper-floor diagrams = `card-NN-b.png`, `-c.png`… The layout model (image-led floor 0 + textbook deeper floors) is specced in **FLOOR-LAYOUT-SPEC.md** — not yet built into the engine.

---

## 3. Editorial voice (apply to every new or edited card)

Hard-won across a full editing pass. New content must match:

- **Name things plainly, define them properly** — including the plain textbook definition when that's the honest thing.
- **Concrete scenarios over clever metaphors** — the bus between stops, the bag of bricks on a skateboard, the puck on concrete vs ice, cutting iron 80 times. Never "the universe is lazy."
- **No editorialising / hype** — cut "the most-used sentence in all of physics," "mind-blowing," "should make your hair stand up," "the one people find weirdest." Let the reader decide what's striking.
- **Mechanism, not just statement** — explain *why* (the rate of deceleration, not just "time matters").
- **One earned philosophical line is allowed** when it opens something real (e.g. "energy is the reason for existence"). Sparingly — one per card at most.
- **Kill cute parallelism and em-dash stacking** — short, clean sentences over dash-joined clauses. ("The feather sled leaps; the lead sled creeps" is exactly the tell to avoid.)
- **Minimal inline bold** — reserved for the genuine first introduction of a named term.

**Already cut/merged — do NOT re-add:** a "why don't forces cancel" card; a standalone "car and wall" setup card; a "roller coaster" energy card; separate thin position/velocity/acceleration cards (merged into the bus, card 6); a "two flavours of energy" card (merged into card 11); a "look closer at the surface / pores" card (its rough-vs-smooth image now serves card 4).

---

## 4. Design system (keep all new work in sync)

Chalk on a dark green board in a wooden frame. Not a SaaS dashboard. Use the CSS variables in `:root` — never raw hex, never a new font.

**Colour tokens:**
```
Board (card bg, warms/darkens as you descend by depth):
  --board-1 #1f3b30  (surface)   --board-2 #24463a
  --board-3 #2c2f2a              --board-4 #262422  (bedrock)
Frame:   --frame #5a4632   --frame-dark #3f3022
Page bg: --bg-1 #152a22
Chalk:   --chalk #f4f1e9 (main)   --chalk-dim #c7ccc0   --chalk-faint #8fa093
Emphasis: --chalk-yellow #f2d585 (primary)   --chalk-green #a9d6a0 (secondary)   --chalk-blue #9ec6d8 (rare)
Hairline: --line rgba(244,241,233,0.16)
```
Emphasis rule: yellow for the single most important term; green for secondary/labels; never more than two emphasis colours in one card.

**Fonts (Google Fonts, loaded in `<head>`):**
```
--hand-display  "Architects Daughter"  → card titles (chalk scrawl)
--hand          "Kalam"                → body text
--print         "Patrick Hand"         → labels, eyebrows, buttons, counter
```
No sans-serif in content. (`--sans` exists only as fallback.)

**Chalk texture cues:** borders are **dashed** (`1.5px dashed var(--chalk-…)`), small printed elements get a slight `rotate(-1deg)`, the slab has a `12px solid var(--frame)` wooden border with inset shadow. Formula boxes: dashed `--chalk-green` border, dark translucent fill, plain-language italic gloss under the formula. A faint drifting chalk-dust particle canvas sits behind everything (tint warms by act).

**Layout:** text cards `min(680px,100%)`; image cards `min(860px,100%)`. Image-mode card uses `background-size:contain` (whole image visible, may letterbox) — change to `cover` to crop-fill. Respects `prefers-reduced-motion`.

**New illustration prompt (landscape 16:9 or 3:2):**
> Hand-drawn white chalk illustration on a dark green chalkboard (#1f3b30). Slightly rough, imperfect chalk lines with faint dust. Simple, clear, diagrammatic — a physics teacher's quick board sketch, not polished vector art. Off-white chalk for main lines; pale yellow (#f2d585) and pale green (#a9d6a0) chalk for emphasis/labels only. No photography, no realism, no gradients. Flat educational diagram, generous empty board space.

Conventions: stick figures / clean single-weight outlines; labels in chalk caps underlined yellow/green; arrows for forces/motion; dashed lines for reference levels; one clear idea per image; box any formula with a dashed border. Save as `images/card-NN.png`. **Proof text/equations — generators garble them; the card's own dashed formula box can carry the equation instead.**

---

## 5. Known bug (fixed) — don't reintroduce

Cards passing the `tags` object directly after layers (`],{subject…}`) put it into the **`img` slot**, making the card render a broken `[object Object]` background image with NO text. This had silently broken 6 cards. **Fix / rule:** a text-only card MUST pass `null` for img: `],null,{subject…}`. When adding any card without an image, always include the explicit `null`.

---

## 6. OPEN STRUCTURAL ISSUES (resolve with author before big changes)

1. **Acts vs paths vs tiers are different axes.** Act tags are provisional. Chemistry (cards 33–37) sits under Act II "Energy" as a placeholder. Cards 25–29 (a kinematics/2D-motion thread) sit under Act I. A restructure likely wants acts to mirror the paths in §7. Don't renumber/retag wholesale without confirming.
2. **`ground` field = tier.** Every card carries `ground:"g0"` = tier 0 = the base of the two pyramids (see PYRAMIDS.md). There's also a `GROUND-ZERO.md` tracking syllabus *completeness*. An open decision is whether to rename `ground → tier`. Tier, subject, path, act, and buildsOn are all distinct axes — keep them consistent.

## 6a. The two-pyramid model (PYRAMIDS.md)

Strata is structured as **two inverted pyramids** — one for **content** (learning), one for **assessment** (quizzes/tests/recalls) — both widest at the base. The base **tier (t0)** is the broadest, most foundational layer: many cards, plain language, *introducing* ideas without drilling formulas. Higher tiers narrow: fewer cards, more advanced, formula-naming, building on the base. The assessment pyramid mirrors the content one tier-for-tier, and is the home of the quizzes the mastery system (§7) needs.

**Everything built so far is t0 (the base).** Tier is stored in the `ground` field (g0 = t0). Full model, naming, and the per-axis table are in **PYRAMIDS.md**.

---

## 7. Mastery system (designed, NOT built — future workstream)

State/progress will attach to a **path** (a curated ordered group of related cards), per subject. Quizzes and storage/backend do **not** exist yet. `index.html` must stay a pure content+render layer until the backend lands — do not hard-code progress in the browser.

**Curated path map (37 cards → 8 paths):**

*Physics*
- **P1 Forces & motion** — 3,4,5,6,7,8,9
- **P2 Energy** — 10,11
- **P3 Gravity** — 16  *(stub, will grow)*
- **P4 Vectors & motion in 2D** — 21,22,23,25,26,27,28,29

*Maths*
- **M1 Getting infinitely close** — 12,13,14,15
- **M2 Trigonometry** — 17,18,19,20,24
- **M3 Graphs & curves** — 26,27,30,31,32

*Chemistry*
- **C1 Into the atom** — 33,34,35,36,37

**Six progression states (per path, per learner):**
| State | Trigger |
|-------|---------|
| Wandered | opened the path once |
| Checked | opened the string of related boards in the path |
| Well read | took the path's quiz once and passed once |
| Recalled | returned ~7 days later |
| Mastered once | passed quiz with ≥9/10 |
| Mastered twice | recalled whole path after ~28 days AND passed quiz ≥9/10 |

**Three derived values** (formulas TBD by author): **reading value** (from opening/reading — Wandered, Checked, Recalled), **testing value** (from quiz — Well read, Mastered ×1/×2), **recall value** (from time-gap returns + re-pass — Recalled, Mastered twice).

**Open decisions for the author before building this:**
- Can a card belong to >1 path? (26 & 27 are in both P4 and M3 here. Default assumed: yes.)
- Intro cards 1 & 2 are in no path — leave unpathed or assign?
- Cards 25 & 6 both teach velocity/acceleration (split across P4/P1) — confirm keeping both.
- Do states decay if not recalled? Not specified.

**Build order when ready:** (1) resolve open decisions, (2) add a `paths` manifest as a separate JS/JSON object — *not* per-card fields, so a card can join multiple paths — subject → path → ordered card numbers, (3) define value formulas + state-transition rules precisely, storing events+timestamps so states/values are computed not just flagged, (4) build quizzes (unblocks states 3/5/6), (5) build backend/storage.

---

## 8. Current status summary

- **37 cards**, numbered continuously, verified rendering with no JS errors.
- Content spans: forces & motion, energy, calculus foundations, gravity, trigonometry, vectors, 2D motion, coordinate geometry, chemistry (scale → mole → atom → subatomic).
- **Illustrations: cards 1–11 only.** 26 cards await images.
- Mastery system, quizzes, backend: designed, not built.
- **App-shell designs exist** (auth, first-run, learning map, leaderboard) as prototypes in `design/` — see §9.
- **The full curriculum is mapped** — 50 pre-university STEM topics (the target territory) with the 37 existing BBs plotted against them — in **CURRICULUM.md**. Shows what's started vs the big gaps (Phase 1 arithmetic/algebra is empty; large physics & chemistry blocks untouched).
- Immediate candidate next steps: illustrate cards 12–37; resolve the act/path restructure (§6); build the app shell from the `design/` prototypes; or begin the mastery manifest (§7).

---

## 9. App-shell design layer (`design/` folder)

The reader (`index.html`) is the existing product. A **surrounding app shell** has been *designed* (not yet built into the product): onboarding, a learning map driven by the six mastery states, and a leaderboard. The designs live in `design/`:

```
design/
  DESIGN-HANDOFF.md     full screen-by-screen design spec (tokens, every view, reflows)
  Strata_Auth.dc.html   prototype: Welcome, Create account, Verify phone, Log in, "You're in" first-run
  Strata_Map.dc.html    prototype: Subjects overview, cumulative Learning Map, Leaderboard (D/W/M)
  SubjectMark.dc.html    reusable chalk subject-icon component (physics / maths / chem)
  support.js            the runtime that renders the .dc.html prototypes (React under the hood)
```

**These `.dc.html` files are design references, NOT production code.** They render through `support.js` (a "Design Component" authoring format). To preview: keep the `design/` folder intact (the files reference each other and `support.js` as siblings) and open a `.dc.html` in a browser. The gray gallery background and device bezels in the mockups are review scaffolding — build only the screens inside the device frames.

**The task** (per DESIGN-HANDOFF.md): recreate these screens in the target codebase using its own components and the design tokens in §4 / the handoff. They reuse Strata's exact chalkboard system — no new colours or fonts. `--accent` and `--frame` (wood tone) are themeable tokens. Phone-first (≈330×724), with tablet (≈834×1112) and desktop (≈1280) reflows; 44–48px tap targets.

**The learning map is the visual front-end of the §7 mastery system** — the six states (Wandered → … → Mastered twice) drive node appearance on the map, and the leaderboard ranks on the derived values. So §7 and the map prototype are two halves of the same feature: resolve §7's open decisions before building the map for real.
