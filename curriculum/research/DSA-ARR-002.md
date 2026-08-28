# DSA-ARR-002 — Making room in an array

**Status:** `APPROVED · AUTHORING ONLY`  
**Founder direction:** 2026-08-28 — progress from the approved sequence-index lesson.  
**Founder approval:** 2026-08-28 — the founder approved the amended idea, wording, interaction and visual direction after reviewing the authoring preview.  
**Approval boundary:** Approval covers `DSA-ARR-002` only. It does not approve a wider DSA sequence, curriculum placement, roster entry, public release or deployment of the authoring route. `DSA-SEQ-001` remains digest locked and unchanged.

## Single objective

Move existing items safely to create a requested array position, then predict how insertion work changes with position and sequence size.

## Prerequisites

- Approved DSA-SEQ-001 distinction between index access and value search.
- Zero-based positions.
- Ordered collections preserve relative order.

## Misconceptions this BB tests

1. Direct indexed access means every array operation is constant time.
2. Items can be shifted left-to-right without overwriting a value still needed.
3. Appending and inserting at the beginning require the same number of moves.
4. The spare-capacity model fully describes a Python list. The precision note explicitly reserves resizing for a later BB.

## Source provenance

| Source | Licence / use | Concepts retained | Qubix adaptation |
|---|---|---|---|
| Pat Morin, *Open Data Structures*, Python edition, Array-Based Lists — https://opendatastructures.org/versions/edition-0.1g/ods-python.pdf | Creative Commons Attribution. | Array-backed sequence operations and insertion cost. | No prose, code or diagram copied. Original dispatch-item interaction makes the learner perform safe right-to-left shifts. |
| OpenDSA, “List Introduction” — https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html | MIT. | Operations on a list have different costs; distinguish interface from implementation. | No prose, code or diagram copied. Direct access and insertion are contrasted within one structure. |
| Python 3.14 Tutorial, “Data Structures” — https://docs.python.org/3.14/tutorial/datastructures.html | PSF License v2; examples additionally Zero-Clause BSD. | Python list terminology and insertion context. | No prose or examples copied. The model states that Python lists are dynamic arrays of references and isolates spare-capacity shifting. |

## Read → do contract

The reading earns the operation through a late delivery job that must preserve time order. The interaction then requires the learner to:

1. move occupied items from right to left;
2. see, not only read, why the opposite direction overwrites a value still needed;
3. place the new item only after the requested slot is empty;
4. inspect insertion at the start, middle and empty end, and count the moves at each;
5. explain why access and insertion have different costs in the same array.

## Placement decision still required

This sample is unrostered. It follows DSA-SEQ-001 conceptually, but the wider DSA volume or bridge placement remains unapproved.

## Amendment history

- 2026-08-28 — Initial second-BB authoring sample created after founder approved DSA-SEQ-001 and asked to progress.
- 2026-08-28 — Founder requested animation and illustration to simplify DSA. Added a deterministic SVG three-state insertion model with replay and reduced-motion behaviour. The interaction remains the place where the learner performs each safe move.
- 2026-08-28 — Raised the sample to the approved index-lesson review contract without changing status: wrong-direction clicks now show the overwrite, the bench compares three insertion positions before the recall check, and the figure is computed from the same lesson data. Still `AI_DRAFT · AUTHORING ONLY`. Placement and release remain undecided.
- 2026-08-28 — Founder approved the amended sample. Scope: single idea, learner-facing wording, interaction and visual direction. Placement and release remain undecided.
