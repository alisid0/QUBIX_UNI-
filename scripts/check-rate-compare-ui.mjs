// Session 2.02, driven the way a learner drives it.
//
// The rates must stay hidden until a decision is made. That is the activity:
// two counts and two totals on screen, and the question is which is
// proportionally larger. If the percentages are visible first there is nothing
// to decide, so concealment is checked before anything else.
//
//   node scripts/check-rate-compare-ui.mjs
//   node scripts/check-rate-compare-ui.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
const PATH = '/learn/data-foundations/chapter/2/session/2';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();

const open = async page => {
  await page.goto(`${BASE}${PATH}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.rate-compare .choice', { timeout: 25000 });
  await page.waitForTimeout(300);
};

/* ── the activity itself ─────────────────────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 130)));
  await open(page);

  ok('the rate is concealed before any decision',
    (await page.$$('.rate-compare .reveal')).length === 0
    && (await page.$$('.rate-compare .hidden-note')).length === 2);

  ok('the comparison counter starts at one of three',
    (await page.textContent('.rate-compare .progress')).includes('1 of 3'));

  // A wrong answer first, deliberately. Round one's answer is the first branch.
  const first = await page.$$('.rate-compare .choice');
  await first[2].click();                       // "The rates are equal" — wrong here
  await page.waitForTimeout(200);
  ok('a wrong answer is marked and explained',
    Boolean(await page.$('.rate-compare .choice.wrong')) && Boolean(await page.$('.not-yet')));
  ok('a wrong answer does not advance the round',
    (await page.textContent('.rate-compare .progress')).includes('1 of 3'));
  ok('a wrong answer offers a retry rather than a dead end',
    Boolean(await page.$('.rate-compare .advance.retry')));

  await page.click('.rate-compare .advance.retry');
  await page.waitForTimeout(200);
  ok('retrying hides the rates again, so it stays a judgement',
    (await page.$$('.rate-compare .reveal')).length === 0);

  // Now play it properly, choosing correctly each round.
  const answers = [0, 1, 2];
  let advanced = 0;
  for (const answer of answers) {
    const choices = await page.$$('.rate-compare .choice');
    await choices[answer].click();
    await page.waitForTimeout(220);
    if (answer === 0) {
      const feedback = await page.textContent('.rate-compare .good');
      ok('feedback compares the numerator with its own denominator',
        /12\.5/.test(feedback) && /11\.7/.test(feedback), feedback.slice(0, 70) + '…');
      ok('the rate is revealed only after deciding',
        (await page.$$('.rate-compare .reveal')).length === 2);
    }
    if (answer === 1) {
      ok('completion has not happened before the third comparison',
        !(await page.$('.exercise-feedback.success')));
    }
    const advance = await page.$('.rate-compare .advance:not(.retry)');
    if (!advance) break;
    await advance.click();
    advanced++;
    await page.waitForTimeout(250);
  }
  ok('all three comparisons can be completed', advanced === 3, `${advanced} advanced`);

  await page.waitForTimeout(400);
  ok('completion is recorded only after the third comparison',
    Boolean(await page.$('.exercise-feedback.success')));
  ok('no page errors', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ── keyboard only ───────────────────────────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  await open(page);
  const choices = await page.$$('.rate-compare .choice');
  await choices[0].focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(220);
  ok('a choice can be made with the keyboard',
    (await page.$$('.rate-compare .reveal')).length === 2);
  // Tab to it for real. Calling el.focus() from a script does not satisfy the
  // :focus-visible heuristic, so testing that way measures nothing and reports
  // a failure that is not in the page.
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.rate-compare .choice', { timeout: 25000 });
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
  await page.close();
}

/* ── 390px ───────────────────────────────────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await open(page);
  ok('no horizontal scrolling at 390px',
    !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)));

  const stacked = await page.$eval('.rate-compare .pair', el => getComputedStyle(el).gridTemplateColumns);
  ok('the two branches stack at 390px', !stacked.includes(' '), stacked);

  const tiny = await page.$$eval('.rate-compare .choice, .rate-compare .question, .rate-compare .progress',
    els => els.map(el => parseFloat(getComputedStyle(el).fontSize)).filter(px => px < 11));
  ok('nothing is under 11px', tiny.length === 0, tiny.join(', '));

  const small = await page.$$eval('.rate-compare .choice',
    els => els.map(el => el.getBoundingClientRect().height).filter(h => h < 44));
  ok('every choice is at least 44px tall', small.length === 0, small.map(Math.round).join(', '));
  await page.close();
}

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'} against ${BASE}`);
process.exit(bad ? 1 : 0);
