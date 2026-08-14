#!/usr/bin/env node
// One-command production deploy: build -> vercel --prod -> alias to the stable
// production URL. Run with:  pnpm run deploy
//
// WHY: this project has no git-push auto-deploy. Committing/pushing puts code on
// GitHub but does NOTHING to Vercel until someone runs the deploy + alias by
// hand. That gap keeps stranding changes as "committed but not live". This
// chains all three steps so a deploy is a single command.
//
// THIS REPO OWNS PRODUCTION. `qubix.university` is served from here.
// The legacy untracked `Strata` folder is a different Vercel project and is
// blocked from taking this alias — see ../scripts/deploy.mjs there.
import { execSync } from 'node:child_process';

// Stable Vercel-owned alias that always resolves, plus the public custom
// domain(s). The custom domains are best-effort: until they are added to the
// project AND DNS-verified in Vercel, aliasing them fails, and that must not
// abort the deploy or stop the stable alias from updating.
const STABLE_ALIAS = 'strata-nine-pi.vercel.app';
const CUSTOM_ALIASES = ['qubix.university', 'www.qubix.university'];

// Build production EXPLICITLY. `npm run build` with no argument infers the mode
// from the local environment, so on a machine configured for staging it would
// produce a staging build — pointed at the staging Supabase — and this script
// would then alias it to production. Passing the mode removes that trapdoor.
console.log('▸ building (production, explicit)…');
execSync('node scripts/build-app.mjs production', { stdio: 'inherit' });

console.log('▸ deploying to Vercel (production)…');
const out = execSync('npx vercel --prod --yes 2>&1', { encoding: 'utf8' });
const url = (out.match(/https:\/\/strata-[a-z0-9-]+\.vercel\.app/) || [])[0];
if (!url) {
  console.error(out);
  throw new Error('Could not find a deployment URL in the vercel output.');
}
console.log('  deployed: ' + url);

console.log(`▸ aliasing ${url} → ${STABLE_ALIAS}…`);
execSync(`npx vercel alias set ${url} ${STABLE_ALIAS}`, { stdio: 'inherit' });

for (const alias of CUSTOM_ALIASES) {
  try {
    execSync(`npx vercel alias set ${url} ${alias}`, { stdio: 'inherit' });
    console.log(`  ✓ aliased ${alias}`);
  } catch {
    console.warn(`  ⚠ ${alias} not aliased yet — add + DNS-verify the domain in Vercel first (continuing)`);
  }
}

console.log(`\n✅ live: https://${STABLE_ALIAS}`);
console.log(`   → https://qubix.university once its DNS is verified in Vercel`);
