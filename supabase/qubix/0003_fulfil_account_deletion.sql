-- Make account deletion actually happen.
--
-- 0001 created a queue and nothing drains it. A learner presses Delete account,
-- a row appears with status 'pending', and that is the end of it: the account
-- and its progress remain. Both app stores require a working deletion route, and
-- a queue nothing empties is worse than no queue, because the interface promises
-- something the system does not do.
--
-- This migration adds the missing half. It is deliberately not a trigger on
-- insert: erasing an account the instant a button is pressed removes any chance
-- of recovering from a misclick, and the interface already asks for a second
-- confirmation rather than a third.
--
-- Instead the learner's own data is erased immediately and irreversibly, which
-- is what they asked for and what the law requires, while the auth user is
-- removed by the same call. The request row survives as the record that the
-- request was made and honoured, which is why account_deletion_requests does not
-- cascade away with everything else.

begin;

-- Erase the caller's own account. Runs as definer so it can reach auth.users,
-- but it can only ever act on auth.uid(): the identity comes from the session,
-- never from an argument, so there is no user_id to tamper with.
create or replace function public.fulfil_my_account_deletion()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  caller uuid := auth.uid();
begin
  if caller is null then
    raise exception 'not authenticated';
  end if;

  -- Record the request first, so a failure part way through still leaves
  -- evidence that erasure was asked for.
  insert into public.account_deletion_requests (user_id, status)
  values (caller, 'processing')
  on conflict (user_id) where status in ('pending', 'processing')
  do update set status = 'processing';

  delete from public.learner_progress where user_id = caller;

  update public.account_deletion_requests
     set status = 'fulfilled',
         fulfilled_at = now()
   where user_id = caller
     and status in ('pending', 'processing');

  -- Removing the auth user cascades anything else keyed to it. The request row
  -- is retained on purpose and is the one thing that outlives the account.
  delete from auth.users where id = caller;
end;
$$;

revoke all on function public.fulfil_my_account_deletion() from public, anon;
grant execute on function public.fulfil_my_account_deletion() to authenticated;

comment on function public.fulfil_my_account_deletion is
  'Erases the calling learner''s progress and auth user, and marks their deletion request fulfilled. Acts only on auth.uid(); takes no arguments so no other account can be named.';

-- The status column now needs updating by the function above, which runs as
-- definer, so authenticated still holds no direct update grant. Unchanged from
-- 0001 and restated here so the intent is visible in one place.
revoke update, delete on table public.account_deletion_requests from authenticated;

commit;
