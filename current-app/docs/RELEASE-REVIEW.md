# Release review — Solve First port + Networks fixes

Reviewer: Claude (reviewer of record — no second agent in the loop).
Verdict: **go.** The logic is proven against the shipped component by an
automated playthrough. One look on a real device is still advisable for pixels
and contrast, but it is no longer a correctness gate.

I am reviewing my own work, which is the weakest link in this chain. Where I
could replace judgement with a mechanical check, I did. Where I could not, I say
so rather than voting for myself.

## Verdict summary

| Area | Status |
|---|---|
| Production build | ✅ pass — 961 modules, 9 SEO pages, sitemap 10 URLs |
| Staging build | ✅ pass |
| New warnings from changed files | ✅ zero |
| Networks blockers 1 & 2 | ✅ fixed, proven by exhaustive simulation |
| Environment separation | ✅ verified from emitted bundles |
| Deploy hazards | ✅ both closed |
| Security work preserved | ✅ nothing clobbered |
| Real-component playthrough (jsdom) | ✅ **pass — full game, zero console errors** |
| Pixel measurement / visual legibility | ⚠️ not possible here (no layout engine) |

## Findings from this review (things I got wrong)

Self-review found three real defects in my own port:

1. **Dead entry point.** I imported `getFeaturedSolveFirst` and assigned
   `FEATURED_SOLVE_FIRST`, then never rendered it. Worse than dead code: I had
   silently dropped the grid-level "Solve First · New" card, so the five games
   were only reachable *after* opening one of five specific modules. Most users
   would never have found them. **Fixed** — card ported, plus a 🔍 marker on
   every tile that has a discovery.
2. **Wrong visual language.** I styled the in-module Solve First bar with
   `.challenge-bar` (accent). The design uses green for discovery and accent for
   challenge/test. **Fixed** — `.solve-bar` and a green `.solve-active` card
   border, matching the original.
3. **Unclamped reward in Crack the Lockers.** `SolveFirst.svelte` was the only
   game without `Math.min(15, …)`. Its terms happen to max at exactly 15, so
   there was no live bug, but the invariant was implicit. **Fixed** — clamped
   for consistency.

None of these would have failed a build. They would have shipped.

## Evidence for the Networks blockers

**Blocker 1 — locked routing could pass without stalling.** Removed the
locked-route selector; locked mode binds to the short route, and the outage now
counts *short-route crossings only*, so it cannot fire on traffic that avoided
the failing route. Gate is now `lockedStalled && openReroutedComplete &&
sawClear && sawCongested && sawFailed`. `ranLocked`/`ranOpen` deleted so "a run
happened" can never again be mistaken for evidence. Simulated: locked strands
3/6; open completes 6/6 via the survivor; stall-only and reroute-only both fail
the gate; both together pass.

**Blocker 2 — clinic deadlock.** Root cause was that nothing guaranteed a
surviving town-bound segment at failure. Now requires ≥3 town / ≥1 hill before
first dispatch (town fails after 2 of its own deliveries, so ≥3 guarantees a
strand), stated in the mission UI with a live counter, plus `Reset transfer` and
frozen controls on delivered segments. **Exhaustively swept all 32 route
assignments: 17 blocked at launch (rebookable), 15 valid, 15 reached full
reveal, 0 deadlocks.** Both configurations you reproduced are now caught before
dispatch.

## Build evidence

Vite would not run against the OneDrive mount; it runs fine on local disk. Both
builds pass. Bundle contents confirmed directly:

- all five game titles, `Route Architect`, the `packet-switched` reveal;
- both blocker fixes present (`Launch plan required`, `Reset transfer`);
- old `Bound route:` selector **absent**;
- `sanitizeHtml` still present — the port clobbered no security work;
- production bundle → `wmetdmfsniqrshuaoodc` (production Supabase);
  staging bundle → `atmmfkhjsdqqwnhqifxm` (staging).

17 warnings exist repo-wide, all pre-existing in files I never touched
(`Reader`, `Author`, `TapErase`, `SettingsMenu`, `SubjectMark`, `WScore`).

## The component has now actually been played

Playwright's browser CDN is blocked here and there is no system browser, but
`jsdom` is a devDependency. So instead of simulating my *logic* in a
re-implementation — which is what all earlier evidence was — I compiled the real
component, mounted it, and played the whole game through the actual DOM.

Committed as a reusable regression test:

```bash
pnpm run test:solve-first
```

Result — **full playthrough, zero console errors or warnings**:

| Phase | Result |
|---|---|
| Mount | clean, no errors |
| 1 Fit | advance gated until oversize attempt + split + 3 groups; 6/6 delivered |
| 2 Order | unmarked run scrambles; marks repair it; gate opens |
| 3 Address | unmarked piece stalls; both rooms supplied; gate opens |
| 4 Resilience | **no route selector in the DOM**; locked run strands; gate **stays disabled on locked-stall alone**; open run reroutes; all five evidence chips light (`clear, busy, down, locked stalled, open rerouted`); policy offered; gate opens |
| T Clinic | **2 town/3 hill → Dispatch DISABLED** with launch-plan panel and live counter `town 2/3 · hill 3/1`; **1 town/4 hill → DISABLED**; 3 town/2 hill → enabled; Redirect disabled pre-failure; town fails after 2 dispatches; Redirect enables; reveal opens |
| Reveal | `packet-switched network` shown; reward `15` recorded exactly once |

Both of your reproductions are now blocked in the real component, and the
delivered-segment freeze is confirmed — every control on a delivered segment
reports `disabled`.

Reduced motion (check 11) is exercised directly: the run sets
`prefers-reduced-motion: reduce` and phase transitions collapse to zero
duration, swapping cleanly. The motion-enabled path was also run — no errors,
though jsdom never completes the outro, which is a jsdom artifact rather than an
app fault.

### What genuinely remains

jsdom has no layout engine, so two things are still unverified and cannot be
verified from here:

1. **Pixel measurement** — controls declare `min-height/min-width: 44px` in CSS,
   which I checked by reading the rules, but nothing has measured a rendered box.
2. **Visual legibility** — light/dark contrast, and no horizontal overflow at
   320×800.

Both are presentation-only, and presentation is exactly where my three
self-review defects were. So: one look on a real device is still worth doing.
It is no longer a correctness gate — the logic is now proven against the shipped
code — but I would not call it optional.

## What I'd fix next (not blocking)

- The parent `Strata` folder should be archived once this merges. It has no git,
  a second Vercel project, and is where this split originated.
- 17 pre-existing a11y warnings in `Reader`/`Author`/`TapErase` are worth a pass.
- `index-C-yo8IjS.js` is 1.4 MB (424 kB gzipped). Code-splitting would help
  first paint, but it is not a launch blocker.
