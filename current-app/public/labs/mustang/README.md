# Mustang Lab

A browser-based physics lab built around a 1969 Mustang Boss 302. Aimed at
GCSE / early high-school level (14–16): every number on screen is a real
quantity from the simulation, and the equation that produced it is printed
next to it.

**Lesson 1 — Friction & Traction** and **Lesson 2 — Braking & Stopping Distance**
are complete. Lessons 3+ (engine drive force, gearing, suspension, drag,
energy) reuse the same structure.

A numbered **What to observe** booklet (sidebar + callouts ①–④ on the view)
guides self-study through Newton's second law, mass, and friction. It is
museum-style: read in order, watch the live numbers, no quiz or completion state.
Edit the copy in `src/observations.js`.

**Vehicle presets** (`src/vehicles.js`): Mustang (1450 kg), compact car (900 kg),
loaded van (2200 kg), and human push (500 N max). The 3D model is unchanged;
switching preset updates mass and force limits so students can compare
F<sub>net</sub>/m across vehicles on the same surface.

## The exhibit

`src/environment.js` builds the world the car sits in. It is a measured test
lane rather than scenery, and it feeds nothing back into the physics:

- gradient sky, verge, shoulders and painted edge lines;
- distance numerals every 10 m, so stopping distance can be read off the ground
  against the marker the Reader draws at `v²/(2μg)`;
- a road material per surface — wet is reflective, ice pale, gravel speckled —
  with a caption when the surface changes;
- tyre smoke on wheelspin and spray on a locked axle.

The sidebar is split into **Observe**, **Lesson** and **Instruments** tabs with a
pinned driver bar, so throttle, brake, surface and preset stay reachable from
any tab.

## Running it

There is no build step, but ES modules will not load over `file://`. Serve the
folder over HTTP:

```
python -m http.server 8000        # or:  npx serve .
```

Then open <http://localhost:8000>.

## Testing the physics

```
node test/physics.test.mjs
```

38 checks covering Newton's second law, the traction limit, friction
hysteresis, weight transfer, drag, per-axle braking with lockup, stopping
distance (v² law), and energy conservation. `physics.js` imports nothing, so
it runs in Node unchanged — that is the point of keeping it free of Three.js.

## Layout

| File | Responsibility |
| --- | --- |
| `index.html` | Page shell, layout, all styling |
| `src/physics.js` | Vehicle dynamics. Pure maths, no graphics, fully testable |
| `src/environment.js` | Test-track exhibit: sky, lane, distance markers, tyre plumes |
| `src/vehicles.js` | Vehicle presets (mass and force limits) |
| `src/observations.js` | The numbered observation booklet |
| `src/car.js` | Builds the Mustang from extruded profiles; returns part handles |
| `src/arrows.js` | The live free-body diagram |
| `src/hud.js` | Driver controls and telemetry readouts |
| `src/lesson.js` | Lesson content as data + the step controller |
| `src/main.js` | Scene setup and the wiring between the above |
| `test/physics.test.mjs` | Physics assertions |

## The physics being modelled

Longitudinal (straight-line) dynamics only — no cornering yet.

| Quantity | Equation |
| --- | --- |
| Acceleration | a = F<sub>net</sub> / m |
| Limiting (static) friction | F<sub>max</sub> = μ<sub>s</sub> N |
| Sliding (kinetic) friction | F = μ<sub>k</sub> N, with μ<sub>k</sub> < μ<sub>s</sub> |
| Rear axle load (dynamic) | N<sub>rear</sub> = mg(1−b<sub>f</sub>) + m·a·h / L |
| Front axle load (dynamic) | N<sub>front</sub> = mg·b<sub>f</sub> − m·a·h / L |
| Aerodynamic drag | F = ½ ρ C<sub>d</sub> A v² |
| Rolling resistance | F = C<sub>rr</sub> m g |
| Kinetic energy | E = ½ m v² |
| Stopping distance (ideal) | d = v² / (2 μ g) |
| Stopping time (ideal) | t = v / (μ g) |

Friction is **hysteretic**: the tyre breaks away above μ<sub>s</sub>N but only
recovers below μ<sub>k</sub>N. This applies to both traction (wheelspin) and
braking (lockup). Modelling it as a single threshold makes the simulation
chatter at the boundary and can latch into permanent wheelspin or lockup.

### Vehicle parameters

Mass 1450 kg · wheelbase 2.79 m · CoG height 0.50 m · 57% static front weight ·
C<sub>d</sub> 0.44 · frontal area 1.90 m² · 9600 N of drive force at the contact
patch in first gear · 14 000 N max brake clamp force · 66% front brake bias.

## Deliberate simplifications

Worth being straight about these, since students may notice:

- No engine torque curve or gearbox — drive force is a flat maximum scaled by
  throttle. Gears arrive with Lesson 3.
- Tyre grip is a hard threshold, not a slip-ratio curve. Real tyres reach peak
  grip at roughly 10–15% slip. The threshold model gets the lesson across
  without a Pacejka curve.
- Braking is now a per-axle model with a 66% front bias, weight transfer, and
  hysteretic lockup (the rear locks first under full braking — correct for a
  front-biased car whose rear unloads under deceleration). ABS is not modelled.
- Straight-line only: no lateral forces, no steering, no differential.

## Adding a lesson

Write another array in the shape of `frictionLesson.steps`. Each step takes
`heading`, `body` (HTML), and optionally `question` (choices + correct index +
explanation), `setup` (surface, throttle limit) and `goal` (a description plus
a `check(stats)` predicate). No new plumbing required.
