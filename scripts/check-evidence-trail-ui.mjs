// Session 3.04, driven the way a learner drives it.
//
// The trail is the mechanic. A correct decision adds a stage and a wrong one
// does not, so the thing being assembled is visible throughout and cannot be
// assembled by guessing. That growth is checked stage by stage rather than
// only at the end, because "five stages at the finish" would also be true of a
// trail that filled itself in regardless of the answers.
//
//   node scripts/check-evidence-trail-ui.mjs
//   node scripts/check-evidence-trail-ui.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
const PATH = '/learn/data-foundations/chapter/3/session/4';
const ANSWERS = [1, 0, 2, 1, 0];
const TITLES = ['Checkout records', 'Remove cancelled sales', 'Convert currencies',
  'Group by week and add', 'Save result separately'];

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();
const open = async page => {
  await page.goto(`${BASE}${PATH}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.trail-exercise .choice', { timeout: 25000 });
  await page.waitForTimeout(300);
};
const traced = page => page.$$eval('.trail li.done', els => els.length);

/* ── the trail grows only on a correct decision ──────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 130)));
  await open(page);

  ok('the figure being traced is named up front',
    (await page.textContent('.trail-exercise .target')).includes('84,320'));
  ok('the trail starts empty', (await traced(page)) === 0);
  ok('all five stages are listed as untraced',
    (await page.$$eval('.trail li.pending', e => e.length)) === 5);
  ok('untraced stages say so in words, not by colour alone',
    (await page.$$eval('.trail b.unknown', e => e.length)) === 5);

  // Wrong first: the staff rota is not where sale amounts live.
  const first = await page.$$('.trail-exercise .choice');
  await first[0].click();
  await page.waitForTimeout(220);
  ok('a wrong decision does not extend the trail', (await traced(page)) === 0);
  ok('a wrong decision is explained', Boolean(await page.$('.not-yet')));
  ok('a wrong decision does not advance',
    (await page.textContent('.trail-exercise .progress')).includes('1 of 5'));
  await page.click('.trail-exercise .advance.retry');
  await page.waitForTimeout(200);
  ok('retry restores the choices',
    (await page.$$('.trail-exercise .choice:not([disabled])')).length === 3);

  let advanced = 0;
  for (let i = 0; i < ANSWERS.length; i++) {
    const choices = await page.$$('.trail-exercise .choice');
    await choices[ANSWERS[i]].click();
    await page.waitForTimeout(230);
    const n = await traced(page);
    ok(`decision ${i + 1} adds "${TITLES[i]}" to the trail`, n === i + 1, `${n} stage(s) traced`);
    if (i === 3) {
      ok('completion has not happened before the fifth decision',
        !(await page.$('.exercise-feedback.success')));
    }
    const advance = await page.$('.trail-exercise .advance:not(.retry)');
    if (!advance) break;
    await advance.click();
    advanced++;
    await page.waitForTimeout(250);
  }

  ok('all five decisions can be completed', advanced === 5, `${advanced} advanced`);
  ok('the finished trail holds all five stages', (await traced(page)) === 5);

  const trailText = await page.textContent('.trail');
  ok('the finished trail reads source to preserved result, in order',
    TITLES.every(t => trailText.includes(t))
    && TITLES.map(t => trailText.indexOf(t)).every((n, i, a) => i === 0 || n > a[i - 1]),
    TITLES.join(' → '));
  ok('the trail teaches that the source records are kept',
    /source records unchanged/i.test(trailText));

  await page.waitForTimeout(400);
  ok('completion is recorded only after the fifth decision',
    Boolean(await page.$('.exercise-feedback.success')));
  ok('no page errors', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ── keyboard ────────────────────────────────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 1000 } });
  await open(page);
  let ring = false;
  for (let press = 0; press < 70 && !ring; press++) {
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
  ok('a decision can be made with the keyboard',
    Boolean(await page.$('.trail-exercise .choice.right, .trail-exercise .choice.wrong')));
  await page.close();
}

/* ── 390px ───────────────────────────────────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await open(page);
  ok('no horizontal scrolling at 390px',
    !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)));
  const tiny = await page.$$eval('.trail-exercise .choice, .trail-exercise .question, .trail li b',
    els => els.map(el => parseFloat(getComputedStyle(el).fontSize)).filter(px => px < 11));
  ok('nothing is under 11px', tiny.length === 0, tiny.join(', '));
  const small = await page.$$eval('.trail-exercise .choice',
    els => els.map(el => el.getBoundingClientRect().height).filter(h => h < 44));
  ok('every choice is at least 44px tall', small.length === 0, small.map(Math.round).join(', '));
  await page.close();
}

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'} against ${BASE}`);
process.exit(bad ? 1 : 0);
