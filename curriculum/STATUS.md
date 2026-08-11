# Curriculum Status

Last updated: 2026-08-11

| Artifact | Status | Next authority |
|---|---|---|
| Curriculum declaration | Awaiting review | Founder |
| Prerequisite map | Draft | Founder |
| Main curriculum map | Draft | Founder |
| Foundational mathematics shelf | Draft | Founder |
| Extended classical candidate library | Draft | Founder |
| Strata migration finalization review | AI_DRAFT, authoring-only | Founder decisions across 100 audited records |

## Boards

Named, not numbered, since 2026-08-09. `key` is the Factory URL.

| Board | Key | Record | Status | Next authority |
|---|---|---|---|---|
| A Letter for a Number | `letter` | written | AI_DRAFT | Founder reading |
| The Gap Between Two Values | `gap` | none | AI_DRAFT | Founder reading |
| A Second Letter, Tied to the First | `second` | none | AI_DRAFT | Founder reading |
| One Change Against Another | `rate` | none | AI_DRAFT | Founder reading |
| Two Points, Almost Touching | `points` | none | AI_DRAFT | Founder reading |
| The Notation dy/dx | `notation` | none | AI_DRAFT, gated | Curriculum gate |
| The Pattern in the Powers | `powers` | none | AI_DRAFT, gated | Curriculum gate |
| Time as the Variable | `time` | none | AI_DRAFT, gated | Curriculum gate |
| The Two Kinds of Constant | `constants` | none | AI_DRAFT, gated | Curriculum gate |
| Term by Term | `sum` | none | AI_DRAFT, gated | Curriculum gate |
| The Slope of a Curve | `slope` | none | AI_DRAFT, gated | Curriculum gate |
| Where a Curve Turns | `turning` | none | AI_DRAFT, gated | Curriculum gate |
| Area on the Grid | `area` | written | AI_DRAFT, gated | Pilot proposal |
| The Coordinate Plane | `plane` | none | AI_DRAFT, gated | Pilot proposal |
| Plotting a Rule as a Curve | `plot` | source matrix in Factory | AI_DRAFT, gated | Founder selection |
| The Slope of a Line | `line-slope` | source matrix in Factory | AI_DRAFT, gated | Founder selection |
| Speed and Velocity | `speed-velocity` | written | AI_DRAFT, gated | Founder selection, prerequisites and placement |
| Vectors and Displacement | `vectors` | written | AI_DRAFT, gated | Founder selection, prerequisites and placement |
| Vector Addition | `vector-addition` | written | AI_DRAFT, gated | Founder selection, prerequisites and placement |
| Force and Acceleration | `force` | written | AI_DRAFT, gated; publication pending | Vercel recovery, prerequisites, placement and approval |
| Angles and Turns | `angles` | written | AI_DRAFT, gated | Founder selection, source edition review and placement |
| Angle Sum of a Triangle | `triangle-angles` | written | AI_DRAFT, gated | Founder selection, prerequisite and edition review, placement |

The standalone Strata Migration Factory is available only at
`?mode=strata-factory` in development. It is not registered in the present
Factory, is not a learner board and is excluded from the learner generator.

**Triangle-angle draft, 2026-08-11.** Under the founder's general permission to
plan and create the next lessons, one narrow board was added after *Angles and
Turns*. It teaches only that the three interior angles total 180° and uses that
invariant to find a missing angle. Each section has two readings, two working
interactions and two checks. The founder selected `S1-A`, both S1 interactions
and checks, `S2-B`, both S2 checks, `S3-A` and both S3 interactions. On founder
direction the two S2 interactions were superseded by one selected combined
`S2-I3`. The requested `S3-X3` does not exist, so S3's exercise slot remains
open rather than attributing an unseen selection. The learner generator excludes
the board.

**Plane-geometry prerequisite expansion, 2026-08-11.** On founder instruction,
`GEO-ANGLE-001` was added to the Factory as the first board before triangles,
circles and trigonometry. It has three sections with two readings, two working
interaction candidates and two checks per section. The founder selected `S1-B`,
both S1 interactions and checks, `S2-B`, `S2-I1`, both S2 checks, `S3-I1` and
both S3 checks. S3 still has no selected reading. The board is excluded from the
learner generator and remains gated.

**Proposed physics introduction, amended 2026-08-11.** The founder selected
`S1-A`, `S1-I1`, both S1 exercises, `S2-A`, `S2-I2` and both S2 exercises.
Those sections keep mass at 2 kg while force changes. On further founder
instruction, S3 was rebuilt to keep force at 6 N while mass changes between
2 kg, 4 kg and 6 kg. The founder then selected `S3-B`, both S3 interactions and
both S3 exercises. The board now has a complete kept sheet but remains excluded
from approval. On founder instruction it was added to the generated learner
pilot for live testing and pushed to GitHub. Source and prebuilt Vercel
deployments both entered `UNKNOWN` with no logs, so production publication is
pending. Curriculum position, prerequisite nodes and formal approval remain
open; publication does not change those gates.

**Motion prerequisite draft, 2026-08-11.** On founder instruction to create
more physics, *Speed and Velocity* was added as an unselected Factory board,
provisionally before *Force and Acceleration*. It distinguishes distance/time
speed from directed velocity and ends with the average-speed/average-velocity
contrast on a round trip. It remains excluded from the learner generator.
On founder feedback that the first draft did not capture motion convincingly,
all animated candidates were revised to show time-ordered travel rather than
only changing bars or labels.

**Vector prerequisite draft, 2026-08-11.** On founder direction, a circular-path
comparison now introduces distance and displacement before compass directions
and vector arrows. The board is unselected, gated and excluded from learners.

**Vector-addition extension, 2026-08-11.** On founder direction, one graphical
extension was added after *Vectors and Displacement*. It establishes that an
arrow may be translated without changing the vector, develops the head-to-tail
method, and ends with resultants and cancellation. It deliberately defers
analytical components until trigonometry is available. The board is unselected,
gated and excluded from learners.

**Strata migration finalization review, 2026-08-11.** After the founder expanded
the scope from selected examples to all migration material, the latest Strata
`origin/main` and live production catalogue were audited using Strata's own
source-of-truth hierarchy. The standalone Strata Migration Factory now records
all 40 live curriculum paths, their 99 workshop routes, all 36 rendered
interaction engines, 19 application/system families and five media groups: 100
review decisions in total. The source audit covers 429 path boards and 1,957
floors across physics, mathematics, chemistry and computing. Recommendations
distinguish current Qubix alignment, later prerequisites, reusable mechanics and
implementation boundaries that must not migrate. It remains authoring-only and
creates no learner content, curriculum placement, approval, commit or deploy.

**Draft addition, 2026-08-10.** On founder instruction, the two missing graphing
bridges were added to the Factory so variants can be tested and selected. Their
selection maps are empty, their kept sheets therefore remain incomplete, and the
build generator excludes them from the learner course. This records drafting
authority only; neither board is `APPROVED` or `RELEASED`.

**Plot practice expansion, 2026-08-10.** The `plot` Factory board now carries
four interaction and four exercise candidates in every section. S2 and S3 add
direct point-placement rounds so coordinate plotting can be rehearsed repeatedly.
All additions remain unselected `AI_DRAFT` material behind the same gate.

**Correction, 2026-08-09.** This file previously said the second to fifth boards
were "locked until" the board before them was decided. That had not been true for
some time: all five are built and playable in the Viewer, and the Factory holds
selections for all fourteen. The lock now recorded is the real one, which is the
curriculum gate on everything from *The Notation dy/dx* onward.

## What is live

The site at `https://qubix.university/` still serves nine boards: the three
variable boards, four built from Factory selections, and the two rate boards.
*Force and Acceleration* is the fifth generated board in GitHub but is not yet
on the custom domain because its two production deployment attempts remain
`UNKNOWN`. *One Answer, Not Two* is absent because it has no selections yet, so
the functions unit ships two boards of three.

**Live is not approved.** Nothing below has been marked `APPROVED` by the
founder, and putting the pilot in front of people was a decision to test it, not
a change of status. The gates in each record still stand, and the site says so on
its own front page.

Three of the four live Factory boards are also `gated` in their option files,
belonging to a pilot proposal that has not been approved, and two of them use an
`ORIGINAL` source status the declaration does not yet carry. That contradiction
is recorded here rather than resolved quietly: the founder chose to publish
ahead of the gate, and the gate has not moved.
