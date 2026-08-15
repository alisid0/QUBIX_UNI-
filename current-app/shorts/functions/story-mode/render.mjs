import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const appRoot = path.resolve('.');
const storyPath = '/shorts/functions/story-mode/';
const outputDir = path.resolve('shorts/functions/story-mode');
const port = 4183;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4'
};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
    const relative = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
    const filename = path.resolve(appRoot, `.${relative}`);
    if (!filename.startsWith(appRoot)) throw new Error('Invalid path');
    const data = await fs.readFile(filename);
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filename)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.QUBIX_CHROMIUM_PATH || undefined,
  args: ['--autoplay-policy=no-user-gesture-required']
});
const page = await browser.newPage({ viewport: { width: 540, height: 960 }, acceptDownloads: true });

try {
  await page.goto(`http://127.0.0.1:${port}${storyPath}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.filmReady === true);
  console.log('Rendering Qubix Function Quest...');
  const downloadReady = page.waitForEvent('download', { timeout: 120000 });
  const result = await page.evaluate(() => window.renderFilm());
  const download = await downloadReady;
  const output = path.join(outputDir, `qubix-functions-story-mode-short.${result.extension}`);
  await download.saveAs(output);
  console.log(JSON.stringify({ ...result, output }, null, 2));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
