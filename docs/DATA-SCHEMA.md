# Qubix product data schema

Status: **proposed, not applied.** Written 2026-08-29. The schema is
`supabase/qubix/0004_product_schema.sql`. It is committed for review only.

Per `AGENTS.md` and `docs/PRODUCT-AND-LAUNCH-PLAN.md` (sections 4 and 5), a
Qubix-specific schema must be audited and the target project authorised by the
founder before any migration is applied. Nothing here has been run against a live
or shared database. It was validated only on a disposable local Postgres (see
[Validation](#validation)).

## Purpose

Record the things worth recording across the whole product, end to end, in one
coherent model: who the learner is and what they prefer, what they consented to,
what content exists and which version is published, what the learner did and
learned, what they are entitled to, and what administrators changed. Each concern
is a separate group of tables so that access can be scoped tightly.

## Principles

These come straight from the product plan's data and security rules and are
enforced in the SQL, not just described here.

- **Row Level Security on every table.** A learner can read and write only their
  own rows. Published content is world-readable; drafts are not.
- **Data minimisation.** Identity (name, email, avatar) stays in `auth.users`;
  it is not copied. No free-text learner input reaches the database — answers are
  fixed option keys. `profiles` holds preferences and the 13+ acknowledgement,
  nothing more.
- **No service-role key in the client.** Server-only writes (store billing,
  publishing, audit) use the service role, which bypasses RLS. Those tables carry
  no `anon`/`authenticated` write grant, so the public key cannot perform them.
- **Founder authority is in the database.** Only an administrator whose role is
  `owner` may record a lesson as `APPROVED` or `RELEASED`; a trigger raises
  otherwise. AI and ordinary admins cannot self-approve curriculum.
- **Separation of concerns.** Identity, consent, content, learning records,
  entitlements and audit are distinct table groups with distinct access rules.

## What already exists (referenced, not recreated)

- `auth.users` — Supabase-managed identity (Google sign-in).
- `public.learner_progress` (migration 0002) — one compact JSON progress snapshot
  per learner. The new `learning_events`/`exercise_attempts` tables complement it
  with an append-only history for mastery and review features; they do not replace
  it.
- `public.account_deletion_requests` (0001) and
  `public.fulfil_my_account_deletion()` (0003) — the working erasure route. Every
  new per-learner table uses `on delete cascade` on `auth.users`, so that
  function erases them when it removes the auth user.

## The tables

### Identity and preferences
- `admins` — named administrative principals; `role` is `author`, `reviewer` or
  `owner`. The first `owner` is seeded out of band with the service role; there is
  no client write path.
- `is_admin()` — membership test used by admin-gated policies (security definer,
  so policies do not recurse).
- `profiles` — per-learner `theme`, `locale`, `reduced_motion`, `age_confirmed_at`.

### Consent
- `consent_records` — append-only history of `analytics` / `newsletter` /
  `functional` decisions, each with `policy_version` and `source`. Withdrawal is a
  new row with `granted = false`.

### Content catalogue (public reads released rows; admins write)
- `subjects`, `topics`, `learning_paths` — the browse structure.
- `lessons` — one row per Bite-sized Board, keyed by its stable id (e.g.
  `DSA-SEQ-001`), carrying `curriculum_status` from the declared review vocabulary.
- `path_lessons` — ordered membership of lessons in a path.

### Publishing and provenance
- `lesson_versions` — immutable published payloads (`content` jsonb, sanitised
  structured data — never executable code), with `content_schema_version`,
  `minimum_app_version` and a `checksum`. A new version is a new row.
- `release_manifests` + `release_lessons` — atomic releases; at most one manifest
  is `is_current`, and that is what clients fetch.
- `lesson_sources` — source edition, passage and territory provenance per the
  source protocol (`docs/AGENT-ONBOARDING.md` section 7). Admin-only.
- `curriculum_status_events` — append-only history of status decisions;
  `APPROVED`/`RELEASED` require the founder (`owner`).

### Learning records (append-only, per learner)
- `learning_events` — lesson/mission/section milestones and XP.
- `exercise_attempts` — one row per check attempt; `choice_key` is a fixed option
  id, `is_correct`, `attempt_no`, `first_try`. No free text.

### Commercial entitlements
- `entitlements` — server-verified `qubix_plus` status per learner. Learner-
  readable; written only by the service role from verified store billing. No card
  or payment-instrument data is stored.

### Audit
- `audit_log` — append-only record of publishing and administrative actions.
  Admin-readable; service-role written.

## Deletion

Every per-learner table (`profiles`, `consent_records`, `learning_events`,
`exercise_attempts`, `entitlements`) references `auth.users(id)` with
`on delete cascade`. The existing `fulfil_my_account_deletion()` deletes the auth
user, which cascades all of them, so erasure stays complete as the schema grows.

## Privacy impact — must be handled before adoption

Adopting this schema introduces data categories the current
[`DATA-INVENTORY.md`](./DATA-INVENTORY.md) does not yet cover: structured learning
events and attempts, consent records, and subscription entitlements. Before any of
these are collected in production:

- update `DATA-INVENTORY.md`, the Privacy Policy and both stores' data-safety
  declarations to describe them;
- set retention periods (still an open item in the inventory);
- confirm the analytics/consent decisions the inventory flags.

## Validation

The migration was applied to a **disposable local Postgres 16** with a small shim
that provides the Supabase objects it depends on (`auth.users`, `auth.uid()`, the
`anon`/`authenticated` roles). No live or shared database was touched. Verified:

- clean apply, and a clean second apply (idempotent);
- 17 tables, all with RLS enabled, 32 policies;
- a learner can insert and read only their own `profiles` row, not another's;
- an `owner` can record `APPROVED`; a non-owner is refused by the authority
  trigger;
- a signed-out visitor reads only `RELEASED` lessons and cannot read `profiles`;
- at most one `release_manifests` row can be `is_current`.

## How to adopt (founder decision)

1. Audit this file against the current curriculum and privacy model.
2. Authorise the target project (`Qubix Production`, or a staging project first).
3. Apply `supabase/qubix/` migrations in numeric order in that project.
4. Seed the first `admins` row with `role = 'owner'` using the service role.
5. Update the privacy documentation above before collecting the new categories.

Applying migrations, seeding the owner and connecting any project remain founder
actions; this document and the SQL do not perform them.
