import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = path.resolve('.');
const studioPath = '/shorts/functions/mascot-studio/';
const outputDir = path.resolve('shorts/functions/mascot-studio/renders');
const finalOutputDir = path.resolve('shorts/functions/mascot-studio/renders-final');
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
const posterOnly = process.argv.includes('--poster-only');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

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
await fs.mkdir(finalOutputDir, { recursive: true });
await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1180, height: 900 }, acceptDownloads: true });

try {
  await page.goto(`http://127.0.0.1:${port}${studioPath}`, { waitUntil: 'networkidle' });
  await page.selectOption('#background-select', 'transparent');
  await page.selectOption('#speed-select', '1');

  if (!posterOnly) {
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
  }

  const errors = await page.evaluate(() => window.__mascotRenderErrors || []);
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}

const idleVideo = path.join(outputDir, 'qubix-cube-idle.webm');
const idlePoster = path.join(outputDir, 'qubix-cube-idle.png');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
await run(ffmpeg, [
  '-y', '-ss', '0.5', '-i', idleVideo,
  '-vf', 'colorkey=0x000000:0.018:0.04,format=rgba',
  '-frames:v', '1', '-update', '1', idlePoster
]);
console.log('Saved transparent idle poster.');

if (!posterOnly) {
  for (const animation of animations) {
    await run(ffmpeg, [
      '-loglevel', 'error', '-y', '-c:v', 'libvpx-vp9',
      '-i', path.join(outputDir, `qubix-cube-${animation}.webm`),
      '-vf', 'scale=270:480:flags=lanczos',
      '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
      '-crf', '34', '-b:v', '0', '-an',
      path.join(finalOutputDir, `qubix-cube-${animation}.webm`)
    ]);
  }
  console.log(`Optimised ${animations.length} app and production clips.`);
}

await run(ffmpeg, [
  '-loglevel', 'error', '-y', '-i', idlePoster,
  '-vf', 'scale=270:480:flags=lanczos',
  path.join(finalOutputDir, 'qubix-cube-idle.png')
]);
console.log('Saved optimised idle poster.');

console.log(posterOnly
  ? 'Rendered transparent idle poster.'
  : `Rendered ${animations.length} transparent animation clips.`);
