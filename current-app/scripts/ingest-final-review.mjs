// Ingest the finalised publishable BBs into Supabase as a self-contained
// "Final draft" review topic — separate dynamic cards (sort_order 800+),
// tagged reviewStatus:'final' so the app colour-codes them green. Re-runnable:
// it clears the previous review boards (sort_order >= 800) and rebuilds.
//
//   node --env-file=.env.local scripts/ingest-final-review.mjs
//
// Source of truth: 1945_BBs/_PUBLISHABLE.md. Floors are paragraphs between
// the meta line and ---; no label markers needed.

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const s = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const md = readFileSync('1945_BBs/_PUBLISHABLE.md', 'utf8');

const REVIEW_BASE = 1000; // well clear of the snippet lane (784+) so they never collide

function toHtml(text) {
  let t = text.trim();
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); // bold first
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');             // then italics
  return t
    .split(/\n\s*\n/)
    .map(p => `<p>${p.replace(/\n/g, ' ').trim()}</p>`)
    .filter(p => p !== '<p></p>')
    .join('');
}

const sections = md.split(/\n(?=## )/).filter(x => x.startsWith('## '));
const boards = [];

for (const sec of sections) {
  const heading = sec.split('\n')[0].replace(/^##\s*/, '');
  const dash = heading.indexOf(' — ');
  const title = (dash >= 0 ? heading.slice(dash + 3) : heading).trim();

  // Subject from the italic meta line (e.g. "*Maths · Coordinate geometry*").
  const subjMatch = sec.match(/\n\*(Physics|Maths|Mathematics|Chemistry)\b/i);
  const subjRaw = (subjMatch ? subjMatch[1] : 'Physics').toLowerCase();
  const subject = subjRaw.startsWith('math') ? 'maths' : subjRaw.startsWith('chem') ? 'chemistry' : 'physics';

  // Review status from the meta line: "P3" = batch-reviewed/provisional, else final.
  const metaLine = (sec.match(/\n(\*[^\n]*)/) || [])[1] || '';
  const status = /\bP3\b/i.test(metaLine) ? 'p3' : 'final';

  // Floors are paragraphs separated by blank lines, between the meta line and ---.
  // Strip the meta line (starts with *) first, then split remaining text into paragraphs.
  const bodyStart = sec.indexOf('\n', sec.indexOf('\n*') + 1);
  const body = bodyStart >= 0 ? sec.slice(bodyStart) : '';
  const rawFloors = body.split(/\n\s*\n/).map(p => p.trim()).filter(p => p && !p.startsWith('---'));
  const layers = rawFloors.map(p => toHtml(p));

  if (layers.length === 0) continue; // snippet / recap / intro — skip
  boards.push({ title, layers, subject, status });
}

console.log(`Parsed ${boards.length} finalised BBs from _PUBLISHABLE.md`);

const { error: delErr } = await s.from('cards').delete().eq('tags->>source', 'publishable-review');
if (delErr) { console.error('delete failed:', delErr.message); process.exit(1); }

let so = REVIEW_BASE;
const rows = boards.map(b => ({
  sort_order: so++,
  act: 'I',
  kicker: '',
  title: b.title,
  layers: b.layers,
  img_url: null,
  tags: { subject: b.subject, reviewStatus: b.status, kind: 'bb', source: 'publishable-review' },
}));

const { error: insErr } = await s.from('cards').insert(rows);
if (insErr) { console.error('insert failed:', insErr.message); process.exit(1); }

console.log(`Inserted ${rows.length} review boards (sort_order ${REVIEW_BASE}-${so - 1}).`);
const bySubject = {};
for (const r of rows) (bySubject[r.tags.subject] ||= []).push(r.sort_order);
for (const [subj, orders] of Object.entries(bySubject)) {
  console.log(`\nWire into paths.js — ${subj} (${orders.length} boards):\n  cards: [${orders.join(', ')}]`);
}
