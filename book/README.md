# The reference e-books

Book 1 arrived as a PDF with no origin in this repo. That is the problem this
directory fixes.

A PDF cannot be diffed, cannot be reviewed a paragraph at a time, and drifts
from the boards the moment either side is edited — the same fault as
`current-app/` against the root, one level up. The books are now authored here
as source and rendered on demand.

```bash
pnpm run build:book     # -> book/dist/book1-functions.html
pnpm run check:book     # recomputes every number the book asserts
```

Open the HTML and print to PDF from the browser. `book/dist/` is gitignored:
the source is the record, and the rendered book is never committed, because a
committed artefact is how the drift started.

## Layout

```
book/book1-functions/
  index.js              meta + the chapter order
  ch01-reliable-rule.js one file per chapter
  ...
```

A chapter exports `{ id, title, standfirst, blocks, practice, misconception,
review }`. Blocks are data, not HTML — `p`, `h`, `formula`, `list`, `table`,
`callout`, `example`, `figure`, `figures`.

## Two rules that are enforced, not merely intended

**Figures are computed, never drawn.** A `figure` block names a kind and the
numbers; `scripts/build-book.mjs` generates the SVG. A curve is sampled from
the formula printed beside it, so a figure cannot disagree with its own
caption. This is the project media rule: technical visuals are deterministic,
never raster.

**The book counts its own gaps.** The completion table at the back is
generated at build time from these files. A chapter passes when it carries at
least 4 worked examples, each with a `turn` (the parallel exercise the reader
does immediately, answer folded away); at least 4 figures; at least 12 practice
items with an answer for every one; a named misconception; and a link back to
earlier work. The bar lives in `GATE` in `scripts/build-book.mjs`. An
unfinished chapter says so inside the book rather than in a note someone has to
remember to read. Do not hand-write that table.

The first version of this gate asked for one worked example and six practice
items. Every chapter cleared it and the book was still a reference card at 2.2
examples and 1.8 figures a chapter. A gate everything passes measures nothing;
if the numbers rise again, raise `GATE` with them.

Two more invariants the build enforces, both added after a silent bug got
through: every figure option is checked against what the figure function
actually destructures (a `kind` that a lab frame overwrote, and a `caption`
that fought the real one, both drew plausible pictures that contradicted their
captions); and every "chapter N" reference must name a chapter that exists,
because inserting a chapter shifts every reference after it and a stale one
still reads as a sentence.

`check:book` recomputes the arithmetic the prose asserts: difference tables,
rectangle sums, average rates, difference quotients, composites, inverses,
excluded domain points. Prose can claim anything; this fails loudly when a
claim is wrong. Run it after editing any number.

## Where the book meets the app

The Data Science pathway is ebook-first. One modular topic ebook is authored and
reviewed before its interactive adaptation. The first title lives at
`book/preintern-001-what-data-is/` and generates
`book/dist/preintern-001-what-data-is.html`. Modular titles may later be
collected into phase volumes without duplicating their source.

Draft 1 proposed that each app board map to one subsection. That mapping does
not hold yet, and the shortfall is on the app side: of the 13 chapters, six
have no Factory board at all and five more have a board with nothing selected.
The book is currently ahead of the app in coverage. Nothing here should be
treated as evidence that a board exists.
