// Bring the ch01.01 comic frames into the repository and prepare them for the web.
//
// The four frames are drawn art: real-world action and narrative analogy, which
// is what docs/MEDIA-RULE.md permits a raster image to carry. Every value that
// appears on top of them (the barcode digits, the price, the line total, the
// fields the checkout kept) is drawn in SVG at render time, which is why each
// frame deliberately leaves a blank plate: the label panel on the bottle, the
// till screen, the receipt face.
//
// Source files come out of an image tool with generated names and timestamps.
// This maps them to stable names once, so nothing downstream depends on a
// filename nobody chose.
//
//   node scripts/prepare-comic-frames.mjs
//   node scripts/prepare-comic-frames.mjs --from "C:/Users/ali10/Downloads"

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import sharp from 'sharp';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

const FROM = arg('from', 'C:/Users/ali10/Downloads');
const OUT = 'public/media/ch01-01';

// Matched on the fragment of the prompt the tool keeps in the filename, because
// that is the only thing in the name that identifies which frame it is.
const FRAMES = [
  { id: 'frame-1-aisle', match: 'DONE, and now a', what: 'The aisle, before any data exists' },
  { id: 'frame-2-counter', match: 'SCENE_ A superm', what: 'The counter: the purchase is the event' },
  { id: 'frame-3-scan', match: 'SCENE_ A close', what: 'The scan: a value observed as it happens' },
  { id: 'frame-4-till', match: 'SCENE_ The same', what: 'The checkout keeps the record' },
  { id: 'characters', match: 'Create clean re', what: 'Character reference, not a learner asset' }
];

if (!existsSync(FROM)) {
  console.error(`\n  Source folder not found: ${FROM}`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const files = readdirSync(FROM).filter(f => /\.png$/i.test(f));
let done = 0;
let missing = 0;

for (const frame of FRAMES) {
  const hit = files.filter(f => f.includes(frame.match))
    .sort((a, b) => statSync(`${FROM}/${b}`).mtimeMs - statSync(`${FROM}/${a}`).mtimeMs)[0];

  if (!hit) {
    console.log(`   MISSING  ${frame.id.padEnd(16)} nothing matching "${frame.match}"`);
    missing += 1;
    continue;
  }

  copyFileSync(`${FROM}/${hit}`, `${OUT}/${frame.id}.png`);

  const image = sharp(`${OUT}/${frame.id}.png`);
  const meta = await image.metadata();

  await image.clone().webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toFile(`${OUT}/${frame.id}.webp`);
  await image.clone().resize({ width: 480 })
    .webp({ quality: 88, effort: 6, alphaQuality: 100 })
    .toFile(`${OUT}/${frame.id}-thumb.webp`);

  const png = Math.round(statSync(`${OUT}/${frame.id}.png`).size / 1024);
  const webp = Math.round(statSync(`${OUT}/${frame.id}.webp`).size / 1024);
  const thumb = Math.round(statSync(`${OUT}/${frame.id}-thumb.webp`).size / 1024);

  console.log(`   ok  ${frame.id.padEnd(16)} ${meta.width}x${meta.height}  png ${png}kB  webp ${webp}kB  thumb ${thumb}kB`);
  done += 1;
}

console.log(`\n  ${done} prepared into ${OUT}${missing ? `, ${missing} missing` : ''}`);
process.exit(missing ? 1 : 0);
