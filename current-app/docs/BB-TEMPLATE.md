# BB Authoring Template

Submit one BB at a time. Fill all fields. Follow the editorial voice in `CONTENT.md`.
Before assigning a path or reviewing media, read `docs/SOURCE-OF-TRUTH.md`.

## Format

Copy this whole block, fill it in, and submit via:
- **App:** https://qubix.university/ → Author tab
- **GitHub PR:** add a reviewed batch/fallback only when the ingestion workflow
  calls for it; new live dynamic BB copy normally belongs in Supabase, not `deck.js`
- **Form:** [Google Sheets → Apps Script → Supabase]

---

```json
{
  "title": "Write the title here — plain language, no jargon",
  "subject": "physics|maths|chemistry",
  "topic": "forces|energy|calculus|trigonometry|...",
  "concept": "key concepts, semicolon-separated",
  "tier": "g0",
  "buildsOn": ["Card 05", "Card 14"],
  "floors": [
    "<p>Floor 0 (Idea): The swipe card. One paragraph. Start with something observable — a bus, a ball, a straw in water.</p>",
    "<p>Floor 1 (Concrete): A real scenario showing the idea in action. Use 'you' or a named character.</p>",
    "<p>Floor 2 (Definition): The textbook version. Clean, single-sentence definition. Formula here if applicable.</p>",
    "<p>Floor 3 (In action): Where it's applied, what it predicts, what it explains. Real-world examples.</p>",
    "<p>Floor 4 (The law / bedrock): Full formal statement, formula box, edge cases. Not every BB needs all 5 floors. Use null to skip.</p>"
  ],
  "mediaBrief": "Optional: real-world scene, code-native technical visual, evidence, or no media."
}
```

## Floor rules

| Floor | Purpose | Length | When to skip |
|-------|---------|--------|-------------|
| 0 | Idea — swipe card, hook, one-line statement | 1-3 sentences | Never |
| 1 | Concrete — real scenario, observable | 2-4 sentences | Shallow ideas complete at floor 0 |
| 2 | Definition — textbook, formula introduced | 1 paragraph | If floor 1 already defines it |
| 3 | In action — applications, predictions | 1-2 paragraphs | Optional |
| 4 | The law — formal statement, edge cases | 1 paragraph | Optional |

Use `null` to skip floors. A BB can be complete at floor 1 or 2.

## Editorial voice (mandatory)

- Start with the observable — something the reader can see or has noticed
- Plain definitions, concrete scenarios over clever metaphors
- No hype: cut "timeless," "revolutionary," "fascinating," "mind-blowing"
- Mechanism over assertion — show the step that makes it work
- Minimal bold — only the first use of the named term
- No em-dash stacking — short clean sentences
- One earned philosophical line allowed, sparingly

## Tags guide

| Field | Purpose | Example |
|-------|---------|---------|
| `subject` | physics, maths, or chemistry | `"physics"` |
| `topic` | narrow grouping | `"mechanics"`, `"calculus"`, `"trigonometry"`, `"coordinate-geometry"` |
| `concept` | semicolons, kebab-case | `"inertia; newtons-first-law"` |
| `tier` | always g0 for now | `"g0"` |
| `buildsOn` | prerequisite card labels | `["Card 06", "Card 21"]` |

## Media brief guide

Choose one treatment only when it adds teaching value:

- **Scene illustration/GIF:** a visible real-world action or narrative analogy;
  no generated labels, formulae, quantities, or technical geometry.
- **Technical visual:** specify the exact Manim/SVG/canvas/Three.js construction,
  values, labels, and reduced-motion end state. Do not request a generated image.
- **Evidence:** name the real photograph, artefact, or source and record rights.
- **None:** valid whenever media would merely repeat the paragraph.

Run `pnpm run audit:live-media` before producing anything so the BB number,
current floor text, and existing media are verified against production.

## Card numbering

Don't assign a card number yourself. Cards are numbered sequentially. The reviewer will slot your BB in and renumber everything.
