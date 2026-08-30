// Walk session 2 → Read the Table → session 3, the way a learner walks it.
//
// Every part of this has been checked in isolation and the join is where it
// breaks: the mission records completion in one store and the briefing counts
// it in another, so for a while you could finish step 4 and watch the route
// still call it outstanding.
//
//   node scripts/check-chapter-one-path.mjs
//   node scripts/check-chapter-one-path.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e).slice(0, 140)));

const text = () => page.evaluate(() => document.body.innerText);

// Wait for the route header to actually render. A fixed pause was not enough on
// a cold navigation, and an empty page passes a "does not contain" check while
// failing every other one, which is the worst way for a check to lie.
const openBook = async path => {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => /\d+\s*\/\s*\d+\s*steps/i.test(document.body.innerText),
    { timeout: 25000 });
  await page.waitForTimeout(400);
};

/* Step 2 finished, nothing else. That is who arrives at session 2. */
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('qx.superstore.progress.v1',
    JSON.stringify({ completed: ['checkout'], started: new Date().toISOString() }));
});

/* ── session 2 ───────────────────────────────────────────────────────────── */
await openBook('/learn/data-foundations/chapter/1/session/2');
const s2 = await text();
ok('session 2 is Rows and columns', s2.includes('Rows and columns'));
ok('session 2 counts out of ten', /\/\s*10\s*steps/.test(s2), (s2.match(/\d+\s*\/\s*10\s*steps/) || [''])[0]);
ok('session 2 offers Read the Table', s2.includes('Read the Table'));
ok('session 2 no longer offers Classify Store Data', !s2.includes('Classify Store Data'));

const before = await page.evaluate(() =>
  (document.body.innerText.match(/(\d+)\s*\/\s*10\s*steps/) || [])[1]);

/* ── the mission ─────────────────────────────────────────────────────────── */
await page.goto(`${BASE}/academy/missions/read-the-table`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.option', { timeout: 20000 });
ok('the mission opens for somebody who finished step 2', !page.url().includes('locked='));

let decisions = 0;
for (let guard = 0; guard < 90 && !(await page.$('.done-card')); guard++) {
  if (await page.$eval('.advance', el => !el.disabled).catch(() => false)) {
    await page.click('.advance'); decisions++; await page.waitForTimeout(70); continue;
  }
  const options = await page.$$('.option:not([disabled])');
  if (!options.length) break;
  let moved = false;
  for (const option of options) {
    await option.click();
    await page.waitForTimeout(70);
    if (await page.$eval('.advance', el => !el.disabled).catch(() => false)) { moved = true; break; }
  }
  if (!moved) break;
}
ok('all eight decisions can be answered', decisions === 8, `${decisions} advanced`);
ok('the mission ends on its own summary', Boolean(await page.$('.done-card')));

const done = await text();
ok('the summary names observation and variable', /observation/i.test(done) && /variable/i.test(done));
ok('the summary offers the next session', done.includes('What one row represents'));

/* ── back to the route ───────────────────────────────────────────────────── */
await openBook('/learn/data-foundations/chapter/1/session/2');
const after = await page.evaluate(() =>
  (document.body.innerText.match(/(\d+)\s*\/\s*10\s*steps/) || [])[1]);
ok('finishing the mission advances the route counter', Number(after) > Number(before),
  `${before} / 10 before, ${after} / 10 after`);

/* ── session 3 ───────────────────────────────────────────────────────────── */
await openBook('/learn/data-foundations/chapter/1/session/3');
const s3 = await text();
ok('session 3 is reachable and is What one row represents',
  s3.includes('What one row represents'));
ok('session 3 counts on the same route', /\/\s*10\s*steps/.test(s3));

ok('no page errors anywhere on the path', errors.length === 0, errors.join(' | '));

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'the path holds'} against ${BASE}`);
process.exit(bad ? 1 : 0);
