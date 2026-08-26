// Every branch and product a mission names must exist in the Superstore.
//
// The fiction was consistent in spirit and fragmented in fact. Six missions
// hardcoded their own tables, and with nowhere to look a branch up, the same
// branch was written three ways: B-17, "Branch 17" and BR-017. Riverside was
// quoted in a complaint rate with no id at all, and BR-004 existed once.
//
// None of that is visible from inside one file, which is why it survived.
//
// Missions are allowed to contradict the world on purpose. Keys and Duplicate
// Records is about a SKU arriving twice with conflicting attributes; that is the
// lesson. Such a file says so in a comment containing "contradicts the world"
// and is skipped.
//
//   npm run check:world
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { BRANCHES, PRODUCTS, branch, product } from '../src/lib/game/superstore.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const GAME = dir('../src/lib/game/');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const knownBranch = new Set(BRANCHES.map(b => b.id));
const knownSku = new Set(PRODUCTS.map(p => p.sku));
const nameToId = new Map(BRANCHES.map(b => [b.name, b.id]));

let files = 0, refs = 0;
for (const file of readdirSync(GAME).filter(f => f.endsWith('-mission.js'))) {
  const src = readFileSync(join(GAME, file), 'utf8');
  if (/contradicts the world/i.test(src)) {
    console.log(`   SKIP  ${file.replace('-mission.js', '').padEnd(22)} declares a deliberate contradiction`);
    continue;
  }
  files += 1;
  const name = file.replace('-mission.js', '');

  // Branch identifiers, in any spelling anyone has used.
  const ids = [...new Set([...src.matchAll(/\bBR?-(\d{2,3})\b/g)].map(m => m[0]))];
  const strays = ids.filter(id => !knownBranch.has(id));
  refs += ids.length;
  ok(`${name.padEnd(22)} names branches that exist`, strays.length === 0,
    strays.length ? `unknown: ${strays.join(', ')}` : (ids.join(' ') || 'none'));

  // The long spelling, which cannot be joined to anything.
  const longForm = [...new Set([...src.matchAll(/\bBranch (\d{2})\b/g)].map(m => m[0]))];
  ok(`${name.padEnd(22)} writes a branch id, not prose`, longForm.length === 0,
    longForm.length ? `${longForm.join(', ')} — use B-nn so it can be looked up` : '');

  // Product codes.
  const skus = [...new Set([...src.matchAll(/\bQX-[A-Z]{3}-\d{3}\b/g)].map(m => m[0]))];
  const badSkus = skus.filter(s => !knownSku.has(s));
  refs += skus.length;
  ok(`${name.padEnd(22)} names products that exist`, badSkus.length === 0,
    badSkus.length ? `unknown: ${badSkus.join(', ')}` : (skus.length ? `${skus.length} SKUs` : 'none'));

  // A branch name in the prose should be a real branch.
  for (const [bName] of nameToId) {
    if (!src.includes(bName)) continue;
    const b = branch(nameToId.get(bName));
    ok(`${name.padEnd(22)} uses ${bName} as itself`, Boolean(b), b ? `${b.id}` : '');
  }
}

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}`
  + `, ${refs} world references across ${files} missions`
  + `, ${BRANCHES.length} branches and ${PRODUCTS.length} products defined`);
process.exit(bad ? 1 : 0);
