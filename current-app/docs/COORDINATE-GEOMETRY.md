# Coordinate Geometry — the encyclopedia path (~220 BBs)

The full topic list for the M3 path (see `CONTENT-MAP.md`, `PATHS.md`). Ordered by dependency — each tier assumes the ones above it. Renamed from `COORDINATE-GEOMETRY-100.md`: the path grew from 100 to ~220 BBs when trigonometry, wave mechanics, and several genuinely-coordinate-geometry-native fields (polar, parametric, complex plane, conics, vector fields, matrices, optimization) were folded in.

Each line is a topic, not yet written content. Run each through the Loop (`AUTHORING.md`: Instance 1 → Instance 2 → Draft 1-3) to finalize.

Existing BBs are marked inline — they already exist in some form and may need re-sequencing or light editing to fit this spine, not rewriting from scratch.

**Why this got this big, honestly:** every tier here earns its place because the *concept itself* is coordinate geometry — not because a diagram happens to be involved. Optics and thermodynamics were considered and mostly rejected for the same reason (see `CONTENT-MAP.md`'s note on P5/P8) — a ray diagram or a PV-curve doesn't make the whole subject "made of" the grid the way trigonometry, waves, vectors, and kinematics are.

---

## Tier 0 — The plane itself (1–17)

1. What a number line is
2. Where zero sits
3. Positive and negative — two directions from zero
4. Fractions and decimals on the line
5. Comparing numbers — who's bigger, the line tells you
6. Distance on a number line — subtraction as length
7. The midpoint of two numbers
8. Introducing a second line — why one isn't enough *(existing: 26 "The infinite tightrope" covers 1–7 territory)*
9. The x-axis and y-axis — two number lines, one point
10. The origin — where they cross
11. Plotting a point — an ordered pair (x, y) *(existing: 27 "The grid of reality")*
12. Reading a point off the grid
13. The four quadrants
14. Which quadrant is which sign combination
15. Distance between two points on the grid (Pythagoras)
16. The midpoint of two points
17. Plotting simple shapes from points (triangle, rectangle)

## Tier 1 — Lines (18–31)

18. What "steepness" means
19. Rise and run
20. The gradient (slope) of a line
21. Positive vs negative gradient
22. Zero gradient — a flat line
23. Undefined gradient — a vertical line
24. The equation of a line: y = mx + c *(existing: 31 "Dash and the staircase")*
25. What m and c each control
26. Finding the equation from two points
27. Parallel lines — same gradient
28. Perpendicular lines — negative reciprocal gradient
29. Where a line crosses the x-axis (the root)
30. Where a line crosses the y-axis (the intercept)
31. Solving where two lines meet (simultaneous equations, graphically)

## Tier 2 — Curves (32–50)

32. Why not everything is a straight line
33. The simplest curve: y = x² *(existing: 30 "Dot and the square game")*
34. Why squaring makes a U-shape
35. The vertex of a parabola
36. Symmetry in a parabola
37. Shifting a parabola up/down (y = x² + c)
38. Shifting a parabola left/right (y = (x−a)²)
39. Stretching a parabola (y = ax²)
40. Flipping a parabola (y = −x²)
41. Where a parabola crosses the x-axis (roots)
42. The quadratic formula, visualized
43. Completing the square, visualized
44. The discriminant — how many crossings
45. Cubic curves — y = x³
46. The S-shape and why
47. Higher powers — y = x⁴, x⁵, watching the pattern
48. The circle equation x² + y² = r²
49. Circles not centred at the origin
50. The unit circle *(prototyped already — see `unit-circle-prototype.html`)*
50B. Tangent to a circle — touches at exactly one point, perpendicular to the radius there *(added later — closes a gap, "tangent" otherwise only appeared as a Tier 6 calculus topic)*
50C. Normal to a circle — perpendicular to the tangent, turns out to just be the radius extended *(added later, companion to 50B)*

## Tier 3 — Functions as machines on the grid (51–59)

51. A function as an input-output graph
52. The vertical line test — what makes a graph a function
53. Domain — what x is allowed
54. Range — what y comes out
55. Asymptotes — lines a curve never touches
56. The reciprocal function y = 1/x
57. Exponential growth on a graph
58. Logarithms as the mirror image (reflection across y = x)
59. Transformations summary — shift, stretch, reflect, combined

## Tier 4 — Vectors on the grid (60–69)

60. A vector as an arrow from one point to another *(existing: 21 "How much isn't enough")*
61. Vector components (x, y)
62. Adding vectors — tip to tail on the grid *(existing: 22 "When two things push at once")*
63. The magnitude of a vector (Pythagoras again)
64. The direction of a vector (angle from the axis)
65. Scalar multiples of a vector — stretching, shrinking, reversing an arrow
66. The resultant of two vectors
67. Resolving a vector into components *(existing: 23 "Splitting a diagonal")*
68. The dot product — what it tells you about the angle between two vectors
69. Unit vectors — i and j notation

## Tier 5 — Motion on the grid (70–80)

70. Position as a point that moves *(existing: 25 "The three accelerators")*
71. A displacement-time graph
72. Reading velocity as the gradient of displacement-time
73. A velocity-time graph
74. Reading acceleration as the gradient of velocity-time
75. Reading distance as the area under velocity-time
76. Constant velocity — a straight line
77. Constant acceleration — a curve on displacement-time
78. The SUVAT equations, each one visualized on a graph
79. Projectile motion as a parabola — combining two axes *(existing: 28 "The two lives of a falling rock", 29 "The perfect arc")*
80. Why horizontal and vertical motion are independent (the grid splits them apart)

## Tier 6 — The gateway to calculus: derivatives (81–90)

81. The slope between two points that are very close together
82. What happens as the two points merge (the limit, revisited)
83. The tangent line at a single point *(existing: 32 "The kissing curves")*
84. The derivative as the slope of the tangent
85. Differentiating y = x² from first principles, on the grid
86. The derivative as a new function — a graph of gradients
87. Stationary points — where the tangent is flat
88. Maximum and minimum points, read off a graph
89. Concavity — curving up vs curving down
90. The second derivative, visualized

## Tier 7 — The gateway to calculus: integrals (91–100)

91. The area under a curve — why it's hard with curves
92. Approximating area with rectangles (Riemann sums)
93. More rectangles, better approximation
94. The limit of infinite rectangles — the integral
95. The integral as "anti-slope" — reversing differentiation
96. Definite vs indefinite integrals, visualized
97. Area between two curves
98. Using integration to find displacement from a velocity-time graph
99. Volume of revolution — spinning a curve around an axis (intro)
100. Putting it all together — one point, moving, accelerating, swept into an area

## Tier 8 — Trigonometry on the grid (101–115)

*Merges the old M2 path. Existing BBs (17, 18, 19, 20, 24) get re-sequenced here, not rewritten.*

101. Revisiting the unit circle as the source of all trig *(links back to #50)*
102. Sine as a height — reading it straight off the circle
103. Cosine as a width — reading it straight off the circle
104. Why sin and cos repeat — periodicity from going around again
105. The graph of sin θ — built directly from the circle
106. The graph of cos θ — built directly from the circle
107. The graph of tan θ — and why it shoots to infinity
108. Amplitude — stretching a trig graph vertically
109. Period — squeezing or stretching a trig graph horizontally
110. Phase shift — sliding a trig graph sideways
111. The key identity sin²θ + cos²θ = 1 — straight from the circle's own equation
112. Solving trig equations graphically — where does the curve cross a line?
113. Inverse trig functions — reading the angle back off the height or width
114. Radians as arc length — why mathematicians prefer them to degrees *(existing: 24 "The made-up 360")*
115. The sine rule and cosine rule — extending beyond the right triangle *(existing: 17, 18, 19, 20 cover the right-triangle foundation this tier builds on)*

## Tier 9 — Waves as moving trig graphs (116–135)

*Merges the wave-mechanics half of the old P5 path. Wave-specific optics (lenses, mirrors, Snell's Law) stays in the renamed P5 · Optics.*

116. A wave is a sine graph that travels
117. Wavelength — the period, but in space instead of angle
118. Frequency — how many waves pass a point per second
119. The wave speed equation v = fλ
120. Transverse waves — the displacement is sideways
121. Longitudinal waves — the displacement is along the direction of travel
122. Amplitude and energy — taller wave, more energy
123. Superposition — adding two wave graphs together
124. Constructive interference — peaks lining up
125. Destructive interference — a peak meeting a trough
126. Standing waves — what happens when a wave reflects into itself
127. Nodes and antinodes on a standing wave graph
128. Resonance — when a driving frequency matches a natural one
129. The Doppler effect — squeezing and stretching the wave graph
130. The electromagnetic spectrum — one wave equation, many wavelengths
131. Sound as a pressure-vs-time graph
132. Light as a wave — diffraction patterns as graphs of intensity
133. Phase difference between two waves
134. Beats — what happens when two close frequencies combine
135. Wave packets — combining many frequencies into one pulse (intro)

## Tier 10 — Polar coordinates (136–145)

136. A different address system: distance and angle instead of x and y
137. Converting between polar and Cartesian
138. Plotting a point in polar form
139. The circle in polar form — embarrassingly simple
140. Spirals — r growing with θ
141. The rose curve — r = cos(kθ)
142. The cardioid — a heart-shaped curve
143. Why orbits are easier to describe in polar
144. Polar form of complex numbers *(bridge to Tier 12)*
145. When to choose polar over Cartesian

## Tier 11 — Parametric equations (146–155)

146. Letting both x and y depend on a third variable, t
147. Reframing projectile motion as a parametric curve *(links back to #79)*
148. Tracing a circle parametrically — x = cos t, y = sin t
149. The ellipse, parametrically
150. Eliminating the parameter — going back to a single equation
151. The cycloid — the path traced by a point on a rolling wheel
152. Velocity as the derivative of a parametric curve
153. Speed along a parametric path
154. Parametric curves that cross themselves
155. Why some curves can only be described parametrically

## Tier 12 — The complex plane (156–167)

156. A number that needs two axes — real and imaginary
157. Plotting a complex number as a point
158. Adding complex numbers — vector addition again
159. The modulus — distance from the origin, Pythagoras again
160. The argument — the angle, same as polar
161. Multiplying complex numbers — what happens geometrically
162. Multiplying by i — a 90-degree rotation
163. Euler's formula — e^(iθ) = cos θ + i sin θ
164. Why this one equation connects the circle, trig, and exponentials
165. De Moivre's theorem, visualized as repeated rotation
166. Roots of a complex number, evenly spaced on a circle
167. Where complex numbers show up in physics (intro — AC circuits)

## Tier 13 — Conic sections, unified (168–177)

168. Slicing a cone — where all four curves come from
169. The circle as the simplest slice
170. The ellipse — two focal points, one constant sum
171. Why planetary orbits are ellipses (Kepler's first law)
172. The parabola — one focus, one directrix
173. Why a satellite dish is a parabola
174. The hyperbola — two branches, one constant difference
175. The general conic equation — one template, four shapes
176. Eccentricity — the number that tells you which conic you've got
177. Conics in orbit: comets, planets, escape trajectories

## Tier 14 — Vector fields (178–187)

178. An arrow at every point, not just one arrow
179. Visualizing a field — drawing many small vectors
180. The gravitational field around a mass
181. The electric field around a charge
182. Field lines — where they bunch up, where they spread out
183. Equipotential lines — where the field does no work
184. The gradient — a field built from a single scalar function
185. Divergence — does the field spread out or converge (intro, conceptual)
186. Fluid flow as a vector field
187. Why field diagrams predict force without a formula

## Tier 15 — Matrices as transformations (188–199)

188. A matrix as an instruction for moving every point on the grid
189. The identity matrix — the instruction "do nothing"
190. Scaling — stretching the whole plane
191. Rotation — turning the whole plane about the origin
192. Reflection — flipping the plane across a line
193. Shearing — tilting the grid sideways
194. Combining transformations — multiplying matrices in sequence
195. The determinant — how much a transformation stretches area
196. A negative determinant — when a transformation flips orientation
197. Eigenvectors — the directions a transformation doesn't rotate
198. Eigenvalues — how much those directions stretch
199. Where this shows up: computer graphics, quantum states (intro)

## Tier 16 — Optimization & the problem-solving toolkit (200–219)

*This is the "encyclopedia that helps solve problems" tier — real techniques, not just concepts.*

200. Maximizing area with a fixed perimeter — the classic fence problem
201. Minimizing cost — the classic box problem
202. Using the derivative to find the best point, not just any stationary point
203. Constrained optimization — when not every point on the curve is allowed
204. Feasible regions — where multiple inequalities overlap
205. Linear programming — optimizing a straight-line target within a region
206. The corner-point principle — why the best answer sits at a vertex
207. Distance from a point to a line, geometrically
208. Triangulation — pinpointing a location from two known distances
209. How GPS actually finds you (spheres intersecting, simplified to circles)
210. The line of best fit — least squares, geometrically
211. Correlation as the shape of a scatter plot
212. The PV diagram — pressure and volume, work as the area beneath the curve
213. Stress-strain graphs — where a material stops being elastic
214. Force-extension graphs and Hooke's Law, revisited as area = energy
215. Ray diagrams as coordinate geometry — reflection and refraction as line equations
216. The phase portrait — plotting velocity against position instead of time
217. Reading stability from a phase portrait
218. Cryptography on a curve — a glimpse of elliptic curves (advanced, optional)
219. The encyclopedia closes the loop — every BB in this path was one curve, one transformation, or one parameter, on the same grid

---

## Notes

- This is a **topic list**, not finished content. Each topic becomes a BB through the Loop process in `AUTHORING.md`.
- The 16 existing BBs (17, 18, 19, 20, 24 from trig; 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32 from the original grid/vectors path) are marked inline — they cover fragments of this spine already and should be checked against their tier's neighbours rather than rewritten from scratch.
- Tiers 0–7 and 10–16 in particular are almost all "something on a grid that responds to a parameter" — strong candidates for the **interactive floor** type (unit-circle prototype built; reusable engine not yet designed).
- Tier 16 is explicitly the problem-solving layer: where this stops being "here's a concept" and starts being "here's how you'd actually use this to solve something." Worth prioritizing if the goal is utility, not just coverage.
- This raised the M3 path total from 100 to **~220 BBs**, and the project-wide grand total to **~462** (see `CONTENT-MAP.md`). That's a long-term build, not a launch blocker — launch readiness is about depth and polish of what exists, not hitting this full count.
