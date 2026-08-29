// Package the quarter for release.
//
// The full estate is 360 MB across 54 files. It cannot go in git: sale_line.csv
// alone is 187 MB and GitHub refuses any file over 100 MB, and even if it fit,
// the generator is seeded so regenerating shifts every downstream byte and the
// CSVs would not delta against their old selves. Each rebuild would add most of
// 360 MB to history permanently, on a public repo, for data a command
// reproduces exactly in eight seconds.
//
// So it ships as a release asset instead, which allows 2 GB a file and never
// touches history. It compresses about 79%, because CSV is mostly repeated
// commas and digits.
//
//   npm run data:pack
//
// The archive is reproducible: same input, byte-identical output. tar normally
// stamps the current time and the building user into every header, which would
// make two archives of identical data differ, so mtime, uid, gid and owner
// names are all pinned and the entries are sorted.

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { CHAIN } from '../src/lib/game/superstore.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DATA = dir('../data/');
const OUT = dir('../dist-data/');

if (!existsSync(DATA + 'sale.csv')) {
  console.error('\n  no data/ to pack. run: npm run data\n');
  process.exit(1);
}

// data/ is gitignored, so it can go stale without anybody noticing: a smoke test
// with --branches 6 or --days 7 leaves a partial estate sitting there under the
// right filenames. Packing that and publishing it would ship a dataset that does
// not match its own README, so the estate is counted before anything is packed.
const branches = readFileSync(DATA + 'branch.csv', 'utf8').trim().split(/\r?\n/).length - 1;
if (branches !== CHAIN.branches) {
  console.error(`\n  data/ holds ${branches} branches, not ${CHAIN.branches}.`);
  console.error('  That is a sample or a stale smoke test, not the quarter.');
  console.error('  Rebuild it first:  npm run data\n');
  process.exit(1);
}

const quarter = `${CHAIN.quarterStart.slice(0, 4)}Q${Math.floor(Number(CHAIN.quarterStart.slice(5, 7)) / 3) + 1}`;
const name = `qubix-quarter-${quarter}.tar.gz`;

mkdirSync(OUT, { recursive: true });
if (existsSync(OUT + name)) rmSync(OUT + name);

const tables = readdirSync(DATA).filter(n => n.endsWith('.csv')).sort();
const raw = tables.reduce((n, t) => n + statSync(DATA + t).size, 0)
  + statSync(DATA + 'README.md').size;

console.log(`\n  packing ${tables.length} tables and the README\n`);

// --mtime, --owner, --group and --numeric-owner strip everything that would
// otherwise differ between two runs of the same data on two machines. The mtime
// is an epoch rather than a date string so no locale can reinterpret it.
//
// --force-local is the Windows tax: GNU tar reads "C:/Users/..." as a remote
// host called C, tries to ssh to it, and fails with "cannot connect".
const epoch = Math.floor(Date.parse(CHAIN.quarterStart + 'T00:00:00Z') / 1000);
execFileSync('tar', [
  '--create', '--gzip', '--force-local', '--file', OUT + name,
  '--directory', DATA,
  '--sort=name',
  `--mtime=@${epoch}`,
  '--owner=0', '--group=0', '--numeric-owner',
  'README.md', ...tables
], { stdio: 'inherit' });

const packed = statSync(OUT + name).size;
const mb = n => (n / 1048576).toFixed(1) + ' MB';

console.log(`   ${'uncompressed'.padEnd(20)}${mb(raw).padStart(10)}`);
console.log(`   ${'archive'.padEnd(20)}${mb(packed).padStart(10)}   (${(100 - packed / raw * 100).toFixed(0)}% smaller)`);
console.log(`\n  dist-data/${name}`);
console.log(`\n  publish it with:\n    gh release create data-${quarter} dist-data/${name} \\\n`
  + `      --title "Qubix Group dataset, ${quarter}" --notes-file data/README.md\n`);
