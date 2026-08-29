#!/usr/bin/env node
/**
 * Ingest a batch of Snippets into the existing Supabase `cards` table, tagged
 * `kind:"snippet"` so the BB reader/pipeline never picks them up and only the
 * Snippets tab queries them. Sibling of ingest-bbs.mjs — same table, same
 * service-role-key model, but a different markdown shape (no Floors).
 *
 * Usage:
 *   node --env-file=.env.local scripts/ingest-snippets.mjs path/to/batch.md ["Collection kicker"]
 *
 * The optional second arg is the small accent label shown above each snippet
 * title (e.g. "Tesla vs Edison", "The Golden Age"). Defaults to "Did you know?".
 *
 * Snippet markdown shape (one per `## SNIPPET-...` section):
 *
 *   ## SNIPPET-ERA-FARADAY — Before Faraday, electricity was a parlour trick
 *   **buildsOn:** BB-NEW-567 (Faraday's Law)
 *   **Kind:** snippet (era)
 *   **Content:**
 *   <prose, one or more paragraphs>
 *   **Sources:** ...
 *
 * Idempotent: each snippet's heading token (e.g. SNIPPET-ERA-FARADAY) is stored
 * as tags.slug; re-running a batch reuses that row's sort_order instead of
 * duplicating, so polishing + re-ingesting updates in place.
 */
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

function fail(msg) { console.error('ERROR:', msg); process.exit(1); }

const batchPath = process.argv[2];
const kicker = process.argv[3] || 'Did you know?';
if (!batchPath) fail('usage: node scripts/ingest-snippets.mjs path/to/batch.md ["Collection kicker"]');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  fail('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (use --env-file=.env.local, never the anon key)');
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const EXOTIC_SPACES = /[  -​  　]/g;
const raw = readFileSync(batchPath, 'utf-8').normalize('NFC').replace(EXOTIC_SPACES, ' ');

/** Build the rendered HTML body from the Content prose + Sources line. */
function buildBody(content, sources) {
  const paras = content
    .split(/\n\s*\n/)
    .map(p => p.replace(/\r?\n/g, ' ').trim())
    .filter(Boolean)
    // already-HTML paragraphs (rare) pass through; plain prose gets wrapped.
    .map(p => /^<(p|div|ul|ol)\b/i.test(p) ? p : `<p>${p}</p>`);
  if (sources) {
    paras.push(`<p style="font-size:12px;opacity:0.6;margin-top:14px;">Sources: ${sources.replace(/\r?\n/g, ' ').trim()}</p>`);
  }
  return paras.join('');
}

function parseSnippets(content) {
  const headingRe = /^##\s+(SNIPPET[-\w]*)\s*[—-]\s*(.+?)\s*$/gim;
  const headings = [...content.matchAll(headingRe)];
  const out = [];

  for (let i = 0; i < headings.length; i++) {
    const slug = headings[i][1].trim().toUpperCase();
    const title = headings[i][2].trim();
    const start = headings[i].index + headings[i][0].length;
    const end = i + 1 < headings.length ? headings[i + 1].index : content.length;
    const body = content.slice(start, end);

    const subjectMatch = body.match(/\*\*Subject:\*\*\s*([A-Za-z]+)/);
    const kindMatch = body.match(/\*\*Kind:\*\*\s*snippet(?:\s*\(([a-z]+)\))?/i);
    const buildsOnMatch = body.match(/\*\*buildsOn:\*\*\s*(.+)/i);
    const contentMatch = body.match(/\*\*Content:\*\*\s*([\s\S]*?)(?=\n\*\*Sources:\*\*|\n##|$)/i);
    const sourcesMatch = body.match(/\*\*Sources:\*\*\s*([\s\S]*?)(?=\n##|$)/i);

    if (!contentMatch || !contentMatch[1].trim()) {
      console.warn(`  ! skipping "${slug}" — no **Content:** block found`);
      continue;
    }

    const buildsOn = buildsOnMatch
      ? [...buildsOnMatch[1].matchAll(/BB-NEW-\d+|BB\s*\d+|Card\s*\d+/gi)].map(m => m[0])
      : [];

    out.push({
      slug,
      title,
      subject: subjectMatch ? subjectMatch[1].toLowerCase() : null,
      subkind: kindMatch && kindMatch[1] ? kindMatch[1].toLowerCase() : 'discovery',
      buildsOn,
      htmlBody: buildBody(contentMatch[1], sourcesMatch ? sourcesMatch[1] : '')
    });
  }
  return out;
}

async function main() {
  const snippets = parseSnippets(raw);
  if (snippets.length === 0) fail('no `## SNIPPET-...` sections found in the file');

  // Existing snippet rows (for idempotent slug -> sort_order reuse) + global max.
  const { data: existing, error: exErr } = await supabase
    .from('cards').select('sort_order, tags').eq('tags->>kind', 'snippet');
  if (exErr) fail(exErr.message);
  const slugToOrder = {};
  for (const r of existing || []) {
    if (r.tags?.slug) slugToOrder[r.tags.slug] = r.sort_order;
  }

  // Next sort_order from the SNIPPET lane only — never the global max, so that
  // review boards and other dynamic cards (which live in their own ranges)
  // can't push snippet numbers up into them and cause sort_order collisions.
  const SNIPPET_BASE = 784;
  const maxSnippet = (existing || []).reduce((m, r) => Math.max(m, r.sort_order || 0), SNIPPET_BASE - 1);
  let nextOrder = maxSnippet + 1;

  const rows = snippets.map(s => {
    const sortOrder = slugToOrder[s.slug] ?? nextOrder++;
    return {
      sort_order: sortOrder,
      act: 'I', // retired field, kept to satisfy the table's NOT NULL constraint
      kicker,
      title: s.title,
      layers: [s.htmlBody],
      img_url: null,
      tags: {
        kind: 'snippet',
        subkind: s.subkind,
        slug: s.slug,
        subject: s.subject,
        buildsOn: s.buildsOn
      }
    };
  });

  const { error } = await supabase.from('cards').upsert(rows, { onConflict: 'sort_order' });
  if (error) fail(error.message);

  const reused = rows.filter(r => slugToOrder[r.tags.slug] != null).length;
  console.log(`Ingested ${rows.length} snippet(s) — kicker "${kicker}".`);
  console.log(`  ${reused} updated in place, ${rows.length - reused} new.`);
  console.log('  sort_order:', rows.map(r => r.sort_order).join(', '));
}

main();
