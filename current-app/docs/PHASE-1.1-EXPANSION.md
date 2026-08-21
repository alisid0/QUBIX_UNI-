# Phase 1.1 expansion: the workshop learning loop

Status: shipped candidate  
Release surface: Home, Workshop, W Score, progress sync  
Backend migration: none

## Product goal

Phase 1.1 turns the Learn First / Solve First method into a repeatable learning
loop:

```text
Learn First → Solve First → next-day Recall
```

The aim is useful return behaviour. A learner should come back because the app
knows the next step in an unfinished concept, not because it adds a generic
notification or an unrelated streak mechanic.

## Learner experience

### 1. One next useful action on Home

Home keeps a single primary action. The priority is:

1. a due recall for a completed workshop pair;
2. due Building Block recall;
3. the missing half of a started Learn First / Solve First pair;
4. an in-progress topic;
5. the five-minute daily mix.

This means the app can resume a learning intention across sessions without
turning Home into a dashboard of competing buttons.

### 2. Paired workshop progress

Every published Solve First journey is paired with its existing Learn First
module. Workshop cards show:

- `0/2` when neither route is complete;
- `1/2` when either Learn First or Solve First is complete;
- `2/2` when the concept has been completed in both directions;
- whether the completed pair has a recall due or scheduled.

Home can deep-link directly into the missing route.

### 3. Workshop recall

Completing both directions schedules a short recall one day later. The learner
must reconstruct:

1. the concept's core rule;
2. the evidence or result that proves it.

An honest successful recall moves to 7 days, then 21 days. “I need another run”
returns the concept the next day. This follows the same interval shape already
used by Building Block recall.

### 4. Weekly summary

Home shows total paired-route progress. W Score reports:

- workshop routes completed this week;
- pairs completed this week;
- paired recalls completed this week;
- total completed pairs.

These are learning measures. Phase 1.1 does not add public leaderboards,
punitive streak loss, or time-on-app targets.

## Progress and Supabase contract

Phase 1.1 does not require a schema or RLS change.

Workshop route completion already uses `user_w_events`:

- `workshop:<moduleId>` records Learn First completion;
- `discovery:<discoveryId>` records Solve First completion.

Paired recall adds two event types:

- `pair_recall_pass`;
- `pair_recall_retry`.

The event reference stores the module, recall stage and unique attempt time.
The existing signed-in progress pipeline syncs these events to the production
Supabase project under the table's current per-user RLS policies. Guest progress
continues to work locally and merges through the existing account hydration
path after sign-in.

No public course content, user table, authentication configuration or
production Supabase schema is changed by this phase.

## Product measures

The first useful measures for Phase 1.1 are:

- percentage of learners completing the second route after the first;
- median time from first route to completed pair;
- percentage of completed pairs recalled the next day;
- 7-day return rate among learners who start a pair;
- number of concepts recalled, not raw session duration.

Instrumentation beyond the existing private progress records belongs in a
separately reviewed analytics change.

## Technical map

- `src/lib/content/solveFirst.js` — paired concept labels and mappings
- `src/lib/content/expansion.js` — pure pair, recall and weekly-summary logic
- `src/lib/stores/progress.js` — recall recording and synced progress API
- `src/views/Home.svelte` — next action, loop progress and recall sheet
- `src/views/WorkshopLab.svelte` — route progress and direct route opening
- `src/views/WScore.svelte` — weekly workshop summary
- `tests/expansion-program.mjs` — deterministic scheduling and summary checks

## Phase 1.2 candidates

These are intentionally not part of 1.1:

- notifications or email reminders;
- public sharing, referrals or competitions;
- paid-plan gates;
- new Supabase tables or analytics events;
- a content-authoring workflow for generating new pairs;
- personalised recall questions generated from learner answers.

The next phase should be chosen from observed completion and return behaviour,
not added automatically.
