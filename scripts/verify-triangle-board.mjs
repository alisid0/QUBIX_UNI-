import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const url = 'http://127.0.0.1:4178/?mode=factory&bb=triangle-angles';
const browser = await chromium.launch({ headless: true });

async function verify(viewport, label) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Angle Sum of a Triangle' }).waitFor();
  const card = code => page.locator('article.variant').filter({ has: page.locator('.code', { hasText: code }) }).first();

  for (const code of ['S1-A', 'S1-B', 'S1-I1', 'S1-I2', 'S1-X1', 'S1-X2', 'S2-A', 'S2-B', 'S2-I1', 'S2-I2', 'S2-I3', 'S2-X1', 'S2-X2', 'S3-A', 'S3-B', 'S3-I1', 'S3-I2', 'S3-X1', 'S3-X2']) {
    if (await card(code).count() !== 1) throw new Error(`${label}: missing or duplicate ${code}`);
  }
  for (const code of ['S1-A', 'S1-I1', 'S1-I2', 'S1-X1', 'S1-X2', 'S2-B', 'S2-I3', 'S2-X1', 'S2-X2', 'S3-A', 'S3-I1', 'S3-I2']) {
    if (!(await card(code).getAttribute('class')).includes('selected')) throw new Error(`${label}: ${code} is not selected`);
  }

  await card('S1-I1').getByRole('slider', { name: 'Move the top vertex sideways' }).fill('200');
  await card('S1-I1').getByRole('slider', { name: 'Move the top vertex up or down' }).fill('100');
  const moved = await card('S1-I1').locator('svg').getAttribute('aria-label');
  const measures = [...moved.matchAll(/\d+/g)].map(m => Number(m[0]));
  if (measures.reduce((sum, n) => sum + n, 0) !== 180) throw new Error(`${label}: moved triangle does not total 180`);

  await card('S1-I2').getByRole('button', { name: 'right', exact: true }).click();
  if (!(await card('S1-I2').locator('svg').getAttribute('aria-label')).includes('90')) throw new Error(`${label}: right preset lacks 90°`);
  if (await card('S1-I2').locator('.triangle-right').count() !== 1) throw new Error(`${label}: right preset lacks perpendicular square`);

  await card('S2-I1').getByRole('button', { name: 'LINE UP THE THREE CORNERS' }).click();
  await card('S2-I1').locator('.triangle-sum-bar').waitFor();

  await card('S2-I2').getByRole('button', { name: 'tall', exact: true }).click();
  const strip = await card('S2-I2').locator('.triangle-sum-bar em').allTextContents();
  if (strip.map(v => Number(v.replace('°', ''))).reduce((sum, n) => sum + n, 0) !== 180) throw new Error(`${label}: sum strip does not total 180`);

  await card('S2-I3').getByRole('button', { name: 'LINE UP THE THREE CORNERS' }).click();
  await card('S2-I3').locator('.triangle-sum-bar').waitFor();
  await card('S2-I3').getByRole('button', { name: 'leaning', exact: true }).click();
  const combined = await card('S2-I3').locator('.triangle-sum-bar em').allTextContents();
  if (combined.map(v => Number(v.replace('°', ''))).reduce((sum, n) => sum + n, 0) !== 180) throw new Error(`${label}: combined S2 stage does not total 180`);

  await card('S3-I1').getByRole('button', { name: 'REVEAL THE REMAINDER' }).click();
  await card('S3-I1').locator('svg[aria-label*="50, 60 and 70 degrees"]').waitFor();
  await card('S3-I1').getByRole('button', { name: 'Increase angle A' }).click();
  await card('S3-I1').locator('svg[aria-label*="unknown degrees"]').waitFor();

  await card('S3-I2').getByRole('button', { name: '60°', exact: true }).click();
  await card('S3-I2').getByRole('button', { name: 'Increase angle A' }).click();
  await card('S3-I2').getByRole('button', { name: 'Increase angle A' }).click();
  await card('S3-I2').getByText('Target reached: C is 60°.', { exact: true }).waitFor();

  await card('S1-X1').getByRole('button', { name: 'The three openings inside its three vertices' }).click();
  await card('S2-X1').getByRole('button', { name: 'It remains 180°' }).click();
  await card('S3-X1').getByRole('button', { name: '70°' }).click();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`${label}: horizontal overflow ${overflow}px`);
  await page.screenshot({ path: join(tmpdir(), `qubix-triangle-${label}.png`), fullPage: true });
  await page.close();
  return `${label}: combined S2 stage, all interaction candidates, checks and responsive width verified`;
}

try {
  console.log(await verify({ width: 1280, height: 900 }, 'desktop'));
  console.log(await verify({ width: 390, height: 844 }, 'mobile'));
} finally {
  await browser.close();
}
