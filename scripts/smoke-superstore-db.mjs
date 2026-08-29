// Prove the learner can really query the Superstore, in a real browser.
//
// A module that compiles is not a module that works. This one has three things
// that only fail at runtime: sql.js has to resolve its .wasm through Vite, the
// browser has to inflate a gzipped database with DecompressionStream, and SQLite
// has to answer a query the curriculum actually asks.
//
//   node scripts/smoke-superstore-db.mjs        (needs npm run dev running)

import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE || 'http://localhost:5173';

const browser = await chromium.launch();
const page = await browser.newPage();

const problems = [];
page.on('pageerror', e => problems.push(`page error: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });

await page.goto(BASE, { waitUntil: 'domcontentloaded' });

const result = await page.evaluate(async () => {
  const t0 = performance.now();
  const mod = await import('/src/lib/data/superstore.js');
  const loaded = Math.round(performance.now() - t0);

  const out = { loaded, checks: [] };
  const add = (label, pass, detail = '') => out.checks.push({ label, pass, detail });

  // The twelve sales the SQL Console teaches from must be queryable.
  const taught = await mod.query(
    "SELECT sale_id, branch_id, basket_total FROM sale WHERE sale_id = 'S-1041'");
  add('the taught sale is in the database', taught.ok && taught.rowCount === 1,
    taught.ok ? `£${taught.rows[0]?.basket_total}` : taught.error);

  // Arithmetic, which proves the columns are numbers and not strings.
  const sums = await mod.query(
    'SELECT COUNT(*) AS sales, ROUND(SUM(basket_total), 2) AS total FROM sale');
  add('numbers behave like numbers', sums.ok && typeof sums.rows[0].total === 'number',
    sums.ok ? `${sums.rows[0].sales} sales, £${sums.rows[0].total}` : sums.error);

  // The fan-out chapter 05 is about.
  const fan = await mod.query(
    'SELECT (SELECT COUNT(*) FROM sale) AS sales, COUNT(*) AS joined FROM sale JOIN sale_line USING (sale_id)');
  add('the join multiplies rows', fan.ok && fan.rows[0].joined > fan.rows[0].sales,
    fan.ok ? `${fan.rows[0].sales} becomes ${fan.rows[0].joined}` : fan.error);

  // Absence, which is the whole of chapter 03.
  const nulls = await mod.query(
    'SELECT COUNT(*) AS missing FROM inventory_snapshot WHERE closing_stock_units IS NULL');
  add('a blank stock count is NULL and IS NULL finds it', nulls.ok && nulls.rows[0].missing > 0,
    nulls.ok ? `${nulls.rows[0].missing} never happened` : nulls.error);

  // One product, five prices: the thing that has no single answer.
  const prices = await mod.query(
    "SELECT zone_id, price FROM zone_price WHERE sku = 'QX-CER-001' ORDER BY price");
  add('one product really does have five prices', prices.ok && prices.rowCount === 5,
    prices.ok ? prices.rows.map(r => `${r.zone_id} £${r.price}`).join('  ') : prices.error);

  // A wrong query has to come back as a message, not an explosion.
  const wrong = await mod.query('SELECT * FROM braches');
  add('a mistake is reported rather than thrown', wrong.ok === false && /braches/.test(wrong.error),
    wrong.error);

  const list = await mod.tables();
  add('all 54 tables are present', list.length === 54, `${list.length} tables`);

  return out;
});

console.log(`\n  module and database loaded in ${result.loaded} ms\n`);
let bad = 0;
for (const c of result.checks) {
  if (!c.pass) bad++;
  console.log(`   ${c.pass ? 'PASS' : '**FAIL**'}  ${c.label}${c.detail ? '  ' + c.detail : ''}`);
}
for (const p of problems) console.log(`   note   ${p}`);

await browser.close();
console.log(bad ? `\n  ${bad} problem(s)\n` : '\n  the learner can query the Superstore\n');
process.exit(bad ? 1 : 0);
