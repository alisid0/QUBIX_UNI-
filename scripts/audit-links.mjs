// How many things on a page are clickable, and how many of them go where
// something else on that same page already goes.
//
// An audit, not a guard: it reports and never fails a build, because a repeated
// destination is a judgement call rather than a defect. A subject strip naming
// all eight chapters is worth having even on a page that lists their sessions.
//
// What it found the first time it ran: every one of the home page's twenty-four
// repeated destinations involved the footer. SiteFooter's own note had already
// predicted the number, and GameHub, RoleFoundations and Showcase already
// passed the compact prop that fixes it. The floor, which lists more than any
// of them, did not. Home went from 100 links and 24 repeats to 64 and none.
//
//   npm run build && npx vite preview --port 4173
//   npm run audit:links -- http://localhost:4173

import { chromium } from 'playwright';

const BASE = process.argv[2] || 'https://qubix.university';

const ROUTES = [
  ['/', 'the floor (home)'],
  ['/start', 'the floor via /start'],
  ['/floor/concepts', 'one stage page'],
  ['/signin', 'sign in'],
  ['/academy', 'academy hub'],
  ['/learn/data-foundations/chapter/1/session/1', 'a reading'],
  ['/academy/missions/checkout', 'a mission'],
  ['/superstore', 'the Superstore map'],
  ['/wiki', 'the wiki'],
  ['/updates', 'learning updates'],
  ['/tools/data-console', 'the data console'],
  ['/pilot/variables-and-rates?board=0', 'a maths board']
];

const norm = (href, base) => {
  try {
    const u = new URL(href, base);
    if (u.origin !== new URL(BASE).origin) return `EXTERNAL ${u.origin}`;
    // Query order should not make two identical destinations look different.
    const params = [...u.searchParams.entries()].sort().map(([k, v]) => `${k}=${v}`).join('&');
    return u.pathname.replace(/\/$/, '') + (params ? '?' + params : '');
  } catch { return null; }
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

const siteWide = new Map();   // destination -> [{route, text}]
let totalClickable = 0;
let totalButtons = 0;

console.log(`Link audit · ${BASE}\n`);

for (const [path, label] of ROUTES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(700);

  // Open everything foldable, so the count is what a learner can reach on the
  // page rather than what happens to be showing.
  for (const toggle of await page.$$('.stage-toggle')) {
    await toggle.click().catch(() => {});
  }
  await page.waitForTimeout(400);

  const links = await page.$$eval('a[href]', els => els.map(e => ({
    href: e.getAttribute('href'),
    text: (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 44)
  })));
  const buttons = await page.$$eval('button', els => els.length);

  const byDest = new Map();
  for (const link of links) {
    const dest = norm(link.href, BASE + path);
    if (!dest) continue;
    if (!byDest.has(dest)) byDest.set(dest, []);
    byDest.get(dest).push(link.text);

    const key = dest;
    if (!siteWide.has(key)) siteWide.set(key, []);
    siteWide.get(key).push({ route: path, text: link.text });
  }

  const dupes = [...byDest.entries()].filter(([, texts]) => texts.length > 1);
  totalClickable += links.length;
  totalButtons += buttons;

  console.log(`${label}  (${path})`);
  console.log(`   links ${String(links.length).padStart(3)} · buttons ${String(buttons).padStart(3)}`
    + ` · distinct destinations ${String(byDest.size).padStart(3)}`
    + ` · repeated ${dupes.length}`);
  for (const [dest, texts] of dupes.sort((a, b) => b[1].length - a[1].length).slice(0, 6)) {
    const same = new Set(texts).size === 1;
    console.log(`      ${String(texts.length)}x  ${dest}`);
    console.log(`           ${same ? 'same label:' : 'labels:'} ${[...new Set(texts)].join(' | ')}`);
  }
  console.log('');
}

console.log('─'.repeat(70));
console.log(`totals: ${totalClickable} links, ${totalButtons} buttons across ${ROUTES.length} routes\n`);

await browser.close();
