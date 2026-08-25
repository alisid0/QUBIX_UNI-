// Room art comes back with its "transparent" background painted in as a real
// checkerboard: two neutral greys, no alpha channel at all. On the dark
// workbench floor that reads as a white slab around every room.
//
// This cuts it out and writes the WebP the site actually ships.
//
//   node scripts/prepare-room-art.mjs
//
// Two things make it safe. The checkerboard is neutral — red, green and blue
// within a few points of each other — while every cream surface in these rooms
// (whiteboards, paper, screens, walls) is warm. And the background is connected
// to the border, while a whiteboard is not. Requiring both means the cut cannot
// reach inside the room.
//
// The tones are learned per image rather than fixed. A first version hardcoded a
// brightness threshold of 238 and quietly failed on two rooms whose checkerboard
// is darker: the boardroom's is 218, the customer desk's 226. It removed the
// light squares of the grid and left the dark ones, which looks worse than doing
// nothing, and no guard would have noticed.

import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';

process.chdir(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

const NEUTRAL = 10;    // how little colour a tone may have to count as background
const TOLERANCE = 12;  // how far a pixel may sit from a learned tone
const DAYLIGHT = [0xec, 0xe4, 0xd5];  // what walled-in background becomes

let totalCut = 0, rooms = 0;

for (const file of readdirSync('public/rooms').filter(f => f.endsWith('.png')).sort()) {
  const id = file.replace('.png', '');
  const { data, info } = await sharp(`public/rooms/${file}`)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = (x, y) => (y * W + x) * 4;

  // Learn this image's background tones from a band around its border.
  const tally = new Map();
  const note = (x, y) => {
    const i = px(x, y);
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.max(r, g, b) - Math.min(r, g, b) > NEUTRAL) return;  // warm, so content
    const key = `${r},${g},${b}`;
    tally.set(key, (tally.get(key) || 0) + 1);
  };
  for (let x = 0; x < W; x += 2) for (const y of [1, 3, 5, H - 2, H - 4]) note(x, y);
  for (let y = 0; y < H; y += 2) for (const x of [1, 3, 5, W - 2, W - 4]) note(x, y);

  const tones = [...tally.entries()]
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([k]) => k.split(',').map(Number));

  if (!tones.length) { console.log(`  ${id.padEnd(15)} no background found, left alone`); continue; }

  const isBg = i => {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.max(r, g, b) - Math.min(r, g, b) > NEUTRAL + 6) return false;
    return tones.some(([tr, tg, tb]) =>
      Math.abs(r - tr) <= TOLERANCE && Math.abs(g - tg) <= TOLERANCE && Math.abs(b - tb) <= TOLERANCE);
  };

  // Flood fill inward from every border pixel.
  const seen = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
  for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);

  let cut = 0;
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const n = y * W + x;
    if (seen[n]) continue;
    const i = px(x, y);
    if (!isBg(i)) continue;
    seen[n] = 1;
    data[i + 3] = 0;
    cut += 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  // The room's outline is anti-aliased into the checkerboard, and those blend
  // pixels read as a light halo on the dark floor. Erode inward from the cut
  // edge only: starting nowhere but the boundary, it cannot reach the interior.
  for (let pass = 0; pass < 2; pass++) {
    const edge = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = px(x, y);
        if (data[i + 3] === 0) continue;
        const touches =
          (x > 0 && data[px(x - 1, y) + 3] === 0) || (x < W - 1 && data[px(x + 1, y) + 3] === 0) ||
          (y > 0 && data[px(x, y - 1) + 3] === 0) || (y < H - 1 && data[px(x, y + 1) + 3] === 0);
        if (!touches) continue;
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        if (Math.min(r, g, b) >= 190 && Math.max(r, g, b) - Math.min(r, g, b) <= 18) edge.push(i);
      }
    }
    for (const i of edge) { data[i + 3] = 0; cut += 1; }
    if (!edge.length) break;
  }

  // Some checkerboard is walled in rather than outside — the gap under Goods In's
  // roller shutter. Cutting it would punch a hole through the room onto the floor
  // behind, so it becomes flat daylight instead of a grey grid.
  let flattened = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0 || !isBg(i)) continue;
    [data[i], data[i + 1], data[i + 2]] = DAYLIGHT;
    flattened += 1;
  }

  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toFile(`public/rooms/${id}.webp`);

  const kb = Math.round(statSync(`public/rooms/${id}.webp`).size / 1024);
  totalCut += cut; rooms += 1;
  console.log(`  ${id.padEnd(15)} tones ${String(tones.length).padStart(2)}   `
    + `${String(Math.round((cut / (W * H)) * 100)).padStart(3)}% cut   `
    + `${String(flattened).padStart(6)} px flattened   ${String(kb).padStart(4)} kB`);
}

console.log(`\n  ${(totalCut / 1e6).toFixed(1)}M pixels made transparent across ${rooms} rooms`);
