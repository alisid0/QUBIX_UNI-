// Chapter 8 quotes the Superstore. Keep it true.
//
// This guard exists because the chapter was drafted with invented figures and
// every one of them was wrong. The example table claimed the chance of a basket
// over twenty pounds changed from 0.35 to 0.39 to 0.22 across four subsets. In
// the data it is 0.60 for all four, because basket size does not vary by branch
// or till kind, so the example was illustrating an effect the dataset does not
// contain. A learner is two clicks from the console and would have found that.
//
// The rewritten example uses cash payment, which genuinely does vary: 0.19
// across the chain, 0.25 at staffed tills and exactly zero at self-service,
// because those machines take no notes. That last one also carries the
// independence point in the same session, so if it ever stopped being true the
// prose would be wrong twice.
//
//   node scripts/check-chance-figures.mjs

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import initSqlJs from 'sql.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';

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
const pair = sql => db.exec(sql)[0].values[0];

const chapter = SHARED_FOUNDATIONS.find(c => c.chapter === 8);
check(Boolean(chapter), 'chapter 8 is in the volume');
const session = chapter?.book.sessions.find(s => s.id === 'probability-as-proportion');
check(Boolean(session), 'and its first session is the one this guard reads');
if (!session) { process.exit(1); }

/* ── the four rows of the example table ──────────────────────────────────── */
const WHERE = {
  'Every sale in the window': '1 = 1',
  'Staffed tills only': "till_id IN (SELECT till_id FROM till WHERE kind = 'staffed')",
  'Kiosk tills only': "till_id IN (SELECT till_id FROM till WHERE kind = 'kiosk')",
  'Self-service tills only': "till_id IN (SELECT till_id FROM till WHERE kind = 'self-service')"
};

const num = value => Number(String(value).replace(/,/g, ''));

for (const row of session.example.rows) {
  const [label, cash, counted, probability] = row;
  const where = WHERE[label];
  check(Boolean(where), `the table row "${label}" is one this guard knows how to verify`);
  if (!where) continue;

  const [actualCash, actualCounted] = pair(
    `SELECT SUM(CASE WHEN payment_method = 'cash' THEN 1 ELSE 0 END), COUNT(*)
     FROM sale WHERE ${where}`);
  const actualProbability = (actualCash / actualCounted).toFixed(2);

  check(num(cash) === actualCash && num(counted) === actualCounted,
    `${label}: the counts are the ones in the database`,
    `${actualCash} of ${actualCounted} in the data, ${cash} of ${counted} in the chapter`);
  check(probability === actualProbability,
    `${label}: and the probability is ${actualProbability}`,
    `${actualProbability} in the data, ${probability} in the chapter`);
}

/* ── the two claims the prose makes on top of the table ──────────────────── */
const selfServiceCash = pair(
  `SELECT SUM(CASE WHEN payment_method = 'cash' THEN 1 ELSE 0 END), COUNT(*)
   FROM sale WHERE till_id IN (SELECT till_id FROM till WHERE kind = 'self-service')`);
check(selfServiceCash[0] === 0 && selfServiceCash[1] > 0,
  'no self-service sale is paid in cash, which the independence section depends on',
  `${selfServiceCash[0]} of ${selfServiceCash[1]}`);

const chainRate = pair(`SELECT SUM(CASE WHEN payment_method = 'cash' THEN 1 ELSE 0 END), COUNT(*) FROM sale`);
const staffedRate = pair(
  `SELECT SUM(CASE WHEN payment_method = 'cash' THEN 1 ELSE 0 END), COUNT(*)
   FROM sale WHERE till_id IN (SELECT till_id FROM till WHERE kind = 'staffed')`);
check((staffedRate[0] / staffedRate[1]) > (chainRate[0] / chainRate[1]),
  'the staffed-till figure is still above the chain figure, as the check question says',
  `${(staffedRate[0] / staffedRate[1]).toFixed(2)} against ${(chainRate[0] / chainRate[1]).toFixed(2)}`);

/* ── the sale count the opening paragraph quotes ─────────────────────────── */
const total = pair('SELECT COUNT(*), COUNT(*) FROM sale')[0];
const quotesTotal = JSON.stringify(session.sections).includes(total.toLocaleString('en-GB'));
check(quotesTotal, 'the opening still quotes the number of sales the database holds',
  `${total.toLocaleString('en-GB')}`);

db.close();
console.log(failed
  ? '\n  chapter 8 is quoting figures the database does not have\n'
  : '\n  chapter 8 and the database agree\n');
process.exit(failed ? 1 : 0);
