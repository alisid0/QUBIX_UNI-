# DeepSeek brief — build Qubix's crawlable concept-page layer (SEO engineering)

**Companion to `SEO-DEEPSEEK-BRIEF.md`** (which produces the page *content* as JSON). This brief is the *engineering*: turn that content into public, crawlable pages that rank, **without breaking the live app.** You wrote the original Svelte stack, but the codebase has grown a lot since — treat the "Current architecture" section below as ground truth, not memory.

## Mission

Add a **public, prerendered concept page per topic** (e.g. `/physics/gravitation-and-orbits`) that:
- is **pure static HTML** — full content visible to crawlers with **no JavaScript required**;
- has a complete, unique `<head>` (title, meta description, canonical, Open Graph, Twitter) + **JSON-LD** (LearningResource/Article + FAQPage + BreadcrumbList);
- shows the explainer content, an FAQ block, and internal links to related topics;
- has a prominent **"Open this course in Qubix"** link that deep-links into the existing app;
- is listed in `sitemap.xml`.

This is additive. **The interactive app must keep working unchanged.**

## Current architecture (ground truth)

**Stack:** Svelte **4.2** + Vite **5.4** + `@sveltejs/vite-plugin-svelte` 3.1. A **plain client-side SPA — NOT SvelteKit, no router library.** `package.json` scripts: `dev: vite`, `build: vite build`, `preview: vite preview`. Only runtime dep: `@supabase/supabase-js`.

**Entry / mount:** `index.html` is a shell — it now contains a static `#seo-splash` hero (full `<head>` meta/OG/JSON-LD already added) and `<div id="app">`. `src/main.js` does `new App({ target: document.getElementById('app') })`, then `document.getElementById('seo-splash')?.remove()`, then registers `sw.js`.

**Routing:** `src/App.svelte` holds `let currentView` — a string switch over: `loading | auth | onboarding | home | topics | topicDetail | stats | map | leaderboard | otherUserStats | snippets | reader | quiz | author`. A `navigate(view, arg)` function sets `currentView` (and `currentPathId` for `topicDetail`/`quiz`, `readerNumbers`/`readerStart` for `reader`). **No URL/History API usage at all** — every screen lives at `/`. Bottom-nav tabs: home / topics / map / snippets.

**Content model (the source of truth for what each topic is):**
- `src/lib/content/paths.js` — exports `PATHS` (`{ [id]: { subject, name, icon, cards: number[], quizUrls } }`), `SUBJECT_PATHS` (`{ physics:[ids], maths:[ids], chemistry:[ids] }`), `SUBJECT_LABELS`, `pathsForCard()`, `totalBoards()`. **56 paths.** This is the canonical topic list — import it in the build script.
- `src/lib/content/deck.js` — `DECK` array, static boards (cards 1–84). Shape `{ kicker, title, layers, img, tags:{ subject, topic, concept, ground } }`. `layers` are HTML strings (the board text).
- `src/lib/content/dynamicBoards.js` — `getBoard(n)` / `fetchBoardsByNumbers()` resolve boards with `sort_order ≥ 85` from Supabase's `cards` table (cached to localStorage). The build script should **not** need Supabase — use the SEO content JSON for page text.
- The **SEO content JSON** from the companion brief (59 records). Proposed home: `src/content-seo/seo-pages.json` (create it). Each record has `id, slug, subject, seoTitle, metaDescription, h1, summary, bodyHtml, keywords[], faqs[], relatedSlugs[], appCta`.

**Design:** `src/lib/styles/qubix-tokens.css` — `--qx-*` vars, font Mulish, accent `#454ADE`, light bg `#FBFAF9`/`#EEEEEE`, text `#121118`. Concept pages are standalone HTML, so inline a small stylesheet that matches this look (don't import the app's CSS).

**Build / deploy:** `vite build` → `dist/`. Everything in `public/` is copied to the dist root (already there: `robots.txt`, `sitemap.xml` [homepage only], `manifest.webmanifest`, `sw.js`, `images/`, empty `icons/`). Deploy: `npx vercel --prod`; production alias `https://qubix.university` (use this as the canonical domain; it's configurable in one constant).

**Critical Vercel fact:** `vercel.json` has **no catch-all rewrite** — only `sw.js` cache headers. So a real file at `dist/physics/gravitation-and-orbits/index.html` is served directly at `/physics/gravitation-and-orbits` with **no routing change needed**. Unknown paths 404 (fine).

## Recommended approach (please confirm or improve)

**Do it as an additive prerender step on the existing Vite SPA — not a SvelteKit migration.** Reasons:
- The concept content is **static**, so it needs SSG, not SSR. A SvelteKit migration would rewrite the entire working app (routing, mount, build, deploy adapter, the chalk + qubix design systems, the Supabase init, the service worker) — high risk for a change delivered remotely and integrated by hand, with no SEO upside over static prerendering.
- An additive script touches **zero** app runtime code (except a ~10-line deep-link helper), so it can't break the live product.

If you judge SvelteKit genuinely necessary, say so explicitly and deliver it **phased and backward-compatible**, preserving every current screen. Otherwise, build the prerender step below.

## Deliverables

1. **`scripts/build-seo-pages.mjs`** (Node ESM, cross-platform — `node:fs/promises`, `node:path`; the team runs Windows + Git Bash):
   - Reads `src/content-seo/seo-pages.json` and imports `PATHS`/`SUBJECT_LABELS` from `paths.js`.
   - For each record, writes `dist/<subject>/<slug>/index.html` — a complete, self-contained, **static** HTML document: `<head>` with title, meta description, `<link rel=canonical>` to its own URL, OG + Twitter tags; inline brand CSS (Mulish, light theme); `<h1>`, summary, `bodyHtml`; an FAQ `<section>`; a "related topics" list linking to other generated slugs; a breadcrumb; and a primary CTA button linking to `https://<DOMAIN>/?path=<id>` ("Open this course in Qubix").
   - Emits **JSON-LD**: `LearningResource` (or `Article`) + `FAQPage` (from `faqs`) + `BreadcrumbList`.
   - Defines `DOMAIN` and output dir as constants at the top.
   - Skips gracefully (warn, exit 0) if the JSON is missing/empty, so `vite build` never breaks.
2. **Sitemap generation** — extend the same script (or a sibling) to overwrite `dist/sitemap.xml` with the homepage + every concept/positioning page URL (with `<lastmod>`).
3. **`package.json`** — change build to `"build": "vite build && node scripts/build-seo-pages.mjs"`.
4. **Deep-link helper in `src/App.svelte`** (~10 lines, additive): in the existing `onMount`, after auth resolves, read `new URLSearchParams(location.search).get('path')`; if it's a valid `PATHS` id, `navigate('topicDetail', thatId)`. Do not change any other routing.
5. **Service-worker guard** — `sw.js` has scope `/` and caches the app shell. Ensure it does **not** serve the SPA shell for `/<subject>/<slug>` navigations (crawlers and direct hits must get the static page, not the app). Either scope the SW's fetch handler to skip those paths, or use a network-first/bypass rule for top-level navigations to the concept paths. Call out exactly what you changed.

## Constraints & gotchas

- **Never break the live app.** Only `App.svelte` (deep-link) and `sw.js` (guard) may change in the runtime; everything else is new files + the `package.json` build line.
- Concept pages are **public and unauthenticated** (the app is auth-gated; the pages are not).
- **No secrets in the pages** — they're built from the JSON, offline. Never embed the Supabase service-role key anywhere; don't even need the anon key in these pages.
- Content must be **in the HTML source** (no client fetch) — crawlers must see it without running JS.
- Don't touch the chalk (`tokens.css`) or qubix (`qubix-tokens.css`) systems; inline the page CSS instead.
- Keep slugs and the `/<subject>/<slug>` URL shape exactly as in the JSON (subject ∈ physics|maths|chemistry|compare; `compare` pages can live at `/<slug>`).

## Handoff workflow (important — you can't run this repo)

You cannot run `vite build`, reach Supabase, or deploy. So:
- Make the script **self-contained and runnable as-is**; assume the team runs `npm run build` and `npx vercel --prod` and verifies.
- Deliver: the new file(s), the exact `App.svelte` diff, the exact `sw.js` diff, and the `package.json` build-line change — as copy-pasteable blocks, each clearly labelled with its path.
- State any assumptions and a short **verification checklist** the team should run (e.g. "curl a built page, confirm `<h1>` + meta present with JS disabled; confirm sitemap lists all URLs; confirm SW returns the static page, not the app shell, for `/physics/<slug>`").

When you return the code, the Qubix dev environment integrates it, runs the build, verifies, and deploys.
