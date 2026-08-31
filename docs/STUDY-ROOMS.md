# Matched study rooms inside Qubix

Status: **validation prototype**. Not a released social product. Not curriculum.
Last updated: 2026-08-31

This is the Qubix-shaped reading of the matched-AI-study-room brief. The
atomic unit of value is the **session**, not a profile. Production still opens
on the data-science foundation path. Study rooms sit beside reading and
missions; they do not replace them and they do not mark any board `APPROVED`.

## Why this belongs here

People already arrive at Qubix to learn data science. Volume 0 already names
topic atoms (one reading session = one idea). Ask Qubix already chairs 1:1
without dumping answers. The missing piece in the brief is match + timed room +
intent split + skill bands, not another chatbot and not a feed.

Beachhead pond: learners on Shared Foundations (data, numbers, quality,
statistics, SQL, Python, explaining). Not a medical catalogue, not voice, not a
public graph.

## What shipped in this slice (§19 must, scoped)

| Brief must | Qubix implementation |
|---|---|
| Auth | Device identity (name + age band). Cross-device accounts stay gated until a founder-authorised session store exists. |
| Invite links | `/study/rooms/{code}` |
| Room: text + timer + facilitator | 40-minute text room, local chair, agenda, notes, check card |
| Intent + topic field | Four intents; atoms derived from Volume 0 sessions |
| Recap persist + delete/export | localStorage notebook, download, delete |
| Manual / dumb match | Intent + atom + band + 60–90s probe; bots fill empty seats |
| No-train API flags | No vendor model is called. Chair is on-device, like Ask Qubix. |

Homepage of `/study` is the next seat, not a wall.

## What is deliberately not here

Voice, whiteboard canvas, teacher packs, medical catalogue, public social graph,
generated video, custom models, marketplace of tutors, inherited Supabase
realtime, stranger voice match.

Live chat across the public internet needs a founder-authorised encrypted
session store. Until then, two tabs on this browser share a room; a remote
friend uses a call plus this timer, or opens their own seat on the same atom.

## Privacy copy (product promise)

> We keep your rooms so you can continue. We don’t train on your chats, don’t
> put them in a feed, and don’t advertise what you got wrong.

Minors (13–17): friends rooms and bot seminars only. Qubix is not for under-13s.

## Curriculum boundary

No new Bite-sized Board. No status change. Atoms are pointers at existing
`AI_DRAFT` sessions. The chair may quote Qubix Foundations; it may not invent
pack content.

## Open founder questions (from the brief)

1. First recruiting pond inside Qubix: first briefing cohort, a Superstore
   exam Discord, or a later residency-style group?
2. Voice stays out until rebook and payment signals exist (this slice: text).
3. Will the founder chair the first handmade rooms in parallel with this UI?
4. Under-18 stranger matching stays off; confirm if 13–17 friends rooms are
   wanted in the first public test.
5. Name: the surface is just “Study rooms”. “Study again with these people” is
   the only social object.

Do not expand past this slice until show-up, finish, rebook and a £9/6-session
signal exist.
