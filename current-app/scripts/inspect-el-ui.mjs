/**
 * Opens ElevenLabs in Brave, takes a screenshot, and logs interactive elements.
 * Run once to understand the UI structure before full automation.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BRAVE_EXE  = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const DEBUG_PORT = 9222;
const EL_URL     = 'https://elevenlabs.io/app/image-video';

const { spawn } = await import('child_process');
const braveProc = spawn(BRAVE_EXE, [
  `--remote-debugging-port=${DEBUG_PORT}`,
  '--no-first-run',
  EL_URL,
], { detached: true, stdio: 'ignore' });
braveProc.unref();

console.log('Waiting for Brave...');
await new Promise(r => setTimeout(r, 5000));

const browser = await chromium.connectOverCDP(`http://localhost:${DEBUG_PORT}`);
const context  = browser.contexts()[0];
const pages    = context.pages();
const page     = pages.find(p => p.url().includes('elevenlabs')) || pages[0];

await page.waitForLoadState('domcontentloaded').catch(() => {});
await new Promise(r => setTimeout(r, 3000));

// Screenshot
const shot = await page.screenshot({ fullPage: false });
writeFileSync('el-screenshot.png', shot);
console.log('Screenshot saved: el-screenshot.png');

// Log all textareas / contenteditable / buttons
const elements = await page.evaluate(() => {
  const results = [];
  const els = document.querySelectorAll('textarea, [contenteditable], button, input[type="text"]');
  els.forEach(el => {
    results.push({
      tag:         el.tagName,
      type:        el.getAttribute('type') || '',
      placeholder: el.getAttribute('placeholder') || '',
      ariaLabel:   el.getAttribute('aria-label') || '',
      text:        el.textContent?.trim().slice(0, 60) || '',
      id:          el.id || '',
      classes:     el.className?.toString().slice(0, 80) || '',
    });
  });
  return results;
});

console.log('\n=== Interactive elements ===');
elements.forEach((e, i) => console.log(`[${i}]`, JSON.stringify(e)));

await browser.close();
