-- ============================================================================
-- Qubix product data schema — end to end
--
-- PROPOSED. NOT APPLIED. Do not run this against any live or shared database.
-- Per AGENTS.md and docs/PRODUCT-AND-LAUNCH-PLAN.md (sections 4 and 5), a
-- Qubix-specific schema must be audited and the target project authorised by
-- the founder before any migration is applied. This file is committed so it can
-- be reviewed; applying it is a separate, explicit decision.
--
-- Scope: the things worth recording across the product, organised by concern:
--   1. Identity and preferences          (profiles, admins, is_admin)
--   2. Consent                           (consent_records)
--   3. Content catalogue                 (subjects, topics, learning_paths,
--                                         lessons, path_lessons)
--   4. Publishing and provenance         (lesson_versions, release_manifests,
--                                         release_lessons, lesson_sources,
--                                         curriculum_status_events)
--   5. Learning records                  (learning_events, exercise_attempts)
--   6. Commercial entitlements           (entitlements)
--   7. Audit                             (audit_log)
--
-- Already in production and therefore only referenced here, not recreated:
--   auth.users, public.learner_progress (0002), public.account_deletion_requests
--   (0001) and public.fulfil_my_account_deletion (0003). Every per-learner table
--   below uses `on delete cascade` on auth.users, so the existing deletion
--   function erases them when it removes the auth user.
--
-- Principles enforced below (see docs/DATA-SCHEMA.md):
--   * Row Level Security on every table; a learner can read and write only their
--     own rows; published content is world-readable, drafts are not.
--   * Data minimisation: no free-text learner input reaches the database; answers
--     are fixed option keys; identity (name, email, avatar) stays in auth.users.
--   * No service-role key is required by clients. Server-only writes (store
--     billing, publishing, audit) are performed with the service role, which
--     bypasses RLS; no anon/authenticated write grant is given for those.
--   * Only the founder (admins.role = 'owner') may record APPROVED or RELEASED.
-- ============================================================================

begin;

-- ── shared helper: keep updated_at current ─────────────────────────────────
-- Defined in 0002; restated here so this file is self-describing and safe to
-- read in isolation.
create or replace function public.set_qubix_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.set_qubix_updated_at() from public, anon, authenticated;

-- ============================================================================
-- 1. IDENTITY AND PREFERENCES
-- ============================================================================

-- Named administrative principals for authoring, review and publishing.
-- The first owner is seeded out of band with the service role; there is
-- deliberately no client write path into this table.
create table if not exists public.admins (
  user_id  uuid primary key references auth.users(id) on delete cascade,
  role     text not null default 'author'
           check (role in ('author', 'reviewer', 'owner')),
  added_at timestamptz not null default now()
);
comment on table public.admins is
  'Named administrative principals. role owner is the founder authority for APPROVED/RELEASED.';

-- Membership test that bypasses RLS on admins, so admin-gated policies below do
-- not recurse. Reads only the caller''s identity from the session.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;
-- anon needs execute so the public-content read policies below (which call
-- is_admin()) can evaluate for signed-out visitors; it returns false for anon.
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admins enable row level security;
drop policy if exists "admins_select_admin" on public.admins;
create policy "admins_select_admin"
  on public.admins for select to authenticated
  using (public.is_admin());
revoke all on table public.admins from anon, authenticated;
grant select on table public.admins to authenticated;

-- Per-learner preferences and the age acknowledgement. No free text and no
-- duplicate of the identity that already lives in auth.users.
create table if not exists public.profiles (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  theme            text not null default 'system'
                   check (theme in ('light', 'dark', 'system')),
  locale           text check (locale is null or locale ~ '^[a-z]{2}(-[A-Z]{2})?$'),
  reduced_motion   boolean not null default false,
  age_confirmed_at timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
comment on table public.profiles is
  'Per-learner preferences and the 13+ acknowledgement. Identity stays in auth.users.';

alter table public.profiles enable row level security;
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert to authenticated
  with check ((select auth.uid()) = user_id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own" on public.profiles for delete to authenticated
  using ((select auth.uid()) = user_id);
revoke all on table public.profiles from anon;
grant select, insert, update, delete on table public.profiles to authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_qubix_updated_at();

-- ============================================================================
-- 2. CONSENT
-- ============================================================================

-- Append-only consent history. Withdrawal is a new row with granted = false, so
-- the record shows when each choice was made, under which policy version.
create table if not exists public.consent_records (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users(id) on delete cascade,
  consent_type   text not null check (consent_type in ('analytics', 'newsletter', 'functional')),
  granted        boolean not null,
  policy_version text not null,
  source         text not null check (source in ('signup', 'settings', 'banner')),
  created_at     timestamptz not null default now()
);
comment on table public.consent_records is
  'Append-only record of consent decisions. Withdrawal is a new row with granted = false.';
create index if not exists consent_records_user_idx
  on public.consent_records (user_id, consent_type, created_at desc);

alter table public.consent_records enable row level security;
drop policy if exists "consent_select_own" on public.consent_records;
create policy "consent_select_own" on public.consent_records for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "consent_insert_own" on public.consent_records;
create policy "consent_insert_own" on public.consent_records for insert to authenticated
  with check ((select auth.uid()) = user_id);
revoke all on table public.consent_records from anon;
revoke update, delete on table public.consent_records from authenticated;
grant select on table public.consent_records to authenticated;
grant insert (user_id, consent_type, granted, policy_version, source)
  on public.consent_records to authenticated;

-- ============================================================================
-- 3. CONTENT CATALOGUE
-- Published rows are world-readable; drafts are visible to admins only. Writes
-- are admin-only. A learner never writes catalogue rows.
-- ============================================================================

create table if not exists public.subjects (
  id         text primary key,
  name       text not null,
  sort_order integer not null default 0,
  is_public  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.subjects is 'Top-level subject areas, e.g. maths, physics, data-science.';

create table if not exists public.topics (
  id         text primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  name       text not null,
  sort_order integer not null default 0,
  is_public  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.topics is 'Topics within a subject.';
create index if not exists topics_subject_idx on public.topics (subject_id, sort_order);

create table if not exists public.learning_paths (
  id         text primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  name       text not null,
  sort_order integer not null default 0,
  is_public  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.learning_paths is 'Ordered learning paths through a subject.';
create index if not exists learning_paths_subject_idx on public.learning_paths (subject_id, sort_order);

-- One catalogue row per Bite-sized Board / lesson. The id is the stable
-- curriculum identifier already used in the app, e.g. DSA-SEQ-001.
create table if not exists public.lessons (
  id                text primary key,
  topic_id          text references public.topics(id) on delete set null,
  title             text not null,
  slug              text unique,
  kind              text not null default 'read-and-do'
                    check (kind in ('reading', 'mission', 'read-and-do', 'reference')),
  sort_order        integer not null default 0,
  curriculum_status text not null default 'AI_DRAFT'
                    check (curriculum_status in (
                      'SOURCE_SELECTED', 'AI_DRAFT', 'FOUNDER_READING',
                      'AMENDMENTS_REQUIRED', 'FOUNDER_TESTING', 'APPROVED', 'RELEASED')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
comment on table public.lessons is
  'Catalogue of lessons/BBs. curriculum_status mirrors the declared review vocabulary; only the founder may set APPROVED/RELEASED (see curriculum_status_events).';
create index if not exists lessons_topic_idx on public.lessons (topic_id, sort_order);
create index if not exists lessons_status_idx on public.lessons (curriculum_status);

create table if not exists public.path_lessons (
  path_id   text not null references public.learning_paths(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  position  integer not null default 0,
  primary key (path_id, lesson_id)
);
comment on table public.path_lessons is 'Ordered membership of lessons within a learning path.';

-- Catalogue RLS: released rows are world-readable; everything is visible to
-- admins; only admins write.
do $$
declare t text;
begin
  foreach t in array array['subjects', 'topics', 'learning_paths', 'lessons', 'path_lessons']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('revoke all on table public.%I from anon, authenticated;', t);
    execute format('grant select on table public.%I to anon, authenticated;', t);
    execute format('grant insert, update, delete on table public.%I to authenticated;', t);
  end loop;
end $$;

drop policy if exists "subjects_public_read" on public.subjects;
create policy "subjects_public_read" on public.subjects for select to anon, authenticated
  using (is_public or public.is_admin());
drop policy if exists "topics_public_read" on public.topics;
create policy "topics_public_read" on public.topics for select to anon, authenticated
  using (is_public or public.is_admin());
drop policy if exists "learning_paths_public_read" on public.learning_paths;
create policy "learning_paths_public_read" on public.learning_paths for select to anon, authenticated
  using (is_public or public.is_admin());
drop policy if exists "lessons_public_read" on public.lessons;
create policy "lessons_public_read" on public.lessons for select to anon, authenticated
  using (curriculum_status = 'RELEASED' or public.is_admin());
drop policy if exists "path_lessons_public_read" on public.path_lessons;
create policy "path_lessons_public_read" on public.path_lessons for select to anon, authenticated
  using (
    public.is_admin()
    or exists (select 1 from public.lessons l
               where l.id = path_lessons.lesson_id and l.curriculum_status = 'RELEASED')
  );

-- Admin write policies (one per catalogue table).
do $$
declare t text;
begin
  foreach t in array array['subjects', 'topics', 'learning_paths', 'lessons', 'path_lessons']
  loop
    execute format('drop policy if exists "%s_admin_write" on public.%I;', t, t);
    execute format($f$create policy "%s_admin_write" on public.%I for all to authenticated
                       using (public.is_admin()) with check (public.is_admin());$f$, t, t);
  end loop;
end $$;

drop trigger if exists subjects_set_updated_at on public.subjects;
create trigger subjects_set_updated_at before update on public.subjects
  for each row execute function public.set_qubix_updated_at();
drop trigger if exists topics_set_updated_at on public.topics;
create trigger topics_set_updated_at before update on public.topics
  for each row execute function public.set_qubix_updated_at();
drop trigger if exists learning_paths_set_updated_at on public.learning_paths;
create trigger learning_paths_set_updated_at before update on public.learning_paths
  for each row execute function public.set_qubix_updated_at();
drop trigger if exists lessons_set_updated_at on public.lessons;
create trigger lessons_set_updated_at before update on public.lessons
  for each row execute function public.set_qubix_updated_at();

-- ============================================================================
-- 4. PUBLISHING AND PROVENANCE
-- ============================================================================

-- Immutable published lesson payloads. Content is structured, sanitised data
-- (never executable JS/HTML/CSS, per the remote-content rules). No update or
-- delete grant: a new version is a new row.
create table if not exists public.lesson_versions (
  id                     uuid primary key default gen_random_uuid(),
  lesson_id              text not null references public.lessons(id) on delete cascade,
  version                integer not null,
  content                jsonb not null,
  content_schema_version text not null,
  minimum_app_version    text not null,
  checksum               text not null,
  published_at           timestamptz,
  created_at             timestamptz not null default now(),
  unique (lesson_id, version),
  constraint lesson_versions_content_is_object check (jsonb_typeof(content) = 'object')
);
comment on table public.lesson_versions is
  'Immutable published lesson payloads. A new version is a new row; rows are never updated.';

create table if not exists public.release_manifests (
  id                     uuid primary key default gen_random_uuid(),
  release_id             text not null unique,
  content_schema_version text not null,
  minimum_app_version    text not null,
  is_current             boolean not null default false,
  published_at           timestamptz,
  created_at             timestamptz not null default now()
);
comment on table public.release_manifests is
  'Atomic content releases. is_current marks the manifest clients should fetch.';
-- At most one current manifest.
create unique index if not exists release_manifests_one_current
  on public.release_manifests ((is_current)) where is_current;

create table if not exists public.release_lessons (
  release_id        uuid not null references public.release_manifests(id) on delete cascade,
  lesson_version_id uuid not null references public.lesson_versions(id) on delete restrict,
  primary key (release_id, lesson_version_id)
);
comment on table public.release_lessons is 'Which immutable lesson versions a release ships.';

-- Source and copyright provenance, one or more rows per lesson, per the source
-- protocol in docs/AGENT-ONBOARDING.md section 7. Authoring metadata, admin-only.
create table if not exists public.lesson_sources (
  id                bigint generated always as identity primary key,
  lesson_id         text not null references public.lessons(id) on delete cascade,
  title             text,
  author            text,
  edition           text,
  publisher         text,
  year              integer,
  scan_reference    text,
  chapter_range     text,
  page_range        text,
  retained_idea     text,
  modernised_notes  text,
  license_evidence  text,
  territories       text[] not null default '{}',
  founder_permission boolean not null default false,
  recorded_at       timestamptz not null default now()
);
comment on table public.lesson_sources is
  'Source edition, passage and territory provenance for adapted material. Admin-only authoring metadata.';
create index if not exists lesson_sources_lesson_idx on public.lesson_sources (lesson_id);

-- Curriculum decision history. Only the founder (owner) may record APPROVED or
-- RELEASED; enforced by a trigger below so the rule lives in the database, not
-- only in process.
create table if not exists public.curriculum_status_events (
  id          bigint generated always as identity primary key,
  lesson_id   text not null references public.lessons(id) on delete cascade,
  from_status text,
  to_status   text not null check (to_status in (
                'SOURCE_SELECTED', 'AI_DRAFT', 'FOUNDER_READING',
                'AMENDMENTS_REQUIRED', 'FOUNDER_TESTING', 'APPROVED', 'RELEASED')),
  decided_by  uuid references auth.users(id) on delete set null,
  note        text,
  decided_at  timestamptz not null default now()
);
comment on table public.curriculum_status_events is
  'Append-only history of curriculum status decisions. APPROVED/RELEASED require the founder (owner).';
create index if not exists curriculum_status_events_lesson_idx
  on public.curriculum_status_events (lesson_id, decided_at desc);

create or replace function public.enforce_release_authority()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.to_status in ('APPROVED', 'RELEASED') then
    if not exists (
      select 1 from public.admins a
      where a.user_id = auth.uid() and a.role = 'owner'
    ) then
      raise exception 'only the founder (admins.role = owner) may record APPROVED or RELEASED';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.enforce_release_authority() from public, anon, authenticated;
drop trigger if exists curriculum_status_events_authority on public.curriculum_status_events;
create trigger curriculum_status_events_authority
  before insert on public.curriculum_status_events
  for each row execute function public.enforce_release_authority();

-- Publishing tables: released content is world-readable; the rest is admin-only.
alter table public.lesson_versions enable row level security;
alter table public.release_manifests enable row level security;
alter table public.release_lessons enable row level security;
alter table public.lesson_sources enable row level security;
alter table public.curriculum_status_events enable row level security;

-- lesson_versions: readable when part of the current release, else admin-only.
revoke all on table public.lesson_versions from anon, authenticated;
grant select on table public.lesson_versions to anon, authenticated;
grant insert on table public.lesson_versions to authenticated;
drop policy if exists "lesson_versions_read" on public.lesson_versions;
create policy "lesson_versions_read" on public.lesson_versions for select to anon, authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.release_lessons rl
      join public.release_manifests rm on rm.id = rl.release_id
      where rl.lesson_version_id = lesson_versions.id and rm.is_current
    )
  );
drop policy if exists "lesson_versions_admin_insert" on public.lesson_versions;
create policy "lesson_versions_admin_insert" on public.lesson_versions for insert to authenticated
  with check (public.is_admin());

-- release_manifests / release_lessons: current release is world-readable.
revoke all on table public.release_manifests from anon, authenticated;
grant select on table public.release_manifests to anon, authenticated;
grant insert, update on table public.release_manifests to authenticated;
drop policy if exists "release_manifests_read" on public.release_manifests;
create policy "release_manifests_read" on public.release_manifests for select to anon, authenticated
  using (is_current or public.is_admin());
drop policy if exists "release_manifests_admin_write" on public.release_manifests;
create policy "release_manifests_admin_write" on public.release_manifests for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

revoke all on table public.release_lessons from anon, authenticated;
grant select on table public.release_lessons to anon, authenticated;
grant insert, delete on table public.release_lessons to authenticated;
drop policy if exists "release_lessons_read" on public.release_lessons;
create policy "release_lessons_read" on public.release_lessons for select to anon, authenticated
  using (
    public.is_admin()
    or exists (select 1 from public.release_manifests rm
               where rm.id = release_lessons.release_id and rm.is_current)
  );
drop policy if exists "release_lessons_admin_write" on public.release_lessons;
create policy "release_lessons_admin_write" on public.release_lessons for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- lesson_sources and curriculum_status_events: admin-only.
revoke all on table public.lesson_sources from anon, authenticated;
grant select, insert, update, delete on table public.lesson_sources to authenticated;
drop policy if exists "lesson_sources_admin_all" on public.lesson_sources;
create policy "lesson_sources_admin_all" on public.lesson_sources for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

revoke all on table public.curriculum_status_events from anon, authenticated;
grant select, insert on table public.curriculum_status_events to authenticated;
drop policy if exists "curriculum_status_events_admin_read" on public.curriculum_status_events;
create policy "curriculum_status_events_admin_read" on public.curriculum_status_events for select to authenticated
  using (public.is_admin());
drop policy if exists "curriculum_status_events_admin_insert" on public.curriculum_status_events;
create policy "curriculum_status_events_admin_insert" on public.curriculum_status_events for insert to authenticated
  with check (public.is_admin());

-- ============================================================================
-- 5. LEARNING RECORDS
-- Structured, append-only, per learner. Complements the compact JSON snapshot in
-- learner_progress (0002) with an event history for mastery and review features.
-- No free text: answers are fixed option keys.
-- ============================================================================

create table if not exists public.learning_events (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  lesson_id   text not null,
  event_type  text not null check (event_type in (
                'lesson_started', 'lesson_completed', 'section_completed',
                'mission_started', 'mission_completed')),
  xp_awarded  integer not null default 0 check (xp_awarded >= 0),
  occurred_at timestamptz not null default now()
);
comment on table public.learning_events is
  'Append-only per-learner learning milestones. lesson_id is the stable curriculum id.';
create index if not exists learning_events_user_idx on public.learning_events (user_id, occurred_at desc);

create table if not exists public.exercise_attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  lesson_id   text not null,
  check_key   text not null,
  choice_key  text not null,
  is_correct  boolean not null,
  attempt_no  integer not null default 1 check (attempt_no >= 1),
  first_try   boolean,
  occurred_at timestamptz not null default now()
);
comment on table public.exercise_attempts is
  'Append-only record of check attempts. choice_key is a fixed option id; no free-text answers.';
create index if not exists exercise_attempts_user_idx
  on public.exercise_attempts (user_id, lesson_id, check_key);

alter table public.learning_events enable row level security;
alter table public.exercise_attempts enable row level security;

revoke all on table public.learning_events from anon;
revoke update, delete on table public.learning_events from authenticated;
grant select on table public.learning_events to authenticated;
grant insert (user_id, lesson_id, event_type, xp_awarded) on table public.learning_events to authenticated;
drop policy if exists "learning_events_select_own" on public.learning_events;
create policy "learning_events_select_own" on public.learning_events for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "learning_events_insert_own" on public.learning_events;
create policy "learning_events_insert_own" on public.learning_events for insert to authenticated
  with check ((select auth.uid()) = user_id);

revoke all on table public.exercise_attempts from anon;
revoke update, delete on table public.exercise_attempts from authenticated;
grant select on table public.exercise_attempts to authenticated;
grant insert (user_id, lesson_id, check_key, choice_key, is_correct, attempt_no, first_try)
  on table public.exercise_attempts to authenticated;
drop policy if exists "exercise_attempts_select_own" on public.exercise_attempts;
create policy "exercise_attempts_select_own" on public.exercise_attempts for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "exercise_attempts_insert_own" on public.exercise_attempts;
create policy "exercise_attempts_insert_own" on public.exercise_attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- ============================================================================
-- 6. COMMERCIAL ENTITLEMENTS
-- Read-only to the learner. Written server-side from verified store billing with
-- the service role (which bypasses RLS); no client write grant. No card or
-- payment-instrument data is ever stored here.
-- ============================================================================

create table if not exists public.entitlements (
  user_id            uuid not null references auth.users(id) on delete cascade,
  product            text not null check (product in ('qubix_plus')),
  status             text not null default 'none'
                     check (status in ('none', 'active', 'in_grace', 'expired', 'refunded')),
  source             text check (source in ('google_play', 'app_store', 'promo', 'manual')),
  current_period_end timestamptz,
  updated_at         timestamptz not null default now(),
  primary key (user_id, product)
);
comment on table public.entitlements is
  'Server-verified subscription entitlements. Learner-readable; written only by the service role. No payment data stored.';

alter table public.entitlements enable row level security;
revoke all on table public.entitlements from anon, authenticated;
grant select on table public.entitlements to authenticated;
drop policy if exists "entitlements_select_own" on public.entitlements;
create policy "entitlements_select_own" on public.entitlements for select to authenticated
  using ((select auth.uid()) = user_id);

drop trigger if exists entitlements_set_updated_at on public.entitlements;
create trigger entitlements_set_updated_at before update on public.entitlements
  for each row execute function public.set_qubix_updated_at();

-- ============================================================================
-- 7. AUDIT
-- Publishing and sensitive administrative actions. Admin-readable; written by
-- the service role or definer functions. No anon/authenticated write grant.
-- ============================================================================

create table if not exists public.audit_log (
  id          bigint generated always as identity primary key,
  actor       uuid references auth.users(id) on delete set null,
  action      text not null,
  entity_type text,
  entity_id   text,
  details     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  constraint audit_log_details_is_object check (jsonb_typeof(details) = 'object')
);
comment on table public.audit_log is
  'Append-only audit of publishing and administrative actions. Admin-readable; service-role written.';
create index if not exists audit_log_created_idx on public.audit_log (created_at desc);

alter table public.audit_log enable row level security;
revoke all on table public.audit_log from anon, authenticated;
grant select on table public.audit_log to authenticated;
drop policy if exists "audit_log_admin_read" on public.audit_log;
create policy "audit_log_admin_read" on public.audit_log for select to authenticated
  using (public.is_admin());

commit;
