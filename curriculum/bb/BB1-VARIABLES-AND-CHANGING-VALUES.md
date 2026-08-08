# BB1: Variables and Changing Values

Status: `AI_DRAFT`
Identifier: `CME-CHANGE-001`
Course: *Variables and Rates of Change*
Founder gate: awaiting reading and interaction testing

## One learning objective

The learner can explain that a variable is a symbol representing a number and that the value represented by the symbol may change.

This BB does not yet teach dependent variables, delta notation, rates of change or derivatives.

## Prerequisites

- `P-01`: perform basic arithmetic with small numbers;
- `P-04`: understand that a letter may represent a number.

The only prerequisite that must be actively recalled in BB1 is `P-04`. If a learner cannot interpret `x = 2`, open a short prerequisite repair before continuing.

## Source record

### Primary passage

- Author: G. A. Wentworth (1835–1906)
- Title: *The First Steps in Algebra*
- Edition: Ginn & Company, 1904; copyright notice dated 1894
- Location: Chapter I, section 6, “Number-Symbols in Algebra,” printed page 2; Project Gutenberg PDF page 10
- Stable record: https://www.gutenberg.org/ebooks/36670
- Direct scan-derived PDF: https://www.gutenberg.org/files/36670/36670-pdf.pdf

Selected source statement:

> “Letters are used as general symbols of numbers to which any particular values may be assigned.”

### Provenance and legal note

Project Gutenberg identifies ebook 36670 as public domain in the United States. Wentworth died in 1906, so the underlying authored text is outside the ordinary UK life-plus-70 term. The selected edition was published in 1904; no modern translation, commercial reprint, cover or third-party annotation is used.

Before release, record the final launch territories and recheck the exact assets used in the app. This entry is a curriculum provenance record, not legal advice.

## Concept retained and modernisation

Retained from Wentworth: algebra uses letters to represent numbers, and particular values can be assigned to those letters.

Modernised presentation:

- use “variable” explicitly because it is standard present-day terminology;
- distinguish the symbol `x` from the value currently assigned to it;
- demonstrate changing values through a responsive square rather than through definition memorisation;
- do not imply that the physical letter itself changes.

## Learner sequence

### Step 1 — Symbol and value

`x = 2` means that the variable `x` currently represents the number 2. If its value becomes 3, the symbol is still `x`.

### Step 2 — Definition

A variable is a symbol that represents a number. In this lesson, `x` can take different values.

### Step 3 — Concrete model

Here `x` represents the side length of a square. Use the slider to change the value of `x`; the displayed side length and square change together.

## Interaction specification

- Control: one labelled range input for `x`, from 1.5 cm to 3.5 cm in steps of 0.1 cm.
- Visible output: the numerical value of `x` and the square's side length update together.
- Mathematical purpose: connect one stable symbol with several possible numerical values.
- Accessibility: the control has a descriptive label, keyboard support and a visible numerical readout.
- Scope boundary: do not display area yet; dependence between `x` and `x²` belongs to BB3.

## Misconceptions to test

1. The symbol changes when its assigned value changes.
2. The numbers 2 and 3 are variables.
3. A variable must always have an unknown value.
4. Changing a slider is sufficient evidence of understanding without a verbal or selected explanation.

## Comprehension check

Prompt: `x` has value 2 and then value 3. What changed?

- Correct: The value of `x`.
- Incorrect: The variable changed from `x` to another symbol.
- Incorrect: The number 2 became a variable.

Feedback should restate that `x` remains the variable while its assigned value changes.

## Founder review

- [ ] The learning objective is correct and sufficiently small.
- [ ] Prerequisites `P-01` and `P-04` are sufficient.
- [ ] The Wentworth passage and edition record are acceptable.
- [ ] The learner text is clear and mathematically accurate.
- [ ] The slider exposes the intended relationship on phone and desktop.
- [ ] The comprehension check identifies the main misconception.
- [ ] Amendments have been recorded.
- [ ] Founder marks the BB `APPROVED`.

Until the final box is explicitly completed by the founder, BB1 remains `AI_DRAFT` and BB2 remains locked.
