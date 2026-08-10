-- Device-independent Qubix learner state.
-- Separate from the dormant Strata-era cards and user_* tables.

begin;

create table if not exists public.learner_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint learner_progress_state_is_object
    check (jsonb_typeof(state) = 'object'),
  constraint learner_progress_state_size
    check (pg_column_size(state) <= 262144)
);

comment on table public.learner_progress is
  'One private, device-independent Qubix progress record per authenticated learner.';

alter table public.learner_progress enable row level security;

create policy "learner_progress_select_own"
  on public.learner_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "learner_progress_insert_own"
  on public.learner_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "learner_progress_update_own"
  on public.learner_progress
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "learner_progress_delete_own"
  on public.learner_progress
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.learner_progress from anon;
grant select, insert, update, delete on table public.learner_progress to authenticated;

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

do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_trigger
    where tgname = 'learner_progress_set_updated_at'
      and tgrelid = 'public.learner_progress'::regclass
  ) then
    create trigger learner_progress_set_updated_at
      before update on public.learner_progress
      for each row execute function public.set_qubix_updated_at();
  end if;
end;
$$;

commit;
