import { readFileSync } from 'node:fs';
import { getAllSolveFirst } from '../../src/lib/content/solveFirst.js';
import { getComputerWorkshopModules } from '../../src/lib/content/workshops.js';

const discoveries = getAllSolveFirst();
const host = readFileSync('src/views/WorkshopLab.svelte', 'utf8');
const computerModules = new Set(getComputerWorkshopModules().map((module) => module.id));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(
  new Set(discoveries.map((item) => item.id)).size === discoveries.length,
  'Solve First discovery IDs must be unique.'
);
assert(
  new Set(discoveries.map((item) => item.moduleId)).size === discoveries.length,
  'A workshop module may only have one paired Solve First journey.'
);

for (const item of discoveries) {
  for (const field of ['id', 'moduleId', 'track', 'kind', 'title', 'rewardLabel']) {
    assert(item[field], `${item.id || item.moduleId || 'Unknown discovery'} is missing ${field}.`);
  }
  if (item.track === 'computer') {
    assert(computerModules.has(item.moduleId), `${item.id} points to an unknown computer module.`);
  }
  if (item.kind !== 'logic-vault') {
    assert(
      host.includes(`solveFirst.kind === '${item.kind}'`),
      `${item.id} uses kind "${item.kind}", but WorkshopLab has no renderer for it.`
    );
  }
}

console.log(`Solve First registry checks passed for ${discoveries.length} discoveries.`);
