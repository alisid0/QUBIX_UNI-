// Build crawler entry points from the same registries and generated library
// that the learner-facing site uses. This avoids another hardcoded chapter
// count or book list drifting away from what is actually published.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { superstoreTopics } from '../src/factory/superstore-topics.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const LIBRARY = join(PUBLIC, 'library');
const ORIGIN = 'https://qubix.university';

const libraryPages = (await readdir(LIBRARY))
  .filter(file => file.endsWith('.html'))
  .sort()
  .map(file => `/library/${file}`);

const chapterPages = SHARED_FOUNDATIONS.map(({ chapter }) =>
  `/?mode=game&mission=shared-book&chapter=${chapter}&session=1`);
const wikiPages = [
  '/?mode=wiki',
  '/?mode=wiki&section=books',
  '/?mode=wiki&section=world',
  ...superstoreTopics.map(({ phase }) => `/?mode=wiki&phase=${phase}`)
];

const paths = [...new Set([
  '/',
  '/?mode=game',
  ...wikiPages,
  '/?mode=game&mission=store',
  '/?prototype=variables-and-rates',
  ...chapterPages,
  ...libraryPages
])];

const xml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `  <url><loc>${xml(ORIGIN + path)}</loc></url>`).join('\n')}
</urlset>
`;
const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;

await writeFile(join(PUBLIC, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(PUBLIC, 'robots.txt'), robots, 'utf8');

const index = await readFile(join(ROOT, 'index.html'), 'utf8');
if (/Variables and Rates of Change \| Qubix University<\/title>/.test(index)) {
  throw new Error('index.html still publishes the mathematics prototype as the site title.');
}

for (const file of libraryPages) {
  const html = await readFile(join(PUBLIC, file.replace(/^\//, '')), 'utf8');
  for (const required of ['name="description"', 'rel="canonical"', 'property="og:title"']) {
    if (!html.includes(required)) throw new Error(`${file} is missing ${required}.`);
  }
}

console.log(`SEO files built: ${paths.length} canonical URLs, ${libraryPages.length} library pages`);
