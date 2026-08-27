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
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { BRANCHES, PRODUCTS, branch, product } from '../src/lib/game/superstore.js';
import { EMPLOYEES, ROLES, LOCATIONS, role, location, currentStaff, fte }
  from '../src/lib/game/superstore-people.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const GAME = dir('../src/lib/game/');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

// The six hand-named branches, plus any branch actually in the sample database.
//
// BRANCHES names six of forty-eight. The rest are generated and no less real: a
// learner can query them in the data console. A mission naming one is not
// inventing a branch, which is what this guard exists to catch, so the database
// is admitted as evidence alongside the hand-authored world.
//
// Adding such a branch to BRANCHES instead would be the wrong fix. The generator
// seeds its estate from BRANCHES, so a seventh entry shifts every downstream
// figure in the dataset, including the ones the mission quotes.
const knownBranch = new Set(BRANCHES.map(b => b.id));
const knownSku = new Set(PRODUCTS.map(p => p.sku));

// The same argument applies to products. PRODUCTS names nine of 2,140, and a
// mission quoting a real basket will name the generated ones that were in it.
const fromDatabase = await (async () => {
  const dbPath = dir('../public/data/qubix-sample.db');
  if (!existsSync(dbPath)) return { branches: 0, skus: 0 };
  try {
    const initSqlJs = (await import('sql.js')).default;
    const SQL = await initSqlJs();
    const db = new SQL.Database(readFileSync(dbPath));
    const branches = db.exec('SELECT branch_id FROM branch')[0]?.values ?? [];
    const skus = db.exec('SELECT sku FROM product')[0]?.values ?? [];
    for (const [id] of branches) knownBranch.add(id);
    for (const [sku] of skus) knownSku.add(sku);
    db.close();
    return { branches: branches.length, skus: skus.length };
  } catch { return { branches: 0, skus: 0 }; }
})();
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


// ── the people ──────────────────────────────────────────────────────────────
// HR data has its own ways of being wrong, and they are the ones the missions
// teach: a location that joins to nothing, two colleagues sharing an id, a
// leaving date before a start date, an extract larger than the branch it says
// it came from.
console.log('');
const seenId = new Set(), seenNumber = new Set();
for (const e of EMPLOYEES) {
  ok(`${e.id} works somewhere that exists`, Boolean(location(e.location)), e.location);
  ok(`${e.id} holds a role that exists`, Boolean(role(e.role)), e.role);
  ok(`${e.id} has an id nobody else has`, !seenId.has(e.id));
  ok(`${e.id} has a payroll number nobody else has`, !seenNumber.has(e.number), e.number);
  seenId.add(e.id); seenNumber.add(e.number);
  if (e.left) ok(`${e.id} did not leave before starting`, e.left > e.started, `${e.started} to ${e.left}`);
}

for (const b of BRANCHES) {
  const here = currentStaff().filter(e => e.location === b.id).length;
  ok(`the ${b.name} extract fits inside its headcount`, here <= b.staff, `${here} of ${b.staff}`);
}

// Missions already name these two. Removing them would break Table Grain and
// Keys and Duplicate Records without either file mentioning this one.
for (const id of ['E-204', 'E-311'])
  ok(`${id} still exists, because a mission uses it`, EMPLOYEES.some(e => e.id === id));

// The point of carrying hours at all: heads and FTE must be able to disagree.
const heads = currentStaff().length;
const fteAll = Math.round(currentStaff().reduce((n, e) => n + fte(e), 0) * 10) / 10;
ok('headcount and FTE are different numbers', heads !== fteAll, `${heads} heads, ${fteAll} FTE`);

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}`
  + `, ${refs} world references across ${files} missions`
  + `, ${BRANCHES.length} branches, ${PRODUCTS.length} products, ${EMPLOYEES.length} people, ${ROLES.length} roles`);
process.exit(bad ? 1 : 0);
