// Check the Pages mirror serves the real thing, not an empty shell or a 404.
//
//   node scripts/verify-pages.mjs https://alisid0.github.io/QUBIX_UNI-/

const base = (process.argv[2] || '').replace(/\/$/, '');
if (!base) { console.error('  usage: node scripts/verify-pages.mjs <url>'); process.exit(1); }

let bad = 0;
const ok = (l, v, x = '') => { if (!v) bad++; console.log(`   ${v ? 'PASS' : '**FAIL**'}  ${l}${x ? '  ' + x : ''}`); };
const get = async path => {
  const r = await fetch(base + path, { redirect: 'follow', signal: AbortSignal.timeout(60000) });
  return { status: r.status, body: r.status < 400 ? await r.text() : '' };
};

console.log(`checking ${base}\n`);

for (const [path, expect] of [
  ['/', /Qubix Library/],
  ['/what-data-is.html', /What Data Is/],
  ['/what-a-program-does.html', /What a Computer Program Does/],
  ['/functions.html', /Calculus From The Ground Up/],
  ['/big-sheet-of-graphs.html', /The Big Sheet of Graphs/]
]) {
  const r = await get(path);
  const title = (r.body.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  ok(`${path.padEnd(26)} ${r.status}`, r.status === 200 && expect.test(title), title.slice(0, 44));
}

// A page that answers 200 with the wrong body is the failure mode that looks
// like success, so count what is actually in it.
const sheet = await get('/big-sheet-of-graphs.html');
const figs = (sheet.body.match(/<svg class="af"/g) || []).length;
const moving = (sheet.body.match(/class="plate moving/g) || []).length;
ok('the sheet carries its figures', figs > 400, `${figs} figures, ${moving} of them movable`);

// The frames are dead without the lifted runtime beside the page.
const js = await get('/big-sheet-of-graphs.js');
ok('the lifted runtime is served', js.status === 200 && js.body.includes('afr'),
  `${js.status}, ${(js.body.length / 1024).toFixed(1)} kB`);

console.log(`\n${bad ? `${bad} check(s) FAILED` : 'all checks pass'}`);
process.exit(bad ? 1 : 0);
