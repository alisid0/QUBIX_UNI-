# DSA-ARR-003 — When the array runs out of room

**Status:** `APPROVED · AUTHORING ONLY`
**Founder direction:** 2026-08-29 — continue building DSA topics after the approved orientation, index and insertion samples.
**Founder approval:** 2026-08-29 — the founder approved this sample and instructed that it be put online.
**Approval boundary:** approval covers `DSA-ARR-003` only: its idea, learner-facing wording, interaction and visual direction. It does not approve a wider DSA sequence, curriculum placement, roster entry or `RELEASED` status. `DSA-INTRO-000`, `DSA-SEQ-001` and `DSA-ARR-002` remain digest locked and unchanged.
**Live authoring URL:** on 2026-08-29 the founder instructed that this sample be shown on the live site at `/?mode=dsa-array-growth-preview`. The workshop gate has been removed and the four approved source files are digest locked in `curriculum/APPROVED-DSA.json`.

## Why this BB exists

`DSA-ARR-002` ends with a precision note that promises it: *"Appending to a dynamic array is often cheap when spare capacity exists. When it is full, the program may allocate a larger block and copy items. We will model that resize separately."* The insertion lesson deliberately handed the array one spare slot so that shifting could be studied on its own. This BB spends that slot and asks what happens next.

## Single objective

Explain why a full array must be copied into a larger one, and predict why doubling the capacity keeps the average cost of an append low.

## Prerequisites

- `DSA-ARR-002` approved insertion lesson.
- Count positions from zero.
- An array holds a fixed number of slots.

## Misconceptions this BB tests

1. A learner may believe appending is always cheap, having been told that reading by index is direct.
2. A learner may propose growing by exactly one slot, which is the intuitive and thrifty answer, and is the expensive one.
3. A learner may read "amortised O(1)" as "every append is fast". One particular append still copies the whole array; the bench shows a single append copying 16 items.
4. A learner may assume doubling wins because it wastes memory in exchange for speed. In this run it does not: both strategies end at capacity 32 holding 32 items, with no slot wasted either way. The difference is entirely in the route.
5. A learner may take doubling to be a rule of the language rather than an implementation choice. The precision note reserves the exact factor.

## The numbers, and where they come from

Every figure quoted in the reading, the bench and this note is computed by `growthSummary()` in `src/lib/content/dsa-array-growth-preview.js`. None is typed in by hand, and `check-dsa-preview` asserts the relationships rather than the literals.

| Starting at capacity 4, appending 32 items | Grow by one slot | Double the capacity |
|---|---|---|
| Items copied in total | 490 | 28 |
| Times the array grew | 28 | 3 |
| Worst single append | 31 | 16 |
| Copies per append, averaged | 15.31 | 0.88 |
| Final capacity | 32 | 32 |
| Slots wasted at the end | 0 | 0 |

The last two rows are what make the comparison fair, and they are the reason this particular pair of numbers was chosen: 32 lands exactly on a doubling boundary from 4, so neither strategy can be accused of buying its speed with memory. Both finish in the same 32 slots. One did 17.5 times the copying to get there.

At the transfer size the bench never shows, 1,000 appends, doubling grows 8 times and copies 1,020 items in total: barely more than one copy for each item stored, which is the amortised claim made concrete.

## Read → do contract

The reading establishes that the spare slot was a loan, states the mechanism (claim a larger array, copy, abandon the old one), and then poses the only interesting question: how much larger? The figure draws one bar per append for both strategies on a shared scale, so growing by one is a dense rising wall and doubling is three lonely spikes.

The bench then requires the learner to:

1. face a full array with an item waiting, and choose between overwriting, refusing and copying, with the two wrong answers shown on the array rather than described (a real label is destroyed on screen; the waiting item is stranded);
2. pay the resize by hand, one click per item copied, then append the item that triggered it;
3. predict which strategy copies less, before running either;
4. run both strategies to 32 appends and watch the two totals diverge;
5. inspect both strategies' totals, growth counts, worst single append and average;
6. answer a transfer question at 1,000 appends, a size never shown;
7. only then meet `O(1)`, `O(n)` and the word *amortised*, with a precision note.

Terminology arrives last, as in the approved samples.

## Source provenance

| Source | Licence / use | Concepts retained | Qubix adaptation |
|---|---|---|---|
| Pat Morin, *Open Data Structures*, Python edition, array-based lists and amortised analysis — https://opendatastructures.org/versions/edition-0.1g/ods-python.pdf | Creative Commons Attribution; the source site permits sharing and adaptation with attribution. | Resizing an array-backed list; the doubling strategy; amortised cost of a sequence of operations. | No prose, code or diagram copied. The comparison against a grow-by-one strategy, the dispatch-item labels, the bar-per-append figure and the hand-paid resize interaction are original. |
| OpenDSA, "List Introduction" — https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html | MIT; licence page: https://opendsa-server.cs.vt.edu/home/license | Operations on one structure have different costs; interface separated from implementation. | No prose, code or diagram copied. Cost is discovered by running two strategies before any notation appears. |
| Python 3.14 Tutorial, "Data Structures" — https://docs.python.org/3.14/tutorial/datastructures.html | PSF License v2; examples additionally Zero-Clause BSD: https://docs.python.org/3.14/license.html | Python list terminology and the behaviour of `append`. | No tutorial prose or examples copied. Python is named to anchor the precision note about the real growth factor. |

The reading states that CPython over-allocates by considerably less than double. That is an implementation detail named only to stop a learner treating doubling as a rule of the language; no CPython source is quoted or reproduced.

## Placement decision still required

Unrostered, like every DSA sample so far. It follows `DSA-ARR-002` conceptually and completes the array trilogy (access, insertion, growth). Whether DSA becomes its own volume, a bridge after Python foundations, or part of a wider computational-thinking strand remains undecided, and no public chapter number should be assigned until that decision is approved.

## What a founder review should check

- Does the full-array moment land, or does the correct answer look obvious before the wrong ones are tried?
- Is paying the resize by hand worth the clicks, or does it become tedious at four items?
- Is the figure legible on a phone, where 32 bars per lane is dense?
- Does the word *amortised* arrive late enough, and is the precision note honest enough about what it does not mean?

## Amendment history

- 2026-08-29 — Created from founder direction to continue the DSA strand, taking its subject from the promise made by the approved `DSA-ARR-002` precision note. No approval recorded. Workshop-gated. `AI_DRAFT`.
- 2026-08-29 — Driving the lesson in a browser on desktop and phone found two faults that no guard caught: the figure's lane labels were clipped mid-word, and its 640-wide viewBox scaled 11px labels to under 6px on a phone. Labels moved above their lanes; the figure now raises its own type on narrow screens, and a guard holds it there.
- 2026-08-29 — Founder approved the sample and instructed that it go online. Scope: idea, learner-facing wording, interaction and visual direction. Placement, roster entry and release remain undecided. Workshop gate removed; four source files digest locked.
