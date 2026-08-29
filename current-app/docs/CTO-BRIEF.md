# CTO Brief — Strata

> **DATED HISTORICAL BRIEF.** Counts, architecture, visual direction, and
> missing-media claims below are not current. Use
> `docs/SOURCE-OF-TRUTH.md` and rerun `pnpm run audit:live-media`.

Welcome. You're the CTO. You don't need to know how to code to do this job well — you need to understand *what we're making, where we are, what's left, and where the risks are*. This document explains all of it in plain English. Nothing here assumes you know the jargon. Where a technical word is unavoidable, it's explained the first time.

Take your time with it. It's long on purpose — you asked for every aspect.

---

## Part 1 — What are we actually building?

Imagine the best teacher you ever had. The kind who could explain something hard — like *why a car crumples in a crash* — without making you feel stupid, using a story instead of a textbook.

Now imagine that teacher lives in your phone, and instead of one lesson, they can walk you through all of physics, maths, and chemistry, one small idea at a time.

That's **Strata**.

It's an app for students (roughly ages 9–16) to learn science the way you'd actually want to be taught: in small, friendly, swipeable cards. Like flicking through Instagram stories, except each one teaches you something real.

### What a "card" is

A card is one single idea on one screen. For example, a card might explain "things don't move on their own unless something pushes them." That's it. One idea, plainly said, with a hand-drawn chalkboard picture.

The student **swipes sideways** to go to the next idea — just like swiping through photos.

### The clever bit: digging deeper

Here's what makes Strata different from flashcards. Every card has *hidden depth*.

If a student reads a card and thinks "okay, but *why* is that true?" — they can **tap to dig deeper**. The same idea opens up into a more detailed layer. Tap again, it goes deeper still. The layers go, roughly:

1. **The idea** — the simple version (often just a picture).
2. **A real example** — something concrete, like a bus pulling away from a stop.
3. **The proper definition** — what scientists actually call it.
4. **Seeing it in action** — how it plays out in the real world.
5. **The formula** — the actual maths, for students who want it.

A curious kid can go all the way down. A nervous kid can stay at the top and still learn something. **Nobody is forced into the deep end, but the deep end is always there.** That's the whole philosophy.

We describe this with two directions of movement:
- **Sideways = the next idea.**
- **Downwards = deeper into this idea.**

### Why this matters as a business

Most learning apps are either too shallow (cute but you don't actually learn) or too intimidating (a wall of text). Strata is built so the *same card* serves the scared beginner and the keen learner. That's rare, and it's the thing worth protecting.

---

## Part 2 — The single most important thing to understand

If you remember one thing from this brief, make it this:

> **The content is the treasure. The app is just the box it comes in.**

Here's why. Writing 8,000 genuinely *good* teaching cards — clear, accurate, in a consistent friendly voice, each with the right picture — takes a very long time and real skill. That library of cards is what nobody else can copy quickly.

The app itself — the thing that displays the cards and lets you swipe — could be rebuilt from scratch in about a month if it ever broke. The cards would take *years* to rewrite.

So every decision we make protects the cards. We never let the cards get trapped inside the app in a way that's hard to move. We treat them like a separate, precious archive.

**As CTO, your instinct should always be: "Does this protect the content library?"** If yes, lean toward it. If it risks locking up or losing the cards, be cautious.

---

## Part 3 — How far along are we? (The honest status)

Think of building this like building a restaurant. You need the *recipes* (the cards), the *kitchen* (the technology that serves them), and the *dining room* (the parts customers see — sign-up, menus, the experience). Here's where each stands.

### The recipes (content) — early but real
- **37 cards exist**, fully written and polished, covering the beginnings of physics, maths, and chemistry. They've been carefully edited to sound human, not robotic.
- **11 of those 37 have their hand-drawn chalkboard pictures.** The other 26 are written but still need their illustrations drawn.
- This is a small fraction of the eventual goal (thousands of cards), but it's *proof the formula works* — the hardest part, finding the right voice and structure, is done.

### The kitchen (the technology) — a working prototype
- There is a **working app** you can open right now, swipe through, and dig into the layers. It runs. It's been tested.
- Right now it's built in the simplest possible way: everything lives in **one single file**. That's fine for a prototype — like running a pop-up restaurant out of one cart. It works, but we'll need a bigger kitchen as we grow.
- It needs no special equipment to run, and it's nearly free to host.

### The dining room (the customer experience) — designed, not built
- We have **detailed designs** (drawings/mock-ups) for the parts customers will see: signing up, logging in, a "map" showing what you've learned, and a leaderboard to compete with friends.
- These are *designs only* — pictures of what it should look like. None of it is built into the real app yet. Think blueprints, not walls.

### What's purely a plan (not started)
- **Quizzes** — to test what students learned. Designed in concept, not built.
- **Saving progress** — remembering who you are and what you've learned. This needs a "database" (a place to store information — explained more in Part 6). Planned, not built.
- **Accounts** — the actual working sign-up and login. Designed, not built.

### One-line summary
> We have a working prototype that proves the idea, a small but high-quality set of cards, and clear plans (with designs) for everything else. We are at the very beginning of a long content-writing journey, but the foundation is solid and nothing is broken.

---

## Part 4 — How we organise the cards (the structure)

This is the part that makes Strata more than a random pile of cards. We organise them along a few different lines at once. Don't worry about memorising these — just understand that *structure exists* and why.

### The two pyramids

Picture two pyramids standing on their **wide base** (wide at the bottom, narrow at the top).

**Pyramid 1 — Learning.** The wide base is the *beginner* stuff: lots and lots of simple cards that introduce ideas gently, without scary formulas. As you climb toward the narrow top, there are fewer cards and they get more advanced and formal.

**Pyramid 2 — Testing.** A matching pyramid for quizzes and tests. The base has lots of gentle, frequent little quizzes; the top has fewer, harder exams.

The two pyramids mirror each other: every level of learning has a matching level of testing.

**Right now, we are entirely at the base of both pyramids** — introducing beginner ideas in plain language. Everything we build later sits on top of this foundation. We call these levels "tiers," starting at tier 0 (the base).

### The other ways cards are sorted
- **By subject** — physics, maths, or chemistry.
- **By topic** — e.g. "forces," "fractions," "the atom."
- **By "what you need to know first"** — some cards build on others, like steps on a staircase. A card on advanced motion knows it needs the basic motion card to come first.
- **By "path"** — a *path* is a curated journey: a handful of related cards in a sensible order that take you through one topic start to finish. Progress and mastery are tracked per path, not per single card.

The important takeaway: **a card isn't just floating in space. It knows its subject, its difficulty, what comes before it, and which learning journey it belongs to.** That structure is what will eventually let the app say things like "you've mastered Forces, here's what to learn next."

---

## Part 5 — How students will progress (the "mastery" idea)

We don't just want students to *read* a card and move on. Reading something once and forgetting it is useless. So we designed a system that tracks how *well* someone actually knows a topic, based on what they do over time.

A learning journey (a "path") moves through six stages:

1. **Wandered** — they opened it once. (Just curious.)
2. **Checked** — they went through all the related cards in the path.
3. **Well read** — they took the quiz and passed.
4. **Recalled** — they came back about a week later and revisited it. (Proving it stuck.)
5. **Mastered once** — they aced the quiz (9 out of 10 or better).
6. **Mastered twice** — about a month later, they revisited the whole path *and* aced the quiz again. (Now it's genuinely theirs.)

The clever idea baked in here: **real learning needs time and repetition.** By rewarding someone for coming back a week and a month later, we encourage the habits that actually make knowledge stick, instead of cramming-and-forgetting.

From these stages we'll calculate three scores for each student: a **reading score** (how much they've explored), a **testing score** (how well they do on quizzes), and a **recall score** (how well they remember over time). These feed the "map" and the leaderboard.

*Status: this whole system is designed and written down, but not built yet. It needs the quizzes and the progress-saving (database) first.*

---

## Part 6 — The technology, explained simply

You'll hear these names. Here's what each one actually does, in plain terms. Think of building the app like building and opening a shop.

- **Claude Code** — a very capable AI assistant that writes the actual computer code for us, by instruction. Think of it as a fast, tireless builder you direct in plain English. *This is how we build, instead of hiring a large team upfront.*

- **GitHub** — a safe, organised filing cabinet for all our work, that also keeps a complete history of every change. If we ever break something, we can rewind. Think of it as "track changes" for the entire project, plus the master copy everyone works from.

- **Vercel** — the service that takes our app and *puts it on the internet* so people can actually visit it on their phones. Think of it as the company that rents us the shop space and puts our sign on the street. (It's cheap or free at our size.)

- **Supabase** — a **database**, which is just an organised place to store information that needs to be remembered: who the users are, what they've learned, their scores. Think of it as the shop's back-office ledger and customer records. *We're deliberately NOT using this yet — see Part 7.*

Put together, the flow is simple:
> We instruct **Claude Code** to build → the work is saved in **GitHub** → **Vercel** puts it online → and eventually **Supabase** remembers everyone's progress.

That's the entire technical stack. It's modern, it's inexpensive, and it's enough to build a real product. You don't need more than this for a long time.

---

## Part 7 — The plan: what we do, in what order

Here's the sequence, and the reasoning behind it. The golden rule throughout: **do the smallest useful thing, see it work, then build the next thing.** Avoid building lots of machinery before we've proven people want it.

### Step 1 — Get the existing app onto the internet (this week)
We already have a working prototype with 37 cards. The very next move is simply to **put it online and open it on a real phone.** Swipe through it like a real student would.

*Why first:* it costs almost nothing, it's quick, and the moment you can use your own product on your own phone, everything stops being theoretical. You'll instantly see what feels good and what's missing. Founders who skip this stay stuck in planning forever.

### Step 2 — Draw the remaining 26 pictures
The cards are written; 26 still need their chalkboard illustrations. This is straightforward, doesn't need any complex technology, and makes the app feel complete and polished.

### Step 3 — Separate the cards from the app (the important one)
Right now the cards live *inside* the app's single file. We want to move them *out* into their own neat files — one per topic — so the cards become a separate, portable archive.

*Why this matters (remember Part 2):* this is how we protect the treasure. Once the cards live separately, the app just "reads" them. We can change or rebuild the app without ever touching the precious card library. It also makes it dramatically easier to add the next thousand cards.

This is the most architecturally important early step. It should be done carefully, with a clear plan from our system-design person, not rushed.

### Step 4 — Build the customer-facing screens
With the designs we already have, build the real sign-up, login, the learning "map," and the leaderboard. This turns the prototype into something that feels like an actual app you'd download.

### Step 5 — Build quizzes and start saving progress
Add the quizzes, and bring in **Supabase** (the database) so the app remembers who you are and what you've learned. This is when the "mastery" system from Part 5 comes alive. We hold this until we genuinely need it — saving progress only matters once we have real users worth saving progress *for*.

### Step 6 — Write cards, relentlessly, forever
Once the machine works end-to-end for one topic, the main job becomes *producing cards* — the treasure. The realistic vision is thousands of cards across four subjects (adding biology eventually). This is the long game, and it's where the lasting value is built.

### The mindset, summed up
> Think like a newspaper, not a software company. Every day: write a few cards, review them, publish them, students learn. The technology should fade into the background and just *work*. The product is the teaching, not the code.

---

## Part 8 — Risks and honest watch-outs

A good CTO knows where the bodies are buried. Here's what to keep an eye on.

- **The temptation to over-build.** The biggest risk isn't technical failure — it's spending months building fancy features (databases, dashboards, logins) before proving students actually want to learn this way. Push the team to *ship small and test* before building big. Step 1 exists to fight this.

- **Protecting the content.** As we grow, always make sure the cards stay portable and backed up (they're safe in GitHub now). Never let them get locked into one tool we can't get them out of.

- **AI-built code needs review.** We build fast using AI (Claude Code), which is a huge advantage — but AI can make subtle mistakes. (A real one already happened: a small slip silently broke six cards until it was caught and fixed.) The lesson: *always actually look at the result*, open the app, click around, confirm it works. Speed is great; blind trust isn't.

- **Consistency of voice.** Our cards have a specific, carefully-built personality: plain, warm, never showing off, never robotic. As more people (and AI) write cards, this voice can drift. We have it written down as rules. Guard it — a library of 8,000 cards that don't sound like each other is worth far less than 8,000 that do.

- **Decisions still open.** A few structural choices haven't been finalised (small things like exactly how difficulty levels are labelled, and how the learning journeys overlap). These are written down and waiting for a decision. They're not urgent, but don't let them drift forever — unmade decisions quietly slow everything down.

- **It's still very early.** Be honest with yourself and any investors: we have a strong *prototype* and a strong *plan*, not a finished product. That's a good place to be — but the long content-writing road is still almost entirely ahead.

---

## Part 9 — Your one-page mental model

If you forget everything else:

- **What:** a phone app that teaches science in small, swipeable, friendly cards you can dig deeper into.
- **The treasure:** the cards. Thousands of them, eventually. The app is just the box.
- **Where we are:** a working prototype, 37 good cards (11 illustrated), and clear designs for the rest. Early, but solid.
- **The tech:** AI builds it (Claude Code), GitHub stores it, Vercel puts it online, Supabase will remember users later. Cheap and modern.
- **The plan:** put it online this week → finish the pictures → separate the cards from the app → build the customer screens → add quizzes and saving → then write cards forever.
- **The rule:** ship small, see it work, protect the content, guard the voice, don't over-build.

That's the whole company in nine parts. Welcome aboard.
