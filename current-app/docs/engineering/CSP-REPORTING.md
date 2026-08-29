# CSP violation reporting — design and recommendation

Last updated: 2026-07-22
Status: **proposed, not deployed.** No reporting directive is in `vercel.json`
yet — deliberately, so the policy does not point at an endpoint that does not
exist.

Closes the gap in F-02: the CSP ships as `Content-Security-Policy-Report-Only`,
but with no reporting directive it collects nothing centrally. Today a violation
appears only in the individual browser's dev console, which no real user's
browser reports back. Without an endpoint, the report-only phase produces
almost no signal, and enforcing the policy blind would risk breaking the app.

---

## What a CSP report contains, and why that matters

A violation report is JSON the browser POSTs when the page tries something the
policy forbids. A representative body:

```json
{
  "csp-report": {
    "document-uri": "https://qubix.university/reader/physics/forces",
    "referrer": "",
    "violated-directive": "script-src",
    "blocked-uri": "https://evil.example/x.js",
    "line-number": 42,
    "source-file": "https://qubix.university/assets/index-abc.js"
  }
}
```

This is **not anonymous telemetry.** `document-uri` and `referrer` reveal which
page a user was on — which board, which topic — and the request carries their
IP. Under UK GDPR that is personal data. Two consequences drive the design:

1. The collector should retain as little as possible and not persist raw IPs
   beyond what is needed to rate-limit abuse.
2. Keeping reports inside infrastructure you already control (Vercel + Supabase)
   is preferable to shipping users' browsing paths to a third-party SaaS.

CSP endpoints are also a known spam target — any browser on the internet can
POST to them, and extensions inject violations constantly. The collector must
assume hostile, high-volume input.

---

## Options

### Option A — Vercel serverless function (recommended)

A function at `/api/csp-report` on the same origin. No CORS, no new vendor, no
key management. It validates the payload, drops noise, logs a bounded summary to
Vercel's log stream, and returns 204.

- **Cost:** within the existing Vercel plan. CSP POSTs are small and the
  function does almost nothing.
- **Data residency:** stays in your Vercel account.
- **Retention:** whatever Vercel log retention already is (days, not forever) —
  which for a *diagnostic* phase is exactly right. You want to watch reports for
  a week or two while tuning the policy, not build a permanent archive.
- **Effort:** one file, ~40 lines. Drafted below and committed as
  `api/csp-report.js` on this branch, inert until `vercel.json` references it.

This is the recommendation. It is the least infrastructure, keeps personal data
in your own control, and matches the fact that reporting is a temporary tuning
aid, not a product feature.

### Option B — Supabase Edge Function

Mirror `delete-account`: a Deno function that receives reports and inserts a
trimmed row into a `csp_reports` table.

- **Cost:** within the existing Supabase plan.
- **Data residency:** your Supabase project (London).
- **Pro:** queryable history; you can `select ... group by violated-directive`.
- **Con:** more moving parts — a table, RLS, a retention job, and a schema
  migration — for data you will look at for two weeks and then stop needing. It
  also puts a public, unauthenticated write endpoint next to your user data,
  which is the exact shape of F-04. Defensible, but more surface than the
  problem warrants.

Choose this only if you want durable, queryable CSP history beyond the initial
tuning window.

### Option C — Free-tier hosted collector

Services such as report-uri.com or a Sentry free tier ingest CSP reports with a
dashboard and grouping, at no cost within their free limits.

- **Pro:** zero code, good aggregation UI.
- **Con:** sends users' `document-uri` and IPs to a third party, which means a
  data-processing relationship to document in the privacy policy and, for a UK
  education product, a data-transfer question. Not worth it to avoid ~40 lines
  of code.

Not recommended, purely on the privacy trade-off. The user's browsing path is
the payload; keep it in-house.

---

## Exact header changes (apply only once the endpoint exists)

Two mechanisms, because browser support is split. Modern browsers use the
`Reporting-Endpoints` header plus the `report-to` CSP directive; older ones use
the deprecated `report-uri` directive. Ship both.

In `vercel.json`, the `/(.*)` header block gains one header and the CSP value
gains two directives:

```json
{ "key": "Reporting-Endpoints", "value": "csp-endpoint=\"/api/csp-report\"" }
```

and append to the existing `Content-Security-Policy-Report-Only` value:

```
; report-uri /api/csp-report; report-to csp-endpoint
```

`report-uri` is deprecated but still honoured and covers Safari and older
Chrome/Firefox; `report-to` is the standard. Same-origin `/api/csp-report`
means no CORS and no cross-site data flow.

**Do not make this edit until `/api/csp-report` is deployed and returns 204.**
A `report-to` pointing at a missing endpoint is harmless but silent — you would
believe you were collecting when you were not.

---

## Recommended collector (Option A)

Drafted as `api/csp-report.js` on this branch. It is inert — nothing references
it and `vercel.json` is unchanged — so committing it deploys a dormant endpoint
that simply 204s. Behaviour:

- Accepts only POST; everything else gets 405.
- Caps body size to reject oversized spam.
- Parses defensively; malformed JSON gets 204 (never error, never retry-storm).
- Ignores the common extension/browser noise directives (`blocked-uri` of
  `chrome-extension:`, `moz-extension:`, `about`, `data`) that flood every CSP
  endpoint.
- Logs a **trimmed** summary — violated directive, blocked URI, and the path of
  document-uri, not the full URL with query — so the log stream does not itself
  become a personal-data store.
- Never persists IPs.
- Always returns 204 quickly.

---

## Rollout sequence

1. Commit `api/csp-report.js` (dormant).
2. Deploy. Confirm `POST /api/csp-report` returns 204 and a synthetic report
   shows a trimmed line in Vercel logs.
3. **Then** edit `vercel.json`: add `Reporting-Endpoints` and the two CSP
   directives. Deploy.
4. Watch for one to two weeks across a full session surface — sign-in, reader, a
   workshop, a quiz, audio, a Three.js scene, a GeoGebra board — on desktop and
   Android.
5. Resolve every legitimate violation by widening the policy (or fixing the
   code), until only genuine noise remains.
6. Flip `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in a
   separate commit. F-02 becomes active protection at this point.
7. Optionally remove the reporting directives later, or keep them under the
   enforcing policy to catch regressions.

Until step 6, the F-01 sanitiser is the only active XSS defence. That is
acceptable for a closed beta but should not be the state at a wide public
launch.

---

## Privacy policy note

If Option A or B is used, no third-party processor is added, so the privacy
policy needs no new sub-processor entry. It is still worth one line under data
collection acknowledging that "we log technical security-policy violation
reports from browsers to detect attacks and misconfiguration, retained briefly
and not used to identify you." If Option C is ever chosen, the third party must
be named as a processor and the transfer basis documented.
