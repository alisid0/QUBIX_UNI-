# Bridges — connector concepts across topics

Concepts that, once taught in one topic, open a door into another — making the
curriculum feel like one connected web instead of siloed subjects. Built via a
two-stage DeepSeek collaboration (broad brainstorm, then a deliberate critique-and-revise
pass), reviewed and fact-checked by hand before being recorded here.

CURRICULUM.md already has a thin, topic-level "cross-links" section; this doc goes
one level more granular — naming the actual concept that does the bridging, not just
"topic A relates to topic B" — and is scoped first to the current MVP topics
(kinematics, forces, energy, atoms/elements, functions, electricity, matrices,
coordinate geometry, limits).

## The shape

**Functions** is the root — it doesn't depend on any other MVP topic for its core
meaning. From there it forks into Coordinate Geometry and Kinematics, which lead
through Forces → Energy → Electricity → Atoms/Elements, and then back to **Forces**
(electrostatic attraction inside the atom is the same push/pull Newton described).
That closes a loop rather than a clean tree — Forces and Atoms/Elements are mutually
reachable through two different routes, which is a real finding: these two topics
reinforce each other rather than sitting in a strict hierarchy.

Limits and Matrices sit as a secondary branch off Coordinate Geometry/Functions, not
yet wired into the Forces/Energy/Electricity/Atoms loop at the MVP level — and that's
an honest gap, not a forced connection.

## MVP bridge edges (the authoritative list)

Each edge below is tagged **already built** (cites the existing card/BB that locks it)
or **new** (nothing in the current BB set makes the connection explicit yet — these
are real candidates for the next round of BBs).

- **Functions → Coordinate Geometry** — *New.* "Every input-output pair of a function
  becomes a point (x, f(x)) on a plane; plotting them turns the rule into a visible
  shape."
- **Functions → Kinematics** — *New.* "An object's position as time passes is a
  function; graph it, and the steepness at any instant is its speed."
- **Kinematics → Forces** — *Already built* (Card 5/6). "Acceleration — how fast the
  velocity-time graph steepens — is the visible fingerprint of an invisible net force
  (F = ma)."
- **Forces → Energy** — *Already built* (Card 10/11). "The work done by a force over a
  distance lands in the moving object as kinetic energy; force and energy aren't
  rivals — they're the same conservation in different language."
- **Energy → Electricity** — *Already built* (EL3). "Voltage is energy per unit
  charge — a 9V battery gives every coulomb 9J, a direct 'energy price tag' on each
  electron's journey."
- **Electricity → Atoms/Elements** — *Already built* (EL2). "The current in a metal
  wire is a slow drift of free electrons — the very same particles that surround
  atomic nuclei in every element."
- **Atoms/Elements → Electricity** — *New, deferred — topic only, no BB written yet.*
  "Metals conduct because their valence electrons aren't held in a bond to any one
  atom — they detach and roam the whole piece of metal, a 'sea' of electrons around
  a fixed lattice of positive ions. That's metallic bonding, and it's the actual
  reason EL5's conductors have free electrons to push at all." Surfaced while
  building EL5 (conductors vs insulators) — the author flagged that *why* metals
  have free electrons is chemistry's question (bonding), not electricity's, and
  asked to log it rather than write the full BB now. EL5 itself stays at "some
  electrons aren't locked to any one atom," without the valence/metallic-bonding
  depth, until this gets its own board.
- **Atoms/Elements → Forces** — *New.* "The attraction between protons and electrons
  inside an atom is an electric force — the same push/pull Newton described, just
  operating on charged particles." (EL4 already names the charges inside the atom;
  no card yet ties that pull to the broader force concept from Cards 3-5.)
- **Coordinate Geometry → Matrices** — *New.* "A matrix is a function that takes
  coordinates (x, y) and returns new coordinates — one 2×2 grid of numbers can
  stretch, rotate, or flip the whole plane like a single geometric command."
- **Functions → Matrices** — *New.* "A function doesn't have to work on single
  numbers; a transformation that moves every point on the grid is a function too,
  and a compact matrix encodes it."
- **Kinematics → Limits** — *New.* "To know the speed at exactly one instant, shrink
  the time interval to zero — the limit of the average speed turns into the
  instantaneous speed."
- **Limits → Coordinate Geometry** — *New.* "The tangent line to a curve at a point
  is the limit of secant lines through that point and a neighbour — as the neighbour
  slides in, the secant's slope homes in on the curve's steepness right there."
  (Anchored on Card 32, which already hints at this without naming "limit.")

## Future bridges (post-MVP, kept for later)

- **Energy → Entropy** — "Energy never disappears, so why can't you un-crack an egg?
  Something else always 'spreads out' when energy changes form." (2nd law of
  thermodynamics; this is the line of thinking that originally surfaced while
  reworking EL3.)
- **Electricity → Magnetism** — current deflects a compass needle; a moving magnet
  induces current. Two faces of one field.
- **Limits → Integration** — Riemann sums, area under a curve as the reverse of a
  derivative.
- **Functions → Differential Equations** — knowing the derivative everywhere, "undo"
  it to find the function itself.
- **Vectors → Electromagnetic Fields** — a field assigns an arrow (not just a number)
  to every point in space.
- **Atomic Structure → Chemical Bonding** — octet rule, ion formation.
- **The Mole → Stoichiometry** — atomic mass in grams per mole.

## Five drafted card sketches (from the six new MVP edges above)

Full two-floor drafts exist for five of the new edges, in Strata's voice and format.
**Not yet implemented as real BBs** — each needs a fix before it's draft-ready:

1. **"The Speedometer Secret"** (Kinematics → Limits) — clean, worked example
   converges correctly (toy car, distance = t², instantaneous speed at t=3s is 6 m/s).
2. **"How a Speed Graph Predicts the Future"** (Kinematics → Limits, the derivative
   angle) — clean, worked example converges correctly (rocket velocity, acceleration
   at t=2s is 6 m/s²).
3. **"A Function's Picture"** (Functions → Coordinate Geometry) — math checks out
   (f(x) = x² - 2x, parabola through the right points) but **uses an HTML `<table>`**,
   which doesn't match the chalk aesthetic (reads as a spreadsheet, not a chalkboard).
   Needs reformatting before use.
4. **"One Matrix, a Whole Plane of Arrows"** (Coordinate Geometry → Matrices) — math
   checks out (stretch matrix applied to (3,4)) but the matrix notation is a raw
   monospace `<span>`. Should use DESIGN.md's formula-box convention instead.
5. **"From Slope to an Arrow"** (Coordinate Geometry → Vectors — outside the strict
   MVP-only list above, but genuinely useful) — clean, 3-4-5 triangle keeps the
   numbers tidy.

All five drafts use guessed concept-slug strings for `buildsOn` (e.g.
`"speed-velocity-acceleration"`) rather than real card IDs — these need correcting to
actual `"Card N"` / `"CGN"` / `"MXN"` identifiers before any draft is wired into a
real file.

**Not drafted yet:** Atoms/Elements → Forces, and Functions → Matrices /
Coordinate Geometry → Matrices (only one of the two matrix-bridge directions got a
full card sketch).

## Status

Brainstormed and reviewed 2026-06-19. Nothing here is locked or run through the real
Loop with the author — this is raw material for deciding what to write next, same
status as the Editor Mode batch drafts in ELECTRICITY.md/MATRICES.md.
