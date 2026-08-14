/**
 * Daily Qubix progress report — tracks BB content pipeline E2E and emails it.
 *
 * E2E pipeline per BB:  Text → Images → GIF → Audio → 3D/Manim → Done
 *
 * Setup:
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  (Google App Password)
 *   REPORT_TO=alisid1994@gmail.com
 *
 * Run:
 *   node scripts/progress-report.mjs            # send
 *   node scripts/progress-report.mjs --dry-run  # print only
 *
 * Windows Task Scheduler (already registered as "QubixDailyReport" at 08:00):
 *   schtasks /create /tn "QubixDailyReport" /tr "node C:\Users\ali10\strata\scripts\progress-report.mjs" /sc daily /st 08:00 /f
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { createTransport } from 'nodemailer';

const ROOT    = process.cwd();
const DRY_RUN = process.argv.includes('--dry-run');

// ── load .env.local ───────────────────────────────────────────────────────────
if (existsSync(join(ROOT, '.env.local'))) {
  for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

// ── pipeline column counts ────────────────────────────────────────────────────

/** BBs with text in Supabase (and their audio/image status) */
async function supabaseStats() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { text: '?', images: '?', audio: '?' };
  try {
    // PostgREST caps rows at 1000 per request regardless of ?limit= — page
    // through with the Range header to get everything.
    let rows = [];
    let from = 0;
    const pageSize = 1000;
    while (true) {
      const res = await fetch(
        `${url}/rest/v1/cards?select=sort_order,img_url,layers`,
        { headers: {
            apikey: key, Authorization: `Bearer ${key}`,
            Range: `${from}-${from + pageSize - 1}`,
        } }
      );
      const page = await res.json();
      if (!Array.isArray(page)) break;
      rows = rows.concat(page);
      if (page.length < pageSize) break;
      from += pageSize;
    }
    let images = 0, audio = 0;
    for (const r of rows) {
      if (r.img_url) images++;
      if (Array.isArray(r.layers) && r.layers.some(l => l?.audio)) audio++;
    }
    return { text: rows.length, images, audio };
  } catch { return { text: '?', images: '?', audio: '?' }; }
}

/** Frames logged in .generated-frames.json */
function frameStats() {
  const path = join(ROOT, '.generated-frames.json');
  if (!existsSync(path)) return { frames: 0, floors: 0, bbs: 0 };
  const keys  = JSON.parse(readFileSync(path, 'utf8'));
  const floors = new Set(keys.map(k => k.replace(/-frame\d+$/, '')));
  const bbs    = new Set(keys.map(k => k.split('-f')[0]));
  return { frames: keys.length, floors: floors.size, bbs: bbs.size };
}

/** GIFs stitched in public/media/ */
function gifStats() {
  const dir = join(ROOT, 'public/media');
  if (!existsSync(dir)) return { gifs: 0, bbs: 0 };
  const all = readdirSync(dir).filter(f => f.endsWith('.gif'));
  const bbs = new Set(all.map(f => f.replace(/-f\d+\.gif$/, '')));
  return { gifs: all.length, bbs: bbs.size };
}

/** Three.js / interactive floors in boardMedia.js */
function threeStats() {
  const p = join(ROOT, 'src/lib/content/boardMedia.js');
  if (!existsSync(p)) return { floors: 0 };
  const src = readFileSync(p, 'utf8');
  const hits = src.match(/type:\s*'three'/g);
  return { floors: hits ? hits.length : 0 };
}

/** Current work mode (.mode file, default BB) */
function currentMode() {
  const p = join(ROOT, '.mode');
  if (!existsSync(p)) return 'BB';
  return readFileSync(p, 'utf8').trim().toUpperCase() || 'BB';
}

// ── build report ──────────────────────────────────────────────────────────────
async function buildReport() {
  const db   = await supabaseStats();
  const fr   = frameStats();
  const gf   = gifStats();
  const th   = threeStats();
  const mode = currentMode();
  const now  = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // A BB is E2E-done only if it has a GIF (proxy for images+gif complete).
  // Audio and 3D are additive — tracked separately.
  const e2e = gf.bbs;

  const modeLabel = mode === 'BB' ? '🔵 BB MODE — content pipeline' : `⚡ BREAK MODE — ${mode}`;

  const text = `
QUBIX DAILY — ${now}
${'─'.repeat(48)}
MODE: ${modeLabel}

BB CONTENT PIPELINE
  Text (ingested)  : ${db.text}
  Images (Supabase): ${db.images}
  Frames generated : ${fr.frames}  (${fr.floors} floors · ${fr.bbs} BBs)
  GIFs stitched    : ${gf.gifs}  (${gf.bbs} BBs)
  Audio done       : ${db.audio}
  Three.js floors  : ${th.floors}

E2E COMPLETE: ${e2e} BBs  (text + images + GIF)

OPEN BLOCKERS
  ✗ uploadReference() — image automation blocked
  ✗ quiz_results table — not in schema.sql
  ✗ Audio coverage — ${db.audio} boards; entry topics need a TTS batch run
  ✗ Board images — 0 curated boards have a top image
`.trim();

  const col = (v, good = false, warn = false) => {
    const c = good ? '#2EC97E' : warn ? '#F5C348' : '#5B6FE8';
    return `<span style="font-family:'Courier New',monospace;color:${c}">${v}</span>`;
  };

  const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  body{font-family:system-ui,sans-serif;background:#080A17;color:#DCE1FF;margin:0;padding:24px}
  .wrap{max-width:580px;margin:0 auto}
  .header{border-bottom:1px solid #1E2444;padding-bottom:14px;margin-bottom:20px}
  .brand{font-size:11px;letter-spacing:.2em;color:#5B6FE8;font-weight:700}
  h1{font-size:18px;margin:6px 0 2px}
  .date{font-size:12px;color:#4E5778}
  .mode-chip{display:inline-block;margin-top:8px;padding:3px 10px;border-radius:3px;font-size:11px;font-weight:600;background:#141B30;border:1px solid #1E2444;color:#F5C348}
  .section{margin-bottom:20px}
  .section-label{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#4E5778;font-weight:700;margin-bottom:10px}
  .pipeline{border:1px solid #1E2444;border-radius:6px;overflow:hidden}
  .pipe-row{display:flex;align-items:center;padding:9px 14px;border-bottom:1px solid #1E2444;font-size:13px;gap:12px}
  .pipe-row:last-child{border-bottom:none}
  .pipe-label{flex:1;color:#8892B8}
  .pipe-val{font-family:'Courier New',monospace;font-size:13px}
  .done{color:#2EC97E}.warn{color:#F5C348}.info{color:#5B6FE8}.dim{color:#2A3050}
  .e2e-block{background:#0F1830;border:1px solid #1E2444;border-radius:6px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:baseline;gap:12px}
  .e2e-num{font-family:'Courier New',monospace;font-size:48px;color:#5B6FE8;line-height:1}
  .e2e-label{font-size:13px;color:#4E5778;line-height:1.5}
  .blocker{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #1E2444;font-size:12px;align-items:baseline}
  .blocker:last-child{border-bottom:none}
  .tag{background:#2A0E18;color:#E84268;border:1px solid #4A1525;font-size:9px;font-family:monospace;padding:1px 5px;border-radius:2px;white-space:nowrap}
</style></head>
<body><div class="wrap">
  <div class="header">
    <div class="brand">QUBIX</div>
    <h1>Daily Report</h1>
    <div class="date">${now}</div>
    <div class="mode-chip">${modeLabel}</div>
  </div>

  <div class="e2e-block">
    <div class="e2e-num">${e2e}</div>
    <div class="e2e-label">BBs fully E2E<br><span style="color:#2A3050;font-size:11px">text + images + GIF</span></div>
  </div>

  <div class="section">
    <div class="section-label">BB Content Pipeline</div>
    <div class="pipeline">
      <div class="pipe-row"><span class="pipe-label">Text ingested</span><span class="pipe-val info">${db.text}</span></div>
      <div class="pipe-row"><span class="pipe-label">Images (Supabase)</span><span class="pipe-val ${db.images > 0 ? 'warn' : 'dim'}">${db.images}</span></div>
      <div class="pipe-row"><span class="pipe-label">Frames generated</span><span class="pipe-val ${fr.frames > 0 ? 'warn' : 'dim'}">${fr.frames} <span style="color:#2A3050;font-size:11px">(${fr.floors} floors · ${fr.bbs} BBs)</span></span></div>
      <div class="pipe-row"><span class="pipe-label">GIFs stitched</span><span class="pipe-val ${gf.gifs > 0 ? 'done' : 'dim'}">${gf.gifs} <span style="color:#2A3050;font-size:11px">(${gf.bbs} BBs)</span></span></div>
      <div class="pipe-row"><span class="pipe-label">Audio narration</span><span class="pipe-val ${db.audio > 0 ? 'warn' : 'dim'}">${db.audio}</span></div>
      <div class="pipe-row"><span class="pipe-label">Three.js / Manim</span><span class="pipe-val ${th.floors > 0 ? 'done' : 'dim'}">${th.floors} floors</span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Open Blockers</div>
    <div class="blocker"><span class="tag">SCRIPT</span><span>uploadReference() — Playwright click blocked by role="presentation"</span></div>
    <div class="blocker"><span class="tag">SCHEMA</span><span>quiz_results table missing from schema.sql</span></div>
    <div class="blocker"><span class="tag">AUDIO</span><span>${db.audio} boards narrated — entry topics need a TTS batch run</span></div>
    <div class="blocker"><span class="tag">MEDIA</span><span>0 curated boards have a top image</span></div>
  </div>
</div></body></html>`;

  return { text, html, mode };
}

// ── send ──────────────────────────────────────────────────────────────────────
async function sendEmail(text, html) {
  const appPass = process.env.GMAIL_APP_PASSWORD;
  const to      = process.env.REPORT_TO || 'alisid1994@gmail.com';
  const from    = 'alisid1994@gmail.com';
  if (!appPass) {
    console.log('⚠️  GMAIL_APP_PASSWORD not set in .env.local');
    return false;
  }
  const transporter = createTransport({
    service: 'gmail',
    auth: { user: from, pass: appPass.replace(/\s/g, '') },
  });
  const day = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  await transporter.sendMail({
    from: `"Qubix Tracker" <${from}>`,
    to,
    subject: `Qubix Daily — ${day}`,
    text,
    html,
  });
  console.log(`✅  Sent to ${to}`);
  return true;
}

// ── main ──────────────────────────────────────────────────────────────────────
const { text, html, mode } = await buildReport();
console.log('\n' + '─'.repeat(50));
console.log(text);
console.log('─'.repeat(50) + '\n');
if (!DRY_RUN) await sendEmail(text, html);
else console.log('(dry-run)');
