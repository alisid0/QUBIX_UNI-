import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const url = 'http://127.0.0.1:4178/?mode=factory&bb=angles';
const browser = await chromium.launch({ headless: true });

async function verify(viewport, label) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Angles and Turns' }).waitFor();

  for (const code of ['S1-A', 'S1-B', 'S1-I1', 'S1-I2', 'S1-X1', 'S1-X2', 'S2-I1', 'S2-I2', 'S3-I1', 'S3-I2']) {
    if (await page.getByText(code, { exact: false }).count() === 0) throw new Error(`${label}: missing ${code}`);
  }
  const card = code => page.locator('article.variant').filter({ has: page.locator('.code', { hasText: code }) }).first();
  for (const code of ['S1-B', 'S1-I1', 'S1-I2', 'S1-X1', 'S1-X2', 'S2-B', 'S2-I1', 'S2-X1', 'S2-X2', 'S3-I1', 'S3-X1', 'S3-X2']) {
    if (!(await card(code).getAttribute('class')).includes('selected')) throw new Error(`${label}: ${code} is not selected`);
  }

  await card('S1-I1').getByRole('button', { name: 'Increase angle by 15 degrees' }).click();
  await card('S1-I1').getByText('75°', { exact: true }).first().waitFor();
  await card('S1-I1').getByRole('button', { name: 'Increase angle by 15 degrees' }).click();
  if (await card('S1-I1').locator('.right-box.current').count() !== 1) throw new Error(`${label}: 90° is missing the perpendicular square`);
  if (await card('S1-I1').locator('.angle-arc').count() !== 0) throw new Error(`${label}: 90° still shows a curved arc`);

  await card('S1-I2').getByRole('button', { name: '120°' }).click();
  await card('S1-I2').locator('svg[aria-label*="120 degree"]').waitFor();

  await card('S2-I1').locator('input[type="range"]').fill('110');
  await card('S2-I1').getByText('60° stays fixed', { exact: true }).waitFor();
  await card('S2-I1').locator('svg[aria-label*="60 degree"]').waitFor();

  await card('S2-I2').getByRole('button', { name: 'WHICH IS LARGER?' }).click();
  await card('S2-I2').getByText(/100° is larger/).waitFor();

  await card('S3-I1').getByRole('button', { name: 'Increase angle by 15 degrees' }).click();
  await card('S3-I1').getByRole('button', { name: 'Increase angle by 15 degrees' }).click();
  await card('S3-I1').getByRole('button', { name: 'Increase angle by 15 degrees' }).click();
  await card('S3-I1').getByText('obtuse', { exact: true }).waitFor();

  await card('S3-I2').getByRole('button', { name: 'acute' }).click();
  await card('S3-I2').getByText('Correct', { exact: true }).waitFor();
  await card('S3-I2').getByRole('button', { name: 'NEXT ANGLE' }).click();
  await card('S3-I2').locator('svg[aria-label*="90 degree"]').waitFor();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`${label}: horizontal overflow ${overflow}px`);
  await page.screenshot({ path: join(tmpdir(), `qubix-angles-${label}.png`), fullPage: true });
  await page.close();
  return `${label}: all six interactions and responsive width verified`;
}

try {
  console.log(await verify({ width: 1280, height: 900 }, 'desktop'));
  console.log(await verify({ width: 390, height: 844 }, 'mobile'));
} finally {
  await browser.close();
}
