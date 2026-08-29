/* ============================================================
   MATRICES — new standalone topic
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   Internal index: MX# (temporary, same convention as CG#/EL# —
   the real term is BB once locked).
   Not yet run through the real Loop with the author.
   ============================================================ */

const TIER_00_MATRIX_ALGEBRA = [

  // MX1 — A matrix is just a grid of numbers
  C("V","MX1","A grid of numbers, nothing more",[
    "<p>A <strong>matrix</strong> is just numbers arranged in rows and columns, like a tiny spreadsheet with no headers.</p><div class='formula'>[ 2  5 ]<br>[ 1  3 ]<span class='gloss'>A matrix: two rows, two columns, four numbers, one object.</span></div><p>That's it. The power isn't in any single number, it's in treating the whole grid as one thing you can add, scale, or multiply.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"matrix-intro",ground:"g0",buildsOn:[]}),

  // MX2 — Rows and columns
  C("V","MX2","Describing a matrix's size",[
    "<p>A matrix's size is written rows × columns. The matrix from before, with 2 rows and 2 columns, is a 2×2 matrix.</p><p>A grid with 3 rows and 2 columns is a 3×2 matrix — always rows first, columns second, the same order as plotting a point gives x before y.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"matrix-dimensions",ground:"g0",buildsOn:["MX1"]}),

  // MX3 — Adding two matrices
  C("V","MX3","Add the matching positions",[
    "<p>Adding two matrices of the same size is the least surprising operation in maths: add whatever sits in the same position in each.</p><div class='formula'>[ 2  5 ]   [ 1  0 ]   [ 3  5 ]<br>[ 1  3 ] + [ 4  2 ] = [ 5  5 ]<span class='gloss'>Top-left plus top-left, bottom-right plus bottom-right, and so on.</span></div><p>You can only add matrices that are exactly the same size — there's no matching position to add into otherwise.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"matrix-addition",ground:"g0",buildsOn:["MX2"]}),

  // MX4 — Scalar multiplication
  C("V","MX4","Scaling every entry by one number",[
    "<p>Multiply a matrix by a single plain number (a <strong>scalar</strong>) and every entry inside gets multiplied by it.</p><div class='formula'>3 × [ 2  5 ]   [ 6  15 ]<br>    [ 1  3 ] = [ 3  9  ]<span class='gloss'>Every entry, multiplied by the same scalar.</span></div><p>Multiplying by 1 changes nothing. Multiplying by 0 turns every entry to zero, no matter what was there before.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"scalar-multiplication",ground:"g0",buildsOn:["MX1"]}),

  // MX5 — Matrix multiplication
  C("V","MX5","Why you can't just multiply matching positions",[
    "<p>Multiplying two matrices together doesn't work like addition. You don't multiply matching positions — that operation exists too, but it isn't what \"matrix multiplication\" means.</p><p>Instead, each entry of the result comes from taking a whole row of the first matrix and a whole column of the second, multiplying them position-by-position, and adding those products up. It looks strange at first because it's doing something genuinely different: combining two instructions into one, not just pairing up numbers.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"matrix-multiplication-intro",ground:"g0",buildsOn:["MX2"]}),

  // MX6 — Worked example: multiplying two matrices
  C("V","MX6","Walking through one multiplication",[
    "<p>Multiply [1 2; 3 4] by [5 6; 7 8]. Top-left of the answer: take row 1 of the first (1, 2) and column 1 of the second (5, 7), multiply position-by-position and add: 1×5 + 2×7 = 19.</p><div class='formula'>[ 1  2 ]   [ 5  6 ]   [ 19  22 ]<br>[ 3  4 ] × [ 7  8 ] = [ 43  50 ]<span class='gloss'>Each entry: a row from the first, a column from the second, multiplied pairwise and summed.</span></div><p>Top-right: row 1 (1, 2) with column 2 (6, 8): 1×6 + 2×8 = 22. Same pattern fills the rest.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"matrix-multiplication-worked-example",ground:"g0",buildsOn:["MX5"]}),

  // MX7 — The identity matrix
  C("V","MX7","The instruction \"do nothing\"",[
    "<p>One special matrix, multiplied by anything, leaves it completely unchanged — the matrix equivalent of multiplying a number by 1.</p><div class='formula'>I = [ 1  0 ]<br>    [ 0  1 ]<span class='gloss'>The identity matrix. 1's down the diagonal, 0's everywhere else.</span></div><p>Multiply [2 5; 1 3] by I and you get [2 5; 1 3] back, untouched. It's the matrix world's way of saying \"change nothing.\"</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"identity-matrix",ground:"g0",buildsOn:["MX6"]}),

];

/* ============================================================
   MATRICES — Tier 1: transformations, and what undoes them
   ============================================================ */

const TIER_01_TRANSFORMATIONS = [

  // MX8 — A matrix as a transformation
  C("V","MX8","An instruction for moving every point at once",[
    "<p>Take a matrix and a point on the grid, multiply them, and out comes a new point. Do that to every point on the plane using the same matrix, and the whole plane moves according to one fixed rule.</p><p>That's a <strong>transformation</strong>: a matrix isn't just a grid of numbers sitting still, it's an instruction for relocating every point on the page, all governed by the same four numbers.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"matrix-as-transformation",ground:"g0",buildsOn:["MX6"]}),

  // MX9 — Scaling
  C("V","MX9","Stretching the whole plane",[
    "<p>The matrix [2 0; 0 2] doubles every point's distance from the origin — pure stretching, no twisting.</p><div class='formula'>[ 2  0 ]   [ 3 ]   [ 6 ]<br>[ 0  2 ] × [ 4 ] = [ 8 ]<span class='gloss'>The point (3,4) stretches out to (6,8).</span></div><p>Use [2 0; 0 1] instead and only the x-direction stretches, squashing circles into ellipses.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"scaling-transformation",ground:"g0",buildsOn:["MX8"]}),

  // MX10 — Rotation
  C("V","MX10","Turning the whole plane about the origin",[
    "<p>A rotation matrix turns every point by the same angle around the origin, like spinning a clock face.</p><div class='formula'>[ 0  −1 ]   [ 3 ]   [ −4 ]<br>[ 1   0 ] × [ 4 ] = [  3 ]<span class='gloss'>This matrix rotates every point 90° anticlockwise. (3,4) lands on (−4,3).</span></div><p>Check the lengths: √(3²+4²)=5 before, √((−4)²+3²)=5 after — rotation never changes how far a point sits from the origin, only the direction.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"rotation-transformation",ground:"g0",buildsOn:["MX8"]}),

  // MX11 — Reflection
  C("V","MX11","Flipping the plane across a line",[
    "<p>The matrix [1 0; 0 −1] keeps every x-coordinate the same and flips the sign of every y-coordinate — a mirror flip across the x-axis.</p><div class='formula'>[ 1   0 ]   [ 3 ]   [  3 ]<br>[ 0  −1 ] × [ 4 ] = [ −4 ]<span class='gloss'>(3,4) reflects to (3,−4) — same x, flipped y.</span></div><p>Reflecting twice undoes itself completely: flip (3,4) to (3,−4), then flip again, and you land right back on (3,4).</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"reflection-transformation",ground:"g0",buildsOn:["MX8"]}),

  // MX12 — The determinant
  C("V","MX12","How much a transformation stretches area",[
    "<p>Every 2×2 matrix has a single number attached to it, the <strong>determinant</strong>, that tells you exactly how much it scales area.</p><div class='formula'>det [ a  b ] = ad − bc<br>    [ c  d ]<span class='gloss'>Multiply the diagonal, subtract the cross product.</span></div><p>For [2 0; 0 2]: det = 2×2 − 0×0 = 4 — any shape's area quadruples under this transformation, matching the fact that it stretches both directions by 2 (2×2=4).</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"determinant",ground:"g0",buildsOn:["MX9"]}),

  // MX13 — Zero determinant
  C("V","MX13","When a transformation flattens the plane",[
    "<p>Take [2 4; 1 2]: det = 2×2 − 4×1 = 4 − 4 = 0. A determinant of zero means this transformation squashes the entire 2D plane down onto a single line — every shape loses all its area, flattened to nothing.</p><p>Once the plane is flattened like that, there's no way to reverse it: many different starting points get squashed onto the very same final point, so there's no unique way back. A zero determinant always means no inverse exists.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"zero-determinant; singular-matrix",ground:"g0",buildsOn:["MX12"]}),

  // MX14 — The inverse matrix
  C("V","MX14","The instruction that undoes another instruction",[
    "<p>If a matrix moves every point one way, its <strong>inverse</strong> is the matrix that moves every point straight back, undoing the transformation completely.</p><div class='formula'>A⁻¹ = 1/det(A) × [ d  −b ]<br>                  [ −c  a ]<span class='gloss'>Swap the diagonal, flip the sign of the other two, divide everything by the determinant.</span></div><p>For [2 0; 0 2], det = 4, so the inverse is [0.5 0; 0 0.5] — exactly what you'd guess: undo a doubling by halving.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"inverse-matrix",ground:"g0",buildsOn:["MX13"]}),

  // MX15 — Solving simultaneous equations
  C("V","MX15","Two equations, solved in one move",[
    "<p>The system 2x + y = 8, x + y = 5 can be written as one matrix equation: [2 1; 1 1] times [x; y] equals [8; 5].</p><div class='formula'>[ 2  1 ] [ x ]   [ 8 ]<br>[ 1  1 ] [ y ] = [ 5 ]<span class='gloss'>The same two equations, written as a matrix times a point.</span></div><p>det = 2×1 − 1×1 = 1, so the inverse is [1 −1; −1 2]. Multiply both sides by it: x = 1×8 + (−1)×5 = 3, y = (−1)×8 + 2×5 = 2. Check it: 2(3)+2=8 ✓ and 3+2=5 ✓ — the same answer you'd get solving the two lines from Coordinate Geometry's simultaneous-equations card, just reached through a matrix instead.</p>"
  ],null,{subject:"maths",topic:"matrices",concept:"simultaneous-equations-matrix",ground:"g0",buildsOn:["MX14"]}),

];
