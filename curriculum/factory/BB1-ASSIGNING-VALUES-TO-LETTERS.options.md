# Factory options — BB1: Variables and Changing Values

Status: `AI_DRAFT` — options for founder selection. Nothing here is approved.
Identifier: `CME-CHANGE-001`
Course: *Variables and Rates of Change*

Settle the fork in §2 first. It changes what the sections are, so the
section-level options below only make sense once it is decided.

---

## 1. Source record

### Wentworth (verified against the transcription)

- Author: G. A. (George Albert) Wentworth (1835–1906)
- Title: *The First Steps in Algebra*
- Publisher: Ginn & Company, Boston, U.S.A.
- Copyright year on the title page: 1894
- Stable record: https://www.gutenberg.org/ebooks/36670
- Source consulted: Project Gutenberg LaTeX transcription, `36670-t.tex`

**W1 — Chapter I, Article 5, "Number-Symbols in Arithmetic", printed folio 1**
> "Arithmetic employs the arbitrary symbols, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
> called *figures*, to represent numbers."

**W2 — Chapter I, Article 6, "Number-Symbols in Algebra", printed folio 2**
> "Algebra employs *the letters of the alphabet* in addition to the figures of
> Arithmetic to represent numbers. Letters are used as *general* symbols of
> numbers to which *any particular values* may be assigned."

The existing BB1 record cites "Chapter I, section 6, printed page 2". That is
correct. The quotation in the record is also accurate.

### Thompson (already fetched for BB2, reused here)

- *Calculus Made Easy*, 1910, Gutenberg 33283.

**T1 — Chapter III, "On Relative Growings", printed page 9**
> "We classify all quantities into two classes: *constants* and *variables*.
> Those which we regard as of fixed value, and call *constants* … while those
> which we consider as capable of growing, or (as mathematicians say) of
> 'varying,' we denote by letters from the end of the alphabet, such as x, y, z."

---

## 2. The fork: generality or variation

These are two different lessons, and BB1 currently blurs them.

**Wentworth's idea is generality.** A letter is a *general* symbol: any
particular value *may be assigned* to it. The letter stands for a number you
have not committed to yet. Nothing is moving.

**Thompson's idea is variation.** A quantity is either fixed (a constant) or
capable of growing (a variable). Something is moving.

BB1 cites Wentworth but teaches Thompson: its objective says the value
"may change", and its slider demonstrates a value in motion. The Wentworth
passage does not support motion. It supports assignment.

This matters because BB2 is about change. If BB1 already teaches variation,
BB2 has less to do and the two blur together. If BB1 teaches assignment, BB2's
opening move — x takes a *new* value — lands as a genuine step.

- **F-1** Keep BB1 as variation (Thompson-led). Recite from T1, and demote the
  Wentworth citation to a secondary note on notation. Closest to what is built.
- **F-2** Make BB1 assignment (Wentworth-led). A letter holds a number; you
  choose which number. Movement is deferred to BB2, where it belongs. Requires
  rewording the objective and re-aiming the slider as "assign a value", not
  "change the value".
- **F-3** Teach both, in order, inside BB1: a letter stands for a number
  (Wentworth), and the number assigned can later be changed (Thompson). Costs
  an extra section.

---

## 3. Structure

- **ST-A** Three sections, as built: symbol and value → definition → concrete
  model with the square.
- **ST-B** Four sections, Wentworth-led: figures versus letters → a letter
  stands for a number → any value may be assigned → the assigned value can
  change. Pairs with F-2 or F-3. Makes the contrast in W1 explicit, which is
  currently missing even though it is the cleanest source for the
  variable-versus-constant exercise already live.

---

## 4. Section options (written for ST-A)

If you choose ST-B I will re-cut these; the wording carries over.

### Section 1 — symbol and value

**S1-A** (as built)
> x = 2 means that the variable x currently represents the number 2. If its
> value becomes 3, the symbol is still x.

**S1-B** (Wentworth-led, from W1/W2)
> Arithmetic writes numbers with figures: 1, 2, 3. Algebra adds the letters of
> the alphabet. A letter is a general symbol: it stands for a number, and you
> may assign any particular value to it. Here x has been assigned the value 2.

Interaction:
- **S1-I1** the square, sized by x, with x labelling the edge ← live now
- **S1-I2** a plain value card reading `x = 2` with the slider under it, no
  geometry at all. Geometry arrives in section 3 where the record says it should.
- **S1-I3** two cards side by side, `x` and `2`, with a line joining them, to
  show the symbol and the value as separate things

Exercise:
- **S1-X1** choice: "x has value 2, then value 3. What changed?" ← live now
- **S1-X2** choice: "Which of these is a figure, and which is a letter used as a
  general symbol?" Direct from W1/W2.

### Section 2 — the definition

**S2-A** (as built)
> A variable is a symbol that represents a number. In this lesson, x can take
> different values.

**S2-B** (Thompson-led, from T1)
> Thompson sorts every quantity into two kinds. Those of fixed value he calls
> constants. Those capable of growing he calls variables, and writes them with
> letters from the end of the alphabet: x, y, z. Here x is a variable.

Interaction:
- **S2-I1** unchanged stage from section 1 ← live now
- **S2-I2** a two-column sorter: drag 2, x, 7, y into "fixed" and "can vary".
  Makes the definition something you do rather than read.

Exercise:
- **S2-X1** choice: "Which one of these is a variable?" → x / 2 / 3 ← live now
- **S2-X2** choice: "Wentworth says a letter is a *general* symbol. What does
  general mean here?" → any value may be assigned / it is always unknown / it
  is larger than a figure

### Section 3 — the concrete model

**S3-A** (as built)
> Here x represents the side length of a square. Change x with the slider; the
> displayed length and the square change together.

**S3-B** (assignment framing, pairs with F-2)
> Let x be the side of a square. Assign x a value and the square takes that
> size. Assign a different value and it takes a different size. The letter did
> not change; only the number assigned to it.

Interaction:
- **S3-I1** square with the edge label, slider ← live now
- **S3-I2** same, plus a ghost outline of the previous size left behind, so the
  learner sees that a value was replaced rather than merely nudged

Exercise:
- **S3-X1** set-control: "Use the slider to make x = 3.0 cm." ← live now
- **S3-X2** set-control: "Assign x the value that makes the square 2.5 cm on
  each side", which tests the word *assign* if F-2 is chosen

---

## 5. Known defect to fix in the rebuild

The square stops growing above x = 3.0. `.square` carries `max-width: 152px`
while the inline width computes to 178px at x = 3.5, so the top quarter of the
slider moves the number and not the shape. BB1's own text claims the two "change
together". Fix by rescaling growth so 3.5 lands on 152px, or by raising the cap.

---

## 6. Open, not for this pass

- Territory list for the public-domain claim on both books.
- Whether the prerequisite list keeps P-01, which BB1 never exercises, and
  whether a length/measurement prerequisite needs a P-id.
