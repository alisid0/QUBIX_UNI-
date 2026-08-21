# Supabase User Data Rollout

This is the launch rollout for secure user accounts, progress, Ws, streaks, and workshop history.

## Principle

Do not store user email in public app tables.

Supabase Auth stores email/Gmail identity in `auth.users`. The app should use the authenticated user's internal UUID (`auth.uid()`) as the owner key for all learning data.

Public app tables should store:
- internal user id
- internal username
- age band, not exact age
- learning goal
- preferred daily minutes
- selected launch topics
- progress data
- Ws/reward events
- workshop attempts
- quiz attempts
- daily activity/streak data
- engagement session duration
- user-submitted issue reports

Public app tables should not store:
- email address
- Gmail account address
- phone number
- OAuth provider tokens
- raw identity payloads
- private auth metadata

## Migration

Apply:

`supabase/migrations/0004_secure_user_data.sql`

What it creates:
- `public.user_profiles`
- `public.user_board_progress`
- `public.user_path_progress`
- `public.user_quiz_attempts`
- `public.user_workshop_attempts`
- `public.user_w_events`
- `public.user_daily_activity`
- `public.user_engagement_sessions`
- `public.issue_reports`
- private `issue-screenshots` storage bucket
- `public.delete_my_user_data()`

Every user-data table has Row Level Security enabled. Policies only allow an authenticated user to access rows where:

```sql
auth.uid() = user_id
```

## Current App Wiring

The frontend now keeps local progress as the offline fallback and syncs it to Supabase after authentication is ready.

Implemented sync coverage:
- board opens, deepest floor reached, recall dates, and board-level Ws
- path quiz state, quiz scores, and quiz attempts
- workshop completions, best streak, challenge flag, and workshop metadata
- daily activity for streak and pace tracking
- W events with idempotent refs so repeated syncs do not double-award normal rewards

The app initializes auth first, then initializes progress sync from `src/App.svelte`.

If the Supabase migration is not live yet, the app still works locally through `localStorage`, but signed-in users will not get cloud progress persistence until the tables and policies exist.

## Production Auth Setup

In Supabase Dashboard:
- enable Email sign-in if it is not already enabled
- enable Google provider before public launch
- add production redirect URL: `https://qubix.university`
- add local redirect URL for testing: `http://localhost:5173`
- add the final custom domain when the brand domain is connected

In Vercel:
- confirm `VITE_SUPABASE_URL` is set
- confirm `VITE_SUPABASE_ANON_KEY` is set
- never add the Supabase service role key to frontend or Vercel client env vars

## Rollout Order

1. Apply the migration in Supabase SQL Editor or with the Supabase CLI.
2. In Supabase Dashboard, confirm RLS is enabled on every `user_*` table.
3. Create one test user with email/password.
4. Create one test user with Google sign-in.
5. Confirm both users get a row in `user_profiles`.
6. Confirm user A cannot read user B's rows.
7. Test that board progress, quiz attempts, workshop attempts, Ws, and daily activity sync after sign-in.
8. Keep localStorage as offline/cache fallback.
9. After sync is stable, make authenticated progress the source of truth.
10. Add account deletion/export UI before wide public launch.
11. Test issue reporting with and without a screenshot.

## Verification SQL

Admin check for tables with RLS:

```sql
select
  schemaname,
  tablename,
  rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename like 'user_%'
order by tablename;
```

Policy check:

```sql
select
  schemaname,
  tablename,
  policyname,
  cmd
from pg_policies
where schemaname = 'public'
  and tablename like 'user_%'
order by tablename, policyname;
```

Profile backfill check:

```sql
select count(*) from public.user_profiles;
```

## App Sync Plan

### Phase 1: Upload Local Progress

When a signed-in user opens the app:
- read current local progress from `localStorage`
- upsert board progress into `user_board_progress`
- upsert path progress into `user_path_progress`
- insert quiz attempts into `user_quiz_attempts`
- insert workshop attempts into `user_workshop_attempts`
- insert W events into `user_w_events`
- upsert daily activity into `user_daily_activity`
- insert engagement sessions into `user_engagement_sessions`

Use idempotent refs for Ws so repeated syncs do not double-award.

### Phase 2: Download Remote Progress

After upload:
- fetch the user's remote rows
- merge remote with local
- keep the latest timestamp for board/path state
- keep all attempts
- recompute W total from `user_w_events`
- write the merged state back to localStorage

### Phase 3: Remote Source Of Truth

After enough testing:
- writes go to Supabase first
- localStorage becomes offline cache
- failed writes are queued and retried

## Security Notes

- The anon key is safe to ship in the client only because RLS protects the tables.
- Never use the service role key in frontend code.
- Do not create public read policies for `user_*` tables.
- Do not add email to `user_profiles`.
- Do not expose leaderboard rows from real users until privacy rules are designed.
- Do not pretend simulated league members are real people. Label them as preview/practice league members until real opt-in leaderboards exist.
- Do not auto-upload screenshots. Users must choose a screenshot before it is attached to a report.
- Any future admin dashboard must use server-side service role code, not the public app client.

## Data Deletion

The migration includes:

```sql
select public.delete_my_user_data();
```

This deletes the signed-in user's learning data and resets onboarding metadata, but does not delete the Supabase Auth account itself.

Full account deletion should be done later with a server-side function using the service role key after explicit user confirmation.
