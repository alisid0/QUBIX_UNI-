// Check a deployment actually serves what it should, headers included.
//
// A prebuilt deployment is configured by .vercel/output/config.json rather than
// vercel.json, so the security headers are re-derived rather than inherited.
// That is exactly the kind of change that fails silently and is noticed months
// later, so it gets checked against vercel.json itself rather than against a
// list someone typed here.
//
//   node scripts/verify-deploy.mjs https://qubix.university

import { readFileSync } from 'node:fs';

const base = (process.argv[2] || 'https://qubix.university').replace(/\/$/, '');
const want = JSON.parse(readFileSync('vercel.json', 'utf8')).headers;
let bad = 0;
const ok = (l, v, x = '') => { if (!v) bad++; console.log(`   ${v ? 'PASS' : '**FAIL**'}  ${l}${x ? '  ' + x : ''}`); };

const get = async path => {
  const r = await fetch(base + path, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
  return { status: r.status, headers: r.headers, body: r.status < 400 ? await r.text() : '' };
};

console.log(`checking ${base}\n`);

// 1. The pages exist and are the right ones.
for (const [path, expect] of [
  ['/', /Qubix/i],
  ['/library/', /Qubix Library/],
  ['/library/functions.html', /Calculus From The Ground Up/],
  ['/library/big-sheet-of-graphs.html', /The Big Sheet of Graphs/]
]) {
  const r = await get(path);
  const title = (r.body.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  ok(`${path.padEnd(34)} ${r.status}`, r.status === 200 && expect.test(title), title.slice(0, 40));
}

// 2. Every header vercel.json promises is actually sent.
const root = await get('/');
const rule = want.find(h => h.source === '/(.*)');
for (const h of rule.headers) {
  const got = root.headers.get(h.key.toLowerCase());
  ok(`header ${h.key}`, !!got, got ? (got.length > 46 ? got.slice(0, 46) + '…' : got) : 'MISSING');
}

// 3. The library's lifted runtime must be reachable, or the labs are dead.
const js = await get('/library/big-sheet-of-graphs.js');
ok('the lifted runtime is served', js.status === 200 && js.body.includes('afr'), `${js.status}, ${(js.body.length / 1024).toFixed(1)} kB`);

// 4. And the figures actually made it, rather than an empty shell.
const sheet = await get('/library/big-sheet-of-graphs.html');
const figs = (sheet.body.match(/<svg class="af"/g) || []).length;
ok('the sheet carries its figures', figs > 400, `${figs} figures`);

console.log(`\n${bad ? `${bad} check(s) FAILED` : 'all checks pass'}`);
process.exit(bad ? 1 : 0);
