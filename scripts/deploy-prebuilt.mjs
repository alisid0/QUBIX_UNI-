// Ship the finished build, instead of asking Vercel to build it.
//
// Why this exists: Vercel's own build step for this project stalls. Deployments
// sit at "Deployment is building" indefinitely -- three of them did, one for two
// days -- while the identical build finishes locally in under ten seconds. Until
// that is diagnosed from the build log (which the CLI cannot fetch, because
// Deployment Protection blocks the status API), this uploads dist/ as a
// finished artifact through the Build Output API and skips the build entirely.
//
// The dangerous part is the headers. `vercel.json` is read by Vercel's build; a
// prebuilt deployment is configured by .vercel/output/config.json instead. Ship
// this carelessly and a production site loses its Content-Security-Policy and
// HSTS without anyone noticing. So every header rule is translated here, and
// scripts/verify-deploy.mjs checks them on the deployment afterwards.
//
//   node scripts/deploy-prebuilt.mjs           # preview, for checking
//   node scripts/deploy-prebuilt.mjs --prod    # promote to qubix.university

import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Pinned rather than @latest. On 2026-08-27 vercel@latest could not install at
// all: it depends on @vercel/container@3.0.2, which is not published, so every
// deploy failed on npx before reaching Vercel. A deploy tool that breaks when
// somebody else publishes is not a deploy tool. Raise this deliberately.
const VERCEL = 'vercel@59.6.2';
const PROD = process.argv.includes('--prod');
const sh = (cmd, o = {}) => (execSync(cmd, { encoding: 'utf8', ...o }) || '').trim();
const die = (m, fix) => { console.error(`\n  Refusing to deploy: ${m}`); if (fix) console.error(`  ${fix}`); process.exit(1); };

if (sh('git status --porcelain')) die('the working tree has uncommitted changes.', 'Commit them, so the release matches a commit.');
if (!existsSync('dist')) die('dist/ does not exist.', 'Run "npm run build" first.');

const commit = sh('git rev-parse --short HEAD');
const vercelJson = JSON.parse(readFileSync('vercel.json', 'utf8'));

// Translate every vercel.json header rule into a Build Output route. `continue`
// keeps the request flowing to the file after the headers are attached.
const globToRe = src => '^' + src.replace(/\(\.\*\)/g, '.*').replace(/\//g, '\\/').replace(/\\\/\.\*/g, '\\/.*') + '$';
const routes = (vercelJson.headers || []).map(rule => ({
  src: globToRe(rule.source),
  headers: Object.fromEntries(rule.headers.map(h => [h.key, h.value])),
  continue: true
}));
// A static site with no server: everything else is served from the filesystem.
routes.push({ handle: 'filesystem' });

const OUT = '.vercel/output';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'static'), { recursive: true });
cpSync('dist', join(OUT, 'static'), { recursive: true });
writeFileSync(join(OUT, 'config.json'), JSON.stringify({ version: 3, routes }, null, 2));

console.log(`  prepared ${routes.length - 1} header rules from vercel.json`);
for (const r of routes.slice(0, -1)) console.log(`    ${r.src.padEnd(22)} ${Object.keys(r.headers).length} headers`);
console.log(`  uploading dist/ as a finished build (${PROD ? 'PRODUCTION' : 'preview'})…\n`);

sh(`npx --yes ${VERCEL} deploy --prebuilt --yes${PROD ? ' --prod' : ''}`, { stdio: 'inherit' });
console.log(`\n  shipped ${commit}. Now run: node scripts/verify-deploy.mjs <url>`);
