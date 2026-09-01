// The inventory must cover every finite top-level branch implemented by the
// application router. Nested states come from the registries in site-routes.
// This turns a newly added mode or mission into a failing build until it is
// deliberately classified as public, preview, legacy or internal.

import { readFileSync } from 'node:fs';
import { buildSiteRoutes, ROUTED_MISSION_SLUGS, ROUTED_MODES } from './site-routes.mjs';
import { cleanPathForHref, cleanPathForParams, paramsForPath } from '../src/lib/routes/clean-paths.js';

const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
const implementedMissions = [...new Set(
  [...app.matchAll(/mission === '([a-z-]+)'/g)].map(match => match[1])
)].sort();
const implementedModes = [...new Set(
  [...app.matchAll(/params\.get\('mode'\) === '([a-z-]+)'/g)].map(match => match[1])
)].sort();
const inventory = buildSiteRoutes();

let failed = false;
const check = (condition, label, detail) => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}  ${detail}`);
  if (!condition) failed = true;
};
const same = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);

check(same(implementedMissions, ROUTED_MISSION_SLUGS),
  'every implemented mission family is inventoried',
  `${ROUTED_MISSION_SLUGS.length} routes`);
check(same(implementedModes, ROUTED_MODES),
  'every implemented mode is inventoried',
  `${ROUTED_MODES.length} modes`);
check(new Set(inventory.map(item => item.url)).size === inventory.length,
  'the route inventory contains no duplicate URLs',
  `${inventory.length} finite routes before generated library pages`);
check(inventory.every(item => item.visibility === 'public' || !item.indexable),
  'only public routes may enter the sitemap',
  'preview, legacy and internal routes stay out of search');
const canonicalRoutes = inventory.filter(item => ['public', 'preview'].includes(item.visibility));
check(canonicalRoutes.every(item => !/[?&](?:mode|mission|prototype|lab)=/.test(item.url)),
  'learner and preview addresses use descriptive paths',
  `${canonicalRoutes.length} clean URLs`);
check(canonicalRoutes.every(item => !item.queryAlias || cleanPathForHref(item.queryAlias) === item.url),
  'every supported query address resolves to its declared clean path',
  `${canonicalRoutes.filter(item => item.queryAlias).length} compatibility mappings`);
check(canonicalRoutes.every(item => {
  const params = paramsForPath(new URL(item.url, 'https://qubix.university').pathname);
  return cleanPathForParams(params)?.split('?')[0] === item.url.split('?')[0]
    || item.url.startsWith('/library/')
    || item.url === '/';
}), 'every clean application path round-trips through the router', `${canonicalRoutes.length} routes`);

console.log(failed ? '\n  route inventory is incomplete\n' : '\n  every finite application route is classified\n');
// A route the router understands but Vercel does not rewrite is a 404 in
// production and nowhere else: Vite serves the SPA for any path, so a missing
// rewrite passes every local check and fails only once deployed. /start did
// exactly that.
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const rewritten = new Set((vercel.rewrites || [])
  .map(r => r.source.replace('/:path*', '').replace(/\/$/, '')));
const roots = new Set(inventory
  .map(r => r.url)
  // Clean paths only. The inventory also holds ?mode= aliases, which the SPA
  // serves from / and which need no rewrite of their own.
  .filter(u => typeof u === 'string' && u.startsWith('/') && u !== '/' && !u.includes('?'))
  .map(u => '/' + u.split('/').filter(Boolean)[0]));
const unserved = [...roots].filter(r => !rewritten.has(r));
check(unserved.length === 0,
  'every routed path root has a production rewrite',
  unserved.length ? unserved.join(', ') + ' would 404 on Vercel' : `${roots.size} roots served`);

process.exit(failed ? 1 : 0);
