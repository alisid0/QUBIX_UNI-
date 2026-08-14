# Qubix security hardening — 2026-07-30

Author: Claude (Claude Code)
Follows: `docs/engineering/2026-07-21-security-audit.md`

A fresh audit re-ran the July-21 checks against current `main` and confirmed
its high/medium findings are resolved in code (F-01 sanitiser present and used;
F-02 header set added; F-04/05/06/07/09 handled in migrations 0005-0007; F-10
asset caching corrected). This change closes the gaps that remained.

## Changes

### 1. Content-Security-Policy is now enforced (was report-only)

`vercel.json` shipped the CSP as `Content-Security-Policy-Report-Only` with no
`report-uri`/`report-to`, so it neither blocked anything nor collected reports.
It is now `Content-Security-Policy` (enforcing).

Verified before flipping, so it does not break production:

- Built `index.html` and all nine SEO pages contain no executable inline
  scripts. Every inline `<script>` is `type="application/ld+json"` (data, not
  subject to `script-src`); the app entry is an external hashed module.
- All external references (`fonts.googleapis.com`, `fonts.gstatic.com`,
  Supabase, Vercel Analytics, GeoGebra) are covered by the directives.
- Svelte's injected `<style>` and dynamic `style=` bindings are covered by
  `style-src 'unsafe-inline'`.

`script-src` keeps `'unsafe-eval'`: `three.module` needs none, but the app and
one bundled vendor chunk use `new Function`/`eval` at runtime, so removing it
would break plotting and that dependency. Everything else is still enforced:
no `'unsafe-inline'` for scripts, `object-src 'none'`, `frame-ancestors 'none'`,
`base-uri 'self'`, `form-action 'self'`, and origin allowlists on
script/connect/img/media/frame. An injected inline `<script>` or `onerror=` is
now blocked, and exfiltration to an off-allowlist origin is blocked.

### 2. Math-expression eval sinks are input-guarded

`ChalkDiagram.svelte` and `CoordinatePlane.svelte` build a function from an
authored string with `new Function('x', 'with(Math){return (' + s + ')}')`.
Both now pass the string through `isSafeMathExpr` (`src/lib/content/safeMathExpr.js`)
first and fail safe (empty path / `() => NaN`) if it is not pure arithmetic.

Because the CSP retains `'unsafe-eval'` for the vendor dependency, this
allowlist is the layer that actually constrains our own eval. The character
allowlist forbids quotes, brackets, semicolons, equals, backticks and angle
brackets, so an injected identifier cannot build a string, index a member, or
run a second statement; a short denylist blocks the identifier-only escapes
(`constructor`, `Function`, DOM globals). It does not affect legitimate curves
(`x*x`, `sin(x)`, the generated `Math.sin(...)` wave bodies all pass).

### 3. Removed `legacy/index-legacy.html`

Held an old **anon** JWT (public by design, not a secret) for the deprecated
Supabase project `xzesbcrlnbesmvxmgotp`. Not in the deployed build, so this is
repo hygiene: it removed a stale reference to a project the team does not
restore.

## Verified sound (unchanged, re-confirmed)

- No service-role/secret key in `dist/` or `src/`; the twelve Node scripts read
  `SUPABASE_SERVICE_ROLE_KEY` from `process.env`; the browser client uses the
  publishable/anon key only.
- Board and quiz `{@html}` paths are neutralised: Reader/Snippets via
  `sanitizeBoardHtml`, Quiz via `formatMathText` (escapes before inserting a
  fixed `<sup>/<sub>/<span class="vec">` set).

## Not addressed here (needs decision / access)

- **Svelte moderate advisory** (`npm audit`): the SSR XSS family. This is a
  client-rendered SPA, so it does not apply; the fix is a breaking Svelte 5
  upgrade. Defer to that migration.
- **DB migration application**: F-04/05/06/07/09 are fixed in migration files;
  confirm 0005-0007 are applied in production and run
  `scripts/test-rls-isolation.mjs` against **staging** (never production).
- **`cdnjs.cloudflare.com` in `script-src`** is broad; narrow to specific files
  with SRI if the CDN usage is known and fixed.
