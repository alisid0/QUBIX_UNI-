/* ============================================================
   COORDINATE GEOMETRY — FULL DRAFT (219 BBs)
   Generated via Editor Mode (AUTHORING.md) — simulated
   Instance 1/2 + Draft 1-3, NOT yet author-reviewed.

   This is a STAGING file, not live content. Nothing here is
   wired into index.html. Topic numbering (CG1...CG219) refers
   to COORDINATE-GEOMETRY.md; final Card numbers get assigned
   when/if a BB is approved and merged into the real DECK.

   How to review: each BB below is a C(act, kicker, title,
   [layers], img, tags) call, identical format to index.html.
   Read tier by tier (matches COORDINATE-GEOMETRY.md's 17 tiers).
   Edit text directly in this file, or mark BBs for rewrite/cut.

   Existing-card overlaps are flagged inline at the top of each
   tier file (search "existing card" in this file) — those need
   an explicit keep/replace/merge decision per CONTENT-MAP.md's
   established pattern, not a silent merge.

   Act is set to "V" mechanically (engine still requires it as
   first param) but per NOMENCLATURE.md, paths replace acts as
   the user-facing eyebrow label - that code change is still
   pending separately.
   ============================================================ */

/* ============================================================
   COORDINATE GEOMETRY — Tier 0: The plane itself
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Status: simulated Instance 1/2 + Draft 1-3, NOT author-reviewed.
   Author reviews/edits before anything merges into index.html.
   Numbering below (CG1, CG2...) refers to COORDINATE-GEOMETRY.md
   topic numbers, not final Card numbers.
   ============================================================ */

const TIER_00_THE_PLANE = [

  // CG1 — What a number line is
  C("V","CG1","A line that holds every number",[
    "<p>A number line is a straight line where every point stands for a number. Walk along it to the right and the numbers climb. Walk back and they fall.</p><p>It turns \"more\" and \"less\" into \"further right\" and \"further left\" — a quantity becomes a place you can point to.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"number-line",ground:"g0",buildsOn:[]}),

  // CG2 — Where zero sits
  C("V","CG2","The point everything is measured from",[
    "<p>Zero isn't nothing on the line. It's a place, like any other point, and it's the one every other number is measured against.</p><p>A number doesn't just say \"how much.\" It says \"this much more than zero\" or \"this much less.\"</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"zero; origin-1d",ground:"g0",buildsOn:["CG1"]}),

  // CG3 — Positive and negative
  C("V","CG3","Two directions from zero",[
    "<p>Positive numbers sit to the right of zero. Negative numbers sit to the left. The sign in front of a number isn't really about size, it's about which way from zero you're standing.</p><p>−5 isn't a tiny version of 5. It's 5 steps the other direction — and which side gets called \"positive\" is a convention, not a law. Everyone just agreed on right, and never had reason to flip it.</p>",
    "<p>A bank balance of −50 isn't a small amount of money. It's a debt of 50. The minus sign carries a direction, not a shrinking.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"positive-negative; sign-as-direction",ground:"g0",buildsOn:["CG2"]}),

  // CG4 — Fractions and decimals on the line
  C("V","CG4","The gaps between the whole numbers",[
    "<p>The number line isn't just dots at 1, 2, 3. Between any two whole numbers there's room for halves, quarters, and decimals: 1.5 sits exactly halfway between 1 and 2.</p><p>However finely you slice the gap, there's always a number that lives there.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"fractions-decimals-on-line; density",ground:"g0",buildsOn:["CG1"]}),

  // CG5 — Comparing numbers — the line tells you
  C("V","CG5","The line settles every argument about size",[
    "<p>Which is bigger, −3 or −8? Find them on the line. Whichever one sits further right is the bigger number, no matter how the digits look.</p><p>−3 is to the right of −8, so −3 is bigger, even though 8 looks like the larger digit.</p><p>Since the line never ends in either direction, there's always a bigger number and always a smaller one. That's exactly what +∞ and −∞ mean — not numbers you can land on, just the fact that comparison never runs out.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"comparing-numbers; ordering; infinity-notation",ground:"g0",buildsOn:["CG3"]}),

  // CG6 — Distance on a number line — subtraction as length
  C("V","CG6","Subtraction is just a length",[
    "<p>How far apart are 2 and 9 on the line? Count it out, 3-4-5-6-7-8-9, that's seven steps. Or just subtract: 9 − 2 = 7. Same answer — subtraction is just counting, done in one move.</p>",
    "<p>It works with negatives too. The distance between −3 and 4 is 4 − (−3) = 7. Distance can't be negative, so if subtracting one way gives a negative number, just flip it.</p><div class='formula'>distance = |a − b|<span class='gloss'>Subtract the two points, then drop the sign — distance is always positive.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"distance-1d; subtraction-as-length",ground:"g0",buildsOn:["CG3"]}),

  // CG7 — The midpoint of two numbers
  C("V","CG7","The exact middle, found by averaging",[
    "<p>The midpoint between 2 and 9 is 5.5 — found by adding them and halving the result. Averaging two numbers always lands you exactly between them on the line.</p><div class='formula'>midpoint = (a + b) / 2<span class='gloss'>Add the two points, then halve it.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"midpoint-1d",ground:"g0",buildsOn:["CG6"]}),

  // CG8 — Introducing a second line — why one isn't enough
  C("V","CG8","One line can't hold everything",[
    "<p>A number line tells you how far along, but that's not always enough. Picture a movie theatre: \"seat 12\" alone doesn't pin down one place, every row has its own seat 12. You need two independent numbers at once, row and seat, to find the exact one.</p><p>To fix that, we don't add more numbers to the same line. We add a second line, crossing the first.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"limits-of-1d; need-for-2d",ground:"g0",buildsOn:["CG1"]}),

  // CG9 — The x-axis and y-axis
  C("V","CG9","Two number lines, crossed at a right angle",[
    "<p>Lay one number line flat. Stand a second one upright, crossing it at a right angle. The flat one is the x-axis, the upright one is the y-axis. x is conventionally the input, chosen first; y is the output, produced after — exactly what \"y = f(x)\" means later on: pick x, get y.</p><p>Together they don't just measure two separate things. They measure one thing: position, in a way one line alone never could.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"x-axis; y-axis; cartesian-plane",ground:"g0",buildsOn:["CG8"]}),

  // CG10 — The origin
  C("V","CG10","Where the two lines meet",[
    "<p>The origin is the single point where the x-axis and y-axis cross. It's zero on both lines at once, and it's where every measurement on the grid starts from.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"origin-2d",ground:"g0",buildsOn:["CG9"]}),

  // CG11 — Plotting a point
  C("V","CG11","Every place on the grid has an address",[
    "<p>A point on the grid is written (x, y): how far along the x-axis, then how far up the y-axis. To plot (3, 4), go to 3 on the x-axis first, then move 4 straight up from there. That's the point.</p><p>It's an address — an <strong>ordered pair</strong>. Two numbers, one exact place, and the order is non-negotiable: (3, 4) and (4, 3) are different points entirely.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"plotting-points; ordered-pair",ground:"g0",buildsOn:["CG9","CG10"]}),

  // CG12 — Reading a point off the grid
  C("V","CG12","Going backwards: point to address",[
    "<p>Plotting goes from numbers to a point. Reading a graph goes the other way: drop a perpendicular from the point to each axis. Where it lands on the x-axis gives you x; where it lands on the y-axis gives you y.</p><p>That trips people up at first, since distance from the y-axis gives the x-coordinate, not the y. It's the reverse of what you'd guess, and it's exactly CG11 run backwards.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"reading-coordinates",ground:"g0",buildsOn:["CG11"]}),

  // CG13 — The four quadrants
  C("V","CG13","The grid splits into four rooms",[
    "<p>The two axes cut the plane into four regions, called quadrants, numbered I to IV going anticlockwise from the top right.</p><p>Every point on the grid lives in exactly one of them, unless it sits right on an axis.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"quadrants",ground:"g0",buildsOn:["CG11"]}),

  // CG14 — Which quadrant is which sign combination
  C("V","CG14","The signs of x and y give it away",[
    "<p>You don't need to look at a picture to know which quadrant a point is in. Just check the signs.</p><p>Both positive: quadrant I. Negative x, positive y: quadrant II. Both negative: quadrant III. Positive x, negative y: quadrant IV.</p><p>Notice the pattern: moving between neighbouring quadrants always flips exactly one sign, never both at once.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"quadrant-signs",ground:"g0",buildsOn:["CG13"]}),

  // CG15 — Distance between two points (Pythagoras)
  C("V","CG15","Borrowing a triangle to measure a diagonal",[
    "<p>Two points on a number line: just subtract. Two points on a grid: the straight-line gap between them is diagonal, and subtraction alone won't measure a diagonal.</p><p>So build a right-angled triangle: the horizontal gap is one side, the vertical gap is the other, and the diagonal distance is the hypotenuse.</p>",
    "<p>Pythagoras hands back the hypotenuse from the other two sides.</p><div class='formula'>d = √((x₂−x₁)² + (y₂−y₁)²)<span class='gloss'>The horizontal gap squared, plus the vertical gap squared, then square-rooted.</span></div><p>It's the number-line distance formula from CG6, just run twice and stitched together with Pythagoras.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"distance-formula-2d; pythagoras",ground:"g0",buildsOn:["CG6","CG11"]}),

  // CG16 — The midpoint of two points
  C("V","CG16","Averaging both coordinates at once",[
    "<p>The midpoint between two points on a grid is found the same way as on a line, just done twice: average the x-coordinates, then average the y-coordinates.</p><div class='formula'>midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)<span class='gloss'>Average the x's. Average the y's. That's the point exactly between them.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"midpoint-2d",ground:"g0",buildsOn:["CG7","CG11"]}),

  // CG17 — Plotting simple shapes from points
  C("V","CG17","A shape is just a few points, joined up",[
    "<p>Plot three points and join them and you have a triangle. Plot four and you might have a rectangle, a kite, or nothing recognisable at all, depending where they sit.</p><p>Don't just eyeball the shape, prove it. Take (0,0), (4,0), (4,3), (0,3): run CG15's distance formula on each side and you get 4, 3, 4, 3. Opposite sides equal, confirmed by calculation rather than by looking, which is exactly how you prove it's a rectangle.</p><p>Every shape on a grid, however complicated, is built the same way: a list of points, connected in order, provable with the tools already in this tier.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"shapes-from-points",ground:"g0",buildsOn:["CG11"]}),

  // SNIPPET — Descartes / Cartesian coordinates
  C("V","SNIPPET-T0","Did you know? The footnote that ate the book",[
    "<p>René Descartes published this idea in 1637 — not as its own book, but as an appendix called La Géométrie, tucked onto the back of a philosophy book, Discourse on the Method.</p><p>Legend says it came to him while lying in bed, watching a fly walk across the ceiling. He realised he could pin down the fly's exact position at any instant using just its distance from two walls.</p><p>The twist: the footnote outlived the book. Almost nobody reads Discourse on the Method for its philosophy anymore. The entire system is named after the appendix that was barely the point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"history-descartes",kind:"snippet",ground:"g0",buildsOn:["CG9"]}),

  // RECAP — Tier 0
  C("V","RECAP-T0","Quick things to remember — Tier 0",[
    "<ul><li>A number line orders every real number — equal spacing means equal difference.</li><li>Zero is the reference point, not the start. Right = positive, left = negative, by convention.</li><li>Between any two numbers there are infinitely many more.</li><li>Distance on a line = |a − b|. Midpoint = (a + b) / 2.</li><li>Two number lines crossed at a right angle make the x-axis (horizontal) and y-axis (vertical).</li><li>A point's address is the ordered pair (x, y) — x first, always.</li><li>The origin (0, 0) is where both axes' zeros meet.</li><li>Distance on the grid: d = √((x₂−x₁)² + (y₂−y₁)²). Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2).</li><li>Four quadrants, I–IV, anticlockwise from top-right: (+,+), (−,+), (−,−), (+,−).</li></ul>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"tier-0-recap",kind:"recap",ground:"g0",buildsOn:["CG17"]}),

];

/* ============================================================
   BRIDGE — Tier 0 to Tier 1: everything from here is a machine
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Connects to existing production Card 14 ("Functions" / the
   vending machine). Not CG-numbered — same non-numbered pattern
   as Snippet/Recap cards, to avoid renumbering the whole path.
   ============================================================ */

const BRIDGE_FUNCTIONS = [

  // BRIDGE — Card 14 ("Functions"), exact, plus a forward-link into this path
  // NOTE: Card 14 currently has img:null in production. IMAGE-PROMPTS.md
  // (BB 14, option a) specs a vending-machine image that was never generated -
  // images/ only goes up to card-11 (+card-21). Flagging, not fabricating a path.
  C("III","BRIDGE-FN1","Functions",[
    "<p>Imagine a machine that does only one thing. You press a button, it drops out a bag of chips. That's it.</p><p>One button, one result, every time.</p>",
    "<p>You've seen these in malls, railway stations, airports. It's called a vending machine. Press B4, get B4's crisps, every time. Press a microwave's popcorn button, get the popcorn setting, every time.</p><p>Each button is a function: one reliable input, one reliable output. Everything a microwave or a phone can do, all its buttons together, is what we casually call its functionality. The everyday word and the maths word are the same word.</p>",
    "<p>Now we write it down. Mathematicians call the machine f, the input x, and the output f(x).</p><p>So a \"double it\" machine is f(x) = 2x. Feed it 3, it gives 6. Feed it 10, it gives 20. The notation just names the machine and what you feed it.</p><p>Almost everything in physics and maths from here is built on this.</p>",
    "<p>So how is this different from a plain equation?</p><p>An equation is a question with an answer. \"x + 4 = 10\" is solved by one value: 6. It sits still. A function doesn't have a single answer. It's a machine that keeps running.</p><p>Feed f(x) = 2x a 3 and it gives 6; feed it 10 and it gives 20. An equation pins down a value. A function describes how one thing turns into another, for every input you could give it.</p>",
    "<p>Everything in this path from here is the same machine, wearing a different formula. A line is f(x) = mx + c, a \"multiply, then add\" machine. A parabola is f(x) = x², a \"square it\" machine. Even s = ut + ½at², from physics, is the same idea: feed it a time, get back a displacement.</p><p>One exception is coming soon: a circle. Feed it an x and sometimes you get two y's back, not one — which is exactly why a circle isn't a function. Worth keeping that exception, not smoothing it over.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"function-bridge; function; f-of-x",kind:"bridge",ground:"g0",buildsOn:["card14","CG17"]}),

];

/* ============================================================
   COORDINATE GEOMETRY — Tier 1: Lines
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_01_LINES = [

  // CG18 — What "steepness" means
  C("V","CG18","How much a line leans",[
    "<p>Draw a line that passes through quadrant I, cuts into quadrant II, and eventually reaches quadrant III — never dipping into quadrant IV. Slide your finger along it: as x increases, y increases too, at the same rate the entire way. x and y aren't moving independently, they're locked into a relationship.</p><p>That rate never changes, the whole way along, and that’s what makes it a line rather than a curve. A curve's rate keeps changing as you move; a line's never does.</p>",
    "<p>That constant rate of change has a name: <strong>steepness</strong>. A line climbing left to right (like the one above) has positive steepness. One falling left to right has negative steepness. Either way, it's exactly measurable, not just eyeballed.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"steepness-intro; constant-rate",ground:"g0",buildsOn:["CG11"]}),

  // CG19 — Vertical change and horizontal change between two points
  C("V","CG19","How far up, how far along",[
    "<p>Pick two points on a line. There are exactly two distances worth measuring between them: how far up (or down) you went, and how far along you went. Mathematicians write these as Δy (vertical change) and Δx (horizontal change) — Δ just means \"change in.\"</p><p>A steep line has a big Δy for a small Δx. A gentle line has the opposite.</p>",
    "<p>Take the points (1, 2) and (4, 8) on a line. Δy = 8 − 2 = 6. Δx = 4 − 1 = 3. That's the whole measurement: 6 up, 3 along.</p><p>Some textbooks give these two distances nicknames: \"rise\" for Δy, \"run\" for Δx — common in American classrooms, less so elsewhere. NCERT and most other curricula skip the nicknames and go straight to Δy and Δx, which is what actually carries forward into the formula.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"delta-y; delta-x; rise-run",ground:"g0",buildsOn:["CG18"]}),

  // CG20 — The gradient (slope) of a line
  C("V","CG20","Turning the lean into one number",[
    "<p>Divide Δy by Δx and steepness stops being a vague impression and becomes one exact number: the <strong>gradient</strong> — also called the <strong>slope</strong>. Same number, two names for it.</p><div class='formula'>m = Δy / Δx = (y₂−y₁) / (x₂−x₁)<span class='gloss'>The vertical change between two points on the line, divided by the horizontal change.</span></div>",
    "<p>Same two points as before, (1, 2) and (4, 8): m = (8 − 2) / (4 − 1) = 6 / 3 = 2. That line climbs 2 units for every 1 unit it moves right.</p><p>Pick any other two points on that same line, say (2, 4) and (4, 8): m = (8 − 4) / (4 − 2) = 4 / 2 = 2. Same answer. That's what makes a line straight — the gradient never changes, wherever you measure it.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"gradient; slope",ground:"g0",buildsOn:["CG19","CG15"]}),

  // CG21 — Positive vs negative gradient
  C("V","CG21","Uphill or downhill, left to right",[
    "<p>Read a graph left to right. If the line climbs, the gradient is positive. If it falls, the gradient is negative.</p><p>The sign isn't decoration, it's the direction the line is heading, exactly like the sign on a number line.</p>",
    "<p>The line through (1, 2) and (4, 8) has m = 2 — positive, and it climbs left to right. Compare a line through (1, 8) and (4, 2): m = (2 − 8) / (4 − 1) = −6 / 3 = −2. Negative, and it falls left to right. Same two points, reversed heights, opposite sign.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"gradient-sign",ground:"g0",buildsOn:["CG20"]}),

  // CG22 — Zero gradient — a flat line
  C("V","CG22","No rise at all",[
    "<p>A perfectly horizontal line never climbs or falls. Its Δy is always zero, whatever Δx is, so its gradient is zero.</p><p>A gradient of zero doesn't mean \"no line.\" It means a line that goes nowhere up or down.</p>",
    "<p>Take (1, 4) and (6, 4) — same y, different x. m = (4 − 4) / (6 − 1) = 0 / 5 = 0. Zero on top of the fraction, whatever sits on the bottom, always gives zero.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"zero-gradient",ground:"g0",buildsOn:["CG20"]}),

  // CG23 — Undefined gradient — a vertical line
  C("V","CG23","When the formula breaks",[
    "<p>A perfectly vertical line has zero Δx — it never moves along at all. The gradient formula needs to divide by that Δx, and dividing by zero is undefined.</p><p>So a vertical line doesn't have a small gradient or a huge one. It has no gradient. The formula simply doesn't apply.</p>",
    "<p>Take (3, 1) and (3, 9) — same x, different y. m = (9 − 1) / (3 − 3) = 8 / 0. Not zero, not a huge number — undefined. The calculation itself breaks down.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"undefined-gradient; vertical-line",ground:"g0",buildsOn:["CG20"]}),

  // CG24 — The equation of a line: y = mx + c
  C("V","CG24","One equation, every point on the line",[
    "<p>Every point on a straight line obeys the same rule: y = mx + c. Feed in any x, and the equation hands back the matching y, for every single point on that line and no others.</p><div class='formula'>y = mx + c<span class='gloss'>m is the gradient. c is where the line crosses the y-axis.</span></div>",
    "<p>Take y = 2x + 3. Feed in x = 1: y = 2(1) + 3 = 5. Feed in x = 4: y = 2(4) + 3 = 11. Every (x, y) pair this equation produces, (1, 5), (4, 11), or any other, sits on that one line, and nothing else does.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"line-equation; y-mx-c",ground:"g0",buildsOn:["CG20"]}),

  // CG25 — What m and c each control
  C("V","CG25","Two knobs, two jobs",[
    "<p>In y = mx + c, the two letters do two completely separate jobs. m controls the lean of the line — how steep, and which way. c controls where the line sits — specifically, where it crosses the y-axis.</p><p>Change m and the line tilts. Change c and the line slides up or down without tilting at all.</p>",
    "<p>y = 2x + 3 and y = 2x + 7 share m = 2, so they're tilted identically — just shifted, since c changed from 3 to 7. y = 2x + 3 and y = 5x + 3 share c = 3, so they cross the y-axis at the same spot — but m changed from 2 to 5, so one is far steeper.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"m-and-c-roles",ground:"g0",buildsOn:["CG24"]}),

  // CG26 — Finding the equation from two points
  C("V","CG26","Reverse-engineering the line",[
    "<p>Given just two points, you can rebuild the whole equation. First find the gradient using Δy/Δx. Then plug one point and that gradient into y = mx + c and solve for c.</p><p>Two points are all a straight line ever needs.</p>",
    "<p>Take (2, 7) and (5, 16). m = (16 − 7) / (5 − 2) = 9 / 3 = 3. Plug (2, 7) into y = 3x + c: 7 = 3(2) + c, so c = 1. The line is y = 3x + 1. Check it against the other point: 3(5) + 1 = 16. ✓</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"equation-from-two-points",ground:"g0",buildsOn:["CG20","CG24"]}),

  // CG27 — Parallel lines
  C("V","CG27","Same lean, different position",[
    "<p>Two lines are parallel exactly when they share the same gradient. They lean at the same angle, so however far you follow them, they never meet.</p><p>Different c, same m: parallel but never touching.</p>",
    "<p>y = 2x + 3 and y = 2x − 4 both have m = 2. Same lean, shifted apart — at every x, the second line sits exactly 7 below the first, so they run side by side forever.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parallel-lines",ground:"g0",buildsOn:["CG24"]}),

  // CG28 — Perpendicular lines
  C("V","CG28","Meeting at a perfect right angle",[
    "<p>Two lines cross at exactly 90° when their gradients are negative reciprocals of each other: flip one gradient upside down and switch its sign, and you get the other.</p><div class='formula'>m₁ × m₂ = −1<span class='gloss'>Multiply the two gradients of perpendicular lines and you always get −1.</span></div>",
    "<p>A gradient of 2 pairs with a perpendicular gradient of −1/2. Check it: 2 × (−1/2) = −1. ✓ Steep meets shallow, opposite sign, at a perfect corner.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"perpendicular-lines; negative-reciprocal",ground:"g0",buildsOn:["CG24"]}),

  // CG29 — Where a line crosses the x-axis (the root)
  C("V","CG29","Setting y to zero",[
    "<p>A line crosses the x-axis exactly where its height, y, is zero. Set y = 0 in the line's equation and solve for x, and that x is where the crossing happens.</p><p>This crossing point has a name: the root.</p>",
    "<p>Take y = 2x − 6. Set y = 0: 0 = 2x − 6, so x = 3. The line crosses the x-axis at (3, 0) — its root is 3.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"x-intercept; root",ground:"g0",buildsOn:["CG24"]}),

  // CG30 — Where a line crosses the y-axis (the intercept)
  C("V","CG30","Setting x to zero",[
    "<p>A line crosses the y-axis exactly where x = 0. Plug x = 0 into y = mx + c and everything with m vanishes, leaving y = c.</p><p>That's why c is called the intercept: it's the height the line sits at the instant it crosses the y-axis.</p>",
    "<p>Same line as before, y = 2x − 6. At x = 0: y = 2(0) − 6 = −6. It crosses the y-axis at (0, −6) — and sure enough, c = −6, exactly as the equation already said.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"y-intercept",ground:"g0",buildsOn:["CG24"]}),

  // CG31 — Solving where two lines meet
  C("V","CG31","One point, shared by two equations",[
    "<p>Two different lines cross at exactly one point, unless they're parallel. At that point, both equations are true at once: the same x and y satisfy both.</p><p>Set the two equations equal to each other, solve for x, then plug it back in for y. That's the meeting point, found without ever drawing the graph.</p>",
    "<p>Take y = 2x − 6 and y = −x + 9. Set them equal: 2x − 6 = −x + 9, so 3x = 15, x = 5. Plug back in: y = 2(5) − 6 = 4. They meet at (5, 4). Check the other equation: −5 + 9 = 4. ✓</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"simultaneous-equations-graphical",ground:"g0",buildsOn:["CG24"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 2: Curves
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_02_CURVES = [

  // CG32 — Why not everything is a straight line
  C("V","CG32","When the gradient itself changes",[
    "<p>A straight line has the same gradient everywhere, that's what makes it straight. But a ball thrown in the air, a population growing, a satellite dish — none of these change at a constant rate.</p><p>When the rate of change keeps changing, the graph stops being a line. It curves.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"why-curves-exist",ground:"g0",buildsOn:["CG20"]}),

  // CG33 — The simplest curve: y = x²
  C("V","CG33","Squaring, plotted",[
    "<p>Take y = x². Feed in 1, get 1. Feed in 2, get 4. Feed in 3, get 9. Plot those points and a curve appears: it dips down then sweeps back up, shaped like a U.</p><p>This shape is called a parabola, and it's the first curve worth knowing by sight.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parabola-intro; y-x-squared",ground:"g0",buildsOn:["CG11"]}),

  // CG34 — Why squaring makes a U-shape
  C("V","CG34","Squaring erases the minus sign",[
    "<p>(−3)² and (3)² both equal 9. Squaring throws away the sign, so every negative x lands on the same height as its positive twin.</p><p>That's the entire reason for the U-shape: the left side of the curve is a mirror of the right, because squaring can't tell positive from negative.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"squaring-symmetry",ground:"g0",buildsOn:["CG33"]}),

  // CG35 — The vertex of a parabola
  C("V","CG35","The turning point",[
    "<p>Every parabola has one point where it stops falling and starts rising, or stops rising and starts falling. That point is the vertex.</p><p>For the plain curve y = x², the vertex sits right at the origin, (0, 0).</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"vertex",ground:"g0",buildsOn:["CG33"]}),

  // CG36 — Symmetry in a parabola
  C("V","CG36","A mirror running through the vertex",[
    "<p>Draw a vertical line through a parabola's vertex and the two halves match exactly, like a reflection. This is the axis of symmetry.</p><p>It's a useful shortcut: find one side of the curve, and the other side is free.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"axis-of-symmetry",ground:"g0",buildsOn:["CG35"]}),

  // CG37 — Shifting a parabola up/down
  C("V","CG37","Adding a number lifts the whole curve",[
    "<p>y = x² + 3 is the same U-shape as y = x², just lifted 3 units higher everywhere. Every output gets the same bonus added on, so the whole curve rides up together.</p><p>Subtract instead, and the curve drops the same way.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"vertical-shift",ground:"g0",buildsOn:["CG33"]}),

  // CG38 — Shifting a parabola left/right
  C("V","CG38","Moving the input point, not the output",[
    "<p>y = (x − 3)² looks like a small change, but it shifts the whole parabola 3 units to the right, not left. The vertex moves to wherever the bracket equals zero, and the bracket is zero when x = 3.</p><p>Plus inside the bracket shifts left. Minus shifts right. It feels backwards until you check where the bracket actually hits zero.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"horizontal-shift",ground:"g0",buildsOn:["CG33","CG35"]}),

  // CG39 — Stretching a parabola
  C("V","CG39","Multiplying makes it narrower or wider",[
    "<p>y = 3x² climbs much faster than y = x², so the curve looks pulled narrow and tall. y = 0.3x² climbs slowly, so it looks squashed flat and wide.</p><p>The number out front controls how aggressively the curve reacts to moving away from its vertex.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"vertical-stretch",ground:"g0",buildsOn:["CG33"]}),

  // CG40 — Flipping a parabola
  C("V","CG40","A minus sign turns the U upside down",[
    "<p>y = −x² is the mirror image of y = x², flipped across the x-axis. Instead of dipping down and rising, it rises to a peak then falls away on both sides.</p><p>The vertex stops being the lowest point and becomes the highest.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"reflection; negative-leading-coefficient",ground:"g0",buildsOn:["CG33"]}),

  // CG41 — Where a parabola crosses the x-axis
  C("V","CG41","The roots — same idea as a line's, applied to a curve",[
    "<p>Just like a line, a parabola crosses the x-axis exactly where y = 0. But a curve can cross twice, once, or not at all, depending on how it sits relative to the axis.</p><p>These crossing points are still called roots.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"roots-of-quadratic",ground:"g0",buildsOn:["CG29","CG33"]}),

  // CG42 — The quadratic formula, visualized
  C("V","CG42","A formula that finds both crossings at once",[
    "<p>For any quadratic ax² + bx + c, the quadratic formula hands back exactly the x-values where the curve crosses the x-axis.</p><div class='formula'>x = (−b ± √(b² − 4ac)) / 2a<span class='gloss'>The ± means two answers: one root on each side of the vertex.</span></div><p>The ± isn't a quirk of the algebra. It's the formula admitting the curve usually crosses in two places, symmetric about the vertex.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"quadratic-formula",ground:"g0",buildsOn:["CG41"]}),

  // CG43 — Completing the square, visualized
  C("V","CG43","Rewriting the curve to expose its vertex",[
    "<p>Completing the square rewrites ax² + bx + c into the form a(x − h)² + k. Once it's in that form, the vertex is sitting right there in the equation: (h, k).</p><p>It's the same curve, just written so the turning point can be read off directly instead of calculated.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"completing-the-square",ground:"g0",buildsOn:["CG35","CG38"]}),

  // CG44 — The discriminant
  C("V","CG44","One number that predicts how many crossings",[
    "<p>Inside the quadratic formula sits b² − 4ac, called the discriminant. Its sign alone tells you how many times the curve crosses the x-axis, before you solve anything.</p><p>Positive: two crossings. Zero: the curve just grazes the axis at one point. Negative: the curve never reaches the axis at all.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"discriminant",ground:"g0",buildsOn:["CG42"]}),

  // CG45 — Cubic curves
  C("V","CG45","One power higher: y = x³",[
    "<p>Cube instead of square and the U-shape disappears. y = x³ doesn't erase the sign the way squaring does, so negative inputs give negative outputs. The curve doesn't mirror, it flows.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cubic-curves",ground:"g0",buildsOn:["CG33"]}),

  // CG46 — The S-shape and why
  C("V","CG46","Why a cubic wiggles instead of turning once",[
    "<p>A parabola turns once, at its vertex. A cubic curve can flatten, pause, and keep going in the same direction, producing a stretched S-shape instead of a single clean U.</p><p>That pause is the curve's rate of change briefly slowing to zero without actually reversing direction.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cubic-shape",ground:"g0",buildsOn:["CG45"]}),

  // CG47 — Higher powers
  C("V","CG47","The pattern as the power keeps climbing",[
    "<p>Even powers (x², x⁴, x⁶...) all erase the sign, so they all produce U-like shapes, just flatter near the bottom as the power rises. Odd powers (x³, x⁵, x⁷...) all keep the sign, so they all flow through the origin the way a cubic does.</p><p>Once you've seen x² and x³, you've essentially seen the whole family.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"polynomial-powers-pattern",ground:"g0",buildsOn:["CG33","CG45"]}),

  // CG48 — The circle equation
  C("V","CG48","Every point exactly r away from the centre",[
    "<p>A circle isn't defined by an equation like y = ..., it's defined by a constraint: every point on it sits exactly the same distance, r, from the centre.</p><div class='formula'>x² + y² = r²<span class='gloss'>This is just the distance formula, with the centre at the origin and the distance fixed at r.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"circle-equation",ground:"g0",buildsOn:["CG15"]}),

  // CG49 — Circles not centred at the origin
  C("V","CG49","Sliding the whole circle",[
    "<p>Move the centre to (h, k) instead of the origin and the equation shifts the same way a parabola's does: subtract h from x, subtract k from y.</p><div class='formula'>(x−h)² + (y−k)² = r²<span class='gloss'>Same circle, just centred wherever you need it.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"circle-not-at-origin",ground:"g0",buildsOn:["CG48","CG38"]}),

  // CG50 — The unit circle
  C("V","CG50","The one circle worth memorising",[
    "<p>A circle of radius exactly 1, centred at the origin, is called the unit circle. Every point on it is exactly 1 unit from the centre, which makes it the cleanest possible stage for measuring angles.</p><p>It's the foundation the next stretch of this path is built on: trigonometry starts here.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"unit-circle",ground:"g0",buildsOn:["CG48"]}),

  // CG50B — Tangent to a circle
  C("V","CG50B","The line that touches once, and means it",[
    "<p>A tangent line touches a circle at exactly one point and no more, no matter how far you extend it in either direction. At that single point, the tangent is perpendicular to the radius drawn to it.</p><p>That's the whole trick to finding one: get the radius's gradient, flip it to the negative reciprocal (CG28), and you have the tangent's gradient. Pin it to the touch point and you have the line.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"tangent-to-circle",ground:"g0",buildsOn:["CG48","CG28"]}),

  // CG50C — Normal to a circle
  C("V","CG50C","The line perpendicular to the tangent — which turns out to be the radius",[
    "<p>The normal at a point on a circle is the line perpendicular to the tangent at that same point. Work out what that actually is, and it's just the radius, extended through the point and out the other side.</p><p>That's a surprisingly clean result, and it's special to circles. Try the same question on a parabola later (CG83) and the normal won't pass through anything as tidy as a single fixed centre.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"normal-to-circle",ground:"g0",buildsOn:["CG50B"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 3: Functions as machines on the grid
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_03_FUNCTIONS = [

  // CG51 — A function as an input-output graph
  C("V","CG51","A graph is a function, drawn out",[
    "<p>A function takes an input and hands back exactly one output, every time. Plot every input against its output and you get a graph — the function, made visible.</p><p>The curve isn't decoration. It's the function's entire behaviour, laid out at once.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"function-as-graph",ground:"g0",buildsOn:["CG33"]}),

  // CG52 — The vertical line test
  C("V","CG52","One input, one output, checked visually",[
    "<p>A function can't give two different answers for the same input. So if a vertical line ever crosses a graph twice, that graph isn't a function — somewhere, one input is producing two outputs.</p><p>A circle fails this test. A parabola passes it.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"vertical-line-test",ground:"g0",buildsOn:["CG51","CG48"]}),

  // CG53 — Domain
  C("V","CG53","Which inputs are even allowed",[
    "<p>Not every x makes sense to feed into every function. The domain is the full set of inputs a function will actually accept.</p><p>Try to divide by zero, or take the square root of a negative number, and you've stepped outside the domain. The graph simply doesn't exist there.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"domain",ground:"g0",buildsOn:["CG51"]}),

  // CG54 — Range
  C("V","CG54","Which outputs ever come out",[
    "<p>The range is the flip side of the domain: every value the function is actually capable of producing as an output.</p><p>y = x² never goes negative, however negative x gets, because squaring can't produce a negative result. So its range stops at zero, even though its domain is everything.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"range",ground:"g0",buildsOn:["CG53"]}),

  // CG55 — Asymptotes
  C("V","CG55","A line the curve forever approaches, never touches",[
    "<p>Some curves head straight toward a line and keep getting closer to it, without ever quite arriving. That untouchable line is an asymptote.</p><p>It's the limit idea again: the curve heads toward the line, the same way a limit heads toward a value it never exactly reaches.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"asymptotes",ground:"g0",buildsOn:["CG51"]}),

  // CG56 — The reciprocal function
  C("V","CG56","y = 1/x, and the gap it can't cross",[
    "<p>As x creeps toward zero, 1/x rockets off toward infinity. As x grows huge, 1/x shrinks toward zero but never quite gets there. The curve splits into two separate branches with a gap right where x = 0, because dividing by zero simply isn't allowed.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"reciprocal-function",ground:"g0",buildsOn:["CG55","CG23"]}),

  // CG57 — Exponential growth on a graph
  C("V","CG57","When the rate of growth depends on the size already reached",[
    "<p>An exponential graph doesn't climb by a fixed amount each step, it climbs by a fixed multiple. The bigger it already is, the bigger the next jump.</p><p>That's why exponential curves start almost flat and then suddenly look like they're climbing a wall — the rate of climb has been compounding the whole time, it just wasn't visible yet.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"exponential-graph",ground:"g0",buildsOn:["CG51"]}),

  // CG58 — Logarithms as the mirror image
  C("V","CG58","Undoing an exponential by reflecting it",[
    "<p>A logarithm is built to undo an exponential, the same way subtraction undoes addition. Graph the two together and the logarithm curve is the exponential curve reflected across the diagonal line y = x.</p><p>Every input-output pair on one curve becomes an output-input pair on the other.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"logarithm-as-reflection",ground:"g0",buildsOn:["CG57"]}),

  // CG59 — Transformations summary
  C("V","CG59","Every transformation, in one place",[
    "<p>Shift up or down by adding a number outside the function. Shift left or right by adding inside it. Stretch vertically by multiplying outside. Flip by a minus sign.</p><p>Every curve in this path so far has been moved using only these few moves, stacked on top of each other.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"transformations-summary",ground:"g0",buildsOn:["CG37","CG38","CG39","CG40"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 4: Vectors on the grid
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Note: existing cards 21, 22, 23 cover similar ground in a
   different voice (house-to-playground narrative). Editor should
   decide whether to keep those or replace with these grid-first
   versions — not a silent merge.
   ============================================================ */

const TIER_04_VECTORS = [

  // CG60 — A vector as an arrow
  C("V","CG60","An arrow that means something specific",[
    "<p>A vector is drawn as an arrow: its length says how much, its direction says which way. Move it anywhere on the grid without changing its length or direction and it's still the same vector.</p><p>Position doesn't matter. Length and direction are the entire identity of a vector.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"vector-as-arrow",ground:"g0",buildsOn:["CG11"]}),

  // CG61 — Vector components
  C("V","CG61","Splitting an arrow into x and y",[
    "<p>Any vector can be described by how far it goes across and how far it goes up: its x-component and y-component. Written (3, 4), it means \"3 across, 4 up\" — not a point this time, but a displacement.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"vector-components",ground:"g0",buildsOn:["CG60","CG11"]}),

  // CG62 — Adding vectors tip to tail
  C("V","CG62","Chaining arrows together",[
    "<p>To add two vectors, place the second one's tail at the first one's tip. The sum is the single arrow from the very start to the very end.</p><p>Add their components instead and you get the same answer without drawing anything: just add the x's, then add the y's.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"vector-addition",ground:"g0",buildsOn:["CG61"]}),

  // CG63 — The magnitude of a vector
  C("V","CG63","How long the arrow actually is",[
    "<p>A vector's magnitude is its length, found exactly the way you'd find the distance between two points: Pythagoras, applied to its own components.</p><div class='formula'>|v| = √(x² + y²)<span class='gloss'>Square each component, add them, square root the total.</span></div>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"vector-magnitude",ground:"g0",buildsOn:["CG61","CG15"]}),

  // CG64 — The direction of a vector
  C("V","CG64","The angle the arrow points",[
    "<p>A vector's direction is the angle it makes with the x-axis, found from its components using tan: the y-component over the x-component gives the tangent of that angle.</p><p>Length and angle together describe a vector just as completely as its (x, y) components do — two different languages for the same arrow.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"vector-direction",ground:"g0",buildsOn:["CG63"]}),

  // CG65 — Scalar multiples of a vector
  C("V","CG65","Stretching, shrinking, and reversing an arrow",[
    "<p>Multiply a vector by a plain number and only its length changes, not its direction — multiply by 2 and it doubles in length. Multiply by a negative number and the arrow flips to point the opposite way.</p><p>This is why it's called a scalar multiple: the scalar scales the arrow, nothing more.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"scalar-multiplication",ground:"g0",buildsOn:["CG60"]}),

  // CG66 — The resultant of two vectors
  C("V","CG66","The one arrow that replaces several",[
    "<p>Add up every vector acting on something at once and you get a single arrow that does the same overall job as all of them combined. That single arrow is the resultant.</p><p>It's the same tip-to-tail addition, just framed as the answer to \"what's the net effect of all this?\"</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"resultant-vector",ground:"g0",buildsOn:["CG62"]}),

  // CG67 — Resolving a vector into components
  C("V","CG67","Going the other way: one arrow into two",[
    "<p>Resolving is addition in reverse. Instead of combining two vectors into one, you split one vector into a horizontal piece and a vertical piece — usually because the horizontal and vertical stories need to be tracked separately.</p><div class='formula'>x = V·cos θ, y = V·sin θ<span class='gloss'>Given a vector's length and angle, these hand back its two components.</span></div>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"resolving-vectors",ground:"g0",buildsOn:["CG64"]}),

  // CG68 — The dot product
  C("V","CG68","A number that reveals the angle between two arrows",[
    "<p>Multiply two vectors' matching components and add the results, and you get a single number: the dot product. It's not a length or a direction, it's a measure of how aligned the two vectors are.</p><p>A large positive dot product means they point roughly the same way. Zero means they're at a perfect right angle. Negative means they're pointing roughly opposite.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"dot-product",ground:"g0",buildsOn:["CG61"]}),

  // CG69 — Unit vectors
  C("V","CG69","The two building-block arrows",[
    "<p>A unit vector has a length of exactly 1. The two simplest ones, called i and j, point one step right and one step up.</p><p>Any vector at all can be built from just these two, scaled and added: a vector (3, 4) is really just 3i + 4j.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"unit-vectors; i-j-notation",ground:"g0",buildsOn:["CG61","CG65"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 5: Motion on the grid
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Note: existing cards 25, 28, 29 cover related ground. Editor
   to decide keep/replace/merge.
   ============================================================ */

const TIER_05_MOTION = [

  // CG70 — Position as a point that moves
  C("V","CG70","A moving object is just a point with a clock attached",[
    "<p>Freeze any moving thing at an instant and it's sitting at one point. Let time run and that point slides along the grid. Motion, stripped down, is just position changing as time ticks forward.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"position-as-point",ground:"g0",buildsOn:["CG11"]}),

  // CG71 — A displacement-time graph
  C("V","CG71","Plotting where, against when",[
    "<p>Put time on the x-axis and position on the y-axis and you get a displacement-time graph. Every moment of a journey becomes one point on this curve.</p><p>Read the whole story of a trip — speeding up, slowing down, stopping, reversing — straight off its shape.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"displacement-time-graph",ground:"g0",buildsOn:["CG70"]}),

  // CG72 — Reading velocity as the gradient
  C("V","CG72","Steepness is speed",[
    "<p>The gradient of a displacement-time graph is how fast position is changing — which is exactly what velocity means. A steep section of the graph is a fast stretch of the journey. A flat section means standing still.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"velocity-as-gradient",ground:"g0",buildsOn:["CG71","CG20"]}),

  // CG73 — A velocity-time graph
  C("V","CG73","One level up: plotting the speed itself",[
    "<p>A velocity-time graph puts time on the x-axis and velocity on the y-axis. It's one step removed from the journey itself — it shows how fast you're going, not where you are.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"velocity-time-graph",ground:"g0",buildsOn:["CG72"]}),

  // CG74 — Reading acceleration as the gradient
  C("V","CG74","Steepness, one level up again",[
    "<p>The same trick that turned a displacement-time graph's gradient into velocity now turns a velocity-time graph's gradient into acceleration. Steep means speeding up or slowing down hard. Flat means cruising at a constant speed.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"acceleration-as-gradient",ground:"g0",buildsOn:["CG73","CG20"]}),

  // CG75 — Reading distance as area under velocity-time
  C("V","CG75","The space under the curve is the ground covered",[
    "<p>The area between a velocity-time graph and the x-axis is the distance travelled over that stretch of time. A tall, wide rectangle of area means a long way covered. A thin sliver means barely any distance at all.</p><p>Gradient gave one piece of information. Area gives a completely different one, from the exact same graph.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"distance-as-area",ground:"g0",buildsOn:["CG73"]}),

  // CG76 — Constant velocity — a straight line
  C("V","CG76","No change in speed, no curve",[
    "<p>If velocity never changes, a displacement-time graph is a perfectly straight line: equal distances covered in equal times, every time.</p><p>A straight line on this graph isn't a special case to memorise. It's just what \"constant\" looks like once it's drawn.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"constant-velocity-graph",ground:"g0",buildsOn:["CG71"]}),

  // CG77 — Constant acceleration — a curve on displacement-time
  C("V","CG77","Speeding up steadily bends the line into a curve",[
    "<p>If velocity itself is climbing at a steady rate, the displacement-time graph can't stay straight — it has to curve, getting steeper and steeper as the object keeps speeding up.</p><p>That curve is a parabola: the same shape as y = x², because constant acceleration makes distance grow with the square of time.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"constant-acceleration-graph",ground:"g0",buildsOn:["CG76","CG33"]}),

  // CG78 — The SUVAT equations, visualized
  C("V","CG78","Five letters, all readable off a graph",[
    "<p>s, u, v, a, t — displacement, initial velocity, final velocity, acceleration, time. Every SUVAT equation is just a relationship that's already visible on a velocity-time graph: u and v are the graph's starting and ending heights, a is its gradient, and s is the area underneath.</p><div class='formula'>v = u + at<span class='gloss'>Final velocity equals starting velocity, plus however much the steady gradient adds over time t.</span></div>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"suvat-visualized",ground:"g0",buildsOn:["CG74","CG75"]}),

  // CG79 — Projectile motion as a parabola
  C("V","CG79","Two straight stories that add up to a curve",[
    "<p>Launch something at an angle and its path traces a parabola. That curve isn't its own separate kind of motion — it's two completely ordinary motions overlaid: constant horizontal velocity, and constant vertical acceleration from gravity.</p><p>Plot horizontal position against vertical position, with time secretly driving both, and the parabola appears on its own.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"projectile-as-parabola",ground:"g0",buildsOn:["CG77","CG33"]}),

  // CG80 — Why horizontal and vertical motion are independent
  C("V","CG80","Gravity never touches the sideways story",[
    "<p>A bullet fired flat and a bullet simply dropped from the same height hit the ground at the exact same moment. Gravity pulls straight down, and it has no opinion at all about sideways motion.</p><p>That's why projectile motion can be split into two separate, simpler stories on two separate axes, solved one at a time, then recombined.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"axis-independence",ground:"g0",buildsOn:["CG79"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 6: The gateway to calculus — derivatives
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Note: existing card 32 ("The kissing curves") covers the
   tangent idea already. Editor to decide keep/replace/merge.
   ============================================================ */

const TIER_06_DERIVATIVES = [

  // CG81 — The slope between two close points
  C("V","CG81","Zooming in on a curve until it looks straight",[
    "<p>A curve doesn't have one single gradient, that's what makes it a curve. But pick two points on it that are very close together, and the tiny stretch of curve between them looks almost exactly like a straight line.</p><p>Close enough, and \"almost straight\" becomes the whole idea calculus is built on.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"slope-between-close-points",ground:"g0",buildsOn:["CG20","CG33"]}),

  // CG82 — What happens as the two points merge
  C("V","CG82","Squeezing the gap to nothing",[
    "<p>Let those two close points keep getting closer. The straight line joining them keeps approaching a fixed gradient, a value it heads toward but never technically lands on while the points are still two separate points.</p><p>That heading-toward-but-never-landing is exactly a limit, the same idea from earlier in this deck, now aimed at a curve's own steepness.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"limit-of-slope",ground:"g0",buildsOn:["CG81"]}),

  // CG83 — The tangent line at a single point
  C("V","CG83","The line a curve briefly agrees with",[
    "<p>When the gap finally closes to nothing, what's left is the tangent: a straight line that touches the curve at exactly one point and matches its direction there, without crossing through it.</p><p>It's the curve's gradient at that single instant, made visible as an actual line.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"tangent-line",ground:"g0",buildsOn:["CG82"]}),

  // CG84 — The derivative as the slope of the tangent
  C("V","CG84","Giving the tangent's gradient a name",[
    "<p>The derivative of a function, at any point, is simply the gradient of its tangent line there. It answers one question precisely: how fast is this curve changing, right here, right now.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"derivative-definition",ground:"g0",buildsOn:["CG83"]}),

  // CG85 — Differentiating y = x² from first principles
  C("V","CG85","Watching the formula fall out of the picture itself",[
    "<p>Take a point on y = x² and a second point a tiny step h further along. Work out the gradient between them, then let h shrink toward zero exactly as before.</p><div class='formula'>d/dx(x²) = 2x<span class='gloss'>The slope of y = x², at any point x, is always exactly twice x.</span></div><p>No rule was memorised here. The formula came directly out of squeezing the gap to nothing.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"first-principles",ground:"g0",buildsOn:["CG84"]}),

  // CG86 — The derivative as a new function
  C("V","CG86","A graph of how steep the original graph is",[
    "<p>The derivative isn't just one number at one point, it's its own function: feed it any x, and it hands back the gradient of the original curve at that x.</p><p>Plot the derivative and you get a brand new graph — one that's entirely about steepness, with no trace of height left in it.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"derivative-as-function",ground:"g0",buildsOn:["CG85"]}),

  // CG87 — Stationary points
  C("V","CG87","Where the tangent goes flat",[
    "<p>A stationary point is anywhere the curve's gradient is exactly zero — the tangent there is perfectly horizontal. The curve has paused, even if only for an instant, before continuing up, down, or flattening out for good.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"stationary-points",ground:"g0",buildsOn:["CG84","CG22"]}),

  // CG88 — Maximum and minimum points
  C("V","CG88","Telling a peak from a dip",[
    "<p>Not every stationary point is the same. At a maximum, the curve rises into it and falls away after. At a minimum, it falls in and rises away. Check the gradient just before and just after a stationary point and the type reveals itself.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"maxima-minima",ground:"g0",buildsOn:["CG87"]}),

  // CG89 — Concavity
  C("V","CG89","Curving like a smile or curving like a frown",[
    "<p>A curve that bends upward, holding water like a cup, is concave up — this is what's happening at a minimum. A curve that bends downward, shedding water like an umbrella, is concave down — what's happening at a maximum.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"concavity",ground:"g0",buildsOn:["CG88"]}),

  // CG90 — The second derivative, visualized
  C("V","CG90","Differentiating the steepness itself",[
    "<p>Differentiate the derivative again and you get the second derivative — not the height anymore, not even the steepness, but how the steepness itself is changing.</p><p>A positive second derivative means the curve is concave up. Negative means concave down. It's the fastest way to tell a maximum from a minimum without checking gradients on either side by hand.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"second-derivative",ground:"g0",buildsOn:["CG86","CG89"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 7: The gateway to calculus — integrals
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Note: existing card 13 ("Measuring a circle") already covers
   the polygon-approximation idea for area. Editor to decide
   keep/replace/merge with CG91-94.
   ============================================================ */

const TIER_07_INTEGRALS = [

  // CG91 — The area under a curve — why it's hard
  C("V","CG91","Straight tools, curved target",[
    "<p>The area of a rectangle or triangle is easy, there's a clean formula. The area under a curve has no such formula, because the top edge keeps changing height the whole way along.</p><p>Straight-edged shapes give straight answers. A curve gives nothing to grip — until you cheat it into something straight-edged first.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"area-under-curve-problem",ground:"g0",buildsOn:["CG33"]}),

  // CG92 — Approximating area with rectangles
  C("V","CG92","Filling the space with boxes",[
    "<p>Slice the region under a curve into a row of thin rectangles. Each one is easy to measure: width times height. Add up every rectangle's area and you get a rough estimate of the area under the whole curve.</p><p>Rough, because the rectangles either slightly overshoot or undershoot the curve's true edge.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"riemann-sum-intro",ground:"g0",buildsOn:["CG91"]}),

  // CG93 — More rectangles, better approximation
  C("V","CG93","Thinner slices, smaller mistakes",[
    "<p>Use twice as many, thinner rectangles and the overshoot or undershoot in each one shrinks. The total estimate creeps closer to the curve's real area.</p><p>This should feel familiar: it's the same move as approximating a circle with a polygon, just turned sideways.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"riemann-sum-refinement",ground:"g0",buildsOn:["CG92"]}),

  // CG94 — The limit of infinite rectangles
  C("V","CG94","Letting the slices shrink to nothing",[
    "<p>Let the number of rectangles head toward infinity and their width head toward zero. The total area heads toward one exact value, the same limiting idea used everywhere else in this path.</p><p>That limiting value is given its own name: the integral.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"integral-as-limit",ground:"g0",buildsOn:["CG93","CG82"]}),

  // CG95 — The integral as "anti-slope"
  C("V","CG95","Running differentiation in reverse",[
    "<p>Differentiation takes a curve and produces its gradient function. Integration runs the opposite direction: starting from a gradient function, it rebuilds the original curve.</p><div class='formula'>∫2x dx = x² + C<span class='gloss'>Integrating the derivative of x² hands back x² — plus an unknown constant, since a flat shift wouldn't have changed the gradient either.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"integration-as-inverse",ground:"g0",buildsOn:["CG85","CG94"]}),

  // CG96 — Definite vs indefinite integrals
  C("V","CG96","A formula versus an actual number",[
    "<p>An indefinite integral hands back a whole family of curves, all differing by that unknown constant. A definite integral, with two specific x-values attached, collapses all that uncertainty away and hands back one exact number: the area between those two points.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"definite-indefinite",ground:"g0",buildsOn:["CG95"]}),

  // CG97 — Area between two curves
  C("V","CG97","Subtracting one region from another",[
    "<p>To find the area trapped between two curves, integrate the gap between them: the top curve's height minus the bottom curve's height, across the stretch where they overlap.</p><p>It's the same area-under-a-curve idea, just applied to the difference of two functions instead of one.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"area-between-curves",ground:"g0",buildsOn:["CG96"]}),

  // CG98 — Integration to find displacement
  C("V","CG98","Going back up from acceleration to position",[
    "<p>Earlier, the area under a velocity-time graph gave the distance travelled. That area is exactly a definite integral. Integrate velocity and you get displacement; integrate acceleration and you get velocity back.</p><p>The whole SUVAT picture and the whole calculus picture are describing the same staircase: position, velocity, acceleration, linked by derivatives going down and integrals going up.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"integration-kinematics-link",ground:"g0",buildsOn:["CG75","CG96"]}),

  // CG99 — Volume of revolution
  C("V","CG99","Spinning a flat curve into a solid",[
    "<p>Take the region under a curve and spin it a full turn around the x-axis. It sweeps out a solid shape — a vase, a dome, a cone, depending on the curve.</p><p>Slice that solid into thin discs instead of thin rectangles, and the same integration idea finds its volume.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"volume-of-revolution",ground:"g0",buildsOn:["CG94"]}),

  // CG100 — Putting it all together
  C("V","CG100","One grid, every idea so far",[
    "<p>A single moving point. A line tracking its position. The gradient of that line giving its speed. The gradient of the speed giving its acceleration. The area under the speed giving the distance back.</p><p>Every idea in this path so far, from the first number line, has been describing one thing: something on a grid, changing, and being measured exactly while it does.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"calculus-synthesis",ground:"g0",buildsOn:["CG90","CG98"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 8: Trigonometry on the grid
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Note: existing cards 17, 18, 19, 20, 24 (old M2 path) cover
   related ground in a different voice (the captain's problem
   narrative). Editor to decide keep/replace/merge/resequence.
   ============================================================ */

const TIER_08_TRIGONOMETRY = [

  // CG101 — Revisiting the unit circle
  C("V","CG101","The circle that generates all of trigonometry",[
    "<p>Every piece of trigonometry traces back to one picture: a point moving around a circle of radius 1, centred on the origin. Trigonometry is just the study of where that point is, depending on the angle it's swept through.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"unit-circle-as-source",ground:"g0",buildsOn:["CG50"]}),

  // CG102 — Sine as a height
  C("V","CG102","How high the point sits",[
    "<p>As the point sweeps round the unit circle, its height above the x-axis is, by definition, the sine of the angle. No triangle needed, no memorising — just read the height straight off the circle.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"sine-as-height",ground:"g0",buildsOn:["CG101"]}),

  // CG103 — Cosine as a width
  C("V","CG103","How far across the point sits",[
    "<p>The same point's distance from the y-axis, its horizontal position, is the cosine of the angle. Sine is the height, cosine is the width — both read off the exact same moving point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cosine-as-width",ground:"g0",buildsOn:["CG101"]}),

  // CG104 — Why sin and cos repeat
  C("V","CG104","Going around again lands you back where you started",[
    "<p>Keep sweeping the angle past a full circle, 360°, and the point retraces the exact same path. Sine and cosine at 370° are identical to sine and cosine at 10°, because the underlying point is in the identical place.</p><p>That's the entire reason these functions repeat forever: the circle has no end, it just loops.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"periodicity-source",ground:"g0",buildsOn:["CG102","CG103"]}),

  // CG105 — The graph of sin θ
  C("V","CG105","Unrolling the circle's height over time",[
    "<p>Track the unit circle point's height as the angle sweeps steadily forward, and plot that height against the angle instead of against position. The result is the sine wave: a smooth, repeating hill-and-valley shape.</p><p>The wave isn't a separate idea from the circle. It's the circle's height, unrolled flat.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"sine-graph",ground:"g0",buildsOn:["CG102","CG104"]}),

  // CG106 — The graph of cos θ
  C("V","CG106","The same wave, started from a different place",[
    "<p>Plotting width instead of height produces the cosine graph — identical in shape to sine's wave, just shifted along, because cosine starts its sweep at the widest point of the circle instead of the lowest.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cosine-graph",ground:"g0",buildsOn:["CG103","CG105"]}),

  // CG107 — The graph of tan θ
  C("V","CG107","Dividing height by width, and what happens at the edge",[
    "<p>Tan is sine divided by cosine. Most of the time this behaves fine, but right where cosine hits zero — the point at the very top or bottom of the circle — tan is dividing by zero, and the graph shoots off toward infinity.</p><p>Tan's graph isn't a smooth wave like sine and cosine. It's a repeating series of climbs that each end in a vertical asymptote.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"tan-graph",ground:"g0",buildsOn:["CG105","CG106","CG55"]}),

  // CG108 — Amplitude
  C("V","CG108","How tall the wave swings",[
    "<p>Multiply sine by a number out front and the wave's peaks and troughs stretch taller or squash flatter, without changing how often it repeats. That height is the amplitude.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"amplitude",ground:"g0",buildsOn:["CG105","CG39"]}),

  // CG109 — Period
  C("V","CG109","How often the wave repeats",[
    "<p>Multiply the angle itself before taking the sine and the wave squeezes or stretches sideways, completing its repeating cycle faster or slower. That cycle length is the period.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"period",ground:"g0",buildsOn:["CG105","CG38"]}),

  // CG110 — Phase shift
  C("V","CG110","Sliding the wave sideways",[
    "<p>Add a number inside the sine, alongside the angle, and the entire wave slides left or right without changing its height or how often it repeats. That slide is the phase shift.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"phase-shift",ground:"g0",buildsOn:["CG105","CG38"]}),

  // CG111 — The key identity
  C("V","CG111","The circle's own equation, restated",[
    "<p>Sine is the height, cosine is the width, and every point on the unit circle satisfies x² + y² = 1. Swap in sine and cosine for x and y, and that equation becomes one of the most-used identities in maths.</p><div class='formula'>sin²θ + cos²θ = 1<span class='gloss'>Not a separate fact to memorise — it's the unit circle's own equation, wearing trig notation.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"pythagorean-identity",ground:"g0",buildsOn:["CG48","CG102","CG103"]}),

  // CG112 — Solving trig equations graphically
  C("V","CG112","Finding where the wave crosses a target line",[
    "<p>Solving sin θ = 0.5 means asking: where does the sine wave's height cross the horizontal line at 0.5? Because the wave repeats forever, there isn't just one answer, there are infinitely many, spaced one full period apart.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"solving-trig-equations",ground:"g0",buildsOn:["CG105","CG31"]}),

  // CG113 — Inverse trig functions
  C("V","CG113","Reading the angle back off the height",[
    "<p>Sine takes an angle and gives a height. The inverse, arcsin, runs that backward: feed in a height, get an angle back.</p><p>Because the wave repeats, arcsin has to make a choice and hand back just one angle out of the infinitely many that share that height — by convention, the one closest to zero.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"inverse-trig",ground:"g0",buildsOn:["CG112"]}),

  // CG114 — Radians as arc length
  C("V","CG114","An angle measured by distance instead of degrees",[
    "<p>A degree is an arbitrary slice, 1/360th of a full turn, with no deeper reason behind the number 360. A radian instead measures the angle by the actual arc length it sweeps out on a circle of radius 1.</p><div class='formula'>s = rθ<span class='gloss'>Arc length equals radius times the angle in radians — which is exactly why radians make this formula this clean.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"radians",ground:"g0",buildsOn:["CG50"]}),

  // CG115 — The sine rule and cosine rule
  C("V","CG115","Trigonometry that doesn't need a right angle",[
    "<p>Everything so far in this tier assumed a right-angled triangle, or the perfect symmetry of a circle. The sine rule and cosine rule extend the same sin/cos machinery to any triangle at all, right-angled or not.</p><div class='formula'>a/sin A = b/sin B = c/sin C<span class='gloss'>The sine rule: every side, divided by the sine of its opposite angle, gives the same value.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"sine-cosine-rule",ground:"g0",buildsOn:["CG102","CG103"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 9: Waves as moving trig graphs
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_09_WAVES = [

  // CG116 — A wave is a sine graph that travels
  C("V","CG116","A sine wave that doesn't sit still",[
    "<p>Every wave you can draw is, underneath, a sine curve — except instead of staying fixed, the whole curve slides along as time passes.</p><p>Freeze it at any instant and you'd see the familiar sine shape. Let time run and that shape travels.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"wave-as-traveling-sine",ground:"g0",buildsOn:["CG105"]}),

  // CG117 — Wavelength
  C("V","CG117","The period, measured in space instead of angle",[
    "<p>A sine graph's period was how often it repeated along the angle axis. A wave's wavelength is the exact same idea, just measured in space: the physical distance between one peak and the next.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"wavelength",ground:"g0",buildsOn:["CG109","CG116"]}),

  // CG118 — Frequency
  C("V","CG118","How many waves go by each second",[
    "<p>Stand still and watch a wave pass. Frequency counts how many full wavelengths sweep by you in one second.</p><p>A high frequency means the wave is being shoved through quickly, peak after peak in rapid succession.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"frequency",ground:"g0",buildsOn:["CG117"]}),

  // CG119 — The wave speed equation
  C("V","CG119","Tying wavelength and frequency together",[
    "<p>How fast a wave travels depends on both how long each wave is and how often one goes by.</p><div class='formula'>v = fλ<span class='gloss'>Speed equals frequency times wavelength.</span></div><p>Stretch the wavelength and, for the same speed, the frequency has to drop — there's simply less wave passing per second.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"wave-speed-equation",ground:"g0",buildsOn:["CG117","CG118"]}),

  // CG120 — Transverse waves
  C("V","CG120","Wobbling sideways to the direction of travel",[
    "<p>In a transverse wave, whatever is wobbling moves perpendicular to the direction the wave travels — like a rope flicked up and down while the wave itself runs along its length. Light and the shake of a guitar string are both transverse.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"transverse-waves",ground:"g0",buildsOn:["CG116"]}),

  // CG121 — Longitudinal waves
  C("V","CG121","Wobbling along the same line it travels",[
    "<p>In a longitudinal wave, the wobble runs in the same direction the wave is moving — compressing and stretching, like a slinky pushed and pulled along its own length. Sound travels this way, as squeezed and stretched air.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"longitudinal-waves",ground:"g0",buildsOn:["CG120"]}),

  // CG122 — Amplitude and energy
  C("V","CG122","A taller wave carries more punch",[
    "<p>Amplitude is still just how tall the wave's swing is, same as on any sine graph. But for a real wave, that height isn't cosmetic — a taller wave is genuinely carrying more energy.</p><p>A gentle ripple and a crashing wave can have the exact same wavelength and frequency. What separates them is amplitude.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"amplitude-energy",ground:"g0",buildsOn:["CG108"]}),

  // CG123 — Superposition
  C("V","CG123","Two waves occupying the same space at once",[
    "<p>When two waves cross paths, they don't bounce off each other. At every point, their heights simply add together. That combined height, at every instant, is the superposition of the two waves.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"superposition",ground:"g0",buildsOn:["CG116"]}),

  // CG124 — Constructive interference
  C("V","CG124","Peaks meeting peaks",[
    "<p>If two waves' peaks line up exactly, adding their heights together makes an even taller peak. This is constructive interference: the waves reinforce each other.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"constructive-interference",ground:"g0",buildsOn:["CG123"]}),

  // CG125 — Destructive interference
  C("V","CG125","A peak meeting a trough",[
    "<p>If one wave's peak lines up with another's trough, adding their heights can cancel them out almost entirely. This is destructive interference: the waves work against each other.</p><p>Noise-cancelling headphones do exactly this on purpose, generating a wave shaped to destructively cancel the sound coming in.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"destructive-interference",ground:"g0",buildsOn:["CG123"]}),

  // CG126 — Standing waves
  C("V","CG126","A wave that reflects into itself",[
    "<p>Send a wave down a fixed string and it reflects back off the far end. The original wave and its own reflection superpose, and if the timing lines up just right, the result doesn't travel anywhere at all — it just oscillates in place. That's a standing wave.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"standing-waves",ground:"g0",buildsOn:["CG123","CG116"]}),

  // CG127 — Nodes and antinodes
  C("V","CG127","The points that never move, and the points that move most",[
    "<p>A standing wave has fixed points that stay completely still, called nodes, because the original wave and its reflection always cancel out there. Between them sit antinodes, where the two waves always reinforce, swinging with the largest amplitude.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"nodes-antinodes",ground:"g0",buildsOn:["CG126"]}),

  // CG128 — Resonance
  C("V","CG128","Pushing at exactly the right rhythm",[
    "<p>Every object that can vibrate has a natural frequency it prefers. Drive it with a force at that exact frequency and the response grows large — this is resonance. Drive it off-frequency and most of the energy is wasted.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"resonance",ground:"g0",buildsOn:["CG118"]}),

  // CG129 — The Doppler effect
  C("V","CG129","Squeezing and stretching the wave by moving through it",[
    "<p>A source moving toward you crowds its wave peaks closer together in front of it, shrinking the effective wavelength — and a shorter wavelength means a higher frequency, a higher pitch. Moving away stretches the wave the other direction.</p><p>The siren doesn't change. The graph of the wave you're receiving does.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"doppler-effect",ground:"g0",buildsOn:["CG119"]}),

  // CG130 — The electromagnetic spectrum
  C("V","CG130","One equation, an entire family of waves",[
    "<p>Radio, microwaves, visible light, X-rays — every one of them obeys v = fλ with the exact same speed, the speed of light. What separates them is purely wavelength: stretch it out and you get radio, squeeze it down far enough and you get gamma rays.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"em-spectrum",ground:"g0",buildsOn:["CG119"]}),

  // CG131 — Sound as a pressure-vs-time graph
  C("V","CG131","Hearing is reading a graph with your ears",[
    "<p>A sound wave is air pressure rising and falling as the wave passes. Plot that pressure against time and you get exactly the same kind of curve as any other wave — a microphone is just a device for turning that pressure graph into an electrical one.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"sound-as-pressure-graph",ground:"g0",buildsOn:["CG121","CG116"]}),

  // CG132 — Light as a wave — diffraction patterns
  C("V","CG132","Bright and dark bands as an interference graph",[
    "<p>Shine light through two narrow slits and it doesn't just make two bright lines, it makes a whole pattern of bright and dark bands. Plot the brightness against position and that pattern is literally a graph of constructive and destructive interference, point by point.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"diffraction-as-graph",ground:"g0",buildsOn:["CG124","CG125"]}),

  // CG133 — Phase difference
  C("V","CG133","How out-of-step two waves are",[
    "<p>Two waves with the same wavelength and frequency can still be offset from each other, like two pendulums started at slightly different moments. That offset, measured as a fraction of a full cycle, is the phase difference.</p><p>It's exactly the phase shift idea applied to comparing two waves against each other instead of one wave against its own starting point.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"phase-difference",ground:"g0",buildsOn:["CG110"]}),

  // CG134 — Beats
  C("V","CG134","Two close frequencies, taking turns",[
    "<p>Superpose two waves whose frequencies are close but not identical, and the combined wave's amplitude doesn't stay constant — it swells and fades in a slow rhythm of its own, called beats.</p><p>Musicians use this on purpose: tune two strings close together and listen for the beats to slow down as the frequencies converge.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"beats",ground:"g0",buildsOn:["CG123","CG118"]}),

  // CG135 — Wave packets
  C("V","CG135","Combining many frequencies into one short pulse",[
    "<p>A pure sine wave goes on forever, with no real beginning or end. A short pulse — a single clap, a flash of light — is what you get from superposing many different frequencies at once, so they reinforce briefly in one place and cancel everywhere else.</p><p>A clean pulse is, hiding underneath, a crowd of waves.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"wave-packets",ground:"g0",buildsOn:["CG123","CG134"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 10: Polar coordinates
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_10_POLAR = [

  // CG136 — A different address system
  C("V","CG136","Distance and angle, instead of across and up",[
    "<p>(x, y) addresses a point by how far across and how far up. Polar coordinates address the same point completely differently: how far from the origin, and at what angle.</p><p>Same point, same plane, a different way of pointing to it.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"polar-coordinates-intro",ground:"g0",buildsOn:["CG11","CG64"]}),

  // CG137 — Converting between polar and Cartesian
  C("V","CG137","Translating between the two address systems",[
    "<p>Given a distance r and angle θ, the Cartesian coordinates are x = r cos θ and y = r sin θ — the same resolving-a-vector formula from earlier, since a polar point is really just a vector from the origin.</p><p>Going the other way, r comes from Pythagoras and θ comes from arctan.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"polar-cartesian-conversion",ground:"g0",buildsOn:["CG136","CG67"]}),

  // CG138 — Plotting a point in polar form
  C("V","CG138","Walk out, then turn",[
    "<p>To plot (5, 30°) in polar form: imagine walking 5 units out along the x-axis, then rotating that whole position 30° around the origin. Wherever you land is the point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"plotting-polar",ground:"g0",buildsOn:["CG137"]}),

  // CG139 — The circle in polar form
  C("V","CG139","The equation a circle was always trying to be",[
    "<p>In Cartesian form, a circle needs x² + y² = r². In polar form, since every point on the circle is the same distance from the centre by definition, the equation collapses to something almost embarrassingly short.</p><div class='formula'>r = constant<span class='gloss'>A circle, in polar form, is simply \"the distance never changes.\"</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"circle-in-polar",ground:"g0",buildsOn:["CG48","CG136"]}),

  // CG140 — Spirals
  C("V","CG140","Letting the distance grow as the angle grows",[
    "<p>Make r grow steadily as θ increases instead of staying fixed, and the point doesn't trace a circle anymore — it spirals outward, sweeping further from the centre with every turn.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"spirals",ground:"g0",buildsOn:["CG139"]}),

  // CG141 — The rose curve
  C("V","CG141","Petals from a trig function",[
    "<p>Let r = cos(kθ) instead of a plain constant, and the curve blooms into a shape with repeating petals. The number k controls exactly how many petals appear.</p><p>It looks ornamental, but it's just a trig graph, plotted with its own output as the distance instead of the height.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"rose-curve",ground:"g0",buildsOn:["CG105","CG139"]}),

  // CG142 — The cardioid
  C("V","CG142","A single heart-shaped loop",[
    "<p>A close cousin of the rose curve, r = 1 + cos θ, produces a single loop pinched at one point — a heart-like shape called a cardioid. Same machinery as the rose curve, one small change to the formula, a completely different shape falls out.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cardioid",ground:"g0",buildsOn:["CG141"]}),

  // CG143 — Why orbits are easier in polar
  C("V","CG143","When the centre of attention really is the centre",[
    "<p>A planet orbiting a star is constantly changing both its x and y in Cartesian coordinates, even though the actual physics only cares about one thing: distance from the star. Polar coordinates put that distance front and centre as a single variable, r, instead of burying it inside two changing numbers.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"orbits-in-polar",ground:"g0",buildsOn:["CG136"]}),

  // CG144 — Polar form of complex numbers
  C("V","CG144","The bridge to the next tier",[
    "<p>A complex number can be plotted as a point too, and that point can just as well be described by a distance and an angle instead of two separate parts. This polar description of a complex number is what makes multiplying them so much easier than it looks.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"polar-complex-bridge",ground:"g0",buildsOn:["CG136"]}),

  // CG145 — When to choose polar over Cartesian
  C("V","CG145","Picking the coordinate system the problem wants",[
    "<p>Neither system is more correct, they're just different tools. Anything built from distances and angles — orbits, circular motion, radiating fields — tends to simplify beautifully in polar. Anything built from horizontal and vertical motion tends to simplify in Cartesian.</p><p>Choosing the right one first often does more work than any formula that follows.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"choosing-coordinate-system",ground:"g0",buildsOn:["CG136","CG143"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 11: Parametric equations
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_11_PARAMETRIC = [

  // CG146 — Letting x and y both depend on t
  C("V","CG146","A third variable pulling two strings at once",[
    "<p>Instead of writing y directly in terms of x, give both x and y their own formula in terms of a third variable, t. As t ticks forward, both x and y change together, tracing out a curve.</p><p>t is usually time, but it doesn't have to be — it's just whatever is driving the motion.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parametric-intro",ground:"g0",buildsOn:["CG11"]}),

  // CG147 — Reframing projectile motion
  C("V","CG147","What was already happening, made explicit",[
    "<p>Projectile motion was already secretly parametric: horizontal position and vertical position were both separately written in terms of time. Naming time as the shared parameter t just makes that structure official.</p><div class='formula'>x(t) = v_x·t,  y(t) = v_y·t − ½gt²<span class='gloss'>Two formulas, one shared input, one combined curve.</span></div>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"projectile-parametric",ground:"g0",buildsOn:["CG79","CG146"]}),

  // CG148 — Tracing a circle parametrically
  C("V","CG148","The unit circle, written as a function of time",[
    "<p>x = cos t, y = sin t traces the entire unit circle as t sweeps from 0 to 2π. This isn't a coincidence with the trig graphs from earlier — it's the exact same circle, just driven by a parameter instead of plotted point by point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"circle-parametric",ground:"g0",buildsOn:["CG101","CG146"]}),

  // CG149 — The ellipse, parametrically
  C("V","CG149","Stretching the circle's parametric form",[
    "<p>Stretch the circle's parametric equations unevenly — x = a cos t, y = b sin t — and the circle becomes an ellipse, wider in one direction than the other.</p><p>Same trick as stretching y = x² earlier, just applied to a parametric curve instead of a y = f(x) one.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"ellipse-parametric",ground:"g0",buildsOn:["CG148","CG39"]}),

  // CG150 — Eliminating the parameter
  C("V","CG150","Collapsing back to one equation",[
    "<p>Sometimes t can be algebraically removed, leaving a single equation purely in x and y. For the circle, squaring and adding x = cos t and y = sin t recovers x² + y² = 1, using the identity from Tier 8.</p><p>Not every parametric curve can be un-parametrized this cleanly — some genuinely need t to be described at all.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"eliminating-parameter",ground:"g0",buildsOn:["CG148","CG111"]}),

  // CG151 — The cycloid
  C("V","CG151","The path a point on a rolling wheel actually traces",[
    "<p>Mark a single point on the rim of a wheel and roll the wheel along flat ground. That point doesn't move in a circle relative to the ground, it traces a series of arches — a cycloid. It's a natural shape that simply has no clean y = f(x) equation, only a parametric one.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cycloid",ground:"g0",buildsOn:["CG146"]}),

  // CG152 — Velocity as the derivative of a parametric curve
  C("V","CG152","Differentiating each coordinate separately",[
    "<p>If x and y are both functions of t, differentiate each one separately with respect to t and you get the horizontal and vertical velocity at any instant — a vector, built from two ordinary derivatives.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parametric-velocity",ground:"g0",buildsOn:["CG84","CG146"]}),

  // CG153 — Speed along a parametric path
  C("V","CG153","Combining the two velocity components back into one number",[
    "<p>The velocity vector from the previous BB has a horizontal part and a vertical part. Combine them with Pythagoras, the same way any vector's magnitude is found, and the result is speed: a single number, with no direction attached.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parametric-speed",ground:"g0",buildsOn:["CG152","CG63"]}),

  // CG154 — Parametric curves that cross themselves
  C("V","CG154","Visiting the same point twice",[
    "<p>A normal function can never cross itself — that would mean one x giving two different y's, failing the vertical line test. A parametric curve has no such restriction: it can loop back and cross its own path, because two different values of t are simply allowed to land on the same (x, y).</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"self-intersecting-curves",ground:"g0",buildsOn:["CG52","CG146"]}),

  // CG155 — Why some curves can only be described parametrically
  C("V","CG155","When there's simply no y = f(x) to write down",[
    "<p>The cycloid, a self-crossing loop, a circle itself — none of these can be written as a single y = f(x), because the vertical line test fails for them somewhere. Parametric form isn't a workaround for these curves, it's the only language that actually fits them.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"why-parametric-needed",ground:"g0",buildsOn:["CG151","CG154"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 12: The complex plane
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_12_COMPLEX = [

  // CG156 — A number that needs two axes
  C("V","CG156","A number with two parts, not one",[
    "<p>Ordinary numbers live on a single number line. A complex number has two parts — a real part and an imaginary part — and needs two axes to hold it, exactly the way a point on the grid needs both x and y.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"complex-number-intro",ground:"g0",buildsOn:["CG9"]}),

  // CG157 — Plotting a complex number
  C("V","CG157","The real part across, the imaginary part up",[
    "<p>Plot a complex number a + bi exactly like a point: a units across on the real axis, b units up on the imaginary axis. This picture is called the complex plane, or Argand diagram.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"argand-diagram",ground:"g0",buildsOn:["CG156","CG11"]}),

  // CG158 — Adding complex numbers
  C("V","CG158","The same tip-to-tail addition as vectors",[
    "<p>Add two complex numbers by adding their real parts and adding their imaginary parts separately — which is exactly vector addition, because a complex number plotted on the Argand diagram behaves just like an arrow from the origin.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"complex-addition",ground:"g0",buildsOn:["CG62","CG157"]}),

  // CG159 — The modulus
  C("V","CG159","Distance from the origin, once again",[
    "<p>The modulus of a complex number is simply how far its point sits from the origin — found with Pythagoras on its real and imaginary parts, the same formula used for a vector's magnitude or the distance between two points.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"modulus",ground:"g0",buildsOn:["CG63","CG157"]}),

  // CG160 — The argument
  C("V","CG160","The angle, same as polar",[
    "<p>The argument of a complex number is the angle its point makes with the real axis — exactly the polar angle θ from Tier 10, just applied to a complex number's plotted position instead of an ordinary point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"argument",ground:"g0",buildsOn:["CG136","CG159"]}),

  // CG161 — Multiplying complex numbers
  C("V","CG161","Multiplying scales and rotates at once",[
    "<p>Multiplying two complex numbers does two things to their points simultaneously: their moduli multiply together, and their arguments add together. The result isn't found by separately scaling then rotating, it happens as one combined geometric move.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"complex-multiplication",ground:"g0",buildsOn:["CG159","CG160"]}),

  // CG162 — Multiplying by i
  C("V","CG162","A 90-degree turn, disguised as algebra",[
    "<p>i has a modulus of 1 and an argument of exactly 90°. So multiplying any complex number by i doesn't change its distance from the origin at all — it just spins the point a quarter turn anticlockwise.</p><p>i² = −1 stops being a strange rule to memorise and becomes obvious: two 90° turns make 180°, which is exactly what flipping a number's sign looks like.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"multiplying-by-i",ground:"g0",buildsOn:["CG161"]}),

  // CG163 — Euler's formula
  C("V","CG163","One equation, three ideas merging",[
    "<p>Raise e to an imaginary power and, remarkably, the result lands exactly on the unit circle.</p><div class='formula'>e^(iθ) = cos θ + i sin θ<span class='gloss'>An exponential, evaluated at an imaginary input, traces the same circle sine and cosine were built from.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"euler-formula",ground:"g0",buildsOn:["CG101","CG157"]}),

  // CG164 — Why this connects the circle, trig, and exponentials
  C("V","CG164","Three separate stories, turning out to be one",[
    "<p>The unit circle, the sine and cosine waves, and exponential growth all looked like unrelated topics earlier in this path. Euler's formula reveals they were always the same underlying object, viewed from three different angles.</p><p>This is one of the genuine, earned moments in maths where everything quietly clicks into a single picture.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"euler-significance",ground:"g0",buildsOn:["CG163"]}),

  // CG165 — De Moivre's theorem
  C("V","CG165","Raising a point to a power means spinning it repeatedly",[
    "<p>Because multiplying complex numbers adds their angles, raising one to a power n means scaling its modulus to the nth power and multiplying its argument by n — spinning the point around n times faster than a single multiplication would.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"de-moivre",ground:"g0",buildsOn:["CG161","CG163"]}),

  // CG166 — Roots of a complex number
  C("V","CG166","Splitting one point into several, evenly spaced",[
    "<p>Finding the nth root of a complex number un-does De Moivre's repeated spinning, but because angles repeat every full turn, there isn't just one root — there are exactly n of them, spaced perfectly evenly around a circle.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"complex-roots",ground:"g0",buildsOn:["CG165"]}),

  // CG167 — Where complex numbers show up in physics
  C("V","CG167","Not imaginary in the everyday sense",[
    "<p>Despite the name, complex numbers describe real, measurable things: in AC circuits, a complex number's modulus and argument together track both the size and timing-offset of an oscillating current at once — one number doing the job two real numbers would otherwise need.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"complex-numbers-in-physics",ground:"g0",buildsOn:["CG160"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 13: Conic sections, unified
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_13_CONICS = [

  // CG168 — Slicing a cone
  C("V","CG168","Four shapes from one solid",[
    "<p>Slice a cone flat across and you get a circle. Tilt the slice slightly and you get an ellipse. Tilt it parallel to the cone's own side and you get a parabola. Tilt it steep enough to cut through both halves of a double cone and you get a hyperbola.</p><p>Four curves that seem unrelated are really just one solid, sliced at different angles.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"conic-sections-intro",ground:"g0",buildsOn:["CG48"]}),

  // CG169 — The circle as the simplest slice
  C("V","CG169","The slice with no tilt at all",[
    "<p>A flat, untilted slice through a cone is the simplest case: every point on the cut edge sits exactly the same distance from the centre. That's just the circle equation from Tier 2, arrived at from a completely different direction.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"circle-as-conic",ground:"g0",buildsOn:["CG168","CG48"]}),

  // CG170 — The ellipse
  C("V","CG170","Two centres instead of one",[
    "<p>An ellipse has two special points, called foci, instead of one centre. Pick any point on the ellipse and add up its distances to both foci, and that total is always exactly the same number, wherever on the curve you picked.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"ellipse-foci",ground:"g0",buildsOn:["CG168","CG149"]}),

  // CG171 — Why planetary orbits are ellipses
  C("V","CG171","Kepler's first law, geometrically",[
    "<p>A planet doesn't orbit its star in a circle. It traces an ellipse, with the star sitting at one of the two foci, not at the centre. That's Kepler's first law, and it's exactly the constant-sum property from the previous BB, playing out in real space.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"kepler-first-law",ground:"g0",buildsOn:["CG170"]}),

  // CG172 — The parabola
  C("V","CG172","One focus and a line it always balances against",[
    "<p>A parabola has a single focus and a single line, called the directrix. Every point on the parabola sits exactly as far from the focus as it does from the directrix — a balance between a point and a line, instead of between two points.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parabola-focus-directrix",ground:"g0",buildsOn:["CG168","CG33"]}),

  // CG173 — Why a satellite dish is a parabola
  C("V","CG173","Every incoming ray, sent to the exact same point",[
    "<p>A parabola has a remarkable property: any ray travelling straight in, parallel to its axis, reflects directly to the focus, no matter where it hits the curve.</p><p>That's why satellite dishes, telescope mirrors, and car headlight reflectors are all shaped like a parabola — it's the one shape that gathers every incoming ray to one exact point.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"parabolic-reflector",ground:"g0",buildsOn:["CG172"]}),

  // CG174 — The hyperbola
  C("V","CG174","Two branches, one constant difference",[
    "<p>A hyperbola also has two foci, like an ellipse, but instead of distances adding to a constant, they subtract to one. The curve splits into two separate branches, opening away from each other.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"hyperbola",ground:"g0",buildsOn:["CG168","CG170"]}),

  // CG175 — The general conic equation
  C("V","CG175","One template, four shapes hiding inside it",[
    "<p>Every conic — circle, ellipse, parabola, hyperbola — can be written as one general equation: Ax² + Bxy + Cy² + Dx + Ey + F = 0. Which specific shape comes out depends entirely on the relationship between the coefficients.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"general-conic-equation",ground:"g0",buildsOn:["CG169","CG170","CG172","CG174"]}),

  // CG176 — Eccentricity
  C("V","CG176","One number that names the shape",[
    "<p>Eccentricity is a single number that tells you which conic you're looking at before you even check the equation. Zero means a perfect circle. Between zero and one means an ellipse. Exactly one means a parabola. Greater than one means a hyperbola.</p><p>It's measuring how far a conic strays from being a circle, on a single sliding scale.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"eccentricity",ground:"g0",buildsOn:["CG175"]}),

  // CG177 — Conics in orbit
  C("V","CG177","What a passing comet's path reveals",[
    "<p>An orbit's eccentricity decides its entire fate. A planet's nearly-circular path keeps it bound forever. A comet on an elliptical path returns again and again. A trajectory at exactly eccentricity 1 is the parabolic edge of escape — and anything faster traces a hyperbola, sweeping past once and never returning.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"orbital-eccentricity",ground:"g0",buildsOn:["CG176","CG171"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 14: Vector fields
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_14_VECTOR_FIELDS = [

  // CG178 — An arrow at every point
  C("V","CG178","Not one vector, an arrow everywhere",[
    "<p>Everything in Tier 4 was one vector at a time. A vector field is different: it assigns an arrow to every single point in space, all at once.</p><p>Wind doesn't have one direction, it has a different direction and strength at every point in the sky. That whole picture, all together, is a field.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"vector-field-intro",ground:"g0",buildsOn:["CG60"]}),

  // CG179 — Visualizing a field
  C("V","CG179","A grid of small arrows",[
    "<p>To draw a field, sprinkle small arrows across the plane, each one pointing the direction the field acts at that exact spot, sized to show its strength there.</p><p>The pattern those arrows make, taken together, is the entire field, made visible.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"visualizing-fields",ground:"g0",buildsOn:["CG178"]}),

  // CG180 — The gravitational field
  C("V","CG180","Every arrow pointing toward the mass",[
    "<p>Around any mass, every arrow in the field points straight toward it, getting longer (stronger) the closer in you go, and shorter the further out.</p><p>It's the same gravity from much earlier in this deck, just drawn as a field instead of a single force between two objects.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"gravitational-field",ground:"g0",buildsOn:["CG178"]}),

  // CG181 — The electric field
  C("V","CG181","Pointing away from positive, toward negative",[
    "<p>Around a positive charge, every field arrow points outward, away from it. Around a negative charge, every arrow points inward, toward it. Drop a second charge anywhere in the field and the arrow at that point tells you exactly which way it gets pushed or pulled.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"electric-field",ground:"g0",buildsOn:["CG178","CG180"]}),

  // CG182 — Field lines
  C("V","CG182","Where the arrows bunch up, the field is strong",[
    "<p>Connect the field's arrows into continuous lines and you get field lines. Where they crowd close together, the field is strong. Where they spread out, it's weak.</p><p>You can read the strength of a field from a single picture, without a number in sight.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"field-lines",ground:"g0",buildsOn:["CG179"]}),

  // CG183 — Equipotential lines
  C("V","CG183","The contour lines of a field",[
    "<p>An equipotential line connects every point where the field would do zero work moving something between them — like a contour line on a map connecting points of equal height.</p><p>Equipotential lines always cross field lines at a perfect right angle, never along them.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"equipotential-lines",ground:"g0",buildsOn:["CG182"]}),

  // CG184 — The gradient
  C("V","CG184","A field built from a single height map",[
    "<p>Picture a field's potential as a height map, like hills and valleys. The gradient at any point is an arrow pointing in the steepest uphill direction there, and a vector field built entirely this way is called a gradient field.</p><p>It's the derivative idea from Tier 6, extended from a one-dimensional curve to a whole two-dimensional surface.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"gradient-field",ground:"g0",buildsOn:["CG84","CG178"]}),

  // CG185 — Divergence
  C("V","CG185","Does the field spread out, or pour inward?",[
    "<p>Divergence asks one question at a point: do the field's arrows around it spread outward, like water emerging from a source, or do they collapse inward, like water draining away?</p><p>A positive charge has positive divergence in its field. A negative charge has negative divergence. It's a way of finding the source or sink, just by reading the arrows.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"divergence-intro",ground:"g0",buildsOn:["CG181"]}),

  // CG186 — Fluid flow as a vector field
  C("V","CG186","Water has a velocity at every point too",[
    "<p>A river doesn't move at one single speed, every point in it has its own velocity arrow — fast in the middle, slow near the banks, swirling around rocks. That entire picture is a vector field, exactly like gravity or an electric field, just describing motion instead of force.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"fluid-flow-field",ground:"g0",buildsOn:["CG178"]}),

  // CG187 — Why field diagrams predict force without a formula
  C("V","CG187","Reading the answer straight off the picture",[
    "<p>Drop any object into a field and the arrow at its location already tells you which way it'll be pushed or pulled, and roughly how hard, before a single formula is written down.</p><p>That's the entire purpose of drawing a field in the first place: turning a calculation into something you can read off a picture instead.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"field-as-prediction-tool",ground:"g0",buildsOn:["CG179","CG182"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 15: Matrices as transformations
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_15_MATRICES = [

  // CG188 — A matrix as an instruction
  C("V","CG188","A grid of numbers that moves every point at once",[
    "<p>A matrix isn't just a grid of numbers, it's an instruction for what to do to every single point on the plane. Feed any point in, and the matrix hands back where that point moves to.</p><p>Apply it to every point at once and the whole plane shifts, stretches, or spins together.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"matrix-as-transformation",ground:"g0",buildsOn:["CG11"]}),

  // CG189 — The identity matrix
  C("V","CG189","The instruction \"do nothing\"",[
    "<p>One particular matrix sends every point exactly back to itself, unmoved. It's called the identity matrix, the transformation equivalent of multiplying by 1.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"identity-matrix",ground:"g0",buildsOn:["CG188"]}),

  // CG190 — Scaling
  C("V","CG190","Stretching the whole plane from the origin",[
    "<p>A scaling matrix stretches or shrinks every point's distance from the origin by a fixed factor, in one or both directions. It's the same vertical-stretch idea from Tier 2, just applied to an entire plane instead of one curve.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"scaling-matrix",ground:"g0",buildsOn:["CG188","CG39"]}),

  // CG191 — Rotation
  C("V","CG191","Turning the whole plane about the origin",[
    "<p>A rotation matrix spins every point around the origin by the same fixed angle, leaving distances from the origin completely unchanged.</p><div class='formula'>(cos θ, −sin θ; sin θ, cos θ)<span class='gloss'>This matrix rotates any point anticlockwise by angle θ — built directly from the unit circle.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"rotation-matrix",ground:"g0",buildsOn:["CG188","CG101"]}),

  // CG192 — Reflection
  C("V","CG192","Flipping the plane across a line",[
    "<p>A reflection matrix takes every point and produces its mirror image across some fixed line, usually an axis. Reflect twice across the same line and every point lands right back where it started.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"reflection-matrix",ground:"g0",buildsOn:["CG188","CG40"]}),

  // CG193 — Shearing
  C("V","CG193","Tilting the grid without rotating it",[
    "<p>A shear pushes points sideways by an amount that depends on their height — the higher up a point is, the further it slides. Squares become parallelograms, but horizontal lines stay exactly horizontal.</p><p>It's the matrix transformation behind italic-style slanting.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"shear-matrix",ground:"g0",buildsOn:["CG188"]}),

  // CG194 — Combining transformations
  C("V","CG194","Doing several moves in one step",[
    "<p>Multiply two matrices together and the result is a single matrix that does both transformations in sequence — rotate then scale, for instance, collapsed into one combined instruction.</p><p>Order matters: rotating then scaling can give a different result than scaling then rotating.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"combining-transformations",ground:"g0",buildsOn:["CG190","CG191"]}),

  // CG195 — The determinant
  C("V","CG195","One number that says how much area changes",[
    "<p>Every matrix has a single number attached to it, the determinant, that says exactly how much it stretches or shrinks area. A determinant of 2 doubles every area. A determinant of 1 preserves area exactly, even while moving points around.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"determinant",ground:"g0",buildsOn:["CG188"]}),

  // CG196 — A negative determinant
  C("V","CG196","When the transformation flips the picture over",[
    "<p>A negative determinant means the transformation reverses orientation — like flipping a piece of paper over rather than just stretching or turning it. Clockwise becomes anticlockwise, left becomes right.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"negative-determinant",ground:"g0",buildsOn:["CG195","CG192"]}),

  // CG197 — Eigenvectors
  C("V","CG197","The directions a transformation leaves alone",[
    "<p>Most directions get rotated by a transformation. But for almost every matrix, a few special directions exist that only get stretched or shrunk, never turned — they point the exact same way after the transformation as before. Those special directions are eigenvectors.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"eigenvectors",ground:"g0",buildsOn:["CG188","CG65"]}),

  // CG198 — Eigenvalues
  C("V","CG198","How much those special directions stretch",[
    "<p>Each eigenvector comes with its own number, the eigenvalue, saying exactly how much that direction gets stretched or shrunk by the transformation.</p><p>Together, eigenvectors and eigenvalues describe a transformation's entire behaviour in its simplest possible terms: a handful of directions, each just scaling.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"eigenvalues",ground:"g0",buildsOn:["CG197"]}),

  // CG199 — Where this shows up
  C("V","CG199","From rendering a video game to describing a quantum state",[
    "<p>Every rotation, zoom, and skew in computer graphics is a matrix transformation applied to millions of points, every frame. In quantum mechanics, the eigenvectors of certain matrices describe the only states a measurement can actually find a particle in.</p><p>The same grid-transforming idea built here turns out to run both a video game engine and the deepest layer of physics we have.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"matrices-applications",ground:"g0",buildsOn:["CG194","CG197"]}),

];
/* ============================================================
   COORDINATE GEOMETRY — Tier 16: Optimization & the
   problem-solving toolkit
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   This is the "encyclopedia that helps solve problems" tier.
   ============================================================ */

const TIER_16_OPTIMIZATION = [

  // CG200 — Maximizing area with a fixed perimeter
  C("V","CG200","The classic fence problem",[
    "<p>Given a fixed length of fence, what shape encloses the most area? Write area as a function of one side's length, and the answer falls out of the same stationary-point method from Tier 6 — the best rectangle, it turns out, is always a square.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"fence-problem",ground:"g0",buildsOn:["CG88"]}),

  // CG201 — Minimizing cost — the box problem
  C("V","CG201","The classic box problem",[
    "<p>Given a fixed volume, what shape of box uses the least material? Same method as the fence problem, just minimizing instead of maximizing, and working with surface area instead of perimeter.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"box-problem",ground:"g0",buildsOn:["CG200"]}),

  // CG202 — Using the derivative to find the best point
  C("V","CG202","Not every stationary point is the one you want",[
    "<p>A function might have several stationary points, but only one of them is the actual best answer to a real problem. Check each candidate against the second derivative, and against the edges of whatever range makes physical sense, before declaring a winner.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"finding-the-best-point",ground:"g0",buildsOn:["CG88","CG89"]}),

  // CG203 — Constrained optimization
  C("V","CG203","When not every point is actually allowed",[
    "<p>Real problems usually come with restrictions — a length can't be negative, a budget can't be exceeded. Constrained optimization means finding the best point only among the ones that satisfy those restrictions, even if the unconstrained best point would be better.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"constrained-optimization",ground:"g0",buildsOn:["CG202"]}),

  // CG204 — Feasible regions
  C("V","CG204","Where every restriction is satisfied at once",[
    "<p>Plot several inequalities on the same grid and shade where each one holds true. The region where all the shadings overlap is the feasible region — every point allowed by every constraint simultaneously.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"feasible-region",ground:"g0",buildsOn:["CG203","CG31"]}),

  // CG205 — Linear programming
  C("V","CG205","Optimizing a straight target inside a region",[
    "<p>Linear programming asks: within a feasible region, where does a straight-line target function (like cost or profit) reach its largest or smallest value?</p><p>It's optimization, but constrained to straight lines on both sides — the constraints and the thing being optimized.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"linear-programming",ground:"g0",buildsOn:["CG204"]}),

  // CG206 — The corner-point principle
  C("V","CG206","The best answer always sits at a vertex",[
    "<p>For a linear target inside a feasible region, the best possible value is guaranteed to occur at one of the region's corners, never somewhere in the middle of an edge or the interior.</p><p>That shrinks an apparently infinite search down to checking a small handful of points.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"corner-point-principle",ground:"g0",buildsOn:["CG205"]}),

  // CG207 — Distance from a point to a line
  C("V","CG207","The shortest path is always perpendicular",[
    "<p>The shortest distance from a point to a line is always measured along the perpendicular dropped from the point to the line — any other path to the line is longer.</p><div class='formula'>d = |Ax₀ + By₀ + C| / √(A² + B²)<span class='gloss'>For a line Ax + By + C = 0 and a point (x₀, y₀), this hands back that shortest distance directly.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"point-to-line-distance",ground:"g0",buildsOn:["CG28"]}),

  // CG208 — Triangulation
  C("V","CG208","Pinpointing a location from two known distances",[
    "<p>If you know your distance from two fixed points, draw a circle of that radius around each one. The two circles cross at, at most, two points — and a third piece of information usually picks out which of those two is the real location.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"triangulation",ground:"g0",buildsOn:["CG15","CG48"]}),

  // CG209 — How GPS actually finds you
  C("V","CG209","Circles in the sky, intersecting on the ground",[
    "<p>A GPS receiver measures its distance from several satellites by timing how long their signal took to arrive. Each distance defines a sphere the receiver must be sitting on, and where enough of those spheres overlap pins down one single point: you.</p><p>It's triangulation, just lifted into three dimensions and run with satellites instead of landmarks.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"gps-triangulation",ground:"g0",buildsOn:["CG208"]}),

  // CG210 — The line of best fit
  C("V","CG210","The straight line that's wrong by the least amount",[
    "<p>Scattered data rarely sits on a perfect line, so the line of best fit is chosen to minimize the total squared distance between the line and every point — the straight line that's collectively wrong by the smallest possible amount.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"line-of-best-fit",ground:"g0",buildsOn:["CG24","CG202"]}),

  // CG211 — Correlation as the shape of a scatter plot
  C("V","CG211","Reading the relationship straight off the cloud of points",[
    "<p>A scatter plot that climbs roughly left to right suggests the two variables move together. One that falls suggests they move oppositely. A formless cloud suggests no relationship at all.</p><p>Correlation gives that visual impression a number, without changing what the picture was already showing.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"correlation",ground:"g0",buildsOn:["CG210"]}),

  // CG212 — The PV diagram
  C("V","CG212","Work done, as the area beneath a curve, again",[
    "<p>Plot a gas's pressure against its volume as it expands or compresses, and the area beneath that curve is exactly the work done — the same area-under-the-curve idea from Tier 7, just measuring pressure and volume instead of velocity and time.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"pv-diagram",ground:"g0",buildsOn:["CG75","CG96"]}),

  // CG213 — Stress-strain graphs
  C("V","CG213","Where a material stops springing back",[
    "<p>Plot the stress put on a material against how much it stretches, and the graph starts as a straight line: stretch is proportional to stress. Push past a certain point, the elastic limit, and the line bends — the material stops returning fully to its original shape.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"stress-strain-graph",ground:"g0",buildsOn:["CG20"]}),

  // CG214 — Force-extension graphs and Hooke's Law
  C("V","CG214","Energy stored, as area, once more",[
    "<p>A spring's force-extension graph is a straight line through the origin, by Hooke's Law. The area under that line, a simple triangle, is exactly the energy stored in the stretched spring.</p><p>Same principle as the PV diagram and the velocity-time graph: area under a graph keeps turning out to mean something physical.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"force-extension-energy",ground:"g0",buildsOn:["CG212"]}),

  // CG215 — Ray diagrams as coordinate geometry
  C("V","CG215","Reflection and refraction, as lines crossing a boundary",[
    "<p>A ray diagram is really just lines plotted on a grid, obeying specific angle rules at a boundary. Reflection and refraction can both be written as equations of lines meeting a surface at a defined angle — optics is borrowing this path's tools, even though optics itself isn't fundamentally built from the grid.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"ray-diagrams-as-lines",ground:"g0",buildsOn:["CG24"]}),

  // CG216 — The phase portrait
  C("V","CG216","Plotting velocity against position instead of time",[
    "<p>Instead of plotting position or velocity against time, plot them against each other directly: position on one axis, velocity on the other. The resulting path is a phase portrait, and for repeating motion like a swinging pendulum, it traces a closed loop.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"phase-portrait",ground:"g0",buildsOn:["CG71","CG73"]}),

  // CG217 — Reading stability from a phase portrait
  C("V","CG217","Spiralling in, spiralling out, or going round forever",[
    "<p>A phase portrait that spirals inward toward a point shows a system settling down, losing energy over time. One that spirals outward shows a system running away. A perfect closed loop, neither growing nor shrinking, shows a system that oscillates forever, unchanged.</p>"
  ],null,{subject:"physics",topic:"coordinate-geometry",concept:"phase-portrait-stability",ground:"g0",buildsOn:["CG216"]}),

  // CG218 — Cryptography on a curve
  C("V","CG218","Hiding a message inside a hard geometry problem",[
    "<p>Elliptic curve cryptography picks a point on a specific kind of curve and adds it to itself many times over, using a geometric rule for \"adding\" points on that curve. Going forward is fast. Working backward to find how many times the addition happened is, on a large enough curve, practically impossible.</p><p>That one-way difficulty, built from a curve's own geometry, is what secures a huge amount of the encrypted internet.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"elliptic-curve-crypto",ground:"g0",buildsOn:["CG174"]}),

  // CG219 — The encyclopedia closes the loop
  C("V","CG219","Every BB in this path was the same grid, once more",[
    "<p>A number line. Two number lines crossed. A curve, a wave, a spinning point, an arrow, a field of arrows, a matrix moving every point at once, a region where the best answer hides at a corner.</p><p>Every single one of these was the grid, looked at from a different angle. That's the whole claim this path was built to prove: coordinate geometry isn't a topic. It's the language most of the rest of this deck was already secretly speaking.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"path-synthesis",ground:"g0",buildsOn:["CG100","CG187","CG199"]}),

];
