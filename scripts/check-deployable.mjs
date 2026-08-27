// A guard that reads a file the deploy does not upload is a guard that fails
// only in production.
//
// This has now happened three times in a row, each time discovered by a failed
// deploy rather than by anything local:
//
//   data/            excluded, and it also matched src/lib/data/, which broke
//                    the build on "Could not resolve ../lib/data/superstore.js"
//   docs/            excluded, and check-motion reads docs/MEDIA-RULE.md
//   curriculum/      excluded, and check-motion reads the approval register
//
// Locally every one of them passed, because locally every file is present. The
// only difference is the upload, so the upload is what has to be checked.
//
// This reads the paths the prebuild scripts actually open, applies the
// .vercelignore rules to each, and refuses any that would not arrive.
//
//   node scripts/check-deployable.mjs

import { readFileSync, readdirSync, existsSync } from 'node:fs';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const ROOT = dir('../');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

/* ── the ignore rules, in order ──────────────────────────────────────────── */
const rules = readFileSync(ROOT + '.vercelignore', 'utf8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))
  .map(line => ({ negate: line.startsWith('!'), pattern: line.replace(/^!/, '') }));

check(rules.length > 0, 'the deploy has ignore rules to check against', `${rules.length} rules`);

/**
 * gitignore semantics, enough of them to be useful: a trailing slash or a bare
 * name matches a directory at any depth unless the pattern is anchored with a
 * leading slash, and a later rule wins over an earlier one.
 */
function excluded(path) {
  let verdict = false;
  for (const { negate, pattern } of rules) {
    const anchored = pattern.startsWith('/');
    const body = pattern.replace(/^\//, '').replace(/\/$/, '');
    const rx = new RegExp('^' + body
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '[^/]*') + '(/|$)');
    const hit = anchored
      ? rx.test(path)
      : path.split('/').some((_, i) => rx.test(path.split('/').slice(i).join('/')));
    if (hit) verdict = !negate;
  }
  return verdict;
}

/* ── what prebuild actually opens ────────────────────────────────────────── */
const prebuild = JSON.parse(readFileSync(ROOT + 'package.json', 'utf8')).scripts.prebuild;
const scripts = [...prebuild.matchAll(/scripts\/([a-z-]+\.mjs)/g)].map(m => m[1]);
check(scripts.length > 0, 'prebuild names scripts to inspect', `${scripts.length} scripts`);

const needed = new Set();
for (const name of scripts) {
  const path = ROOT + 'scripts/' + name;
  if (!existsSync(path)) continue;
  const source = readFileSync(path, 'utf8');
  // dir('../something') and new URL('../something', import.meta.url)
  for (const [, target] of source.matchAll(/dir\('\.\.\/([^']+)'\)/g)) needed.add(target);
  for (const [, target] of source.matchAll(/new URL\('\.\.\/([^']+)', import\.meta\.url\)/g)) needed.add(target);
}

check(needed.size > 0, 'prebuild scripts open files this guard can see', `${needed.size} paths`);

const missing = [];
for (const target of [...needed].sort()) {
  // Generated outputs do not need to be uploaded; they are produced by the build.
  if (target.startsWith('public/data/') || target.startsWith('dist')) continue;
  if (!existsSync(ROOT + target)) continue;
  if (excluded(target)) missing.push(target);
}

check(missing.length === 0,
  'every file a prebuild guard reads will reach the deploy',
  missing.length
    ? `${missing.join(', ')} — excluded by .vercelignore, so the build fails on ENOENT`
    : `${needed.size} paths checked`);

/* ── and the src tree is never caught by a data rule ─────────────────────── */
const srcPaths = [];
const walk = d => {
  for (const entry of readdirSync(ROOT + d, { withFileTypes: true })) {
    const rel = `${d}/${entry.name}`;
    if (entry.isDirectory()) walk(rel);
    else if (/\.(js|svelte)$/.test(entry.name)) srcPaths.push(rel);
  }
};
walk('src');
const swallowed = srcPaths.filter(excluded);
check(swallowed.length === 0,
  'nothing under src/ is swallowed by an unanchored ignore rule',
  swallowed.length ? swallowed.slice(0, 4).join(', ') : `${srcPaths.length} source files`);

console.log(failed
  ? '\n  the deploy would fail on a file it never uploaded\n'
  : '\n  everything the build reads is something the deploy sends\n');
process.exit(failed ? 1 : 0);
