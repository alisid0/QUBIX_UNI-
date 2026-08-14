/**
 * Export the catalogue actually addressable from the production Path screen.
 * Board membership comes from the deployed path manifest; current authored
 * rows come from production Supabase, with bundled board modules as the same
 * offline fallback used by the app.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PATHS } from '../src/lib/content/paths.js';
import { FUNCTION_BOARDS } from '../src/lib/content/functionBoards.js';
import { MATRIX_BOARDS } from '../src/lib/content/matrixBoards.js';
import { PUBLISHABLE_TOPIC_BOARDS } from '../src/lib/content/publishableTopicBoards.js';
import { TOPIC_EXPANSION_BOARDS } from '../src/lib/content/topicExpansionBoards.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

function readEnv(path) {
  const result = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+)=(.*)$/);
    if (!match) continue;
    result[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return result;
}

const env = readEnv(join(root, '.env.production'));
const supabaseUrl = env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !anonKey) throw new Error('Production Supabase environment is incomplete.');

const boardMembership = new Map();
for (const [pathId, path] of Object.entries(PATHS)) {
  for (const board of path.cards) {
    if (!boardMembership.has(board)) boardMembership.set(board, []);
    boardMembership.get(board).push({ pathId, subject: path.subject, pathName: path.name });
  }
}

const boardIds = [...boardMembership.keys()].sort((a, b) => a - b);
const liveRows = new Map();
for (let start = 0; start < boardIds.length; start += 50) {
  const chunk = boardIds.slice(start, start + 50);
  const params = new URLSearchParams({
    select: 'sort_order,act,kicker,title,layers,img_url,tags,updated_at',
    sort_order: `in.(${chunk.join(',')})`,
    order: 'sort_order.asc',
  });
  const response = await fetch(`${supabaseUrl}/rest/v1/cards?${params}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
  });
  if (!response.ok) throw new Error(`Supabase cards export failed: HTTP ${response.status}`);
  for (const row of await response.json()) liveRows.set(row.sort_order, row);
}

const bundled = {
  ...FUNCTION_BOARDS,
  ...MATRIX_BOARDS,
  ...PUBLISHABLE_TOPIC_BOARDS,
  ...TOPIC_EXPANSION_BOARDS,
};

const missing = [];
const boards = boardIds.map((id) => {
  const row = liveRows.get(id);
  const fallback = bundled[id];
  const source = row ? 'production-supabase' : fallback ? 'deployed-bundle-fallback' : 'missing';
  const board = row || fallback;
  if (!board) {
    missing.push(id);
    return { id, source, paths: boardMembership.get(id), layers: [] };
  }
  return {
    id,
    source,
    act: board.act || '',
    kicker: board.kicker || '',
    title: board.title || '',
    tags: board.tags || {},
    img: board.img_url || board.img || null,
    layers: board.layers || [],
    updatedAt: board.updated_at || null,
    paths: boardMembership.get(id),
  };
});

if (missing.length) throw new Error(`Unresolved live path boards: ${missing.join(', ')}`);

const result = {
  source: 'production-paths-plus-production-supabase',
  fetchedAt: new Date().toISOString(),
  site: env.VITE_PUBLIC_SITE_URL,
  boardCount: boards.length,
  floorCount: boards.reduce((sum, board) => sum + board.layers.filter(Boolean).length, 0),
  subjects: Object.fromEntries(['physics', 'maths', 'chemistry', 'computing'].map((subject) => {
    const set = boards.filter((board) => board.paths.some((path) => path.subject === subject));
    return [subject, {
      boards: set.length,
      floors: set.reduce((sum, board) => sum + board.layers.filter(Boolean).length, 0),
    }];
  })),
  boards,
};

const auditDir = join(root, '.audit-cache');
mkdirSync(auditDir, { recursive: true });
const output = join(auditDir, 'live-production-bbs.json');
writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(`Exported ${result.boardCount} live path BBs / ${result.floorCount} floors.`);
console.log(`Supabase rows: ${liveRows.size}; bundle fallbacks: ${boards.filter((board) => board.source === 'deployed-bundle-fallback').length}.`);
for (const [subject, counts] of Object.entries(result.subjects)) {
  console.log(`${subject}: ${counts.boards} BBs / ${counts.floors} floors`);
}
