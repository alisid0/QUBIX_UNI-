#!/usr/bin/env node
/**
 * Sync-back for the BB review pass: reads content-drafts/_all-publishable-bbs.md
 * (the plain-text export from _export-all.mjs), diffs each BB's floor text
 * against what's currently live in Supabase, and pushes the changed floors back.
 *
 * Round-trip:
 *   node --env-file=.env.local scripts/_export-all.mjs        # Supabase → md (refresh)
 *   ... edit content-drafts/_all-publishable-bbs.md by hand ...
 *   node --env-file=.env.local scripts/sync-bbs-from-md.mjs               # dry-run, shows diff
 *   node --env-file=.env.local scripts/sync-bbs-from-md.mjs --apply       # pushes changes
 *   node --env-file=.env.local scripts/sync-bbs-from-md.mjs --bb 1132     # one BB only
 *
 * Floor text is matched by "**Floor N:**" label, not position — gaps mean a
 * genuinely empty floor in the source (skip), NOT a deletion signal. To
 * remove a floor: delete its "**Floor N:**" line AND renumber every floor
 * after it so the labels stay contiguous from 0 (same rule as deck.js's
 * kicker renumbering). To add a floor: add a new contiguous "**Floor N:**"
 * at the end.
 *
 * If a BB's floor count shrinks and a removed floor had audio attached,
 * that update is held back — rerun with --force to confirm the loss.
 */
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const args     = process.argv.slice(2);
const APPLY    = args.includes('--apply');
const FORCE    = args.includes('--force');
const bbIdx    = args.indexOf('--bb');
const bbOnly   = bbIdx >= 0 ? parseInt(args[bbIdx + 1], 10) : null;
const fileIdx  = args.indexOf('--file');
const MD_PATH  = fileIdx >= 0 ? args[fileIdx + 1] : 'content-drafts/_all-publishable-bbs.md';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ── parse the markdown file ───────────────────────────────────────────────────
function parseMd(src) {
  const bbs = [];
  const blocks = src.split(/\n(?=## BB \d+)/);

  for (const block of blocks) {
    const head = block.match(/^## BB (\d+)\s*[—-]\s*(.+)$/m);
    if (!head) continue;
    const sortOrder = parseInt(head[1], 10);
    const title = head[2].trim();

    const tagLine = block.match(/\*\*Subject:\*\*\s*(.+?)\s*\|\s*\*\*Topic:\*\*\s*(.*?)\s*\|\s*\*\*Concept:\*\*\s*(.*?)\s*$/m);
    const subject = tagLine ? tagLine[1].trim() : null;
    const topic   = tagLine ? tagLine[2].trim() : null;
    const concept = tagLine ? tagLine[3].trim() : null;

    const floors = {};
    const floorRe = /\*\*Floor (\d+):\*\* ([\s\S]*?)(?=\n\*\*Floor \d+:\*\*|\n---|\n*$)/g;
    let m;
    while ((m = floorRe.exec(block))) {
      floors[parseInt(m[1], 10)] = m[2].trim().replace(/\s+/g, ' ');
    }

    bbs.push({ sortOrder, title, subject, topic, concept, floors });
  }
  return bbs;
}

// ── html helpers ──────────────────────────────────────────────────────────────
function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
}

function htmlify(text) {
  let t = text.trim()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
  t = t.replace(/_(.+?)_/g, '<em>$1</em>');
  return `<p>${t}</p>`;
}

// ── main ──────────────────────────────────────────────────────────────────────
const mdBbs = parseMd(readFileSync(MD_PATH, 'utf8'))
  .filter(bb => bbOnly == null || bb.sortOrder === bbOnly);

const sortOrders = mdBbs.map(bb => bb.sortOrder);
const { data: dbRows, error } = await sb.from('cards')
  .select('sort_order, title, layers')
  .in('sort_order', sortOrders);

if (error) { console.error(error); process.exit(1); }

const dbBySort = new Map(dbRows.map(r => [r.sort_order, r]));

let changedCount = 0, heldBack = 0;
const toApply = [];
const toInsert = [];

for (const bb of mdBbs) {
  const db = dbBySort.get(bb.sortOrder);

  if (!db) {
    const floorIdxs = Object.keys(bb.floors).map(Number).sort((a, b) => a - b);
    if (floorIdxs.length === 0 || !floorIdxs.every((n, i) => n === i)) {
      console.log(`⚠  BB ${bb.sortOrder} — new BB but floors not contiguous from 0, skipping`);
      continue;
    }
    if (!bb.subject) {
      console.log(`⚠  BB ${bb.sortOrder} — new BB but missing **Subject:**/**Topic:**/**Concept:** line, skipping`);
      continue;
    }
    changedCount++;
    console.log(`\n➕ BB ${bb.sortOrder} — ${bb.title} (NEW — ${floorIdxs.length} floors, subject:${bb.subject} topic:${bb.topic})`);
    toInsert.push({
      sort_order: bb.sortOrder,
      act: 'I',
      kicker: '',
      title: bb.title,
      layers: floorIdxs.map(i => htmlify(bb.floors[i])),
      img_url: null,
      tags: {
        subject: bb.subject, topic: bb.topic, concept: bb.concept,
        ground: 'g0', source: 'publishable-review', buildsOn: [], reviewStatus: 'P',
      },
    });
    continue;
  }

  const titleChanged = bb.title && bb.title !== db.title;

  const dbLayers = db.layers || [];
  const mdFloorIdxs = Object.keys(bb.floors).map(Number).sort((a, b) => a - b);
  if (mdFloorIdxs.length === 0) continue;

  const maxIdx = mdFloorIdxs[mdFloorIdxs.length - 1];
  const contiguous = mdFloorIdxs.every((n, i) => n === i);

  if (!contiguous) {
    console.log(`⚠  BB ${bb.sortOrder} — floor numbers not contiguous from 0 (${mdFloorIdxs.join(',')}), skipping — renumber before syncing`);
    continue;
  }

  const floorDiffs = [];
  for (const i of mdFloorIdxs) {
    const dbLayer = dbLayers[i];
    const dbText  = dbLayer ? stripTags(typeof dbLayer === 'string' ? dbLayer : (dbLayer.text || '')) : '';
    const mdText  = bb.floors[i];
    if (mdText !== dbText) floorDiffs.push({ i, dbText, mdText, dbLayer });
  }

  const floorsRemoved = dbLayers.length - (maxIdx + 1);
  const removedHadAudio = floorsRemoved > 0 &&
    dbLayers.slice(maxIdx + 1).some(l => l && typeof l === 'object' && l.audio);

  if (floorDiffs.length === 0 && floorsRemoved <= 0 && !titleChanged) continue;

  changedCount++;
  console.log(`\n📝 BB ${bb.sortOrder} — ${bb.title}`);
  if (titleChanged) {
    console.log(`   Title:`);
    console.log(`     - ${db.title}`);
    console.log(`     + ${bb.title}`);
  }
  for (const d of floorDiffs) {
    console.log(`   Floor ${d.i}:`);
    console.log(`     - ${d.dbText.slice(0, 90)}${d.dbText.length > 90 ? '…' : ''}`);
    console.log(`     + ${d.mdText.slice(0, 90)}${d.mdText.length > 90 ? '…' : ''}`);
  }
  if (floorsRemoved > 0) {
    console.log(`   Floor count: ${dbLayers.length} → ${maxIdx + 1} (${floorsRemoved} floor${floorsRemoved > 1 ? 's' : ''} removed)${removedHadAudio ? '  ⚠ had audio attached' : ''}`);
  }

  if (removedHadAudio && !FORCE) {
    console.log(`   ⏸  held back — rerun with --force to confirm losing that audio`);
    heldBack++;
    continue;
  }

  // build new layers array
  const newLayers = [];
  for (let i = 0; i <= maxIdx; i++) {
    const diff = floorDiffs.find(d => d.i === i);
    const dbLayer = dbLayers[i];
    if (!diff) {
      newLayers[i] = dbLayer; // unchanged, keep exactly as-is
      continue;
    }
    const html = htmlify(diff.mdText);
    if (dbLayer && typeof dbLayer === 'object') {
      newLayers[i] = { ...dbLayer, text: html };
    } else {
      newLayers[i] = html;
    }
  }

  toApply.push({ sortOrder: bb.sortOrder, newLayers, newTitle: titleChanged ? bb.title : null });
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`${changedCount} BB(s) with changes${heldBack ? `, ${heldBack} held back (use --force)` : ''}`);
console.log(`${toApply.length} update(s), ${toInsert.length} new insert(s) — ${APPLY ? 'applying' : 'dry-run, use --apply to push'}`);

if (APPLY) {
  if (toInsert.length > 0) {
    console.log('\nInserting new BBs...');
    const { error: insErr } = await sb.from('cards').insert(toInsert);
    if (insErr) console.log(`  ✗ Insert failed: ${insErr.message}`);
    else toInsert.forEach(r => console.log(`  ✓ BB ${r.sort_order} inserted`));
  }
  if (toApply.length > 0) {
    console.log('\nApplying updates...');
    for (const { sortOrder, newLayers, newTitle } of toApply) {
      const update = { layers: newLayers, updated_at: new Date().toISOString() };
      if (newTitle) update.title = newTitle;
      const { error: upErr } = await sb.from('cards')
        .update(update)
        .eq('sort_order', sortOrder);
      console.log(upErr ? `  ✗ BB ${sortOrder}: ${upErr.message}` : `  ✓ BB ${sortOrder} updated${newTitle ? ' (title + floors)' : ''}`);
    }
  }
}
