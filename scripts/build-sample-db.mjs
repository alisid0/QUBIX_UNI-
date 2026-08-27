// Turn the committed sample into a SQLite database the browser can open.
//
// data-sample/ is 54 CSVs. Parsing those in the browser on every page load would
// be slow, and worse, it would leave the learner querying strings: everything
// would be TEXT, SUM would concatenate, and `> 20` would compare lexically. So
// the database is built here, once, and shipped as a file sql.js opens directly.
//
// Two decisions matter more than they look:
//
//   A blank cell becomes NULL, not an empty string. Three chapters teach that an
//   empty stock count is an absence rather than a zero, and `IS NULL` has to be
//   the thing that finds it. Importing '' would make those lessons untrue.
//
//   Identifier columns stay TEXT even when they look numeric. A payroll number
//   is not a quantity, nobody sums it, and a join has to compare like with like.
//
//   npm run data:db

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import initSqlJs from 'sql.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = dir('../data-sample/');
const OUT = dir('../public/data/');

/* ── CSV, properly ─────────────────────────────────────────────────────────
   price_zone.csv has "City centre, short opening, high rent, low basket." in a
   quoted field, so splitting on commas loses three columns and shifts the rest. */
function parseLine(line) {
  const out = [];
  let field = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { out.push(field); field = ''; }
    else field += c;
  }
  out.push(field);
  return out;
}

/* ── types ─────────────────────────────────────────────────────────────────
   Inferred from the values, except where the column name says the value is a
   label that happens to be spelled with digits. */
const TEXT_BY_NAME = /(_id|_no|_number|_code|^sku$|_card|_month|_date|_at|_from|_to|^opened$|^left$|^started$|^acquired$|^commissioned$)/;
const INT = /^-?\d+$/;
const REAL = /^-?\d+\.\d+$/;

function typeFor(name, values) {
  if (TEXT_BY_NAME.test(name)) return 'TEXT';
  const seen = values.filter(v => v !== '');
  if (!seen.length) return 'TEXT';
  if (seen.every(v => INT.test(v))) return 'INTEGER';
  if (seen.every(v => INT.test(v) || REAL.test(v))) return 'REAL';
  return 'TEXT';
}

/* ── build ─────────────────────────────────────────────────────────────────── */
const SQL = await initSqlJs();
const db = new SQL.Database();
db.run('PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;');

const tables = readdirSync(SRC).filter(n => n.endsWith('.csv')).sort();
let totalRows = 0;
const summary = [];

for (const file of tables) {
  const name = file.replace(/\.csv$/, '');
  const lines = readFileSync(SRC + file, 'utf8').trim().split(/\r?\n/);
  const cols = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);

  const types = cols.map((c, i) => typeFor(c, rows.map(r => r[i] ?? '')));
  db.run(`CREATE TABLE "${name}" (${cols.map((c, i) => `"${c}" ${types[i]}`).join(', ')});`);

  const stmt = db.prepare(
    `INSERT INTO "${name}" VALUES (${cols.map(() => '?').join(', ')});`);
  db.run('BEGIN;');
  for (const row of rows) {
    stmt.run(cols.map((_, i) => {
      const raw = row[i] ?? '';
      if (raw === '') return null;                 // absence, not an empty string
      if (types[i] === 'INTEGER') return Number(raw);
      if (types[i] === 'REAL') return Number(raw);
      return raw;
    }));
  }
  db.run('COMMIT;');
  stmt.free();

  totalRows += rows.length;
  summary.push([name, rows.length]);
}

/* ── the joins a learner will actually write ─────────────────────────────── */
const INDEXES = [
  ['sale_line', 'sale_id'], ['sale', 'branch_id'], ['sale', 'till_id'],
  ['sale', 'business_date'], ['sale_line', 'sku'], ['zone_price', 'sku'],
  ['zone_price', 'zone_id'], ['branch', 'zone_id'], ['branch', 'district_id'],
  ['branch', 'county_id'], ['supplier_quote', 'sku'], ['competitor_price_check', 'branch_id'],
  ['markdown', 'branch_id'], ['inventory_snapshot', 'branch_id'], ['waste', 'branch_id']
];
for (const [table, col] of INDEXES)
  db.run(`CREATE INDEX IF NOT EXISTS "ix_${table}_${col}" ON "${table}" ("${col}");`);

/* ── verify before shipping ────────────────────────────────────────────────
   The database is the thing a lesson queries, so the things a lesson promises
   have to be true of it, not merely of the CSVs it came from. */
const one = sql => { const r = db.exec(sql); return r.length ? r[0].values[0][0] : null; };

const checks = [
  ['every table arrived', tables.length === 54, `${tables.length} tables`],
  ['S-1041 is in the sale table',
    one("SELECT COUNT(*) FROM sale WHERE sale_id = 'S-1041'") === 1],
  ['and it still costs 18.70',
    Math.abs(one("SELECT basket_total FROM sale WHERE sale_id = 'S-1041'") - 18.7) < 0.005],
  ['basket_total is a number, so it sums',
    typeof one('SELECT SUM(basket_total) FROM sale') === 'number'],
  ['blank stock counts are NULL, not empty text',
    one('SELECT COUNT(*) FROM inventory_snapshot WHERE closing_stock_units IS NULL') > 0],
  ['and none of them arrived as an empty string',
    one("SELECT COUNT(*) FROM inventory_snapshot WHERE closing_stock_units = ''") === 0],
  ['collection orders have a NULL distance',
    one("SELECT COUNT(*) FROM customer_order WHERE fulfilment_method = 'PICKUP' AND delivery_distance_km IS NULL") > 0],
  ['a sku is text, not a number',
    typeof one('SELECT sku FROM product LIMIT 1') === 'string'],
  ['the price_zone note survived its commas',
    String(one("SELECT note FROM price_zone WHERE zone_id = 'PZ-METRO'")).includes(',')],
  ['the join still fans out',
    one('SELECT COUNT(*) FROM sale JOIN sale_line USING (sale_id)') > one('SELECT COUNT(*) FROM sale')]
];

let bad = 0;
console.log('');
for (const [label, pass, detail] of checks) {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
}
if (bad) { console.error(`\n  ${bad} problem(s); nothing written\n`); process.exit(1); }

/* ── write ─────────────────────────────────────────────────────────────────── */
mkdirSync(OUT, { recursive: true });
const bytes = Buffer.from(db.export());
writeFileSync(OUT + 'qubix-sample.db', bytes);
const gz = gzipSync(bytes, { level: 9 });
writeFileSync(OUT + 'qubix-sample.db.gz', gz);
db.close();

const mb = n => (n / 1048576).toFixed(2) + ' MB';
const csv = tables.reduce((n, f) => n + statSync(SRC + f).size, 0);
console.log(`\n  ${tables.length} tables, ${totalRows.toLocaleString()} rows`);
console.log(`   ${'source CSVs'.padEnd(18)}${mb(csv).padStart(9)}`);
console.log(`   ${'database'.padEnd(18)}${mb(bytes.length).padStart(9)}`);
console.log(`   ${'shipped (gzip)'.padEnd(18)}${mb(gz.length).padStart(9)}   ${(100 - gz.length / bytes.length * 100).toFixed(0)}% smaller`);
console.log(`\n  public/data/qubix-sample.db.gz\n`);
