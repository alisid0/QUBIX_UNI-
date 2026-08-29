import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

for (const [label, viewport] of [['desktop', { width: 1280, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://127.0.0.1:4178/?mode=factory&bb=vectors', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Vectors and Displacement' }).waitFor();

  const card = code => page.locator('article.variant').filter({ has: page.locator('.code', { hasText: code }) }).first();
  for (const code of ['S1-I1', 'S1-I2', 'S2-I1', 'S2-I2', 'S3-I1', 'S3-I2']) {
    if (await card(code).count() !== 1) throw new Error(`${label}: missing ${code}`);
  }

  await card('S1-I1').getByRole('button', { name: '1 lap', exact: true }).click();
  await card('S1-I1').getByText('62.8 m', { exact: true }).waitFor();
  await card('S1-I1').getByText('0 m', { exact: true }).waitFor();

  await card('S1-I2').getByRole('button', { name: 'TRAVEL THE ARC' }).click();
  if (await card('S1-I2').locator('.orbit-marker.running').count() !== 1) throw new Error(`${label}: circular journey did not animate`);

  await card('S2-I1').getByRole('button', { name: 'W', exact: true }).click();
  await card('S2-I1').getByText('5 m W · 180° from east', { exact: true }).waitFor();
  await card('S2-I2').getByRole('button', { name: '90°', exact: true }).click();
  await card('S2-I2').getByText('5 m N · 90° from east', { exact: true }).waitFor();

  await card('S3-I1').getByRole('slider').first().fill('8');
  await card('S3-I1').getByRole('slider').nth(1).fill('315');
  await card('S3-I1').getByText('magnitude 8 · direction SE', { exact: true }).waitFor();

  await card('S3-I2').getByRole('button', { name: 'MATCH LENGTH' }).click();
  await card('S3-I2').getByRole('button', { name: 'MATCH DIRECTION' }).click();
  await card('S3-I2').getByText('Equal vectors', { exact: true }).waitFor();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`${label}: horizontal overflow ${overflow}px`);
  console.log(`${label}: six vector interactions and responsive width verified`);
  await page.close();
}

await browser.close();
