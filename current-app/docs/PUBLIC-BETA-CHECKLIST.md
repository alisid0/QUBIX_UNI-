# Qubix public-beta checklist — the authoritative list

Last reconciled: 2026-07-29

The single source of truth for what is done and what remains before a public
beta. Where `LAUNCH-HANDOVER.md` or other docs conflict with this, this wins.
Status is stated honestly: **DONE** means verified, not merely written.

Legend: ✅ done and verified · 🟡 done in code, not yet live/verified ·
⬜ not started · ⏳ external dependency

---

## 1. Production backend

| Status | Item | Evidence |
|---|---|---|
| ✅ | Clean production Supabase (`wmetdmfsniqrshuaoodc`, London), no legacy user data | Cutover `7678004`; RSP-006 |
| ✅ | Reviewed schema + RLS on every user table | migrations 0004–0007 |
| ✅ | Explicit API grants; default PUBLIC execute revoked on sensitive RPCs | `0007_explicit_api_grants.sql` |
| ✅ | Account deletion removes data, screenshots, and the auth identity | `delete-account` fn + `0006`; verified through the app |
| ✅ | Data export returns all user rows as JSON | `export_my_user_data()`; verified through the app |
| ✅ | 1,145 public catalogue cards migrated; no private data | RSP-006 |
| ⬜ | `qubix-staging` Vercel project confirmed to follow `origin/staging`, not `main` | pending |

## 2. Authentication

| Status | Item | Evidence |
|---|---|---|
| ✅ | Email/password sign-up, login, recovery | shipped |
| ✅ | Production SMTP configured, delivery confirmed | Ali 2026-07-22 |
| ✅ | Google OAuth configured, sign-in tested end to end | Ali 2026-07-22 |
| ✅ | Obsolete credentials revoked | Ali 2026-07-22 |
| ✅ | Site URL + redirect allowlist set (currently `qubix.university`) | production auth config |
| ⬜ | Re-point Site URL when the custom domain moves to production | blocked on §6 |
| ⬜ | Decide Google↔password account-linking policy for same email | open question, `AUTH-CONFIG-RUNBOOK.md` |

## 3. Security findings (from the 2026-07-21 audit)

| Status | Item | Evidence |
|---|---|---|
| ✅ | F-03 username no longer email-derived | `0005` |
| ✅ | F-04 issue_reports authenticated-only insert | `0005` |
| ✅ | F-05 screenshots removed on deletion | `0006` + Edge fn |
| ✅ | F-06 report anonymisation clears the full fingerprint | `0005` |
| ✅ | F-07 report details immutable after submit | `0005` |
| ✅ | F-08 under-13 age band removed | `0005` + Onboarding |
| ✅ | F-09 legacy tables retired | `0005` |
| ✅ | F-01 HTML sanitiser at all DB render sites | on `main`; sanitiser suite passes; tracked bundle live 2026-07-29 |
| ✅ | F-02 security headers (CSP report-only, HSTS, frame-deny, nosniff) | verified on stable production URL 2026-07-29 |
| ✅ | F-10 immutable asset caching | verified on the live hashed application asset 2026-07-29 |
| ⬜ | CSP reporting endpoint stood up | `api/csp-report.js` drafted dormant; `CSP-REPORTING.md` |
| ⬜ | CSP flipped report-only → enforcing after observation | after endpoint + 1–2 wk watch |

## 4. Tests

| Status | Item | Evidence |
|---|---|---|
| ✅ | Sanitiser unit/adversarial suite (47 cases) | `test-sanitize-html.mjs`, run green |
| 🟡 | RLS isolation test (7 tables) on the release line | fail-closed staging guard hardened; not yet executed against staging |
| 🟡 | User-data lifecycle test (F-03–F-07, storage) | on `main`; guards verified, not yet run against staging by me |
| ⬜ | Both DB tests executed green against staging | needs `SUPABASE_SERVICE_ROLE_KEY` in-shell |
| ✅ | RLS isolation test guard hardened | explicit `--staging`, production rejection, exact staging-host match, guarded dynamic import |

## 5. Legal & trust

| Status | Item | Evidence |
|---|---|---|
| ✅ | Contact address on privacy + terms (`admin@arcavetech.co.uk`) | shipped |
| ✅ | Privacy policy matches actual processing, 13+, deletion, export | shipped |
| ✅ | Arcave Technologies named as operating entity/controller | shipped |
| ⬜ | `admin@arcavetech.co.uk` confirmed monitored (carries the deletion-request obligation) | operational |
| ⬜ | Independent legal review of GDPR/children's-privacy/AI wording before *wide/paid* launch | not required for closed beta |

## 6. Production infrastructure

| Status | Item | Evidence |
|---|---|---|
| ✅ | Production deployed and live | `qubix.university`, RSP-006 |
| ⬜ | Dedicated production Vercel project finalised | pending |
| ⬜ | `qubix.arcavetech.co.uk` moved from staging → production | pending; keep Search Console TXT record |
| ⬜ | Production error monitoring + documented rollback | pending |

## 7. Android (Play)

| Status | Item | Evidence |
|---|---|---|
| ⏳ | Companies House certificate → Play identity verification | ordered; long-lead external blocker |
| ⬜ | Play org/identity + phone verification cleared | blocked on the certificate |
| ⬜ | TWA wrapper, app ID `uk.co.arcavetech.qubix`, `assetlinks.json` | not started |
| ⬜ | Signed `.aab`, Play internal testing, pre-launch report | not started |

## 8. Content / curriculum (out of this workstream)

| Status | Item |
|---|---|
| ⬜ | KaTeX decision — needed only if launch curriculum uses fractions/roots/matrices |
| — | BB text, floors, illustrations — owned separately; not a platform gate |

---

## The critical path to a closed beta

Most items above are parallel. The chain that actually gates a closed beta:

1. ~~**Merge and deploy F-01/F-02/F-10.**~~ Complete and verified on the stable
   production URL on 2026-07-29.
2. **Stand up the CSP reporting endpoint, observe, then enforce.** Until the
   flip, the sanitiser is the only active XSS defence — acceptable for a closed
   beta, not for a wide launch.
3. **Execute both DB security tests against staging**, green. Harden the RLS
   test's guard first (Risks).
4. **Companies House → Play verification.** The long pole; everything Android is
   behind it. Already in motion.
5. **TWA + signed `.aab` → Play internal testing → closed beta.**

Production domain move (§6) and the OAuth account-linking decision (§2) should
be settled before *wide* launch but do not block a closed beta on the current
`qubix.university` origin.

## Open risks carried into beta

- **CSP is report-only.** F-02 is latent, not active, until the enforce flip.
- **Neither DB test has been executed against staging in this workstream** — I
  have no `SUPABASE_SERVICE_ROLE_KEY`. Guards and syntax are verified; live runs
  are not.
- **`admin@arcavetech.co.uk` monitoring** is an operational obligation, not a
  code one — it is the published route for GDPR deletion requests.
