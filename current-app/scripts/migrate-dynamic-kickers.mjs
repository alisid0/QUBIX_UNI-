#!/usr/bin/env node
/**
 * Migrate existing Supabase dynamic card kickers from "BB NN" → topic-based format.
 *
 * Uses the PATHS manifest (src/lib/content/paths.js) to determine which topic
 * each card belongs to and its position within that topic.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-dynamic-kickers.mjs [--dry-run]
 *
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Topic numbering: Maths=1, Chemistry=2, Physics=3, Computing=4
 * Format: "{TopicName} {subjectNum}.{bbIndex}"
 * Example: "Coordinate Geometry 1.0", "Atomic Structure 2.3", "Forces & Newton's Laws 3.5"
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

// Subject→number mapping
const SUBJECT_NUM = { maths: '1', chemistry: '2', physics: '3', computing: '4' };

// Import PATHS from the app source (static import of ES module)
// We need to parse paths.js manually since it's an ES module
const pathsContent = readFileSync(join(__dirname, '..', 'src', 'lib', 'content', 'paths.js'), 'utf-8');

// Extract PATHS object: each entry has { subject, name, cards: [...] }
const pathEntries = [];
const pathRe = /(\w+):\s*\{\s*subject:\s*'(\w+)',\s*name:\s*'([^']+)',[^}]*cards:\s*\[([^\]]+)\]/g;
let match;
while ((match = pathRe.exec(pathsContent)) !== null) {
  const [, , subject, name, cardsStr] = match;
  const cards = cardsStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  pathEntries.push({ subject, name, cards });
}

// Build card→topic mapping
const cardToTopic = {};
for (const entry of pathEntries) {
  const subjNum = SUBJECT_NUM[entry.subject];
  if (!subjNum) continue; // skip unknown subjects
  entry.cards.forEach((cardNum, idx) => {
    // A card may appear in multiple topics; use the first assignment
    if (!cardToTopic[cardNum]) {
      cardToTopic[cardNum] = {
        kicker: `${entry.name} ${subjNum}.${idx}`,
        subject: entry.subject,
        topic: entry.name
      };
    }
  });
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required (--env-file=.env.local)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  // Fetch all dynamic cards (sort_order > 84). PostgREST caps rows at 1000
  // per request regardless of client-side .limit(), so page through with
  // .range() to get everything.
  let cards = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('cards')
      .select('id, sort_order, kicker, title, tags')
      .gt('sort_order', 84)
      .order('sort_order')
      .range(from, from + pageSize - 1);

    if (error) {
      console.error('ERROR fetching cards:', error.message);
      process.exit(1);
    }
    cards = cards.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  console.log(`Found ${cards.length} dynamic cards.`);
  if (DRY_RUN) console.log('DRY RUN — no changes will be made.\n');

  let updated = 0;
  let skipped = 0;
  const updates = [];

  for (const card of cards) {
    const mapping = cardToTopic[card.sort_order];
    if (!mapping) {
      skipped++;
      if (DRY_RUN) console.log(`  SKIP  sort=${card.sort_order}  "${card.kicker}" → no topic mapping found`);
      continue;
    }

    const newKicker = mapping.kicker;
    if (card.kicker === newKicker) {
      skipped++;
      continue;
    }

    updates.push({ card, newKicker, mapping });

    if (DRY_RUN) {
      console.log(`  ${card.sort_order}:  "${card.kicker}" → "${newKicker}"  (${mapping.subject}/${mapping.topic})`);
    }
  }

  if (!DRY_RUN && updates.length > 0) {
    // Update each card individually (only the kicker field)
    for (const u of updates) {
      const { error: updateError } = await supabase
        .from('cards')
        .update({ kicker: u.newKicker })
        .eq('id', u.card.id);

      if (updateError) {
        console.error(`  ERROR updating sort=${u.card.sort_order}:`, updateError.message);
      } else {
        updated++;
        if (updated % 20 === 0) console.log(`  ... ${updated}/${updates.length} updated`);
      }
    }
    console.log(`\nUpdated ${updated} card(s).`);
  } else if (DRY_RUN) {
    console.log(`\nWould update ${updates.length} card(s) (${skipped} skipped).`);
  } else {
    console.log('\nNo cards need updating.');
  }

  if (skipped > 0 && !DRY_RUN) {
    console.log(`${skipped} card(s) could not be mapped to a topic.`);
  }
}

main();
