# Area on the Grid

Status: `AI_DRAFT`
Identifier: `FCG-AREA-001`
Course: *Functions and Coordinate Geometry* **(proposed, not approved)**
Board number: **none yet.** The proposal that places this board is unapproved,
and the existing BB6–BB12 would need renumbering if it were.
Record written: 2026-08-09, from founder selections made the same day.

> **Gate.** This board belongs to a pilot proposed in
> `curriculum/factory/PILOT-PROPOSAL-FUNCTIONS-AND-COORDINATE-GEOMETRY.md`, which
> carries five undecided founder decisions. Nothing here may reach a learner while
> that proposal stands unapproved.

## One learning objective

The learner can explain that the area of a surface is the number of unit squares
it contains, and that multiplying base by altitude counts those squares rather
than replacing the count with a rule.

This board does not teach the coordinate plane, negative coordinates, or the area
of any figure other than a rectangle.

## Why this board exists

BB3 uses `y = x²` as the area of a square and has done so for three boards. The
prerequisite map lists "connect side length with square area" as `P-06`, a
*prerequisite*, with no board teaching it. So the course has been asserting an
area formula it never earned. This board earns it.

## Prerequisites

- `P-01`: read a number written in figures.
- **`P-09` (new, proposed):** multiply two small whole numbers. Section 3 requires
  it and no existing prerequisite covers multiplication. The map needs this id
  adding if this board is adopted.

`P-06` should be **removed** from the prerequisite map once this board is
approved, for the same reason `P-04` was removed from BB1: it becomes something
the course teaches rather than something it assumes.

## Source record

- Author: G. A. Wentworth (1835–1906)
- Title: *Plane Geometry*
- Stable record: https://www.gutenberg.org/ebooks/33063
- Source consulted: Project Gutenberg LaTeX transcription, `33063-t.tex`,
  read on 2026-08-09.

**Citation note.** This transcription marks scan images (`\scanpage{193.png}`)
and carries **no printed folio numbers**. Citations therefore give a scan number,
not a page. Inventing a printed page here would be fabrication.

**G1 — Book IV, Areas of Polygons, scan 193**
> "The unit of surface is a square whose side is a unit of length."

**G2 — Book IV, scan 193**
> "The area of a surface is the number of units of surface it contains."

**G3 — Book IV, scan 196**
> "The area of a rectangle is equal to the product of its base by its altitude."

**G4 — Book IV, Scholium, scan 196**
> "When the base and altitude each contain the linear unit an integral number of
> times, this proposition is rendered evident by dividing the figure into squares,
> each equal to the unit of surface. Thus, if the base contains seven linear
> units, and the altitude four, the figure may be divided into twenty-eight
> squares, each equal to the unit of surface."

### Provenance and legal note

Project Gutenberg records the ebook as public domain in the United States.
Wentworth died in 1906, so the authored text falls outside the ordinary UK
life-plus-70 term. No editor or translator is credited on this edition and no
modern reprint, cover or annotation is used. Launch territories still to be fixed
before release. This is a provenance record, not legal advice.

### Concept retained and modernisation

Retained: the unit of surface as a square of unit side; area as a count of those
units; the rectangle rule as a consequence of the count rather than a definition;
and the scholium's seven-by-four example, which is used verbatim as the board's
central number.

Modernised: "altitude" is kept because the source uses it and it is still
current; the propositional form is dropped in favour of a manipulable grid; and
the count is performed by the learner rather than asserted.

**Constraint taken from the source, not imposed on it.** Wentworth's scholium
holds only "when the base and altitude each contain the linear unit an integral
number of times." The grid therefore snaps to whole units. This leaves a real door
open: BB3 has used a side of 2.5 throughout, so a learner who notices they cannot
count 2.5 by 2.5 has found a genuine limit of the method rather than a defect.

## Learner sequence

Four sections. **One object carries the whole board** — a single rectangle on a
grid, grown, counted, then pulled square. Nothing is replaced between sections,
so the square in section 4 is what the shape *becomes*.

Nineteen variants were drafted and every slot was selected by the founder. Six
were rejected and are recorded below rather than deleted.

### Section 1 — The unit of surface `S1-B`

> A length is measured with a unit of length. A surface is measured with a unit of
> surface, which is a square whose side is one unit of length. The area of a
> surface is the number of units of surface it contains.

Interaction `S1-I3`: the side steps 1, 2, 3, 4 and the square fills with unit
squares. At a side of 1 the learner sees the unit itself; at 4, sixteen of them.

> **Design note carried forward.** This shows 1, 4, 9, 16 in section 1, which is
> section 4's payoff arriving three sections early. Adopted on founder direction.
> Seeing before naming may be the better order, but the surprise is spent here.

Exercises: `S1-X1` choice, what a unit of surface is. `S1-X2` match, sorting
`a line 1 unit long`, `5 cm`, `a square 1 unit each side`, `5 cm²` into what each
measures.

### Section 2 — Area is a count `S2-B`

> Drag the corner and the shape fills with unit squares. Count them, and that
> number is the area. Nothing has to be worked out; the squares are there to be
> counted.

Interaction `S2-I1`: the counting grid, **with the product deliberately
withheld**. Counting has to come first or the formula is merely asserted again.

Exercises: `S2-X1` choice, what area means. `S2-X2` build a shape holding exactly
12 squares.

### Section 3 — Counting and multiplying agree `S3-B`

> It would take a long time to count twenty-eight squares one by one. There is a
> shorter way. Count the squares along the base, count the squares up the
> altitude, and multiply those two numbers together. That is all the rule base
> times altitude asks you to do.

Interaction `S3-I1`: the same grid with the product now shown beside the count, so
the two can be watched agreeing at every size.

Exercises: `S3-X1` seven by four, with `11` as the adding distractor. `S3-X2`
build a shape with base 6 and area 18. `S3-X3` why multiplying works, whose
correct answer is that the squares sit in equal rows.

### Section 4 — A square is the special case `S4-A`

> Pull the shape until its base and its altitude are the same. It is now a square,
> and its area is a side multiplied by itself. That is written x², and it is what
> y has meant since the board where a square first appeared.

Interaction `S4-I1`: the same grid again, with a marker when base and altitude
agree.

Exercises: `S4-X1` make a square holding 16. `S4-X2` a square of side 5. `S4-X3`
why a side times itself is written `x²` and not `2x`.

## Workshop `W1` — The tiling bench

A target area and a grid to reach it on. Three goals:

1. Reach an area of 24 three different ways.
2. Make one of them a square.
3. Change the target so that a square is possible.

**Goal 2 cannot be met, and is left unmarked.** 24 has no whole-number square
root. On an eight-by-six grid the reachable rectangles are 4×6, 6×4 and 8×3, so
goal 1 is exactly achievable and exhaustive. The learner must fail at goal 2
before goal 3 offers a different target, where 16 and 25 both work. Perfect
squares met as an obstacle rather than as a definition, and square roots quietly
planted.

Goals stick once reached, since goal 1 concerns the target 24 and goal 3 concerns
any other, and without stickiness meeting one would un-tick the other.

## Interaction specification

- Control: a grid of 8 by 6 unit cells. Pointer down or drag sets base and
  altitude. Snapped to whole units, per the source constraint above.
- Section 1 uses a stepper of 1 to 4 instead, not the grid.
- Visible output: base, altitude and the count, always. The product appears from
  section 3 onward only.
- Accessibility: every cell is a button with a label naming the size it sets;
  steppers disable at the ends of their range.
- Scope boundary: no axes, no negative values, no figure other than a rectangle.

## Misconceptions to test

1. Area is a formula to be applied rather than a count. *(section 2, `S2-X1`)*
2. Adding the sides gives the area. *(section 3, the `11` distractor)*
3. `x²` and `2x` mean the same thing. *(section 4, `S4-X3`)* This is the
   commonest error in elementary algebra and the board is arranged to meet it.
4. A unit of surface could be any size. *(section 1, `S1-X1`)*
5. Every number can be made into a square. *(the tiling bench, by failure)*

## Rejected variants

| Code | Reason |
|---|---|
| `S1-A` | Founder: reads as AI prose rather than a textbook. |
| `S1-I1` | Founder: a square that cannot move at all. |
| `S1-I2` | Superseded by I3, which changes the side rather than refusing to. |
| `S2-A` | Not selected; S2-B carries the idea without repeating S1's closing line. |
| `S3-A` | Not selected; S3-B was rewritten to founder dictation. |
| `S4-B` | Not selected; S4-A states the link back to y explicitly. |

## Amendment history

| Date | Change | Authority |
|---|---|---|
| 2026-08-09 | Board designed in session: four sections, one object throughout. | Founder |
| 2026-08-09 | Counting screen built as drag-a-corner with the product withheld until section 3. | Founder |
| 2026-08-09 | Section 4 lands by pulling the same shape square rather than introducing a second figure. | Founder |
| 2026-08-09 | Tiling bench adopted with its second goal left impossible and unmarked. | Founder |
| 2026-08-09 | Wentworth Book IV read and four passages recorded with scan citations. | AI |
| 2026-08-09 | S1-A rejected as AI prose; S1-B rewritten in a plainer textbook register. | Founder |
| 2026-08-09 | Static unit square replaced by one whose side steps 1 to 4. | Founder |
| 2026-08-09 | S3-B rewritten to founder dictation. | Founder |
| 2026-08-09 | S2-B reworded to avoid repeating S1-B's closing sentence. | AI, flagged |
| 2026-08-09 | All nineteen slots selected. | Founder |

## Founder review

- [ ] The pilot proposal that places this board is approved.
- [ ] The learning objective is correct and sufficiently small.
- [ ] `P-09` is added to the prerequisite map and `P-06` removed.
- [ ] The Wentworth record and the scan-citation convention are acceptable.
- [ ] The four readings are clear and mathematically accurate.
- [ ] The grid and the stepping square work on phone and desktop.
- [ ] The tiling bench's impossible goal is right to keep unmarked.
- [ ] Section 1 showing 1, 4, 9, 16 ahead of section 4 is accepted.
- [ ] Founder marks the board `APPROVED`.

Until the final box is completed by the founder, this board remains `AI_DRAFT`
and cannot be built into the learner app.
