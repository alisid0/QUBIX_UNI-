-- Qubix University account-deletion request queue.
-- Dormant Strata-era user_* tables remain untouched.

begin;

create table if not exists public.account_deletion_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_at timestamptz not null default now(),
  status text not null default 'pending',
  fulfilled_at timestamptz,
  constraint account_deletion_status
    check (status in ('pending', 'processing', 'fulfilled', 'rejected')),
  constraint account_deletion_fulfilment
    check ((status = 'fulfilled') = (fulfilled_at is not null))
);

comment on table public.account_deletion_requests is
  'Authenticated requests to delete a Qubix account and its associated data.';

create unique index if not exists account_deletion_one_open_request
  on public.account_deletion_requests (user_id)
  where status in ('pending', 'processing');

alter table public.account_deletion_requests enable row level security;

create policy "account_deletion_select_own"
  on public.account_deletion_requests
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "account_deletion_request_own"
  on public.account_deletion_requests
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and status = 'pending'
    and fulfilled_at is null
  );

revoke all on table public.account_deletion_requests from anon;
revoke update, delete on table public.account_deletion_requests from authenticated;
grant select on table public.account_deletion_requests to authenticated;
grant insert (user_id) on table public.account_deletion_requests to authenticated;
grant usage, select on sequence public.account_deletion_requests_id_seq to authenticated;

commit;
