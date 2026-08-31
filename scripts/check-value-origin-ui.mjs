// Session 1.01, driven the way a learner drives it.
//
// This is the first interaction in the course, in the session everybody meets
// first, which until now had none. The receipt builds as values are placed, so
// the build-up is checked value by value rather than only at the end.
//
//   node scripts/check-value-origin-ui.mjs
//   node scripts/check-value-origin-ui.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
const PATH = '/learn/data-foundations/chapter/1/session/1';
const ORIGINS = [0, 1, 1, 0, 2];
const FIELDS = ['barcode', 'product_name', 'unit_price', 'quantity', 'line_total'];

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();
const open = async page => {
  await page.goto(`${BASE}${PATH}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.receipt-build .choice', { timeout: 25000 });
  await page.waitForTimeout(300);
};
const filled = page => page.$$eval('.slip .filled', els => els.length);

{
  const page = await browser.newPage({ viewport: { width: 1180, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 130)));
  await open(page);

  ok('the receipt starts empty', (await filled(page)) === 0);
  ok('all five values are listed as unplaced',
    (await page.$$eval('.slip b.unknown', e => e.length)) === 5);
  ok('unplaced values say so in words', (await page.textContent('.slip')).includes('not placed yet'));
  ok('the total is withheld until the receipt is complete',
    (await page.$$('.slip-total')).length === 0);

  // Wrong first: a barcode is not calculated.
  const first = await page.$$('.receipt-build .choice');
  await first[2].click();
  await page.waitForTimeout(220);
  ok('a wrong answer does not place the value', (await filled(page)) === 0);
  ok('a wrong answer is explained', Boolean(await page.$('.not-yet')));
  ok('a wrong answer does not advance',
    (await page.textContent('.receipt-build .progress')).includes('1 of 5'));
  await page.click('.receipt-build .advance.retry');
  await page.waitForTimeout(200);
  ok('retry restores the choices',
    (await page.$$('.receipt-build .choice:not([disabled])')).length === 3);

  let advanced = 0;
  for (let i = 0; i < ORIGINS.length; i++) {
    const field = (await page.textContent('.receipt-build .value-shown span')).trim();
    ok(`value ${i + 1} is ${FIELDS[i]}`, field === FIELDS[i], field);
    const choices = await page.$$('.receipt-build .choice');
    await choices[ORIGINS[i]].click();
    await page.waitForTimeout(230);
    const n = await filled(page);
    ok(`placing ${FIELDS[i]} fills one more receipt line`, n === i + 1, `${n} placed`);
    if (i === 3) {
      ok('completion has not happened before the fifth value',
        !(await page.$('.exercise-feedback.success')));
    }
    const advance = await page.$('.receipt-build .advance:not(.retry)');
    if (!advance) break;
    await advance.click();
    advanced++;
    await page.waitForTimeout(240);
  }

  ok('all five values can be placed', advanced === 5, `${advanced} advanced`);
  ok('the finished receipt shows every value', (await filled(page)) === 5);

  const slip = await page.textContent('.slip');
  ok('every origin is named in words on the receipt',
    ['observed', 'looked up', 'calculated'].every(w => slip.includes(w)));
  ok('the line total appears once the receipt is complete', slip.includes('2 × £1.85 = £3.70'));

  await page.waitForTimeout(400);
  ok('completion is recorded only after the fifth value',
    Boolean(await page.$('.exercise-feedback.success')));
  ok('no page errors', errors.length === 0, errors.join(' | '));
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1180, height: 1000 } });
  await open(page);
  let ring = false;
  for (let press = 0; press < 80 && !ring; press++) {
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
  await page.waitForTimeout(230);
  ok('a choice can be made with the keyboard',
    Boolean(await page.$('.receipt-build .choice.right, .receipt-build .choice.wrong')));
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await open(page);
  ok('no horizontal scrolling at 390px',
    !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)));
  const tiny = await page.$$eval('.receipt-build .choice, .receipt-build .question, .slip dd b',
    els => els.map(el => parseFloat(getComputedStyle(el).fontSize)).filter(px => px < 11));
  ok('nothing is under 11px', tiny.length === 0, tiny.join(', '));
  const small = await page.$$eval('.receipt-build .choice',
    els => els.map(el => el.getBoundingClientRect().height).filter(h => h < 44));
  ok('every choice is at least 44px tall', small.length === 0, small.map(Math.round).join(', '));
  await page.close();
}

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'} against ${BASE}`);
process.exit(bad ? 1 : 0);
