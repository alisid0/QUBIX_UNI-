# Data inventory

Status: **draft for founder and legal review.** Written 2026-08-12 by reading the
code and the migrations, not from a template. Every row below was traced to the
line that collects or stores it, and anything not traced is marked as such.

This document exists because the Privacy Policy and the store data-safety
declarations must describe what the software actually does. Writing those first
and the inventory afterwards is how apps end up declaring things that are not
true.

## Minimum age

**13.** Founder decision, 2026-08-12: Qubix is not for under-13s.

What that settles and what it does not:

- **COPPA (US) does not apply** at 13+, which removes verifiable parental
  consent and the separate children's data path.
- **UK GDPR is satisfied**: 13 is the UK age at which a child can consent to an
  information society service on their own behalf.
- **The EU is not uniform.** Member states set this anywhere from 13 to 16, and
  several require 16. Serving EU learners at 13+ is a decision with residual
  risk, not a settled position. Either accept it explicitly or set 16+ for EU
  traffic. **Still open.**
- **Google Play still requires a target-audience declaration.** Selecting any
  age band below 18 brings parts of the Families policy into scope even at 13+,
  including restrictions on ads and on data collection. Qubix carries no ads,
  which removes most of that surface.
- The age is **stated but not verified.** Since 2026-09-03 `/signin` refuses to
  create an account without a 13+ declaration, which is what both stores expect
  and is the point at which a learner is actually told. It is a statement, not a
  check, and no date of birth is collected.

## What is collected

### 1. Account identity

Collected when a learner signs in, by either route. `SignIn.svelte` offers email
with a password and `signInWithOAuth({ provider: 'google' })`; Supabase stores
the result in `auth.users`. Email and password yields only an address and a
hashed password. The four fields below are what the Google route adds.

| Field | Source | Why |
|---|---|---|
| Email address | Google | Identifies the account; the only way to recognise a returning learner |
| Display name | Google | Shown in the interface |
| Avatar URL | Google | Shown in the interface |
| Google account identifier | Google | Links the sign-in to the account |

**Changed by founder decision, 2026-09-03.** Signing in was optional and is now
required to continue. A visitor may open three items, and the AI tutor needs an
account from the first question. Hubs, the floor map and the deterministic
assistant stay open.

That changes the data-protection posture rather than only the product. Every
learner who continues past three items now has an account, so an email address
is collected from every continuing learner, including those aged 13 to 17. Two
consequences to hold:

- the **lawful basis** for holding an address is now performance of the service
  a learner asked for, not their choice to opt in to a convenience;
- the **open EU age question** above stops being theoretical, because there is
  no longer an anonymous path for a learner in a member state that sets the age
  at 16.

Account deletion remains the exit, and it is operational rather than queued.
See `docs/AUTH.md` for what is gated and where each gate is enforced.

### 2. Learning progress

`learner_progress`, one row per learner, keyed on `user_id`. The `state` column
is JSON and holds exactly:

| Key | Meaning |
|---|---|
| `boardIndex`, `floorIndex` | Where the learner had reached |
| `completed` | Which sections are finished |
| `attempts` | Per-check record of tries and whether it was right first time |
| `updatedAt` | When the record last changed |

No free text is stored. A learner cannot type anything that reaches the
database; every answer is a choice among fixed options.

### 3. Account deletion requests

`account_deletion_requests` holds `user_id`, `requested_at`, `status` and
`fulfilled_at`. Retained after fulfilment as the record that a request was
honoured.

### 4. On the device only

Progress is written to `localStorage` under `qubix-university-progress-v1` before
and independently of sign-in. It never leaves the device unless the learner signs
in. Clearing site data removes it.

## Who else receives it

| Processor | What reaches them | Note |
|---|---|---|
| **Supabase** | Everything in sections 1 to 3 | Database and authentication |
| **Google** | The sign-in exchange | Only when the learner chooses to sign in |
| **Vercel** | Requests to the site: IP, user agent, page | Hosting, and **Vercel Analytics is enabled** in `src/main.js` |
| **OpenAI** | The learner's question, the lesson they are on, and up to four Qubix passages | Ask Qubix. Added 2026-09-02 and missing from this table until 2026-09-05. `store: false` on every call, and a signed-out learner never reaches it at all, because the tutor requires a session. |

**Vercel Analytics must be declared.** It is enabled on every page load and was
inherited from Strata rather than chosen. Whether it is wanted at all is a
founder decision; if it stays it belongs in the Privacy Policy and in both
stores' data-safety forms. Turning it off is one line in `src/main.js` and
removes a third-party data flow entirely.

No advertising networks, no third-party trackers, no payment processor yet.

## Lawful bases, provisional

| Purpose | Basis | Note |
|---|---|---|
| Creating and holding an account | Contract | The learner asks for an account by signing in |
| Saving progress across devices | Contract | The reason the account exists |
| Keeping the site available and secure | Legitimate interests | Hosting logs |
| Usage measurement | **Undecided** | Depends on whether Vercel Analytics stays, and may need consent |

## Retention

**Not yet decided, and this is a gap.** Nothing in the schema expires. Proposed
starting point for review:

- Progress: kept while the account exists.
- Account and progress: erased when a deletion request is fulfilled, by the
  `on delete cascade` already on both tables.
- Deletion requests: kept as proof of fulfilment. Period to be set.
- Hosting logs: as retained by Vercel; their period to be confirmed and quoted.

## Learner rights, and how they are currently served

| Right | Status |
|---|---|
| Erasure | **Works.** `fulfil_my_account_deletion()` erases the learner's progress and auth user and marks the request fulfilled. Migration 0003, 2026-09-02. This row previously said the queue was never drained, which stopped being true and stayed written down. |
| Access / portability | No export exists. Progress is a small JSON object and could be offered as a download cheaply. |
| Rectification | Name and avatar come from Google and change when the Google account changes. |
| Withdrawing consent | Sign out is immediate; local progress remains on the device. |

**The deletion gap is closed.** It was the most serious item in this document
from 2026-08-12 until migration 0003 on 2026-09-02. The remaining right without
a route is portability: there is still no export.

## Open items before any store submission

- [ ] Decide EU treatment at 13 versus 16.
- [ ] Decide whether Vercel Analytics stays.
- [x] Build or document the process that fulfils deletion requests. *(0003, 2026-09-02.)*
- [ ] Set retention periods.
- [ ] Supply legal operator, registered address and contact for Arcave Technologies.
- [x] Add an age statement at sign-up. *(The 13+ declaration on `/signin`, 2026-09-03.)*
- [ ] Legal review of this inventory, the Privacy Policy and the Terms.
- [ ] Terms of Use. The Privacy Policy went live at `/privacy` on 2026-09-05;
      the Terms are still unwritten and the launch plan asks for both.

Nothing in this document is legal advice.
