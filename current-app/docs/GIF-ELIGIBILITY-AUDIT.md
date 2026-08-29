# Live production GIF and media audit

- Catalogue: production Path manifest plus current production Supabase rows
- Fetched: 2026-08-02T17:18:01.799Z
- Generated working files: `.audit-cache/` (ignored by Git)
- Coverage: 429 live BBs / 1957 live floors
- Policy: raster GIFs are permitted only for tangible real-world scenes and analogies. Technical diagrams are code-native.

## Current production media gap

| Measure | Covered | Total | Coverage |
|---|---:|---:|---:|
| BBs with any media | 242 | 429 | 56.4% |
| Floors with any media | 633 | 1957 | 32.3% |

The 633 covered floors comprise 0 top-level hero images, 9 authored layer images, and 624 `boardMedia.js` attachments. This measures media the current Reader can actually resolve.

### Media coverage by subject

| Subject | BBs covered | BBs total | Floors covered | Floors total |
|---|---:|---:|---:|---:|
| physics | 43 | 121 | 52 | 512 |
| maths | 109 | 109 | 427 | 517 |
| chemistry | 74 | 99 | 129 | 437 |
| computing | 16 | 100 | 25 | 491 |

## Classification totals

| Classification | Floors |
|---|---:|
| EXISTING_MEDIA | 633 |
| NONE | 484 |
| PHOTO_ARCHIVE | 12 |
| SCENE_GIF | 8 |
| STATIC_SCENE | 25 |
| TECH_ANIMATION | 331 |
| TECH_STATIC | 464 |

## Subject coverage

| Subject | BBs | Floors | Scene-GIF candidates | Technical animation | Technical static |
|---|---:|---:|---:|---:|---:|
| physics | 121 | 512 | 4 | 149 | 179 |
| maths | 109 | 517 | 0 | 9 | 38 |
| chemistry | 99 | 437 | 2 | 104 | 118 |
| computing | 100 | 491 | 2 | 69 | 129 |

## Highest-confidence scene-GIF candidates

These floors passed the automated scan and a conservative scene-only review. They are eligible for storyboard work, not automatic generation. Technical overlays, labels, formulae, and diagrams remain forbidden in raster frames.

| Rank | BB | Floor | Subject | Title | Score | Floor beat |
|---:|---:|---:|---|---|---:|---|
| 1 | 1208 | 2 | chemistry | Counting by weighing | 10 | Think of a jar of pennies. If the exact weight of one penny is known, the jar does not need to be opened and counted. The entire jar can be placed on … |
| 2 | 1240 | 0 | computing | The one-way valve | 10 | In a plumbing system, if you want water to flow into a tank but prevent it from flowing back out, you install a check valve. The water pressure pushes… |
| 3 | 1137 | 3 | computing | The AND Pipe | 9 | If the first valve is open but the second is closed, the water still stops. If the second valve is open but the first is closed, the water never reach… |
| 4 | 1022 | 0 | physics | Matter and mass | 8 | Matter is the physical stuff things are made of, down to their atoms. Mass measures how hard an object is to get moving — and for anything built of ma… |
| 5 | 1023 | 0 | physics | Inertia & Newton's first law | 8 | A car rolls down a long, straight highway at a steady speed. You want it to stop — so what has to happen? It won't simply halt because you wish it to.… |
| 6 | 1023 | 2 | physics | Inertia & Newton's first law | 8 | Take your foot off the pedals without braking, and the car still coasts to a stop. If motion carries on by itself, why does it stop here? Because a qu… |
| 7 | 1121 | 0 | chemistry | The chemist's dozen | 8 | If you want to bake a cake, you need to count your ingredients. You need 2 cups of flour and 3 eggs. |
| 8 | 1178 | 0 | physics | The illusion of friction | 8 | A car coasts down a long, straight highway. If the driver takes their foot off the gas pedal, the car eventually slows down and stops. |

## Scene candidates awaiting manual approval

These matched the tangible-action rules but remain blocked until the floor is checked for hidden technical dependencies.

| BB | Floor | Subject | Title | Score | Floor beat |
|---:|---:|---|---|---:|---|


## Non-negotiable production rule

- **SCENE_GIF / STATIC_SCENE:** raster imagery may depict only visible real-world action or a narrative analogy.
- **SCENE_GIF_REVIEW:** quarantined; do not produce until a human confirms the scene does not carry technical diagram work.
- **REVIEW_STALE:** production floor text changed after approval; block production until the floor is reviewed again.
- **TECH_ANIMATION / TECH_STATIC:** use Manim, SVG, canvas, Three.js, or another deterministic source. Never use generated raster imagery.
- **PHOTO_ARCHIVE:** use traceable real evidence, not generated documentary imagery.
- **NONE:** do not add media merely to fill a slot.
