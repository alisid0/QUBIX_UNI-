// Build the quarter the chain actually trades.
//
// superstore.js described six branches and nine products. Join Without Changing
// the Grain had always quoted 48 branches and 2,140 products, so the fiction
// promised a supermarket group while the world delivered a corner shop. The
// larger number was the true one, and this builds to it: the named six and nine
// are a described subset, the way a real analyst knows a few stores by name and
// the rest by id.
//
// The small tables in the missions stay as they are. "What does one row
// represent" needs a table you can see all of. What was missing is the
// population underneath, and everything the missions already name without
// having: returns, promotions, price history, suppliers, loyalty, footfall,
// and the till timings that make a checkout something you can measure.
//
// Deterministic and seeded. The same command gives byte-identical files, so a
// figure quoted in a lesson stays true and a guard can check it.
//
//   npm run data                     the full chain, one quarter
//   node scripts/generate-dataset.mjs --days 7      a week
//   node scripts/generate-dataset.mjs --branches 6  the named six only

import { createWriteStream, mkdirSync, statSync, readdirSync } from 'node:fs';
import { BRANCHES, PRODUCTS, CHAIN, FORMATS } from '../src/lib/game/superstore.js';
import { EMPLOYEES, ROLES } from '../src/lib/game/superstore-people.js';
import { COUNTRIES, INCOTERMS } from '../src/lib/game/superstore-world.js';
import { assignGeography, buildCommercial } from './data/commercial.mjs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : fallback;
};
const DAYS = arg('days', CHAIN.quarterDays);
const WANT_BRANCHES = arg('branches', CHAIN.branches);
const START = new Date(CHAIN.quarterStart + 'T00:00:00Z');
const OUT = new URL('../data/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

/* ── determinism ─────────────────────────────────────────────────────────── */
let seed = 0x9e3779b9;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pick = a => a[Math.floor(rnd() * a.length)];
const between = (lo, hi) => lo + rnd() * (hi - lo);
const chance = p => rnd() < p;

const day = n => new Date(START.getTime() + n * 86400000).toISOString().slice(0, 10);
const money = v => (Math.round(v * 100) / 100).toFixed(2);
const pad = (n, w = 2) => String(n).padStart(w, '0');
const clock = (h, m, s = 0) => `${pad(h)}:${pad(m)}:${pad(s)}`;
const stamp = (date, secs) =>
  `${date}T${clock(Math.floor(secs / 3600) % 24, Math.floor(secs / 60) % 60, Math.floor(secs) % 60)}Z`;

/* ── buffered csv, because four million single writes is not a plan ──────── */
mkdirSync(OUT, { recursive: true });
const open = (name, cols) => {
  const s = createWriteStream(OUT + name, { encoding: 'utf8' });
  let buf = cols.join(',') + '\n';
  return {
    name, rows: 0,
    row(cells) {
      buf += cells.join(',') + '\n';
      this.rows += 1;
      if (buf.length > 1 << 20) { s.write(buf); buf = ''; }
    },
    done() { return new Promise(r => { s.end(buf, r); }); }
  };
};

/* ── the estate: the named six, then the rest of the chain ───────────────── */
const TOWNS = ['Ashcombe', 'Barrowfield', 'Calderbrook', 'Denholm', 'Elmsworth', 'Fernhill',
  'Granshaw', 'Hollowdene', 'Ilbury', 'Jarrowmere', 'Kelsingham', 'Lowmoor', 'Marchbank',
  'Netherby', 'Oakhaven', 'Pentrewood', 'Quarrenden', 'Rosscarrick', 'Stanmoor', 'Thurlby',
  'Ullswick', 'Vanbrough', 'Westhaven', 'Yarrowdale', 'Alderney Cross', 'Brackenmoor',
  'Chalfont Rise', 'Draycott', 'Eastleigh Park', 'Fairwater', 'Glenmoor', 'Hartsmere',
  'Inglewood', 'Kirkbourne', 'Langmere', 'Morleyshaw', 'Northwold', 'Overstrand',
  'Priorsgate', 'Redlynch', 'Saltmarsh', 'Tarnside'];

const estate = [];
for (const b of BRANCHES) estate.push({ ...b, named: true });

const namedBy = f => BRANCHES.filter(b => b.format === f).length;
let nextBranch = 20, town = 0;
for (const f of FORMATS) {
  for (let i = namedBy(f.format); i < f.count; i++) {
    if (estate.length >= WANT_BRANCHES) break;
    estate.push({
      id: `B-${pad(nextBranch++)}`, name: TOWNS[town++ % TOWNS.length], format: f.format,
      transactions: Math.round(f.transactions * between(0.7, 1.3)),
      staff: Math.round(f.staff * between(0.8, 1.2)),
      tills: f.tills, opened: day(-Math.floor(between(400, 5200)))
    });
  }
}
for (const b of estate) if (!b.tills) b.tills = b.format === 'Superstore' ? 12 : b.format === 'Supermarket' ? 7 : 3;

/* ── the product master ──────────────────────────────────────────────────── */
const CATS = [
  ['CER', 'Cereal', 1.20, 4.80], ['DRK', 'Drinks', 0.55, 6.50], ['TIN', 'Tinned', 0.45, 2.90],
  ['DRY', 'Dry goods', 0.80, 7.20], ['CHL', 'Chilled', 0.95, 9.40], ['FRZ', 'Frozen', 1.10, 8.60],
  ['BAK', 'Bakery', 0.60, 4.20], ['PRO', 'Produce', 0.35, 5.50], ['HHD', 'Household', 0.90, 12.00],
  ['HBC', 'Health and beauty', 1.05, 14.50], ['PET', 'Pet', 0.75, 11.00], ['BWS', 'Beer wine spirits', 3.20, 38.00]
];
const NOUNS = ['Crunch', 'Bites', 'Rounds', 'Selection', 'Classic', 'Original', 'Reserve', 'Everyday',
  'Fresh', 'Crisp', 'Golden', 'Hearty', 'Simple', 'Choice', 'Harvest', 'Meadow', 'Orchard', 'Cottage'];
const KINDS = ['Flakes', 'Juice', 'Beans', 'Rice', 'Butter', 'Peas', 'Loaf', 'Apples', 'Cleaner',
  'Shampoo', 'Biscuits', 'Pasta', 'Sauce', 'Yoghurt', 'Cheese', 'Chicken', 'Coffee', 'Tea'];

// Some things are sold by weight: loose produce, bakery off the counter, deli
// cheese. Their price is per kilogram and the quantity on the receipt is a
// weight, which means the `quantity` column holds two different kinds of number
// depending on the row. That is not a flaw to be tidied away. It is the reason
// SUM(quantity) over a basket is meaningless, and it is in here on purpose.
const PER_KG = { Produce: [0.90, 4.60], Bakery: [2.80, 8.90], Chilled: [5.40, 23.00] };

const catalogue = PRODUCTS.map(p => ({ ...p, named: true, soldBy: 'each' }));
const seenSku = new Set(catalogue.map(p => p.sku));
let counter = 200;
while (catalogue.length < CHAIN.products) {
  const [code, category, lo, hi] = pick(CATS);
  const sku = `QX-${code}-${pad(counter++ % 1000, 3)}`;
  if (seenSku.has(sku)) continue;
  seenSku.add(sku);
  const loose = PER_KG[category] && chance(0.34);
  const [plo, phi] = loose ? PER_KG[category] : [lo, hi];
  catalogue.push({
    sku, name: `${pick(NOUNS)} ${pick(KINDS)}`, category,
    unit: loose ? 'per kg'
      : pick(['250 g', '400 g', '500 g', '750 g', '1 kg', '500 ml', '1 L', '2 L', '6 pack']),
    price: Math.round(between(plo, phi) * 100) / 100,
    chilled: ['Chilled', 'Frozen', 'Produce'].includes(category),
    soldBy: loose ? 'kg' : 'each'
  });
}
const weighed = catalogue.filter(p => p.soldBy === 'kg');
const unitPriced = catalogue.filter(p => p.soldBy === 'each');

/* ── suppliers ─────────────────────────────────────────────────────────────
   A supplier has a country, and its country has a currency, so a quote is not
   comparable with the quote next to it until you have converted one of them.
   The incoterm decides whether freight and duty are already inside the number,
   which is the second reason two quotes that look the same are not. */
const suppliers = [];
for (let i = 0; i < 42; i++) {
  const home = i < 18 ? COUNTRIES[0] : pick(COUNTRIES.filter(c => c.role === 'sourcing'));
  suppliers.push({
    id: `SUP-${pad(100 + i, 3)}`,
    name: `${pick(['Northern', 'Valley', 'Coastal', 'Meridian', 'Anchor', 'Harvest', 'Pinnacle', 'Crossfield'])} ${pick(['Foods', 'Produce', 'Distribution', 'Supply Co', 'Wholesale', 'Provisions'])}`,
    leadDays: Math.round(between(1, 9)), terms: pick(['30 days', '30 days', '45 days', '60 days']),
    country: home.id, currency: home.currency,
    incoterm: home.id === 'BR' ? 'DDP' : pick(INCOTERMS).id,
    risk: pick(['low', 'low', 'low', 'medium', 'medium', 'high'])
  });
}

/* ── files ───────────────────────────────────────────────────────────────── */
const f = {
  branch: open('branch.csv', ['branch_id', 'name', 'format', 'district_id', 'county_id', 'zone_id',
    'staff', 'tills', 'floor_sqm', 'car_park_spaces', 'catchment_population',
    'quarterly_transactions', 'opened', 'last_refit']),
  product: open('product.csv', ['sku', 'name', 'category', 'unit', 'list_price', 'sold_by',
    'brand_tier', 'own_label', 'kvi', 'commodity_id', 'origin_country_id', 'made_in_house', 'chilled']),
  supplier: open('supplier.csv', ['supplier_id', 'name', 'country_id', 'currency_code', 'incoterm',
    'lead_days', 'payment_terms', 'risk_rating']),
  till: open('till.csv', ['till_id', 'branch_id', 'till_number', 'kind']),
  employee: open('employee.csv', ['employee_id', 'employee_number', 'name', 'location_id', 'role', 'contract', 'weekly_hours', 'started', 'left']),
  customer: open('customer.csv', ['customer_id', 'loyalty_card', 'joined', 'home_branch_id', 'marketing_opt_in']),
  sale: open('sale.csv', ['sale_id', 'branch_id', 'till_id', 'business_date', 'employee_id', 'customer_id',
    'scan_started_at', 'scan_ended_at', 'payment_completed_at', 'items', 'basket_total', 'payment_method']),
  line: open('sale_line.csv', ['sale_id', 'line_no', 'sku', 'quantity', 'uom', 'unit_price', 'line_total', 'promotion_id']),
  ret: open('return.csv', ['return_id', 'sale_id', 'branch_id', 'returned_at', 'reason', 'refund_total']),
  retLine: open('return_line.csv', ['return_id', 'line_no', 'sku', 'returned_quantity', 'uom', 'refund_amount']),
  price: open('price_history.csv', ['sku', 'valid_from', 'valid_to', 'price']),
  promo: open('promotion.csv', ['promotion_id', 'name', 'mechanic', 'starts', 'ends']),
  promoProduct: open('promotion_product.csv', ['promotion_id', 'sku', 'discount_pct']),
  shipment: open('shipment.csv', ['shipment_id', 'supplier_id', 'branch_id', 'ordered_on', 'received_at', 'supplier_invoice_total']),
  shipmentLine: open('shipment_line.csv', ['shipment_id', 'line_no', 'sku', 'ordered_units', 'received_units']),
  order: open('customer_order.csv', ['order_id', 'branch_id', 'customer_id', 'placed_at', 'fulfilment_method', 'delivery_distance_km', 'order_total']),
  shift: open('employee_shift.csv', ['employee_id', 'branch_id', 'business_date', 'shift_start', 'shift_end']),
  stock: open('inventory_snapshot.csv', ['branch_id', 'snapshot_date', 'sku', 'closing_stock_units']),
  sensor: open('sensor_reading.csv', ['branch_id', 'sensor_id', 'reading_at', 'temperature_c']),
  footfall: open('footfall.csv', ['branch_id', 'business_date', 'hour', 'visitors'])
};

/* ── the world above the shop floor ────────────────────────────────────────
   Geography first, because a branch has to know its price zone before it can
   ring anything up, then the commercial estate, which enriches the catalogue
   with brand tier, origin, and the five prices every product has. The product
   master is written after that and not before. */
const ctx = {
  open, estate, catalogue, suppliers, DAYS, START,
  rnd, pick, between, chance, pad, money, day, stamp, clock
};
assignGeography(ctx);
const commercial = buildCommercial(ctx);

for (const b of estate)
  f.branch.row([b.id, `"${b.name}"`, b.format, b.district, b.county, b.zone, b.staff, b.tills,
    b.floorSqm, b.carPark, b.catchment, b.transactions, b.opened,
    b.refit === null ? '' : day(-b.refit)]);
for (const p of catalogue)
  f.product.row([p.sku, `"${p.name}"`, `"${p.category}"`, `"${p.unit}"`, money(p.price), p.soldBy,
    p.tier, p.ownLabel, p.kvi, p.commodity, p.origin, p.madeInHouse, p.chilled]);
for (const s of suppliers)
  f.supplier.row([s.id, `"${s.name}"`, s.country, s.currency, s.incoterm, s.leadDays,
    `"${s.terms}"`, s.risk]);

/* ── tills ───────────────────────────────────────────────────────────────── */
const tillsAt = new Map();
for (const b of estate) {
  const list = [];
  for (let n = 1; n <= b.tills; n++) {
    const kind = n > b.tills - 2 ? 'self-service' : n === 1 ? 'kiosk' : 'staffed';
    const id = `${b.id}-T${pad(n)}`;
    list.push({ id, kind });
    f.till.row([id, b.id, n, kind]);
  }
  tillsAt.set(b.id, list);
}

/* ── people ──────────────────────────────────────────────────────────────── */
const FIRST = ['Amara', 'Ben', 'Chloe', 'Dev', 'Esme', 'Femi', 'Greta', 'Hugo', 'Ines', 'Jonas', 'Kira',
  'Liam', 'Maya', 'Niall', 'Ola', 'Pia', 'Rosa', 'Sami', 'Tara', 'Uzo', 'Vera', 'Wren', 'Yusra', 'Zane'];
const LAST = ['Ashford', 'Beckett', 'Carvalho', 'Duarte', 'Ekwueme', 'Fenwick', 'Garrido', 'Haldane',
  'Ibarra', 'Jarrett', 'Kestrel', 'Lindgren', 'Novak', 'Ortiz', 'Pemberton', 'Quirke', 'Rashid', 'Slater'];

const staffAt = new Map();
for (const e of EMPLOYEES) {
  f.employee.row([e.id, e.number, `"${e.name}"`, e.location, e.role, e.contract, e.weeklyHours, e.started, e.left ?? '']);
  if (!staffAt.has(e.location)) staffAt.set(e.location, []);
  if (!e.left) staffAt.get(e.location).push(e.id);
}
let nextId = 800, nextNum = 700300;
const floorRoles = ROLES.filter(r => !r.salaried).map(r => r.id);
for (const b of estate) {
  const already = EMPLOYEES.filter(e => e.location === b.id).length;
  if (!staffAt.has(b.id)) staffAt.set(b.id, []);
  for (let i = already; i < b.staff; i++) {
    const id = `E-${nextId++}`;
    const gone = chance(0.1) ? day(Math.floor(between(20, DAYS))) : '';
    f.employee.row([id, String(nextNum++), `"${pick(FIRST)} ${pick(LAST)}"`, b.id, pick(floorRoles),
      pick(['permanent', 'permanent', 'fixed-term', 'casual']), pick([37.5, 37.5, 30, 24, 16, 12]),
      day(-Math.floor(between(30, 2000))), gone]);
    if (!gone) staffAt.get(b.id).push(id);
  }
}

/* ── loyalty ─────────────────────────────────────────────────────────────── */
const members = [];
const memberTarget = Math.round(estate.length * 2500);
for (let i = 0; i < memberTarget; i++) {
  const id = `C-${pad(100000 + i, 6)}`;
  const home = pick(estate).id;
  members.push({ id, home });
  f.customer.row([id, `9${pad(770000000 + i, 9)}`, day(-Math.floor(between(1, 2500))), home, chance(0.42)]);
}
ctx.staffAt = staffAt;   // the price checkers, once there are any

const membersAt = new Map();
for (const m of members) {
  if (!membersAt.has(m.home)) membersAt.set(m.home, []);
  membersAt.get(m.home).push(m.id);
}

/* ── price history and promotions ────────────────────────────────────────── */
// Roughly four or five price changes a product across its life, which is what
// makes product x price_history a fan-out rather than a lookup.
// Join Without Changing the Grain teaches product x price_history as 2,140 rows
// becoming 9,605, so the table is built to exactly that rather than to roughly
// it. A mission that quotes a number is a promise about the data.
const PRICE_ROWS = 9605;
// Shares are drawn freely and then corrected to the total, rather than clamped
// as they go. Clamping puts the whole rounding error on the last product, which
// would give one arbitrary sku a visible tail of price changes; nudging random
// products by one keeps the shape and still lands on the number exactly.
const shares = catalogue.map(() => Math.max(0, Math.round(between(1, 6))));
let drift = shares.reduce((n, v) => n + v, 0) - (PRICE_ROWS - catalogue.length);
while (drift !== 0) {
  const i = Math.floor(rnd() * shares.length);
  if (drift > 0 && shares[i] > 0) { shares[i] -= 1; drift -= 1; }
  else if (drift < 0) { shares[i] += 1; drift += 1; }
}
for (const [pi, p] of catalogue.entries()) {
  let from = day(-Math.floor(between(300, 900)));
  let price = p.price * between(0.82, 0.96);
  for (let c = 0; c < shares[pi]; c++) {
    const to = day(-Math.floor(between(1, 280)));
    f.price.row([p.sku, from, to < from ? from : to, money(price)]);
    from = to < from ? from : to;
    price *= between(1.01, 1.09);
  }
  f.price.row([p.sku, from, '', money(p.price)]);   // open-ended: the current price
}

const promos = [];
for (let i = 0; i < 63; i++) {
  const id = `PRM-${pad(i + 1, 3)}`;
  const start = Math.floor(between(-30, DAYS - 5));
  promos.push({ id, start, end: start + Math.round(between(7, 28)) });
  f.promo.row([id, `"${pick(['Weekly Deal', 'Two for', 'Meal Deal', 'Half Price', 'Bulk Buy', 'Seasonal'])} ${i + 1}"`,
    pick(['percent-off', 'multibuy', 'meal-deal', 'price-cut']), day(start), day(start + Math.round(between(7, 28)))]);
}
// Likewise promotion x promotion_product: 63 promotions covering exactly 1,874
// products, because that is the fan-out the mission asks a learner to predict.
const PROMO_LINKS = 1874;
let linkBudget = PROMO_LINKS;
for (const [i, pr] of promos.entries()) {
  const left = promos.length - i;
  const n = i === promos.length - 1 ? linkBudget
    : Math.max(1, Math.min(linkBudget - (left - 1), Math.round(between(12, 48))));
  linkBudget -= n;
  for (let k = 0; k < n; k++)
    f.promoProduct.row([pr.id, pick(catalogue).sku, Math.round(between(5, 40))]);
}

/* ── the twelve the missions teach from ──────────────────────────────────── */
const CANONICAL = [
  ['S-1041', 'B-17', '2026-05-04', 18.70], ['S-1042', 'B-17', '2026-05-04', 6.25],
  ['S-1043', 'B-08', '2026-05-04', 31.40], ['S-1044', 'B-17', '2026-05-05', 22.10],
  ['S-1045', 'B-02', '2026-05-05', 9.80], ['S-1046', 'B-08', '2026-05-05', 44.05],
  ['S-1047', 'B-17', '2026-05-05', 27.60], ['S-1048', 'B-02', '2026-05-06', 15.00],
  ['S-1049', 'B-08', '2026-05-06', 3.99], ['S-1050', 'B-17', '2026-05-06', 51.20],
  ['S-1051', 'B-17', '2026-05-06', 12.45], ['S-1052', 'B-02', '2026-05-06', 24.30]
];
const canonicalByDate = new Map();
for (const c of CANONICAL) {
  if (!canonicalByDate.has(c[2])) canonicalByDate.set(c[2], []);
  canonicalByDate.get(c[2]).push(c);
}

/* ── the quarter ─────────────────────────────────────────────────────────── */
let saleNo = 100000, returnNo = 1, shipNo = 1, orderNo = 1;

// The last few hundred baskets at each branch, so a return has a real receipt
// to point at. Yesterday's snapshot is what returns draw from, which is what
// makes a return land on a later day than the sale without having to check.
const recentAt = new Map(estate.map(b => [b.id, []]));
const yesterdayAt = new Map();

// A basket, and the time it took to put through a till. Scan duration is what
// makes a checkout measurable: items per minute, and the wait after the last
// item while somebody finds a card.
const writeSale = (id, b, date, total, tillList, staff, exact = false) => {
  const till = pick(tillList);
  const selfService = till.kind === 'self-service';

  // The basket is built before the header is written, because a basket total is
  // what the lines add up to rather than a number they are squeezed into. The
  // first version fitted lines to a target and clipped the last one, so quantity
  // times unit price stopped equalling the line total on a sixth of the rows,
  // and a seventh of baskets did not reconcile against their own lines.
  //
  // So an ordinary basket is filled towards its target and then totalled from
  // what is in it. About a third pick up something loose along the way, which is
  // where a weight in the quantity column comes from.
  const built = [];
  let sum = 0, items = 0;
  // The price is the zone's price, not the national list price, so the same SKU
  // rings through at different money in a Metro Express and a Value superstore.
  // "What does QX-CER-001 cost" is not a question with one answer.
  const shelf = p => commercial.zonePriceOf(p, b.zone);

  const add = p => {
    const unit = shelf(p);
    if (p.soldBy === 'kg') {
      const kg = Math.round(between(0.15, 2.2) * 1000) / 1000;
      const value = Math.round(unit * kg * 100) / 100;
      built.push({ sku: p.sku, qty: kg, uom: 'kg', price: unit, value });
      items += 1;
      return value;
    }
    const qty = Math.max(1, Math.round(between(1, 3)));
    const value = Math.round(unit * qty * 100) / 100;
    built.push({ sku: p.sku, qty, uom: 'unit', price: unit, value });
    items += qty;
    return value;
  };

  if (exact) {
    // The twelve sales the SQL Console teaches from have totals quoted in the
    // reading, so those baskets have to land on the penny. Filling with whole
    // units and closing on the scales is how a real receipt gets there.
    let remaining = total;
    while (remaining > 1.2 && built.length < 24) {
      let placed = false;
      for (let tries = 0; tries < 6 && !placed; tries++) {
        const p = pick(unitPriced);
        const qty = Math.max(1, Math.round(between(1, 3)));
        const value = Math.round(shelf(p) * qty * 100) / 100;
        if (value > remaining - 0.4) continue;      // leave room to weigh
        built.push({ sku: p.sku, qty, uom: 'unit', price: shelf(p), value });
        remaining = Math.round((remaining - value) * 100) / 100;
        items += qty;
        placed = true;
      }
      if (!placed) break;
    }
    if (remaining >= 0.05) {
      const usable = weighed.filter(p => shelf(p) * 6 >= remaining && shelf(p) * 0.04 <= remaining);
      const p = usable.length ? pick(usable) : weighed.reduce((a, c) => (shelf(c) > shelf(a) ? c : a));
      built.push({ sku: p.sku, qty: Math.round((remaining / shelf(p)) * 1000) / 1000, uom: 'kg', price: shelf(p), value: remaining });
      items += 1;
    }
    sum = total;
  } else {
    const ceiling = total * 1.6 + 3;      // one bottle of gin should not be the whole shop
    while (sum < total && built.length < 24) {
      let placed = false;
      for (let tries = 0; tries < 5 && !placed; tries++) {
        const p = pick(catalogue);
        const before = built.length;
        const value = add(p);
        if (sum + value > ceiling && built.length > 0 && before > 0) {
          const undone = built.pop();
          items -= undone.uom === 'kg' ? 1 : undone.qty;
          continue;
        }
        sum = Math.round((sum + value) * 100) / 100;
        placed = true;
      }
      if (!placed) break;
    }
    if (!built.length) sum = Math.round((sum + add(pick(catalogue))) * 100) / 100;
  }
  total = sum;

  const openHour = b.format === 'Express' ? 6 : 7;
  const startSec = Math.floor(between(openHour * 3600, 21.5 * 3600));
  // Self-service is slower per item and everybody knows it.
  const perItem = selfService ? between(3.4, 6.8) : between(1.1, 2.6);
  const scanSec = Math.max(8, items * perItem);
  const payMethod = pick(selfService ? ['card', 'card', 'card', 'mobile'] : ['card', 'card', 'cash', 'mobile']);
  const paySec = payMethod === 'cash' ? between(12, 40) : between(4, 17);

  const customer = chance(0.38) ? pick(membersAt.get(b.id) || [null]) : '';
  f.sale.row([id, b.id, till.id, date, pick(staff) ?? '', customer ?? '',
    stamp(date, startSec), stamp(date, startSec + scanSec), stamp(date, startSec + scanSec + paySec),
    items, money(total), payMethod]);

  built.forEach((l, i) =>
    f.line.row([id, i + 1, l.sku, l.qty, l.uom, money(l.price), money(l.value),
      chance(0.09) ? pick(promos).id : '']));

  // Kept so a return can cite goods that were genuinely on the receipt.
  const ring = recentAt.get(b.id);
  ring.push({ id, date, total, lines: built });
  if (ring.length > 300) ring.shift();
  return items;
};

for (let d = 0; d < DAYS; d++) {
  const date = day(d);
  const weekend = [0, 6].includes(new Date(date + 'T00:00:00Z').getUTCDay());

  for (const [id, branchId, , total] of canonicalByDate.get(date) || []) {
    const b = estate.find(x => x.id === branchId);
    writeSale(id, b, date, total, tillsAt.get(branchId), staffAt.get(branchId) || [], true);
  }

  for (const b of estate) {
    // 26 weekend days and 65 weekdays in a quarter, so the two multipliers have
    // to average to one or every branch overshoots its declared trade.
    const n = Math.round((b.transactions / CHAIN.quarterDays) * (weekend ? 1.35 : 0.86));
    const tillList = tillsAt.get(b.id);
    const staff = staffAt.get(b.id) || [];

    for (let i = 0; i < n; i++) {
      // Right-skewed: most baskets small, a long tail that drags the mean above
      // almost every actual basket. The Distribution Desk teaches this shape.
      const total = Math.round((2 + Math.pow(rnd(), 3) * 190) * 100) / 100;
      writeSale(`S-${saleNo++}`, b, date, total, tillList, staff);
    }

    // Returns. About one sale in eighty comes back, on a later day.
    //
    // A return has to cite a sale that happened, at this branch, for goods that
    // were on that receipt, for no more than was paid. The first version drew a
    // refund out of the air, so five and a half thousand of them gave back more
    // than the basket cost. Goods coming back that were never bought is exactly
    // the thing an analyst is meant to be able to find, so it must not be in
    // here by accident.
    const source = yesterdayAt.get(b.id) || [];
    const returns = source.length ? Math.round(n / 80) : 0;
    for (let i = 0; i < returns; i++) {
      const src = pick(source);
      const rid = `RET-${pad(returnNo++, 6)}`;
      const back = src.lines.filter(() => chance(0.55));
      const coming = back.length ? back : [src.lines[0]];
      let refund = 0;
      const rows = coming.map(l => {
        // You cannot bring back half a tin, but you can bring back the cheese.
        const qty = l.uom === 'kg' ? l.qty : Math.max(1, Math.round(between(1, l.qty)));
        const amount = l.uom === 'kg' ? l.value : Math.round(qty * l.price * 100) / 100;
        refund = Math.round((refund + amount) * 100) / 100;
        return [l.sku, qty, l.uom, amount];
      });
      f.ret.row([rid, src.id, b.id, stamp(date, Math.floor(between(9 * 3600, 19 * 3600))),
        pick(['faulty', 'unwanted', 'wrong item', 'damaged', 'expired']), money(refund)]);
      rows.forEach((r, l) => f.retLine.row([rid, l + 1, r[0], r[1], r[2], money(r[3])]));
    }
    yesterdayAt.set(b.id, recentAt.get(b.id).slice());

    // Deliveries in.
    if (chance(b.format === 'Express' ? 0.35 : 0.8)) {
      const sid = `SHP-${pad(shipNo++, 6)}`;
      const sup = pick(suppliers);
      const lines = Math.round(between(6, 40));
      let invoice = 0;
      for (let l = 1; l <= lines; l++) {
        const p = pick(catalogue);
        const ordered = Math.round(between(6, 120));
        // Short deliveries are normal and are why received is recorded separately.
        const received = chance(0.07) ? Math.round(ordered * between(0.4, 0.95)) : ordered;
        f.shipmentLine.row([sid, l, p.sku, ordered, received]);
        invoice += received * p.price * 0.62;
      }
      // The invoice sometimes has not arrived yet, which is chapter 03's pending.
      const invoiced = chance(0.06) ? '' : money(invoice);
      f.shipment.row([sid, sup.id, b.id, day(d - sup.leadDays),
        stamp(date, Math.floor(between(5 * 3600, 9 * 3600))), invoiced]);
    }

    // Online and click-and-collect. A pickup has no delivery distance, and that
    // absence is a not-applicable rather than a missing one.
    const orders = Math.round(n * 0.02);
    for (let i = 0; i < orders; i++) {
      const method = pick(['DELIVERY', 'DELIVERY', 'PICKUP']);
      f.order.row([`ORD-${pad(orderNo++, 6)}`, b.id, pick(membersAt.get(b.id) || ['']) ?? '',
        stamp(date, Math.floor(between(8 * 3600, 21 * 3600))), method,
        method === 'PICKUP' ? '' : money(between(0.4, 14)), money(between(15, 180))]);
    }

    // Rotas. Two shifts in one day is why employee_id alone does not identify a
    // row, which is what Table Grain is about.
    for (const e of staff) {
      if (!chance(0.55)) continue;
      const start = pick([6, 8, 8, 9, 12, 14, 22]);
      f.shift.row([e, b.id, date, clock(start, 0), clock((start + 8) % 24, 0)]);
      if (chance(0.04)) f.shift.row([e, b.id, date, clock((start + 9) % 24, 0), clock((start + 13) % 24, 0)]);
    }

    // Footfall, hourly, so a conversion rate has a denominator.
    for (let h = 7; h <= 21; h++)
      f.footfall.row([b.id, date, h, Math.round((n / 14) * between(0.5, 1.9) * between(1.4, 2.2))]);

    // Cold chain, hourly, with the occasional gap.
    for (let h = 0; h < 24; h++) {
      if (chance(0.01)) continue;
      f.sensor.row([b.id, `FZ-${1 + Math.floor(rnd() * 3)}`, `${date}T${clock(h, 0)}:00Z`, money(between(-21, -15))]);
    }

    // Markdowns, waste, and whatever the price checker found at Bergstrom.
    commercial.perBranchDay(b, date, n);
    if (d % 7 === 0) commercial.perWeekBranch(b, date, b.transactions / 13, n * 7);
  }

  // Central buying, the factories, and the estate that is still on its own
  // systems. None of these happen at a branch, which is the point of them.
  commercial.perDay(d, date);
  if (d % 7 === 0) commercial.perWeek(d, date);

  // Stock is counted weekly across the whole range, not daily: 48 branches by
  // 2,140 products by 91 days would be nine million rows of very little.
  if (d % 7 === 0) {
    for (const b of estate)
      for (const p of catalogue) {
        // About one count in forty never happened. Blank, not zero.
        f.stock.row([b.id, date, p.sku, chance(0.025) ? '' : Math.round(between(0, 240))]);
      }
  }
}

const files = [...Object.values(f), ...commercial.files];
await Promise.all(files.map(x => x.done()));

console.log(`\n  ${estate.length} branches · ${catalogue.length} products · ${DAYS} days from ${day(0)}\n`);
let total = 0, bytes = 0;
for (const x of files.sort((a, b) => b.rows - a.rows)) {
  const size = statSync(OUT + x.name).size;
  total += x.rows; bytes += size;
  console.log(`   ${x.name.padEnd(24)}${x.rows.toLocaleString().padStart(11)} rows   ${(size / 1048576).toFixed(1)} MB`);
}
console.log(`\n   ${'total'.padEnd(24)}${total.toLocaleString().padStart(11)} rows   ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`\n  ${readdirSync(OUT).filter(n => n.endsWith('.csv')).length} tables in data/ — gitignored, rebuild with npm run data\n`);
