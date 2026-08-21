# Strata Launch Control

This file is the launch command center. The rule for launch is simple: no more topic expansion unless it fixes a clear gap. The work now is polish, trust, retention, and quality control.

## Launch Position

Target: limited public release in the next couple of weeks.

Launch promise:
- Learn science, mathematics, and computing through short BBs.
- Prove understanding through workshops.
- Build confidence without punishment.
- Make progress feel visible through Ws, streaks, badges, and completion.

Launch scope:
- Computer Science
- Mathematics
- Physics
- Chemistry
- Current topic set only, with improvements where needed

Do not add:
- New major topic branches
- Large new curriculum paths
- Complex monetization features
- Heavy social systems
- Punitive streak mechanics

## Reward Rules

Launch reward model:
- Correct answer: +3 Ws
- User can retry until correct
- No penalty for wrong answers
- No shame language
- Workshop completion bonus: +10 Ws
- Topic completion bonus: +25 Ws and badge
- 48-hour streak continuation bonus: +15 Ws
- First workshop in a 48-hour window: +5 Ws

Design principle:
- Ws should reward effort and return behavior.
- Wrong answers should feel like practice, not failure.
- Streaks should encourage return without punishing normal life.

Post-launch reward ideas:
- Weekly streak badges
- Topic mastery badges
- Workshop perfect-run badge
- Comeback bonus after absence
- Seasonal challenges
- Unlockable visual themes

## Highest Priority Workstreams

### 1. Visuals And GIFs

Priority: highest

Reason: this is likely the most time-consuming launch task and the fastest way to make the app feel premium.

Rules:
- Every launch-important topic needs a strong visual anchor.
- Not every BB needs an image.
- GIFs are only for motion, sequence, transformation, flow, switching, or cause and effect.
- Static images are enough for most concepts.
- Snippets need their own small images where they teach or aid memory.

Visual types:
- Static image: concept anchor, object, diagram, metaphor, scene
- GIF: current flow, logic gates, heat transfer, waves, transformations, algorithm steps
- Three.js: spatial concepts, 3D structure, geometry, optics, molecules, fields
- PixiJS/canvas: fast mini-games, draggable cards, sorting, simple simulations

Immediate visual priorities:
- Computer Science: binary, logic gates, hardware, networks, AI behind the curtain
- Mathematics: matrices, functions, trigonometry, differentiation
- Physics: units and dimensions, electricity, optics, thermodynamics
- Chemistry: atom, molecule builder, bonding, moles
- Snippets: memory-card style image for important references

Tracking columns:
- Topic
- BB id or snippet id
- Current visual status
- Visual needed: none/static/GIF/interactive
- Prompt written
- Asset created
- Asset attached
- Mobile checked
- Desktop checked
- Final status

## 2. Audio Pipeline

Priority: highest after text lock

Rule: generate audio only after text is final. Do not generate audio for text that may still change.

Audio quality checklist:
- Same voice style across subjects
- Warm, calm, confident delivery
- Correct pronunciation of technical terms
- No mismatched BB/floor audio
- No clipped start or ending
- No dramatic overacting
- No noisy background
- Replay and mute controls work
- Audio does not block reading

Recommended file naming:
- `bb-{id}-floor-{n}.mp3`
- Example: `bb-1132-floor-1.mp3`
- Snippets: `snippet-{id}.mp3`

Audio pipeline:
1. Lock BB floor text.
2. Export audio script list.
3. Generate audio in batches.
4. Save with predictable filenames.
5. Attach audio to BB/floor metadata.
6. Listen-check technical terms.
7. Test playback on mobile and desktop.

Human/freelancer task:
- Listen to every audio file.
- Mark pronunciation errors.
- Mark mismatched floor/audio pairs.
- Mark pacing problems.

## 3. Design System Polish

Priority: high

The app needs one coherent visual language before more workshop complexity is added.

Design areas to lock:
- Color grading
- Subject colors
- Topic grid cards
- Icon style
- Workshop layout
- BB reader layout
- Snippet card layout
- Completion states
- Reward animation
- Empty/loading/error states
- Mobile and desktop spacing

Design standards:
- The app should feel premium, focused, and tactile.
- It should not feel like a generic AI-generated dashboard.
- Cards should not crowd the screen.
- Topic selection must scale to many topics.
- Workshop controls must be obvious without explanatory text.
- Icons should be consistent in style and weight.

Immediate design tasks:
- Audit color palette for consistency and contrast.
- Create one icon direction for subjects and topics.
- Refine workshop top navigation and topic grids.
- Make reward moments feel satisfying but quick.
- Give snippets a distinct visual identity.

## 4. Workshops And Games

Priority: high

Workshops are the proof layer. They should make users feel, "I actually understood that."

Current launch rules:
- Options must randomize.
- No `[object Object]`.
- Every workshop must complete cleanly.
- Every correct answer gives +3 Ws.
- Retry is allowed.
- Difficulty should be medium, not childish.
- Mobile layout must be excellent.
- Desktop layout must be excellent.

Workshop formats to expand:
- Quiz with retry
- Drag and drop sorting
- Match pairs
- Fill missing value
- Build/repair a system
- Toggle switches
- Timeline/order steps
- Diagram labeling
- Molecule builder
- Matrix transformer
- Circuit builder
- Ray optics bench
- Heat transfer simulation
- AI token predictor
- Network packet route game

Creative direction:
- Short loops like TikTok, but with real learning.
- Every 30-90 seconds should produce a small win.
- Avoid long text explanations inside workshops.
- Make the user manipulate the idea, not just answer about it.

## 5. Snippets

Priority: medium-high

Snippets should become memory cards, not just extra text.

Snippet standard:
- Short title
- One small visual
- One sharp idea
- Link back to related BB
- Optional "tap to reveal" detail

Snippet visual needs:
- Inventors and historical references
- Key equations
- Important diagrams
- Analogy images
- Mini concept maps

Launch requirement:
- Priority snippets should have images.
- Non-essential snippets can remain text-only for launch if clean.

## 6. Content Tone And Text Lock

Priority: high

No audio until text is locked.

Audit checks:
- Remove AI-sounding phrases.
- Avoid too much "you".
- Prefer "we" or neutral explanation when direct address feels heavy.
- Remove repeated metaphors.
- Make each first floor instantly clear.
- Keep floors smooth and substantial.
- Avoid technically misleading simplifications.
- Keep beginner-friendly language without sounding childish.

Status labels:
- Draft
- Needs tone pass
- Needs technical pass
- Text locked
- Audio ready

## 7. Supabase And Backend

Priority: high before public launch

Reference file:
- `docs/SUPABASE-USER-DATA-ROLLOUT.md`

Check:
- Auth works.
- Guest or trial behavior is clear.
- User progress saves.
- Ws save.
- Workshop completion saves.
- 48-hour streak logic works.
- Database rules are safe.
- No private keys are exposed.
- Storage paths for images/audio are stable.
- Retry and reset behavior does not corrupt progress.
- User email/Gmail identity stays in Supabase Auth, not public app tables.
- User progress tables have RLS policies using `auth.uid() = user_id`.
- The service role key is never used in frontend code.
- Age is collected as a band, not exact date of birth.
- Engagement time is tracked as active session seconds.
- Issue reports can include user-chosen screenshots only.

Minimum launch data:
- User id
- Ws total
- Workshop attempts
- Workshop completions
- Topic completions
- Last active timestamp
- Streak window status
- Active session minutes
- Issue report metadata

Post-launch:
- Payments
- Subscription status
- Referral tracking
- A/B tests
- More detailed analytics

## 8. Legal, Trust, And Public Pages

Priority: high

Must be ready before public launch:
- Terms
- Privacy
- Contact email
- Refund wording if payments are active
- Copyright ownership wording
- AI-generated media disclosure if needed
- Age/student wording
- Feedback route

Trust polish:
- Make support/contact visible.
- Make privacy wording professional but readable.
- Make data collection clear.
- Avoid overpromising learning outcomes.

## 9. SEO And Launch Marketing

Priority: medium-high

Community reference:
- `docs/DISCORD-COMMUNITY-LAUNCH.md`

Launch assets:
- Homepage title and meta description
- Social preview image
- Short product description
- 30-second demo video
- 5-8 launch screenshots
- Discord/community link if ready
- Feedback form
- Founder launch post
- Short posts for X, LinkedIn, Reddit, Discord
- Discord tester community with bug, content, workshop, and Android testing channels

Positioning:
- Microlearning for science, math, and computing.
- Short explanations plus active workshops.
- Designed for confidence, not exam anxiety.

Discord launch rule:
- Start with personally invited testers before public posting.
- Use Discord for feedback, support, Android testing, bug reports, and release notes.
- Do not fake community activity or pretend simulated leaderboard users are real people.

## 10. QA Gates

Every launch topic must pass:
- BBs open
- Floors are not empty
- Text is clean
- Media loads
- GIFs load if present
- Audio matches text if present
- Workshop opens
- Workshop completes
- Ws scoring works
- Retry works
- Mobile layout works
- Desktop layout works
- No console-breaking errors

Device checks:
- Mobile narrow viewport
- Desktop browser
- Touch interaction
- Mouse interaction

Known warning class:
- Existing Svelte accessibility warnings exist in the build. These should be cleaned when possible, but they are not currently blocking launch if the flows work.

## 11. Android Play Store Pilot

Priority: high

Reference file:
- `docs/ANDROID-PLAY-LAUNCH.md`

Recommended first mobile release:
- Android first through Google Play.
- Use a Trusted Web Activity wrapper around the live Qubix web app.
- Keep web/tablet/iPad as the main version.
- Use Apple App Store after the Android pilot produces real feedback.

Why this route:
- New BBs, edited floors, images, GIFs, audio, and existing workshop formats can update through the web/backend without forcing Play Store updates.
- Android users get an app-store install experience.
- The team avoids maintaining two separate products too early.

Store updates should be needed only for:
- Android wrapper changes
- native notification bridge
- Play Billing
- new native permissions
- target SDK requirements
- launcher name/icon changes

Immediate Android blockers:
- Final public domain
- Final package id
- Google Play Developer account
- Support email
- Store screenshots
- Data Safety answers
- Signed Android App Bundle
- Digital Asset Links file after the signing certificate is known

## Two-Week Execution Plan

### Week 1

Goal: lock systems and highest-risk product surfaces.

Tasks:
- Finalize Ws reward behavior.
- Implement/check 48-hour streak logic.
- Audit all workshops for completion and scoring.
- Lock design direction for colors, icons, cards, snippets, and workshops.
- Create visual tracker for all priority BBs and snippets.
- Start image/GIF generation for highest-priority content.
- Lock text for the first launch-important BB groups.
- Prepare audio scripts for locked text only.

Outcome:
- Reward system is clear.
- Workshops are stable.
- Visual/audio workload is mapped.
- Design direction is coherent.

### Week 2

Goal: attach launch assets and run final QA.

Tasks:
- Finish priority visuals.
- Generate and attach priority audio.
- Add snippet images where needed.
- Final mobile/desktop QA.
- Verify Supabase progress, Ws, and streak storage.
- Final legal/privacy/contact review.
- Prepare screenshots and social launch assets.
- Soft launch to 20-50 users.

Outcome:
- Limited release is possible.
- Feedback loop begins.
- Remaining content can ship weekly after launch.

## Delegation Plan

Good freelancer tasks:
- Listen-check audio files.
- Create/clean image and GIF assets from approved prompts.
- QA each workshop on mobile and desktop.
- Check legal pages for typos and clarity.
- Create social screenshots and short demo clips.
- Enter tracker statuses after testing.

Tasks to keep founder/lead controlled:
- Final curriculum decisions.
- Final tone decisions.
- Reward psychology.
- Pricing and positioning.
- Legal approval.
- Brand direction.

## Launch Status Board

| Workstream | Priority | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| Scope freeze | P0 | Founder/Codex | Ready | No new topics for launch unless essential |
| Ws scoring | P0 | Codex | Needs implementation check | +3 Ws for correct, retries allowed |
| 48-hour streaks | P0 | Codex | Needs design/implementation check | Forgiving streak model |
| Workshop QA | P0 | Codex/Freelancer | Needs full pass | Check completion, scoring, randomization |
| Visual tracker | P0 | Codex | Not started | Build table of needed assets |
| Priority images | P0 | Founder/Freelancer | Not started | Start with hero topics |
| Priority GIFs | P1 | Founder/Freelancer | Not started | Only where motion teaches |
| Audio scripts | P0 | Codex | Not started | Only after text lock |
| Audio generation | P0 | Founder/Freelancer | Not started | Needs consistent voice |
| Audio QA | P0 | Freelancer | Not started | Human listening pass |
| Design polish | P0 | Codex | Needs pass | Colors, icons, workshops, snippets |
| Snippet images | P1 | Founder/Freelancer | Not started | Priority snippets first |
| Supabase progress | P0 | Codex | Needs audit | Ws, completion, streaks |
| Legal pages | P0 | Founder/Codex | Needs final pass | Terms, privacy, contact |
| SEO/social assets | P1 | Founder/Codex | Not started | Launch screenshots, preview image |
| Final QA | P0 | Codex/Freelancer | Not started | Mobile, desktop, live app |

## Immediate Next Actions

1. Audit and implement launch Ws behavior.
2. Audit current streak/progress storage and design the 48-hour streak rule.
3. Create a visual/audio asset tracker from current BBs and snippets.
4. Start the design polish pass: colors, icons, topic grids, workshop surfaces, snippets.
5. Run workshop QA subject by subject.
6. Lock text for the first audio batch.
7. Generate priority images/GIFs from approved prompts.
8. Attach audio and media only after text is locked.

## Definition Of Launch-Ready

Strata is launch-ready when:
- The current topics are stable and not visibly draft-like.
- Core workshops work from start to finish.
- Ws rewards feel generous and consistent.
- Important BBs have helpful visuals.
- Priority audio is attached and accurate.
- Snippets are clean and have visuals where needed.
- Supabase saves progress reliably.
- Legal, privacy, contact, and SEO basics are live.
- The app works on mobile and desktop.
- A small user group can test without hand-holding.
