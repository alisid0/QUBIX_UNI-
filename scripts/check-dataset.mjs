// The generated quarter must be a dataset, not a pile of plausible rows.
//
// A generator is easy to write and easy to get subtly wrong: a foreign key that
// points at nobody, a branch that quietly takes twice its declared trade, a
// basket distribution that comes out symmetrical when three chapters teach that
// it is not. None of that is visible by looking at the first ten rows, which is
// all anybody ever looks at.
//
// It also checks the join between the generated data and the taught data. The
// SQL Console's twelve sales are supposed to be a genuine extract of this
// quarter; if they drift apart, the reading and the dataset teach different
// things about the same shop.
//
// The data is gitignored, so a week is generated when it is missing.
//
//   npm run check:dataset

import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { BRANCHES } from '../src/lib/game/superstore.js';
import { SALES } from '../src/lib/game/sql-console-mission.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DATA = dir('../data/');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

if (!existsSync(DATA + 'sale.csv')) {
  console.log('   no data/ yet, generating a week to check against\n');
  execFileSync(process.execPath, [dir('./generate-dataset.mjs'), '--days', '7'], { stdio: 'ignore' });
}

const read = name => {
  const lines = readFileSync(DATA + name, 'utf8').trim().split('\n');
  const cols = lines[0].split(',');
  return { cols, rows: lines.slice(1), n: lines.length - 1 };
};

const sale = read('sale.csv');
const line = read('sale_line.csv');
const stock = read('inventory_snapshot.csv');
const staff = read('employee.csv');

const col = (t, name) => t.cols.indexOf(name);
const field = (row, i) => row.split(',')[i];

/* ── referential integrity ──────────────────────────────────────────────── */
const saleIds = new Set(sale.rows.map(r => field(r, col(sale, 'sale_id'))));
const employeeIds = new Set(staff.rows.map(r => field(r, col(staff, 'employee_id'))));
const branchIds = new Set(BRANCHES.map(b => b.id));

const orphanLines = line.rows.filter(r => !saleIds.has(field(r, col(line, 'sale_id')))).length;
ok('every sale_line belongs to a sale', orphanLines === 0,
  orphanLines ? `${orphanLines.toLocaleString()} orphans` : `${line.n.toLocaleString()} lines`);

const badBranch = sale.rows.filter(r => !branchIds.has(field(r, col(sale, 'branch_id')))).length;
ok('every sale happened at a real branch', badBranch === 0, `${sale.n.toLocaleString()} sales`);

const badStaff = sale.rows.filter(r => {
  const e = field(r, col(sale, 'employee_id'));
  return e && !employeeIds.has(e);
}).length;
ok('every sale was rung up by somebody on the payroll', badStaff === 0);

/* ── the taught twelve must be in the population ────────────────────────── */
const byId = new Map(sale.rows.map(r => [field(r, col(sale, 'sale_id')), r]));
const missing = [], wrong = [];
for (const s of SALES) {
  const row = byId.get(s.sale_id);
  if (!row) { missing.push(s.sale_id); continue; }
  const gotBranch = field(row, col(sale, 'branch_id'));
  const gotTotal = Number(field(row, col(sale, 'basket_total')));
  const gotDate = field(row, col(sale, 'business_date'));
  if (gotBranch !== s.branch_id || gotDate !== s.business_date || Math.abs(gotTotal - s.basket_total) > 0.005)
    wrong.push(`${s.sale_id}: ${gotBranch} ${gotDate} ${gotTotal} against ${s.branch_id} ${s.business_date} ${s.basket_total}`);
}
ok('the SQL Console\'s sales are in the quarter', missing.length === 0,
  missing.length ? `absent: ${missing.join(', ')}` : `all ${SALES.length}`);
ok('and they say the same thing in both places', wrong.length === 0, wrong.slice(0, 2).join(' · '));

/* ── volumes match what the world declares ──────────────────────────────── */
const counted = {};
for (const r of sale.rows) {
  const b = field(r, col(sale, 'branch_id'));
  counted[b] = (counted[b] || 0) + 1;
}
const full = sale.n > 100000;   // a full quarter, rather than the week sample
if (full) {
  for (const b of BRANCHES) {
    const got = counted[b.id] || 0;
    const off = Math.abs(got - b.transactions) / b.transactions;
    ok(`${b.name} takes about the trade it claims`, off < 0.03,
      `${got.toLocaleString()} against ${b.transactions.toLocaleString()} declared`);
  }
} else {
  console.log('   (week sample: branch volumes checked only on a full quarter)');
}

/* ── the shape three chapters teach ─────────────────────────────────────── */
const totals = sale.rows.map(r => Number(field(r, col(sale, 'basket_total')))).sort((a, b) => a - b);
const mean = totals.reduce((n, v) => n + v, 0) / totals.length;
const median = totals[Math.floor(totals.length / 2)];
ok('baskets are right-skewed, as the Distribution Desk says', mean > median * 1.3,
  `mean ${mean.toFixed(2)} against median ${median.toFixed(2)}`);

/* ── absence is present, because chapter 03 needs it ────────────────────── */
const blanks = stock.rows.filter(r => field(r, col(stock, 'closing_stock_units')) === '').length;
const rate = blanks / stock.n;
ok('some stock counts never happened', blanks > 0 && rate < 0.1,
  `${blanks} of ${stock.n.toLocaleString()} blank (${(rate * 100).toFixed(1)}%)`);

const leavers = staff.rows.filter(r => field(r, col(staff, 'left')) !== '').length;
ok('some colleagues have left, so headcount needs a condition', leavers > 0,
  `${leavers} of ${staff.n} have a leaving date`);

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}`
  + `, ${(sale.n + line.n + stock.n + staff.n).toLocaleString()} rows inspected`);
process.exit(bad ? 1 : 0);
