-- 0007_explicit_api_grants.sql
--
-- Production is created with "Automatically expose new tables" disabled.
-- RLS decides which rows a role may access, while these grants decide which
-- operations the role may attempt at all. Keep this list explicit whenever a
-- new client-facing table or RPC is added.

begin;

grant usage on schema public to anon, authenticated;

-- Remove implicit Data API privileges before adding the reviewed surface.
revoke all privileges on all tables in schema public from anon, authenticated;
revoke all privileges on all sequences in schema public from anon, authenticated;

-- Public catalogue: readable by guests and signed-in learners, never writable.
grant select on table public.cards to anon, authenticated;

-- Signed-in learner data. RLS policies in 0004/0005 enforce row ownership.
grant select, insert, update, delete on table public.user_profiles to authenticated;
grant select, insert, update, delete on table public.user_board_progress to authenticated;
grant select, insert, update, delete on table public.user_path_progress to authenticated;
grant select, insert, delete on table public.user_quiz_attempts to authenticated;
grant select, insert, delete on table public.user_workshop_attempts to authenticated;
grant select, insert, delete on table public.user_w_events to authenticated;
grant select, insert, update, delete on table public.user_daily_activity to authenticated;
grant select, insert, delete on table public.user_engagement_sessions to authenticated;
grant select, insert, update, delete on table public.issue_reports to authenticated;

-- Sensitive RPCs require a signed-in JWT. PostgreSQL grants function execution
-- to PUBLIC by default, so revoke that default explicitly.
revoke execute on function public.delete_my_user_data() from public, anon;
revoke execute on function public.export_my_user_data() from public, anon;
grant execute on function public.delete_my_user_data() to authenticated;
grant execute on function public.export_my_user_data() to authenticated;

commit;
