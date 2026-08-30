# The ch01.01 comic frames

Four drawn frames telling the chapter 1 story, plus the character sheet they
were drawn from. They illustrate *A sale is not its record*.

| File | Beat | Blank plate it leaves |
|---|---|---|
| `frame-1-aisle.webp` | Before any data exists | none |
| `frame-2-counter.webp` | The purchase is the event | none |
| `frame-3-scan.webp` | A value observed as it happens | the label panel on the bottle |
| `frame-4-till.webp` | The checkout keeps the record | the till screen, and the receipt face |
| `characters.webp` | Character reference, not a learner asset | not for display |

Each file also has a `-thumb.webp` at 480px wide.

## Why the frames are blank where they are

`docs/MEDIA-RULE.md` allows a raster image to carry real-world action and
narrative analogy. It does not allow generated text, quantities, labels or exact
technical geometry. So the barcode digits, `£3.40`, `2 × £3.40 = £6.80` and the
fields the checkout kept are **not drawn**: each frame leaves a deliberate blank
plate, and SVG puts the values on top at render time, computed from the same
lesson data the worked example prints.

That is also why a price change never means redrawing the art.

## Source art

The `.png` originals are gitignored, matching `public/rooms/` and
`public/props/`. Only the prepared `.webp` is tracked. To rebuild from source:

```bash
node scripts/prepare-comic-frames.mjs --from "path/to/folder-with-the-pngs"
```

The script matches source files on the prompt fragment the image tool leaves in
the filename, copies them to stable names, and writes the `.webp` and
`-thumb.webp` variants.

## Status

`AI_DRAFT`. The founder called the frames good on 2026-08-29. Under
`Humanize.md` that is not a curriculum approval, and none is recorded. Nothing
in the app renders these yet.
