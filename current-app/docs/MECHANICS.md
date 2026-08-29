# Mechanics — foundations topic spine

The first 7 BBs of the deck, restructured as a 3-tier set: intuition (t0) → mathematical
formulation (t1) → numericals (t2). Same 7 concepts, three passes, each with its own
quiz. Target: 21 BBs total (7 × 3). Internal numbering follows the deck's real BB
numbers (BB 01-07 today; t1/t2 BBs will be appended at the end of the deck and tied
back via `buildsOn`, not renumbered in place — see CLAUDE.md's renumbering rule, which
applies to physical position, not to tier grouping).

## Tier 0 — Intuition (BB 01-07)

1. **LOCKED.** What physics studies — scope of the subject, no formula.
2. **LOCKED.** Matter and mass — matter as substance, mass as resistance to a change in motion (distinct from weight).
3. **LOCKED.** Inertia and Newton's first law — via the hockey-puck-on-ice scenario.
4. **LOCKED.** Friction — resistance between sliding surfaces, resolved down to microscopic surface irregularities (the original draft left this mechanism unexplained; fixed in the rewrite).
5. **LOCKED.** Newton's second law: F = ma — skateboard/bricks scenario, formula stated as payoff (consistent with t0 rules in PYRAMIDS.md: formula may appear, not drilled).
6. **LOCKED.** Speed, velocity, and acceleration — via a bus's stop-start-brake cycle. Explicitly states that decreasing speed means decelerating, i.e. negative acceleration.
7. **LOCKED.** Newton's third law — boat/dock and rocket/exhaust-gas examples.

Rewrite pass (2026-06-20): dropped narrative framing, characters, and puns per the
author's serious-tone direction; titles changed from descriptive-but-playful
("A bus between stops") to direct ("Speed, velocity, and acceleration"); kickers
changed from "Card NN" to "BB NN" per NOMENCLATURE.md (BB replaces "card"/"board").

**Bundled structural fix:** every BB with an image previously lost its Floor-0 text
entirely (the renderer shows the image instead, per Reader.svelte's `renderFloorHTML`),
and four BBs (01, 07, 09, 11 deck-wide) had only one Floor, meaning *zero* reachable
text. Fixed for BB 01-07 by inserting an invisible placeholder at Floor 0 and shifting
the real content to Floor 1+. The same fix is still owed to BB 08-11 (not yet
rewritten/locked).

**Quiz:** Path `P0` ("Mechanics — foundations", `src/lib/content/paths.js`), question
pool `PATH_QUESTIONS.P0` (`src/lib/content/questions.js`), 10 questions covering all 7
BBs. Built 2026-06-20.

## Tier 1 — Mathematical formulation (BB 71-77)

Per PYRAMIDS.md, t1 names and *uses* formulas (t0 may show one as a payoff, but its job
is exposure, not drilling). Author-confirmed mapping, written 2026-06-20:

71. **LOCKED.** How physics expresses a law mathematically — reframes BB 01 (no natural formula of its own) as the general idea that a law is an equation between measurable quantities, using F = ma as the forward-referenced example.
72. **LOCKED.** Mass, weight, and units — mass as a scalar quantity in kg; W = mg made quantitative; weight in N vs mass in kg.
73. **LOCKED.** Newton's first law as a condition — formalizes "left alone" from BB 03 as ΣF = 0 ⇒ v = constant.
74. **LOCKED.** The friction equation — F = μN (coefficient of friction × normal force), not introduced in t0.
75. **LOCKED.** Rearranging F = ma — solving for a or m, SI units tied together (1 N = 1 kg·m/s²).
76. **LOCKED.** Velocity and acceleration as rates of change — v = Δx/Δt, a = Δv/Δt stated formally.
77. **LOCKED.** Newton's third law as an equation — F₁₂ = −F₂₁.

Each `buildsOn` its t0 counterpart (e.g. BB 71 → BB 01). `ground: 'g1'`.

## Tier 2 — Numericals (BB 78-84)

Worked numerical problems applying each t1 formula. Written 2026-06-20, each `buildsOn`
its t1 counterpart, `ground: 'g2'`.

78. **LOCKED.** Numerical: force, mass, and units (F = ma, confirms N = kg·m/s²).
79. **LOCKED.** Numerical: weight on Earth and the Moon (W = mg at two different g values).
80. **LOCKED.** Numerical: the normal force on a resting box (ΣF = 0 applied).
81. **LOCKED.** Numerical: maximum friction on a crate (F = μN).
82. **LOCKED.** Numerical: force and acceleration of a car (F = ma, both directions).
83. **LOCKED.** Numerical: a cyclist's velocity and acceleration (v = Δx/Δt, a = Δv/Δt).
84. **LOCKED.** Numerical: two skaters pushing off (F₁₂ = −F₂₁, unequal masses).

## Quizzes

- Tier 0: `P0` (`src/lib/content/paths.js` + `PATH_QUESTIONS.P0`) — built, 10 questions.
- Tier 1: `P0T1` — built, 8 questions.
- Tier 2: `P0T2` — built, 7 questions.

## Totals

21 BBs (BB 01-07, 71-77, 78-84), 3 quizzes (`P0`, `P0T1`, `P0T2`). Deck-wide BB count
is now 84 (see `deck.js`'s header comment). All generators verified to run without
errors (`node --input-type=module` smoke test, 2026-06-20).

## Open item carried over

BB 08-11 (impact force, crumple zones, energy, conservation of energy) are still in
the old playful voice and still have the Floor-0-text-is-invisible bug (see Tier 0
note above) — not yet rewritten/locked. Next candidate for the same treatment.
