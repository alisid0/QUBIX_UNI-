// Build the quarter the world has always claimed to have.
//
// superstore.js says Northgate takes 60,000 transactions a quarter and the chain
// takes 151,300. Until now the largest table anywhere was twelve rows, so the
// fiction promised a supermarket chain and delivered a spreadsheet fragment.
// Nobody can practise SQL on twelve rows, sample from a population that does not
// exist, or open anything in Excel.
//
// The small tables stay. "What does one row represent" needs a table you can see
// all of, and twelve rows you can read is the point of that mission rather than a
// limitation of it. What was missing is the population underneath them.
//
// So this generates the quarter, and the twelve canonical sales are written into
// it verbatim at their real dates. The SQL Console's table is a genuine extract
// now rather than a parallel invention: S-1041 is in here, at Northgate, on
// 2026-05-04, for £18.70.
//
// Deterministic. The same seed gives byte-identical files every run, so a figure
// quoted in a lesson stays true and a guard can check it.
//
//   node scripts/generate-dataset.mjs           one quarter, ~600k rows
//   node scripts/generate-dataset.mjs --days 7  a week, for a quick look

import { createWriteStream, mkdirSync, statSync } from 'node:fs';
import { BRANCHES, PRODUCTS } from '../src/lib/game/superstore.js';
import { EMPLOYEES, ROLES } from '../src/lib/game/superstore-people.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : fallback;
};

const DAYS = arg('days', 91);
const START = new Date('2026-04-01T00:00:00Z');
const OUT = new URL('../data/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

/* ── determinism ─────────────────────────────────────────────────────────── */
// mulberry32: small, fast, and the same everywhere, which is the only property
// that matters here. Never Math.random: a dataset that changes under you cannot
// be quoted in a lesson.
let seed = 0x9e3779b9;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pick = a => a[Math.floor(rnd() * a.length)];
const between = (lo, hi) => lo + rnd() * (hi - lo);

const day = n => new Date(START.getTime() + n * 86400000).toISOString().slice(0, 10);
const money = v => (Math.round(v * 100) / 100).toFixed(2);
const clock = (h, m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

/* ── the twelve the missions already teach from ──────────────────────────── */
const CANONICAL = [
  ['S-1041', 'B-17', '2026-05-04', 18.70], ['S-1042', 'B-17', '2026-05-04', 6.25],
  ['S-1043', 'B-08', '2026-05-04', 31.40], ['S-1044', 'B-17', '2026-05-05', 22.10],
  ['S-1045', 'B-02', '2026-05-05', 9.80], ['S-1046', 'B-08', '2026-05-05', 44.05],
  ['S-1047', 'B-17', '2026-05-05', 27.60], ['S-1048', 'B-02', '2026-05-06', 15.00],
  ['S-1049', 'B-08', '2026-05-06', 3.99], ['S-1050', 'B-17', '2026-05-06', 51.20],
  ['S-1051', 'B-17', '2026-05-06', 12.45], ['S-1052', 'B-02', '2026-05-06', 24.30]
];

mkdirSync(OUT, { recursive: true });
const open = name => {
  const s = createWriteStream(OUT + name, { encoding: 'utf8' });
  return {
    name,
    rows: 0,
    head(cols) { s.write(cols.join(',') + '\n'); return this; },
    row(cells) { s.write(cells.join(',') + '\n'); this.rows += 1; },
    done() { return new Promise(r => s.end(r)); }
  };
};

/* ── reference tables ────────────────────────────────────────────────────── */
const fBranch = open('branch.csv').head(['branch_id', 'name', 'format', 'staff', 'opened']);
for (const b of BRANCHES) fBranch.row([b.id, b.name, b.format, b.staff, b.opened]);

const fProduct = open('product.csv').head(['sku', 'name', 'category', 'unit', 'price', 'chilled']);
for (const p of PRODUCTS) fProduct.row([p.sku, `"${p.name}"`, p.category, `"${p.unit}"`, money(p.price), p.chilled]);

/* ── people: the named twenty, then the rest of the headcount ────────────── */
const FIRST = ['Amara', 'Ben', 'Chloe', 'Dev', 'Esme', 'Femi', 'Greta', 'Hugo', 'Ines', 'Jonas',
  'Kira', 'Liam', 'Maya', 'Niall', 'Ola', 'Pia', 'Quentin', 'Rosa', 'Sami', 'Tara', 'Uzo', 'Vera'];
const LAST = ['Ashford', 'Beckett', 'Carvalho', 'Duarte', 'Ekwueme', 'Fenwick', 'Garrido', 'Haldane',
  'Ibarra', 'Jarrett', 'Kestrel', 'Lindgren', 'Морозов'.normalize(), 'Novak', 'Ortiz', 'Pemberton'];

const fEmployee = open('employee.csv')
  .head(['employee_id', 'employee_number', 'name', 'location_id', 'role', 'contract', 'weekly_hours', 'started', 'left']);
const roster = [];
for (const e of EMPLOYEES) {
  fEmployee.row([e.id, e.number, `"${e.name}"`, e.location, e.role, e.contract, e.weeklyHours, e.started, e.left ?? '']);
  roster.push({ id: e.id, location: e.location, hours: e.weeklyHours, left: e.left });
}
let nextId = 800, nextNum = 700300;
for (const b of BRANCHES) {
  const already = EMPLOYEES.filter(e => e.location === b.id).length;
  for (let i = already; i < b.staff; i++) {
    const id = `E-${nextId++}`, num = String(nextNum++);
    const r = pick(ROLES.filter(x => !x.salaried)).id;
    const hours = pick([37.5, 37.5, 30, 24, 16, 12]);
    // A tenth of the chain left during the quarter, which is what makes
    // headcount a question rather than a row count.
    const gone = rnd() < 0.1 ? day(Math.floor(between(20, DAYS))) : '';
    fEmployee.row([id, num, `"${pick(FIRST)} ${pick(LAST)}"`, b.id, r, pick(['permanent', 'permanent', 'fixed-term', 'casual']),
      hours, day(-Math.floor(between(30, 2000))), gone]);
    roster.push({ id, location: b.id, hours, left: gone || null });
  }
}

/* ── the quarter ─────────────────────────────────────────────────────────── */
const fSale = open('sale.csv').head(['sale_id', 'branch_id', 'business_date', 'started_at', 'employee_id', 'basket_total', 'payment_method']);
const fLine = open('sale_line.csv').head(['sale_id', 'line_no', 'sku', 'quantity', 'unit_price', 'line_total']);
const fShift = open('employee_shift.csv').head(['employee_id', 'branch_id', 'business_date', 'shift_start', 'shift_end']);
const fStock = open('inventory_snapshot.csv').head(['branch_id', 'snapshot_date', 'sku', 'closing_stock_units']);
const fSensor = open('sensor_reading.csv').head(['branch_id', 'sensor_id', 'reading_at', 'temperature_c']);

const canonicalByDate = new Map();
for (const c of CANONICAL) {
  if (!canonicalByDate.has(c[2])) canonicalByDate.set(c[2], []);
  canonicalByDate.get(c[2]).push(c);
}

let saleNo = 2000;   // the canonical dozen own 1041–1052, so start clear of them
const perDay = b => b.transactions / 91;

for (let d = 0; d < DAYS; d++) {
  const date = day(d);
  const weekend = [0, 6].includes(new Date(date + 'T00:00:00Z').getUTCDay());

  // Sales that a mission already teaches from, written in as themselves.
  for (const [id, branchId, , total] of canonicalByDate.get(date) || []) {
    const staff = roster.filter(e => e.location === branchId && !e.left);
    fSale.row([id, branchId, date, clock(Math.floor(between(8, 20)), Math.floor(between(0, 60))),
      pick(staff)?.id ?? '', money(total), pick(['card', 'card', 'cash', 'mobile'])]);
    let remaining = total, line = 1;
    while (remaining > 0.5 && line <= 6) {
      const p = pick(PRODUCTS);
      const qty = Math.max(1, Math.round(between(1, 3)));
      const value = Math.min(remaining, p.price * qty);
      fLine.row([id, line++, p.sku, qty, money(p.price), money(value)]);
      remaining -= value;
    }
  }

  for (const b of BRANCHES) {
    // 26 weekend days and 65 weekdays in the quarter, so the two multipliers
    // have to average to 1 or the branch overshoots its declared volume.
    const n = Math.round(perDay(b) * (weekend ? 1.35 : 0.86));
    const staff = roster.filter(e => e.location === b.id && !e.left);

    for (let i = 0; i < n; i++) {
      const id = `S-${saleNo++}`;
      // Right-skewed, which is what the Distribution Desk teaches about baskets:
      // most under £30, a long tail that drags the mean above almost every one.
      const total = Math.round((2 + Math.pow(rnd(), 3) * 190) * 100) / 100;
      const hour = weekend ? Math.floor(between(9, 19)) : pick([8, 12, 12, 17, 17, 18, 18, 19]);
      fSale.row([id, b.id, date, clock(hour, Math.floor(between(0, 60))),
        pick(staff)?.id ?? '', money(total), pick(['card', 'card', 'card', 'cash', 'mobile'])]);

      let remaining = total, line = 1;
      while (remaining > 0.5 && line <= 9) {
        const p = pick(PRODUCTS);
        const qty = Math.max(1, Math.round(between(1, 4)));
        const value = Math.min(remaining, p.price * qty);
        fLine.row([id, line++, p.sku, qty, money(p.price), money(value)]);
        remaining -= value;
      }
    }

    // Rotas. Somebody working two shifts in a day is why employee_id alone does
    // not identify a row, which is exactly what Table Grain teaches.
    for (const e of staff) {
      if (rnd() > e.hours / 45) continue;
      const start = pick([6, 8, 8, 9, 12, 14, 22]);
      fShift.row([e.id, b.id, date, clock(start, 0), clock((start + 8) % 24, 0)]);
      if (rnd() < 0.04) fShift.row([e.id, b.id, date, clock((start + 9) % 24, 0), clock((start + 13) % 24, 0)]);
    }

    // Closing stock. Roughly one count in forty never happened, which is the
    // absence the whole of chapter 03 is about. It is blank, not zero.
    for (const p of PRODUCTS) {
      const missed = rnd() < 0.025;
      fStock.row([b.id, date, p.sku, missed ? '' : Math.round(between(0, 240))]);
    }

    // Cold chain, hourly. A short gap now and then, for the same reason.
    for (let h = 0; h < 24; h++) {
      if (rnd() < 0.01) continue;
      fSensor.row([b.id, `FZ-${1 + Math.floor(rnd() * 3)}`, `${date}T${clock(h, 0)}:00Z`,
        money(between(-21, -15))]);
    }
  }
}

const files = [fBranch, fProduct, fEmployee, fSale, fLine, fShift, fStock, fSensor];
await Promise.all(files.map(f => f.done()));

console.log(`\n  ${DAYS} days from ${day(0)} to ${day(DAYS - 1)}\n`);
let total = 0, bytes = 0;
for (const f of files) {
  const size = statSync(OUT + f.name).size;
  total += f.rows; bytes += size;
  console.log(`   ${f.name.padEnd(24)}${f.rows.toLocaleString().padStart(10)} rows   ${(size / 1048576).toFixed(1)} MB`);
}
console.log(`\n   ${'total'.padEnd(24)}${total.toLocaleString().padStart(10)} rows   ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`\n  written to data/ — gitignored, rebuild with npm run data\n`);
