import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve('.');
const studioPath = '/shorts/functions/mascot-studio/';
const outputDir = path.resolve('shorts/functions/mascot-studio/renders');
const port = 4179;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webm': 'video/webm'
};

const animations = [
  'idle',
  'curious',
  'face-front',
  'face-right',
  'face-left',
  'think',
  'surprise',
  'celebrate',
  'error',
  'point-left',
  'point-right',
  'press',
  'transition'
];

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
    const relative = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
    const filename = path.resolve(root, `.${relative}`);
    if (!filename.startsWith(root)) throw new Error('Invalid path');
    const data = await fs.readFile(filename);
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filename)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

await fs.mkdir(outputDir, { recursive: true });
await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1180, height: 900 }, acceptDownloads: true });

try {
  await page.goto(`http://127.0.0.1:${port}${studioPath}`, { waitUntil: 'networkidle' });
  await page.selectOption('#background-select', 'transparent');
  await page.selectOption('#speed-select', '1');

  for (const animation of animations) {
    await page.click(`[data-animation="${animation}"]`);
    await page.waitForTimeout(180);
    const downloadReady = page.waitForEvent('download', { timeout: 15000 });
    await page.click('#record-button');
    const download = await downloadReady;
    const output = path.join(outputDir, `qubix-cube-${animation}.webm`);
    await download.saveAs(output);
    console.log(`Saved ${path.relative(root, output)}`);
  }

  const errors = await page.evaluate(() => window.__mascotRenderErrors || []);
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}

console.log(`Rendered ${animations.length} transparent animation clips.`);
