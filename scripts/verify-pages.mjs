// Check the Pages mirror serves the real thing, not an empty shell or a 404.
//
// It checks bodies rather than status codes on purpose. Chasing a deploy
// problem, two preview URLs answered 200 for the sheet's path and turned out to
// be an SPA catch-all returning a 0.02 MB app shell with no figures in it,
// which is the failure mode that looks like success.
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
  ['/', /Qubix/],
  ['/library/', /Qubix Library/],
  ['/library/what-data-is.html', /What Data Is/],
  ['/library/what-a-program-does.html', /What a Computer Program Does/],
  ['/library/functions.html', /Calculus From The Ground Up/],
  ['/library/big-sheet-of-graphs.html', /The Big Sheet of Graphs/]
]) {
  const r = await get(path);
  const title = (r.body.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  ok(`${path.padEnd(34)} ${r.status}`, r.status === 200 && expect.test(title), title.slice(0, 40));
}

const sheet = await get('/library/big-sheet-of-graphs.html');
const figs = (sheet.body.match(/<svg class="af"/g) || []).length;
const moving = (sheet.body.match(/class="plate moving/g) || []).length;
ok('the sheet carries its figures', figs > 400, `${figs} figures, ${moving} of them movable`);

// The frames are dead without the lifted runtime beside the page.
const js = await get('/library/big-sheet-of-graphs.js');
ok('the lifted runtime is served', js.status === 200 && js.body.includes('afr'),
  `${js.status}, ${(js.body.length / 1024).toFixed(1)} kB`);

// The app is only usable on the mirror if its bundle resolves under the
// repository subpath rather than the host root.
const app = await get('/');
const asset = (app.body.match(/(?:src|href)="([^"]*assets\/[^"]+)"/) || [])[1] || '';
const prefix = new URL(base).pathname;
ok('the app bundle is built for this subpath', asset.startsWith(prefix), asset.slice(0, 54) || 'no bundle referenced');
// prefix has no trailing slash, so slicing its full length leaves the leading
// slash the fetch needs. Taking one character less pointed at /QUBIX_UNI--/.
const bundle = asset.startsWith(prefix) ? await get(asset.slice(prefix.replace(/\/$/, '').length)) : { status: 0, body: '' };
ok('the app bundle is served', bundle.status === 200, `${bundle.status}, ${(bundle.body.length / 1024).toFixed(0)} kB`);

console.log(`\n${bad ? `${bad} check(s) FAILED` : 'all checks pass'}`);
process.exit(bad ? 1 : 0);
