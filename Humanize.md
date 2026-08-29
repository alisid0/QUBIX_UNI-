# Humanizing Qubix

Status: **Working method for founder-led review**

Authority: **The founder**

Applies to: learner-facing words, examples, illustrations, interactions, feedback and journeys

## Read this first

Qubix already has a large working skeleton. Humanizing it does not mean tearing
that skeleton down, making every sentence casual or decorating every page with a
story. It means making the experience feel as though a thoughtful person is
helping another person understand something worth knowing.

The work happens through founder interviews. The founder reads and uses Qubix as
a real learner. An AI answers questions naturally, helps identify what failed,
and prepares a narrow revision. The founder reads and tests that revision before
deciding whether it is ready.

Conversation is the research method. It is not curriculum approval.

Nothing in this document overrides `AGENTS.md`,
`00-CURRICULUM-DECLARATION.md`, the curriculum maps or the founder review gate.
Only the founder may mark learning material `APPROVED` or `RELEASED`.

---

## 1. What “human” means here

A human Qubix experience gives the learner:

- a reason to care before asking them to remember;
- a recognisable situation before an abstract definition;
- an explanation that answers the question they actually have;
- precise technical language after intuition has somewhere to land;
- permission to pause, predict, make a mistake and reconsider;
- feedback that explains a consequence rather than merely saying “wrong”;
- a visible connection between reading and doing;
- a sense that somebody anticipated their confusion;
- a clear next step when the lesson ends.

Human does **not** mean vague, sentimental, childish or imprecise. A warm
explanation must still preserve the original idea, its boundary cases, its
standard terminology and its evidence.

The test is simple:

> Does this feel like a capable person helping me see something, or like content
> assembled to fill a page?

---

## 2. The unit of work

Humanize one reviewable learning unit at a time: normally one Bite-sized Board,
one lesson session or one tightly connected read-and-play journey.

Do not begin with “rewrite the whole course.” Begin with an exact object:

```text
Path or URL:
Board/session identifier:
Current status:
Reading section in scope:
Mission or interaction in scope:
Reason this unit was selected:
```

Stop when that unit has reached a recorded founder decision. Do not silently
continue into the next unit.

---

## 3. The people in the interview

### The founder

The founder is the real reader, product owner and sole curriculum authority.
The founder may:

- read the material aloud or silently;
- interrupt at any word, heading, example or interaction;
- say what feels cold, confusing, obvious, forced, repetitive or pointless;
- ask the question a learner would actually ask;
- reject a revision without needing to supply replacement wording;
- request amendments;
- approve the completed unit explicitly.

“I do not like this” is useful evidence. The interview should discover why; it
should not argue the reaction away.

### The primary AI interviewer

The primary AI listens first. It answers the founder's question as a patient,
technically careful tutor before trying to rewrite the page.

It must:

- answer in plain language;
- state why the idea matters;
- separate intuition from the formal definition;
- preserve important qualifications and edge cases;
- admit when a claim needs checking;
- distinguish a wording problem from a curriculum or interaction problem;
- record proposed changes as `AI_DRAFT` or `AMENDMENTS_REQUIRED`;
- never infer founder approval.

### Optional reviewing voices

The founder may ask another AI or agent to review the same unit from one named
perspective:

- **Beginner:** finds assumed knowledge and unexplained vocabulary.
- **Teacher:** checks sequencing, analogy and misconception handling.
- **Practitioner:** tests whether the explanation survives real work.
- **Technical editor:** checks accuracy, terminology and internal consistency.
- **Sceptical learner:** keeps asking “Why does this matter?”
- **Product reviewer:** checks whether the learner knows what to do next.
- **Accessibility reviewer:** checks language, controls, motion and presentation.

Every reviewing voice must be labelled. Several anonymous AI opinions must not
be blended into an apparent consensus. The founder resolves disagreements.

---

## 4. The interview cycle

### Step 1 — Freeze and read

Open the current unit without editing it. Record its current text, route and
status. The founder reads from the beginning and uses every visible control.

Do not improve the wording while it is being read. We need to see where the
existing version genuinely causes friction.

### Step 2 — Interrupt naturally

The founder stops wherever a real learner might stop. Useful interruptions
include:

```text
What does this mean?
Why are you telling me this?
Where would I see this in real life?
What problem does it solve?
How is this different from the previous idea?
Why is that example true?
What would go wrong if I misunderstood it?
Is this term standard, or did Qubix invent it?
I understand the sentence, but I still do not understand the point.
This sounds written by AI. How would a person say it?
```

The founder should not polish these questions. Their natural form is part of the
evidence.

### Step 3 — Answer before editing

The AI answers as a tutor in conversation. A strong answer normally follows
this order:

1. the direct answer;
2. why it matters;
3. one concrete situation;
4. the standard term or rule;
5. the important nuance or exception;
6. a small question that checks whether the idea landed.

Do not turn the first answer into finished curriculum prose. Spoken explanation
and readable lesson text are related, but they are not the same form.

### Step 4 — Capture the friction

After the exchange, record what actually failed.

| Signal | Record |
|---|---|
| Exact point | Heading, sentence, control or transition |
| Founder reaction | The founder's own words |
| Underlying problem | Purpose, prerequisite, wording, accuracy, pacing, design or interaction |
| Best explanation | The part of the conversation that made the idea clearer |
| Proposed response | Keep, cut, move, rewrite, illustrate, link, or redesign |
| Risk | Nuance, source, accessibility or dependency that must be protected |

Do not reduce every reaction to “rewrite the copy.” Sometimes the honest fix is
to change the order, add a prerequisite, remove an interaction or build a better
mission.

### Step 5 — Make the truth card

Before drafting, the AI writes a compact truth card:

```text
Learner arrives knowing:
Learner's likely question:
Single idea being taught:
Why it matters outside the lesson:
Standard terminology:
Concrete example:
Misconception to expose:
Important nuance that must survive simplification:
What the learner should do:
Evidence that they understood:
```

If these lines cannot be completed clearly, the unit is not ready to be
rewritten.

### Step 6 — Draft the smallest coherent revision

Revise only the agreed scope. A dependable sequence is:

1. **Orientation:** tell the learner what situation or question they are facing.
2. **Concrete case:** let them notice something before naming it.
3. **Explanation:** connect the observation to the idea.
4. **Term:** introduce the correct standard vocabulary.
5. **Boundary:** explain what the idea does not mean.
6. **Action:** ask the learner to decide, move, classify, calculate or explain.
7. **Consequence:** show what changes because of that action.
8. **Reflection:** ask for a short act of recall or transfer.

Keep useful existing structure. Remove material only for an identified reason.
Do not add a story, animation, analogy or button unless it changes understanding.

### Step 7 — Connect reading to playing

The mission must test the same understanding the reading prepared.

For every interaction, answer:

```text
What decision is the learner making?
What information are they using?
What misconception does the wrong choice reveal?
What visible consequence follows the choice?
What does success prove beyond lucky clicking?
```

Correct feedback should explain why the reasoning worked. Incorrect feedback
should diagnose the decision and offer a useful next move. Avoid praise that
could follow any answer.

### Step 8 — Read and play again

The founder starts from the beginning, not from the amended sentence. The unit
must work as a journey.

Test:

- the intended answer;
- every plausible wrong answer;
- repeated attempts;
- completion and restart;
- keyboard operation;
- a phone-sized screen;
- a desktop-sized screen;
- reduced motion where applicable;
- all links, including Wiki terms and the next step.

Automated checks support this review. They do not replace it. Play the thing and
look at it.

### Step 9 — Record the founder decision

Use the repository's declared statuses exactly:

- `AI_DRAFT` — an AI-prepared version awaiting founder reading;
- `FOUNDER_READING` — the founder is reviewing the complete unit;
- `AMENDMENTS_REQUIRED` — specific changes were requested;
- `FOUNDER_TESTING` — the founder is testing the amended experience;
- `APPROVED` — the founder explicitly approved the unit;
- `RELEASED` — an approved unit was deliberately published.

Implementation, a passing build, a commit, a push, a deployment or the phrase
“looks good so far” does not by itself change curriculum status.

If the founder approves, record the exact scope and date. Approval of an
illustration does not approve its containing lesson. Approval of a lesson does
not automatically release it.

---

## 5. The durable session record

Conversation history is valuable but not durable enough to be the only record.
After each interview, save a concise record in the repository so another
machine or authorised agent can continue accurately.

Recommended filename:

```text
docs/humanize-sessions/YYYY-MM-DD--identifier.md
```

Use this template:

```markdown
# Humanize session — [unit title]

Date:
Founder:
AI or reviewing voice:
Route:
Identifier:
Status before:
Status after:

## What the learner was meant to understand

## Founder questions and reactions

## What the conversation clarified

## Amendments requested

## Files changed

## Source or prerequisite impact

## Reading test

## Interaction test

## Founder decision

## One next action
```

Summarise the conversation faithfully. Do not manufacture quotations or record a
founder decision that was not made.

---

## 6. Writing rules for humane material

### Begin with the learner's problem

Prefer:

> A branch reports a 12% return rate. Before deciding whether that is serious,
> you need to know how many sales produced it.

Avoid openings that announce a theme without giving the learner anything to
picture or decide.

### Explain before compressing

Let the learner understand the idea in ordinary language. Then give them the
term that lets experts discuss it precisely. Do not permanently replace standard
terminology with a Qubix metaphor.

### Use analogies as bridges, not substitutes

An analogy must declare where it fits and where it stops. A warehouse can help
someone picture tables and relationships; it cannot silently stand in for every
property of a database.

### Prefer consequences over slogans

Show what a mistaken assumption changes: the wrong average, a duplicated row, a
misleading chart or an unfair decision. Consequences give the idea weight.

### Respect the learner

Do not call an idea “easy” or “obvious.” Do not perform excitement. Do not hide
uncertainty. Do not speak to adults as children. Warmth comes from attention and
clarity, not from exclamation marks.

### Make headings useful

A heading should tell the learner what they are about to understand. Prefer
recognisable questions or standard concepts over vague motivational phrases.

### Link vocabulary deliberately

Highlight a term only when the Wiki adds useful depth. The sentence must remain
understandable without opening the link. Do not turn every noun into a detour.

---

## 7. Completion checklist

A humanization pass is complete only when:

- [ ] one exact unit and status were identified;
- [ ] the founder read the untouched version;
- [ ] spontaneous questions and reactions were captured;
- [ ] the single learning idea was stated plainly;
- [ ] purpose appears before unnecessary abstraction;
- [ ] standard terminology and important nuance were preserved;
- [ ] the example is concrete and factually defensible;
- [ ] the reading prepares the learner for the interaction;
- [ ] wrong-answer feedback teaches rather than judges;
- [ ] the full journey was tested on phone and desktop;
- [ ] sources, prerequisites and Wiki links were checked;
- [ ] the change remained small and reversible;
- [ ] the founder's exact decision and scope were recorded;
- [ ] commit, push and deployment state were reported honestly.

---

## 8. How to begin a session

The founder can begin with one sentence:

> Humanize session. I am reading `[route or unit]`. Do not rewrite yet. Answer my
> questions as a patient tutor and keep a record of the friction we discover.

When the reading conversation is finished:

> Prepare the truth card and show me the smallest coherent revision. Keep it as
> `AI_DRAFT` until I have read and tested it.

When the revision has been tested, the founder gives an explicit decision:

> Amend this further.

or:

> I approve `[exact unit or element]` in the version I have just tested.

That final sentence—not confidence, momentum or software state—is what moves
Qubix through the founder gate.

---

## 9. The standard to aim for

The finished unit should leave the learner able to say:

```text
I know what problem this idea helps me solve.
I can explain it without repeating the page.
I know the proper name for it.
I have used it to make a decision.
I understand what my mistake would have changed.
I know where to go next.
```

That is what “humanized” means in Qubix: not content that sounds more human, but
learning that treats the learner as one.
