import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const HOST = '127.0.0.1';
const PORT = 4173;
const BASE_URL = `http://${HOST}:${PORT}`;
const distRoot = fileURLToPath(new URL('../dist/', import.meta.url));
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2'
};

const preview = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, BASE_URL).pathname);
    // Vercel injects this endpoint in production; a local static build has no
    // analytics service, so treat it as an intentionally empty response.
    if (pathname.startsWith('/_vercel/')) {
      response.writeHead(204);
      response.end();
      return;
    }
    const relative = normalize(pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, ''));
    let target = join(distRoot, relative);
    if (!target.startsWith(distRoot)) throw new Error('Invalid path');
    let body;
    try {
      body = await readFile(target);
    } catch (_) {
      if (extname(relative)) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end(`Missing built asset: ${relative}`);
        return;
      }
      target = join(distRoot, 'index.html');
      body = await readFile(target);
    }
    response.writeHead(200, { 'Content-Type': mime[extname(target)] || 'application/octet-stream' });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end(error.message);
  }
});

async function startPreview() {
  await new Promise((resolve, reject) => {
    preview.once('error', reject);
    preview.listen(PORT, HOST, resolve);
  });
}

function monitor(page, label) {
  const failures = [];
  page.on('pageerror', (error) => failures.push(`${label} page error: ${error.stack || error.message}`));
  page.on('response', (response) => {
    if (response.url().startsWith(BASE_URL) && response.status() >= 400) {
      failures.push(`${label} ${response.status()}: ${response.url()}`);
    }
  });
  return failures;
}

async function enterAsGuest(page) {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  const guest = page.getByRole('button', { name: 'Continue as guest' });
  if (await guest.isVisible({ timeout: 10_000 }).catch(() => false)) await guest.click();
  await page.getByText('Your learning studio').waitFor({ state: 'visible', timeout: 15_000 });
}

async function desktopJourney(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const failures = monitor(page, 'desktop');
  await enterAsGuest(page);

  await page.keyboard.press('Control+K');
  const palette = page.getByRole('dialog', { name: 'Search boards' });
  await palette.waitFor({ state: 'visible' });
  await palette.getByPlaceholder('Search 429 boards...').fill('Matter and mass');
  await palette.locator('.result-row').first().waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await palette.waitFor({ state: 'hidden' });

  await page.getByRole('button', { name: 'Did you know' }).click();
  await page.getByRole('heading', { name: 'Quick reads' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Exit quick reads' }).click();

  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('button', { name: 'Path' }).click();
  await page.getByRole('heading', { name: 'Path' }).waitFor({ state: 'visible' });
  await page.locator('.topic-tile').first().click();
  await page.locator('.board-row').first().waitFor({ state: 'visible', timeout: 15_000 });
  await page.locator('.board-row').first().click();
  await page.getByRole('region', { name: 'Lesson cards' }).waitFor({ state: 'visible' });
  await page.locator('.floor-text').first().waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Back to topic' }).click();
  await page.locator('.board-row').first().waitFor({ state: 'visible' });
  await page.locator('.back-chev').click();

  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await nav.getByRole('button', { name: 'Workshop' }).click();
  await page.getByRole('heading', { name: 'Learn forwards. Solve backwards.' }).waitFor({ state: 'visible', timeout: 15_000 });
  await nav.getByRole('button', { name: 'W Score' }).click();
  await page.locator('.stats-view').waitFor({ state: 'visible' });

  assert.equal(failures.length, 0, failures.join('\n'));
  await context.close();
}

async function mobileJourney(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const failures = monitor(page, 'mobile');
  await enterAsGuest(page);

  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const label of ['Home', 'Path', 'Workshop', 'W Score']) {
    await nav.getByRole('button', { name: label }).waitFor({ state: 'visible' });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 1, `mobile viewport overflows horizontally by ${overflow}px`);

  await nav.getByRole('button', { name: 'Path' }).click();
  await page.getByRole('tablist', { name: 'Choose a discipline' }).waitFor({ state: 'visible' });
  await page.getByRole('tab', { name: /Mathematics/ }).click();
  await page.locator('.topic-tile').first().waitFor({ state: 'visible' });

  assert.equal(failures.length, 0, failures.join('\n'));
  await context.close();
}

let browser;
try {
  await startPreview();
  browser = await chromium.launch({ headless: true });
  await desktopJourney(browser);
  await mobileJourney(browser);
  console.log('Launch smoke checks passed: desktop and mobile guest journeys are healthy.');
} finally {
  await browser?.close();
  preview.close();
}
