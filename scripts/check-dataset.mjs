// The generated quarter must be a dataset, not a pile of plausible rows.
//
// A generator is easy to write and easy to get subtly wrong: a foreign key that
// points at nobody, a branch that quietly takes twice its declared trade, a
// basket distribution that comes out symmetrical when three chapters teach that
// it is not, a till that finishes scanning before it started. None of that is
// visible by looking at the first ten rows, which is all anybody ever looks at.
//
// It also checks the join between the generated data and the taught data. The
// SQL Console's twelve sales are supposed to be a genuine extract of this
// quarter; if they drift apart, the reading and the dataset teach different
// things about the same shop. The same goes for the counts Join Without
// Changing the Grain quotes: 48 branches, 2,140 products, 9,605 price rows.
//
// Everything here streams. sale_line is 158 MB and 4.6 million rows, and
// readFileSync().split() on that wants about a gigabyte to say "no orphans".
// Sale ids are dense integers, so membership is a bitmap rather than a Set.
//
// The data is gitignored, so a week is generated when it is missing.
//
//   npm run check:dataset

import { existsSync, readFileSync, createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { execFileSync } from 'node:child_process';
import { BRANCHES, CHAIN } from '../src/lib/game/superstore.js';
import { SALES } from '../src/lib/game/sql-console-mission.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DATA = dir('../data/');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};
const head = t => console.log(`\n  ${t}`);

if (!existsSync(DATA + 'sale.csv')) {
  console.log('   no data/ yet, generating a week to check against\n');
  execFileSync(process.execPath, [dir('./generate-dataset.mjs'), '--days', '7'], { stdio: 'ignore' });
}

/* ── readers ─────────────────────────────────────────────────────────────── */
const unquote = v => (v.startsWith('"') && v.endsWith('"') ? v.slice(1, -1) : v);

/** Small tables load whole. Anything over a few megabytes must not. */
const load = name => {
  const lines = readFileSync(DATA + name, 'utf8').trim().split(/\r?\n/);
  const cols = lines[0].split(',');
  const at = c => cols.indexOf(c);
  return { cols, at, n: lines.length - 1, rows: lines.slice(1).map(r => r.split(',').map(unquote)) };
};

/** Big tables stream. `fn` sees each row already split. */
const stream = async (name, fn) => {
  let cols = null, at = null;
  const rl = createInterface({ input: createReadStream(DATA + name), crlfDelay: Infinity });
  for await (const raw of rl) {
    if (!raw) continue;
    if (!cols) { cols = raw.split(','); at = c => cols.indexOf(c); continue; }
    fn(raw.split(','), at);
  }
};

const secs = ts => Number(ts.slice(11, 13)) * 3600 + Number(ts.slice(14, 16)) * 60 + Number(ts.slice(17, 19));
const saleNo = id => Number(id.slice(2));

/* ── the small tables, and the counts the missions quote ─────────────────── */
head('what the fiction promises');

const branch = load('branch.csv');
const product = load('product.csv');
const till = load('till.csv');
const staff = load('employee.csv');
const promo = load('promotion.csv');
const promoProduct = load('promotion_product.csv');
const price = load('price_history.csv');
const supplier = load('supplier.csv');
const shipment = load('shipment.csv');

ok('the estate is the chain the missions describe', branch.n === CHAIN.branches,
  `${branch.n} branches against ${CHAIN.branches} declared`);
ok('the product master is the one Join Without Changing the Grain counts',
  product.n === CHAIN.products, `${product.n.toLocaleString()} products`);
ok('price_history is the fan-out that mission predicts', price.n === 9605,
  `${price.n.toLocaleString()} rows`);
ok('63 promotions covering 1,874 products, as declared',
  promo.n === 63 && promoProduct.n === 1874,
  `${promo.n} promotions, ${promoProduct.n.toLocaleString()} links`);

/* ── referential integrity across the small tables ───────────────────────── */
head('nothing points at nobody');

const branchIds = new Set(branch.rows.map(r => r[branch.at('branch_id')]));
const skus = new Set(product.rows.map(r => r[product.at('sku')]));
const employeeIds = new Set(staff.rows.map(r => r[staff.at('employee_id')]));
const promoIds = new Set(promo.rows.map(r => r[promo.at('promotion_id')]));
const supplierIds = new Set(supplier.rows.map(r => r[supplier.at('supplier_id')]));
const shipmentIds = new Set(shipment.rows.map(r => r[shipment.at('shipment_id')]));

const tillBranch = new Map();
for (const r of till.rows) tillBranch.set(r[till.at('till_id')], r[till.at('branch_id')]);
ok('every till belongs to a branch that exists',
  till.rows.every(r => branchIds.has(r[till.at('branch_id')])), `${till.n} tills`);

ok('every promoted product is in the master',
  promoProduct.rows.every(r => skus.has(r[promoProduct.at('sku')])
    && promoIds.has(r[promoProduct.at('promotion_id')])));
ok('every shipment has a supplier and a destination',
  shipment.rows.every(r => supplierIds.has(r[shipment.at('supplier_id')])
    && branchIds.has(r[shipment.at('branch_id')])), `${shipment.n.toLocaleString()} shipments`);

const shipLine = load('shipment_line.csv');
ok('every shipment line belongs to a shipment',
  shipLine.rows.every(r => shipmentIds.has(r[shipLine.at('shipment_id')])
    && skus.has(r[shipLine.at('sku')])), `${shipLine.n.toLocaleString()} lines`);

/* ── every product has exactly one open price ────────────────────────────── */
const openPrice = new Map();
for (const r of price.rows) {
  const sku = r[price.at('sku')];
  if (r[price.at('valid_to')] === '') openPrice.set(sku, (openPrice.get(sku) || 0) + 1);
}
ok('every product has exactly one price in force',
  openPrice.size === product.n && [...openPrice.values()].every(v => v === 1),
  `${openPrice.size.toLocaleString()} of ${product.n.toLocaleString()} with an open row`);

/* ── the quarter itself ──────────────────────────────────────────────────── */
head('the quarter');

const MAXID = 2_000_000;
const seen = new Uint8Array(MAXID);          // sale_id membership, 2 MB not 100
const totalOf = new Float64Array(MAXID);
const branchOf = new Int16Array(MAXID).fill(-1);
const dateOf = new Int32Array(MAXID);        // 20260401, so returns can be dated
const branchList = [...branchIds];
const branchIndex = new Map(branchList.map((b, i) => [b, i]));

const counted = new Map();
const totals = [];
let sales = 0, badBranch = 0, badTill = 0, tillElsewhere = 0, badStaff = 0,
  outOfOrder = 0, outOfQuarter = 0, zeroItems = 0;
const scanPerItem = { staffed: [], 'self-service': [] };
const tillKind = new Map(till.rows.map(r => [r[till.at('till_id')], r[till.at('kind')]]));

const wanted = new Map(SALES.map(s => [s.sale_id, s]));
const got = new Map();

await stream('sale.csv', (r, at) => {
  sales += 1;
  const id = r[at('sale_id')], b = r[at('branch_id')], t = r[at('till_id')];
  const total = Number(r[at('basket_total')]);
  const date = r[at('business_date')];
  const n = saleNo(id);
  if (n < MAXID) {
    seen[n] = 1;
    totalOf[n] = total;
    branchOf[n] = branchIndex.has(b) ? branchIndex.get(b) : -1;
    dateOf[n] = Number(date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10));
  }
  if (!branchIds.has(b)) badBranch += 1;
  if (!tillBranch.has(t)) badTill += 1;
  else if (tillBranch.get(t) !== b) tillElsewhere += 1;
  const e = r[at('employee_id')];
  if (e && !employeeIds.has(e)) badStaff += 1;

  counted.set(b, (counted.get(b) || 0) + 1);
  totals.push(total);
  if (date < CHAIN.quarterStart) outOfQuarter += 1;
  if (wanted.has(id)) got.set(id, { branch: b, date, total });

  const s0 = secs(r[at('scan_started_at')]), s1 = secs(r[at('scan_ended_at')]),
    s2 = secs(r[at('payment_completed_at')]);
  if (!(s0 <= s1 && s1 <= s2)) outOfOrder += 1;
  const items = Number(r[at('items')]);
  if (!(items > 0)) zeroItems += 1;
  const bucket = scanPerItem[tillKind.get(t)];
  if (bucket && bucket.length < 40000 && items > 0) bucket.push((s1 - s0) / items);
});

ok('every sale happened at a real branch', badBranch === 0, `${sales.toLocaleString()} sales`);
ok('every sale rang through a till that exists', badTill === 0);
ok('no till rang up a sale for another branch', tillElsewhere === 0,
  tillElsewhere ? `${tillElsewhere.toLocaleString()} sales on a foreign till` : '');
ok('every sale was rung up by somebody on the payroll', badStaff === 0);
ok('every sale falls inside the quarter', outOfQuarter === 0);

/* ── the till timings, which are the new part ────────────────────────────── */
head('the checkout, as something you can measure');

ok('nothing was paid for before it was scanned', outOfOrder === 0,
  outOfOrder ? `${outOfOrder.toLocaleString()} sales out of order` : `${sales.toLocaleString()} checked`);
ok('no sale rang up zero items', zeroItems === 0);

const mean = a => a.reduce((n, v) => n + v, 0) / a.length;
const staffedRate = mean(scanPerItem.staffed);
const selfRate = mean(scanPerItem['self-service']);
ok('self-service is slower per item than a trained colleague', selfRate > staffedRate * 1.4,
  `${selfRate.toFixed(1)}s against ${staffedRate.toFixed(1)}s per item`);
ok('scan rates are humanly possible', staffedRate > 0.8 && selfRate < 12,
  `staffed ${staffedRate.toFixed(1)}s, self-service ${selfRate.toFixed(1)}s per item`);

/* ── the taught twelve must be in the population ─────────────────────────── */
head('the sales the missions show you');

const missing = [...wanted.keys()].filter(id => !got.has(id));
const wrong = [];
for (const [id, s] of wanted) {
  const g = got.get(id);
  if (!g) continue;
  if (g.branch !== s.branch_id || g.date !== s.business_date || Math.abs(g.total - s.basket_total) > 0.005)
    wrong.push(`${id}: ${g.branch} ${g.date} ${g.total} against ${s.branch_id} ${s.business_date} ${s.basket_total}`);
}
ok('the SQL Console sales are in the quarter', missing.length === 0,
  missing.length ? `absent: ${missing.join(', ')}` : `all ${SALES.length}`);
ok('and they say the same thing in both places', wrong.length === 0, wrong.slice(0, 2).join(' · '));

/* ── the fan-out, which is what chapter 05 is about ──────────────────────── */
head('the join that multiplies rows');

const kgSkus = new Set(product.rows.filter(r => r[product.at('sold_by')] === 'kg')
  .map(r => r[product.at('sku')]));
let lines = 0, orphanLines = 0, badSku = 0, badPromo = 0, badMaths = 0,
  weighedLines = 0, badUom = 0;
let curSale = null, curSum = 0, mismatched = 0, checkedSums = 0;
const closeSale = () => {
  if (curSale === null) return;
  const n = saleNo(curSale);
  if (n < MAXID && seen[n]) {
    checkedSums += 1;
    if (Math.abs(curSum - totalOf[n]) > 0.02) mismatched += 1;
  }
};
await stream('sale_line.csv', (r, at) => {
  lines += 1;
  const id = r[at('sale_id')];
  const n = saleNo(id);
  if (!(n < MAXID && seen[n])) orphanLines += 1;
  if (!skus.has(r[at('sku')])) badSku += 1;
  const p = r[at('promotion_id')];
  if (p && !promoIds.has(p)) badPromo += 1;
  const q = Number(r[at('quantity')]), u = Number(r[at('unit_price')]), t = Number(r[at('line_total')]);
  if (Math.abs(q * u - t) > 0.02) badMaths += 1;
  const uom = r[at('uom')];
  if (uom === 'kg') { weighedLines += 1; if (!kgSkus.has(r[at('sku')])) badUom += 1; }
  else if (!Number.isInteger(q)) badUom += 1;
  if (id !== curSale) { closeSale(); curSale = id; curSum = 0; }
  curSum += t;
});
closeSale();

ok('every sale_line belongs to a sale', orphanLines === 0,
  orphanLines ? `${orphanLines.toLocaleString()} orphans` : `${lines.toLocaleString()} lines`);
ok('every line is a product in the master', badSku === 0);
ok('every discount cites a promotion that ran', badPromo === 0);
ok('quantity times unit price is the line total', badMaths === 0,
  badMaths ? `${badMaths.toLocaleString()} lines do not multiply out` : '');
ok('the lines add up to the basket', mismatched === 0,
  mismatched ? `${mismatched.toLocaleString()} baskets disagree` : `${checkedSums.toLocaleString()} baskets reconciled`);
ok('the join really does multiply rows', lines > sales * 3,
  `${sales.toLocaleString()} sales become ${lines.toLocaleString()} rows`);
ok('weighed goods are weighed, and only weighed goods have a weight', badUom === 0,
  badUom ? `${badUom.toLocaleString()} lines use the wrong unit`
    : `${weighedLines.toLocaleString()} lines sold by the kilogram`);
// Every basket ending on the scales was the first version's tell: the weighed
// line was how the total was made to balance, so there was exactly one per sale.
// Loose produce is something a third of shoppers buy, not a law of the shop.
const weighedShare = weighedLines / lines;
ok('loose produce is a habit, not a rule', weighedShare > 0.02 && weighedShare < 0.2,
  `${(weighedShare * 100).toFixed(1)}% of lines are weighed`);

/* ── returns, orders, footfall ───────────────────────────────────────────── */
head('what happens after the sale');

const ret = load('return.csv');
const retIds = new Set(ret.rows.map(r => r[ret.at('return_id')]));
let retOrphan = 0, retElsewhere = 0, retTooBig = 0, retBeforeSale = 0;
for (const r of ret.rows) {
  const n = saleNo(r[ret.at('sale_id')]);
  if (!(n < MAXID && seen[n])) { retOrphan += 1; continue; }
  if (branchList[branchOf[n]] !== r[ret.at('branch_id')]) retElsewhere += 1;
  if (Number(r[ret.at('refund_total')]) > totalOf[n] + 0.005) retTooBig += 1;
  const on = r[ret.at('returned_at')];
  if (Number(on.slice(0, 4) + on.slice(5, 7) + on.slice(8, 10)) <= dateOf[n]) retBeforeSale += 1;
}
ok('every return refers to a sale that happened', retOrphan === 0,
  retOrphan ? `${retOrphan.toLocaleString()} point at no sale` : `${ret.n.toLocaleString()} returns`);
ok('goods come back to the branch that sold them', retElsewhere === 0,
  retElsewhere ? `${retElsewhere.toLocaleString()} returned to another branch` : '');
ok('no refund exceeds what was paid', retTooBig === 0,
  retTooBig ? `${retTooBig.toLocaleString()} refunds larger than the basket` : '');
ok('nothing came back before it was bought', retBeforeSale === 0,
  retBeforeSale ? `${retBeforeSale.toLocaleString()} returned on or before the sale date` : '');

const retLine = load('return_line.csv');
ok('every returned line belongs to a return',
  retLine.rows.every(r => retIds.has(r[retLine.at('return_id')])), `${retLine.n.toLocaleString()} lines`);
ok('returned goods are products the shop sells',
  retLine.rows.every(r => skus.has(r[retLine.at('sku')])));

const order = load('customer_order.csv');
const oAt = order.at;
const pickups = order.rows.filter(r => r[oAt('fulfilment_method')] === 'PICKUP');
const delivered = order.rows.filter(r => r[oAt('fulfilment_method')] !== 'PICKUP');
ok('collection orders have no delivery distance, and it is blank not zero',
  pickups.length > 0 && pickups.every(r => r[oAt('delivery_distance_km')] === ''),
  `${pickups.length.toLocaleString()} collections`);
ok('deliveries do have one', delivered.length > 0
  && delivered.every(r => Number(r[oAt('delivery_distance_km')]) > 0),
  `${delivered.length.toLocaleString()} deliveries`);

let foot = 0, oddHour = 0;
await stream('footfall.csv', (r, at) => {
  foot += 1;
  const h = Number(r[at('hour')]);
  if (!(h >= 0 && h <= 23)) oddHour += 1;
});
ok('footfall is counted by the hour, and the hours are hours', oddHour === 0,
  `${foot.toLocaleString()} branch-hours`);

/* ── the shape three chapters teach ──────────────────────────────────────── */
head('the shape the lessons claim');

totals.sort((a, b) => a - b);
const m = totals.reduce((n, v) => n + v, 0) / totals.length;
const median = totals[Math.floor(totals.length / 2)];
ok('baskets are right-skewed, as the Distribution Desk says', m > median * 1.3,
  `mean ${m.toFixed(2)} against median ${median.toFixed(2)}`);

if (sales > 100000) {
  head('branches take the trade they claim');
  for (const b of BRANCHES) {
    const c = counted.get(b.id) || 0;
    ok(b.name, Math.abs(c - b.transactions) / b.transactions < 0.03,
      `${c.toLocaleString()} against ${b.transactions.toLocaleString()} declared`);
  }
  ok('every branch in the estate traded', counted.size === branch.n,
    `${counted.size} of ${branch.n} branches took a sale`);
} else {
  console.log('\n   (week sample: branch volumes checked only on a full quarter)');
}

/* ── the faults are deliberate, and must still be there ──────────────────── */
head('the faults chapter 03 teaches from');

let stockRows = 0, blanks = 0;
await stream('inventory_snapshot.csv', (r, at) => {
  stockRows += 1;
  if (r[at('closing_stock_units')] === '') blanks += 1;
});
const rate = blanks / stockRows;
ok('some stock counts never happened, and are blank not zero', blanks > 0 && rate < 0.1,
  `${blanks.toLocaleString()} of ${stockRows.toLocaleString()} blank (${(rate * 100).toFixed(1)}%)`);

const leavers = staff.rows.filter(r => r[staff.at('left')] !== '').length;
ok('some colleagues have left, so headcount needs a condition', leavers > 0,
  `${leavers.toLocaleString()} of ${staff.n.toLocaleString()} have a leaving date`);

const parttime = staff.rows.filter(r => Number(r[staff.at('weekly_hours')]) < 37.5).length;
ok('heads and hours are different numbers', parttime > 0,
  `${parttime.toLocaleString()} work less than a full week`);

console.log(`\n  ${bad ? `${bad} problem(s)` : 'all checks pass'}`
  + `, ${(sales + lines + stockRows + staff.n + ret.n + order.n).toLocaleString()} rows inspected\n`);
process.exit(bad ? 1 : 0);
