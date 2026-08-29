// Nothing a learner reads should be under 11px.
//
// The home page was retuned by hand and the rest of the site was not, so a sweep
// of every route found ninety-two carrying text below 11px: an 8.5px "WORK
// LOCATION" on every mission masthead, 10px case counters, eighty-two separate
// instances on the play hub, and 7.5px licence badges on three missions.
//
// This only raises what is already too small. Nothing at 11px or above moves, so
// it cannot rescale a layout that was working. It reads the number rather than
// matching a list of known sizes: a first version enumerated 8 through 10.5 and
// silently missed the 7.5px badges.
//
//   node scripts/floor-type.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

process.chdir(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

// Authoring surfaces a learner never opens. Their density is deliberate.
const SKIP = new Set([
  'FactoryMode.svelte', 'StrataMigrationFactory.svelte', 'PartsSheet.svelte',
  'ExerciseFactory.svelte', 'ReviewMode.svelte', 'AssetShowcase.svelte',
  'ProductAssetShowcase.svelte', 'WorldAssetShowcase.svelte',
  'DataQualityAssetShowcase.svelte', 'RelationalAssetShowcase.svelte',
  'MissionOperationsStudio.svelte', 'ChangeLab.svelte'
]);

const lift = px => (px >= 11 ? px : px >= 10 ? 11.5 : 11);

const dirs = ['src/views', 'src/lib/components', 'src/lib/components/game'];
const files = dirs.flatMap(d => {
  try { return readdirSync(d).filter(f => f.endsWith('.svelte') && !SKIP.has(f)).map(f => join(d, f)); }
  catch { return []; }
}).concat(['src/lib/styles/mission-system.css']);

let changed = 0, lifted = 0;
for (const path of files) {
  let s;
  try { s = readFileSync(path, 'utf8'); } catch { continue; }
  const before = s;
  // Only inside a font shorthand or font-size, so padding, gaps and
  // letter-spacing are never touched.
  s = s.replace(/(font(?:-size)?\s*:\s*[^;{}]*?)(\d+(?:\.\d+)?)px/g, (whole, head, num) => {
    const px = parseFloat(num);
    if (px >= 11) return whole;
    lifted += 1;
    return head + lift(px) + 'px';
  });
  if (s !== before) { writeFileSync(path, s); changed += 1; }
}
console.log(`  lifted ${lifted} declarations across ${changed} learner-facing files`);
