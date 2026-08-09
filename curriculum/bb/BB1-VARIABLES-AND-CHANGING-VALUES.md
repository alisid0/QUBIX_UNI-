# BB1: Variables and Changing Values

Status: `AI_DRAFT`
Identifier: `CME-CHANGE-001`
Course: *Variables and Rates of Change*
Founder gate: awaiting reading and interaction testing
Record rewritten: 2026-08-09, from Factory selections

> **Title flag.** Under fork F-2 this BB no longer teaches changing values; it
> teaches assignment, and change moves to BB2. The title is therefore wrong and
> should probably become *Letters as Symbols for Numbers* or *Assigning Values
> to Letters*. It is left unchanged here because renaming touches `STATUS.md`,
> `02-MAIN-CURRICULUM-MAP.md`, `README.md` and `ReviewMode.svelte`, and that is
> a founder decision, not a side effect of this rewrite.

## One learning objective

The learner can explain that a letter in algebra represents a number, and that
any particular value may be assigned to it.

This BB does not teach variation, delta notation, dependent variables, rates of
change or derivatives. A value being *replaced by assignment* is within scope. A
value *varying* is BB2's subject.

## Fork decision

**F-2, assignment, Wentworth-led.** Selected by the founder on 2026-08-09.

BB1 previously cited Wentworth while teaching Thompson. Wentworth's Article 6 is
about generality: a letter is a symbol to which any particular value *may be
assigned*. Nothing moves. Thompson's Chapter III is about variation: quantities
are fixed or capable of growing. Something moves.

The earlier draft asserted that the value "may change" and demonstrated a value
in motion, which is Thompson's lesson under Wentworth's citation, and which left
BB2's opening move with nothing to introduce. Under F-2 movement is deferred to
BB2 and BB1 teaches assignment only.

Structure: **ST-B**, four sections.

## Prerequisites

Revised under F-2. Two changes from the previous record, both consequences of the
fork:

- `P-04` ("understand that a letter may hold a number") is **removed**. Under F-2
  this is what BB1 teaches. It cannot also be its prerequisite.
- `P-01` is **narrowed** to reading a number written in figures, which section 1
  genuinely requires. The previous record listed P-01 in full while BB1 performed
  no arithmetic at all.

Current prerequisites:

- `P-01` (narrowed): read a number written in figures.
- `P-03`: read decimals such as 1.5 and 2.5, required by the slider's range and
  tenth steps.

**Open against the prerequisite map.** Section 4 puts a centimetre measurement on
screen, which needs a length prerequisite. The map has a `G0` node for length and
square area but gives it no `P-` id, and its nearest entry `P-06` is assigned to
BB3. The map needs either a new id or a reassignment. Recorded, not resolved.

## Source record

### Wentworth, primary

- Author: G. A. (George Albert) Wentworth (1835–1906)
- Title: *The First Steps in Algebra*
- Publisher: Ginn & Company, Boston, U.S.A.
- Copyright year on the title page: 1894
- Stable record: https://www.gutenberg.org/ebooks/36670
- Source consulted: Project Gutenberg LaTeX transcription, `36670-t.tex`,
  verified against the transcription on 2026-08-09

**W1 — Chapter I, Article 5, "Number-Symbols in Arithmetic", printed folio 1**
> "Arithmetic employs the arbitrary symbols, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
> called *figures*, to represent numbers."

**W2 — Chapter I, Article 6, "Number-Symbols in Algebra", printed folio 2**
> "Algebra employs *the letters of the alphabet* in addition to the figures of
> Arithmetic to represent numbers. Letters are used as *general* symbols of
> numbers to which *any particular values* may be assigned."

### Thompson, secondary

- *Calculus Made Easy*, 1910, Gutenberg 33283.

**T1 — Chapter III, "On Relative Growings", printed page 9**
> "We classify all quantities into two classes: *constants* and *variables*."

T1 is recorded for continuity only. Under F-2 the constant/variable distinction
is **not** taught in BB1; it belongs with variation, in BB2.

### Provenance and legal note

Project Gutenberg records both ebooks as public domain in the United States.
Wentworth died in 1906 and Thompson in 1916, so both authored texts fall outside
the ordinary UK life-plus-70 term. No modern translation, commercial reprint,
cover or third-party annotation is used. Launch territories are still to be fixed
and the exact assets rechecked before release. This is a provenance record, not
legal advice.

### Concept retained and modernisation

Retained from W1 and W2: arithmetic represents numbers with figures; algebra also
uses letters; a letter is a general symbol to which any particular value may be
assigned.

Modernised:

- "figures" is kept, since it is still current and is the exact contrast the
  section needs;
- the assignment is shown by a control the learner operates, rather than asserted;
- the square in section 4 is a modern addition, not Wentworth's example. It exists
  to carry a measured quantity into BB3, where area arrives.

## Learner sequence

Twelve variants were drafted in the Factory. Four were selected by the founder
and eight finalised by AI under a standing instruction of 2026-08-09 to let the
interactions stand provided no two repeat.

### Section 1 — Figures and letters `S1-A` selected

> Arithmetic uses figures to represent numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0.
> Algebra uses the letters of the alphabet as well.

Interaction `S1-I1` (AI-finalised): two rows. Figures display their number.
Letters display nothing, because no value has been assigned yet. No control on
this section; there is nothing to assign.

Exercise `S1-X1` (AI-finalised), choice: "Which of these always stands for the
same number?" → **7** / x / y.

### Section 2 — A letter stands for a number `S2-B` selected

> Write x = 2. This assigns the number 2 to the letter x. In this lesson x now
> represents 2.

Interaction `S2-I2` (AI-finalised): the symbol and the value as two separate
cards joined by a rule, so they read as distinct things. The control assigns the
value.

Exercise `S2-X1` (AI-finalised), choice: "x has been assigned the value 5. What
does x stand for?" → **The number 5** / The letter x / Any number at all.

### Section 3 — Any particular value may be assigned `S3-A` AI-finalised

> Any particular value may be assigned to a letter. Assign 3 to x and x
> represents 3. Assign 1.5 and x represents 1.5. The letter is not altered by
> this.

Interaction `S3-I1` (AI-finalised): the current value card with the replaced
value left behind as a ghost, so a replacement is visible rather than inferred.

Exercise `S3-X1` (AI-finalised), choice: "x is assigned 2, then assigned 3. What
changed?" → **The value assigned to x** / The symbol changed from x to another
letter / The number 2 became a letter.

### Section 4 — A letter can label a quantity `S4-A` selected

> A letter may represent a measured quantity. Let x be the length of the side of
> this square, in centimetres. The square is drawn at whatever value is assigned
> to x.

Interaction `S4-I1` (founder-selected): the square with x labelling its edge.

Exercise `S4-X1` (AI-finalised), set-control: "Assign x the value that makes each
side 3.0 cm."

## Interaction specification

- Control: one labelled range input for x, 1.5 cm to 3.5 cm in steps of 0.1 cm,
  present from section 2 onward. Section 1 has no control.
- Visible output: the assigned value and, in section 4, the square's side update
  together.
- Growth: the square scales 74px at x = 1.5 to 152px at x = 3.5. The previous
  `max-width: 152px` cap froze the square above x = 3.0 while the readout kept
  climbing, contradicting the claim that the number and the shape change
  together. Fixed as part of `S4-I1`.
- Accessibility: the control carries a descriptive label, keyboard support and a
  visible numerical readout.
- Scope boundary: no area, no Δ notation, no dependence between x and x².

## Misconceptions to test

1. A letter is a different kind of thing from a number, rather than a symbol for
   one. *(section 1)*
2. A figure such as 2 could be assigned a different value. *(section 1, tested by
   S1-X1)*
3. Assigning a new value alters the letter. *(section 3, tested by S3-X1)*
4. A letter means "unknown" rather than "not yet committed". *(section 2, tested
   by S2-X1)*
5. Operating the control is sufficient evidence of understanding without a
   selected or spoken explanation. *(three of the four exercises are verbal for
   this reason)*

## Amendment history

| Date | Change | Authority |
|---|---|---|
| 2026-08-09 | Wentworth citation verified against the transcription. Chapter I, article 6, printed folio 2 confirmed correct. | AI |
| 2026-08-09 | Fork F-2 adopted: BB1 teaches assignment, not variation. Objective rewritten. | Founder |
| 2026-08-09 | Structure ST-B adopted: three sections become four. | Founder |
| 2026-08-09 | Readings S1-A, S2-B and S4-A and interaction S4-I1 selected. | Founder |
| 2026-08-09 | Remaining eight slots finalised under a standing no-repeat instruction. | AI |
| 2026-08-09 | `P-04` removed from prerequisites; `P-01` narrowed. | AI, consequence of F-2 |
| 2026-08-09 | Square growth rescaled; `max-width` cap removed. | AI, defect fix |

## Founder review

- [ ] The learning objective is correct and sufficiently small under F-2.
- [ ] The revised prerequisites are right, and P-04's removal is accepted.
- [ ] The Wentworth record and the modernisation note are acceptable.
- [ ] The four readings are clear and mathematically accurate.
- [ ] The four interactions expose the intended relationship on phone and desktop.
- [ ] The four exercises identify the recorded misconceptions.
- [ ] The title question is resolved.
- [ ] Founder marks the BB `APPROVED`.

Until the final box is explicitly completed by the founder, BB1 remains
`AI_DRAFT` and BB2 remains locked.
