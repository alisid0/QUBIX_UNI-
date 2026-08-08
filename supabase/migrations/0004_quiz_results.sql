-- 0004_quiz_results.sql
-- Stores signed-in quiz attempts/results. Local guest progress still lives in
-- browser storage; these rows are for authenticated cross-device history.

create table if not exists public.quiz_results (
  id           uuid        default uuid_generate_v4() primary key,
  user_id      uuid        references auth.users not null,
  path_id      text        not null,
  score        integer     not null check (score >= 0),
  total        integer     not null check (total > 0),
  completed_at timestamptz default now(),
  created_at   timestamptz default now(),
  unique (user_id, path_id)
);

create index if not exists quiz_results_user_idx
  on public.quiz_results (user_id);

create index if not exists quiz_results_path_idx
  on public.quiz_results (path_id);

alter table public.quiz_results enable row level security;

do $$ begin
  create policy "quiz_results_own_select"
    on public.quiz_results for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "quiz_results_own_insert"
    on public.quiz_results for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "quiz_results_own_update"
    on public.quiz_results for update using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
