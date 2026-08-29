// Every learner-facing screen must read as the same product.
//
// It stopped doing that gradually and invisibly. Each new mission was written by
// copying the last and adjusting, and adjusting drifted: four different dark
// backgrounds (#171510, #151515, #10191a, #0f1216) and five different accent
// hues across screens a learner walks between in one sitting. Nothing caught it,
// because each file on its own looked deliberate.
//
// This checks hue families rather than exact values. Listing every permitted
// shade produced eleven hundred findings, which is a guard nobody acts on, and
// most of them were legitimate tints of the right colour. What actually breaks
// uniformity is a screen introducing a hue the brand does not contain: a blue
// mission next to a purple one next to a terracotta one.
//
// Qubix is terracotta on warm paper or warm near-black. Green means correct and
// red means wrong, and those two are the only other hues allowed anywhere.
//
//   npm run check:palette

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const VIEWS = dir('../src/views/');

// Authoring surfaces, never shipped to a learner.
const WORKBENCH_ONLY = new Set([
  'FactoryMode', 'StrataMigrationFactory', 'PartsSheet', 'ExerciseFactory', 'ReviewMode',
  'AssetShowcase', 'ProductAssetShowcase', 'WorldAssetShowcase', 'DataQualityAssetShowcase',
  'RelationalAssetShowcase', 'MissionOperationsStudio', 'ChangeLab', 'Home'
]);

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

function hsl(hex) {
  const h = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  if (!d) return { hue: 0, sat: 0, light: l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let hue = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  hue = Math.round(hue * 60);
  return { hue: hue < 0 ? hue + 360 : hue, sat: s, light: l };
}

// A hue only counts as a brand decision once it is saturated enough to read as a
// colour. Below that it is a warm or cool neutral, and neutrals are structure.
const NEUTRAL = 0.16;

const FAMILIES = [
  { name: 'terracotta', from: 8, to: 45 },     // the brand
  { name: 'success', from: 70, to: 165 },      // correct
  { name: 'danger', from: 345, to: 8 },        // wrong
  { name: 'warning', from: 45, to: 70 }        // caution, used sparingly
];
const familyOf = ({ hue }) => FAMILIES.find(f =>
  (f.from <= f.to ? hue >= f.from && hue <= f.to : hue >= f.from || hue <= f.to))?.name;

const files = readdirSync(VIEWS).filter(f => f.endsWith('.svelte'));
let learner = 0, examined = 0;

for (const file of files) {
  const name = file.replace('.svelte', '');
  if (WORKBENCH_ONLY.has(name)) continue;
  learner += 1;

  const src = readFileSync(join(VIEWS, file), 'utf8');
  const style = (src.match(/<style>[\s\S]*<\/style>/) || [''])[0];
  const hexes = [...new Set([...style.matchAll(/#([0-9a-fA-F]{3,6})\b/g)].map(m => m[1].toLowerCase()))];

  const stray = [];
  for (const hex of hexes) {
    if (![3, 6].includes(hex.length)) continue;
    examined += 1;
    const c = hsl(hex);
    if (c.sat < NEUTRAL) continue;                 // a neutral, warm or cool
    if (!familyOf(c)) stray.push(`#${hex} (hue ${c.hue})`);
  }

  ok(`${name} stays in the Qubix hues`, stray.length === 0,
    stray.length ? stray.join(', ') : `${hexes.length} colours, all on family`);
}

console.log(`\n${bad ? `${bad} view(s) carry a hue the brand does not have` : 'all checks pass'}`
  + `, ${examined} colours examined across ${learner} learner-facing views`);
process.exit(bad ? 1 : 0);
