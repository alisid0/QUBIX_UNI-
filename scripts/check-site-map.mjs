// The site map has to render, and its diagram has to be readable.
//
// A generated SVG can be arithmetically fine and visually useless: boxes that
// overlap, arrows that point at nothing, a viewBox that clips the last column.
// None of that shows up in the generator's own output, so this opens the page in
// a browser and measures it.
//
//   node scripts/check-site-map.mjs

import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const PAGE = dir('../docs/site-map.html');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

if (!existsSync(PAGE)) {
  console.log('   no map yet, generating it\n');
  execFileSync(process.execPath, [dir('./build-site-map.mjs')], { stdio: 'ignore' });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message.slice(0, 120)));

await page.goto('file:///' + PAGE.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.waitForTimeout(400);

check((await page.$$('h1')).length === 1, 'the page renders');
check(errors.length === 0, 'without script errors', errors.join(' | '));

const svg = await page.$('svg');
check(Boolean(svg), 'the flow diagram is present');

const nodes = await page.$$eval('.node rect', rs => rs.map(r => {
  const b = r.getBoundingClientRect();
  return { x: b.left, y: b.top, w: b.width, h: b.height, r: b.right, b: b.bottom };
}));
check(nodes.length > 0, 'the diagram has mission boxes', `${nodes.length} boxes`);

let overlapping = 0;
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i], c = nodes[j];
    if (a.x < c.r - 1 && c.x < a.r - 1 && a.y < c.b - 1 && c.y < a.b - 1) overlapping += 1;
  }
}
check(overlapping === 0, 'no two mission boxes overlap',
  overlapping ? `${overlapping} overlapping pairs` : `${nodes.length} boxes placed`);

const clipped = await page.$$eval('svg', ([s]) => {
  const vb = s.viewBox.baseVal;
  const box = s.getBBox();
  return { over: box.x + box.width > vb.width + 1 || box.y + box.height > vb.height + 1,
    bw: Math.round(box.width), vw: vb.width };
});
check(!clipped.over, 'nothing is drawn outside the viewBox',
  `content ${clipped.bw} within ${clipped.vw}`);

const arrows = await page.$$('.arrow');
check(arrows.length === nodes.length - 1,
  'one arrow joins each mission to the next', `${arrows.length} arrows for ${nodes.length} missions`);

const sideways = await page.evaluate(() => document.body.scrollWidth > window.innerWidth + 2);
check(!sideways, 'the page itself does not scroll sideways');

const labels = await page.$$eval('.nt', ns => ns.filter(n => n.textContent.trim().length > 0).length);
check(labels === nodes.length, 'every box is labelled', `${labels} labels`);

await browser.close();
console.log(failed ? '\n  the map does not render correctly\n' : '\n  the map renders and reads\n');
process.exit(failed ? 1 : 0);
