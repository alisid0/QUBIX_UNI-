// What Does It Cost? quotes the database. Keep it true.
//
// The mission turns on three numbers that must stay different from each other:
// the list price, the unweighted mean of the zone prices, and the mean price
// customers actually paid. If a rebuild ever made two of them equal, the mission
// would still read fine and would have stopped teaching anything.
//
// It also depends on the Value zone having listed a price and sold none of it.
// That is the row an inner join drops, and without it case five is fiction.
//
//   node scripts/check-zone-price.mjs

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import initSqlJs from 'sql.js';
import { ZONE_PRICE_FIGURES as F, ZONE_PRICE_MISSION } from '../src/lib/game/zone-price-mission.js';

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
const rows = sql => db.exec(sql)[0]?.values ?? [];
const one = sql => rows(sql)[0];

/* ── the product ─────────────────────────────────────────────────────────── */
const product = one(`SELECT name, unit, list_price FROM product WHERE sku = '${F.sku}'`);
check(Boolean(product), `${F.sku} is still in the product master`);
check(product?.[0] === F.productName && product?.[1] === F.unit,
  'and is still the product the mission describes', `${product?.[0]}, ${product?.[1]}`);
check(near(product?.[2], F.listPrice), 'with the list price the mission quotes',
  `${product?.[2]} in the data, ${F.listPrice} in the mission`);

/* ── the five prices, their branches and their volume ────────────────────── */
const zoneRows = rows(`
  SELECT z.zone_id, z.price,
         (SELECT COUNT(*) FROM branch WHERE zone_id = z.zone_id),
         COALESCE((SELECT SUM(l.quantity) FROM sale_line l
                   JOIN sale s USING (sale_id)
                   JOIN branch b ON b.branch_id = s.branch_id
                   WHERE l.sku = z.sku AND b.zone_id = z.zone_id), 0)
  FROM zone_price z WHERE z.sku = '${F.sku}' ORDER BY z.price`);

check(zoneRows.length === F.zones.length, 'the product is still priced in five zones',
  `${zoneRows.length} zones`);

for (const [i, expected] of F.zones.entries()) {
  const actual = zoneRows[i];
  if (!actual) { check(false, `${expected.zone} is missing from the data`); continue; }
  check(actual[0] === expected.zone && near(actual[1], expected.price),
    `${expected.name} still charges ${expected.price.toFixed(2)}`,
    `${actual[0]} at ${actual[1]}`);
  check(actual[2] === expected.branches, `and still covers ${expected.branches} branch(es)`,
    `${actual[2]} in the data`);
  check(actual[3] === expected.units, `and still sold ${expected.units} unit(s)`,
    `${actual[3]} in the data`);
}

/* ── the row an inner join would drop ────────────────────────────────────── */
const silent = F.zones.filter(z => z.units === 0);
check(silent.length > 0,
  'at least one zone lists a price and sold nothing, which case five needs',
  silent.map(z => `${z.name} at ${z.price.toFixed(2)}`).join(', '));
check(silent.some(z => z.price === Math.min(...F.zones.map(x => x.price))),
  'and it is the cheapest price, so dropping it understates the range');

/* ── three answers that must stay three ──────────────────────────────────── */
const unweighted = one(`SELECT ROUND(AVG(price), 2) FROM zone_price WHERE sku = '${F.sku}'`)[0];
const paid = one(`SELECT ROUND(SUM(line_total) / SUM(quantity), 2), SUM(quantity)
                  FROM sale_line WHERE sku = '${F.sku}'`);

check(near(unweighted, F.meanOfZonePrices), 'the mean of the zone prices is what the mission says',
  `${unweighted} in the data, ${F.meanOfZonePrices} in the mission`);
check(near(paid[0], F.meanPricePaid), 'the mean price paid is what the mission says',
  `${paid[0]} in the data, ${F.meanPricePaid} in the mission`);
check(paid[1] === F.unitsSold, 'over the number of units the mission says',
  `${paid[1]} in the data, ${F.unitsSold} in the mission`);

const three = [F.listPrice, F.meanOfZonePrices, F.meanPricePaid];
check(new Set(three.map(v => v.toFixed(2))).size === 3,
  'all three answers are still different, which is the whole mission',
  three.map(v => v.toFixed(2)).join(' · '));
check(F.meanPricePaid < F.meanOfZonePrices,
  'and the weighted mean is still below the unweighted one, as case four explains',
  `${F.meanPricePaid} against ${F.meanOfZonePrices}`);

/* ── the mission is still a mission ──────────────────────────────────────── */
const positions = ZONE_PRICE_MISSION.cases.map(c => c.options.indexOf(c.answer));
check(positions.every(p => p >= 0), 'every answer is one of its own options');
check(new Set(positions).size > 2, 'the answer moves position between cases',
  `positions ${positions.join(', ')}`);
check(ZONE_PRICE_MISSION.cases.every(c => c.why.length > 80),
  'every case explains itself afterwards');

db.close();
console.log(failed
  ? '\n  the mission is quoting prices the database no longer has\n'
  : '\n  the mission and the database agree\n');
process.exit(failed ? 1 : 0);
