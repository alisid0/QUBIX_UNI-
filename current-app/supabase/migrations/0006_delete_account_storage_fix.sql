-- 0006_delete_account_storage_fix.sql
--
-- 0005 attempted to delete screenshots directly from storage.objects.
-- Supabase rejects that operation and requires the Storage API, so account
-- deletion stopped before any relational data or the auth identity was erased.
-- The delete-account Edge Function now removes screenshots first through the
-- privileged Storage API. This migration repairs databases where 0005 has
-- already been applied by replacing the SQL helper without the forbidden
-- storage-table delete.

begin;

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

  delete from public.user_w_events            where user_id = uid;
  delete from public.user_workshop_attempts   where user_id = uid;
  delete from public.user_quiz_attempts       where user_id = uid;
  delete from public.user_daily_activity      where user_id = uid;
  delete from public.user_engagement_sessions where user_id = uid;
  delete from public.user_path_progress       where user_id = uid;
  delete from public.user_board_progress      where user_id = uid;

  update public.issue_reports
  set user_id         = null,
      user_agent      = null,
      screenshot_path = null,
      viewport        = '{}'::jsonb,
      metadata        = '{}'::jsonb
  where user_id = uid;

  delete from public.user_profiles where user_id = uid;
end;
$$;

grant execute on function public.delete_my_user_data() to authenticated;

commit;
