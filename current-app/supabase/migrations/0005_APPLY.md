# Applying 0005_launch_hardening — runbook

Order matters. The migration restricts `issue_reports` inserts to authenticated
users, so applying it to production **before** the matching client deploy will
break the report dialog for guests until the deploy lands.

Correct order: **staging SQL → staging QA → production deploy → production SQL.**

---

## What's in this change

| File | Change |
|---|---|
| `supabase/migrations/0005_launch_hardening.sql` | Schema, RLS, and privacy fixes |
| `supabase/migrations/0006_delete_account_storage_fix.sql` | Repairs databases that received the original 0005 storage-table deletion |
| `supabase/functions/delete-account/index.ts` | Edge Function for full account deletion |
| `src/lib/supabase.js` | Removed 4 dead functions; added `deleteAccount()` / `exportMyData()` |
| `src/lib/stores/issueReports.js` | Guests fail fast; retry queue re-stamps `user_id` |
| `src/lib/components/qubix/IssueReportDialog.svelte` | Handles the sign-in-required case |
| `src/views/Onboarding.svelte` | Removed the `under_13` age band |

---

## 1. Staging

```bash
# Apply the migration in the Qubix Staging SQL editor (project atmmfkhjsdqqwnhqifxm)
# Paste supabase/migrations/0005_launch_hardening.sql and run.
```

Then deploy the Edge Function:

```bash
supabase functions deploy delete-account --project-ref atmmfkhjsdqqwnhqifxm
```

Hosted Edge Functions receive `SUPABASE_SERVICE_ROLE_KEY` automatically. Do not
create a custom copy of it. Never put a service-role key in `.env`, a `VITE_*`
variable, or Git.

If a database received the original version of 0005 (the version that directly
deleted from `storage.objects`), apply
`supabase/migrations/0006_delete_account_storage_fix.sql` once. Fresh databases
only need the current 0005.

## 2. Run the verification queries

At the bottom of the migration. All three must come back clean:

- no `public` tables without RLS
- no profiles carrying an email-derived username
- zero `under_13` rows

## 3. Staging QA

- [ ] Sign up a new test account; confirm the username is `learner_xxxxxxxx`, with no email fragment
- [ ] Onboarding shows four age bands, no "Under 13"
- [ ] Submit an issue report while signed in — succeeds
- [ ] Submit while signed out — shows "Sign in to send a report", does not queue
- [ ] Submit 11 reports in an hour — the 11th is rejected by the rate limit
- [ ] Try editing a submitted report's `message` via the API — rejected by the guard trigger
- [ ] Call `export_my_user_data()` — returns all nine sections
- [ ] Delete a test account end to end; confirm the `auth.users` row is gone, not just the data
- [ ] Confirm a second test account's data is untouched by the first account's deletion

## 4. Production

Deploy the client **first**, then apply the SQL:

```bash
pnpm run build:production
pnpm run deploy
# smoke-test the public URL, then:
# apply 0005_launch_hardening.sql in the production SQL editor
supabase functions deploy delete-account --project-ref <production ref>
```

Re-run the verification queries against production.

---

## Rollback

Sections 1–7 are reversible by restoring the previous function bodies and
policies from `0004_secure_user_data.sql`. Section 8 renames rather than drops,
so `progress` and `quiz_results` can be renamed back.

The one-way step is the **username backfill** in section 1b — it overwrites
email-derived usernames and the originals are not retained. That is the intent
(the email fragment is what we're removing), but take a database backup before
applying to production.

---

## Still outstanding after this

This migration closes the database-side launch gates. Not covered:

- Production SMTP / transactional email in Supabase
- Google OAuth configured and verified for both projects
- Final Site URL and redirect allowlists
- ~~`CONTACT_EMAIL_PLACEHOLDER` in `public/privacy.html` and `public/terms.html`~~
  — done, set to `admin@arcavetech.co.uk`
- ~~Privacy policy updated to match: 13+ minimum, what deletion removes, the
  export route, and that usernames are no longer email-derived~~ — done
- ~~An in-app UI for `deleteAccount()` and `exportMyData()`~~ — done in Settings
  → Your data
- Dropping the `_deprecated_0005` tables once confirmed unused in production
