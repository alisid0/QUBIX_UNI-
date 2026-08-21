#!/usr/bin/env node
// Production deploy for the canonical Qubix University Vercel project.
// Run with: npm run deploy
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PROJECT = 'qubix-university';
const CUSTOM_ALIASES = ['qubix.university', 'www.qubix.university'];

function fail(message) {
  console.error(`Qubix deploy refused: ${message}`);
  process.exit(1);
}

const projectFile = join('.vercel', 'project.json');
if (!existsSync(projectFile)) {
  fail(`this checkout is not linked to Vercel. Run "vercel link --project ${PROJECT}" first.`);
}

const linkedProject = JSON.parse(readFileSync(projectFile, 'utf8'));
if (linkedProject.projectName !== PROJECT) {
  fail(`this checkout is linked to "${linkedProject.projectName || 'unknown'}", not "${PROJECT}".`);
}

console.log('Building Qubix for production...');
execSync('node scripts/build-app.mjs production', { stdio: 'inherit' });

console.log('Deploying Qubix to Vercel production...');
const output = execSync('npx vercel --prod --yes 2>&1', { encoding: 'utf8' });
const deploymentUrl = (output.match(/https:\/\/[a-z0-9-]+\.vercel\.app/) || [])[0];
if (!deploymentUrl) {
  console.error(output);
  fail('Vercel did not return a deployment URL.');
}

console.log(`Deployed: ${deploymentUrl}`);
for (const alias of CUSTOM_ALIASES) {
  execSync(`npx vercel alias set ${deploymentUrl} ${alias}`, { stdio: 'inherit' });
  console.log(`Aliased: https://${alias}`);
}

console.log('Qubix production deployment complete.');
