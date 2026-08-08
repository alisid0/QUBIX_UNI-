-- ============================================================
-- Strata — database schema
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor).
-- ============================================================

create extension if not exists "uuid-ossp";

-- ── CARDS ────────────────────────────────────────────────────
create table public.cards (
  id          uuid        default uuid_generate_v4() primary key,
  sort_order  integer     not null unique,
  act         text        not null check (act in ('I','II','III','IV','V')),
  kicker      text        not null,
  title       text        not null,
  layers      jsonb       not null default '[]',
  img_url     text,
  tags        jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── PROGRESS (Phase 2 — mastery system) ──────────────────────
create table public.progress (
  id            uuid        default uuid_generate_v4() primary key,
  user_id       uuid        references auth.users not null,
  card_id       uuid        references public.cards not null,
  state         text        not null default 'wandered'
                            check (state in ('wandered','visited','revisited','deep','deeper','mastered')),
  layer_reached integer     not null default 0,
  last_seen     timestamptz default now(),
  unique (user_id, card_id)
);

-- ── INDEXES ──────────────────────────────────────────────────
create index cards_sort_order_idx  on public.cards   (sort_order);
create index progress_user_idx     on public.progress (user_id);
create index progress_card_idx     on public.progress (card_id);

-- ── ROW-LEVEL SECURITY ────────────────────────────────────────
alter table public.cards    enable row level security;
alter table public.progress enable row level security;

-- Cards: anyone can read (public deck)
create policy "cards_public_read"
  on public.cards for select using (true);

-- Cards: only service_role key can write (used by the Sheets script)
-- No anon / authenticated write policy intentionally.

-- Progress: each authenticated user manages their own rows only
create policy "progress_own_select"
  on public.progress for select  using      (auth.uid() = user_id);
create policy "progress_own_insert"
  on public.progress for insert  with check (auth.uid() = user_id);
create policy "progress_own_update"
  on public.progress for update  using      (auth.uid() = user_id);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger cards_set_updated_at
  before update on public.cards
  for each row execute function public.set_updated_at();
