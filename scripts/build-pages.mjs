// Build the preview mirror: the same site, addressed at a repository subpath,
// with the asset workshop switched on.
//
// The two differences from a production build are both environment variables,
// set here rather than on the command line so this works the same in PowerShell
// and in bash:
//
//   VITE_BASE      the site lives under /QUBIX_UNI-/ on github.io, not at /
//   VITE_WORKSHOP  opens the asset showcases and missions, which the real
//                  production build leaves closed
//
//   npm run build:pages

import { execSync } from 'node:child_process';

const repo = execSync('git remote get-url origin', { encoding: 'utf8' })
  .trim().replace(/\.git$/, '').split('/').pop();
const base = `/${repo}/`;

console.log(`  building the mirror for ${base} with the workshop open\n`);
execSync('npm run build', {
  stdio: 'inherit',
  env: { ...process.env, VITE_BASE: base, VITE_WORKSHOP: '1' }
});
console.log(`\n  built. Now run: node scripts/publish-pages.mjs`);
