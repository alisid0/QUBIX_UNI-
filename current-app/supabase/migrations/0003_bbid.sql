-- 0003_bbid.sql
-- Permanent per-BB identity (BBID), decoupled from sort_order.
-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor).
--
-- WHY: attachments (paths.js, boardMedia.js, questions, parts, recall) currently
-- key off `sort_order`, which the review re-ingest reassigns wholesale -- so media
-- detaches on every re-run. `bbid` is a stable id assigned once at draft and never
-- reused; `sort_order` becomes display-ordering only and may be reassigned freely.
--
-- Existing rows seed bbid from their current sort_order (a one-time snapshot);
-- new inserts auto-assign the next integer via a sequence. The ingest pipeline
-- stamps a board's bbid back into its source doc and matches by it on re-ingest.

-- 1. Add the column (nullable first so we can backfill).
alter table public.cards add column if not exists bbid integer;

-- 2. Snapshot current identity: bbid := sort_order for every existing row.
update public.cards set bbid = sort_order where bbid is null;

-- 3. Lock it down: not null + unique + index.
alter table public.cards alter column bbid set not null;

do $$ begin
  alter table public.cards add constraint cards_bbid_unique unique (bbid);
exception when duplicate_object then null;
end $$;

create index if not exists cards_bbid_idx on public.cards (bbid);

-- 4. Auto-assign for future drafts: a sequence starting after the current max,
--    wired as the column default. Ingest may still set bbid explicitly (for a
--    re-ingest carrying a stamped bbid); omit it and a fresh one is minted.
create sequence if not exists public.cards_bbid_seq owned by public.cards.bbid;
select setval(
  'public.cards_bbid_seq',
  greatest(coalesce(max(bbid), 0), 1),
  max(bbid) is not null
)
from public.cards;
alter table public.cards alter column bbid set default nextval('public.cards_bbid_seq');
