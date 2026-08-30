# The chapter illustrations

Drawn art for volume 0, in one line style. Each folder is named for the session
the drawings belong to.

| Folder | Drawing | What it carries |
|---|---|---|
| `ch01-01/` | four comic frames | the purchase, and the record made of it |
| `ch01-02/` | `ledger-grid` | a paper register ruled into an empty grid |
| `ch01-03/` | `receipt-spike` | a morning of blank receipts on a spike |
| `ch01-03/` | `one-purchase-two-forms` | one receipt above two differently ruled forms |
| `ch01-04/` | `inventory-shelves` | a bare shelf, a full one, and a count half done |
| `ch01-05/` | `saturday-queue` | three counters, all of them queued |
| `ch01-05/` | `brief-cards` | a request above four empty cards |
| `ch02-02/` | `two-shops` | a small shop and a large one, each with its crate |
| `ch02-03/` | `same-shelf-two-days` | the same shelf, full and then not |

Every file has a `-thumb.webp` at 480px wide.

## Why every writing surface is empty

`docs/MEDIA-RULE.md` lets a raster image carry real-world action and narrative
analogy. It does not let one carry generated text, quantities, labels or exact
technical geometry, and no image tool can draw digits reliably in any case: ask
one for a stock sheet reading `0`, `NULL` and `12` and it returns invented
glyphs and a row nobody asked for.

So the drawings hold the object and refuse the writing. The register grid, the
receipt faces, the clipboard form, the shelf-edge labels, the till screens, the
overhead signs, the four brief cards and both date cards are all deliberately
blank.

**The values are not on these images yet.** They are drawn in SVG over the top,
from the same lesson data the worked example prints, and that overlay is still
to be built for the six plates. Until it is, each drawing stands as an
illustration beside its section. A price or a count changing never means
redrawing the art.

## Source art

The `.png` originals live in `art-source/`, which is gitignored, matching
`public/rooms/` and `public/props/`. Only the prepared `.webp` is tracked.

```bash
node scripts/prepare-chapter-art.mjs --from art-source/chapt1
```

The tool wrote the same prompt fragment into all eight filenames, so nothing in
a name says which drawing it is. They are mapped by generation timestamp, in the
order they were reviewed. The script measures each drawing's own content box and
crops to it, because several arrived inside a drawn border with up to 85% of the
frame empty.

## Status

`AI_DRAFT` as art. The chapter 1 and 2 sessions these sit in were approved as
text on 2026-08-30 and recorded in `curriculum/APPROVED-CHAPTER-ONE.json`; that
approval covers wording, not these drawings, and no art approval is recorded.

Two known defects, both cosmetic and both worth a regeneration:
`ch01-04/inventory-shelves` has smiling faces on the loaves and
`ch02-03/same-shelf-two-days` has them on the bottles, because the instruction
giving people minimal dot-and-curve faces was applied to the groceries too.
