-- ============================================================
-- Strata — Storage buckets for the BB content pipeline
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor),
-- after schema.sql / seed.sql.
--
-- card-images / card-audio hold media for `cards` rows inserted
-- by scripts/ingest-bbs.mjs. Public read (same trust level as the
-- cards table itself — img_url/audio already need to be publicly
-- fetchable by any guest browsing the app, no auth required).
-- ============================================================

insert into storage.buckets (id, name, public)
values ('card-images', 'card-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('card-audio', 'card-audio', true)
on conflict (id) do nothing;
