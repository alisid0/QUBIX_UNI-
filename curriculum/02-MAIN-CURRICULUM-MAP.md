# Main Curriculum Map

Status: **Draft skeleton for founder review**

This is a dependency skeleton, not permission to generate all listed content.

The standalone Strata Migration Factory (`?mode=strata-factory`) is deliberately
separate from this curriculum map and from the present Factory registry. It
reviews the complete audited Strata migration inventory (curriculum paths,
workshop routes, interaction engines, systems and media), but is not a learner
board or a proposed curriculum position. Its decisions record migration intent;
they do not approve or place material in this map.

## First pathway: from change to derivative

Boards are named, not numbered. The order column below is the running order and
may change; the name and the identifier do not. See the naming note at the foot
of this file.

| Order | Board | Key | Identifier | Intended understanding | Depends on | State |
|---:|---|---|---|---|---|---|
| 1 | A Letter for a Number | `letter` | `CME-CHANGE-001` | A letter represents a number, and any particular value may be assigned to it | P-01, P-03, P-08 | `AI_DRAFT` |
| 2 | The Gap Between Two Values | `gap` | `CME-CHANGE-002` | `Δx = new − old`, including direction | P-02, P-03, Unit 1 | `AI_DRAFT` |
| 3 | A Second Letter, Tied to the First | `second` | `CME-CHANGE-003` | An output changes because its input changes | P-05, P-06, Unit 2 | `AI_DRAFT` |
| 4 | One Change Against Another | `rate` | `CME-CHANGE-004` | Compare output change with input change | P-07, Unit 3 | `AI_DRAFT` |
| 5 | Two Points, Almost Touching | `points` | `CME-CHANGE-005` | Rates can settle as an interval shrinks | Unit 4 | `AI_DRAFT` |
| 6 | The Notation dy/dx | `notation` | `CME-CHANGE-006` | Connect the observed local rate to `dy/dx` | Unit 5 | `AI_DRAFT`, gated |
| 7 | The Pattern in the Powers | `powers` | `CME-CHANGE-007` | Read the rule off repeated derivations | not yet mapped | `AI_DRAFT`, gated |
| 8 | Time as the Variable | `time` | `CME-CHANGE-008` | A rate against time is a speed | not yet mapped | `AI_DRAFT`, gated |
| 9 | The Two Kinds of Constant | `constants` | `CME-CHANGE-009` | Added constants vanish, multiplying constants survive | not yet mapped | `AI_DRAFT`, gated |
| 10 | Term by Term | `sum` | `CME-CHANGE-010` | A sum may be differentiated one term at a time | not yet mapped | `AI_DRAFT`, gated |
| 11 | The Slope of a Curve | `slope` | `CME-CHANGE-011` | The derivative has a picture: steepness | not yet mapped | `AI_DRAFT`, gated |
| 12 | Where a Curve Turns | `turning` | `CME-CHANGE-012` | The derivative is zero at a high or low point | not yet mapped | `AI_DRAFT`, gated |

Rows 7 to 12 carry no dependency entry because the earlier skeleton did not have
them as separate boards. It ended at three generic units named *Derivative
language*, *Derivative rules* and *Applications*, and the seven boards that now
exist in the Factory were built inside those without the map being brought up to
date. Naming them has exposed that gap rather than created it; the dependencies
still need mapping.

## Proposed, not placed

These boards exist in the Factory with no position in the order above, because
the proposals that place them are unapproved.

| Board | Key | Identifier | State |
|---|---|---|---|
| Area on the Grid | `area` | `FCG-AREA-001` | `AI_DRAFT`, gated |
| The Coordinate Plane | `plane` | `FCG-PLANE-001` | `AI_DRAFT`, gated |
| Speed and Velocity | `speed-velocity` | `PHY-MOTION-001` | `AI_DRAFT`, gated |
| Vectors and Displacement | `vectors` | `PHY-VECTOR-001` | `AI_DRAFT`, gated |
| Vector Addition | `vector-addition` | `PHY-VECTOR-002` | `AI_DRAFT`, gated |
| Force and Acceleration | `force` | `PHY-FORCE-001` | `AI_DRAFT`, gated; live pilot |
| Angles and Turns | `angles` | `GEO-ANGLE-001` | `AI_DRAFT`, gated |
| Angle Sum of a Triangle | `triangle-angles` | `GEO-TRIANGLE-001` | `AI_DRAFT`, gated |

*Angles and Turns* is the first draft in a proposed plane-geometry sequence:
angles, triangles, circles, then trigonometry. That sequence is a planning
direction, not an approved curriculum placement. The angle board is deliberately
small: it teaches turn, independence from arm length and comparison with 90°.
The next board, *Angle Sum of a Triangle*, now exists as an unselected Factory
draft. It depends provisionally on *Angles and Turns* and teaches one invariant:
the three interior angles total 180°. Triangle classification, circles and
trigonometry remain separate future boards.

*Speed and Velocity* is provisionally placed before *Force and Acceleration*
because the latter already assumes that a learner can recognise changing
motion. The placement is proposed, not approved.

*Vector Addition* is a proposed extension of *Vectors and Displacement*. It
stays graphical: arrows are translated, placed head to tail and replaced by a
resultant. Analytical components remain deferred until trigonometry is taught.
This placement is proposed, not approved.

*Force and Acceleration* opens a proposed physics strand. It is not permission
to place physics inside the present mathematics pathway. Its provisional
prerequisites still need mapping before any learner release.

On 2026-08-11 the founder instructed that the selected board be included in the
live pilot. The learner bundle and GitHub source were updated. After repairing
the mismatched Vercel installation command, production deployment
`dpl_3WEmrdCNzDeqABxXLj22c6gz8G6M` reached `READY` and was aliased to
`qubix.university`. The instruction records testing authority only: it does not
place the board in this map or change its curriculum status.

## Review sequence for the current pilot

The founder reviews in this exact order:

1. *A Letter for a Number* — wording and the assignment interaction.
2. *The Gap Between Two Values* — meaning of delta and negative change.
3. *A Second Letter, Tied to the First* — dependency and square-area model.
4. *One Change Against Another* — meaning and units of average rate.
5. *Two Points, Almost Touching* — shrinking interval and the appearance of 4.

*The Notation dy/dx* remains gated until the five above are individually approved
and the move into the source's own notation is agreed.

## How boards are named

A board is identified by a name and by an identifier. It is not identified by its
number.

The number is a position in a running order, and the order is not settled: the
pilot proposal inserts *Area on the Grid* and *The Coordinate Plane* before
*One Change Against Another*, which would renumber every board after it. Under a
numbering scheme, BB7 would then quietly mean a different board in every document
written before the change, with nothing to show that it had moved.

Names do not move. Neither do the identifiers, which are numbered within a source
strand (`CME-CHANGE-*`, `FCG-*`) and so are unaffected when a strand is inserted
elsewhere in the order.

The `key` column is what appears in the Factory URL, as `?mode=factory&bb=letter`.
The old numeric form still resolves, so links written before this change continue
to open the right board.

Where earlier documents and code comments say BB2 or BB7, they still mean the
board at that position on the day they were written. Those references were left
alone rather than rewritten, so any that were already stale stay visible as
stale.

## Source anchors

- Arithmetic prerequisites: De Morgan's *Elements of Arithmetic*.
- Introductory algebra: Wentworth's *The First Steps in Algebra*.
- Geometry and proof: Casey's edition of Euclid's *Elements*.
- First approach to change and differentiation: Thompson's *Calculus Made Easy*.
- A second conceptual account of calculus: De Morgan's *Elementary Illustrations*.
- Rigorous analysis after the intuitive path: Hardy's *A Course of Pure Mathematics*.
- Optional investigations and puzzles: Rouse Ball's *Mathematical Recreations and Essays*.

The detailed edition register is in [`03-FOUNDATIONAL-BOOKS.md`](./03-FOUNDATIONAL-BOOKS.md).

## Required record for every future BB

- BB identifier and title
- source citation and legal-status note
- prerequisite IDs
- one learning objective
- one misconception to watch
- interaction specification
- complete learner-facing text
- founder review status
- amendment history

## Founder decision

- [ ] I approve this dependency skeleton.
- [ ] I want structural amendments before reviewing BB1.
