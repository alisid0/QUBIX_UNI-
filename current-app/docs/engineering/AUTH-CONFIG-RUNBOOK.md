# Production SMTP and Google OAuth runbook

Last updated: 2026-07-22
Status: **COMPLETE (2026-07-22).** Production SMTP is configured and email
delivery is confirmed. Google OAuth is configured and sign-in tested end to end.
Obsolete credentials from the setup were revoked. This document is retained as
the record of how it was configured and how to reproduce or re-verify it — the
verification checklists below now read as regression checks, not open work.

Configuration steps for production transactional email and Google sign-in.
Everything here is dashboard and console work; nothing in this file is applied
by code, and **no credential appears in it or belongs in Git**.

Projects:

| Environment | Supabase ref |
|---|---|
| Production | `wmetdmfsniqrshuaoodc` |
| Staging | `atmmfkhjsdqqwnhqifxm` |

Legacy ref `xzesbcrlnbesmvxmgotp` is retired. Do not restore it.

---

## Why this blocks launch

Supabase's built-in email sender is rate-limited and intended for development.
On the default sender, confirmation and password-reset messages are throttled
and frequently land in spam. A user who cannot confirm their address cannot
sign in, and a user who cannot reset a password has no recovery route — with
no support inbox monitoring, that is a permanently locked account.

Google OAuth failing is more visible but less damaging: the button errors and
the user falls back to email. Broken email is silent.

---

## Part 1 — Production SMTP

### Choose a provider

Any provider supporting SMTP works. Practical considerations for a UK
education app sending low volume:

- The sending domain should be `arcavetech.co.uk`, matching the Play Console
  organisation and the published contact address.
- Sending from a domain you control is what makes SPF/DKIM possible. A
  `gmail.com` sender cannot be authenticated for a custom domain and will be
  filtered aggressively.
- Free tiers are typically sufficient at beta volume, but check whether the
  provider requires a paid plan for a custom sending domain.

### DNS — do this first and let it propagate

Add to `arcavetech.co.uk` DNS, using the exact values the provider gives:

| Record | Purpose |
|---|---|
| SPF (TXT) | Authorises the provider to send as your domain |
| DKIM (TXT or CNAME) | Cryptographically signs outbound mail |
| DMARC (TXT) | Tells receivers what to do with unauthenticated mail |

Start DMARC at `p=none` with a reporting address, so you observe rather than
reject while the setup settles. Tighten to `p=quarantine` once reports are
clean for a week or two.

**Do not remove the existing Google Search Console TXT record** while editing
DNS. `docs/LAUNCH-HANDOVER.md` records that it cleared the Play Console
website-verification blocker; deleting it re-opens that gate.

### Supabase configuration

Dashboard → Project `wmetdmfsniqrshuaoodc` → Authentication → Emails → SMTP:

1. Enable custom SMTP.
2. Enter host, port, username and password from the provider.
3. Sender email: a monitored address on `arcavetech.co.uk`.
4. Sender name: `Qubix`.
5. Set a minimum interval between emails to blunt enumeration and abuse.

The SMTP password is a credential. It goes in the Supabase dashboard only —
never in `.env`, never in a `VITE_*` variable, never in this repository.

### Email templates

Default templates say "Supabase". Update confirmation, magic-link, recovery and
email-change templates to say Qubix, and check that every link resolves to the
production site URL rather than `localhost` or the staging domain.

### URL configuration

Authentication → URL Configuration:

- **Site URL:** the canonical production origin. Currently
  `https://qubix.university`; change this when
  `qubix.arcavetech.co.uk` moves to the production Vercel project, or recovery
  links will point at the wrong host.
- **Redirect allowlist:** production origin, plus `http://localhost:8000` for
  local development. Staging origins belong in the *staging* project's
  allowlist, not production's.

Keep the allowlist tight. A permissive wildcard is an open redirect, and the
recovery token travels in that redirect.

### Verify — all of it, on a real device

- [ ] Sign up with a real address; confirmation arrives, not in spam
- [ ] Confirmation link lands on production, not localhost or staging
- [ ] Password reset arrives and completes
- [ ] An expired or already-used recovery link fails gracefully
- [ ] Email change flow delivers to both old and new addresses
- [ ] Message headers show SPF and DKIM passing
- [ ] Repeat on Android, where the link opens in the TWA

---

## Part 2 — Google OAuth

### Google Cloud Console

1. Create or select a project for Qubix.
2. Configure the OAuth consent screen:
   - User type: External
   - App name: Qubix
   - Support email and developer contact: `admin@arcavetech.co.uk`
   - Authorised domain: `arcavetech.co.uk`
   - Links to your published privacy policy and terms — Google checks these
     resolve
   - Scopes: `email` and `profile` only. Requesting more triggers verification
     review and delays launch for data you do not use.
3. Create an OAuth 2.0 Client ID, type **Web application**.
4. Authorised redirect URI — exactly one, from Supabase:

   ```
   https://wmetdmfsniqrshuaoodc.supabase.co/auth/v1/callback
   ```

   Supabase brokers the exchange; your app origin is not the redirect target.
   Staging needs its own client, or its own redirect URI on the same client,
   pointing at `atmmfkhjsdqqwnhqifxm.supabase.co`.

While the consent screen is in Testing, only listed test users can sign in.
Publishing to Production is required before a public beta. With `email` and
`profile` scopes only, verification is normally not required — confirm this in
the console before assuming it.

### Supabase configuration

Authentication → Providers → Google: enable, paste the client ID and client
secret from the console. **The client secret is a credential** — dashboard
only.

### Android considerations

The TWA opens Google sign-in in a Custom Tab. Test on a real device:

- Sign-in completes and returns to the app, not a dead browser tab
- The session persists after the app is backgrounded and reopened
- Android back navigation during the flow does not strand the user

### Verify

- [ ] Google sign-in works on desktop web
- [ ] Google sign-in works on Android
- [ ] A Google account whose email matches an existing password account behaves
      as intended — decide explicitly whether these link or stay separate
- [ ] Sign-out clears the session fully
- [ ] `user_profiles` row is created by the trigger, with a username **not**
      derived from the email local-part (F-03 regression)

---

## Credential handling

| Credential | Correct location | Never |
|---|---|---|
| SMTP password | Supabase dashboard | Git, `.env`, `VITE_*` |
| Google client secret | Supabase dashboard | Git, `.env`, `VITE_*` |
| Supabase service-role key | Supabase secrets / shell for one command | Git, `.env`, `VITE_*`, client code |
| Supabase anon key | `.env.production` (already there, public by design) | — |

`VITE_*` variables are compiled into the browser bundle and readable by anyone.
Anything secret placed there is published.

If a credential is ever committed, rotating it is the fix. Removing the commit
is not — it remains in history and in every clone.

---

## Open questions for Ali

1. Which SMTP provider? Affects the DNS records added.
2. Which mailbox receives `admin@arcavetech.co.uk`, and is it monitored? It is
   the published route for data-deletion requests, so it carries a legal
   obligation.
3. Should a Google sign-in be linkable to an existing email/password account
   with the same address, or stay separate? Silent linking is convenient and a
   known account-takeover pattern if the provider's email is unverified.
4. Confirm the final production origin before setting Site URL — changing it
   later invalidates in-flight recovery links.
