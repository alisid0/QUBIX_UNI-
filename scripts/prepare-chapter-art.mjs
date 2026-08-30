// Bring the chapter 1 and 2 illustrations into the repository.
//
// Every prompt in the brief opened with the same style lock, so the image tool
// wrote the same fragment into all eight filenames and there is nothing in a
// name that says which drawing it is. They are mapped by generation timestamp
// instead, in the order they were reviewed one by one.
//
// Each source arrives as a tall frame with a lot of empty ground above and
// below the drawing, and several arrive inside a drawn border. That is fine in
// a gallery and wrong on a page.
//
// sharp's own trim() cannot do it: the frames are cream, then a drawn border,
// then more cream, and one trim only ever peels one layer, while antialiasing
// on the border defeats the threshold on the next pass. So the content box is
// measured here instead, after discarding an edge margin wide enough to throw
// the border away with it.
//
//   node scripts/prepare-chapter-art.mjs
//   node scripts/prepare-chapter-art.mjs --from public/chapt1

import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

const FROM = arg('from', 'public/chapt1');
const MAX_W = 1200, THUMB_W = 480;
const EDGE = 0.025;      // discarded before measuring, to drop any drawn border
const TOLERANCE = 20;    // how far from the ground a pixel must sit to count

const ART = [
  { stamp: '18_41_40', dir: 'ch01-02', id: 'ledger-grid',
    what: 'A paper register open on the counter, ruled into an empty grid' },
  { stamp: '18_41_56', dir: 'ch01-03', id: 'receipt-spike',
    what: 'A spike of blank receipts on the counter' },
  { stamp: '18_42_11', dir: 'ch01-03', id: 'one-purchase-two-forms',
    what: 'One receipt above two differently ruled forms' },
  { stamp: '18_42_26', dir: 'ch01-04', id: 'inventory-shelves',
    what: 'Three shelves and a clipboard, mid count' },
  { stamp: '18_42_47', dir: 'ch01-05', id: 'saturday-queue',
    what: 'Three checkout counters, all of them queued' },
  { stamp: '18_43_08', dir: 'ch01-05', id: 'brief-cards',
    what: 'A request pinned above four empty cards' },
  { stamp: '18_43_42', dir: 'ch02-02', id: 'two-shops',
    what: 'A small shop and a large one, each with its crate of returns' },
  { stamp: '18_43_55', dir: 'ch02-03', id: 'same-shelf-two-days',
    what: 'The same shelf drawn twice, full and then not' }
];

if (!existsSync(FROM)) {
  console.error(`\n  Source folder not found: ${FROM}`);
  process.exit(1);
}

const files = readdirSync(FROM).filter(f => /\.png$/i.test(f));

/** The box the drawing actually occupies, and the ground colour around it. */
const contentBox = async src => {
  const { data, info } = await sharp(src).removeAlpha().raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const inset = { x: Math.round(width * EDGE), y: Math.round(height * EDGE) };
  const at = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };

  // Ground is read just inside the discarded margin, so a drawn border never
  // becomes the reference colour.
  const ground = at(inset.x, inset.y);
  const differs = (x, y) => {
    const p = at(x, y);
    return Math.max(Math.abs(p[0] - ground[0]), Math.abs(p[1] - ground[1]),
      Math.abs(p[2] - ground[2])) > TOLERANCE;
  };

  let top = height, bottom = -1, left = width, right = -1;
  for (let y = inset.y; y < height - inset.y; y++) {
    for (let x = inset.x; x < width - inset.x; x++) {
      if (!differs(x, y)) continue;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  if (bottom < 0) return null;
  return {
    left, top, width: right - left + 1, height: bottom - top + 1,
    ground: { r: ground[0], g: ground[1], b: ground[2], alpha: 1 },
    source: { width, height }
  };
};

let done = 0, missing = 0;

for (const art of ART) {
  const hit = files.filter(f => f.includes(art.stamp));
  if (hit.length !== 1) {
    console.log(`   **MISSING**  ${art.dir}/${art.id}  (${hit.length} files match ${art.stamp})`);
    missing++;
    continue;
  }

  const src = join(FROM, hit[0]);
  const out = join('public/media', art.dir);
  mkdirSync(out, { recursive: true });

  const box = await contentBox(src);
  if (!box) {
    console.log(`   **BLANK**  ${art.dir}/${art.id} has no content above the ground`);
    missing++;
    continue;
  }

  const pad = Math.round(Math.max(box.width, box.height) * 0.05);
  const composed = sharp(src)
    .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: box.ground });

  const full = await composed.toBuffer();
  const width = Math.min(MAX_W, box.width + pad * 2);

  await sharp(full).resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 }).toFile(join(out, `${art.id}.webp`));
  await sharp(full).resize({ width: THUMB_W, withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(join(out, `${art.id}-thumb.webp`));

  const kept = Math.round((box.height / box.source.height) * 100);
  const final = await sharp(join(out, `${art.id}.webp`)).metadata();
  console.log(`   ${art.dir}/${art.id}.webp  ${final.width}×${final.height}`
    + `   (kept ${kept}% of the source height)`);
  done++;
}

console.log(`\n  ${done} prepared${missing ? `, ${missing} missing` : ''}`);
process.exit(missing ? 1 : 0);
