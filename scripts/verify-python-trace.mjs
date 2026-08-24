// Play the mission, because reading it has never been enough.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 950 } });
const problems = [];
// Vercel's analytics script and Google's fonts exist only when deployed. Locally
// they 404, the SPA fallback answers with HTML, and the page fails to parse it as
// JS. Judge failures by URL: the console message for a 404 does not name one, so
// filtering on its text would either pass everything or suppress real breakage.
const notOurs = t => /_vercel|insights|fonts\.gstatic|Unexpected token '<'/.test(t);
page.on('pageerror', e => notOurs(e.message) || problems.push(`page error: ${e.message}`));
page.on('response', r => {
  if (r.status() >= 400 && !notOurs(r.url())) problems.push(`${r.status()} ${r.url()}`);
});
page.on('console', m => {
  const t = m.text();
  if (m.type() === 'error' && !notOurs(t) && !t.startsWith('Failed to load resource')) problems.push(`console: ${t}`);
});

await page.goto('http://127.0.0.1:4319/?mode=game&mission=python-trace', { waitUntil: 'networkidle' });

const say = (ok, label, extra = '') => {
  console.log(`  ${ok ? 'PASS' : '**FAIL**'}  ${label}${extra ? '  ' + extra : ''}`);
  if (!ok) problems.push(label);
};

say(await page.getByRole('heading', { name: 'Read the Program' }).isVisible(), 'the mission loads');

// The code listing is real text, not an image of code.
const code = await page.locator('ol.code code').allTextContents();
say(code.length === 4 && code[0].includes('total = 0'), 'the program is listed as text', `${code.length} lines`);
say(code.some(l => l.startsWith('    ')), 'the loop body is indented');

// The trace must be withheld until a prediction is committed.
say(await page.locator('.hidden-note').isVisible(), 'the trace is withheld before predicting');
say(!(await page.locator('.state').count()), 'no variable values are on screen yet');

// A wrong answer first, to prove it is markable.
await page.getByRole('button', { name: /^9/ }).click();
say(await page.locator('.feedback.retry').isVisible(), 'a wrong prediction is marked wrong');
say(await page.locator('.hidden-note').isVisible(), 'a wrong prediction still does not reveal the trace');

await page.getByRole('button', { name: /^55/ }).click();
say(await page.locator('.feedback.success').isVisible(), 'the right prediction is accepted');
say(await page.locator('.state').isVisible(), 'the trace appears once predicted');

// Step through and watch a name actually change.
const totalAt = async () => (await page.locator('.cell', { hasText: 'total' }).first().innerText()).replace(/\s+/g, ' ');
const first = await totalAt();
say(first.includes('0'), 'total starts at 0', first);

const activeLine = async () => (await page.locator('ol.code li.active code').count())
  ? (await page.locator('ol.code li.active code').first().innerText()).trim() : '(none)';
say((await activeLine()).includes('total = 0'), 'the executing line is highlighted', await activeLine());

for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'step →' }).click();
const mid = await totalAt();
say(mid.includes('18'), 'total moves as the loop runs', mid);

await page.getByRole('button', { name: 'run to end' }).click();
const end = await totalAt();
say(end.includes('55'), 'total ends at 55, as predicted', end);
say((await page.locator('.outcome').innerText()).includes('55'), 'the output line agrees with the prediction');
say(await page.getByRole('button', { name: 'step →' }).isDisabled(), 'stepping stops at the end');

// 18 + 6 + 22 + 9 passes through 24 and 46 on its way to 55, so three steps
// back from the print must land on the pass that made it 46.
for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'back' }).click();
say((await totalAt()).includes('46'), 'stepping back rewinds the values', await totalAt());

await page.screenshot({ path: 'c:/Users/ali10/QUBIX_UNI-/artifacts/python-trace-mission.png', fullPage: true });

// Second question, then on to the TypeError case, which must not crash.
await page.getByRole('button', { name: /continue|explain it/i }).click();
await page.getByRole('button', { name: /It would print 9/ }).click();
say(await page.locator('.feedback.success').isVisible(), 'the explanation step accepts its answer');
await page.getByRole('button', { name: /next program/i }).click();

say((await page.locator('h2').first().innerText()).includes('What happens'), 'the second program loads');
await page.getByRole('button', { name: /TypeError/ }).click();
await page.getByRole('button', { name: 'run to end' }).click();
const err = await page.locator('.outcome.err').innerText();
say(err.includes('TypeError'), 'the error case runs and reports the error rather than crashing', err.split('\n')[0]);

// Every case, to the end, with no crash past the last one.
let guard = 0;
while (guard++ < 40) {
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
  if (!hit) { problems.push('a case had no accepted answer'); break; }
}
say(await page.locator('.completion').isVisible(), 'the mission completes');
say((await page.locator('.completion li').count()) === 6, 'the summary lists all six programs');

await page.screenshot({ path: 'c:/Users/ali10/QUBIX_UNI-/artifacts/python-trace-complete.png', fullPage: true });

// The chapter must actually route here.
await page.goto('http://127.0.0.1:4319/?mode=game&mission=shared-book&chapter=6&session=2', { waitUntil: 'networkidle' });
const link = page.locator('a[href*="python-trace"]').first();
say(await link.count() > 0, 'chapter 06 session 02 links to the mission');

await browser.close();

console.log(problems.length ? `\n  ${problems.length} problem(s):\n   - ${problems.join('\n   - ')}` : '\n  played end to end, nothing broken');
process.exit(problems.length ? 1 : 0);
