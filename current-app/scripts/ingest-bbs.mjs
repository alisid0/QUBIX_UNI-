#!/usr/bin/env node
/**
 * Ingest a batch of BBs into the existing Supabase `cards` table.
 * The batch-file sibling of strata-sheets-script.js's "Publish to Supabase" —
 * same table, same service-role-key model, file-based instead of Forms-based.
 * Accepts either a JSON batch or a Markdown batch (the BB-NEW-NN drafting
 * format used so far) — picked by file extension.
 *
 * Usage:
 *   node --env-file=.env.local scripts/ingest-bbs.mjs path/to/batch.json
 *   node --env-file=.env.local scripts/ingest-bbs.mjs path/to/batch.md
 *
 * Requires in the environment (never the anon key):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * JSON batch shape:
 * {
 *   "boards": [
 *     {
 *       "kicker": "BB 85",
 *       "title": "...",
 *       "image": "./assets/card-85.png",          // local path, optional
 *       "tags": { "subject", "topic", "concept", "ground", "buildsOn": [] },
 *       "floors": [
 *         { "content": null },                     // floor 0, image-only swipe card
 *         { "content": "<p>...</p>", "audio": "./assets/85-f1.mp3" },
 *         { "content": "<p>...</p>", "image": "./assets/85-f2.png" }
 *       ]
 *     }
 *   ]
 * }
 *
 * Markdown batch shape (one BB per `## ` section, skips "Summary"/"What's
 * left" sections automatically):
 *
 *   ## BB-NEW-21 — Title
 *   **Subject:** physics | **Topic:** ... | **Concept:** ... | **Ground:** g0 | **Builds on:** [Card 21, BB-NEW-11]
 *   **Floor 0 (Idea):**
 *   <p>...</p>
 *   **Floor 1 (Concrete):**
 *   <p>...</p>
 *   **Image prompt:** ...   (optional, kept as metadata, not ingested)
 *
 * `BB-NEW-NN` is a placeholder — a number gets auto-assigned the first time
 * it's seen (in heading position) and recorded in scripts/.bb-placeholder-ledger.json
 * so later batches can reference earlier ones by the same placeholder (in a
 * "Builds on" list) and have it resolve to the real card number, even across
 * separate ingestion runs. "BB NN" / "Card NN" in headings or "Builds on"
 * are already-real numbers and pass through unchanged.
 *
 * Numbering (JSON path): if a board's kicker already contains a number (e.g.
 * "BB 85"), that number is used as sort_order directly — so re-running the
 * same batch later with image/audio fields filled in updates those same rows
 * instead of creating duplicates. Only boards with no number in their kicker
 * get a fresh auto-assigned number (printed at the end — copy it into the
 * kicker before any later re-run of that board).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

const STATIC_DECK_LENGTH = 84;
const LEDGER_PATH = join(dirname(fileURLToPath(import.meta.url)), '.bb-placeholder-ledger.json');

function fail(msg) {
  console.error('ERROR:', msg);
  process.exit(1);
}

const batchPath = process.argv[2];
if (!batchPath) fail('usage: node scripts/ingest-bbs.mjs path/to/batch.json|.md');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  fail('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (use --env-file=.env.local, never the anon key)');
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

function loadLedger() {
  if (!existsSync(LEDGER_PATH)) return {};
  try { return JSON.parse(readFileSync(LEDGER_PATH, 'utf-8')); } catch { return {}; }
}

function saveLedger(ledger) {
  writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2) + '\n');
}

function pad2(n) { return n < 10 ? '0' + n : '' + n; }

// Subject prefix for topic-based kicker generation: maths→1, chemistry→2, physics→3, computing→4
const SUBJECT_PREFIX = { maths: '1', chemistry: '2', physics: '3', computing: '4' };

/** Resolve a "Builds on" reference to the canonical topic-based kicker string.
 *  Accepts: "BB 01", "Card 21", "BB-NEW-08", or already-topic-based "Mechanics 3.4". */
function resolveRef(ref, ledger) {
  const placeholder = ref.match(/^BB-NEW-\d+$/i);
  if (placeholder) {
    const key = ref.toUpperCase();
    const num = ledger[key];
    if (!num) throw new Error(`unresolved placeholder reference "${ref}" — not yet assigned a real number (ingest the batch that defines it first)`);
    return `Card ${pad2(num)}`;
  }
  // Already topic-based (e.g. "Mechanics 3.4", "Coordinate Geometry 1.2") — pass through
  if (/^[A-Z]/.test(ref) && /\d+\.\d+/.test(ref)) return ref;
  // Old "BB NN" format — normalize to "Card NN"
  const bb = ref.match(/^BB\s*(\d+)$/i);
  if (bb) return `Card ${pad2(parseInt(bb[1], 10))}`;
  return ref; // "Card NN" or free-text, pass through
}

/** Parse the BB-NEW-NN Markdown drafting format into the same shape a JSON batch uses. */
function parseMarkdownBatch(content, ledger, startNextOrder) {
  let nextOrder = startNextOrder;
  const headingRe = /^##\s+(.+?)\s*$/gm;
  const headings = [...content.matchAll(headingRe)];
  const boards = [];

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i][1].trim();
    const start = headings[i].index + headings[i][0].length;
    const end = i + 1 < headings.length ? headings[i + 1].index : content.length;
    const body = content.slice(start, end);

    const headingMatch = heading.match(/^(BB[-\s]?(?:NEW-)?\d+)\s*[—-]\s*(.+)$/i);
    if (!headingMatch) continue; // not a BB section (Summary, What's left for next batch, etc.)

    const placeholder = headingMatch[1].toUpperCase().replace(/\s+/, ' ');
    const title = headingMatch[2].trim();

    const metaMatch = body.match(/\*\*Subject:\*\*\s*(.+?)\s*\|\s*\*\*Topic:\*\*\s*(.+?)\s*\|\s*\*\*Concept:\*\*\s*(.+?)\s*\|\s*\*\*Ground:\*\*\s*(.+?)\s*\|\s*\*\*Builds on:\*\*\s*(.*)/);
    if (!metaMatch) throw new Error(`section "${heading}" has no Subject/Topic/Concept/Ground/Builds-on line in the expected format`);
    const [, subject, topic, concept, ground, buildsOnRaw] = metaMatch;
    // Builds-on is usually a bracketed list ("[Card 01, BB-NEW-02]") but some
    // batches write it as free prose ("Fraction arithmetic (BB 110-122)") —
    // accept both by falling back to scanning for any recognizable reference token.
    const bracketed = buildsOnRaw.match(/^\[(.*?)\]/);
    const buildsOn = bracketed
      ? bracketed[1].split(',').map(s => s.trim()).filter(Boolean).map(ref => resolveRef(ref, ledger))
      : [...buildsOnRaw.matchAll(/BB-NEW-\d+|BB\s*\d+|Card\s*\d+/gi)].map(m => resolveRef(m[0], ledger));

    const floorRe = /\*\*Floor\s+(\d+)\s*\([^)]*\)\s*:\*\*\s*\n([\s\S]*?)(?=\n\*\*Floor\s+\d+|\n\*\*Image prompt:\*\*|\n---|\n##|$)/g;
    const floorMatches = [...body.matchAll(floorRe)];
    if (floorMatches.length === 0) throw new Error(`section "${heading}" has no "**Floor N (...):**" blocks`);
    const maxFloorIdx = Math.max(...floorMatches.map(m => parseInt(m[1], 10)));
    const floors = new Array(maxFloorIdx + 1).fill(null);
    // Multiple HTML block lines (e.g. a <p> followed by a <div class='formula'> on its
    // own line) should join directly with no separator, matching how they're authored.
    for (const fm of floorMatches) floors[parseInt(fm[1], 10)] = fm[2].trim().replace(/\r\n|\r|\n/g, '');

    const imagePromptMatch = body.match(/\*\*Image prompt:\*\*\s*(.+)/);
    const imagePrompt = imagePromptMatch ? imagePromptMatch[1].trim() : undefined;

    let kicker;
    if (/^BB-NEW-/i.test(placeholder)) {
      if (!ledger[placeholder]) ledger[placeholder] = nextOrder++;
      kicker = `BB ${ledger[placeholder]}`;
    } else {
      const num = placeholder.match(/\d+/)[0];
      kicker = `BB ${parseInt(num, 10)}`;
    }
    // Note: topic-based kickers (e.g. "Coordinate Geometry 1.5") are not auto-generated
    // for Markdown batches — they stay as "BB NN" and can be migrated later via
    // scripts/migrate-dynamic-kickers.mjs.

    boards.push({ kicker, title, imagePrompt, tags: { subject: subject.trim(), topic: topic.trim(), concept: concept.trim(), ground: ground.trim(), buildsOn }, floors: floors.map(f => ({ content: f })) });
  }

  if (boards.length === 0) fail('no BB sections found in the markdown file (expected "## BB-NEW-NN — Title" headings)');
  return boards;
}

async function nextAvailableOrder() {
  const { data, error } = await supabase.from('cards').select('sort_order').order('sort_order', { ascending: false }).limit(1);
  if (error) fail(error.message);
  return Math.max(data?.[0]?.sort_order || 0, STATIC_DECK_LENGTH) + 1;
}

const ext = extname(batchPath).toLowerCase();
// NFC-normalize so combining-character sequences (e.g. a decomposed "i" + combining
// circumflex some editors produce) match the precomposed form used elsewhere, and
// collapse exotic Unicode space characters (em space, non-breaking space, etc. —
// common copy-paste artifacts) down to a plain space.
const EXOTIC_SPACES = /[  -   　]/g;
const raw = readFileSync(batchPath, 'utf-8')
  .normalize('NFC')
  .replace(EXOTIC_SPACES, ' ');
let batch;
const startNextOrder = await nextAvailableOrder();

if (ext === '.json') {
  batch = JSON.parse(raw);
} else if (ext === '.md' || ext === '.markdown') {
  const ledger = loadLedger();
  batch = { boards: parseMarkdownBatch(raw, ledger, startNextOrder) };
  saveLedger(ledger);
} else {
  fail(`unsupported file type "${ext}" — use .json or .md`);
}

if (!Array.isArray(batch.boards) || batch.boards.length === 0) {
  fail('batch must have a non-empty "boards" array');
}

function contentTypeFor(path) {
  const ext = extname(path).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.mp3') return 'audio/mpeg';
  if (ext === '.wav') return 'audio/wav';
  return 'application/octet-stream';
}

async function uploadLocalFile(localPath, bucket) {
  const fileBuffer = readFileSync(localPath);
  const storagePath = `${Date.now()}-${basename(localPath)}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, { contentType: contentTypeFor(localPath), upsert: true });
  if (error) throw new Error(`upload ${localPath} -> ${bucket}: ${error.message}`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function buildLayer(floor) {
  if (!floor || (floor.content == null && !floor.image && !floor.audio)) return null;

  const img = floor.image ? await uploadLocalFile(floor.image, 'card-images') : null;
  const audio = floor.audio ? await uploadLocalFile(floor.audio, 'card-audio') : null;

  if (!img && !audio) return floor.content ?? null;
  return { text: floor.content || '', img, audio };
}

async function main() {
  let nextOrder = startNextOrder;

  const rows = [];
  const failures = [];
  const autoAssigned = [];

  for (const board of batch.boards) {
    try {
      const kickerNum = parseInt((board.kicker || '').match(/\d+/)?.[0], 10);
      const sortOrder = Number.isFinite(kickerNum) ? kickerNum : nextOrder++;
      if (!Number.isFinite(kickerNum)) autoAssigned.push(`${board.kicker || '(no kicker)'} -> ${sortOrder}`);

      const img_url = board.image ? await uploadLocalFile(board.image, 'card-images') : null;
      const layers = [];
      for (const floor of board.floors || []) {
        layers.push(await buildLayer(floor));
      }
      rows.push({
        sort_order: sortOrder,
        act: 'I', // "Act" is retired terminology, kept only to satisfy the table's NOT NULL constraint
        kicker: board.kicker,
        title: board.title,
        layers,
        img_url,
        tags: board.tags || null
      });
    } catch (e) {
      failures.push(`${board.kicker || '(no kicker)'}: ${e.message}`);
    }
  }

  if (rows.length > 0) {
    const { error } = await supabase
      .from('cards')
      .upsert(rows, { onConflict: 'sort_order' });
    if (error) fail(error.message);
  }

  console.log(`Ingested ${rows.length} / ${batch.boards.length} board(s).`);
  console.log('sort_order used:', rows.map(r => r.sort_order).join(', '));
  if (autoAssigned.length > 0) {
    console.log('Auto-assigned (no number in kicker) — copy these into your JSON before any later re-run:');
    autoAssigned.forEach(a => console.log('  -', a));
  }
  console.log('Note: dynamic card kickers use "BB NN" format. To convert to topic-based names,');
  console.log('run: node scripts/migrate-dynamic-kickers.mjs');
  if (failures.length > 0) {
    console.log('Failures:');
    failures.forEach(f => console.log('  -', f));
    process.exitCode = 1;
  }
}

main();
