// Put the library on a public URL without going through Vercel.
//
// Why this exists: `vercel deploy` for this project stalls indefinitely, even
// with --prebuilt, so there is no build step left to blame. Until that is
// diagnosed from the dashboard, this publishes the two reference books to
// GitHub Pages from an orphan branch, so the work is readable by anyone with
// the link while the deploy problem stays open.
//
// Only public/library is published. The app itself is not: this is a mirror of
// the reference shelf, not a second copy of the product.
//
//   node scripts/publish-pages.mjs

import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BRANCH = 'gh-pages';
const sh = (cmd, o = {}) => (execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...o }) || '').trim();
const die = (m, fix) => { console.error(`\n  Refusing to publish: ${m}`); if (fix) console.error(`  ${fix}`); process.exit(1); };

if (!existsSync('public/library')) die('public/library does not exist.', 'Run "npm run build:library" first.');
const commit = sh('git rev-parse --short HEAD');
const repo = sh('gh repo view --json nameWithOwner --jq .nameWithOwner');
const [owner, name] = repo.split('/');

// An orphan branch each time, so the history never accumulates megabytes of
// regenerated HTML. The branch is generated output and is force-pushed.
const work = mkdtempSync(join(tmpdir(), 'qx-pages-'));
try {
  sh(`git worktree add --detach "${work}"`);
  sh('git checkout --orphan gh-pages', { cwd: work });
  sh('git rm -rf --cached . 2>&1 || true', { cwd: work, shell: true });
  for (const f of sh('git ls-files', { cwd: work }).split('\n').filter(Boolean)) rmSync(join(work, f), { force: true });

  cpSync('public/library', work, { recursive: true });
  // Without this, Pages runs Jekyll and drops anything beginning with an
  // underscore. Nothing here does, but the build is slower and can only fail.
  writeFileSync(join(work, '.nojekyll'), '');

  sh('git add -A', { cwd: work });
  sh(`git commit -q -m "Publish the library from ${commit}"`, { cwd: work });
  sh(`git push -q -f origin ${BRANCH}`, { cwd: work });
  console.log(`  pushed ${BRANCH} from ${commit}`);
} finally {
  sh(`git worktree remove --force "${work}"`, { stdio: 'ignore' });
  rmSync(work, { recursive: true, force: true });
}

// Point Pages at the branch. Creating twice is not an error worth stopping for.
const api = (method, path, body = '') =>
  sh(`gh api -X ${method} ${path}${body} 2>&1 || true`, { shell: true });
let out = api('POST', `repos/${repo}/pages`, ` -f "source[branch]=${BRANCH}" -f "source[path]=/"`);
if (/already exists/i.test(out)) out = api('PUT', `repos/${repo}/pages`, ` -f "source[branch]=${BRANCH}" -f "source[path]=/"`);
if (/message/.test(out) && !/already exists/i.test(out)) console.log(`  pages api: ${out.slice(0, 300)}`);

const url = `https://${owner.toLowerCase()}.github.io/${name}/`;
console.log(`\n  ${url}`);
console.log('  Pages takes a minute or two on first publish. Then run:');
console.log(`    node scripts/verify-pages.mjs ${url}`);
