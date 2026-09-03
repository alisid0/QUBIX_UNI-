# Handover · 3 September 2026 · sign-in, access gates, design fixes

Everything below is committed, pushed and deployed. `main` is `fcd5833` and
production was built from it.

Start with `docs/AUTH.md`. This file is the state of play and the open items;
that one is the architecture.

## The repository you want

`QUBIX_UNI-`, branch `main`. Not the `strata` repository: it has been dormant
since 2026-08-10 and describes an older product.

## What a new machine needs

Everything travels through Git except one file. `.env.local` is gitignored, and
`vercel env pull` returns `[SENSITIVE]` for the Supabase pair because they were
stored as sensitive variables, so pulling gives you placeholders rather than
values. Recreate it by hand:

```text
VITE_SUPABASE_URL=https://ywrelsjowrfukofsxdbv.supabase.co
VITE_SUPABASE_ANON_KEY=<the anon public key from Project Settings → API>
```

The anon key is public by design. It ships in the browser bundle and row-level
security, not secrecy, is what protects learner data. The `service_role` key is
the one that must never leave the dashboard, and `check-auth.mjs` fails the
build if it ever appears in a browser component.

`.mcp.json` is committed, so the Supabase MCP server travels with the
repository. It still needs authorising once per machine with `/mcp`, and it only
loads when the agent starts in this directory.

## What was built

**Sign-in.** A page at `/signin` carrying both routes: email with a password,
and Google. Four states in one panel, including the password recovery a reset
link lands on. The navigation holds a link, never a second copy of the form.

Before this, sign-in existed and no learner could reach it. `AuthButton` was
complete and its only mount was `Home.svelte`, which stopped being the front
door when the learning floor took over `/` on 2026-09-01.

**Access gates.** Three items free, then an account. Missions and reading
sessions each count as one item; hubs and the floor map stay open. The browser
wall is a registration wall and not a security boundary: the site is a static
bundle, so every mission ships to the browser whether displayed or not.

The tutor gate is the real one. `api/tutor.js` had no identity check at all, so
anyone who found the endpoint could spend the OpenAI budget. It now verifies the
caller's Supabase session before reaching the model, and the free scope gate
still runs first so an off-topic question from nobody costs nothing.

**Marketing consent.** `marketing_consent` implements what
`PRODUCT-AND-LAUNCH-PLAN.md` already specified. It is switched off:
`PRIVACY_POLICY_VERSION` in `src/lib/legal.js` is `null` and the build fails if
that is set without a policy actually being published.

**Design.** The floor went from 67 clickable elements to 18. Contrast failures
fixed in the global palette, the ink palette and one component-scoped override.
Three missions and the SQL console gained a way home.

## Guards

46 checks run on every build. Four are new:

| Script | Asserts |
|---|---|
| `check-auth.mjs` | sign-in is reachable and recoverable; consent stays optional, adult-only and withdrawable; no service-role key in a browser component |
| `check-contrast.mjs` | every text token clears 4.5:1 on every ground it can sit on, including component-scoped overrides and the ink palette |
| `check-navigation.mjs` | every learner-facing view reaches home in one click, and none links into an authoring route |
| `check-ai-tutors.mjs` | extended: an in-scope question with no session is refused before any model call |

Run one with `npm run check:auth`, `check:contrast`, `check:navigation`.

Two of these test behaviour rather than matching source. `check-auth` stubs
`localStorage` and drives the real access module, including the case that
matters most: blocked storage fails open, so a private window reads a lesson
rather than meeting a wall that signing in would not remove either.

## Open items

**1 · Migration 0004 has not been run.** `supabase/qubix/0004_marketing_consent.sql`
is written and committed and was never applied. Sign-in works without it and the
consent feature is off, so nothing is broken. Run it in the SQL editor before
turning promotional email on.

**2 · `/privacy` returns 404.** This blocks the whole email-list plan. Consent
must be informed, so the opt-in does not render until a policy is published and
`PRIVACY_POLICY_VERSION` is set. The policy pages exist only inside
`current-app/`, the nested old Strata app, and are not deployed.

**3 · Google sign-in is not enabled.** Supabase reports `"google": false`.
Email and password work completely without it. Enabling it is dashboard-only and
needs no redeploy; the OAuth client's redirect URI must be
`https://ywrelsjowrfukofsxdbv.supabase.co/auth/v1/callback`, which is Supabase's
callback and not a Qubix address.

**4 · `QUBIX_BUILDER_KEY` is not set in Vercel**, so `/builder` is reachable and
returns 503 on every request.

**5 · Four DSA previews carry a back control labelled "← Authoring"** pointing
at a dev-only route, on live learner URLs. The fix is two words of markup. It
was written and reverted because those files are digest-locked in
`curriculum/APPROVED-DSA.json` and `check-dsa-preview.mjs` correctly refused the
change. **Only the founder can approve an amendment to an approved sample.** It
is recorded in `check-navigation.mjs` as a known defect, deliberately not as an
exemption.

**6 · Line endings churn on every build.** `public/sitemap.xml` and
`docs/ROUTE-INVENTORY.md` are regenerated with LF, Git sees CRLF, and the tree
goes dirty with no content change. This blocked `npm run deploy` twice, since it
refuses an unclean tree. `git checkout -- public/sitemap.xml` clears it. A
`.gitattributes` would settle it permanently.

## Things worth knowing before changing them

- The type scale floor is 11px, set by `check-type.mjs`. 755 declarations sit at
  12px or below against 75 at 16px or above. The reading itself is 16px at 1.55
  with measures capped at 46 and 56 characters and is genuinely good; the
  apparatus around it is what runs small. Deciding whether 11px is a floor you
  want or one you inherited is an open design question, not a defect.
- `--qx-text-faint` and `--qx-text-dim` are now the same value in the light
  theme. That is the finding, not a shortcut: once 4.5:1 is the floor, paper
  this light has no room for a fifth grey step. The scale has four.
- `check-motion.mjs` covers five named figure components, not all views. Eight
  views animate without honouring reduced motion, which the master plan's
  quality rules require. Unfixed, and the cheapest remaining win.
