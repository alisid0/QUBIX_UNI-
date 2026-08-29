# DeepSeek brief — generate Qubix's SEO concept-page content

**You are writing SEO content for Qubix, a STEM microlearning web app.** Your job is the heavy lifting: produce the on-page content + metadata for one **concept page per topic** in the list below. The engineering team builds the page pipeline and deployment — **you only produce the content, as structured JSON.** Do not write code, build config, or HTML pages — just the content records.

## Why this exists (context)

Qubix teaches physics, maths and chemistry as bite-sized, swipeable "boards." The app itself is a single-page app, so search engines currently can't see the lessons. The team is adding a public, crawlable **concept page per topic** (e.g. `/physics/gravitation-and-orbits`) that explains the concept, ranks in search, and links into the app. Your content fills those pages.

**Goal of the pages:** rank for people searching physics / maths / chemistry / STEM **concepts**, and for people looking for a **Brilliant.org alternative**. Each page must be genuinely useful on its own — a short, accurate explainer — not keyword filler.

## What to produce

A single JSON array. **One object per topic** in the list (56 topics), **plus** the 3 comparison pages in the "Positioning pages" section (59 objects total). Use this exact schema:

```json
{
  "id": "P15",
  "slug": "gravitation-and-orbits",
  "subject": "physics",
  "seoTitle": "Gravitation & Orbits Explained — Qubix",
  "metaDescription": "How gravity holds planets in orbit: Newton's law, g vs G, Kepler's laws, escape velocity and weightlessness — explained simply, with a free interactive course.",
  "h1": "Gravitation and orbits, explained simply",
  "summary": "A 40–60 word plain-English lede that states what the topic is and why it matters, readable on its own.",
  "bodyHtml": "<p>…</p><p>…</p><ul><li>…</li></ul><p>…</p>",
  "keywords": ["gravitation explained", "what is escape velocity", "Kepler's laws", "learn physics online"],
  "faqs": [
    { "q": "What is the difference between g and G?", "a": "g is the local gravitational field strength (~9.8 N/kg at Earth's surface); G is the universal gravitational constant (6.67×10⁻¹¹), the same everywhere." },
    { "q": "Why do astronauts feel weightless in orbit?", "a": "They are in continuous free fall around Earth together with their spacecraft, so there is no contact force to feel — not because gravity is absent." }
  ],
  "relatedSlugs": ["newtonian-mechanics", "rotation-heat-and-thermodynamics"],
  "appCta": "Start the Gravitation & orbits course on Qubix"
}
```

### Field rules
- **slug** — kebab-case, derived from the topic name, unique, ASCII only (e.g. "Calculus: differentiation" → `calculus-differentiation`). No subject prefix (the pipeline adds `/<subject>/`).
- **seoTitle** — ≤ 60 characters, ends with " — Qubix". Lead with the concept, not the brand.
- **metaDescription** — 140–155 characters, compelling, includes the main concept phrase, no clickbait.
- **h1** — natural headline, may differ slightly from seoTitle. One per page.
- **summary** — 40–60 words, plain English, no HTML.
- **bodyHtml** — **220–360 words** of accurate, genuinely useful explainer content as simple HTML (`<p>`, `<ul>`/`<li>`, `<strong>` sparingly). Cover the core ideas a learner searching this concept wants: the definition, the key relationship/formula in words, one concrete example, and where it shows up in the real world. This is the rankable content — make it correct and worth reading.
- **keywords** — 4–8 real search phrases a person would type. Mix "concept" intent ("what is …", "… explained") with "learn" intent ("learn …", "… for beginners"). Do **not** stuff these into the prose.
- **faqs** — 2–4 question/answer pairs that match real "People also ask" queries; answers 1–3 sentences. (These power FAQ rich results.)
- **relatedSlugs** — 2–4 slugs of other topics in this list, for internal linking. Prefer same-subject neighbours.
- **appCta** — one short sentence inviting the reader into the Qubix course for that topic.

## Voice (match the Qubix house style — important)

- Plain definitions and concrete scenarios. **Mechanism over assertion** — explain *how/why*, don't just claim importance.
- **No hype, no marketing adjectives** ("amazing", "revolutionary", "unlock"). Earn interest with a concrete fact or number, not adjectives.
- Minimal bold. No stacked em-dashes. No cute parallelism ("not just X, but Y").
- Accurate physics/maths/chemistry only — **do not invent facts, constants, or formulas.** If unsure, stay qualitative.
- Each page must be **unique** — no boilerplate repeated across topics.

## SEO rules

- Every page targets its own concept; don't dilute by cramming unrelated keywords.
- Use the topic's natural search phrasing in seoTitle, h1, summary and the first sentence of bodyHtml.
- Keep "Brilliant" out of the concept pages — confine that to the 3 positioning pages below.

## Positioning pages (3 extra records, for the Brilliant-switcher audience)

Same schema, but `subject: "compare"` and no `relatedSlugs` requirement. Honest, specific, not disparaging:
1. `slug: "brilliant-alternative"` — "A free alternative to Brilliant for STEM" — who Qubix suits, how the bite-sized/swipe approach differs, what subjects are covered.
2. `slug: "apps-like-brilliant-for-physics-and-maths"` — concept-and-practice learning for physics & maths, free.
3. `slug: "learn-stem-concepts-free"` — broad STEM landing targeting "learn physics/maths/chemistry concepts free".

## Delivery format

- Return **one JSON array** inside a single ```json code block. Validate it parses (double quotes, no trailing commas, escape any quotes inside strings).
- If hitting a length limit, deliver in **batches by subject** (Physics, then Maths, then Chemistry, then the 3 positioning pages), each as its own complete JSON array — never cut an object mid-way.
- Don't add commentary outside the code block(s).

---

## The topics (generate one record for each `id`)

### Physics (`subject: "physics"`)

| id | topic name | boards |
|----|------------|--------|
| P0 | Mechanics — foundations | 7 |
| P0T1 | Mechanics — mathematical formulation | 7 |
| P0T2 | Mechanics — numericals | 7 |
| P1 | Forces & motion | 7 |
| P2 | Energy | 2 |
| P3 | Gravity | 1 |
| P4 | Measurement & dimensions | 7 |
| P5 | Vector products | 3 |
| P6 | Measurement, errors & relative motion | 3 |
| P7 | Newton's laws & forces | 10 |
| P8 | Friction & circular motion | 7 |
| P9 | Work, energy & momentum | 8 |
| P10 | Vectors | 13 |
| P11 | Electricity & circuits | 17 |
| P12 | Force & torque: rotational dynamics | 16 |
| P13 | Reflection & refraction | 15 |
| P14 | Thermodynamics | 15 |
| P15 | Gravitation & orbits | 16 |
| P16 | Heat transfer: conduction, convection & radiation | 16 |
| P17 | Magnetism & electromagnetic induction | 25 |
| P18 | Calculus in physics: differentiation applications | 15 |
| P19 | Calculus in physics: integration applications | 15 |
| P20 | Applied mechanics: machines, fluids & materials | 16 |
| P21 | Oscillations & acoustics | 16 |
| P22 | Applied electricity: batteries, AC & radio | 15 |
| P23 | Gyroscopes, magnetism & wave optics | 16 |
| P24 | Newtonian mechanics | 16 |
| P25 | Rotation, heat & thermodynamics | 16 |
| P26 | Optics: light, lenses & instruments | 16 |
| P27 | Engineering tools & electrical machines | 12 |
| P28 | Forces & motion — the basics | 16 |
| P29 | Energy — the basics | 10 |
| P30 | Electricity — the basics | 15 |
| P31 | Waves & oscillations — the basics | 15 |
| P32 | Heat & matter — the basics | 15 |
| P33 | Optics — the basics | 15 |

### Mathematics (`subject: "maths"`)

| id | topic name | boards |
|----|------------|--------|
| M1 | Getting infinitely close | 4 |
| M2 | Calculus: turning points & area | 2 |
| M3 | Coordinate geometry | 36 |
| M5 | Arithmetic foundations | 5 |
| M6 | Algebra foundations | 8 |
| M7 | Matrices | 13 |
| M8 | Exponents & logarithms | 15 |
| M9 | Trigonometry | 16 |
| M10 | Problem-solving heuristics I | 17 |
| M11 | Problem-solving heuristics II | 16 |
| M12 | Problem-solving: vectors & matrices | 12 |
| M13 | Lockhart's algebra: foundations | 10 |
| M14 | Lockhart's algebra: symmetry & roots | 11 |
| M15 | Calculus: differentiation | 16 |
| M16 | Calculus: integration | 16 |

### Chemistry (`subject: "chemistry"`)

| id | topic name | boards |
|----|------------|--------|
| C1 | Into the atom | 5 |
| C2 | Atomic structure | 6 |
| C3 | Chemical bonding | 4 |
| C4 | Reactions & molecular architecture | 15 |
| C5 | Redox, electrochemistry & kinetics | 15 |

Some topics overlap (e.g. "Forces & motion" and "Forces & motion — the basics"). For overlapping pairs, make the "— the basics" / foundations page beginner-pitched ("for beginners", "GCSE", "intro") and the other more thorough, so they don't compete for the same query. Keep slugs distinct.
