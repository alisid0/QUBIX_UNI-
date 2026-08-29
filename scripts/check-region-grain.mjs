// The Region That Wasn't quotes the database. Keep it true.
//
// Every other mission carries a table somebody wrote, so it is true by
// construction. This one asserts things about the generated Superstore: that
// Northmarch takes 666 sales one way and 2,352 the other, that Elmsworth moves
// 1,686 of them, and that both reports still total 15,315.
//
// If the sample is ever rebuilt differently, those numbers change and the
// mission starts teaching from figures that are no longer in the data a learner
// can query two clicks away. That is worse than an ordinary stale number,
// because the console is right there to contradict it.
//
//   node scripts/check-region-grain.mjs

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import initSqlJs from 'sql.js';
import { REGION_FIGURES, REGION_GRAIN_MISSION, totalsAgree } from '../src/lib/game/region-grain-mission.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DB = dir('../public/data/qubix-sample.db');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

if (!existsSync(DB)) {
  console.log('   no database yet, building it\n');
  execFileSync(process.execPath, [dir('./build-sample-db.mjs')], { stdio: 'ignore' });
}

const SQL = await initSqlJs();
const db = new SQL.Database(readFileSync(DB));
const rows = sql => db.exec(sql)[0]?.values ?? [];
const one = sql => rows(sql)[0]?.[0];

/* ── the premise ─────────────────────────────────────────────────────────── */
check(totalsAgree(), 'both reports account for every sale, so the totals reconcile',
  `${REGION_FIGURES.totalSales.toLocaleString()} each way`);

const actualTotal = one('SELECT COUNT(*) FROM sale');
check(actualTotal === REGION_FIGURES.totalSales,
  'and that total is the one in the database',
  `${actualTotal.toLocaleString()} in the data`);

/* ── the two paths ───────────────────────────────────────────────────────── */
const fromDb = sql => new Map(rows(sql));
const management = fromDb(`SELECT d.region_id, COUNT(*) FROM sale s
  JOIN branch b USING (branch_id) JOIN district d USING (district_id) GROUP BY 1`);
const geographic = fromDb(`SELECT c.region_id, COUNT(*) FROM sale s
  JOIN branch b USING (branch_id) JOIN county c USING (county_id) GROUP BY 1`);

for (const row of REGION_FIGURES.management)
  check(management.get(row.region) === row.sales,
    `${row.name} down the management path`,
    `${management.get(row.region)} in the data, ${row.sales} in the mission`);

for (const row of REGION_FIGURES.geographic)
  check(geographic.get(row.region) === row.sales,
    `${row.name} down the geographic path`,
    `${geographic.get(row.region)} in the data, ${row.sales} in the mission`);

/* ── the disagreement has to exist, and has to be a minority ─────────────── */
const differing = [...management.keys()].filter(r => management.get(r) !== geographic.get(r));
check(differing.length > 0, 'the two paths really do disagree somewhere',
  differing.length ? differing.join(', ') : 'they agree everywhere, so the mission has no subject');

const drift = rows(`SELECT b.branch_id, b.name, d.region_id, c.region_id,
    (SELECT COUNT(*) FROM sale WHERE branch_id = b.branch_id)
  FROM branch b JOIN district d USING (district_id) JOIN county c USING (county_id)
  WHERE d.region_id <> c.region_id ORDER BY 5 DESC`);
const branchCount = one('SELECT COUNT(*) FROM branch');
check(drift.length > 0 && drift.length < branchCount / 3,
  'and a minority of branches cause it, so it is a trap rather than a broken join',
  `${drift.length} of ${branchCount} branches`);

/* ── the named culprits ──────────────────────────────────────────────────── */
for (const culprit of REGION_FIGURES.culprits) {
  const found = drift.find(row => row[0] === culprit.branch);
  check(Boolean(found), `${culprit.name} (${culprit.branch}) still drifts`);
  if (!found) continue;
  check(found[2] === culprit.district && found[3] === culprit.county,
    `and still reports to ${culprit.district} while standing in ${culprit.county}`);
  check(found[4] === culprit.sales, `and still took ${culprit.sales.toLocaleString()} sales`,
    `${found[4]} in the data`);
}

/* ── the deltas the mission asks a learner to notice must pair off ───────── */
const deltas = [...management.keys()].map(r => (geographic.get(r) ?? 0) - management.get(r));
check(deltas.reduce((n, d) => n + d, 0) === 0,
  'the gains and losses cancel, which is the clue the mission turns on');

/* ── the queries in the mission must be the ones that produce this ───────── */
for (const [name, sql] of Object.entries(REGION_GRAIN_MISSION.queries)) {
  let ok = true;
  try { db.exec(sql); } catch { ok = false; }
  check(ok, `the ${name} query the mission shows actually runs`);
}

/* ── and the mission must still be a mission ─────────────────────────────── */
check(REGION_GRAIN_MISSION.cases.length >= 4, 'the mission has its cases',
  `${REGION_GRAIN_MISSION.cases.length} cases`);
const positions = REGION_GRAIN_MISSION.cases.map(c => c.options.indexOf(c.answer));
check(positions.every(p => p >= 0), 'every answer is one of its own options');
check(new Set(positions).size > 1,
  'the answer is not in the same position every time',
  `positions ${positions.join(', ')}`);
check(REGION_GRAIN_MISSION.cases.every(c => c.why && c.why.length > 80),
  'every case explains itself after the answer');

db.close();
console.log(failed
  ? '\n  the mission is quoting figures the database no longer has\n'
  : '\n  the mission and the database agree\n');
process.exit(failed ? 1 : 0);
