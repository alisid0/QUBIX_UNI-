# DSA-SEQ-001 — Sequences and indexed access

**Status:** `APPROVED · AUTHORING ONLY`  
**Founder direction:** 2026-08-28 — create DSA reading and doing material in small steps for young learners.  
**Founder approval:** 2026-08-28 — the founder approved the amended idea, wording, interaction and visual direction after reviewing the authoring preview.  
**Approval boundary:** Approval covers `DSA-SEQ-001` only. It does not approve a wider DSA sequence, curriculum placement, roster entry, public release or deployment.

## Single objective

Distinguish accessing an item by a known index from searching for an item by value, and predict how each operation’s work changes as the sequence grows.

## Prerequisites

- Count ordered positions from zero.
- Recognise a Python list.
- Compare two labels and decide whether they match.

## Misconceptions this BB tests

1. A learner may treat “find the item at position 5” and “find the item named MUG-118” as the same operation.
2. A learner may read `O(1)` as one literal CPU instruction or `O(n)` as an exact duration.
3. A physical shelf analogy may be mistaken for an account of Python memory layout. The lesson explicitly names the limit of the model.

## Source provenance

| Source | Licence / use | Concepts retained | Qubix adaptation |
|---|---|---|---|
| Pat Morin, *Open Data Structures*, Python edition, especially array-based lists — https://opendatastructures.org/versions/edition-0.1g/ods-python.pdf | Creative Commons Attribution; source site permits sharing and adaptation with attribution. | Sequence/list operations; indexed access; asymptotic cost. | No prose or code copied. Uses original Superstore dispatch labels and an address-versus-identity question. |
| OpenDSA, “List Introduction” — https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html | MIT; licence page: https://opendsa-server.cs.vt.edu/home/license | Separate the list ADT from an implementation; compare operation cost. | No prose, code or diagram copied. The interaction reveals cost before naming notation. |
| Python 3.14 Tutorial, “Data Structures” — https://docs.python.org/3.14/tutorial/datastructures.html | PSF License v2; examples additionally Zero-Clause BSD: https://docs.python.org/3.14/license.html | Python list context and terminology. | No tutorial prose or examples copied. Python is named only to anchor the prerequisite and precision note. |

## Read → do contract

The reading introduces positions as addresses and contrasts two questions. It deliberately withholds Big O notation. The doing surface then requires:

1. direct selection from a known zero-based position;
2. sequential inspection when only a value is known;
3. a prediction about doubling the possible input size;
4. only then, the labels `O(1)` and `O(n)` with a precision note.

Wrong direct positions and wrong growth predictions receive explanatory retry feedback. The final recall prompt asks for a verbal distinction before terminology.

## Placement decision still required

This sample is deliberately unrostered. A later review must decide whether DSA becomes a new volume, a bridge after Python foundations, or part of a wider computational-thinking strand. Do not assign a public chapter number until that decision is approved.

## Amendment history

- 2026-08-28 — Initial one-BB authoring sample created from founder direction. No approval recorded.
- 2026-08-28 — Founder review identified a missing purpose layer. Added an explicit definition of sequence and index, the reason for zero-based positions, real-world uses, a plain-language learner objective, and a boundary between sequence indices and database indices. Still unapproved.
- 2026-08-28 — Founder approved the amended sample. Scope: single idea, learner-facing wording, interaction and visual direction. Placement and release remain undecided.
