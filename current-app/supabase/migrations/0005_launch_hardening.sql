-- 0005_launch_hardening.sql
-- Pre-launch security, privacy, and cleanup pass for Qubix.
--
-- Fixes seven issues found auditing schema.sql + 0002..0004 against the
-- launch requirements in docs/LAUNCH-HANDOVER.md:
--
--   1. delete_my_user_data() missed issue_reports, screenshot objects, and the
--      user_profiles row itself.
--   2. internal_username was derived from the email local-part, contradicting
--      0004's "no public table stores email addresses" and surviving deletion.
--   3. issue_reports accepted anonymous inserts from the public anon key —
--      an unauthenticated, unlimited write endpoint.
--   4. under_13 was an accepted age_band with no parental-consent mechanism.
--   5. Legacy public.progress is superseded by 0004's user_* tables and its
--      state constraint no longer matches PATHS.md.
--   6. issue_reports_own_update allowed editing every column, contradicting
--      its own comment.
--   7. No rate limiting on issue report submission.
--
-- Idempotent: safe to run more than once. Apply to STAGING FIRST.
-- Requires deploying the account-deletion Edge Function (see
-- supabase/functions/delete-account/) before advertising account deletion.

begin;

-- ---------------------------------------------------------------------------
-- 1. Stop deriving usernames from email addresses
-- ---------------------------------------------------------------------------
-- The previous version used split_part(new.email, '@', 1), so
-- "someone@example.com" became "someone_a1b2c3d4" and persisted after data
-- deletion. An explicit display_name is still honoured because the user chose
-- to provide it; the email is never read.

create or replace function public.create_private_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_name text;
  generated_username text;
begin
  base_name := lower(
    regexp_replace(
      coalesce(nullif(new.raw_user_meta_data->>'display_name', ''), 'learner'),
      '[^a-z0-9_]+',
      '_',
      'g'
    )
  );

  base_name := trim(both '_' from base_name);
  if length(base_name) < 3 then
    base_name := 'learner';
  end if;

  generated_username := left(base_name, 31) || '_' || left(replace(new.id::text, '-', ''), 8);

  insert into public.user_profiles (user_id, internal_username)
  values (new.id, generated_username)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

commit;

-- ---------------------------------------------------------------------------
-- 1b. Username backfill
-- ---------------------------------------------------------------------------
-- Separate transaction so the trigger replacement above lands even if the
-- backfill needs review. Rewrites every username that still encodes an email
-- local-part, matched by comparing against the actual auth.users email.

begin;

update public.user_profiles p
set internal_username = 'learner_' || left(replace(p.user_id::text, '-', ''), 8)
from auth.users u
where u.id = p.user_id
  and u.email is not null
  and p.internal_username like (
    lower(regexp_replace(split_part(u.email, '@', 1), '[^a-z0-9_]+', '_', 'g')) || '%'
  );

commit;

-- ---------------------------------------------------------------------------
-- 2. Minimum age 13 — remove the under_13 band
-- ---------------------------------------------------------------------------
-- Qubix is declared as not targeted at children under 13. Existing under_13
-- rows are reset to null rather than deleted so the account survives; the app
-- re-asks on next onboarding.

begin;

update public.user_profiles
set age_band = null
where age_band = 'under_13';

-- 0004 declared this constraint inline and unnamed, so its name is whatever
-- Postgres auto-generated. Resolve and drop every check constraint on age_band
-- rather than guessing the name — a missed drop would leave the old constraint
-- active alongside the new one.
do $$
declare
  con record;
begin
  for con in
    select c.conname
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'user_profiles'
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) ilike '%age_band%'
  loop
    execute format('alter table public.user_profiles drop constraint %I', con.conname);
  end loop;
end
$$;

alter table public.user_profiles
  add constraint user_profiles_age_band_check
  check (age_band is null or age_band in ('13_15','16_17','18_plus','prefer_not'));

commit;

-- ---------------------------------------------------------------------------
-- 3. issue_reports — signed-in only, no anonymous writes
-- ---------------------------------------------------------------------------

begin;

drop policy if exists "issue_reports_own_insert" on public.issue_reports;

create policy "issue_reports_own_insert"
  on public.issue_reports for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 4. issue_reports — enforce what the update policy claims
-- ---------------------------------------------------------------------------
-- The old policy said "users can close their own issue, but cannot edit
-- status/details after submit" while permitting every column to change. A
-- trigger enforces immutability; the policy stays row-scoped.

create or replace function public.guard_issue_report_update()
returns trigger
language plpgsql
as $$
begin
  -- service_role bypasses RLS and this guard is only for end users.
  if auth.uid() is null then
    return new;
  end if;

  -- Account deletion anonymises reports by nulling user_id and the identifying
  -- columns. RLS blocks that transition for a normal client, so it can only
  -- arrive here from the security-definer delete_my_user_data(). Allow it.
  if old.user_id is not null and new.user_id is null then
    return new;
  end if;

  if new.message is distinct from old.message
     or new.category is distinct from old.category
     or new.route is distinct from old.route
     or new.bbid is distinct from old.bbid
     or new.workshop_id is distinct from old.workshop_id
     or new.screenshot_path is distinct from old.screenshot_path
     or new.app_version is distinct from old.app_version
     or new.user_agent is distinct from old.user_agent
     or new.metadata is distinct from old.metadata
  then
    raise exception 'Issue report details cannot be edited after submission';
  end if;

  -- Users may only close their own report, not reopen or triage it.
  if new.status is distinct from old.status and new.status <> 'closed' then
    raise exception 'Issue report status can only be set to closed';
  end if;

  return new;
end;
$$;

drop trigger if exists issue_reports_guard_update on public.issue_reports;
create trigger issue_reports_guard_update
  before update on public.issue_reports
  for each row execute function public.guard_issue_report_update();

-- ---------------------------------------------------------------------------
-- 5. issue_reports — rate limit
-- ---------------------------------------------------------------------------
-- Caps a signed-in user at 10 reports per rolling hour. Cheap because
-- issue_reports_user_created_idx already covers (user_id, created_at desc).

create or replace function public.guard_issue_report_rate()
returns trigger
language plpgsql
as $$
declare
  recent_count integer;
begin
  if auth.uid() is null then
    return new;
  end if;

  select count(*) into recent_count
  from public.issue_reports
  where user_id = auth.uid()
    and created_at > now() - interval '1 hour';

  if recent_count >= 10 then
    raise exception 'Too many issue reports submitted. Try again later.';
  end if;

  return new;
end;
$$;

drop trigger if exists issue_reports_guard_rate on public.issue_reports;
create trigger issue_reports_guard_rate
  before insert on public.issue_reports
  for each row execute function public.guard_issue_report_rate();

commit;

-- ---------------------------------------------------------------------------
-- 6. User data deletion — erase personal data, retain what is legitimately
--    retainable
-- ---------------------------------------------------------------------------
-- UK GDPR Article 17 requires erasure of personal data, not destruction of
-- everything a user ever touched. Two categories are treated differently:
--
--   ERASED — learning progress, attempts, rewards, activity, sessions, the
--   profile row, uploaded screenshots, and (via the Edge Function) the auth
--   identity. All of it is personal data with no retention justification.
--
--   ANONYMISED — issue reports. The bug itself is operational data we have a
--   legitimate interest in keeping: a report may be mid-investigation, and
--   destroying it means losing the defect, not just the reporter. So the row
--   survives with every identifying element stripped — user_id, user_agent,
--   viewport and screenshot are cleared, leaving category, message, route and
--   bbid. Once detached from an account and a device fingerprint, that is no
--   longer personal data and Article 17 does not reach it.
--
-- The free-text message is the one risk: a user may have typed personal
-- information into it. It is preserved because a report stripped of its
-- description is useless, and the privacy policy tells users not to put
-- personal information in reports. If you would rather not carry that risk,
-- change the update below to also null out `message`.
--
-- Still cannot remove the auth.users identity — that requires the service-role
-- Edge Function, which calls this first.

begin;

-- security definer: the anonymisation step sets issue_reports.user_id to null,
-- which the row's own RLS WITH CHECK (auth.uid() = user_id) forbids. Every
-- statement below is explicitly scoped to `uid`, which is read from the JWT, so
-- a caller can still only ever affect their own rows.
create or replace function public.delete_my_user_data()
returns void
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'delete_my_user_data() requires an authenticated session';
  end if;

  -- Erase: personal learning data, no retention basis.
  delete from public.user_w_events            where user_id = uid;
  delete from public.user_workshop_attempts   where user_id = uid;
  delete from public.user_quiz_attempts       where user_id = uid;
  delete from public.user_daily_activity      where user_id = uid;
  delete from public.user_engagement_sessions where user_id = uid;
  delete from public.user_path_progress       where user_id = uid;
  delete from public.user_board_progress      where user_id = uid;

  -- Uploaded screenshots are erased by the delete-account Edge Function via
  -- the Storage API. Supabase rejects direct deletes from storage.objects.

  -- Anonymise: keep the defect, drop the reporter.
  update public.issue_reports
  set user_id         = null,
      user_agent      = null,
      screenshot_path = null,
      viewport        = '{}'::jsonb,
      metadata        = '{}'::jsonb
  where user_id = uid;

  -- Erase: the profile row itself.
  delete from public.user_profiles where user_id = uid;
end;
$$;

grant execute on function public.delete_my_user_data() to authenticated;

-- The delete path needs a DELETE policy on user_profiles, which 0004 omitted.
drop policy if exists "user_profiles_own_delete" on public.user_profiles;
create policy "user_profiles_own_delete"
  on public.user_profiles for delete
  using (auth.uid() = user_id);

-- issue_reports had no DELETE policy either.
drop policy if exists "issue_reports_own_delete" on public.issue_reports;
create policy "issue_reports_own_delete"
  on public.issue_reports for delete
  using (auth.uid() = user_id);

commit;

-- ---------------------------------------------------------------------------
-- 7. Data export for UK GDPR data requests
-- ---------------------------------------------------------------------------
-- Returns everything Qubix holds about the caller as a single JSON document.
-- Satisfies the "user data export or documented data-request route" gate.

begin;

create or replace function public.export_my_user_data()
returns jsonb
language plpgsql
security invoker
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'export_my_user_data() requires an authenticated session';
  end if;

  return jsonb_build_object(
    'exported_at', now(),
    'profile', (
      select to_jsonb(p) from public.user_profiles p where p.user_id = uid
    ),
    'board_progress', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_board_progress t where t.user_id = uid
    ), '[]'::jsonb),
    'path_progress', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_path_progress t where t.user_id = uid
    ), '[]'::jsonb),
    'quiz_attempts', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_quiz_attempts t where t.user_id = uid
    ), '[]'::jsonb),
    'workshop_attempts', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_workshop_attempts t where t.user_id = uid
    ), '[]'::jsonb),
    'w_events', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_w_events t where t.user_id = uid
    ), '[]'::jsonb),
    'daily_activity', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_daily_activity t where t.user_id = uid
    ), '[]'::jsonb),
    'engagement_sessions', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.user_engagement_sessions t where t.user_id = uid
    ), '[]'::jsonb),
    'issue_reports', coalesce((
      select jsonb_agg(to_jsonb(t)) from public.issue_reports t where t.user_id = uid
    ), '[]'::jsonb)
  );
end;
$$;

grant execute on function public.export_my_user_data() to authenticated;

commit;

-- ---------------------------------------------------------------------------
-- 8. Retire the legacy progress table
-- ---------------------------------------------------------------------------
-- public.progress came from schema.sql and is superseded by 0004's
-- user_board_progress / user_path_progress. Its state check constraint still
-- lists the old names (visited/revisited/deep/deeper) which no longer match the
-- six states in PATHS.md. The only code that touched it — fetchProgress() and
-- recordBoardProgress() in src/lib/supabase.js — has no callers and is removed
-- in the same change as this migration.
--
-- public.quiz_results was referenced by recordQuizResult() but was never
-- defined in any migration, so it likely does not exist. Dropped conditionally.
--
-- RENAMED, NOT DROPPED. Verify both are empty or irrelevant in production, then
-- drop the _deprecated_ tables in a later migration.

begin;

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'progress'
  ) then
    execute 'alter table public.progress rename to progress_deprecated_0005';
  end if;

  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'quiz_results'
  ) then
    execute 'alter table public.quiz_results rename to quiz_results_deprecated_0005';
  end if;
end
$$;

commit;

-- ---------------------------------------------------------------------------
-- 8b. Retention policy — what survives deletion, and why
-- ---------------------------------------------------------------------------
-- Recorded here so the policy sits next to the code enforcing it. Keep
-- public/privacy.html in sync with this table.
--
--   Data                        On account deletion   Basis
--   --------------------------  --------------------  --------------------------
--   auth identity (email)       erased                Art. 17
--   user_profiles               erased                Art. 17
--   board / path progress       erased                Art. 17
--   quiz / workshop attempts    erased                Art. 17
--   w_events, daily_activity    erased                Art. 17
--   engagement_sessions         erased                Art. 17
--   issue-screenshots objects   erased                Art. 17
--   issue_reports rows          anonymised, retained  Art. 6(1)(f) — service
--                                                     integrity; no longer
--                                                     personal data once
--                                                     detached
--   Vercel aggregate analytics  retained              already anonymous,
--                                                     Art. 17 does not apply
--   Provider backups            expire on rollover    Art. 17(1) "without
--                                                     undue delay" — document
--                                                     the cycle, do not
--                                                     surgically edit backups
--
-- Deliberately NOT implemented, and worth a decision before wide launch:
--
--   * Soft-delete grace period. A 30-day window would let users recover an
--     accidental deletion and would deter ban evasion by immediate re-signup.
--     It also means holding personal data after a deletion request, which is
--     defensible under Art. 17(1) "without undue delay" but must be disclosed
--     in the privacy policy. Current behaviour is immediate and irreversible.
--
--   * Deletion audit log. Retaining a record that an account was deleted (and
--     when) helps demonstrate compliance. It must not store anything that
--     re-identifies the person — a bare timestamp is safe, a user id hash is
--     arguably still personal data.
--
--   * Legal hold. If an account is subject to a dispute or investigation,
--     deletion should be blocked rather than silently completed. Not needed
--     pre-launch; needed once there is money or moderation involved.

-- ---------------------------------------------------------------------------
-- 9. Verification
-- ---------------------------------------------------------------------------
-- Run these after applying. Every row returned by the first two queries is a
-- problem.

-- Tables in public without RLS enabled:
--   select tablename from pg_tables t
--   where schemaname = 'public'
--     and not exists (
--       select 1 from pg_class c
--       join pg_namespace n on n.oid = c.relnamespace
--       where n.nspname = 'public' and c.relname = t.tablename and c.relrowsecurity
--     );
--
-- Profiles still carrying an email-derived username:
--   select p.user_id from public.user_profiles p
--   join auth.users u on u.id = p.user_id
--   where u.email is not null
--     and p.internal_username like (
--       lower(regexp_replace(split_part(u.email, '@', 1), '[^a-z0-9_]+', '_', 'g')) || '%'
--     );
--
-- Remaining under_13 rows (expect 0):
--   select count(*) from public.user_profiles where age_band = 'under_13';
