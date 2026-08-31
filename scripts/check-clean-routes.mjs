// Browser smoke test for the public path router.
// Run against a production preview: node scripts/check-clean-routes.mjs [base]

import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const base = process.argv[2] || 'http://127.0.0.1:4212';
const systemBrowser = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(systemBrowser ? { executablePath: systemBrowser } : {}) });
let failed = false;

const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

for (const [name, viewport] of [
  ['desktop', { width: 1365, height: 900 }],
  ['phone', { width: 390, height: 844 }]
]) {
  const page = await browser.newPage({ viewport });
  for (const [path, expectedPath, titlePart] of [
    ['/wiki', '/wiki', 'Wiki'],
    ['/showcase', '/showcase', 'Showcase'],
    ['/academy/missions/checkout', '/academy/missions/checkout', 'Process a Sale'],
    ['/learn/data-foundations/chapter/1/session/2', '/learn/data-foundations/chapter/1/session/2', 'How Data Represents'],
    ['/superstore/rooms/data-office', '/superstore/rooms/data-office', 'Superstore'],
    ['/?mode=wiki&phase=4', '/wiki/phase/4', 'Descriptive statistics and visualisation']
  ]) {
    const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded', timeout: 15_000 });
    await page.waitForTimeout(500);
    check(response?.ok(), `${name}: ${path} returns successfully`, `${response?.status()}`);
    check(new URL(page.url()).pathname === expectedPath, `${name}: URL resolves to ${expectedPath}`);
    check((await page.title()).includes(titlePart), `${name}: route-specific title is present`, await page.title());
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    check(new URL(canonical).pathname === expectedPath, `${name}: canonical matches the clean route`, canonical);
    const queryLinks = await page.locator('a[href*="?mode="],a[href*="?mission="],a[href*="?prototype="],a[href*="?lab="]').count();
    check(queryLinks === 0, `${name}: rendered internal links use clean paths`, `${queryLinks} query links`);
  }

  await page.goto(`${base}/dsa/arrays/growth`, { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await page.waitForTimeout(500);
  check((await page.locator('meta[name="robots"]').getAttribute('content')) === 'noindex, follow',
    `${name}: unreleased DSA preview remains noindex`);
  await page.close();
}

await browser.close();
console.log(failed ? '\n  clean route browser checks failed\n' : '\n  clean routes work at desktop and phone widths\n');
process.exit(failed ? 1 : 0);
