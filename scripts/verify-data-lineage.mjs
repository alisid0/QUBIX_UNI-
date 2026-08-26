// Play Trace the Number. It went from three steps to six, and the view counted
// to three in three places while doing it.
import { chromium } from 'playwright';
import { MISSIONS } from '../src/lib/game/progress.js';
import { DATA_LINEAGE_MISSION as M } from '../src/lib/game/data-lineage-mission.js';

const BASE = process.argv[2] || 'http://127.0.0.1:4421';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

const problems = [];
const notOurs = t => /_vercel|insights|fonts\.gstatic|Unexpected token '<'/.test(t);
page.on('pageerror', e => notOurs(e.message) || problems.push(`page error: ${e.message}`));

const say = (ok, label, extra = '') => {
  console.log(`  ${ok ? 'PASS' : '**FAIL**'}  ${label}${extra ? '  ' + extra : ''}`);
  if (!ok) problems.push(label);
};

// Missions unlock in order, so reach this one the way a learner would.
const upTo = MISSIONS.slice(0, MISSIONS.findIndex(m => m.slug === 'data-lineage')).map(m => m.slug);
await page.addInitScript(done => {
  localStorage.setItem('qx.superstore.progress.v1',
    JSON.stringify({ completed: done, started: new Date().toISOString() }));
}, upTo);

await page.goto(`${BASE}/?mode=game&mission=data-lineage`, { waitUntil: 'networkidle' });
say(await page.getByRole('heading', { name: 'Trace the Number' }).isVisible(), 'the mission loads');

const bodyText = () => page.locator('body').innerText();
const first = await bodyText();
say(first.includes(`OF ${M.steps.length}`), 'the counter names the real number of steps',
  (first.match(/STEP \d+ OF \d+/) || ['(no counter)'])[0]);
say(!/\bOF 3\b/.test(first) || M.steps.length === 3, 'no stale count left behind');

// Every step, answered correctly, to the end.
let answered = 0;
for (const step of M.steps) {
  const label = step.options.find(o => o.value === step.answer).label;
  const option = page.locator('button').filter({ hasText: label.slice(0, 26) }).first();
  if (!(await option.count())) { say(false, `step ${step.number} ${step.label} offers its answer`); break; }
  await option.click();
  await page.waitForTimeout(200);
  answered += 1;

  const feedback = await page.locator('.feedback').first().innerText().catch(() => '');
  say(/correct/i.test(feedback), `step ${step.number} ${step.label.toLowerCase()} accepts its answer`);

  const carryOn = page.locator('button.continue');
  if (await carryOn.count()) { await carryOn.click(); await page.waitForTimeout(200); }
}
say(answered === M.steps.length, 'every step can be answered', `${answered} of ${M.steps.length}`);

const end = await bodyText();
say(/trace saved|competency|complete/i.test(end), 'the mission reaches its ending');

// The three added steps are the point of the expansion: PROV's agent, whether
// the value can be recomputed, and what else inherits a bad source.
for (const id of ['agent', 'repeat', 'impact'])
  say(M.steps.some(s => s.id === id), `the ${id} step exists`);

await page.screenshot({ path: 'artifacts/data-lineage.png', fullPage: true });
await browser.close();
console.log(problems.length ? `\n  ${problems.length} problem(s):\n   - ${problems.join('\n   - ')}` : '\n  played end to end, nothing broken');
process.exit(problems.length ? 1 : 0);
