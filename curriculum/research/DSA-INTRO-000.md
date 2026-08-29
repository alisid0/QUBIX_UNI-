# DSA-INTRO-000 — How should the information live?

**Status:** `APPROVED · AUTHORING ONLY`
**Founder direction:** 2026-08-28 — add a read-and-play introduction for the whole DSA pathway, with more animations and illustrations.
**Founder approval:** 2026-08-28 — the founder approved the expanded introduction for now after reviewing the operation-first cases, trade-offs and same-data/different-work extension.
**Approval boundary:** Approval covers this orientation BB only. It does not approve the DSA pathway, placement, roster entry, public learner release or deployment of the authoring route. Approved DSA-SEQ-001 remains unchanged.

## Single objective

Given a real-world problem, identify the important operation and choose an organisation whose shape supports that work.

## Prerequisites

- Follow a short sequence of instructions.
- Compare simple real-world arrangements.
- No coding or Big O knowledge required.

## Misconceptions this BB tests

1. A data structure is just a programming-language container name.
2. One data structure is universally best.
3. An algorithm and a data structure are the same thing.
4. DSA begins with notation rather than with recognising work and trade-offs.

## Source provenance

| Source | Licence / use | Concepts retained | Qubix adaptation |
|---|---|---|---|
| Pat Morin, *Open Data Structures* — https://opendatastructures.org/ | Creative Commons Attribution. | Structures support operations with different performance trade-offs. | No prose, code or diagram copied. Original information-shape animation and four workplace cases. |
| OpenDSA, “List Introduction” — https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html | MIT. | Separate abstract behaviour from implementation and reason about operation cost. | No prose, code or diagram copied. The introduction begins with operations and invariants before formal names. |
| Python 3.14 Tutorial, “Data Structures” — https://docs.python.org/3.14/tutorial/datastructures.html | PSF License v2; examples additionally Zero-Clause BSD. | Familiar list, stack and queue terminology. | No tutorial prose or code copied. Formal names are revealed only after illustrated choices. |

## Read → play contract

The reading defines a data structure as an organisational shape and an algorithm as a finite procedure for work. It now makes the trade-off explicit for every candidate: the same choice that makes one operation natural can make another operation awkward. The play surface gives four requests. For each request, the learner must first identify the operation or invariant that matters and only then select an informal visual arrangement. Formal array/list, stack, queue and graph terminology is revealed after the reasoning, not before it. A final transfer check asks for the general selection principle rather than another structure name. An extension then keeps the station facts fixed while changing the department's operation: a passenger display needs an ordered sequence, while a route planner needs a connection graph. The combined reveal establishes that a real system may maintain multiple useful organisations around the same entities and distinguishes stack/queue behaviour from a particular implementation.

Animations are deterministic SVG/CSS, replayable where time-based, and honour reduced-motion preference. They explain state and operations; they do not supply answers to the play cases.

## Amendment history

- 2026-08-28 — Initial introduction BB created from founder request for pathway orientation, animation and illustration.
- 2026-08-28 — Founder requested substantially more polish. Rebuilt the orientation storyboard to prevent label collisions, strengthened contrast and state hierarchy, added a DSA operation identity to the hero, replaced text-symbol answers with code-native illustrated cards, and added an explicit read-to-play handoff.
- 2026-08-28 — Founder requested richer, more substantial DSA. Expanded the same orientation BB rather than opening a later topic: added an honest benefit/trade-off comparison, a two-stage operation-then-structure decision for every case, stronger real-world constraints and a final transfer check. Status remains `AI_DRAFT`.
- 2026-08-28 — Founder requested further additions and extensions within the current setup. Added one transfer lab using identical station facts for an ordered passenger display and a connection-based route planner, followed by a combined-system and abstraction-level precision note. No later DSA BB was opened.
- 2026-08-28 — Founder approved the expanded introduction “for now” and requested deployment. Learner-facing approval inputs were digest locked; pathway placement and release remain undecided.
