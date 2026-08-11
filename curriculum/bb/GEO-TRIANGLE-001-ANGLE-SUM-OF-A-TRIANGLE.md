# Angle Sum of a Triangle

Status: `AI_DRAFT`, gated
Identifier: `GEO-TRIANGLE-001`
Factory key: `triangle-angles`
Course position: proposed after *Angles and Turns* and before triangle classification, circles and trigonometry; not placed
Drafted: 2026-08-11 under founder permission to plan and create the next lessons

## One learning objective

The learner changes a triangle, observes that its three interior angles still
total 180°, and uses that invariant to find one missing angle.

This board does not teach classification by sides or angles, congruence,
similarity, exterior-angle theorems, the Pythagorean theorem or trigonometric
ratios.

## Provisional prerequisites

- recognise rays, vertices and interior openings;
- read degree measures and recognise 90° and 180°;
- add and subtract whole numbers to 180;
- understand the retained ideas in *Angles and Turns*.

The prerequisite map has not approved these nodes, and *Angles and Turns* still
lacks a selected S3 reading. This board therefore cannot advance to learners.

## Source record

- Author: George Albert Wentworth
- Title: *Plane Geometry*
- Edition: revised edition
- Publisher: Ginn & Company, Boston, New York, Chicago and London
- Copyright notice: 1899, G. A. Wentworth
- Transcription: Project Gutenberg ebook 33063
- Stable record: https://www.gutenberg.org/ebooks/33063
- Exact passages: Book I definitions, scan 039; Proposition I and Corollary 2,
  scan 041
- Shelf status: `EDITION_REVIEW`

Retained: a triangle is bounded by three straight lines; its sides include three
interior angles; the three angles total two right angles; subtracting two angles
from two right angles gives the third.

Modern treatment: two right angles are immediately connected to 180°. The board
uses computed diagrams, a live partition strip and new numerical examples. All
learner prose, diagrams, controls and exercises are Qubix-original. Project
Gutenberg records US public-domain availability; UK and other launch-territory
status remains unresolved, so the edition gate stays closed.

## Interaction specification

1. **The three interior angles**
   - continuously move the apex sideways and vertically while A, B and C update;
   - compare wide, tall, leaning and right-angled presets.
2. **Three corners make a straight angle**
   - in selected `S2-I3`, move the three labelled corner parts from the triangle
     onto a 180° line;
   - without leaving that stage, change triangle shape while the live A/B/C
     partition redistributes without a gap;
   - the separate `S2-I1` and `S2-I2` candidates are superseded.
3. **Find the missing angle**
   - change two known angles and reveal the exact remainder to 180°;
   - hit target values for the missing angle by adjusting the two known angles.

Every control is a native button or range input. Degree labels are calculated
from the displayed geometry; the displayed rounded values are constrained to
sum to exactly 180°.

## Misconception to watch

Changing a triangle's shape changes its individual angles but not their total.
The 180° relationship belongs to the three interior angles, not to any three
angles drawn near the triangle. The corner-lineup interaction makes the invariant
visible before the subtraction rule is introduced.

## Amendment history

| Date | Change | Authority |
|---|---|---|
| 2026-08-11 | Founder granted liberty to plan, create, refer and design creative interactions for the next lessons. | Founder |
| 2026-08-11 | Scope narrowed to one board and one theorem under the repository's one-BB rule. | AI, governance safeguard |
| 2026-08-11 | Wentworth revised edition, Book I scans 039–041 recorded; three-section Factory draft created with empty selections. | AI |
| 2026-08-11 | Founder selected S1-A, both S1 interactions and checks, S2-B, both S2 checks, S3-A and both S3 interactions; requested S2-I1 and S2-I2 be combined. | Founder |
| 2026-08-11 | Added selected S2-I3 combining the corner lineup and live redistribution; recorded S2-I1 and S2-I2 as superseded. | AI, implementing founder direction |
| 2026-08-11 | Founder requested S3-X3, but no candidate with that code exists. No exercise selection was inferred. | Open clarification |

## Founder review

- [ ] The learning objective is small enough.
- [ ] The provisional prerequisites are correct.
- [ ] The Wentworth edition and passage treatment are acceptable.
- [ ] Resolve the S3 exercise selection: only `S3-X1` and `S3-X2` currently exist.
- [ ] Give the board an approved curriculum position.
- [ ] Founder marks the board `APPROVED`.

Until those decisions are explicit, this board remains `AI_DRAFT`, is visible
only in the Factory and is excluded from the learner build.
