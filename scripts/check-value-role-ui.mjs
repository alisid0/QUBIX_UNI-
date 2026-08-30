// Session 3.02, driven the way a learner drives it.
//
// The order is what matters here. The learner says what the value does, and
// only then is the formal name shown. If the term appears before the decision,
// the activity has become vocabulary practice.
//
//   node scripts/check-value-role-ui.mjs
//   node scripts/check-value-role-ui.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
const PATH = '/learn/data-foundations/chapter/3/session/2';
const ANSWERS = [1, 0, 2, 1];
const EXPECT = [
  ['barcode', 'Nominal label'],
  ['satisfaction', 'Ordinal label'],
  ['items_in_basket', 'Discrete quantity'],
  ['delivery_minutes', 'Continuous quantity']
];

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();
const open = async page => {
  await page.goto(`${BASE}${PATH}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.value-role .choice', { timeout: 25000 });
  await page.waitForTimeout(300);
};

/* ── the four values, in order, with a wrong answer on the way ───────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 130)));
  await open(page);

  ok('no formal term is on screen before any decision',
    (await page.$$('.value-role .term')).length === 0);
  ok('the counter starts at one of four',
    (await page.textContent('.value-role .progress')).includes('1 of 4'));

  // A wrong answer on round one, deliberately.
  const first = await page.$$('.value-role .choice');
  await first[0].click();                       // "Measures an amount" — wrong for a barcode
  await page.waitForTimeout(200);
  ok('a wrong answer is marked and explained',
    Boolean(await page.$('.value-role .choice.wrong')) && Boolean(await page.$('.not-yet')));
  ok('a wrong answer does not reveal the term',
    (await page.$$('.value-role .term')).length === 0);
  ok('a wrong answer does not advance the round',
    (await page.textContent('.value-role .progress')).includes('1 of 4'));
  await page.click('.value-role .advance.retry');
  await page.waitForTimeout(200);
  ok('retry restores the choices', (await page.$$('.value-role .choice:not([disabled])')).length === 3);

  const seen = [];
  let advanced = 0;
  for (let i = 0; i < ANSWERS.length; i++) {
    const field = (await page.textContent('.value-role .cell span')).trim();
    const value = (await page.textContent('.value-role .cell b')).trim();
    seen.push(field);

    const choices = await page.$$('.value-role .choice');
    await choices[ANSWERS[i]].click();
    await page.waitForTimeout(220);

    const term = await page.textContent('.value-role .term b').catch(() => '');
    ok(`${field} = ${value}: named "${EXPECT[i][1]}" only after the decision`,
      term.trim() === EXPECT[i][1], term.trim() || '(no term shown)');

    if (i === 2) {
      ok('completion has not happened before the fourth value',
        !(await page.$('.exercise-feedback.success')));
    }
    const advance = await page.$('.value-role .advance:not(.retry)');
    if (!advance) break;
    await advance.click();
    advanced++;
    await page.waitForTimeout(250);
  }

  ok('all four values can be completed', advanced === 4, `${advanced} advanced`);
  ok('the four examples are barcode, satisfaction, basket size and delivery time',
    seen.join(',') === EXPECT.map(e => e[0]).join(','), seen.join(', '));
  await page.waitForTimeout(400);
  ok('completion is recorded only after the fourth value',
    Boolean(await page.$('.exercise-feedback.success')));
  ok('no page errors', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ── keyboard and 390px ──────────────────────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  await open(page);
  let ring = false;
  for (let press = 0; press < 60 && !ring; press++) {
    await page.keyboard.press('Tab');
    ring = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || !el.classList.contains('choice')) return false;
      const s = getComputedStyle(el);
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    });
  }
  ok('choices show a visible focus ring when tabbed to', ring);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(220);
  ok('a choice can be made with the keyboard',
    Boolean(await page.$('.value-role .choice.right, .value-role .choice.wrong')));
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await open(page);
  ok('no horizontal scrolling at 390px',
    !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)));
  const tiny = await page.$$eval('.value-role .choice, .value-role .question, .value-role .cell b',
    els => els.map(el => parseFloat(getComputedStyle(el).fontSize)).filter(px => px < 11));
  ok('nothing is under 11px', tiny.length === 0, tiny.join(', '));
  const small = await page.$$eval('.value-role .choice',
    els => els.map(el => el.getBoundingClientRect().height).filter(h => h < 44));
  ok('every choice is at least 44px tall', small.length === 0, small.map(Math.round).join(', '));
  await page.close();
}

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'} against ${BASE}`);
process.exit(bad ? 1 : 0);
