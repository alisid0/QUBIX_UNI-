// Walk every learner-facing route and report what is actually broken.
import { chromium } from 'playwright';
import { MISSIONS } from '../src/lib/game/progress.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';

const BASE = process.argv[2] || 'http://127.0.0.1:4452';
const routes = [
  ['home', ''],
  ['play hub', '?mode=game'],
  ['floor', '?mode=game&mission=store'],
  ['campaign', '?mode=game&mission=campaign'],
  ['wiki', '?mode=wiki'],
  ...MISSIONS.map(m => [`mission ${m.slug}`, `?mode=game&mission=${m.slug}`]),
  ...SHARED_FOUNDATIONS.flatMap(({ chapter, book }) =>
    book.sessions.map(s => [`ch${chapter}.${s.number}`,
      `?mode=game&mission=shared-book&chapter=${chapter}&session=${s.number}`]))
];

const browser = await chromium.launch();
const found = [];

for (const width of [1400, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  // Unlock everything, or every mission route bounces to the hub.
  await page.addInitScript(all => {
    localStorage.setItem('qx.superstore.progress.v1',
      JSON.stringify({ completed: all, started: new Date().toISOString() }));
  }, MISSIONS.map(m => m.slug));

  for (const [name, q] of routes) {
    const errs = [];
    const onErr = e => /_vercel|insights|fonts\.gstatic|Unexpected token '<'/.test(e.message) || errs.push(`js: ${e.message.slice(0, 90)}`);
    const onRes = r => { if (r.status() >= 400 && !/_vercel|insights/.test(r.url())) errs.push(`${r.status()} ${r.url().split('/').pop()}`); };
    page.on('pageerror', onErr); page.on('response', onRes);

    try { await page.goto(`${BASE}/${q}`, { waitUntil: 'networkidle', timeout: 20000 }); }
    catch { errs.push('did not load'); }

    const probe = await page.evaluate(() => {
      const doc = document.documentElement;
      let tiny = [], broken = [];
      for (const el of document.querySelectorAll('body *')) {
        const t = (el.textContent || '').trim();
        if (t && !el.children.length) {
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs < 11) tiny.push(`${fs}px "${t.slice(0, 24)}"`);
        }
      }
      for (const img of document.querySelectorAll('img'))
        if (!img.naturalWidth) broken.push(img.getAttribute('src') || '(no src)');
      return {
        overflow: doc.scrollWidth > doc.clientWidth + 1,
        tiny: [...new Set(tiny)].slice(0, 3),
        tinyCount: tiny.length,
        broken: [...new Set(broken)],
        empty: document.body.innerText.trim().length < 40
      };
    });

    page.off('pageerror', onErr); page.off('response', onRes);

    const problems = [...errs];
    if (probe.overflow) problems.push('scrolls sideways');
    if (probe.empty) problems.push('page is blank');
    if (probe.broken.length) problems.push(`broken image: ${probe.broken.join(', ')}`);
    if (probe.tinyCount) problems.push(`${probe.tinyCount} under 11px: ${probe.tiny.join(', ')}`);
    if (problems.length) found.push({ width, name, problems });
  }
  await page.close();
}
await browser.close();

if (!found.length) { console.log('\n  nothing broken across every route at both widths'); process.exit(0); }
const byKind = {};
for (const f of found) for (const p of f.problems) {
  const kind = p.startsWith('js:') ? 'javascript error' : p.match(/^\d{3} /) ? 'missing file'
    : p.includes('under 11px') ? 'text under 11px' : p;
  (byKind[kind] = byKind[kind] || []).push(`${f.width}px ${f.name}`);
}
console.log('');
for (const [kind, where] of Object.entries(byKind))
  console.log(`  ${kind}\n     ${where.length} route(s): ${where.slice(0, 6).join(', ')}${where.length > 6 ? ` +${where.length - 6} more` : ''}`);
console.log('\n  detail on the first few:');
for (const f of found.slice(0, 6)) console.log(`   ${f.width}px ${f.name}: ${f.problems.join(' | ')}`);
