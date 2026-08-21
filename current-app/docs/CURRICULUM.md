# Curriculum — the 50-topic pre-university STEM spine

The master map of what Strata covers, eventually. 50 core pre-university topics across maths, physics, and chemistry, ordered roughly by dependency (later topics need earlier ones). This is the **territory**; the BBs are how we fill it in.

Each topic shows its **status** against the current 37 BBs:
- ✅ **started** — at least one BB exists
- 🟡 **partial** — some BBs, clearly incomplete
- ⬜ **not started** — no BBs yet

A topic is a *container* — each will eventually hold many BBs across multiple tiers (t0 intro → higher tiers). "Started" means we've broken ground, not that it's done.

---

## Phase 1 — Mathematical language (1–10)
*Unlocks everything else.*

| # | Topic | Status | Existing BBs |
|---|-------|--------|--------------|
| 1 | Arithmetic fluency & estimation | ⬜ | — |
| 2 | Algebraic manipulation | ⬜ | — |
| 3 | Equations & inequalities | ⬜ | — |
| 4 | Functions and graphs | 🟡 | 14 (functions); 30, 31, 32 (parabola/line/tangent) |
| 5 | Coordinate geometry | ✅ | 26, 27 (number line, grid); 30, 31, 32 |
| 6 | Trigonometry | ✅ | 17, 18, 19, 20, 24 |
| 7 | Exponentials & logarithms | ⬜ | — |
| 8 | Sequences & series | ⬜ | — |
| 9 | Vectors (2D → 3D) | ✅ | 21, 22, 23 (2D); 3D not started |
| 10 | Mathematical proof & logic | ⬜ | — |

## Phase 2 — Calculus & higher mathematics (11–18)
*The biggest university-readiness gap.*

| # | Topic | Status | Existing BBs |
|---|-------|--------|--------------|
| 11 | Limits & continuity | 🟡 | 12, 13, 15 (limits, measuring a circle, applying a limit) |
| 12 | Differentiation | ⬜ | (32 "kissing curves" hints at the tangent/derivative idea) |
| 13 | Applications of derivatives | ⬜ | — |
| 14 | Integration | ⬜ | — |
| 15 | Differential equations (basic ODEs) | ⬜ | — |
| 16 | Complex numbers | ⬜ | — |
| 17 | Matrices & linear transformations | ⬜ | — |
| 18 | Probability & statistics | ⬜ | — |

## Phase 3 — Foundations of physics (19–32)
*Motion → forces → fields → modern physics.*

| # | Topic | Status | Existing BBs |
|---|-------|--------|--------------|
| 19 | Measurement, units & dimensional analysis | 🟡 | 2 (matter/scale) — units/dimensional analysis not really covered |
| 20 | Kinematics | ✅ | 6 (speed/velocity/accel), 25, 28, 29 |
| 21 | Newtonian mechanics | ✅ | 3, 4, 5, 7, 8, 9 (inertia, friction, F=ma, 3rd law, stopping) |
| 22 | Work, energy & power | 🟡 | 10, 11 (energy, conservation) — power not yet |
| 23 | Momentum & collisions | ⬜ | (8, 9 touch impact/stopping but not momentum formally) |
| 24 | Circular motion | ⬜ | (25 mentions turning as acceleration) |
| 25 | Gravitation | 🟡 | 16 (everything pulls) — single stub BB |
| 26 | Oscillations & SHM | ⬜ | — |
| 27 | Waves & sound | ⬜ | — |
| 28 | Electricity & circuits | ⬜ | — |
| 29 | Electric fields & potential | ⬜ | — |
| 30 | Magnetism & electromagnetism | ⬜ | — |
| 31 | Thermodynamics | ⬜ | — |
| 32 | Optics | ⬜ | — |

## Phase 4 — Advanced physics (33–38)
*First-year degree bridge.*

| # | Topic | Status | Existing BBs |
|---|-------|--------|--------------|
| 33 | Electromagnetic induction | ⬜ | — |
| 34 | AC circuits & resonance | ⬜ | — |
| 35 | Quantum foundations | ⬜ | — |
| 36 | Atomic & nuclear physics | 🟡 | 36, 37 (the atom, subatomic particles) — overlaps chem atomic structure |
| 37 | Special relativity (intro) | ⬜ | — |
| 38 | Experimental physics & uncertainty | ⬜ | — |

## Phase 5 — Foundations of chemistry (39–50)
*Particles → reactions → modern chemistry.*

| # | Topic | Status | Existing BBs |
|---|-------|--------|--------------|
| 39 | Atomic structure | ✅ | 36, 37 (the atom, protons/neutrons/electrons) |
| 40 | Periodicity | 🟡 | 35 (the periodic table / elements intro) |
| 41 | Chemical bonding | ⬜ | — |
| 42 | Molecular geometry & intermolecular forces | ⬜ | — |
| 43 | Stoichiometry | 🟡 | 34 (the mole) — single BB |
| 44 | Thermochemistry | ⬜ | — |
| 45 | Chemical equilibrium | ⬜ | — |
| 46 | Acids, bases & buffers | ⬜ | — |
| 47 | Redox & electrochemistry | ⬜ | — |
| 48 | Chemical kinetics | ⬜ | — |
| 49 | Organic chemistry fundamentals | ⬜ | — |
| 50 | Analytical chemistry & spectroscopy | ⬜ | — |

---

## The cross-links (the cumulative engine)

Topics aren't islands — these are the major dependency chains the `buildsOn` graph should eventually encode:

- Functions → Calculus → Differential equations → Mechanics
- Vectors → Forces → Electromagnetism
- Probability → Experimental physics
- Thermodynamics ↔ Physical chemistry
- Complex numbers → Waves → AC circuits
- Quantum → Atomic structure → Bonding

## Progress snapshot (37 BBs against 50 topics)

- **✅ started (8 topics):** coordinate geometry, trigonometry, vectors (2D), kinematics, Newtonian mechanics, atomic structure — plus partials below.
- **🟡 partial (10 topics):** functions & graphs, limits & continuity, measurement, work/energy, gravitation, atomic & nuclear, periodicity, stoichiometry.
- **⬜ not started (~32 topics):** all of arithmetic/algebra (Phase 1 base!), most of calculus, the entire electricity/magnetism/thermo/optics block, all advanced physics, and most of chemistry.

**Honest read:** the existing 37 BBs cluster in *mechanics, intro-calculus, trig/coordinate-geometry, and intro-chemistry*. The biggest gaps are (a) the **arithmetic/algebra foundation** (topics 1–3) which the whole spine rests on yet has zero BBs, and (b) the **large untouched physics blocks** (electricity, magnetism, thermodynamics, waves, optics) and (c) **most of chemistry** beyond the atom.

## How this relates to the rest of the project

- **Topic** here = the `tags.topic` field on a BB (some existing topic tags are narrower than these 50; a future tidy-up could align them).
- **Tier** (PYRAMIDS.md) is the *depth* axis — each of these 50 topics will have t0 (intro) BBs first, higher tiers later. Everything built so far is t0.
- **Path** (STRATA-BRIEF §7) = a curated journey, often *within or across* these topics, for the mastery system.
- The **progression tracks** (Engineering / Maths / Physics / Chemistry) are sequences through these 50 topics — a future feature once enough topics exist.

## Suggested order to fill gaps (when writing new BBs)

1. **Backfill Phase 1 foundations** (arithmetic, algebra, equations) — the whole graph depends on them and they're currently empty.
2. **Complete the started clusters** so they feel whole (finish work/energy, gravitation, the calculus intro).
3. **Then expand outward** along the dependency chains into the untouched physics and chemistry blocks.

This keeps the curriculum *coherent as it grows* rather than scattered — a learner should always find a complete path, not a half-built one.
