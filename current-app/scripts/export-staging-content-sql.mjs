#!/usr/bin/env node
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, '.playwright-session', 'staging-content-sync');

function parseEnv(source) {
  return Object.fromEntries(source
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const separator = line.indexOf('=');
      return [line.slice(0, separator), line.slice(separator + 1)];
    }));
}

function sqlText(value) {
  if (value == null) return 'null';
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlJson(value) {
  return value == null ? 'null' : `${sqlText(JSON.stringify(value))}::jsonb`;
}

function csvCell(value) {
  if (value == null) return '';
  return `"${String(value).replaceAll('"', '""')}"`;
}

const env = parseEnv(await readFile(resolve(root, '.env.production'), 'utf8'));
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error('Production Supabase public credentials are not configured.');

const cards = [];
for (let offset = 0; ; offset += 1000) {
  const endpoint = new URL('/rest/v1/cards', url);
  endpoint.searchParams.set('select', 'sort_order,act,kicker,title,layers,img_url,tags');
  endpoint.searchParams.set('order', 'sort_order.asc');
  endpoint.searchParams.set('offset', String(offset));
  endpoint.searchParams.set('limit', '1000');
  const response = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` }
  });
  if (!response.ok) throw new Error(`Production card fetch failed (${response.status}).`);
  const page = await response.json();
  cards.push(...page);
  if (page.length < 1000) break;
}

await mkdir(outputDir, { recursive: true });
const csvColumns = ['sort_order', 'act', 'kicker', 'title', 'layers', 'img_url', 'tags', 'bbid'];
const csvRows = cards.map(card => [
  card.sort_order,
  card.act,
  card.kicker,
  card.title,
  JSON.stringify(card.layers),
  card.img_url,
  JSON.stringify(card.tags),
  card.sort_order
].map(csvCell).join(','));
await writeFile(
  resolve(outputDir, 'cards.csv'),
  `${csvColumns.join(',')}\n${csvRows.join('\n')}\n`,
  'utf8'
);

const chunkSize = 75;
for (let offset = 0; offset < cards.length; offset += chunkSize) {
  const chunk = cards.slice(offset, offset + chunkSize);
  const values = chunk.map(card => `(
    ${card.sort_order}, ${sqlText(card.act)}, ${sqlText(card.kicker)}, ${sqlText(card.title)},
    ${sqlJson(card.layers)}, ${sqlText(card.img_url)}, ${sqlJson(card.tags)}, ${card.sort_order}
  )`).join(',\n');
  const sql = `begin;
insert into public.cards (sort_order, act, kicker, title, layers, img_url, tags, bbid)
values
${values}
on conflict (sort_order) do update set
  act = excluded.act,
  kicker = excluded.kicker,
  title = excluded.title,
  layers = excluded.layers,
  img_url = excluded.img_url,
  tags = excluded.tags;
commit;
`;
  const filename = `chunk-${String(offset / chunkSize + 1).padStart(2, '0')}.sql`;
  await writeFile(resolve(outputDir, filename), sql, 'utf8');
}

await writeFile(resolve(outputDir, 'chunk-final.sql'), `select setval(
  'public.cards_bbid_seq',
  greatest(coalesce(max(bbid), 0), 1),
  max(bbid) is not null
)
from public.cards;

select count(*) as cards, min(sort_order) as first_card, max(sort_order) as last_card
from public.cards;
`, 'utf8');

console.log(`Exported ${cards.length} public cards in ${Math.ceil(cards.length / chunkSize)} chunks.`);
console.log(`Review the generated SQL and cards.csv in ${outputDir}`);
