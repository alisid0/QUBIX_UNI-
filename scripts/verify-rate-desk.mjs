// Play the Rate Desk. Guards check the data; this checks the thing people touch.
import { chromium } from 'playwright';
import { RATE_DESK_MISSION as M, readingsFor, round } from '../src/lib/game/rate-desk-mission.js';

const BASE = process.argv[2] || 'http://127.0.0.1:4330';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 950 } });

// Missions unlock in order now, so opening one directly bounces to the hub.
// Seed the missions before this one as complete, which is the state a learner
// reaching it would actually be in.
import { MISSIONS } from '../src/lib/game/progress.js';
const upTo = MISSIONS.slice(0, MISSIONS.findIndex(m => m.slug === 'rate-desk')).map(m => m.slug);
await page.addInitScript(done => {
  localStorage.setItem('qx.superstore.progress.v1',
    JSON.stringify({ completed: done, started: new Date().toISOString() }));
}, upTo);

const problems = [];
const notOurs = t => /_vercel|insights|fonts\.gstatic|Unexpected token '<'/.test(t);
page.on('pageerror', e => notOurs(e.message) || problems.push(`page error: ${e.message}`));
page.on('response', r => { if (r.status() >= 400 && !notOurs(r.url())) problems.push(`${r.status()} ${r.url()}`); });

const say = (ok, label, extra = '') => {
  console.log(`  ${ok ? 'PASS' : '**FAIL**'}  ${label}${extra ? '  ' + extra : ''}`);
  if (!ok) problems.push(label);
};

await page.goto(`${BASE}/?mode=game&mission=rate-desk`, { waitUntil: 'networkidle' });
say(await page.getByRole('heading', { name: 'The Rate Desk' }).isVisible(), 'the mission loads');

// The divided figure must be withheld until the denominator has been named.
say(await page.locator('.withheld').isVisible(), 'the rate is withheld before the denominator is named');
const early = await page.locator('.panel').nth(1).innerText();
say(!early.includes('8'), 'the answer is not sitting on screen already');

// A wrong answer, to prove it marks.
await page.getByRole('button', { name: /staff do not generate/ }).click();
say(await page.locator('.feedback.retry').isVisible(), 'a wrong denominator is marked wrong');
say(await page.locator('.withheld').isVisible(), 'and still does not reveal the rate');

await page.getByRole('button', { name: /a complaint can only come from a sale/ }).click();
say(await page.locator('.feedback.success').isVisible(), 'the right denominator is accepted');

await page.getByRole('button', { name: /figure/i }).click();

// The chart must now show the reversal, computed rather than declared.
const rows = await page.locator('.bar-row').allInnerTexts();
const computed = readingsFor(M.cases[0]).rows.map(r => round(r.value, 1));
const shown = rows.slice(2).map(t => Number((t.match(/([\d.]+)\s*$/) || [])[1]));
say(shown.length === 2 && shown[0] === computed[0] && shown[1] === computed[1],
  'the rate panel shows what the functions compute', `${shown.join(' / ')} against ${computed.join(' / ')}`);

// Raw bar longer for Northgate, rate bar longer for Riverside: the reversal.
const widths = await page.locator('.bar-row em').evaluateAll(els => els.map(e => parseFloat(e.style.width)));
say(widths.length === 4, 'four bars are drawn', `${widths.map(w => Math.round(w)).join(' / ')}`);
say(widths[0] > widths[1] && widths[3] > widths[2],
  'the taller bar changes sides once divided', `raw ${Math.round(widths[0])}>${Math.round(widths[1])}, rate ${Math.round(widths[3])}>${Math.round(widths[2])}`);

await page.screenshot({ path: 'artifacts/rate-desk.png', fullPage: true });

// Every case to the end, no crash past the last.
let guard = 0;
while (guard++ < 80) {
  const next = page.locator('.continue');
  if (await next.count()) { await next.click(); continue; }
  if (await page.locator('.completion').count()) break;
  const opts = page.locator('.options button:not([disabled])');
  const n = await opts.count();
  if (!n) break;
  let hit = false;
  for (let i = 0; i < n; i++) {
    await opts.nth(i).click();
    if (await page.locator('.feedback.success').count()) { hit = true; break; }
  }
  if (!hit) { problems.push('a step had no accepted answer'); break; }
}
say(await page.locator('.completion').isVisible(), 'the mission completes');
say((await page.locator('.completion li').count()) === M.cases.length, 'the summary lists every case');

// Chapter 02 must actually route here.
await page.goto(`${BASE}/?mode=game&mission=shared-book&chapter=2&session=2`, { waitUntil: 'networkidle' });
say(await page.locator('a[href*="rate-desk"]').count() > 0, 'chapter 02 session 02 links to the mission');
say(await page.locator('.rehearsal').count() === 1, 'and rehearses it first');

await browser.close();
console.log(problems.length ? `\n  ${problems.length} problem(s):\n   - ${problems.join('\n   - ')}` : '\n  played end to end, nothing broken');
process.exit(problems.length ? 1 : 0);
