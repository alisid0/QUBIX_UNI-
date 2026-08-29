/**
 * Playwright automation: drives ElevenLabs image generator to create
 * pixel-art frames for every BB floor in the queue, saving them to
 * public/media/frames/bb-XXXX/f0/frame-1.png etc.
 *
 * Usage:
 *   node scripts/generate-frames.mjs                  # all BBs
 *   node scripts/generate-frames.mjs --gateway UNIT   # one gateway
 *   node scripts/generate-frames.mjs --bb 1000        # one BB
 *   node scripts/generate-frames.mjs --dry-run        # print queue only
 *
 * First run: browser opens, log in to ElevenLabs manually, then press Enter.
 * Subsequent runs: session is reused from the saved profile.
 */

import { chromium }   from 'playwright';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';
import { parsePrompts } from './parse-image-prompts.mjs';

const __dir      = process.cwd();
const BRAVE_EXE  = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const DEBUG_PORT = 9222;
const OUT_ROOT   = join(__dir, 'public/media/frames');
const EL_URL     = 'https://elevenlabs.io/app/image-video';
const DONE_LOG   = join(__dir, '.generated-frames.json');     // skip already done

// ── helpers ──────────────────────────────────────────────────────────────────

function loadDone() {
  if (!existsSync(DONE_LOG)) return new Set();
  return new Set(JSON.parse(readFileSync(DONE_LOG, 'utf8')));
}
function markDone(key, done) {
  done.add(key);
  writeFileSync(DONE_LOG, JSON.stringify([...done], null, 2));
}

function frameKey(bb, floor, frameIdx) {
  return `${bb}-f${floor}-frame${frameIdx + 1}`;
}

function outPath(bb, floor, frameIdx) {
  const dir = join(OUT_ROOT, `bb-${bb}`, `f${floor}`);
  mkdirSync(dir, { recursive: true });
  return join(dir, `frame-${frameIdx + 1}.png`);
}

async function waitForUser(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(res => rl.question(prompt, ans => { rl.close(); res(ans); }));
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── ElevenLabs UI helpers ─────────────────────────────────────────────────────

async function waitForIdle(page, minMs = 500) {
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(minMs);
}

/** Dismiss any modal/popup (e.g. "GPT Image 2 just launched!") */
async function dismissModals(page) {
  const closeBtn = page.locator('button[aria-label="Close"]').first();
  if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await closeBtn.click();
    await sleep(500);
  }
  // Also press Escape just in case
  await page.keyboard.press('Escape').catch(() => {});
}

/** Switch to the Image tab (not Video or Lip sync) */
async function switchToImageTab(page) {
  // The Image/Video/Lip sync tabs at the bottom of the creator
  const imageTab = page.locator('button[type="button"]:has-text("Image")').first();
  if (await imageTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await imageTab.click();
    await sleep(500);
  }
}

/** The prompt box is a ProseMirror contenteditable div */
async function fillPrompt(page, text) {
  const box = page.locator('#image-video-prompt-box');
  await box.click();
  // Select all existing content and delete it
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
  await sleep(200);
  // Type the new prompt
  await box.pressSequentially(text, { delay: 10 });
  await sleep(300);
}

/** Click the Generate button */
async function clickGenerate(page) {
  const btn = page.locator('button[type="submit"][aria-label="Generate"]');
  await btn.waitFor({ state: 'visible', timeout: 10_000 });
  await btn.click();
}

/**
 * Wait for the most recently generated image and download it.
 * Strategy: watch for the Generate button to go disabled → re-enable (generation cycle).
 * Fallback: count Recreate buttons (more stable than Download count in history view).
 */
async function waitForGeneratedImage(page, timeoutMs = 300_000) {
  const genBtn        = page.locator('button[type="submit"][aria-label="Generate"]');
  const recreateBtn   = page.locator('button[aria-label="Recreate"]');
  const beforeRecreate = await recreateBtn.count();

  console.log(`    ⏳ Generating... (${beforeRecreate} existing results)`);

  // Wait for button to go disabled (generation started) — max 15s
  await genBtn.waitFor({ state: 'disabled', timeout: 15_000 }).catch(() => {});

  // Now wait for it to become enabled again (generation done) — main wait
  await genBtn.waitFor({ state: 'enabled', timeout: timeoutMs }).catch(() => {});
  await sleep(1500); // brief settle

  // Verify: Recreate count should have gone up
  const nowRecreate = await recreateBtn.count();
  console.log(`    ✓ Done (${nowRecreate} results now)`);

  // Click the newest Download button
  const dlBtn = page.locator('button[aria-label="Download"]').last();

  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30_000 }),
    dlBtn.click({ force: true }),
  ]);

  const tmpPath = await download.path();
  if (tmpPath) return readFileSync(tmpPath);

  // Fallback: scrape the image src from the newest result img
  const imgs = page.locator('img[src*="elevenlabs"], img[src*="storage"]');
  const src  = await imgs.last().getAttribute('src').catch(() => null);
  if (src) {
    const buf = await page.evaluate(async (url) => {
      const r  = await fetch(url);
      const ab = await r.arrayBuffer();
      return Array.from(new Uint8Array(ab));
    }, src);
    return Buffer.from(buf);
  }

  throw new Error('Generation finished but could not retrieve the image');
}

/**
 * Upload a reference image via the "Image refs" upload zone.
 * The zone has role="presentation" (Playwright marks it not-enabled) so we use
 * page.evaluate() for a raw DOM click — completely bypasses Playwright actionability.
 */
async function uploadReference(page, imgPath) {
  await sleep(2000); // let UI settle after generation

  // Strategy 1: raw DOM click via evaluate (bypasses Playwright's actionability checks)
  try {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 12_000 }),
      page.evaluate(() => {
        // Try the data-agent-id zone first, fall back to any upload button
        const zone = document.querySelector('[data-agent-id^="file-upload-"]')
                  || document.querySelector('button[role="presentation"]');
        if (zone) zone.click();
      }),
    ]);
    await fileChooser.setFiles(imgPath);
    await sleep(1500);
    console.log(`    📎 Reference uploaded`);
    return;
  } catch (e1) {
    console.warn(`    ⚠  DOM click fallthrough: ${e1.message.slice(0, 80)}`);
  }

  // Strategy 2: set files directly on any visible file input
  try {
    const inputs = page.locator('input[type="file"]');
    const count  = await inputs.count();
    for (let i = 0; i < count; i++) {
      try {
        await inputs.nth(i).setInputFiles(imgPath, { timeout: 3000 });
        await sleep(1500);
        console.log(`    📎 Reference uploaded (file input ${i})`);
        return;
      } catch (_) { /* try next */ }
    }
  } catch (_) { /* fall through */ }

  // Strategy 3: dispatch a DataTransfer drop onto the zone
  try {
    const imgData = Array.from(readFileSync(imgPath));
    await page.evaluate(({ data, name }) => {
      const blob = new Blob([new Uint8Array(data)], { type: 'image/png' });
      const file = new File([blob], name, { type: 'image/png' });
      const dt   = new DataTransfer();
      dt.items.add(file);
      const zone = document.querySelector('[data-agent-id^="file-upload-"]')
                || document.querySelector('button[role="presentation"]');
      if (!zone) return;
      zone.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
      zone.dispatchEvent(new DragEvent('drop',      { dataTransfer: dt, bubbles: true }));
    }, { data: imgData, name: imgPath.split(/[\\/]/).pop() });
    await sleep(1500);
    console.log(`    📎 Reference uploaded (drop)`);
    return;
  } catch (_) { /* fall through */ }

  console.warn('    ⚠  Could not upload reference — continuing without it');
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args    = process.argv.slice(2);
  const gwIdx   = args.indexOf('--gateway');
  const bbIdx   = args.indexOf('--bb');
  const dryRun  = args.includes('--dry-run');
  const resume  = !args.includes('--no-resume');

  const gateway  = gwIdx >= 0 ? `THE ${args[gwIdx + 1].toUpperCase()}` : null;
  const bbFilter = bbIdx >= 0 ? parseInt(args[bbIdx + 1]) : null;

  const queue = parsePrompts({ gateway, bbFilter });
  const done  = resume ? loadDone() : new Set();

  console.log(`\n🎨 Frame generation queue: ${queue.length} floors, ${queue.reduce((a,r)=>a+r.frames.length,0)} frames total`);
  if (gateway)  console.log(`   Gateway: ${gateway}`);
  if (bbFilter) console.log(`   BB filter: ${bbFilter}`);
  if (dryRun) {
    for (const item of queue) {
      console.log(`\nBB ${item.bb} Floor ${item.floor} — ${item.floorLabel}`);
      item.frames.forEach((f, i) => console.log(`  Frame ${i+1}: ${f.slice(0, 80)}...`));
    }
    return;
  }

  // Launch Brave with remote debugging — uses your real profile & existing login.
  const { spawn } = await import('child_process');
  const braveProc = spawn(BRAVE_EXE, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--no-first-run',
    '--no-default-browser-check',
    EL_URL,
  ], { detached: true, stdio: 'ignore' });
  braveProc.unref();

  // Wait for Brave to start and expose the debug port
  console.log('Launching Brave with remote debugging...');
  await sleep(4000);

  // Connect Playwright to the running Brave instance
  const browser = await chromium.connectOverCDP(`http://localhost:${DEBUG_PORT}`);

  const contexts = browser.contexts();
  const context  = contexts[0] || await browser.newContext();
  const pages    = context.pages();
  const page     = pages.find(p => p.url().includes('elevenlabs')) || pages[0] || await context.newPage();
  await page.goto(EL_URL);
  await waitForIdle(page, 2000);

  await waitForIdle(page, 3000);

  // Check we're logged in (look for the app nav)
  const isLoggedIn = await page.locator('nav, header, #image-video-prompt-box').first()
    .isVisible({ timeout: 8000 }).catch(() => false);

  if (!isLoggedIn) {
    console.log('\n🔐 Not logged in — log in to ElevenLabs in the browser, then press Enter here.');
    await waitForUser('   > Press Enter when ready: ');
  } else {
    console.log('✓ ElevenLabs session active — starting generation');
  }

  // Dismiss any launch modals
  await dismissModals(page);
  await switchToImageTab(page);

  // Ensure we are on the image page
  if (!page.url().includes('image-video')) {
    await page.goto(EL_URL);
    await waitForIdle(page, 2000);
  }

  // ── process queue ──────────────────────────────────────────────────────────
  let generated = 0;
  let skipped   = 0;

  for (const item of queue) {
    console.log(`\n📦 BB ${item.bb} — ${item.bbTitle}  |  Floor ${item.floor}: ${item.floorLabel}`);

    let prevFramePath = null;

    for (let fi = 0; fi < item.frames.length; fi++) {
      const key  = frameKey(item.bb, item.floor, fi);
      const dest = outPath(item.bb, item.floor, fi);

      if (done.has(key) && existsSync(dest)) {
        console.log(`  ✓ Frame ${fi+1} already done — skipping`);
        prevFramePath = dest;
        skipped++;
        continue;
      }

      const prompt = item.frames[fi];
      console.log(`  → Frame ${fi+1}: ${prompt.slice(0, 70)}...`);

      try {
        // If not on image page, navigate back
        if (!page.url().includes('image-video')) {
          await page.goto(EL_URL);
          await waitForIdle(page, 3000);
        }

        // Dismiss any popups / modals
        await dismissModals(page);

        // Make sure we're on the Image tab (not Video)
        await switchToImageTab(page);

        // Upload reference image for frames 2+
        if (fi > 0 && prevFramePath) {
          await uploadReference(page, prevFramePath);
        }

        // Fill the prompt
        await fillPrompt(page, prompt);

        // Click Generate
        await clickGenerate(page);

        // Wait for the image
        const imgBuffer = await waitForGeneratedImage(page);

        // Save
        writeFileSync(dest, imgBuffer);
        markDone(key, done);
        prevFramePath = dest;
        generated++;

        console.log(`  ✓ Saved: ${dest.replace(process.cwd(), '.')}`);
        await sleep(3000); // cooldown between generations

      } catch (err) {
        console.error(`  ✗ Error on frame ${fi+1}: ${err.message}`);
        console.error('    Pausing — check the browser and press Enter to continue, or Ctrl+C to quit.');
        await waitForUser('    > ');
      }
    }
  }

  console.log(`\n✅ Done. Generated: ${generated}  Skipped: ${skipped}`);
  console.log(`   Frames saved to: public/media/frames/`);
  console.log('\nNext step: run  node scripts/stitch-gifs.mjs  to build the GIFs.');

  await browser.close(); // disconnects Playwright but leaves Brave open
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
