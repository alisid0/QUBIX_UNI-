// Session 3.03, driven the way a learner drives it.
//
// Four pairs teaching three verdicts: a repeat that is allowed, a real
// duplicate, and an extract that cannot settle the question. The last one is
// the reason this activity exists, so it is checked explicitly rather than
// counted as one more round.
//
//   node scripts/check-duplicate-ui.mjs
//   node scripts/check-duplicate-ui.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
const PATH = '/learn/data-foundations/chapter/3/session/3';
const ANSWERS = [0, 1, 0, 2];
const TERMS = ['A repeat that is allowed', 'A duplicate', 'A repeat that is allowed', 'Not enough evidence'];

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();
const open = async page => {
  await page.goto(`${BASE}${PATH}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.dup .choice', { timeout: 25000 });
  await page.waitForTimeout(300);
};

/* ── the four pairs, with a wrong answer on the way ──────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 130)));
  await open(page);

  ok('the counter starts at one of four',
    (await page.textContent('.dup .progress')).includes('1 of 4'));
  ok('the grain and the identifying columns are stated before the rows',
    (await page.textContent('.dup .context')).includes('sale_id + line_no'));
  ok('the identifying columns are marked in the table',
    (await page.$$('.dup .wide th.key')).length === 2);

  // Wrong first: call the allowed repeat a duplicate.
  const first = await page.$$('.dup .choice');
  await first[1].click();
  await page.waitForTimeout(200);
  ok('a wrong answer is marked and explained',
    Boolean(await page.$('.dup .choice.wrong')) && Boolean(await page.$('.not-yet')));
  ok('a wrong answer does not reveal the verdict name',
    (await page.$$('.dup .term')).length === 0);
  ok('a wrong answer does not advance the pair',
    (await page.textContent('.dup .progress')).includes('1 of 4'));
  await page.click('.dup .advance.retry');
  await page.waitForTimeout(200);
  ok('retry restores the choices', (await page.$$('.dup .choice:not([disabled])')).length === 3);

  let advanced = 0;
  const seenTerms = [];
  for (let i = 0; i < ANSWERS.length; i++) {
    const choices = await page.$$('.dup .choice');
    await choices[ANSWERS[i]].click();
    await page.waitForTimeout(220);
    const term = (await page.textContent('.dup .term b').catch(() => '')).trim();
    seenTerms.push(term);
    ok(`pair ${i + 1} is named "${TERMS[i]}"`, term === TERMS[i], term || '(none)');
    if (i === 2) {
      ok('completion has not happened before the fourth pair',
        !(await page.$('.exercise-feedback.success')));
    }
    const advance = await page.$('.dup .advance:not(.retry)');
    if (!advance) break;
    await advance.click();
    advanced++;
    await page.waitForTimeout(250);
  }

  ok('all four pairs can be completed', advanced === 4, `${advanced} advanced`);
  ok('the learner meets all three verdicts', new Set(seenTerms).size === 3,
    [...new Set(seenTerms)].join(' · '));
  ok('the insufficient-evidence pair is the one with no key',
    seenTerms[3] === 'Not enough evidence');
  await page.waitForTimeout(400);
  ok('completion is recorded only after the fourth pair',
    Boolean(await page.$('.exercise-feedback.success')));
  ok('no page errors', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ── keyboard ────────────────────────────────────────────────────────────── */
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
    Boolean(await page.$('.dup .choice.right, .dup .choice.wrong')));
  await page.close();
}

/* ── 390px: the rows must reflow, not scroll ─────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await open(page);

  ok('no horizontal scrolling at 390px',
    !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)));

  const wide = await page.$eval('.dup .wide', el => getComputedStyle(el).display);
  const narrow = await page.$eval('.dup .narrow', el => getComputedStyle(el).display);
  ok('the table reflows into one card per row on a phone',
    wide === 'none' && narrow !== 'none', `table ${wide}, cards ${narrow}`);

  // The reflowed view must carry the same values, not a reduced set.
  const cells = await page.$$eval('.dup .rowcard p', ps => ps.length);
  ok('the reflowed rows keep every column', cells === 6, `${cells} field rows across two cards`);

  // display:none takes the hidden view out of the accessibility tree, so the
  // visible one must not also be hidden from it.
  const hidden = await page.$eval('.dup .narrow', el => el.getAttribute('aria-hidden'));
  ok('the visible mobile view is not hidden from assistive technology',
    hidden === null, hidden === null ? '' : `aria-hidden=${hidden}`);

  const tiny = await page.$$eval('.dup .choice, .dup .question, .dup .rowcard p',
    els => els.map(el => parseFloat(getComputedStyle(el).fontSize)).filter(px => px < 11));
  ok('nothing is under 11px', tiny.length === 0, tiny.join(', '));
  const small = await page.$$eval('.dup .choice',
    els => els.map(el => el.getBoundingClientRect().height).filter(h => h < 44));
  ok('every choice is at least 44px tall', small.length === 0, small.map(Math.round).join(', '));
  await page.close();
}

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'} against ${BASE}`);
process.exit(bad ? 1 : 0);
