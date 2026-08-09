# Factory options — BB2: Change in a Variable

Status: `AI_DRAFT` — options for founder selection. Nothing here is approved.
Identifier: `CME-CHANGE-002`
Course: *Variables and Rates of Change*

Select one explanation and one exercise per section by their codes, for example
`S1-A, S1-X2`. Anything you do not mention, I choose and record as a finalised
conclusion. Anything you want reworded, say so and it returns here rather than
going into the record.

---

## Source record

- Author: Silvanus P. Thompson (1851–1916)
- Title: *Calculus Made Easy*
- Original publication year: 1910
- Stable record: https://www.gutenberg.org/ebooks/33283
- Source consulted: the Project Gutenberg LaTeX transcription, `33283-t.tex`
- Public-domain status: Project Gutenberg records it as public domain in the
  United States. Thompson died in 1916, so the authored text also falls outside
  the ordinary UK life-plus-70 term. Territory list still to be fixed before release.

Passages this BB draws on, quoted from the transcription:

**P1 — Chapter III, "On Relative Growings", printed page 9.**
> "We classify all quantities into two classes: *constants* and *variables*.
> Those which we regard as of fixed value, and call *constants*, we generally
> denote algebraically by letters from the beginning of the alphabet, such as
> a, b, or c; while those which we consider as capable of growing, or (as
> mathematicians say) of 'varying,' we denote by letters from the end of the
> alphabet, such as x, y, z, u, v, w, or sometimes t."

**P2 — Chapter III, printed page 10.**
> "Suppose we make x to vary, that is to say, we either alter it or imagine it
> to be altered, by adding to it a bit which we call dx. We are thus causing x
> to become x + dx."

**P3 — Chapter III, printed page 10.**
> "Here the bit dy may be in some cases positive, in others negative; and it
> won't (except by a miracle) be the same size as dx."

**P4 — Chapter I, "To deliver you from the Preliminary Terrors", printed page 1.**
> "(1) d which merely means 'a little bit of.' Thus dx means a little bit of x;
> or du means a little bit of u."

### Notation finding: Δ is not Thompson's

Thompson never uses Δ for a finite change. Searching the full transcription, the
only Greek delta in the book is ∂ for partial derivatives, in Chapter XVI, far
beyond this course. Thompson works with d from the outset and treats the bit as
indefinitely small.

So BB2's Δ is a **modernisation**, not an adaptation. It must be recorded as one.
The concept is Thompson's (a variable is altered by adding a bit to it; that bit
is a quantity with a size and a sign). The notation is standard modern practice,
introduced here because a finite, measurable change is easier to hold than an
infinitesimal one, with Thompson's own d reserved for BB6.

What Chapter I supplies instead is a **method**: defuse a frightening symbol by
saying plainly, in common-sense terms, what it means before using it. Section 3
applies Thompson's technique to a symbol Thompson did not use.

---

## Section 1 — x takes a new value

Draws on P1, P2.

**S1-A** (leads with Thompson's classification)
> Thompson divides every quantity into two classes: constants, which hold a
> fixed value, and variables, which are capable of growing. x is a variable.
> Here it sits at 2. Move it and x takes a new value, while the symbol stays x.

**S1-B** (plain, continuous with BB1)
> This is the same x you have just met. It starts at 2. Move it and x takes a
> new value, while the symbol stays x.

**S1-X1** set-control: "Move x to 2.5."
**S1-X2** choice: "Which of these is a constant?" → **2** / x / the value of x.
Distractor notes: choosing x confuses the symbol with a fixed quantity; choosing
"the value of x" is the BB1 misconception returning.

---

## Section 2 — the change is a quantity of its own

Draws on P2.

**S2-A** (Thompson's "adding a bit")
> Thompson describes the move as adding a bit to x. That bit is a quantity in
> its own right, and you find its size by subtracting: new − old. From 2 to 2.5
> the bit is 0.5.

**S2-B** (plain)
> Between the old value and the new one there is a gap, and that gap has a size
> of its own: new − old. From 2 to 2.5, the gap is 0.5.

**S2-X1** choice: "x moves from 2 to 2.75. How big is the change?" → **0.75** /
2.75 / 4.75. Distractors: reading the endpoint as the change; adding instead of
subtracting.
**S2-X2** set-control: "Move x so that the change is exactly 1.0." Forces the
subtraction to be run backwards.

---

## Section 3 — Δ on its own

No Thompson passage supports Δ. Draws on P4 for method only.

**S3-A** (names the borrowing openly)
> Thompson defuses a symbol by saying plainly what it means: d, he writes,
> "merely means a little bit of". Do the same for Δ. The Greek capital letter Δ,
> read "delta", is shorthand for the words "the change in". It is not a number,
> and it does not multiply.

**S3-B** (plain)
> That gap needs a name. Mathematicians write "the change in" using the Greek
> capital letter Δ, read "delta". On its own Δ is not a number, and it does not
> multiply. It is waiting for a variable to attach to.

**S3-X1** choice: "On its own, what does Δ mean?" → **The change in** / Multiply
by delta / A very small amount.
**S3-X2** choice: "Which is true of Δ?" → **It is a word, written short** / It is
a number close to zero / It is an instruction to multiply.

---

## Section 4 — Δx

Draws on P2.

**S4-A** (ties the subtraction to Thompson's addition)
> Attach Δ to x. Δx means the change in x, and you find it by subtracting:
> Δx = new − old. Thompson writes the same relation the other way round, causing
> x to become x + dx: the new value is the old value plus the change.

**S4-B** (plain)
> Now attach Δ to x. Δx is read "delta x" and means the change in x:
> Δx = new − old. Moving from 2 to 2.5 gives Δx = 0.5.

**S4-X1** choice: "What does Δx mean?" → **The change in x** / Δ multiplied by x
/ A new variable, separate from x.
**S4-X2** choice: "x is 2 and Δx is 0.5. What is the new value of x?" → **2.5** /
0.5 / 1.0. Tests Thompson's x + dx form directly.

---

## Section 5 — a change has direction

Draws on P3.

**S5-A** (quotes Thompson's own observation)
> Thompson notes that the bit may be in some cases positive, in others negative.
> Move the new value below 2 and the subtraction turns the other way. The sign
> records the direction of the move, not only its size.

**S5-B** (plain)
> Δx can also be negative. Move the new value below 2 and the subtraction turns
> the other way. The sign records the direction of the move, not only its size.

**S5-X1** set-control: "Move the new value so that Δx becomes negative."
**S5-X2** choice: "x moves from 3 to 2.5. What is Δx?" → **−0.5** / 0.5 / 5.5.
Distractors: reporting size without direction; adding instead of subtracting.

---

## Currently live in the app

Sections 1–5 are built with S1-B, S2-B, S3-B, S4-B, S5-B and exercises S1-X1,
S2-X1, S3-X1, S4-X1, S5-X1. Selections that differ from this list are changes to
make; selections that match are confirmations.

## Open, not for this pass

- Territory list for the public-domain claim.
- Whether BB6 keeps Thompson's d or introduces dx after Δx.
