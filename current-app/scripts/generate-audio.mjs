/**
 * generate-audio.mjs — TTS narration pipeline for publishable BBs
 *
 * Two-phase workflow (matches the PATHS.md pattern):
 *   Phase 1 (text) — ingest-final-review.mjs stores floors as HTML strings
 *   Phase 2 (audio) — this script reads the cards table, generates ElevenLabs
 *                     TTS for each floor, uploads MP3s to Supabase Storage, and
 *                     upserts layers from HTML strings to {text,audio} objects.
 *
 * Prerequisites:
 *   - ELEVENLABS_API_KEY in .env.local
 *   - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - Supabase Storage bucket "card-audio" (created by migration 0002)
 *   - Boards already ingested via ingest-final-review.mjs (Phase 1 complete)
 *
 * Voice assignment: 5 voices rotate per board (board N → voice N%5).
 * Each board gets one consistent voice across all its floors.
 *
 * Usage:
 *   node --env-file=.env.local scripts/generate-audio.mjs
 *
 * Options:
 *   --dry-run       Log what would be generated, don't call APIs
 *   --board N       Process only board at sort_order N
 *   --subject X     Process only boards of subject (physics|maths|chemistry)
 *   --all           Include P3 (provisional) boards — default is final-P only
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const AUDIO_DIR = join(ROOT, 'audio');

// ── Config ──────────────────────────────────────────────────────────────────
const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1/text-to-speech';
const CHUNK_SIZE = 4000; // characters per TTS request (ElevenLabs limit)

// 4 distinct voices — one per board, cycled round-robin.
// Each board keeps the same voice for all its floors.
const VOICES = [
  { id: 'ZT9u07TYPVl83ejeLakq', label: 'Voice 1' },
  { id: 'SCbIlR40EEyW2I6quW1h', label: 'Voice 2' },
  { id: 't4U671CQHG58R11znrVj', label: 'Voice 3' },
  { id: 'qxTFXDYbGcR8GaHSjczg', label: 'Voice 4' }
];

/** Voice for a board: consistent per board, cycles round-robin. If --voice-id is set, uses that for all. */
function voiceForBoard(boardIdx) {
  if (VOICE_OVERRIDE) return { id: VOICE_OVERRIDE, label: 'Custom' };
  return VOICES[boardIdx % VOICES.length];
}

// ── Parse CLI ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const BOARD_FILTER = (() => {
  const i = args.indexOf('--board');
  return i >= 0 ? parseInt(args[i + 1]) : null;
})();
const SUBJECT_FILTER = (() => {
  const i = args.indexOf('--subject');
  return i >= 0 ? args[i + 1] : null;
})();
const INCLUDE_P3 = args.includes('--all');
const VOICE_OVERRIDE = (() => {
  const i = args.indexOf('--voice-id');
  return i >= 0 ? args[i + 1] : null;
})();

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Strip HTML tags and decode entities for clean TTS input. */
function cleanForTTS(html) {
  return html
    .replace(/<[^>]+>/g, '')           // strip tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&rsaquo;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Split long text into chunks that fit the TTS API limit. */
function chunkText(text, maxLen = CHUNK_SIZE) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = '';
  for (const s of sentences) {
    if (current.length + s.length > maxLen && current) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

/** Call ElevenLabs TTS, return MP3 buffer. */
async function tts(text, voiceId, apiKey) {
  const resp = await fetch(`${ELEVENLABS_URL}/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    })
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`ElevenLabs error ${resp.status}: ${err}`);
  }
  return Buffer.from(await resp.arrayBuffer());
}

/** Sanitise a board title for use as a filename segment. */
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey && !DRY_RUN) {
    console.error('ELEVENLABS_API_KEY not set in .env.local');
    process.exit(1);
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  // Fetch all publishable-review boards
  let query = supabase.from('cards')
    .select('sort_order,title,layers,tags')
    .eq('tags->>source', 'publishable-review')
    .order('sort_order');

  if (BOARD_FILTER) query = query.eq('sort_order', BOARD_FILTER);

  const { data: rawBoards, error } = await query;
  if (error) { console.error('Fetch failed:', error.message); process.exit(1); }

  let boards = [...rawBoards];

  if (SUBJECT_FILTER) {
    boards = boards.filter(b => (b.tags?.subject || '') === SUBJECT_FILTER);
    console.log(`Subject filter "${SUBJECT_FILTER}": ${boards.length} of ${rawBoards.length} boards`);
  }
  if (!INCLUDE_P3) {
    const before = boards.length;
    boards = boards.filter(b => b.tags?.reviewStatus !== 'p3');
    console.log(`Final-P only (skip P3): ${boards.length} of ${before} boards`);
  }

  console.log(`Processing ${boards.length} boards.${DRY_RUN ? ' (DRY RUN)' : ''}`);

  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;

  for (let bi = 0; bi < boards.length; bi++) {
    const board = boards[bi];
    const voice = voiceForBoard(bi);
    const layers = board.layers || [];
    let changed = false;
    const newLayers = [];

    console.log(`\nBoard ${board.sort_order}: "${board.title}" — voice: ${voice.label}`);
    for (let d = 0; d < layers.length; d++) {
      const layer = layers[d];

      // Already has audio — skip
      if (layer && typeof layer === 'object' && layer.audio) {
        newLayers.push(layer);
        skipped++;
        continue;
      }

      // Extract text
      const html = typeof layer === 'object' ? (layer.text || '') : (layer || '');
      const text = cleanForTTS(html);
      if (!text) { newLayers.push(layer); continue; }

      const slug = `${board.sort_order}-${slugify(board.title)}-f${d}`;
      const mp3Path = join(AUDIO_DIR, `${slug}.mp3`);

      if (DRY_RUN) {
        console.log(`  [DRY] Would generate: ${slug}.mp3 (${text.length} chars)`);
        newLayers.push({ text: html, audio: `AUDIO_URL_PLACEHOLDER/${slug}.mp3` });
        changed = true;
        generated++;
        continue;
      }

      // Generate TTS
      try {
        console.log(`  Generating: ${slug}.mp3 (${text.length} chars)`);
        const chunks = chunkText(text);

        let mp3Buffer;
        if (chunks.length === 1) {
          mp3Buffer = await tts(chunks[0], voice.id, apiKey);
        } else {
          for (let ci = 0; ci < chunks.length; ci++) {
            const chunkBuf = await tts(chunks[ci], voice.id, apiKey);
            const chunkSlug = `${slug}-p${ci}`;
            writeFileSync(join(AUDIO_DIR, `${chunkSlug}.mp3`), chunkBuf);
          }
          // For multi-chunk, use the first chunk as the main audio
          mp3Buffer = await tts(chunks[0], apiKey);
          console.log(`    (split into ${chunks.length} chunks, using chunk 0 as primary)`);
        }

        writeFileSync(mp3Path, mp3Buffer);

        // Upload to Supabase Storage
        const { data: upload, error: uploadErr } = await supabase.storage
          .from('card-audio')
          .upload(`${slug}.mp3`, mp3Buffer, {
            contentType: 'audio/mpeg',
            upsert: true
          });

        if (uploadErr) {
          console.error(`    Upload failed: ${uploadErr.message}`);
          newLayers.push({ text: html });
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('card-audio')
          .getPublicUrl(`${slug}.mp3`);

        const publicUrl = urlData?.publicUrl || '';
        newLayers.push({ text: html, audio: publicUrl });
        changed = true;
        generated++;
        console.log(`    Done: ${publicUrl}`);

        // Rate limit: ~10 requests/min on free tier
        await new Promise(r => setTimeout(r, 2000));

      } catch (e) {
        console.error(`    Failed: ${e.message}`);
        newLayers.push({ text: html });
      }
    }

    // Update the board in Supabase if any layer changed
    if (changed && !DRY_RUN) {
      const { error: updErr } = await supabase.from('cards')
        .update({ layers: newLayers })
        .eq('sort_order', board.sort_order)
        .eq('tags->>source', 'publishable-review');

      if (updErr) {
        console.error(`  Update failed for ${board.sort_order}: ${updErr.message}`);
      } else {
        console.log(`  Updated board ${board.sort_order} (${board.title})`);
      }
    }
  }

  console.log(`\nDone. Generated: ${generated}, Skipped (already has audio): ${skipped}`);
  if (DRY_RUN) console.log('(Dry run — no API calls made, no database changes)');
}

main().catch(err => { console.error(err); process.exit(1); });
