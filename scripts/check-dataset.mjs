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

// The price a line rang through at should be the price of that product in that
// branch's zone, not the national list price. Checking it needs the zone map
// here rather than later, because sale_line is streamed once and only once.
const zonePriceTable = load('zone_price.csv');
const zpAt = zonePriceTable.at;
const zonePriceMap = new Map(zonePriceTable.rows.map(r =>
  [`${r[zpAt('sku')]}|${r[zpAt('zone_id')]}`, Number(r[zpAt('price')])]));
const zoneOfBranch = new Map(branch.rows.map(r => [r[branch.at('branch_id')], r[branch.at('zone_id')]]));
const zoneByIndex = branchList.map(id => zoneOfBranch.get(id));

let lines = 0, orphanLines = 0, badSku = 0, badPromo = 0, badMaths = 0,
  weighedLines = 0, badUom = 0, offZonePrice = 0, zoneChecked = 0;
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
  const zone = n < MAXID && branchOf[n] >= 0 ? zoneByIndex[branchOf[n]] : null;
  if (zone) {
    const want = zonePriceMap.get(`${r[at('sku')]}|${zone}`);
    if (want !== undefined) { zoneChecked += 1; if (Math.abs(want - u) > 0.005) offZonePrice += 1; }
  }
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

/* ══ the world above the shop floor ═══════════════════════════════════════ */

head('three hierarchies over the same 48 branches');

const region = load('region.csv');
const districtT = load('district.csv');
const countyT = load('county.csv');
const zoneT = load('price_zone.csv');
const depotT = load('depot.csv');
const depotBranch = load('depot_branch.csv');

const regionIds = new Set(region.rows.map(r => r[region.at('region_id')]));
const districtRegion = new Map(districtT.rows.map(r => [r[districtT.at('district_id')], r[districtT.at('region_id')]]));
const countyRegion = new Map(countyT.rows.map(r => [r[countyT.at('county_id')], r[countyT.at('region_id')]]));
const zoneIds = new Set(zoneT.rows.map(r => r[zoneT.at('zone_id')]));

ok('every district reports into a region that exists',
  districtT.rows.every(r => regionIds.has(r[districtT.at('region_id')])), `${districtT.n} districts`);
ok('every county sits in a region that exists',
  countyT.rows.every(r => regionIds.has(r[countyT.at('region_id')])), `${countyT.n} counties`);
ok('every branch has a district, a county and a price zone',
  branch.rows.every(r => districtRegion.has(r[branch.at('district_id')])
    && countyRegion.has(r[branch.at('county_id')])
    && zoneIds.has(r[branch.at('zone_id')])));

// The trap: the management path and the geographic path do not always end in
// the same region. It has to be a minority, or it is not a trap, it is a broken
// join and there is nothing to notice.
const drifted = branch.rows.filter(r =>
  districtRegion.get(r[branch.at('district_id')]) !== countyRegion.get(r[branch.at('county_id')]));
ok('the two hierarchies disagree for a minority, not for most',
  drifted.length >= 3 && drifted.length <= 15,
  `${drifted.length} of ${branch.n} branches sit in a county whose region is not their district's`);

// And the branches the missions actually name must be clean down both paths,
// because a worked example is not the place to meet an ambiguity.
const NAMED = new Set(BRANCHES.map(b => b.id));
const namedDrift = drifted.filter(r => NAMED.has(r[branch.at('branch_id')]));
ok('the named branches agree down both paths, so examples stay true',
  namedDrift.length === 0,
  namedDrift.length ? namedDrift.map(r => r[branch.at('branch_id')]).join(', ')
    : `${NAMED.size} named branches clean`);

// Price zones are a third hierarchy and nest in neither of the other two.
const zonesPerRegion = new Map();
for (const r of branch.rows) {
  const reg = districtRegion.get(r[branch.at('district_id')]);
  if (!zonesPerRegion.has(reg)) zonesPerRegion.set(reg, new Set());
  zonesPerRegion.get(reg).add(r[branch.at('zone_id')]);
}
ok('price zones cut across regions rather than nesting inside them',
  [...zonesPerRegion.values()].filter(s => s.size > 1).length >= 4,
  `${[...zonesPerRegion.values()].filter(s => s.size > 1).length} regions contain more than one zone`);

const depotIds = new Set(depotT.rows.map(r => r[depotT.at('depot_id')]));
const perBranchDepots = new Map();
for (const r of depotBranch.rows) {
  const b = r[depotBranch.at('branch_id')];
  perBranchDepots.set(b, (perBranchDepots.get(b) || 0) + 1);
}
ok('every depot link joins a real depot to a real branch',
  depotBranch.rows.every(r => depotIds.has(r[depotBranch.at('depot_id')])
    && branchIds.has(r[depotBranch.at('branch_id')])), `${depotBranch.n} links`);
ok('a branch is served by more than one depot, so the join fans out',
  [...perBranchDepots.values()].every(v => v >= 2),
  `${Math.min(...perBranchDepots.values())} to ${Math.max(...perBranchDepots.values())} depots per branch`);

head('the same product, more than one price');

ok('every product is priced in every zone',
  zonePriceTable.n === product.n * zoneT.n,
  `${zonePriceTable.n.toLocaleString()} rows for ${product.n.toLocaleString()} products across ${zoneT.n} zones`);

const spread = new Map();
for (const r of zonePriceTable.rows) {
  const sku = r[zpAt('sku')];
  if (!spread.has(sku)) spread.set(sku, new Set());
  spread.get(sku).add(r[zpAt('price')]);
}
const varying = [...spread.values()].filter(s => s.size > 1).length;
ok('most products really do cost different money in different branches',
  varying > product.n * 0.8, `${varying.toLocaleString()} of ${product.n.toLocaleString()} vary by zone`);

ok('a sale rang through at its branch zone price, not the list price',
  offZonePrice === 0,
  offZonePrice ? `${offZonePrice.toLocaleString()} lines priced off-zone`
    : `${zoneChecked.toLocaleString()} lines checked against their zone`);

head('what the competition charges, and what we think it does to demand');

const check = load('competitor_price_check.csv');
const competitor = load('competitor.csv');
const competitorIds = new Set(competitor.rows.map(r => r[competitor.at('competitor_id')]));
const kviSkus = new Set(product.rows.filter(r => r[product.at('kvi')] === 'true')
  .map(r => r[product.at('sku')]));

ok('every price check is a real branch looking at a real competitor',
  check.rows.every(r => branchIds.has(r[check.at('branch_id')])
    && competitorIds.has(r[check.at('competitor_id')])), `${check.n.toLocaleString()} checks`);
ok('only the lines customers remember the price of get checked',
  check.rows.every(r => kviSkus.has(r[check.at('sku')])),
  `${kviSkus.size} known value items`);
// Over a whole quarter every branch gets visited eventually, so counting
// branches proves nothing. The gap is at the grain a pricing decision is made
// on: a branch, a competitor, this week. Plenty of those never happened, and a
// query that assumes they did will read a missing visit as a matched price.
const weekOf = d => Math.floor((Date.parse(d) - Date.parse(CHAIN.quarterStart)) / 604800000);
const visits = new Set(check.rows.map(r =>
  `${r[check.at('branch_id')]}|${r[check.at('competitor_id')]}|${weekOf(r[check.at('checked_on')])}`));
const possible = branch.n * competitor.n * (Math.floor(sales > 100000 ? CHAIN.quarterDays / 7 : 1) || 1);
ok('it is a sample and not a census: most branch-weeks were never walked',
  visits.size < possible * 0.5,
  `${visits.size.toLocaleString()} branch-competitor-weeks checked of ${possible.toLocaleString()} possible`);

const elast = load('price_elasticity.csv');
const thin = elast.rows.filter(r => Number(r[elast.at('observations')]) < 50);
const fat = elast.rows.filter(r => Number(r[elast.at('observations')]) >= 340);
const meanErr = rows => rows.reduce((n, r) => n + Number(r[elast.at('std_error')]), 0) / rows.length;
ok('some elasticities are fitted on almost nothing, in the same table as the good ones',
  thin.length > 0 && fat.length > 0,
  `${thin.length.toLocaleString()} of ${elast.n.toLocaleString()} use fewer than 50 observations`);
ok('and the thin ones carry the wide error bars that say so',
  meanErr(thin) > meanErr(fat) * 3,
  `mean standard error ${meanErr(thin).toFixed(2)} against ${meanErr(fat).toFixed(2)}`);

head('buying, in eleven currencies');

const quote = load('supplier_quote.csv');
const fx = load('fx_rate.csv');
const po = load('purchase_order.csv');
const currencyT = load('currency.csv');
const supplierT = load('supplier.csv');
const currencyIds = new Set(currencyT.rows.map(r => r[currencyT.at('currency_code')]));
const supplierIds2 = new Set(supplierT.rows.map(r => r[supplierT.at('supplier_id')]));

ok('every quote comes from a supplier, for a product, in a real currency',
  quote.rows.every(r => supplierIds2.has(r[quote.at('supplier_id')])
    && skus.has(r[quote.at('sku')])
    && currencyIds.has(r[quote.at('currency_code')])), `${quote.n.toLocaleString()} quotes`);

const quoteCurrencies = new Set(quote.rows.map(r => r[quote.at('currency_code')]));
ok('the cheapest supplier cannot be found by sorting a column',
  quoteCurrencies.size >= 5, `quoted in ${quoteCurrencies.size} currencies`);

const bySku = new Map();
for (const r of quote.rows) {
  const s = r[quote.at('sku')];
  bySku.set(s, (bySku.get(s) || 0) + 1);
}
ok('products are tendered, so there is a choice to get wrong',
  [...bySku.values()].filter(v => v > 1).length > bySku.size * 0.8,
  `${bySku.size.toLocaleString()} products with ${[...bySku.values()].filter(v => v > 1).length.toLocaleString()} multi-supplier tenders`);

const fxDays = new Set(fx.rows.map(r => r[fx.at('rate_date')]));
const weekendRates = [...fxDays].filter(d => [0, 6].includes(new Date(d + 'T00:00:00Z').getUTCDay()));
ok('there is no exchange rate at the weekend, so Friday has to be carried forward',
  weekendRates.length === 0, `${fxDays.size} trading days, none of them a weekend`);
ok('every currency the group buys in is quoted',
  new Set(fx.rows.map(r => r[fx.at('currency_code')])).size === currencyT.n - 1,
  `${new Set(fx.rows.map(r => r[fx.at('currency_code')])).size} of ${currencyT.n - 1} non-sterling currencies`);

const openPo = po.rows.filter(r => r[po.at('received_on')] === '');
ok('every purchase order names a supplier, a depot and a product',
  po.rows.every(r => supplierIds2.has(r[po.at('supplier_id')])
    && depotIds.has(r[po.at('depot_id')]) && skus.has(r[po.at('sku')])), `${po.n.toLocaleString()} orders`);
ok('some orders have not arrived, and that blank is a not-yet',
  openPo.length > 0 && openPo.length < po.n,
  `${openPo.length.toLocaleString()} of ${po.n.toLocaleString()} still open`);

const tariff = load('tariff.csv');
const closed = tariff.rows.filter(r => r[tariff.at('valid_to')] !== '');
ok('duty depends on when the goods moved, not on when you ran the query',
  closed.length >= 3,
  `${closed.length} rates were superseded part way through the quarter`);

head('making it ourselves');

const factoryT = load('factory.csv');
const lineT = load('production_line.csv');
const bom = load('bill_of_materials.csv');
const run = load('production_run.csv');
const makeBuy = load('make_or_buy.csv');
const commodityT = load('commodity.csv');
const factoryIds = new Set(factoryT.rows.map(r => r[factoryT.at('factory_id')]));
const lineIds = new Set(lineT.rows.map(r => r[lineT.at('line_id')]));
const commodityIds = new Set(commodityT.rows.map(r => r[commodityT.at('commodity_id')]));
const madeSkus = new Set(product.rows.filter(r => r[product.at('made_in_house')] === 'true')
  .map(r => r[product.at('sku')]));

ok('every production line belongs to a factory',
  lineT.rows.every(r => factoryIds.has(r[lineT.at('factory_id')])), `${lineT.n} lines`);
ok('only products we make have a recipe',
  bom.rows.every(r => madeSkus.has(r[bom.at('sku')])), `${madeSkus.size} products made in house`);
ok('every ingredient is a commodity we track the price of',
  bom.rows.every(r => commodityIds.has(r[bom.at('input_commodity_id')])), `${bom.n} lines of recipe`);
ok('every production run happened on a real line at a real factory',
  run.rows.every(r => factoryIds.has(r[run.at('factory_id')]) && lineIds.has(r[run.at('line_id')])),
  `${run.n.toLocaleString()} runs`);

const shortRuns = run.rows.filter(r =>
  Number(r[run.at('good_units')]) + Number(r[run.at('scrap_units')]) !== Number(r[run.at('planned_units')]));
ok('most runs reconcile, and the ones that do not are worth finding',
  shortRuns.length > run.n * 0.1 && shortRuns.length < run.n * 0.45,
  `${shortRuns.length.toLocaleString()} of ${run.n.toLocaleString()} runs do not add up`);

const undecided = makeBuy.rows.filter(r => r[makeBuy.at('decision')] === '');
ok('every make-or-buy case is about a product we actually sell',
  makeBuy.rows.every(r => skus.has(r[makeBuy.at('sku')])), `${makeBuy.n} cases`);
ok('a recommendation is a model output and some of them are still undecided',
  undecided.length > 0 && undecided.length < makeBuy.n,
  `${undecided.length} of ${makeBuy.n} have no decision yet`);

head('the estate that is still on its own systems');

const meridian = load('meridian_store.csv');
const crosswalk = load('product_crosswalk.csv');
const shopNos = new Set(meridian.rows.map(r => r[meridian.at('shop_no')]));
ok('the acquired stores are not in the branch table, and their keys do not collide',
  [...shopNos].every(n => !branchIds.has(n)), `${meridian.n} shops on a four digit number`);

const covered = new Set(crosswalk.rows.map(r => r[crosswalk.at('qubix_sku')]));
const coverage = covered.size / product.n;
ok('the crosswalk is incomplete, the way a hand-maintained one is',
  coverage > 0.7 && coverage < 0.9, `${(coverage * 100).toFixed(0)}% of products have a match`);

const articles = new Map();
for (const r of crosswalk.rows) {
  const a = r[crosswalk.at('meridian_article')];
  articles.set(a, (articles.get(a) || 0) + 1);
}
ok('and it is not one to one, because they never split the pack sizes',
  [...articles.values()].some(v => v > 1),
  `${[...articles.values()].filter(v => v > 1).length} articles match more than one SKU`);

head('the shop floor nobody sees');

const markdown = load('markdown.csv');
const waste = load('waste.csv');
ok('every markdown is a real product at a real branch',
  markdown.rows.every(r => branchIds.has(r[markdown.at('branch_id')]) && skus.has(r[markdown.at('sku')])),
  `${markdown.n.toLocaleString()} reductions`);
ok('a markdown is cheaper than what it was',
  markdown.rows.every(r => Number(r[markdown.at('marked_price')]) < Number(r[markdown.at('original_price')])));
ok('marked units either sold or were wasted, and the two add up',
  markdown.rows.every(r => Number(r[markdown.at('units_sold')]) + Number(r[markdown.at('units_wasted')])
    === Number(r[markdown.at('units_marked')])));

const other = waste.rows.filter(r => r[waste.at('reason_code')] === 'other').length;
ok('a third of waste is filed as "other", because the shift was ending',
  other / waste.n > 0.25 && other / waste.n < 0.55,
  `${(other / waste.n * 100).toFixed(0)}% of ${waste.n.toLocaleString()} write-offs have no real reason`);

console.log(`\n  ${bad ? `${bad} problem(s)` : 'all checks pass'}`
  + `, ${(sales + lines + stockRows + staff.n + ret.n + order.n + check.n + quote.n
    + zonePriceTable.n + markdown.n + waste.n).toLocaleString()} rows inspected\n`);
process.exit(bad ? 1 : 0);
