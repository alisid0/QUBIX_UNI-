// SUM(quantity) quotes the database. Keep it true.
//
// The mission turns on a decimal appearing where a count should be, and on two
// independent routes landing on the same item total. Both have to keep being
// true of the data: if a rebuild ever made SUM(quantity) a whole number, or made
// the derived count disagree with the till's own items column, the mission would
// still read fine and would be teaching from something that no longer happens.
//
//   node scripts/check-uom.mjs

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import initSqlJs from 'sql.js';
import { UOM_FIGURES as F, UOM_MISSION } from '../src/lib/game/uom-mission.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DB = dir('../public/data/qubix-sample.db');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};
const near = (a, b, tol = 0.005) => Math.abs(a - b) < tol;

if (!existsSync(DB)) {
  console.log('   no database yet, building it\n');
  execFileSync(process.execPath, [dir('./build-sample-db.mjs')], { stdio: 'ignore' });
}

const SQL = await initSqlJs();
const db = new SQL.Database(readFileSync(DB));
const one = sql => db.exec(sql)[0]?.values[0];
const rows = sql => db.exec(sql)[0]?.values ?? [];

/* ── the tell ────────────────────────────────────────────────────────────── */
const naive = one('SELECT ROUND(SUM(quantity), 2) FROM sale_line')[0];
check(near(naive, F.naiveSum), 'the naive sum is the figure the mission opens with',
  `${naive} in the data, ${F.naiveSum} in the mission`);
check(!Number.isInteger(naive),
  'and it still has a fractional part, which is the only clue on the page',
  `${naive}`);

/* ── the two kinds of number ─────────────────────────────────────────────── */
const units = one("SELECT SUM(quantity) FROM sale_line WHERE uom = 'unit'")[0];
const weighed = one("SELECT COUNT(*), ROUND(SUM(quantity), 2) FROM sale_line WHERE uom = 'kg'");
check(units === F.unitQuantity, 'the unit quantities total what the mission says',
  `${units} in the data`);
check(weighed[0] === F.weighedLines && near(weighed[1], F.kilograms),
  'and the weighed lines are the count and weight it says',
  `${weighed[0]} lines, ${weighed[1]} kg`);
check(near(units + weighed[1], naive),
  'and the two together are exactly the false number, so nothing else is going on');

/* ── the correct count, and its independent confirmation ─────────────────── */
const derived = one("SELECT SUM(CASE WHEN uom = 'kg' THEN 1 ELSE quantity END) FROM sale_line")[0];
const header = one('SELECT SUM(items) FROM sale')[0];
check(derived === F.trueItems, 'counting a weighed line as one item gives the mission’s figure',
  `${derived} in the data`);
check(header === F.headerItems, 'and the till’s own items column gives the same figure',
  `${header} in the data`);
check(derived === header,
  'the two routes still agree, which is the point of case four',
  `${derived} both ways`);
check(derived !== Math.round(naive),
  'and the correct answer is still different from the wrong one',
  `${derived} against ${Math.round(naive)}`);

/* ── the basket a learner reads ──────────────────────────────────────────── */
const b = F.basket;
const head = one(`SELECT branch_id, business_date, ROUND(basket_total, 2), items
                  FROM sale WHERE sale_id = '${b.saleId}'`);
check(Boolean(head), `${b.saleId} is still in the sale table`);
check(head?.[0] === b.branch && head?.[1] === b.date,
  'at the branch and on the date the mission shows', `${head?.[0]} ${head?.[1]}`);
check(near(head?.[2], b.total) && head?.[3] === b.items,
  'for the total and item count it shows', `£${head?.[2]}, ${head?.[3]} items`);

const lines = rows(`SELECT l.line_no, l.sku, p.name, l.quantity, l.uom,
    ROUND(l.unit_price, 2), ROUND(l.line_total, 2)
  FROM sale_line l JOIN product p USING (sku)
  WHERE l.sale_id = '${b.saleId}' ORDER BY l.line_no`);
check(lines.length === b.lines.length, 'with the number of lines it shows',
  `${lines.length} lines`);

for (const [i, expected] of b.lines.entries()) {
  const actual = lines[i];
  if (!actual) { check(false, `line ${expected.no} is missing`); continue; }
  check(actual[1] === expected.sku && actual[2] === expected.name
    && near(actual[3], expected.quantity, 0.0005) && actual[4] === expected.uom
    && near(actual[5], expected.unitPrice) && near(actual[6], expected.lineTotal),
    `line ${expected.no}: ${expected.quantity} ${expected.uom} of ${expected.name}`,
    `${actual[3]} ${actual[4]} of ${actual[2]} at ${actual[5]}`);
}

const basketNaive = one(`SELECT ROUND(SUM(quantity), 3) FROM sale_line WHERE sale_id = '${b.saleId}'`)[0];
check(near(basketNaive, b.naiveSum, 0.0005),
  'and its quantities still add to the number the mission shows',
  `${basketNaive} in the data`);
check(b.lines.filter(l => l.uom === 'kg').length >= 2,
  'the basket still has more than one weighed line, so the fault is visible in it');

/* ── still a mission ─────────────────────────────────────────────────────── */
const positions = UOM_MISSION.cases.map(c => c.options.indexOf(c.answer));
check(positions.every(p => p >= 0), 'every answer is one of its own options');
const worst = Math.max(...[0, 1, 2, 3].map(p => positions.filter(x => x === p).length));
check(worst <= Math.ceil(positions.length / 2) - 1 || worst <= 2,
  'it cannot be beaten by pressing one button',
  `worst position holds ${worst} of ${positions.length}`);
check(UOM_MISSION.cases.every(c => c.why.length > 80), 'every case explains itself afterwards');

db.close();
console.log(failed
  ? '\n  the mission is quoting figures the database no longer has\n'
  : '\n  the mission and the database agree\n');
process.exit(failed ? 1 : 0);
