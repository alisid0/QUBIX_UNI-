import { execSync } from 'node:child_process';

const requestedMode = process.argv[2];
const vercelEnvironment = process.env.VERCEL_ENV;
const configuredEnvironment = process.env.VITE_APP_ENV;
const mode = requestedMode
  || (configuredEnvironment === 'staging' ? 'staging' : undefined)
  || (vercelEnvironment === 'preview' ? 'staging' : 'production');

if (!['production', 'staging'].includes(mode)) {
  throw new Error(`Unsupported Qubix build environment: ${mode}`);
}

console.log(`[build-app] Building the ${mode} environment.`);
execSync(`vite build --mode ${mode}`, { stdio: 'inherit' });

if (mode === 'production') {
  execSync('node scripts/build-seo-pages.mjs', { stdio: 'inherit' });
} else {
  console.log('[build-app] Skipping production SEO page generation for staging.');
}
