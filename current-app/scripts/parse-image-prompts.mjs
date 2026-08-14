/**
 * Parses content-drafts/IMAGE-PROMPTS.md into a structured queue.
 * Output: array of { bb, floor, floorLabel, frames: string[] }
 *
 * Usage: node scripts/parse-image-prompts.mjs [--gateway UNIT] [--bb 1000] [--limit 5]
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SRC  = join(__dir, '../content-drafts/IMAGE-PROMPTS.md');

const STYLE = 'Pixel art, dark navy blue background, 16-bit retro game style, no text. ';

export function parsePrompts({ gateway = null, bbFilter = null } = {}) {
  const raw  = readFileSync(SRC, 'utf8');
  const lines = raw.split('\n');

  const queue = [];
  let currentGateway = null;
  let currentBB      = null;
  let currentFloor   = null;
  let frames         = [];

  function flushFloor() {
    if (currentBB && currentFloor !== null && frames.length > 0) {
      queue.push({ ...currentBB, ...currentFloor, frames: [...frames] });
    }
    frames = [];
  }

  for (const line of lines) {
    // Gateway heading
    const gwMatch = line.match(/^## (THE \w+)/);
    if (gwMatch) {
      flushFloor();
      currentGateway = gwMatch[1];
      currentBB      = null;
      currentFloor   = null;
      continue;
    }

    // BB heading  e.g.  ### BB 1000 — Why we need standard units
    const bbMatch = line.match(/^### BB (\d+) — (.+)/);
    if (bbMatch) {
      flushFloor();
      currentBB    = { gateway: currentGateway, bb: parseInt(bbMatch[1]), bbTitle: bbMatch[2] };
      currentFloor = null;
      continue;
    }

    // Floor heading  e.g.  **Floor 0** — the elephant problem
    const flMatch = line.match(/^\*\*Floor (\d+)\*\* — (.+)/);
    if (flMatch) {
      flushFloor();
      currentFloor = { floor: parseInt(flMatch[1]), floorLabel: flMatch[2] };
      continue;
    }

    // SKIP marker
    if (line.includes('**SKIP**')) {
      flushFloor();
      currentFloor = null;
      continue;
    }

    // Frame line  e.g.  → Frame 1: A stone watchtower...
    const fMatch = line.match(/^→ Frame \d+: (.+)/);
    if (fMatch && currentFloor) {
      frames.push(STYLE + fMatch[1]);
    }
  }
  flushFloor();

  // Filter
  let result = queue;
  if (gateway)  result = result.filter(r => r.gateway === gateway);
  if (bbFilter) result = result.filter(r => r.bb === bbFilter);
  return result;
}

// CLI usage
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args   = process.argv.slice(2);
  const gwIdx  = args.indexOf('--gateway');
  const bbIdx  = args.indexOf('--bb');
  const limIdx = args.indexOf('--limit');

  const gateway  = gwIdx  >= 0 ? `THE ${args[gwIdx + 1].toUpperCase()}`  : null;
  const bbFilter = bbIdx  >= 0 ? parseInt(args[bbIdx + 1])               : null;
  const limit    = limIdx >= 0 ? parseInt(args[limIdx + 1])               : null;

  let result = parsePrompts({ gateway, bbFilter });
  if (limit) result = result.slice(0, limit);

  console.log(JSON.stringify(result, null, 2));
  console.error(`\n${result.length} floor(s) found, ${result.reduce((a,r)=>a+r.frames.length,0)} total frames`);
}
