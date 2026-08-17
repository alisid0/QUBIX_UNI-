# Qubix mascot system

The cube is a quiet guide and feedback character shared by the Qubix website,
latest app, and produced media. It appears when it clarifies the next action,
acknowledges meaningful progress, or softens a recoverable error. It is not a
looping decoration for every card or lesson.

## Source, masters, and delivery

| Layer | Location | Purpose |
| --- | --- | --- |
| Canonical model and motion | `current-app/shorts/functions/mascot-studio/` | Three.js model, responsive face, animation timing, studio UI, and renderer |
| Render masters | `current-app/shorts/functions/mascot-studio/renders/` | Transparent 540 × 960 WebM clips and idle poster |
| Optimised delivery pack | `current-app/shorts/functions/mascot-studio/renders-final/` | Transparent 270 × 480 delivery clips for apps and produced media |
| Live-course delivery | `public/media/mascot/` | Assets served by the presently deployed course website |
| Latest-app delivery | `current-app/public/media/mascot/` | Assets bundled with the latest full application |
| Live-course integration | `src/lib/mascot.js` and `src/lib/components/QubixMascot.svelte` | Intent mapping, accessibility, reduced motion, framing, and fallback |
| Latest-app integration | `current-app/src/lib/mascot.js` and `current-app/src/lib/components/qubix/QubixMascot.svelte` | The same contract for the full app |

Screens request an intent or named animation through `QubixMascot`; they do not
hard-code media paths. This keeps future mascot replacement and optimisation
centralised.

## Animation ownership

| Animation | Product intent | Use |
| --- | --- | --- |
| `idle` | `rest` | Calm neutral presence and static fallback |
| `curious` | `welcome` | Welcome, first visit, or open-ended invitation |
| `think` | `loading` | Deliberate processing or recall, not every network wait |
| `surprise` | `notice` | A genuinely unexpected result or discovery |
| `celebrate` | `success` | Onboarding finish or a meaningful milestone |
| `error` | `retry` | Recoverable failure with a clear next action |
| `point-left` | `back` | Rare directional guidance |
| `point-right` | `guide` | A single next-step cue |
| `press` | `action` | Demonstrating a first interaction or CTA |
| `transition` | `transition` | Branded scene change in produced media, not routine app navigation |
| `face-front` | production only | Neutral presentation shot for Shorts and adverts |
| `face-right` | production only | Right-facing presentation turn |
| `face-left` | production only | Left-facing presentation turn |

The three presentation views stay in the studio delivery pack and are not
copied into either public app directory.

## Current placements

- **Course website Home:** curious for a first visit, then points towards the
  learner's next section.
- **Latest-app loading:** static idle poster, so app boot does not download a
  video and reduced-motion behaviour is immediate.
- **Latest-app auth welcome:** curious loop above the Qubix wordmark.
- **Latest-app onboarding finish:** one celebration when the learner is ready
  to begin.
- **Latest-app Home focus action:** think for recall, point for continuation,
  and curious for a first session.
- **Latest-app workshop load failure:** one retry reaction beside recovery.

## Placement rules

1. Use at most one mascot per viewport.
2. Keep it out of lesson boards, equations, diagrams, and routine prose. An
   interaction must expose the mathematical or physical relationship without a
   competing character.
3. Celebrate milestones, not every correct tap.
4. The error animation means "try again". Destructive warnings remain
   text-first and use the locked danger token.
5. Decorative instances are hidden from assistive technology. Informational
   instances pass `decorative={false}` and a concise `label`.
6. Reduced-motion users receive the idle PNG automatically.
7. Load one clip at a time with metadata preload unless it is in the first
   viewport.
8. The mascot must not make the public product look directed at young children.
   Keep the pose small, purposeful, and secondary to the learning action.

## Regeneration workflow

From `current-app/`:

```powershell
node shorts/functions/mascot-studio/render-all.mjs
```

The script generates all thirteen masters, derives a transparent idle poster,
and writes the optimised delivery pack. It requires `ffmpeg` on `PATH`; set
`FFMPEG_PATH` when using a standalone binary. Add `--poster-only` to refresh
only the still.

Review every state, copy the ten product-intent clips and idle PNG into both
public directories, then build and smoke-test the course website and latest app
at phone and desktop widths. Mascot media work never changes a curriculum
status and never authorises a deployment.
