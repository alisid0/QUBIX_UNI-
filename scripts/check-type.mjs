// Nothing a learner reads may be set below 11px.
//
// A sweep of every route found ninety-two carrying text under 11px, including
// an 8.5px label on every mission masthead and 7.5px licence badges. It happens
// the same way every time: a new panel copies a nearby rule, the rule was
// already small, and the copy is smaller.
//
// A rendered check would need a running server. This reads the source, so it
// runs in the build like everything else.
//
//   npm run check:type
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const root = dir('../');

// Authoring surfaces a learner never opens.
const SKIP = new Set([
  'FactoryMode.svelte', 'StrataMigrationFactory.svelte', 'PartsSheet.svelte',
  'ExerciseFactory.svelte', 'ReviewMode.svelte', 'AssetShowcase.svelte',
  'ProductAssetShowcase.svelte', 'WorldAssetShowcase.svelte',
  'DataQualityAssetShowcase.svelte', 'RelationalAssetShowcase.svelte',
  'MissionOperationsStudio.svelte', 'ChangeLab.svelte'
]);

const FLOOR = 11;
let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const targets = [];
for (const d of ['src/views', 'src/lib/components', 'src/lib/components/game']) {
  try {
    for (const f of readdirSync(join(root, d)))
      if (f.endsWith('.svelte') && !SKIP.has(f)) targets.push(join(d, f));
  } catch { /* directory may not exist */ }
}
targets.push('src/lib/styles/mission-system.css');

let checked = 0, files = 0;
for (const rel of targets) {
  let src;
  try { src = readFileSync(join(root, rel), 'utf8'); } catch { continue; }
  files += 1;

  const small = [];
  for (const m of src.matchAll(/font(?:-size)?\s*:\s*[^;{}]*?(\d+(?:\.\d+)?)px/g)) {
    checked += 1;
    const px = parseFloat(m[1]);
    if (px < FLOOR) small.push(`${px}px`);
  }
  if (small.length) ok(`${rel.split(/[\/]/).pop()} keeps text readable`, false,
    `${small.length} declaration(s) under ${FLOOR}px: ${[...new Set(small)].join(', ')}`);
}

ok(`every learner-facing file sets text at ${FLOOR}px or above`, bad === 0,
  `${checked} font declarations across ${files} files`);

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${checked} font sizes checked`);
process.exit(bad ? 1 : 0);
