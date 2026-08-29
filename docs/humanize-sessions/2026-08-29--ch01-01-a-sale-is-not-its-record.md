# Humanize session — ch01.01, A sale is not its record

Date: 2026-08-29
Founder: alisid0
AI or reviewing voice: primary AI interviewer (Claude, Opus 5)
Route: `/learn/data-foundations/chapter/1/session/1`
Identifier: chapter 1, session 1, `id: representation`
Status before: `AI_DRAFT`
Status after: `AI_DRAFT` — unchanged. No curriculum status moved in this session.

## What the learner was meant to understand

A purchase happens in the world. The checkout then creates a record that describes
part of it. The two are connected and are not the same thing. Within that record,
three kinds of value arrive by three different routes: a barcode is observed as it
happens, a price already exists in storage and is looked up, and a line total is
calculated from the other two.

## Founder questions and reactions

The founder did not open with a question about the words. After the unit was frozen
and the route handed over, they redirected the session to illustration:

> "give me prompts so that I can make images of someone buying something, and then
> the barcode getting scanned and the whole process ... the style of drawing can be
> a doodle type of drawing"

Subsequent reactions, in order:

- On the first frame they generated: *"need this as the reference and character
  accuracy ....... i need consistency and accuracy"*
- After producing a two-character turnaround: *"i will use them both in each of the
  generations as reference images ... so give prompts for everything apart from the
  character"*
- After three frames existed: *"these shall be there ...... and there can be just one
  more ........... just the till saving the information (no need to show that with
  the absurd analogy)"*
- On the first attempt at the fourth frame: *"??"*
- On the corrected fourth frame: *"this is good"*

## What the conversation clarified

**The founder's eye corrected the AI's prompt four times, and was right each time.**
The first style block asked for uneven felt-tip linework, fills that overshoot their
outlines, faces with no detail, and 16:9. What the founder actually generated was fine
even-weight pen line, fills contained inside outlines, small real faces, and 9:16. The
prompts were rewritten to describe the reference rather than the intention.

**The rule that made the style work was never stated in any prompt.** Roughly one
object in five carries colour; everything else is outline only. The founder's first
frame taught it. It is now the first rule in the style lock.

**Describing characters in words while also supplying reference images is what makes
faces drift.** Once the founder produced a turnaround, every prompt was rewritten to
carry only camera, action, props and empty space, naming people by role and never by
appearance.

**The narrative analogies were wrong for this material.** Frames showing a till growing
a cartoon arm to reach into a filing cabinet, and a mechanical adding machine, were cut
by the founder. The three frames that existed had established a calm, plausible register
and the analogies would have broken it.

**Over-constraining a prompt can destroy the subject.** The fourth frame first came back
reading as a desktop printer, because the prompt said "no buttons with markings, no
keypad detail" as a guard against text. A grid of *blank* keys carries no text and is the
single feature that makes a till read as a till. Adding it fixed the frame.

## Amendments requested

None to the reading. No learner-facing word of ch01.01 was changed, proposed for change,
or edited in this session. The unit remains exactly as it was frozen.

## Files changed

None in the repository, other than this record. The illustration work lives in an
external artifact holding the prompt set, the reference instruction and the style lock.
The four generated frames are held by the founder and are not yet in the repository.

## Source or prerequisite impact

None. `sources` for this session still lists the W3C PROV Overview only, and the
prerequisite chain is untouched.

## Reading test

**Not performed.** The founder did not read the reading aloud or record friction in its
words. The session moved to illustration before Step 2 of the interview cycle. The
reading questions that opened the session are still outstanding.

One defect was found while freezing the unit and is recorded here rather than fixed:
the figure's `caption` field, *"One purchase, three steps into data"*, is present in the
content but does not render on the page. The figure's `note` does render. Not
investigated, not changed.

## Interaction test

**Not performed.** The Process a Sale mission at `?mode=game&mission=checkout` was
confirmed to be linked and reachable from the page, but was not played, and its
wrong-answer feedback was not reviewed.

## Founder decision

The founder said *"this is good"* of the fourth illustration frame, and *"these shall be
there"* of the first three. Under `Humanize.md` §9 that is not a curriculum approval and
none is recorded. The four frames are accepted as good work; they are not approved
learner material, they are not in the repository, and ch01.01 remains `AI_DRAFT`.

## One next action

Build the deterministic SVG overlay layer for the four frames, so the barcode, `£3.40`,
`2 × £3.40 = £6.80` and the four kept fields are computed from the same lesson data the
worked example prints, per the media rule. The alternative next action, and the one the
session was originally opened for, is to return to Step 2 and read the words.
