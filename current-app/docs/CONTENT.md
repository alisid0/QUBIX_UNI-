# Content map — deck (index.html)

24 cards across five acts. Cards 1–11 are illustrated (`images/card-NN.png`); cards 12–24 are text-only (illustrations pending). Layer key: **L1** = swipe card (shows the image if one exists), **L2+** = dig-in text layers.

## Act I — Things move, and something makes them (1–9)
| # | Title | Image |
|---|-------|-------|
| 01 | The whole game | collage: bridge/coffee/apple/planets/black hole |
| 02 | Stuff takes up space | microbe / brick / sun |
| 03 | Rocks do not move (on their own) | rock, "no motion" |
| 04 | The thing your eyes can't see | rough vs smooth surface |
| 05 | The second big rule | skateboard vs bricks, F=m×a |
| 06 | A bus between stops | bus + speed/velocity/acceleration gauges |
| 07 | It always pushes back | boat + rocket (Newton's 3rd law) |
| 08 | How hard the stop is | concrete vs crash mat |
| 09 | Why crumple zones exist | crumple zone |

## Act II — Energy and the idea of change (10–11)
| 10 | Energy | push / lift / heat |
| 11 | Energy is never lost | boulder on a hill |

## Act III — Getting infinitely close (12–15) · no images yet
| 12 | Limits | — |
| 13 | Measuring a circle | — |
| 14 | Functions | — |
| 15 | Applying a limit | — |

## Act IV — Gravity, and the pull between things (16) · no image yet
| 16 | Everything pulls on everything | — |

## Act V — Trigonometry, vectors and angles (17–24) · no images yet
| 17 | What trigonometry is | — |
| 18 | The parts of a right triangle | — |
| 19 | Sine, cosine, tangent | — |
| 20 | Cracking the captain's problem | — |
| 21 | How much isn't enough (vectors & scalars) | — |
| 22 | When two things push at once (resultants, real life) | — |
| 23 | Splitting a diagonal (resolving vectors) | — |
| 24 | The made-up 360 (radians) | — |

## Card format

```js
C(act, kicker, title, [layers], img, tags)
```
- `img` is `"images/card-NN.png"` or **`null`** (must be `null`, not omitted, or the tags object lands in the img slot — see bug note).
- `tags` = `{subject, topic, concept, ground, buildsOn:[...]}`. `buildsOn` lists prerequisite card labels (a simple knowledge graph).

## Editorial voice
Plain definitions; concrete scenarios over clever metaphors; no hype/editorialising; mechanism over assertion; minimal bold (reserved for first use of a named term); short clean sentences, not dash-stacked clauses; one earned philosophical line allowed when it opens something real.

## Fixed / notable
- **Bug fixed:** cards 12–17 had been passing the `tags` object into the `img` slot (`],{subject…}`), making them render a broken `[object Object]` image with no text. Corrected to `],null,{subject…}`. When adding a text-only card, always pass `null` for img.
- Cards 21–24 (vectors + radians) were drafted externally, then voice-edited and deduped against the existing trig cards (23 leans on 19's sin/cos rather than re-teaching it).

## Next steps
- Illustrations for cards 12–24 (same chalkboard style; see DESIGN.md).

## Cards 25-34 — appended batch (kinematics, coordinate geometry, chemistry)
| # | Act | Title | Topic |
|---|-----|-------|-------|
| 25 | I | The three accelerators | velocity/acceleration as vectors |
| 26 | I | The infinite tightrope | number line, 1D |
| 27 | I | The grid of reality | Cartesian plane, vectors on a grid |
| 28 | I | The two lives of a falling rock | gravity, independence of axes |
| 29 | I | The perfect arc | projectile motion, parabolas, SUVAT |
| 30 | V | Dot and the square game | y=x², parabola as a function |
| 31 | V | Dash and the staircase | y=mx+c, slope, intercept |
| 32 | V | The kissing curves | intersection & tangent (calculus hook) |
| 33 | II | The science of exceptions | chemistry intro, scale |
| 34 | II | The chemist's dozen | the mole, Avogadro's number |

**Note on structure (to sort later):** these were appended in given order per instruction; their act tags are provisional. Cards 25-29 are tagged Act I but are really a *kinematics/coordinate* thread; 30-32 tagged Act V (sit with the curve maths); 33-34 are *chemistry* but tagged Act II (Energy) as a placeholder. A future pass should likely create dedicated acts (e.g. "Motion in 2D", "Graphs & curves", "Chemistry") and reorder. BB# numbers in the source pastes were unreliable and were discarded; cards renumbered Card 25-34 and buildsOn references rewritten to real card numbers.

Cards 25-34 have **no illustrations yet** (text-only).

## Cards 35-37 — atomic structure (chemistry thread continued)
| # | Act | Title | Topic |
|---|-----|-------|-------|
| 35 | II | The cosmic menu | 118 elements, periodic table intro |
| 36 | II | The 80th cut | cutting iron to the atom, scale, *atomos* |
| 37 | II | The three puzzle pieces | protons/neutrons/electrons, atomic number |

Pasted out of order (16,15,17) but **integrated in correct teaching order**: 35 (elements) → 36 (the atom) → 37 (subatomic particles). buildsOn chains 35→Card 33, 36→35, 37→36. Text-only (no images). Still tagged Act II as placeholder — chemistry needs its own act in the future restructure (now 5 chemistry cards: 33,34,35,36,37).
