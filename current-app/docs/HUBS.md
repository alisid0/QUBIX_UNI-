# Hub concepts — the highest-leverage ideas in the curriculum

`BRIDGES.md` maps pairwise connector concepts (topic A opens a door to topic B).
This doc is a different, deeper layer: **hub concepts** — single ideas with high
*degree* in the dependency graph, where three or more topics genuinely converge into
or radiate out from the same underlying mechanism. Not an edge; a node many edges
touch.

Surfaced via a correction mid-conversation: the author pointed out that "trigonometry
is the key for understanding projectiles" and "calculus is just coordinate geometry
on the next level" aren't pairwise bridges — they're evidence of a single deeper idea
threading through many topics at once. DeepSeek (pro, thinking) was re-briefed with
that exact framing and asked to find the real hubs across the full 50-topic spine
(CURRICULUM.md), not just the MVP subset, since hubs by nature span phases. Ranked
by honest topic-count — weak/stretched connections are flagged as such rather than
hidden to pad the number.

## 1. Orthogonal decomposition — 16 topics

*Any quantity (motion, force, field, number, waveform) can be split into independent
pieces along perpendicular axes, and those pieces behave independently.*

Trigonometry (component ratios) · Vectors · Coordinate geometry (the plane as two
perpendicular number lines) · Kinematics (projectile motion splits into horizontal/
vertical) · Newtonian mechanics (resolving forces) · Work/energy/power (force
component along displacement) · Circular motion (centripetal = perpendicular
component of changing velocity) · Gravitation · Oscillations & SHM (projection of
circular motion onto a diameter) · Waves & sound (superposition, Fourier) · Electric
fields (vector components) · Magnetism (Lorentz force, cross products) · AC circuits
(phasor diagrams) · Complex numbers (the complex plane, Euler's formula) · Matrices
(each column is a basis vector's image) · Electricity & circuits (Kirchhoff's laws —
flagged as the weakest link here: "the axes aren't spatial, but the principle of
independence... carries over").

This is the generalization of "trigonometry is the key to projectiles" — trig turns
out to be one expression of an even deeper idea, not the root idea itself.

## 2. Instantaneous rate of change — 13 topics

*Zoom in on a smooth change until a tiny interval looks straight; the slope at that
point is the instantaneous rate of change.*

Limits & continuity · Differentiation · Applications of derivatives · Integration
(the reverse, via the same infinitesimal-limit idea) · Differential equations ·
Coordinate geometry (tangent as the limit of a secant) · Kinematics (velocity,
acceleration) · Newtonian mechanics (F = ma rests on acceleration as a second
derivative) · Circular motion · Oscillations & SHM · Waves (the wave equation) ·
Thermodynamics (rates of heat flow) · Chemical kinetics (reaction rate).

This is the generalization of "calculus is coordinate geometry on the next level" —
the hub concept underneath both is this single idea, pushed further.

## 3. Proportional reasoning — 11 topics

*When two quantities are proportional, their ratio never changes.*

Arithmetic fluency · Algebraic manipulation · Equations & inequalities · Functions
and graphs (y = kx) · Coordinate geometry (slope as Δy/Δx) · Measurement & units
(scaling, conversion) · Stoichiometry (mole ratios) · Electricity (Ohm's law) ·
Chemical kinetics (rate ∝ concentration) · Thermodynamics (Q ∝ ΔT) · Work/energy
(KE ∝ v² — extends the idea to a non-linear but still proportional relationship).

## 4. Conservation — 9 topics

*In a closed system, certain quantities transfer or change form, but their total
stays unchanged.*

Work/energy/power · Momentum & collisions · Electricity (charge conservation,
Kirchhoff's current law) · Thermodynamics (1st law) · Atomic & nuclear physics
(mass-energy conservation) · Chemical equilibrium (mass conservation) · Redox &
electrochemistry (electron/charge balance) · Analytical chemistry (mass-balance in
titrations) · Kinematics (mechanical energy conservation in idealised projectile
motion — a special case of the work/energy entry).

## 5. The exponential process — 7 topics

*When a quantity's rate of change is proportional to the quantity itself, the result
is exponential growth or decay.*

Exponentials & logarithms (eˣ, ln x defined by this property) · Sequences & series
(geometric sequences as discrete-time exponential growth) · Differential equations
(dy/dt = ky, the prototype ODE) · Atomic & nuclear physics (radioactive decay) ·
Chemical kinetics (first-order reactions) · AC circuits (RC/RL charging transients) ·
Thermodynamics (Newton's law of cooling).

## 6. The field concept — 7 topics

*Instead of action-at-a-distance, a source creates a field throughout space, and
another object feels a force because it sits in that field.*

Gravitation (g-field) · Electric fields (E-field) · Magnetism (B-field) ·
Electromagnetic induction (a changing B-field creates a circulating E-field) ·
Waves & sound (EM waves as self-sustaining E/B oscillation) · Optics (light as a
propagating field) · Atomic structure (the electron held by the nucleus's E-field).

## Status

Identified 2026-06-19, not yet reflected anywhere in the actual product. The Map UI
(`MAP.html`) is currently a flat per-subject list (`PATHS_MANIFEST`) with no concept
of a hub node or convergence — visualizing this would mean restructuring the Map
into a graph/constellation view, which is a real scoping decision, not yet started.

Most of the topics each hub radiates into are themselves not-started per
CURRICULUM.md (SHM, waves, fields, AC circuits, etc.) — so the immediate, MVP-relevant
value of hub #1 and #2 specifically is real: both already touch several MVP topics
(kinematics, forces, energy, coordinate geometry, matrices) and suggest teaching the
hub concept itself early/explicitly could unify several MVP boards sooner, rather
than waiting for the full 50-topic spine to fill in.
