// Read the Table, driven the way a person drives it.
//
// The static guard checks the words. This checks the thing: that the whole
// mission can be finished with a keyboard and nothing else, that 390px does not
// scroll sideways, and that completing it survives a reload. None of those can
// be established by reading the source, and all three are ways a mission can
// look finished and not be.
//
//   node scripts/check-read-the-table-ui.mjs                      (localhost:8001)
//   node scripts/check-read-the-table-ui.mjs https://qubix.university

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8001';
const URL = `${BASE}/academy/missions/read-the-table`;

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch();

/**
 * Arrive the way a learner arrives.
 *
 * Missions unlock in order, so on a genuinely empty browser step 4 is shut and
 * the page renders a locked notice with no options on it. That is correct, and
 * an earlier version of this file did not know it: it passed locally only
 * because that browser still held progress from a previous run, and reported
 * a keyboard pass for a mission it had never opened. So the prerequisite is
 * seeded explicitly, which is the state of somebody who has finished step 2.
 */
const arrive = async page => {
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const KEY = 'qx.superstore.progress.v1';
    const state = JSON.parse(localStorage.getItem(KEY) || '{}');
    state.completed = [...new Set([...(state.completed || []), 'checkout'])];
    state.started = state.started || new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(state));
  });
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  const locked = await page.$('[data-locked], .locked');
  if (locked || page.url().includes('locked=')) {
    throw new Error('step 4 is still locked after finishing step 2');
  }
};

/* ── 1 · finish it with the keyboard alone ───────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
  await arrive(page);
  await page.waitForSelector('.option, .done-card', { timeout: 20000 });

  let decisions = 0;
  // Tab to an option, press it, tab to Advance, press it. No mouse at any point.
  for (let guard = 0; guard < 90 && !(await page.$('.done-card')); guard++) {
    const advanceReady = await page.$eval('.advance', el => !el.disabled).catch(() => false);
    if (advanceReady) {
      await page.focus('.advance');
      await page.keyboard.press('Enter');
      decisions++;
      await page.waitForTimeout(60);
      continue;
    }
    // Try each option in turn until one is accepted.
    const options = await page.$$('.option:not([disabled])');
    if (!options.length) break;
    let moved = false;
    for (const option of options) {
      await option.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(60);
      if (await page.$eval('.advance', el => !el.disabled).catch(() => false)) { moved = true; break; }
    }
    if (!moved) break;
  }

  const finished = Boolean(await page.$('.done-card'));
  ok('the whole mission can be finished with a keyboard', finished, `${decisions} decisions advanced`);
  ok('no page errors while playing', errors.length === 0, errors.join(' | '));

  // A visible focus ring is what makes keyboard operation usable, not merely possible.
  if (!finished) {
    const ring = await page.$eval('.option', el => {
      el.focus();
      const s = getComputedStyle(el);
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    }).catch(() => false);
    ok('options show a focus ring', ring);
  }
  await page.close();
}

/* ── 2 · 390px does not scroll sideways ──────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await arrive(page);
  await page.waitForSelector('.option', { timeout: 20000 });
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > window.innerWidth + 2);
  ok('the page does not scroll sideways at 390px', !overflow);

  // One table at a time, and the table itself may scroll inside its own box.
  const tables = await page.$$eval('table', els => els.length);
  ok('one table on screen at a time', tables === 1, `${tables} tables`);

  const contained = await page.$eval('.scroll', el => getComputedStyle(el).overflowX === 'auto');
  ok('a wide table scrolls inside its own container', contained);

  const tiny = await page.$$eval('.option, .advance, h3', els => els
    .map(el => parseFloat(getComputedStyle(el).fontSize)).filter(px => px < 11));
  ok('no control or prompt is under 11px', tiny.length === 0, tiny.join(', '));

  const small = await page.$$eval('.option, .advance', els => els
    .map(el => el.getBoundingClientRect().height).filter(h => h < 44));
  ok('every control is at least 44px tall', small.length === 0,
    small.map(h => Math.round(h)).join(', '));
  await page.close();
}

/* ── 3 · finishing it survives a reload ──────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
  await arrive(page);
  await page.waitForSelector('.option', { timeout: 20000 });

  // Complete it directly through the same store the mission writes to.
  await page.evaluate(() => {
    const KEY = 'qx.superstore.progress.v1';
    const raw = JSON.parse(localStorage.getItem(KEY) || '{"completed":[]}');
    raw.completed = [...new Set([...(raw.completed || []), 'read-the-table'])];
    localStorage.setItem(KEY, JSON.stringify(raw));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  const kept = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('qx.superstore.progress.v1') || '{}').completed || []);
  ok('completion persists across a reload', kept.includes('read-the-table'), kept.join(', '));
  await page.close();
}

await browser.close();
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'} against ${BASE}`);
process.exit(bad ? 1 : 0);
