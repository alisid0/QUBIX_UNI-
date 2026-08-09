# Pilot proposal — Functions and Coordinate Geometry

Status: **Proposal. Nothing here is approved and nothing here changes
`02-MAIN-CURRICULUM-MAP.md`.** Written 2026-08-09 on founder direction.

## 1. Why the pilot is being reshaped

The present pilot, *Variables and Rates of Change*, has three holes and a cliff.

**The coordinate plane is never introduced.** BB5 draws a parabola on two axes
with a point marked and a line through it. Nothing before it teaches what a graph
is. BB2 shows a number line, unexplained but survivable; BB5 hands the learner a
full plane with no preparation.

**Slope arrives as a number before it arrives as a picture.** BB5 produces
`dy/dx = 4` as a limit of ratios. Its geometric meaning is drafted as BB11, six
boards later.

**Area is assumed, not taught.** BB3 uses `y = x²` as the area of a square, and
`01-PREREQUISITE-MAP.md` lists "connect side length with square area" as `P-06`,
a prerequisite, with no board teaching it.

**And BB4–BB5 are a subject change, not a next step.** BB1–BB3 are about what a
letter means and how quantities relate. BB4–BB5 are the differential calculus.

The reshape gives the three built boards somewhere to go. Letters hold values,
values change, one quantity depends on another, that dependence is a function,
functions live on a plane, a curve is a function drawn, and slope is Δy ÷ Δx.
Delta was never rate-of-change groundwork. It was slope groundwork.

## 2. The sequence

Nine boards in three units. Boards 1 to 3 exist and are selected.

### Unit 1 — Variables *(built)*

**BB1 · Assigning Values to Letters** — `AI_DRAFT`, 12 slots selected, record written.
Source: Wentworth, *The First Steps in Algebra*, ch. I arts. 5–6, folios 1–2.

**BB2 · Change in a Variable** — `AI_DRAFT`, 23 selections, 1 rejection, no record.
Source: Thompson, *Calculus Made Easy*, ch. III, pp. 9–10. Δ notation is a
modernisation; Thompson does not use it.

**BB3 · Dependent Variables** — `AI_DRAFT`, 23 selections, 2 rejections, no record.
Source: Thompson ch. II pp. 6–7 and ch. III pp. 9–10.

### Unit 2 — Functions *(new)*

**BB4 · A Rule from Input to Output**

- Objective: a function is a rule that takes each input to one output. BB3 showed
  one dependence; this names the general idea and shows the rule can be swapped.
- Source: Thompson ch. III pp. 9–10 for dependence. The word *function* in its
  modern sense is not in the shelf, so the naming is `ORIGINAL`.
- New in this board: that the rule is a thing in its own right, separable from the
  quantities it joins. BB3 only ever had one rule, `y = x²`, which quietly
  suggests dependence and squaring are the same idea.
- Interaction sketch: a machine whose rule can be exchanged — double it, add
  three, square it — with the same inputs run through each. The output column
  changes while the input column does not.
- Exercise sketch: match inputs to outputs under a stated rule; identify which
  rule produced a given pair; a stepper feeding one input through two rules.

**BB5 · One Input, One Output**

- Objective: the defining property. A rule that offers two outputs for one input
  is not a function.
- Source: `ORIGINAL`. No shelf book states this; it is a modern definition.
- New in this board: the first thing in the course that can *fail* to be
  something. Everything so far has been a definition to accept.
- Interaction sketch: a machine that sometimes returns two answers, and the
  learner has to say whether it qualifies. `y = x²` passes; "a number whose square
  is x" does not, since 9 gives both 3 and −3.
- Exercise sketch: sort rules into function and not-a-function; find the input
  that breaks a rule.

### Unit 3 — Coordinate geometry *(new)*

**BB6 · The Coordinate Plane**

- Objective: two number lines crossed at a right angle; a point is a pair of
  values, in a fixed order.
- Source: `ORIGINAL`, built on BB2's number line. Descartes' *La Géométrie* (1637,
  Gutenberg 26400) is the historical origin and should be named as such in the
  record, but it is in French and using it would mean translating 17th-century
  mathematical French ourselves.
- New in this board: that one number is not enough for a position, which is the
  motivation the whole unit rests on.
- Interaction sketch: a single number line that visibly cannot express "over there
  and up a bit", then a second line arriving at right angles.
- Exercise sketch: read an address off the grid; place a point from an address;
  spot why (3, 4) and (4, 3) are different places.

**BB7 · Reading the Grid**

- Objective: quadrants and signs, and area as a count of unit squares.
- Source: **Wentworth, *Plane Geometry*, Book IV, Areas of Polygons, scan 193
  onward.** Verified in the transcription:
  - "The **unit of surface** is a square whose side is a *unit of length*."
  - "The **area of a surface** is the *number of units of surface* it contains."
  - "The area of a rectangle is equal to the product of its base by its altitude."
  - Scholium: "if the base contains seven linear units, and the altitude four, the
    figure may be divided into twenty-eight squares, each equal to the unit of
    surface."
- Note on citation: this transcription marks scan images (`\scanpage{193.png}`)
  and carries no printed folio numbers, so records citing it must say *scan 193*
  rather than inventing a page.
- New in this board: area becomes something counted rather than a formula, which
  is what BB3 has been assuming since it wrote `y = x²`.
- Interaction sketch: a grid where a rectangle is dragged out and the unit squares
  inside it are counted, with the count and the product shown to agree.
- Exercise sketch: count the squares; predict the count before revealing; find
  which quadrant a point lies in from its signs alone.

**BB8 · Curves from a Rule**

- Objective: plot `y = x²` point by point and watch the parabola appear. A curve
  is a function drawn.
- Source: Thompson ch. X, printed pp. 76–77, already recorded as T15 and T16.
  Thompson's own line, *"nowadays every schoolboy is familiar with the process of
  curve-plotting,"* is worth noting in the record: he assumes precisely what this
  board supplies. Besant, *Conic Sections: Treated Geometrically* (Gutenberg
  29913, Besant 1828–1917) as a secondary source for curves, though his treatment
  is deliberately without coordinates.
- New in this board: the join between Unit 2 and Unit 3. Function and picture
  become the same object.
- Interaction sketch: a table of x values with the points appearing on the grid one
  at a time, the curve drawn only after enough of them exist.
- Exercise sketch: place the next point; identify which rule drew a given curve;
  find a point that is not on the curve.

**BB9 · The Slope of a Line**

- Objective: how much a line leans, as rise over run, which is Δy ÷ Δx.
- Source: Thompson ch. X pp. 76–77, T15 and T16 verified.
- New in this board: BB2's Δ returns with a picture attached, and the course
  arrives at the doorstep of rate of change with the ground under it.
- Interaction sketch: a line whose ends are draggable, with the rise, the run and
  their ratio all shown, and the sign changing as the line tips past horizontal.
- Exercise sketch: match lines to slopes; make a slope negative; find the line
  with no rise at all.

## 3. What happens to the existing work

**Current BB4 (Average Rate of Change) and BB5 (Instantaneous Rate of Change)**
leave the pilot and join the gated drafts. Nothing is discarded. They become the
opening of the following course and will be better for arriving after the plane,
the curve and the slope exist. Their Factory options, workshops and exercises all
stand.

**BB6 to BB12 in the current numbering** stay gated and unchanged. Their board
numbers will need reassigning once this map is agreed, which is a renumbering
exercise, not a rewrite.

## 4. Strata as reference, not as a source

The Strata repository contains 37 coordinate-geometry cards whose sequence is
sound and which cover this ground closely: one line can't hold everything, two
lines crossed at a right angle, where they meet, every place has an address,
quadrants, signs, distance by triangle, then slope across six cards.

They are **reference only**. Two reasons.

They carry no provenance: each card records `{subject, topic, concept, ground,
buildsOn}` and cites no book. Importing them would reproduce the exact problem
this project has spent two days undoing, at 37 times the scale.

They are card-sized, not board-sized. Thirty-seven cards against four boards.

One card is worth quoting in the design notes because it independently reached the
same place as BB3: *"x is conventionally the input, chosen first; y is the output,
produced after — exactly what y = f(x) means later on."* Two strands agreeing
without knowing about each other is evidence the ordering is right.

## 5. Source register for the new boards

| Board | Source | Status |
|---|---|---|
| BB4 | Thompson ch. III pp. 9–10; naming is ours | part adapted, part `ORIGINAL` |
| BB5 | none | `ORIGINAL` |
| BB6 | none; Descartes named as origin | `ORIGINAL` |
| BB7 | Wentworth *Plane Geometry* Book IV, scan 193+ | **verified, adapted** |
| BB8 | Thompson ch. X pp. 76–77; Besant 29913 | adapted |
| BB9 | Thompson ch. X pp. 76–77 | adapted |

Euclid and Casey (Gutenberg 21076, Casey 1820–1891, TeX available) has not yet
been read. It is the obvious second source for BB7 and should be checked before
that board is drafted.

## 6. Two decisions this proposal needs

**A new status: `ORIGINAL`.** The declaration assumes every BB adapts a recorded
passage. Three of the six new boards have no source at all. That is a third
category beside adaptation and modernisation, and the source protocol has no word
for it. Without one, an original board either looks unsourced or gets a citation
it does not deserve. Proposed: `ORIGINAL — no source passage`, recorded in the BB
record and visible in the Factory.

**The course rename.** *Variables and Rates of Change* becomes *Functions and
Coordinate Geometry*. This touches `02-MAIN-CURRICULUM-MAP.md`, `README.md`,
`STATUS.md`, BB1's record, the Viewer header, the Approver's sequence list and the
route `?prototype=variables-and-rates`. Cheap to do and easy to get wrong quietly,
so it should be a single deliberate change rather than a side effect.

## 7. Order of work

1. Founder approves this shape, the rename and the `ORIGINAL` status.
2. Read Euclid and Casey Book I for BB7, alongside the verified Wentworth material.
3. Draft BB7 first. It has the strongest source and the clearest hole to fill.
4. Then BB6, which BB7 depends on for its grid.
5. Then BB8 and BB9, which need BB6 and BB7 in place.
6. Then BB4 and BB5, the function boards, which are the most `ORIGINAL` and
   therefore the ones most worth writing last, when the surrounding boards can
   show what they need to lead into.
7. Records for BB2 and BB3 in parallel, since neither needs a decision.

## 8. Founder decisions

- [ ] The nine-board shape is right.
- [ ] The course is renamed *Functions and Coordinate Geometry*.
- [ ] `ORIGINAL` is admitted as a source status.
- [ ] Current BB4 and BB5 move to the gated set.
- [ ] Strata is reference only, reimplemented with sources recorded.
