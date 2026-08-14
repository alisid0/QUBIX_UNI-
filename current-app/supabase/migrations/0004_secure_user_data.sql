-- 0004_secure_user_data.sql
-- Launch user-data schema for Qubix.
--
-- Security model:
-- - Supabase Auth owns email/Gmail identity in auth.users.
-- - Public app tables store only the internal auth user id plus learning data.
-- - No public table stores email addresses.
-- - Row Level Security is enabled on every user-data table.
-- - Policies only allow authenticated users to access rows where user_id = auth.uid().
--
-- Run once in Supabase SQL Editor or through the Supabase CLI.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Private user profile
-- ---------------------------------------------------------------------------
-- This table is not a public social profile. It exists only so the app can keep
-- app-level account metadata without exposing auth.users or storing email.

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  internal_username text not null unique,
  age_band text check (age_band in ('under_13','13_15','16_17','18_plus','prefer_not')),
  learning_goal text check (learning_goal in ('exam','school','career','curiosity','coding','teaching','prefer_not')),
  daily_goal_minutes integer check (daily_goal_minutes in (5, 10, 15, 30)),
  selected_topics jsonb not null default '[]'::jsonb,
  heard_from text,
  learner_type text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_profiles_internal_username_format
    check (internal_username ~ '^[a-z0-9_]{3,40}$')
);

create trigger user_profiles_set_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

alter table public.user_profiles enable row level security;

create policy "user_profiles_own_select"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "user_profiles_own_insert"
  on public.user_profiles for insert
  with check (auth.uid() = user_id);

create policy "user_profiles_own_update"
  on public.user_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Automatically create an internal username for every new auth user. The email
-- local-part is only used to derive a non-email handle, then a user-id suffix is
-- appended to avoid collisions. The email itself is not stored here.
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
      coalesce(
        nullif(new.raw_user_meta_data->>'display_name', ''),
        nullif(split_part(new.email, '@', 1), ''),
        'learner'
      ),
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

drop trigger if exists on_auth_user_created_create_private_profile on auth.users;
create trigger on_auth_user_created_create_private_profile
  after insert on auth.users
  for each row execute function public.create_private_user_profile();

-- Backfill existing users without exposing email in public tables.
insert into public.user_profiles (user_id, internal_username)
select
  u.id,
  'learner_' || left(replace(u.id::text, '-', ''), 8)
from auth.users u
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- Learning progress
-- ---------------------------------------------------------------------------

create table if not exists public.user_board_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  bbid integer not null,
  first_opened_at timestamptz,
  last_opened_at timestamptz,
  open_count integer not null default 0 check (open_count >= 0),
  deepest_floor_reached integer not null default 0 check (deepest_floor_reached >= 0),
  deepest_floor_completed_at timestamptz,
  recall_due_at timestamptz,
  recall_stage integer not null default 0 check (recall_stage >= 0),
  recall_passes integer not null default 0 check (recall_passes >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, bbid)
);

create index if not exists user_board_progress_user_last_seen_idx
  on public.user_board_progress (user_id, last_opened_at desc);

create index if not exists user_board_progress_user_recall_idx
  on public.user_board_progress (user_id, recall_due_at)
  where recall_due_at is not null;

create trigger user_board_progress_set_updated_at
  before update on public.user_board_progress
  for each row execute function public.set_updated_at();

alter table public.user_board_progress enable row level security;

create policy "user_board_progress_own_select"
  on public.user_board_progress for select
  using (auth.uid() = user_id);

create policy "user_board_progress_own_insert"
  on public.user_board_progress for insert
  with check (auth.uid() = user_id);

create policy "user_board_progress_own_update"
  on public.user_board_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_board_progress_own_delete"
  on public.user_board_progress for delete
  using (auth.uid() = user_id);

create table if not exists public.user_path_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id text not null,
  first_opened_at timestamptz,
  last_opened_at timestamptz,
  best_score integer,
  best_total integer,
  first_pass_at timestamptz,
  mastered_once_at timestamptz,
  recalled_mastered_twice_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, path_id),
  constraint user_path_progress_score_valid
    check (
      (best_score is null and best_total is null)
      or (best_score >= 0 and best_total > 0 and best_score <= best_total)
    )
);

create index if not exists user_path_progress_user_last_seen_idx
  on public.user_path_progress (user_id, last_opened_at desc);

create trigger user_path_progress_set_updated_at
  before update on public.user_path_progress
  for each row execute function public.set_updated_at();

alter table public.user_path_progress enable row level security;

create policy "user_path_progress_own_select"
  on public.user_path_progress for select
  using (auth.uid() = user_id);

create policy "user_path_progress_own_insert"
  on public.user_path_progress for insert
  with check (auth.uid() = user_id);

create policy "user_path_progress_own_update"
  on public.user_path_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_path_progress_own_delete"
  on public.user_path_progress for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Attempts and rewards
-- ---------------------------------------------------------------------------

create table if not exists public.user_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  completed_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  constraint user_quiz_attempts_score_valid check (score <= total)
);

create index if not exists user_quiz_attempts_user_completed_idx
  on public.user_quiz_attempts (user_id, completed_at desc);

create index if not exists user_quiz_attempts_user_path_idx
  on public.user_quiz_attempts (user_id, path_id, completed_at desc);

alter table public.user_quiz_attempts enable row level security;

create policy "user_quiz_attempts_own_select"
  on public.user_quiz_attempts for select
  using (auth.uid() = user_id);

create policy "user_quiz_attempts_own_insert"
  on public.user_quiz_attempts for insert
  with check (auth.uid() = user_id);

create policy "user_quiz_attempts_own_delete"
  on public.user_quiz_attempts for delete
  using (auth.uid() = user_id);

create table if not exists public.user_workshop_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  is_challenge boolean not null default false,
  completed_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  constraint user_workshop_attempts_score_valid check (score <= total)
);

create index if not exists user_workshop_attempts_user_completed_idx
  on public.user_workshop_attempts (user_id, completed_at desc);

create index if not exists user_workshop_attempts_user_module_idx
  on public.user_workshop_attempts (user_id, module_id, completed_at desc);

alter table public.user_workshop_attempts enable row level security;

create policy "user_workshop_attempts_own_select"
  on public.user_workshop_attempts for select
  using (auth.uid() = user_id);

create policy "user_workshop_attempts_own_insert"
  on public.user_workshop_attempts for insert
  with check (auth.uid() = user_id);

create policy "user_workshop_attempts_own_delete"
  on public.user_workshop_attempts for delete
  using (auth.uid() = user_id);

create table if not exists public.user_w_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  event_ref text not null,
  amount integer not null check (amount > 0),
  bonus boolean not null default false,
  repeatable boolean not null default false,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists user_w_events_once_idx
  on public.user_w_events (user_id, event_type, event_ref)
  where repeatable = false;

create index if not exists user_w_events_user_created_idx
  on public.user_w_events (user_id, created_at desc);

alter table public.user_w_events enable row level security;

create policy "user_w_events_own_select"
  on public.user_w_events for select
  using (auth.uid() = user_id);

create policy "user_w_events_own_insert"
  on public.user_w_events for insert
  with check (auth.uid() = user_id);

create policy "user_w_events_own_delete"
  on public.user_w_events for delete
  using (auth.uid() = user_id);

create table if not exists public.user_daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  event_count integer not null default 0 check (event_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, activity_date)
);

create index if not exists user_daily_activity_user_date_idx
  on public.user_daily_activity (user_id, activity_date desc);

create trigger user_daily_activity_set_updated_at
  before update on public.user_daily_activity
  for each row execute function public.set_updated_at();

alter table public.user_daily_activity enable row level security;

create policy "user_daily_activity_own_select"
  on public.user_daily_activity for select
  using (auth.uid() = user_id);

create policy "user_daily_activity_own_insert"
  on public.user_daily_activity for insert
  with check (auth.uid() = user_id);

create policy "user_daily_activity_own_update"
  on public.user_daily_activity for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_daily_activity_own_delete"
  on public.user_daily_activity for delete
  using (auth.uid() = user_id);

create table if not exists public.user_engagement_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  active_seconds integer not null check (active_seconds >= 0),
  route text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint user_engagement_sessions_time_valid check (ended_at >= started_at)
);

create index if not exists user_engagement_sessions_user_started_idx
  on public.user_engagement_sessions (user_id, started_at desc);

alter table public.user_engagement_sessions enable row level security;

create policy "user_engagement_sessions_own_select"
  on public.user_engagement_sessions for select
  using (auth.uid() = user_id);

create policy "user_engagement_sessions_own_insert"
  on public.user_engagement_sessions for insert
  with check (auth.uid() = user_id);

create policy "user_engagement_sessions_own_delete"
  on public.user_engagement_sessions for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- User issue reporting
-- ---------------------------------------------------------------------------

create table if not exists public.issue_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  category text not null default 'bug'
    check (category in ('bug','content','workshop','audio','visual','account','idea','other')),
  message text not null check (char_length(message) between 3 and 4000),
  route text,
  bbid integer,
  workshop_id text,
  screenshot_path text,
  status text not null default 'open'
    check (status in ('open','reviewing','fixed','closed')),
  app_version text,
  user_agent text,
  viewport jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists issue_reports_user_created_idx
  on public.issue_reports (user_id, created_at desc);

create index if not exists issue_reports_status_created_idx
  on public.issue_reports (status, created_at desc);

create trigger issue_reports_set_updated_at
  before update on public.issue_reports
  for each row execute function public.set_updated_at();

alter table public.issue_reports enable row level security;

create policy "issue_reports_own_select"
  on public.issue_reports for select
  using (auth.uid() = user_id);

create policy "issue_reports_own_insert"
  on public.issue_reports for insert
  with check (auth.uid() = user_id or user_id is null);

-- Users can close their own issue, but cannot edit status/details after submit.
create policy "issue_reports_own_update"
  on public.issue_reports for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('issue-screenshots', 'issue-screenshots', false)
on conflict (id) do nothing;

create policy "issue_screenshots_own_read"
  on storage.objects for select
  using (
    bucket_id = 'issue-screenshots'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "issue_screenshots_own_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'issue-screenshots'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "issue_screenshots_own_delete"
  on storage.objects for delete
  using (
    bucket_id = 'issue-screenshots'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ---------------------------------------------------------------------------
-- Privacy helper: user-owned data export/delete support
-- ---------------------------------------------------------------------------

create or replace function public.delete_my_user_data()
returns void
language plpgsql
security invoker
as $$
begin
  delete from public.user_w_events where user_id = auth.uid();
  delete from public.user_workshop_attempts where user_id = auth.uid();
  delete from public.user_quiz_attempts where user_id = auth.uid();
  delete from public.user_daily_activity where user_id = auth.uid();
  delete from public.user_engagement_sessions where user_id = auth.uid();
  delete from public.user_path_progress where user_id = auth.uid();
  delete from public.user_board_progress where user_id = auth.uid();
  update public.user_profiles
    set onboarding_completed = false
    where user_id = auth.uid();
end;
$$;

grant execute on function public.delete_my_user_data() to authenticated;
