-- Marketing consent, kept deliberately separate from the account.
--
-- PRODUCT-AND-LAUNCH-PLAN.md is explicit: "Authentication is not marketing
-- consent. Newsletters require a separate, optional, unchecked consent, consent
-- timestamp, source, policy version and an unsubscribe route." This table is
-- that record, and every column here exists because that sentence asks for it.
--
-- Three things follow from UK GDPR and PECR that are worth stating where the
-- schema lives, because a later reader will otherwise assume a boolean would
-- have done:
--
--   Consent must be a positive act, so `granted` defaults to false and a row
--   only appears when a learner ticks something. No row means no consent, which
--   is the same answer as a row saying false.
--
--   Consent must be informed, so `policy_version` records which privacy policy
--   the learner was shown. When the policy changes materially, that value tells
--   you whose consent still covers what you are about to send.
--
--   Consent must be withdrawable as easily as it was given, so withdrawal is an
--   update that sets `granted` false and stamps `withdrawn_at`. It is not a
--   delete: erasing the row would erase the evidence that they asked to stop,
--   and the next import would cheerfully add them back.
--
-- Founder decision, extended 2026-09-03: promotional email is for adults only.
-- `adult_declared` records the 18+ statement, which is a declaration in the same
-- way the 13+ statement is, not verification. The check constraint makes it
-- impossible to store a granted consent without it.

begin;

create table if not exists public.marketing_consent (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted boolean not null default false,
  adult_declared boolean not null default false,
  granted_at timestamptz,
  withdrawn_at timestamptz,
  source text not null,
  policy_version text not null,
  updated_at timestamptz not null default now(),

  -- A granted consent must know when it was given and that the learner said
  -- they were an adult. Without this, a bug that writes granted = true with no
  -- timestamp produces a subscriber nobody can prove opted in.
  constraint marketing_consent_granted_is_evidenced
    check (not granted or (granted_at is not null and adult_declared)),

  -- Where the consent was collected. Kept closed so a new surface has to be
  -- named here deliberately rather than appearing as a typo in an export.
  constraint marketing_consent_known_source
    check (source in ('signup', 'account', 'reader-footer', 'import'))
);

comment on table public.marketing_consent is
  'One optional, withdrawable promotional-email consent per learner, with the timestamp, source and policy version that make it evidence.';
comment on column public.marketing_consent.policy_version is
  'The privacy policy version shown when consent was given. Consent is only informed with respect to a specific policy.';
comment on column public.marketing_consent.adult_declared is
  'The learner''s 18+ statement. A declaration, not verification, and required before granted may be true.';

alter table public.marketing_consent enable row level security;

create policy "marketing_consent_select_own"
  on public.marketing_consent
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "marketing_consent_insert_own"
  on public.marketing_consent
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "marketing_consent_update_own"
  on public.marketing_consent
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Deliberately no delete grant. Withdrawal is an update, so the record that a
-- learner asked to stop outlives the sending. The row still cascades away with
-- the account, which is the one erasure a learner can ask for.
revoke all on table public.marketing_consent from anon;
grant select, insert, update on table public.marketing_consent to authenticated;

-- Reuses the trigger function created in 0002.
do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_trigger
    where tgname = 'marketing_consent_set_updated_at'
      and tgrelid = 'public.marketing_consent'::regclass
  ) then
    create trigger marketing_consent_set_updated_at
      before update on public.marketing_consent
      for each row execute function public.set_qubix_updated_at();
  end if;
end;
$$;

commit;
