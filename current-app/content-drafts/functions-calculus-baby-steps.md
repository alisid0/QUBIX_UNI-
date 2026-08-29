# Functions — de-AI rewrite + merged floors

Authoring draft for MATH_FUNCTIONS (BBs 1219–1228).

**Status:** Bundled fallback updated in `src/lib/content/functionBoards.js`.
Sync these floors into production Supabase `cards` (sort_order 1219–1228)
when publishing. Not a production inventory on its own.

## What changed

- De-AI tone per `docs/QUBIX-WRITING-STYLE.md`: concrete scenes, “we”,
  abrupt endings, no tidy summary landings, no parallel catalogues.
- Merged thin 5-floor swipe stacks into **2–3 denser floors** per BB.
- Remapped Reader media to floors 0 and 1.

## Floor counts

| BB | Title | Floors |
|----|-------|-------:|
| 1219 | The mechanical rule | 3 |
| 1220 | The broken machine | 2 |
| 1221 | The mathematical shorthand | 2 |
| 1222 | The boundaries | 2 |
| 1223 | The visual test | 2 |
| 1224 | The straight path | 2 |
| 1225 | The explosion | 2 |
| 1226 | The falling object | 2 |
| 1227 | Running it backward | 2 |
| 1228 | Chaining them together | 2 |

## Workshops (unchanged order)

1. Functions basics
2. Function or not?
3. Function machine
4. Transformation lab (optional)

## Supabase sync note

Update `layers` JSON for sort_order 1219–1228 from `functionBoards.js`.
Titles in prod may still differ (e.g. “Input, process, output”); either
keep prod titles or align to the fallback titles in the same edit.
