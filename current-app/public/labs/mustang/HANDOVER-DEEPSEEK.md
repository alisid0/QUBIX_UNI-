# Mustang Lab — build handover (for DeepSeek)

You are picking up a working browser-based physics lab and extending it. Read
this file top to bottom before touching code. It is self-contained: you do
**not** need any other repo or context to do the work described here.

---

## 0. Mission & scope

**What this is.** A browser physics lab built around a 1969 Mustang Boss 302
(Three.js). It teaches mechanics at GCSE / early-A-level level (ages ~14–16).
The defining principle: **every number on screen is produced by a real
simulation, and the equation that produced it is printed next to it.** Nothing
is faked or hardcoded for display.

**State today.** *Lesson 1 — Friction & Traction* is complete and polished.
The physics core, the 3D car, the free-body arrows, the HUD, and the guided
lesson flow all work. 25 physics unit tests pass.

**Your job.** Build the next lessons on top of the existing architecture,
following the roadmap in §5. **Start with Lesson 2 (Brakes)** — the full spec is
in §6. Then continue down the roadmap.

**Scope boundary — read this.**
- You work on **this standalone lab only.** Keep it a clean, self-contained
  static site that runs with `python -m http.server`.
- This lab will *later* be embedded into a larger learning app called Qubix by
  someone else who has that codebase. **Do not attempt that integration.** Do
  not add build tools, bundlers, frameworks, or npm dependencies. Do not import
  anything that isn't already used.
- Everything you need to make good decisions is in §2 (hard rules) and §4 (the
  product vision). Follow them and the integration later will be trivial.

---

## 1. Run it and test it

```bash
# from the mustang-lab/ folder
python -m http.server 8000        # then open http://localhost:8000
node test/physics.test.mjs        # 25 checks, must stay green
```

- ES modules will not load over `file://` — you must serve over HTTP.
- `standalone-mustang.html` is a single-file version of just the car (no
  lessons), kept for reference. Don't build on it; build on `index.html` + `src/`.
- **`node test/physics.test.mjs` must pass at all times.** Every equation you
  add gets new assertions in the same file. This is the contract.

---

## 2. Hard rules (non-negotiable)

1. **`src/physics.js` imports NOTHING.** No Three.js, no DOM, no anything. It is
   pure maths and the single source of truth for every quantity. It must run
   unchanged in Node so the tests can hit it. If you find yourself importing
   graphics into it, you are doing it wrong.
2. **Every on-screen number comes from `physics.js`** and is shown next to the
   equation that produced it. Never hardcode a value for display. Never invent a
   number the simulation didn't compute.
3. **Deterministic technical visuals only.** Geometry, diagrams, graphs, and
   values are computed live (Three.js / SVG / canvas / real maths). No baked-in
   raster images of technical content, no pre-rendered charts, no labelled
   pictures standing in for a model.
4. **Be honest about simplifications.** Where the model cuts a corner, say so in
   `README.md` (there is already a "Deliberate simplifications" section — extend
   it). Students may notice; get ahead of it.
5. **No new plumbing for a new lesson.** Adding a lesson means writing a new data
   array in the shape of `frictionLesson.steps` (§4, §6). If you feel the urge to
   re-architect, stop and re-read §3.
6. **SI units everywhere.** metres, kg, seconds, newtons, m/s². `+x` is forward;
   forces are signed so they can be drawn as arrows directly.

---

## 3. Architecture — respect the file boundaries

| File | Responsibility | You touch it to… |
| --- | --- | --- |
| `index.html` | Page shell, layout, ALL styling | add a HUD panel or legend entry |
| `src/physics.js` | Vehicle dynamics. Pure maths, no graphics, fully testable | add the equations for a new lesson |
| `src/car.js` | Builds the Mustang from extruded profiles; returns part handles | add a visual reaction (e.g. nose-dive) or highlight a part |
| `src/arrows.js` | The live free-body diagram | add/scale a force arrow |
| `src/hud.js` | Driver controls + telemetry readouts | surface a new number + its equation |
| `src/lesson.js` | Lesson content as **data** + the step controller | write the new lesson's steps |
| `src/main.js` | Scene setup + wiring between the above | register the new lesson, feed new stats to goals |
| `test/physics.test.mjs` | Physics assertions | add checks for every new equation |

**The discipline that makes this work:** physics is maths, car is geometry,
arrows are the FBD, hud is I/O, lesson is content-as-data, main is wiring. Keep
those lanes. It is why `physics.js` is testable in Node and why a lesson is just
data.

### The current physics API (what you build on)

`physics.js` exports:
- `G`, `RHO_AIR`, `SURFACES` (dry/wet/gravel/ice, each with `mu_s`, `mu_k`),
  `DEFAULT_SPEC` (the car).
- `class Vehicle`: `new Vehicle(spec, surfaceKey)`, `.reset()`, `.setSurface(key)`,
  and the workhorse `.step(dt, { throttle, brake })` (both 0..1). After a step it
  exposes `v`, `distance`, `ax`, `time`, `forces {drive,drag,rolling,brake,net}`,
  `rearLoad`, `frontLoad`, `gripLimit`, `slideLimit`, `slipping`, `heatJoules`,
  `kineticEnergy`, `speedKph`.
- Pure helpers: `tractionLimitedAcceleration(spec, mu)`, `dragLimitedSpeed(spec, force)`.

Note the **fixed-point iteration** inside `step()` for traction: acceleration →
weight transfer → grip limit → acceleration, looped 4×. Reuse this exact pattern
for braking (§6) — braking force sets deceleration, which transfers weight
forward, which changes per-axle grip, which changes braking force.

Weight transfer is already correct for both signs of `ax`: under braking `ax` is
negative, so the private `frontAxleLoad`/`rearAxleLoad` already shift load
forward. You will want to **export** those two functions so the tests can assert
on them.

---

## 4. The product vision (so your choices align)

There is one teaching loop, repeated for every component:

> **See it in the car → pull it out and change one thing → put it back and watch
> the car react.**

The car is the persistent context. **Every lesson must visibly change the car.**
If a lesson can't change the car, it's a labelled diagram, not a lesson — cut it
or deepen it.

The lessons follow one storyline: *getting force to the road and taking it back*:

**Load → Traction → Engine force → Gearing → Brakes → Suspension → Drag/top-speed → Energy.**

Each link modulates the next (e.g. suspension changes the axle loads that
traction and braking both depend on). That interlock is the point — it's what
makes it understanding rather than eight disconnected facts.

The per-step rhythm inside a lesson is **PREDICT → INTERACT → OBSERVE → EXPLAIN**
(see `lesson.js`). The prediction step matters most: a student who commits to an
answer pays attention to the result. Keep that rhythm.

---

## 5. Roadmap — the build queue

Build in this order. Each row is one lesson. Columns: what it teaches, the
governing relationship, the variable the student changes, and — critically — how
the **car** reacts.

| # | Lesson | Governing relationship | Student changes | How the car reacts (the payoff) |
| --- | --- | --- | --- | --- |
| 1 | Friction & Traction *(done)* | F ≤ μ_s·N, slide at μ_k·N | throttle, surface | wheelspin vs clean launch |
| **2** | **Brakes** *(your first task, §6)* | d = v²/(2μg); axle locks when demand > μ·N | brake force, speed, surface | nose-dives, weight shifts forward, threshold vs lockup, stopping distance ∝ v² |
| 3 | Engine → drive force | F_drive = T·gearing / r_wheel | throttle (later torque curve) | more force → more accel, but traction caps it |
| 4 | Gearing | F_wheel = T·(g·g_f)/r_wheel | gear selection | low gear = big force / low top speed, and vice-versa |
| 5 | Suspension & weight transfer | F = −kx; N_rear = mg(1−b_f) + m·a·h/L | spring stiffness k, CoG height h | soft springs / high CoG → more squat & dive → changes grip at both ends (feeds 2 and 4) |
| 6 | Drag & rolling resistance | F = ½ρC_dAv²; F = C_rr·mg | speed, C_d, frontal area | top speed = where drive force meets drag; 2× speed → 4× drag |
| 7 | Energy *(capstone)* | E = ½mv²; d ∝ v² | speed, mass | why speed is dangerous: KE and stopping distance both scale with v² |

**Suspension (5) is the keystone** — it changes N, which every other lesson
depends on. **Radiator / cooling is deliberately excluded** — it's
thermodynamics, a different domain with no clean tie to this storyline. Do not
add it; it belongs in a separate later lesson set.

The end goal (not now) is a gamified "tune the car to hit a target" mode (best
launch, shortest braking distance, highest top speed). Build the lessons so that
mode is later possible: keep parameters (spring k, brake bias, gear, C_d) as
values on `spec`, not magic numbers.

---

## 6. YOUR FIRST TASK — Lesson 2: Brakes

This proves the whole loop on a second component. Braking today is a stub: one
total force capped at `μ_s·m·g`, no lockup, no per-axle split (see the comment in
`README.md` → "Braking is modelled as one total force…"). Your job is to upgrade
it to a real per-axle model with weight transfer and lockup, then teach it.

### 6a. Physics (`src/physics.js`) — pure, tested

Add a front/rear brake bias to `DEFAULT_SPEC` (real cars are front-biased):

```js
brakeBias: 0.66,   // fraction of brake force sent to the FRONT axle
```

Export the two axle-load helpers (currently private) so tests can use them:
`export function frontAxleLoad(spec, ax) {…}` and `rearAxleLoad`.

Add these **pure** functions (pick the exact names, keep them import-free):

- `stoppingDistance(v, mu, g = G)` → `v*v / (2*mu*g)`  (ideal, all tyres at limit)
- `stoppingTime(v, mu, g = G)` → `v / (mu*g)`
- `brakingDeceleration(spec, brake, surface, v)` → the actual decel including
  weight transfer and lockup (see below). Returns a positive number (m/s²).

Upgrade the braking branch inside `Vehicle.step()` to a **per-axle model that
reuses the traction fixed-point loop**:

1. Guess deceleration `a` (start from last frame).
2. `N_front = frontAxleLoad(spec, -a)`, `N_rear = rearAxleLoad(spec, -a)`
   (braking transfers load forward → front rises, rear falls; sum stays `m·g`).
3. Per-axle demand: `Ff_demand = brake * maxBrakeForce * brakeBias`,
   `Fr_demand = brake * maxBrakeForce * (1 - brakeBias)`.
4. Per-axle grip ceiling: `μ_s·N_front`, `μ_s·N_rear`. If demand exceeds it, that
   axle **locks**: its force drops to `μ_k·N_axle` (sliding) and you set a
   `frontLocked` / `rearLocked` flag.
5. `brakeForce = Ff_actual + Fr_actual`; `a = brakeForce / m` (plus drag+rr).
6. Loop 4× to converge.

Expose new state after a step: `frontLocked`, `rearLocked`, and keep
accumulating `heatJoules` (already there). Because the rear axle sheds load
under braking, with a front bias the **rear locks first** — that is correct and
is a teaching moment.

### 6b. Tests (`test/physics.test.mjs`) — add these assertions

With `DEFAULT_SPEC` (m=1450, L=2.79, h=0.50, b_f=0.57) and dry `μ_s=0.90`:

- `stoppingDistance(30, 0.9)` ≈ **50.97 m**  (`900 / (2·0.9·9.81)`)
- `stoppingDistance(60, 0.9)` ≈ **4×** `stoppingDistance(30, 0.9)`  (v² law)
- Higher μ → shorter distance: `stoppingDistance(30, 0.9) < stoppingDistance(30, 0.6)`
- Weight transfer under braking at `a ≈ 8.83 m/s²`: front load ≈ **10 400 N**,
  rear ≈ **3 820 N**, and `front + rear ≈ m·g = 14 224 N`.
- Lockup: at full brake on dry tarmac the **rear** axle locks before the front
  (given the 0.66 front bias).
- Energy conservation: braking a car from 30 m/s to rest dumps
  `½·m·v² = 652 500 J` into `heatJoules` (to within integration tolerance).

Keep the existing 25 assertions green.

### 6c. Lesson content (`src/lesson.js`)

Add `export const brakeLesson = { title: 'Lesson 2 — Braking & Stopping Distance',
steps: [...] }` in the **exact shape** of `frictionLesson` (`id`, `heading`,
`body` HTML, optional `setup`, `question`, `goal`). Follow PREDICT → INTERACT →
OBSERVE → EXPLAIN. Suggested steps:

1. **Orient** — brake hard from speed, watch the nose dip and the front normal
   arrow grow.
2. **Predict** — "From 30 m/s (108 km/h) on dry tarmac, how far to stop?" Quiz.
   Reveal `d = v²/(2μg) ≈ 51 m`, and that it's the *same μ ceiling* as traction.
3. **Observe — lockup** — stamp the pedal; the rear locks, μ drops to `μ_k`, the
   readout turns red and the distance grows. Threshold braking (just under the
   limit) stops shorter. A locked wheel also can't steer.
4. **Weight transfer** — the load goes forward under braking (front arrow grows,
   rear shrinks), which is why real cars have bigger front brakes.
5. **The v² trap** — double the speed, quadruple the distance. Tie to Lesson 7.
6. **Challenge** — a `goal`: e.g. stop from 30 m/s in under ~55 m **without
   locking a wheel**. `check: (s) => s.stoppedFrom30 && s.stoppedDistance < 55 && !s.everLocked`.

### 6d. Car reaction (`src/car.js`, `src/arrows.js`, `src/main.js`)

- **Nose-dive:** pitch the car body forward proportional to deceleration
  (small angle, e.g. up to ~2–3°). This is the visible weight transfer. Add a
  handle in `car.js`; drive it from `main.js` using `vehicle.ax`.
- **Brake arrow:** the pink braking force is already in the legend — make sure
  `arrows.js` draws it, scaled to `forces.brake`, and tint locked wheels.
- **Stopping-distance marker:** draw a marker/line on the ground at
  `distance + stoppingDistance(v, μ)` so the student sees where they'll stop.
- **Lockup cue:** when `frontLocked`/`rearLocked`, add a skid tint / smoke on
  that axle so lockup is unmistakable.

### 6e. Wiring (`src/main.js`)

The app currently loads `frictionLesson` only. Add a lightweight **lesson
switch** (a `<select>` or two tabs in `index.html`) so the student can pick
Lesson 1 or Lesson 2; `main.js` passes the chosen lesson to `LessonController`.
Feed the new stats the brake goals need (`stoppedFrom30`, `stoppedDistance`,
`everLocked`) into `controller.reportProgress(stats)`.

### 6f. Definition of done

- `node test/physics.test.mjs` passes: the original 25 **plus** the new brake
  assertions in §6b.
- The lesson switch shows Lesson 2; its steps read cleanly and every number in
  them comes from `physics.js`.
- Braking hard on dry tarmac **visibly noses the car down**, grows the front
  normal arrow, and shows a live **stopping-distance** number next to
  `d = v²/(2μg)`.
- Over-braking **locks a wheel** (rear first), the readout goes red, μ drops to
  `μ_k`, and the stopping distance gets longer — provably worse than threshold
  braking.
- `README.md`'s file table, physics table, and "simplifications" section are
  updated for the new braking model.

---

## 7. After Lesson 2

Continue down §5: engine → drive force, then gearing, then **suspension (the
keystone — it changes N and makes the earlier lessons interlock)**, then
drag/top-speed, then the energy capstone. Same pattern every time: pure physics +
tests, a data-only lesson, a visible car reaction, a HUD number beside its
equation. Do not start the gamified "tune the car" mode until the lessons exist —
but keep every parameter on `spec` so it's possible later.

---

## 8. Conventions & don'ts

- **Do** keep `physics.js` pure and add a test for every new equation.
- **Do** match the existing code style (small modules, clear comments that
  explain the *physics*, no framework).
- **Do** update `README.md` when you add a lesson or change the model.
- **Don't** hardcode display numbers, add a build step, add dependencies, or
  reach for a framework.
- **Don't** add radiator/cooling/thermal content to this arc (§5).
- **Don't** try to wire this into any external app — deliver the standalone lab.

---

## 9. Physics reference (collected)

**Vehicle (1969 Mustang Boss 302, `DEFAULT_SPEC`):** mass 1450 kg · wheelbase
2.79 m · CoG height 0.50 m · 57% static front weight · wheel radius 0.33 m ·
C_d 0.44 · frontal area 1.90 m² · max drive force 9600 N (1st gear) · max brake
force 14000 N clamp · rolling coefficient 0.015. Surfaces (μ_s / μ_k): dry
0.90/0.70, wet 0.60/0.45, gravel 0.40/0.35, ice 0.12/0.08.

| Quantity | Equation |
| --- | --- |
| Acceleration | a = F_net / m |
| Limiting (static) friction | F_max = μ_s · N |
| Sliding (kinetic) friction | F = μ_k · N, with μ_k < μ_s |
| Rear axle load (dynamic) | N_rear = m·g·(1 − b_f) + m·a·h / L |
| Front axle load (dynamic) | N_front = m·g·b_f − m·a·h / L |
| Aerodynamic drag | F = ½ · ρ · C_d · A · v² |
| Rolling resistance | F = C_rr · m · g |
| Kinetic energy | E = ½ · m · v² |
| **Stopping distance (ideal)** | **d = v² / (2 · μ · g)** |
| **Stopping time (ideal)** | **t = v / (μ · g)** |
| Drive force from torque (Lesson 3) | F = T · (g_gear · g_final) / r_wheel |

Friction is **hysteretic**: a tyre breaks away above μ_s·N but only recovers
below μ_k·N. Model it as two thresholds, not one, or the simulation chatters and
can latch into permanent wheelspin (this is already done for traction; do the
same for braking lockup).
