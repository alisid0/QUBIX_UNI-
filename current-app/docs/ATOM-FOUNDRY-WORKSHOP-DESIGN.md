# Atom Foundry Workshop Design — DeepSeek Implementation Brief

> **Status:** Implementation spec, written 2026-07-13.
> **Audience:** DeepSeek (or any coding agent) implementing against this repo.
> **Authority:** Follow this file exactly. Where it is silent, copy the
> conventions of `docs/FUNCTIONS-WORKSHOP-DESIGN.md` and its shipped
> implementation `src/lib/components/assessments/FunctionMachineLab.svelte`
> (commit e3b5020) — that pair is the reference for how a brief becomes code
> in this codebase.
> **Scope:** Part A = improvements to existing workshops. Part B = the new
> chemistry signature lab, **Atom Foundry**. Part C = shared engineering
> rules, pitfalls, and the verification protocol. Do Part B first; Part A
> items are independent and can follow in any order.

---

## Part B — Atom Foundry (do this first)

### B.0 Purpose

The chemistry BBs already teach the atom in words: protons define identity
(BB "The identity badge", "The absolute identity"), neutrons steady the
nucleus ("The peacekeepers"), electrons sit in shells with strict capacities
("Electron shells: where electrons live", "The rungs of the ladder", "The map
of shells"), losing/gaining electrons makes ions ("Ions: atoms that have lost
or gained electrons", "The imbalance"), and different neutron counts make
isotopes ("Isotopes: same element, different weight", "The heavy twin").

Atom Foundry turns all of that into a machine the learner operates:

**tap protons into a nucleus and watch the element's identity change live;
steady it with neutrons; fill electron shells under the capacity rule; then
strip and catch electrons to forge ions.**

The learner should leave able to say: "Protons name the atom. Neutrons change
the weight, never the name. Electrons fill shells inner-first, and moving
them makes ions — the proton count never moved."

### B.1 Name and placement

- Component: `src/lib/components/assessments/AtomFoundryLab.svelte`
- Interaction type string: `atomfoundry`
- Module id: `atom-foundry`
- Module placement: **Chemistry track, FIRST module** (before `chemistry-core`)
  in `src/views/WorkshopLab.svelte`
- Module label: `Foundry`
- Module title: `Atom Foundry`
- Module subtitle: `Forge a nucleus, fill the shells, and strip electrons into ions.`
- Module pathId: `ATOM_001`

The existing `AtomBuilder.svelte` (counter-stepper component) stays untouched
and keeps serving the `chemistry-core` module. Atom Foundry is the guided
lab; AtomBuilder remains the quick drill.

### B.2 Element data (embed exactly this table in the component)

```js
// Z → element. shells = electron configuration by shell (simple 2/8/8/2 model).
// n = most common neutron count (the isotope we call "standard" in copy).
const ELEMENTS = [
  { z: 1,  symbol: 'H',  name: 'Hydrogen',   n: 0,  shells: [1] },
  { z: 2,  symbol: 'He', name: 'Helium',     n: 2,  shells: [2] },
  { z: 3,  symbol: 'Li', name: 'Lithium',    n: 4,  shells: [2, 1] },
  { z: 4,  symbol: 'Be', name: 'Beryllium',  n: 5,  shells: [2, 2] },
  { z: 5,  symbol: 'B',  name: 'Boron',      n: 6,  shells: [2, 3] },
  { z: 6,  symbol: 'C',  name: 'Carbon',     n: 6,  shells: [2, 4] },
  { z: 7,  symbol: 'N',  name: 'Nitrogen',   n: 7,  shells: [2, 5] },
  { z: 8,  symbol: 'O',  name: 'Oxygen',     n: 8,  shells: [2, 6] },
  { z: 9,  symbol: 'F',  name: 'Fluorine',   n: 10, shells: [2, 7] },
  { z: 10, symbol: 'Ne', name: 'Neon',       n: 10, shells: [2, 8] },
  { z: 11, symbol: 'Na', name: 'Sodium',     n: 12, shells: [2, 8, 1] },
  { z: 12, symbol: 'Mg', name: 'Magnesium',  n: 12, shells: [2, 8, 2] },
  { z: 13, symbol: 'Al', name: 'Aluminium',  n: 14, shells: [2, 8, 3] },
  { z: 14, symbol: 'Si', name: 'Silicon',    n: 14, shells: [2, 8, 4] },
  { z: 15, symbol: 'P',  name: 'Phosphorus', n: 16, shells: [2, 8, 5] },
  { z: 16, symbol: 'S',  name: 'Sulfur',     n: 16, shells: [2, 8, 6] },
  { z: 17, symbol: 'Cl', name: 'Chlorine',   n: 18, shells: [2, 8, 7] },
  { z: 18, symbol: 'Ar', name: 'Argon',      n: 22, shells: [2, 8, 8] },
];
```

Shell capacities for this lab: `[2, 8, 8]`. Do not model subshells or the
3d exception — the BBs teach the simple ladder and the lab must match them.

### B.3 The atom stage (shared visual, all stages render it)

One SVG (`viewBox="0 0 260 260"`, class `af-stage`) that every stage reuses:

- **Nucleus** at center (130, 130): a cluster circle of radius
  `18 + protons + neutrons` px (cap at 34). Inside it, two stacked numbers:
  `{protons}p` in the accent family and `{neutrons}n` in the dim text color.
  Class `af-nucleus`. When a stage adds a particle, apply a one-shot CSS
  `transform: scale(1.12)` pulse via a keyed class (120 ms, `ease-out`) —
  skip the pulse entirely under `prefers-reduced-motion`.
- **Shell rings**: concentric circles at radii 52, 86, 118, stroke
  `var(--qx-border-2)`, dasharray `4 4`, class `af-shell`. Only render rings
  up to the highest shell that has capacity for the current stage's element
  (ring count = `ELEMENTS[z-1].shells.length`, minimum 1).
- **Electrons**: circles r=7, fill `var(--qx-accent)`, positioned on their
  ring at angles distributed evenly: for shell with `count` electrons,
  electron `k` sits at angle `(k / capacity) * 2π - π/2` where capacity is
  the shell's max (2/8/8) — NOT `count` — so electrons occupy fixed "seats"
  and adding one never moves the others. Class `af-electron`; newly added
  electron gets a 150 ms scale-in.
- **Identity badge** below the SVG (not inside it): a pill showing
  `{symbol} · {name}` when `protons >= 1` (element = `ELEMENTS[protons-1]`),
  or `— · empty foundry` when 0. When protons change, the badge text swaps
  and pulses once. Class `af-badge`.
- **Meters row** under the badge — three chips, classes `af-meter`:
  - `A = {protons + neutrons}` (mass number)
  - `charge = {protons - electrons}` rendered as `0`, `+1`, `-2` etc.;
    chip turns `--qx-green` family at charge 0 with a full outer shell,
    `--qx-yellow` family when positive, `--qx-accent` family when negative.
  - `e⁻ = {electrons}`

Layout: the SVG max-width 250px centered; the whole component max-width
390px, flex column, gap 13px — identical shell to `FunctionMachineLab`.

### B.4 Stage rail

Copy the `fm-stages` pattern exactly (chips with `cur`/`done` states):

```js
const STAGES = [
  { id: 'forge',    label: 'Forge' },
  { id: 'steady',   label: 'Steady' },
  { id: 'isotope',  label: 'Isotope' },
  { id: 'shells',   label: 'Shells' },
  { id: 'cation',   label: 'Strip' },
  { id: 'anion',    label: 'Catch' },
  { id: 'identify', label: 'Name it' },
];
```

Every stage: retry-with-hint until correct (mastery gate, never scored per
stage). Red hint box class `af-hint`, green success box class `af-good`,
advance button `af-primary` labeled `Next station →` (last stage:
`Finish the foundry`). Completion screen mirrors `fm-complete` and calls
`onDone(1, 1)` from its Continue button. Props: exactly
`export let prompt` and `export let onDone = () => {}` — nothing else.

### B.5 Stage-by-stage spec

#### Stage 1 — Forge (protons define identity)

State: `protons` starts 0. Controls: one button `+ proton` (class
`af-add-p`). Each tap: protons +1, nucleus pulses, identity badge updates
LIVE — this live identity flip is the entire point of the stage.

Target: **carbon** (6 protons).

- Instruction line: `Drop protons into the nucleus until the foundry reads Carbon.`
- If the learner overshoots (protons > 6): show a `− proton` button too
  (class `af-remove-p`; render it from the start but disabled at 0) and hint:
  `Too far — that's {name} now. The proton count IS the name. Pull one back out.`
- Completion: `protons === 6`. Success copy:
  `Locked. Six protons is carbon, always and everywhere. Change the count and it is simply a different element.`

#### Stage 2 — Steady (neutrons add mass, not identity)

Carries the carbon nucleus forward. State: `neutrons` starts 0. Controls:
`+ neutron` / `− neutron` (classes `af-add-n` / `af-remove-n`). Watch the
`A` meter climb; the identity badge must visibly NOT change — after the
first neutron is added, flash a caption under the badge:
`still carbon` (class `af-still`, fades after 1.2 s).

Target: **carbon-12** (6 neutrons).

- Instruction: `Neutrons are the peacekeepers — pack them in until the mass number A reads 12.`
- Wrong-state hint (any check with A ≠ 12): `A counts protons plus neutrons. You have {p} protons, so you need {12 - p} neutrons.`
  (No explicit check button: auto-complete the instant `neutrons === 6`.)
- Success copy: `Carbon-12 assembled. The neutrons added weight and calm, and the name never moved.`

#### Stage 3 — Isotope (same element, new weight)

Continues from carbon-12. Instruction:
`Forge the heavy twin: carbon-14, the isotope used for dating ancient things.`

- Same +/− neutron controls. Auto-complete at `neutrons === 8`.
- While A is 13: caption `carbon-13 — also real, also carbon.` (class `af-still`).
- Success copy: `Carbon-14: six protons, eight neutrons. Identical chemistry, heavier nucleus — that is all an isotope is.`

#### Stage 4 — Shells (fill inner-first)

Reset the stage atom to **fresh carbon-12 with 0 electrons**. Controls: one
button `+ electron` (class `af-add-e`). Placement is AUTOMATIC and enforced:
each new electron takes the next free seat inner-shell-first (shell 1 seats
1-2, shell 2 seats 3-10). The learner cannot misplace one — the machine
demonstrates the rule by refusing to break it.

Target: neutral carbon (6 electrons → config 2,4).

- Instruction: `Fire electrons at the atom. Watch where the machine seats them — the inner shell always fills first, and it only holds 2.`
- After electron #2 lands (shell 1 full): flash caption `shell 1 full — next one must sit further out.`
- After electron #3 visibly lands on ring 2: nothing extra (the visual is the lesson).
- Auto-complete at `electrons === 6` AND charge meter reads 0. Success copy:
  `Neutral carbon: 2 inner, 4 outer. Six positives, six negatives, perfectly balanced.`

#### Stage 5 — Strip (cation)

Swap the stage atom to **neutral sodium** pre-built: 11p, 12n, electrons
2,8,1 (render instantly, no animation). Control: `− electron` only (class
`af-remove-e`) — it must always remove from the OUTERMOST occupied seat.

Target: Na⁺ (10 electrons).

- Instruction: `Sodium hates its lonely outer electron. Strip it and read the charge meter.`
- On completion (`electrons === 10`): the now-empty third ring disappears,
  the (full) second shell gets a one-shot glow (class `af-shell-glow`,
  stroke `var(--qx-green)`, 600 ms), charge chip flips to `+1` in yellow.
- If the learner keeps stripping below 10: hint
  `Stop — you broke into a full shell. Sodium only wants to lose ONE. Put it back.`
  and show `+ electron` to recover.
- Success copy: `Na⁺ forged. Eleven protons still — it is sodium with a positive charge, not a new element.`

#### Stage 6 — Catch (anion)

Swap to **neutral chlorine**: 17p, 18n, electrons 2,8,7. Control:
`+ electron` only.

Target: Cl⁻ (18 electrons).

- Instruction: `Chlorine is one seat short of a full shell. Feed it the electron it is desperate for.`
- On completion: outer shell glow (same class), charge chip `-1` in accent.
- Overshoot is impossible (shell 3 caps at 8 → 18 electrons max here;
  disable the button at 18).
- Success copy: `Cl⁻ caught it. A full outer shell and a negative charge — the mirror image of what sodium just did.`

#### Stage 7 — Name it (identity check)

Three mystery atoms, one at a time, each described only by counts. For each,
show 3 option buttons (class reuses `fm-options` grid pattern):

| # | Counts shown | Options (correct first here; SHUFFLE at build time with a plain sort comparator seeded per mount) | Wrong-pick hint |
|---|---|---|---|
| 1 | `8p / 8n / 10e` | `O²⁻ — oxygen that caught two`, `Ne — neutral neon`, `O — neutral oxygen` | `Count protons first for the name, then compare electrons for the charge.` |
| 2 | `12p / 12n / 10e` | `Mg²⁺ — magnesium that lost two`, `Ne²⁻`, `Mg — neutral magnesium` | `Twelve protons is magnesium no matter what. Now: 12 minus 10 electrons?` |
| 3 | `6p / 8n / 6e` | `carbon-14, neutral`, `oxygen-14, neutral`, `C⁴⁻` | `Six protons: carbon. Electrons match, so no charge. The 8 neutrons only change the mass.` |

Completion: all three answered correctly (retry until right). Success copy:
`Foundry certified. Protons name it, neutrons weigh it, electrons charge it.`

Completion screen copy:
- Title: `Atom Foundry complete`
- Body: `You can now build any light element from raw particles, keep its nucleus steady, fill shells inner-first, and forge ions in both directions.`

### B.6 Reinforcement steps (after the lab, same module)

Add these after the lab entry in a new `CHEM_FOUNDRY_WORKSHOP` array in
`src/lib/content/workshops.js`, using the local `S(...)`/`O(...)` helpers and
one `sorting` interaction. Export via
`export function getChemFoundryWorkshop() { return cloneInteractions(CHEM_FOUNDRY_WORKSHOP); }`

1. `S('An atom has 19 protons. A cosmic ray knocks out an electron. What is it now?'` —
   correct: `Potassium ion, K⁺` / wrong: `Argon — it lost a particle`.
   Feedback correct: `Right. Electrons come and go; the 19 protons keep it potassium.`
   Feedback wrong: `Only protons set identity. 19 protons is potassium whether it has 19 or 18 electrons.`
2. `sorting` — boxes `Changes the element`, `Makes an isotope`, `Makes an ion`;
   items: `Add a proton` → element, `Remove a proton` → element,
   `Add a neutron` → isotope, `Add an electron` → ion,
   `Remove an electron` → ion, `Two extra neutrons` → isotope.
3. `S('Why does the second electron shell refuse a 9th electron?'` — correct:
   `Each shell has a strict capacity — shell 2 holds 8`; wrong: `Electrons repel it away randomly`.
4. `S('Chlorine-35 and chlorine-37 react identically. Why?'` — correct:
   `Same protons and same electron shells — chemistry only sees those`;
   wrong: `They weigh the same`.
5. `S('Mg²⁺ and Ne both have 10 electrons. Are they the same thing?'` —
   correct: `No — 12 protons vs 10 protons, different elements`; wrong:
   `Yes — same electrons means same atom`.
6. `S('An ion reads charge −2 with 18 electrons. How many protons?'` —
   correct: `16 — it gained two`, wrongs: `20`, `18`.

### B.7 Challenge generator

In `src/lib/content/challenges.js`, add generators + registry entry
`'atom-foundry': { build: atomFoundryChallenge, timeLimitSec: 150 }`.
The module already inherits the timer/streak/W systems automatically.

Use the existing `ri`/`riNot`/`pick` helpers. Generators (8 steps, mix):

1. `genForgeElement()` — pick a random element (z 3–18); emit an
  `atombuilder` interaction (the EXISTING component — see its props in
  `AtomBuilder.svelte`): `targetName: name`, `targetProtons: z`,
  `targetNeutrons: n`, `targetElectrons: z`, prompt
  `` `Build a neutral ${name} atom from scratch.` ``.
2. `genForgeIon()` — pick from the ion bank
  `[Na⁺ 11/12/10, Mg²⁺ 12/12/10, O²⁻ 8/8/10, F⁻ 9/10/10, Li⁺ 3/4/2, Cl⁻ 17/18/18]`,
  emit `atombuilder` with the ion's counts and a prompt naming the ion.
3. `genForgeIsotope()` — bank `[C-13 6/7/6, C-14 6/8/6, O-18 8/10/8, H-2 1/1/1, N-15 7/8/7]`.
4. `genIdentityQuiz()` — scenario: random z (3–18), random charge from
  `[-2,-1,0,+1,+2]` valid for that element's shells; show
  `` `${z}p / ${n}n / ${z - charge}e` `` and 3 options built like Stage 7.
5. `genShellConfig()` — scenario: `` `A neutral atom has the shells ${shells.join(', ')}. Which element?` ``
  with 2 distractor elements at ±1 z.

Order for a run: `[1, 4, 2, 5, 3, 4, 2, 1]` (by generator number).

### B.8 Wiring checklist (exact edits)

1. `src/lib/components/assessments/AtomFoundryLab.svelte` — new file (Part B.3–B.5).
2. `src/lib/components/assessments/Workshop.svelte` — import + dispatch branch:
   ```svelte
   {:else if current.type === 'atomfoundry'}
     <AtomFoundryLab prompt={current.prompt} onDone={handleInteractionDone} />
   ```
   Place it right after the `functionmachine` branch.
3. `src/lib/content/workshops.js` — `CHEM_FOUNDRY_WORKSHOP` (lab entry first:
   `{ type: 'atomfoundry', prompt: 'Forge a nucleus, steady it, fill the shells, and strip electrons into ions.' }`,
   then B.6 items) + getter with `cloneInteractions`.
4. `src/views/WorkshopLab.svelte` — import getter; insert the module FIRST in
   the chemistry track's `modules` array (B.1 metadata).
5. `src/lib/content/challenges.js` — B.7 generators + registry line.

---

## Part A — Improvements to existing workshops

Independent items, each its own commit. Ordered by value.

### A.1 MoleculeBuilder: real molecular layouts (HIGH)

`src/lib/components/assessments/MoleculeBuilder.svelte` currently scatters
atoms by golden-angle spiral (`Math.cos(index * 2.399) * …`) — the layout has
no chemical meaning. Replace placement for known formulas with fixed 2D
coordinates (units = px offsets from center at `--x`/`--y`, same CSS vars):

| Formula | Layout (element: x, y) |
|---|---|
| H2O | O: 0,0 · H: −44,34 · H: 44,34 (bent, ~104°) |
| CO2 | C: 0,0 · O: −56,0 · O: 56,0 (linear) |
| NH3 | N: 0,0 · H: −48,30 · H: 48,30 · H: 0,−52 (pyramidal projection) |
| CH4 | C: 0,0 · H: 0,−56 · H: 53,18 · H: −53,18 · H: 0,58 (tetrahedral projection) |
| O2 / N2 | A: −30,0 · B: 30,0 |
| H2O2 | O: −24,−10 · O: 24,10 · H: −60,14 · H: 60,−14 |
| C2H6 | C: −28,0 · C: 28,0 · H×3 fanned around each C at radius 42 |

Algorithm: as the user increments counts, assign atoms to the target
formula's seat list in order (center atom first). If the current counts
don't match any known formula, fall back to the existing spiral. Draw bonds
as 2px lines (`--qx-border-2`) from the center atom to each ligand seat
BEFORE the atom circles so they render underneath.

### A.2 AtomBuilder: shell-aware electron ring (MEDIUM)

Same file family. The CSS orbit currently pins ALL electrons to one ring.
Change `shellDots` to place electrons ≤2 on an inner ring (translateX 52px)
and 3–10 on the outer ring (translateX 86px), mirroring the simple shell
model. Keep the existing `--i/--total` rotation trick per ring (each ring's
`--total` = electrons on THAT ring).

### A.3 Challenge coverage (MEDIUM, mechanical)

`challenges.js` registry currently covers: `line-core`, `functions`,
`matrices`, `binary-data`, `logic-gates`, `chemistry-core`, `forces-waves`.
Add generators for two more modules:

- `'exp-logs'` (120 s): `genPowerValue` — `` `What is ${b}^${e}?` `` with
  b∈[2,3,5], e∈[2,4]; distractors `b*e` and `b^(e-1)`. `genLogRiddle` —
  `` `2 raised to what power gives ${2**k}?` `` k∈[3,6]; distractors k±1.
  `genHalfLife` — `` `A value halves ${k} times starting from ${start}. Where does it land?` ``
  with start ∈ [80, 160, 320], k ∈ [2,4]. Mix: value, log, value, half,
  log, value, half, log.
- `'units-dimensions'` (120 s): reuse the `unitcheck` interaction type —
  inspect `UnitDimensionCheck.svelte` for its props and build a bank of 10
  randomizable entries (speed m/s, area m², density kg/m³, force kg·m/s²,
  energy kg·m²/s²…), sampling 8 per run with shuffled options.

### A.4 Wrong-answer feedback rule (LOW, sweep)

Convention going forward (and fix where violated in `MATHS_FUNCTIONS_WORKSHOP`
and `LINE_CORE_WORKSHOP` if found): every `incorrectFeedback` must STATE the
correct answer, not only re-explain the method. A learner who missed twice
should never leave a step without seeing the right answer spelled out.

### A.5 GateBuilder NOT gate (LOW, optional)

`GateBuilder.svelte`: support `palette` containing `'NOT'` for chain-1 pick
mode only — when selected, input B's switch renders disabled at 0.3 opacity
and the truth table collapses to 2 rows (A=0→1, A=1→0). Skip if it takes
more than an hour; it is a nice-to-have.

---

## Part C — Engineering rules, pitfalls, verification

### C.1 Hard rules (violations = rejected)

1. **Colors**: `var(--qx-*)` tokens ONLY. Zero hex literals in components.
   Both light and dark themes must look right (the tokens handle it if you
   never hardcode).
2. **Font**: never introduce one. `font-family: var(--qx-font)` on buttons.
3. **Layout shell**: every assessment component is
   `width:100%; max-width:390px; margin:0 auto; flex column; gap:13px`.
   Nothing may horizontally overflow at 360 px viewport width.
4. **Contract**: components receive `onDone` and call it EXACTLY ONCE with
   `(score, total)`. Labs are mastery gates: retry-with-hint, then
   `onDone(1, 1)`.
5. **Copy tone**: plain, concrete, mechanism-first. Banned: "Don't let X
   scare you", exam framing, motivational filler, em-dash chains. State the
   fact, then stop.
6. **Never touch**: `src/lib/stores/progress.js` (W award logic),
   `Workshop.svelte`'s timer/streak internals, `Reader.svelte`'s swipe axes,
   anything under `supabase/`.
7. Deploy is NOT your job: make `npm run build` pass, commit, push. Nothing else.

### C.2 Codebase pitfalls that have already burned us (read twice)

1. **The runner remounts each step** — `Workshop.svelte` wraps the body in
   `{#key step}`. Mount-time `let x = …` init is therefore safe INSIDE the
   runner. Do not add reactive re-init gymnastics for step changes.
2. **Svelte `export let obj = {default}` does NOT re-apply on prop updates.**
   If a component can receive `undefined` for an object prop on a reused
   instance (anything rendered OUTSIDE the keyed runner), derive
   `$: safeX = x || fallback` and use `safeX` everywhere. See
   `CoordinateDrill.svelte` for the shipped pattern and comment.
3. **Reactive statements only track identifiers in their own text.**
   `$: v = f(0)` where `f` closes over `min/max` will NOT recompute when
   `min/max` change — inline the expression. This bug shipped once
   (CoordinatePlane axes rendered NaN); do not reintroduce it.
4. **Interaction objects are shared module state.** Anything with mutable
   fields (`_shuffledOptions`, option arrays) must go through
   `cloneInteractions` in the module getter — copy the existing getters.
5. **SVG click targets**: every clickable SVG element needs `role`,
   `tabindex="0"`, an `aria-label`, and an `on:keydown` Enter handler —
   the a11y compiler warnings are treated as errors in review.
6. **`prefers-reduced-motion`**: any animation you add needs the reduced
   variant (`@media` for CSS; `matchMedia` guard for JS-driven).

### C.3 Verification protocol (required before commit)

1. `npm run build` — must end `✓ built` with zero new warnings from your files.
2. Playwright headless run (dev server, viewport 420×900), guest flow:
   `Continue as guest` → `Workshop` tab → `Chemistry` track → `Foundry`
   module. Assert per stage, using these selectors:
   - `.af-lab` visible; `.af-badge` reads `— · empty foundry`
   - Stage 1: 6 × click `.af-add-p` → `.af-badge` contains `Carbon`; also
     verify OVERSHOOT: 7th click → badge contains `Nitrogen`, hint visible,
     `.af-remove-p` click → back to `Carbon`, stage completes
   - Stage 2: 6 × `.af-add-n` → auto-advance offered; `A = 12` in meters
   - Stage 3: 2 × `.af-add-n` → complete at C-14
   - Stage 4: 6 × `.af-add-e` → assert 2 electrons on ring 1 and 4 on ring
     2 by counting `.af-electron` grouped per ring radius; charge chip `0`
   - Stage 5: 1 × `.af-remove-e` → charge chip `+1`; over-strip → hint +
     recovery button
   - Stage 6: 1 × `.af-add-e` → charge chip `-1`
   - Stage 7: answer all three (assert wrong-pick hint fires once)
   - `.fm-complete`-equivalent (`.af-complete`) visible → Continue →
     `.workshop-progress` reads `2/7`
   - Challenge: `.challenge-bar button` click → `.workshop-timer` reads
     `2:30`; run it twice and assert the first prompt differs between runs
     (rerun once on a collision).
3. Screenshot each stage; check nothing clips at 360 px width.
4. Delete the test script and screenshots before committing.

### C.4 Definition of done

- Atom Foundry appears as the first Chemistry module and the full lab runs
  on mobile width, both themes.
- Reinforcement steps and randomized challenge work through the standard
  runner (timer, streak, W rewards untouched and functioning).
- All Part C.3 assertions pass.
- One commit per Part A item, one for Part B, descriptive messages, pushed.
