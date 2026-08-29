/**
 * build-seo-pages.mjs — Prerender static SEO concept pages from seo-pages.json
 *
 * Reads the 59 SEO content records, generates a complete static HTML page
 * for each at dist/<subject>/<slug>/index.html, and updates sitemap.xml.
 *
 * Runs after `vite build` as part of `npm run build`.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Config ──────────────────────────────────────────────────────────────────
const DOMAIN = 'https://qubix.university';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SEO_JSON_PATH = join(ROOT, 'src', 'content-seo', 'seo-pages.json');
const PATHS_MODULE = join(ROOT, 'src', 'lib', 'content', 'paths.js');

// ── Subject labels (fallback; prefer import from paths.js) ──────────────────
const FALLBACK_LABELS = {
  physics: 'Physics',
  maths: 'Mathematics',
  chemistry: 'Chemistry',
  compare: ''
};

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Minimal Qubix-brand inline CSS — Mulish, light theme, no external deps */
const INLINE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #FBFAF9; color: #121118; line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .page { max-width: 720px; margin: 0 auto; padding: 48px 24px 64px; }
  @media (max-width: 600px) { .page { padding: 32px 16px 48px; } }
  a { color: #454ADE; text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* Breadcrumb */
  .breadcrumb { font-size: 14px; color: #6B6B76; margin-bottom: 32px; }
  .breadcrumb a { color: #6B6B76; }
  .breadcrumb span { color: #121118; }

  /* Hero / h1 */
  h1 { font-size: 32px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 16px; color: #121118; }
  @media (max-width: 600px) { h1 { font-size: 26px; } }

  .summary {
    font-size: 18px; color: #454545; line-height: 1.65; margin-bottom: 32px;
    padding-left: 16px; border-left: 3px solid #454ADE;
  }

  /* Body content */
  .body-html { font-size: 17px; line-height: 1.8; color: #121118; }
  .body-html p { margin-bottom: 20px; }
  .body-html ul, .body-html ol { margin: 0 0 20px 24px; }
  .body-html li { margin-bottom: 8px; }
  .body-html strong { font-weight: 700; color: #0D0D14; }

  /* CTA */
  .cta-block {
    margin: 40px 0; padding: 28px 32px; background: #EEEEFF; border-radius: 12px;
    text-align: center; border: 1px solid #D9D9F2;
  }
  .cta-block .cta-text { font-size: 15px; color: #5A5A6E; margin-bottom: 12px; }
  .cta-button {
    display: inline-block; padding: 14px 40px; background: #454ADE; color: #fff;
    border-radius: 10px; font-weight: 700; font-size: 17px; text-decoration: none;
    transition: background 0.2s;
  }
  .cta-button:hover { background: #373BC8; text-decoration: none; }

  /* FAQs */
  .faq-section { margin: 48px 0; }
  .faq-section h2 { font-size: 22px; font-weight: 800; margin-bottom: 24px; }
  .faq-item { margin-bottom: 24px; }
  .faq-q { font-weight: 700; font-size: 17px; margin-bottom: 6px; color: #121118; }
  .faq-a { font-size: 16px; color: #454545; line-height: 1.7; }

  /* Related topics */
  .related-section { margin: 48px 0; }
  .related-section h2 { font-size: 22px; font-weight: 800; margin-bottom: 16px; }
  .related-links { display: flex; flex-wrap: wrap; gap: 10px; }
  .related-link {
    display: inline-block; padding: 8px 18px; background: #EEEEEE; border-radius: 8px;
    font-size: 15px; color: #121118; text-decoration: none;
    transition: background 0.15s;
  }
  .related-link:hover { background: #DDDDEE; text-decoration: none; }

  /* Footer */
  .page-footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid #E0E0E0; font-size: 13px; color: #90909E; text-align: center; }
  .page-footer a { color: #90909E; }
`;

/**
 * Escape HTML entities for safe embedding in JSON-LD and HTML attributes.
 */
function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Build a complete <html> document for one SEO page.
 */
function buildPage(record, subjectLabel, relatedNameMap) {
  const {
    slug, subject, seoTitle, metaDescription, h1,
    summary, bodyHtml, keywords, faqs, relatedSlugs, appCta
  } = record;

  const canonicalPath = subject === 'compare'
    ? `/${slug}`
    : `/${subject}/${slug}`;

  const canonicalUrl = `${DOMAIN}${canonicalPath}`;

  // Breadcrumb
  const bcParts = [{ label: 'Qubix', href: DOMAIN }];
  if (subject !== 'compare') {
    bcParts.push({ label: subjectLabel, href: `${DOMAIN}/${subject}` });
  }
  bcParts.push({ label: h1, href: canonicalUrl });

  const breadcrumbHtml = bcParts.map((p, i) =>
    i < bcParts.length - 1
      ? `<a href="${p.href}">${esc(p.label)}</a>`
      : `<span>${esc(p.label)}</span>`
  ).join(' &rsaquo; ');

  // FAQ HTML
  const faqHtml = (faqs && faqs.length > 0)
    ? `<section class="faq-section">
        <h2>Frequently asked questions</h2>
        ${faqs.map(f => `<div class="faq-item"><div class="faq-q">${esc(f.q)}</div><div class="faq-a">${esc(f.a)}</div></div>`).join('\n')}
       </section>`
    : '';

  // Related topics
  const relatedHtml = (relatedSlugs && relatedSlugs.length > 0)
    ? `<section class="related-section">
        <h2>Explore related topics</h2>
        <div class="related-links">
          ${relatedSlugs.map(slug => {
            const name = relatedNameMap[slug] || slug;
            const href = `${DOMAIN}/${subject}/${slug}`;
            return `<a class="related-link" href="${href}">${esc(name)}</a>`;
          }).join('\n')}
        </div>
       </section>`
    : '';

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoTitle,
    description: metaDescription,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: { '@type': 'Organization', name: 'Qubix' },
    publisher: { '@type': 'Organization', name: 'Qubix', url: DOMAIN },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: bcParts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.label,
        item: p.href
      }))
    }
  };

  // FAQPage JSON-LD if FAQs present
  let faqLd = '';
  if (faqs && faqs.length > 0) {
    faqLd = `\n  <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    })}</script>`;
  }

  const appCtaUrl = subject === 'compare'
    ? `${DOMAIN}/`
    : `${DOMAIN}/?path=${esc(record.id)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(seoTitle)}</title>
  <meta name="description" content="${esc(metaDescription)}">
  <meta name="keywords" content="${esc((keywords || []).join(', '))}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${esc(seoTitle)}">
  <meta property="og:description" content="${esc(metaDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Qubix">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(seoTitle)}">
  <meta name="twitter:description" content="${esc(metaDescription)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>${INLINE_CSS}</style>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>${faqLd}
</head>
<body>
  <div class="page">
    <nav class="breadcrumb" aria-label="Breadcrumb">${breadcrumbHtml}</nav>
    <article>
      <h1>${esc(h1)}</h1>
      <p class="summary">${esc(summary)}</p>
      <div class="body-html">${bodyHtml}</div>
    </article>
    <div class="cta-block">
      <p class="cta-text">${esc(appCta || `Start this course on Qubix`)}</p>
      <a class="cta-button" href="${appCtaUrl}">Open in Qubix &rarr;</a>
    </div>
    ${faqHtml}
    ${relatedHtml}
    <footer class="page-footer">
      <p>&copy; ${new Date().getFullYear()} Qubix &mdash; free STEM microlearning. <a href="${DOMAIN}">qubix.app</a></p>
    </footer>
  </div>
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Read the SEO content
  let records;
  try {
    const raw = readFileSync(SEO_JSON_PATH, 'utf-8');
    records = JSON.parse(raw);
  } catch (_) {
    console.warn('[build-seo-pages] seo-pages.json not found or invalid — skipping SEO page generation.');
    process.exit(0);
  }

  if (!records || records.length === 0) {
    console.warn('[build-seo-pages] seo-pages.json is empty — skipping SEO page generation.');
    process.exit(0);
  }

  // 2. Load PATHS to get subject labels and topic name mapping
  let PATHS = {};
  let SUBJECT_LABELS = FALLBACK_LABELS;
  try {
    const mod = await import(`file://${PATHS_MODULE}`);
    PATHS = mod.PATHS || {};
    SUBJECT_LABELS = mod.SUBJECT_LABELS || FALLBACK_LABELS;
  } catch (_) {
    console.warn('[build-seo-pages] Could not import paths.js — using fallback subject labels.');
  }

  // Build a slug → topic-name map for related-links labels
  const slugToName = {};
  for (const rec of records) {
    slugToName[rec.slug] = rec.h1;
  }

  // Also map PATHS id → name
  const pathIdToName = {};
  for (const [id, p] of Object.entries(PATHS)) {
    pathIdToName[id] = p.name;
  }

  // 3. Generate pages
  const sitemapEntries = [];
  // Trailing slash to match the homepage canonical (<link rel="canonical"
  // href="…/">), so Google does not treat "/" and "" as two separate URLs.
  sitemapEntries.push({ url: `${DOMAIN}/`, lastmod: new Date().toISOString().split('T')[0] });

  let generated = 0;
  for (const record of records) {
    const { slug, subject } = record;
    const subjectLabel = SUBJECT_LABELS[subject] || '';

    // Determine output dir
    const dir = subject === 'compare'
      ? join(DIST, slug)
      : join(DIST, subject, slug);

    mkdirSync(dir, { recursive: true });

    const relatedNameMap = {};
    if (record.relatedSlugs) {
      for (const rs of record.relatedSlugs) {
        relatedNameMap[rs] = slugToName[rs] || rs;
      }
    }

    const html = buildPage(record, subjectLabel, relatedNameMap);
    const outPath = join(dir, 'index.html');
    writeFileSync(outPath, html, 'utf-8');
    generated++;

    // Sitemap entry
    const pagePath = subject === 'compare'
      ? `/${slug}`
      : `/${subject}/${slug}`;
    sitemapEntries.push({
      url: `${DOMAIN}${pagePath}`,
      lastmod: new Date().toISOString().split('T')[0]
    });
  }

  console.log(`[build-seo-pages] Generated ${generated} SEO pages.`);

  // 4. Write sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e =>
    `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`
  ).join('\n')}
</urlset>
`;
  const sitemapPath = join(DIST, 'sitemap.xml');
  writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`[build-seo-pages] Updated sitemap.xml with ${sitemapEntries.length} URLs.`);
}

main().catch(err => {
  console.error('[build-seo-pages] Error:', err);
  process.exit(1);
});
