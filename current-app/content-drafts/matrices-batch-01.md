# Matrices — Batch 1 (12 BBs for review)

A fresh introduction to matrices framed through bookkeeping and spreadsheets. The central metaphor: a matrix is a ledger where changing one row or one column doesn't cascade into the rest — the isolation property that makes matrices fundamentally different from equations. The batch builds from the grid, through row/column operations, to solving systems of equations.

---

## BB-NEW-70 — A matrix is a ledger, not an equation

**Subject:** maths | **Topic:** matrices | **Concept:** matrix-intro; grid-of-numbers; ledgers | **Ground:** g0 | **Builds on:** []

**Floor 0 (Idea):**
<p>An equation ties everything together — change one term and the whole thing shifts. A matrix is the opposite. It's a grid of numbers where each cell sits in its own box. Change one entry and the others stay exactly as they were. A matrix is less like an equation and more like a ledger, a spreadsheet, a table of independent entries held in a shared frame.</p>

**Floor 1 (Concrete):**
<p>Open a spreadsheet. Row 3, column B has the number 47. Change it to 52. Row 3, column C does not change. Row 4 does not change. The whole R column does not change. A spreadsheet doesn't enforce relationships between cells — it just holds numbers in labelled slots. A <strong>matrix</strong> is exactly that: a rectangular array of numbers, with rows and columns, where each position is independent. Nothing is linked until you choose to operate on the whole thing at once.</p>

**Floor 2 (Definition):**
<p>A <strong>matrix</strong> is an ordered rectangular array of numbers (or symbols) arranged in rows and columns. It is written with square brackets enclosing the grid. A matrix with m rows and n columns is an m × n matrix, read "m by n." Each individual number is an <strong>entry</strong> or <strong>element</strong>. A matrix is a single mathematical object — just as a vector bundles several numbers into one arrow, a matrix bundles m × n numbers into one grid.</p>

**Floor 3 (In action):**
<p>Matrices appear wherever information is naturally tabular. A shop's inventory: rows are products, columns are warehouses — each entry is a stock count. A network graph: rows are senders, columns are receivers — each entry is 1 if connected, 0 if not. A system of equations: each row is one equation, each column is one variable. The matrix captures the structure without the relationships — the relationships are added by the operations you choose to perform on it.</p>

**Image prompt:** A chalk drawing of a 3×3 matrix with labelled rows (R₁, R₂, R₃) and columns (C₁, C₂, C₃). One entry is highlighted and a note says "changing this entry leaves all others unchanged." To the side, a circled equation with arrows: "changing one term shifts everything." Chalk on dark green board. Square 1:1.

---

## BB-NEW-71 — Rows, columns, and the shape of a matrix

**Subject:** maths | **Topic:** matrices | **Concept:** matrix-dimensions; rows; columns; m-by-n | **Ground:** g0 | **Builds on:** [BB-NEW-70]

**Floor 0 (Idea):**
<p>A ledger page has rows (transactions) and columns (accounts). A matrix has the same structure. Its size is described by how many of each: rows first, then columns — the same convention as plotting a point gives x before y.</p>

**Floor 1 (Concrete):**
<p>A shop tracks three products across four warehouses. The natural layout is a grid with 3 rows (one per product) and 4 columns (one per warehouse). This is a 3 × 4 matrix. If you wanted to track four products across three warehouses, it would be a 4 × 3 matrix — a different shape, with a different meaning. The order "rows × columns" is fixed: every entry a_ij lives at row i, column j.</p>

**Floor 2 (Definition):**
<p>A matrix with m rows and n columns is an <strong>m × n matrix</strong>. The entry in the i-th row and j-th column is denoted a_ij or a_{i,j}. A matrix with the same number of rows and columns (m = n) is a <strong>square matrix</strong> of order n. A matrix with only one row is a <strong>row matrix</strong> (or row vector). A matrix with only one column is a <strong>column matrix</strong> (or column vector). Two matrices are <strong>equal</strong> only if they have the same dimensions and every corresponding entry is equal.</p>

**Floor 3 (In action):**
<p>The dimensions tell you what operations are legal. You can add two matrices only if they have exactly the same shape — a 3×4 ledger plus another 3×4 ledger. You can multiply two matrices only if the number of columns in the first equals the number of rows in the second. The dimensions are not decorative — they are constraints, and violating them produces nonsense the same way trying to add "3 apples" and "5 kilometres" produces nonsense.</p>

**Image prompt:** A chalk drawing of a 3×4 matrix with rows labelled 1,2,3 and columns labelled 1,2,3,4. Entry a₂₃ is circled with an arrow pointing to row 2, column 3. Below: "m × n matrix: m rows, n columns." Chalk on dark green board. Square 1:1.

---

## BB-NEW-72 — The isolation property: why matrices are not equations

**Subject:** maths | **Topic:** matrices | **Concept:** matrix-isolation; row-operations-preview; why-matrices | **Ground:** g0 | **Builds on:** [BB-NEW-70]

**Floor 0 (Idea):**
<p>In an equation like x + y = 10, if x changes, y must change to compensate — the terms are shackled together. In a matrix, row 1 and column 2 have nothing to do with each other until you decide to operate on them. This isolation is the whole point: a matrix lets you make surgical changes to one row, one column, or even one entry without rewriting everything else.</p>

**Floor 1 (Concrete):**
<p>Consider a 3×3 matrix tracking three accounts across three months. January's entries are in row 1, February's in row 2, March's in row 3. You discover January's numbers are wrong and need to be doubled. In a matrix, you multiply row 1 by 2 — and rows 2 and 3 stay untouched. The February and March entries don't budge. If this were a system of linked equations, doubling one term would propagate through every other term. The matrix contains the change.</p>

**Floor 2 (Definition):**
<p>A matrix stores information in isolated cells — no entry depends on any other entry by default. Operations on a matrix apply where you direct them and nowhere else. The three fundamental <strong>row operations</strong> that preserve the relationships you care about are: (1) swap two rows, (2) multiply a row by a non-zero constant, (3) add a multiple of one row to another. These are local — they affect only the rows involved, never the whole matrix indiscriminately.</p>

**Floor 3 (In action):**
<p>This isolation property is why matrices are the language of linear algebra, not just a notation. It lets you solve systems of equations by cleaning up one row at a time without breaking the others. It lets you transform shapes point by point without warping the whole picture. It lets a computer rotate a 3D model by multiplying a rotation matrix against a column of coordinates — changing only the orientation, not the shape. The matrix contains the operation; the isolation keeps everything else intact.</p>

**Image prompt:** A chalk drawing showing a 3×3 matrix. Row 1 is highlighted and multiplied by 2. Rows 2 and 3 have a note: "unchanged." To the side, an equation x + y = 10 is shown — changing x forces y to change, with arrows showing the cascade. Chalk on dark green board. Square 1:1.

---

## BB-NEW-73 — Adding matrices: merging two ledgers

**Subject:** maths | **Topic:** matrices | **Concept:** matrix-addition; element-wise; merging | **Ground:** g0 | **Builds on:** [BB-NEW-71]

**Floor 0 (Idea):**
<p>You have two inventory sheets with the same layout — same products in the same order, same warehouses in the same columns. To merge them, add the numbers that sit in the same position. This is matrix addition: the simplest possible operation, cell by cell, matching position to matching position.</p>

**Floor 1 (Concrete):**
<p>Warehouse A has 3 units of Product 1 and 5 of Product 2. Warehouse B has 2 units of Product 1 and 4 of Product 2. The combined stock is a single matrix: top row (Product 1): 3+2=5 units. Bottom row (Product 2): 5+4=9 units. Every entry is just the sum of the two entries that occupied that position in the original two matrices.</p>

**Floor 2 (Definition):**
<p>If A and B are both m × n matrices, their <strong>sum</strong> A + B is the m × n matrix where (A + B)_ij = A_ij + B_ij for every i, j. Addition is <strong>element-wise</strong> — add whatever sits in the same position. It is commutative (A + B = B + A) and associative ((A + B) + C = A + (B + C)). Matrices of different sizes cannot be added — there is no matching position for the extra rows or columns.</p>

**Floor 3 (In action):**
<p>Matrix addition is the operation you use when combining data from two sources with identical structure: merging sales figures from two regions, summing forces expressed as column vectors, adding the adjacency matrices of two network layers. The constraint — same dimensions — is not arbitrary. If one ledger tracks 3 products and the other tracks 4, you cannot merge them cell by cell because the fourth product has no counterpart. The dimensions enforce that the two grids describe the same thing, structured the same way.</p>

**Image prompt:** A chalk drawing of two 2×2 matrices side by side. The sum matrix appears below, with arrows from each pair of matching positions to the sum. A crossed-out attempt shows two matrices of different sizes with "cannot add — different dimensions." Chalk on dark green board. Square 1:1.

---

## BB-NEW-74 — Scalar multiplication: an across-the-board change

**Subject:** maths | **Topic:** matrices | **Concept:** scalar-multiplication; uniform-scaling | **Ground:** g0 | **Builds on:** [BB-NEW-70]

**Floor 0 (Idea):**
<p>Apply a 10% price increase to every product in a catalogue. Multiply every entry by 1.10. Convert every distance from metres to centimetres — multiply every entry by 100. When the same number applies to everything in the grid, you're doing scalar multiplication.</p>

**Floor 1 (Concrete):**
<p>A price list in matrix form shows three products priced at 40, 25, and 60 currency units. A 5% tax is applied uniformly: multiply the entire matrix by 1.05. Every entry scales by the same factor: 40 → 42, 25 → 26.25, 60 → 63. The relative proportions between products remain exactly the same — the cheapest product is still cheapest, just by the same margin, scaled up.</p>

**Floor 2 (Definition):**
<p><strong>Scalar multiplication</strong> is the operation of multiplying every entry of a matrix by a single number (a <strong>scalar</strong>). If A is an m × n matrix and k is a scalar, then kA is the m × n matrix where (kA)_ij = k · A_ij for every i, j. Multiplying by 1 leaves the matrix unchanged. Multiplying by 0 turns every entry to zero — the <strong>zero matrix</strong>. Multiplying by −1 flips the sign of every entry.</p>

**Floor 3 (In action):**
<p>Scalar multiplication is uniform — it applies the same factor everywhere. This distinguishes it from row operations (which affect only one row) and from multiplication by another matrix (which mixes entries together). In physics, multiplying a vector (a column matrix) by a scalar changes its length but not its direction. In economics, multiplying an input-output matrix by a scalar models a proportional scaling of the entire economy. The scalar applies evenly, without discrimination — a uniform change across the whole grid.</p>

**Image prompt:** A chalk drawing of a 2×3 matrix. A multiplier k = 3 is written beside it with an arrow pointing to the result: every entry tripled. Below: 1 × A = A unchanged, 0 × A = all zeros, −1 × A = all signs flipped. Chalk on dark green board. Square 1:1.

---

## BB-NEW-75 — Matrix multiplication: the row-times-column rule

**Subject:** maths | **Topic:** matrices | **Concept:** matrix-multiplication; row-times-column; dot-product | **Ground:** g0 | **Builds on:** [BB-NEW-71, BB-NEW-73]

**Floor 0 (Idea):**
<p>Multiplying two matrices is not cell-by-cell. It's row-by-column. To get the entry at row 2, column 3 of the product, take the whole of row 2 from the first matrix and the whole of column 3 from the second, multiply them position by position, and add the results. It looks odd because it's doing something genuinely different: it's compounding information, not just pairing it up.</p>

**Floor 1 (Concrete):**
<p>To multiply A = [1 2; 3 4] by B = [5 6; 7 8]: the top-left entry of AB uses row 1 of A (1, 2) and column 1 of B (5, 7): 1×5 + 2×7 = 19. Top-right: row 1 of A (1, 2) and column 2 of B (6, 8): 1×6 + 2×8 = 22. Bottom-left: row 2 of A (3, 4) and column 1 of B (5, 7): 3×5 + 4×7 = 43. Bottom-right: row 2 of A (3, 4) and column 2 of B (6, 8): 3×6 + 4×8 = 50. Result: [19 22; 43 50].</p>

**Floor 2 (Definition):**
<p>If A is an m × n matrix and B is an n × p matrix, the <strong>product</strong> AB is an m × p matrix where (AB)_ij = Σₖ A_ik · B_kj — the sum over k of the product of the i-th row of A and the j-th column of B. The number of columns of A must equal the number of rows of B — otherwise the row and column don't have the same number of terms to pair up. Matrix multiplication is <strong>not commutative</strong>: AB ≠ BA in general.</p>

**Floor 3 (In action):**
<p>The row×column rule is not arbitrary — it's designed so that matrix multiplication corresponds to composing transformations. If matrix R rotates the plane and matrix S scales it, then RS (apply S first, then R) rotates-then-scales — and the row×column rule is what makes that composition work out. If you multiply cell-by-cell instead, the geometry breaks. The strange-looking rule earns its keep: it's the only rule that makes matrices behave as instructions that can be chained together.</p>

**Image prompt:** A chalk drawing of two 2×2 matrices A and B with the multiplication worked step by step. Row 1 of A is highlighted in one colour, column 1 of B in another, with arrows showing the pairwise products being summed. The result matrix appears below. Chalk on dark green board. Square 1:1.

---

## BB-NEW-76 — Why row×column? It comes from equations

**Subject:** maths | **Topic:** matrices | **Concept:** matrix-multiplication-motivation; equations-to-matrices | **Ground:** g0 | **Builds on:** [BB-NEW-75]

**Floor 0 (Idea):**
<p>The row×column rule didn't come from nowhere. It was invented to make one compact equation — Ax = b — stand for a whole system of linear equations. Multiply a matrix by a column vector using the row×column rule and you get exactly the left-hand side of each equation, one per row.</p>

**Floor 1 (Concrete):**
<p>Consider the system: 2x + 3y = 8 and 4x + 5y = 13. Write the coefficients as a matrix A = [2 3; 4 5]. Write the variables as a column vector x = [x; y]. Multiply A times x: row 1 of A (2,3) times column x (x,y) = 2x + 3y — exactly the left side of the first equation. Row 2 of A (4,5) times column x (x,y) = 4x + 5y — the left side of the second equation. The right-hand sides form another column vector b = [8; 13]. The whole system is Ax = b.</p>

**Floor 2 (Definition):**
<p>A system of m linear equations in n unknowns — a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ = b₁, a₂₁x₁ + ... = b₂, etc. — can be written as the single matrix equation <strong>Ax = b</strong>, where A is the m × n <strong>coefficient matrix</strong>, x is the n × 1 column vector of unknowns, and b is the m × 1 column vector of constants. The row×column rule is the mechanism that reconstructs each linear equation from the rows of A and the unknowns in x.</p>

**Floor 3 (In action):**
<p>This is the bridge between matrices and equations. The matrix A holds the structure — which variables appear in which equation, with what coefficients. The column vector x holds the unknowns. The multiplication Ax = b is the machine that turns that structure back into the original equations. Once you see this, solving a system of equations becomes a matrix problem: given A and b, find x. And matrices give you systematic tools — row operations, elimination, inversion — that are far cleaner than the ad-hoc substitution and elimination you do by hand.</p>

**Image prompt:** A chalk drawing showing the system 2x+3y=8, 4x+5y=13 on the left. An arrow points to the matrix form: [2 3; 4 5] × [x; y] = [8; 13]. Row 1 of A is connected to the first equation with an arrow showing 2·x + 3·y. Chalk on dark green board. Square 1:1.

---

## BB-NEW-77 — Writing any linear system as Ax = b

**Subject:** maths | **Topic:** matrices | **Concept:** augmented-matrix; coefficient-matrix; Ax=b | **Ground:** g0 | **Builds on:** [BB-NEW-76]

**Floor 0 (Idea):**
<p>Every system of linear equations can be written as a single matrix equation — a coefficient matrix times a column of unknowns equals a column of answers. The translation is mechanical: each equation becomes one row of the matrix, each variable becomes one column, and the right-hand sides become their own column. The equations disappear into a clean grid.</p>

**Floor 1 (Concrete):**
<p>The system: 3x − y + 2z = 7, x + 4y − z = 2, 2x + y + z = 5. Extract the coefficients: A = [3 −1 2; 1 4 −1; 2 1 1]. The unknowns: x = [x; y; z]. The constants: b = [7; 2; 5]. Check: row 1 of A times x = 3x + (−1)y + 2z = 7 ✓. Row 2: 1x + 4y + (−1)z = 2 ✓. Row 3: 2x + 1y + 1z = 5 ✓. Often the coefficients and constants are combined into an <strong>augmented matrix</strong> [A|b] for solving.</p>

**Floor 2 (Definition):**
<p>For a system of m linear equations in n unknowns, the <strong>coefficient matrix</strong> A is the m × n matrix of coefficients. The <strong>augmented matrix</strong> [A | b] appends the constants column b to the right of A, separated by a vertical bar. Writing the system in matrix form as Ax = b is not just notation — it is the starting point for systematic solution methods (Gaussian elimination, matrix inversion) that treat the whole system as one object rather than m separate equations.</p>

**Floor 3 (In action):**
<p>The augmented matrix is the ledger form of a system of equations. Each row is one equation's worth of information. The vertical bar separates the "known structure" (coefficients) from the "target values" (constants). Once in this form, you can manipulate the rows — swap them, scale them, add them together — and the system's solutions remain unchanged. The matrix absorbs the equations and turns solving into a mechanical, bookkeeping-like process: tidy the left side until the answers fall out.</p>

**Image prompt:** A chalk drawing of a system of 3 equations in 3 unknowns on the left. An arrow points to the augmented matrix [A|b]: a 3×3 coefficient grid with a vertical bar and a 3×1 constants column. Each row of the system is connected to the corresponding row of the augmented matrix. Chalk on dark green board. Square 1:1.

---

## BB-NEW-78 — Row operations: the three legal moves

**Subject:** maths | **Topic:** matrices | **Concept:** row-operations; elementary-operations; solution-preserving | **Ground:** g0 | **Builds on:** [BB-NEW-72, BB-NEW-77]

**Floor 0 (Idea):**
<p>There are exactly three things you can do to a row of a matrix without changing what the matrix represents. Swap two rows. Multiply a row by a non-zero number. Add a multiple of one row to another. These are the elementary row operations. They are surgical — each one affects only the rows you target. Everything else stays untouched.</p>

**Floor 1 (Concrete):**
<p>Start with the augmented matrix for 2x + 3y = 8, 4x + 5y = 13: [2 3 | 8; 4 5 | 13]. Operation: replace row 2 with (row 2 − 2×row 1). Row 1 stays [2 3 | 8]. Row 2 becomes [4−4, 5−6, 13−16] = [0, −1, −3]. The new matrix is [2 3 | 8; 0 −1 | −3]. This is equivalent to the original system — it has the same solution (x=1, y=2) — but now row 2 directly gives −y = −3, so y = 2, and back-substituting gives x = 1. The operation cleaned one row without breaking the solution.</p>

**Floor 2 (Definition):**
<p>The three <strong>elementary row operations</strong> on a matrix are: (1) <strong>Swap</strong> — interchange two rows (Rᵢ ↔ Rⱼ). (2) <strong>Scale</strong> — multiply a row by a non-zero constant (Rᵢ → kRᵢ, k ≠ 0). (3) <strong>Replace</strong> — add a multiple of one row to another (Rᵢ → Rᵢ + kRⱼ). Each operation corresponds to a valid algebraic manipulation of the underlying equations — reordering, multiplying both sides by a constant, or adding equations — and therefore preserves the solution set.</p>

**Floor 3 (In action):**
<p>Row operations are the matrix equivalent of the algebraic moves you already know. Swapping rows = reordering equations (commutative property of "and"). Scaling a row = multiplying both sides of one equation by the same non-zero number. Adding a multiple of one row to another = adding the two equations together (if a=b and c=d, then a+c=b+d — but also a+kc=b+kd). The matrix just lets you do these moves mechanically, without writing x and y over and over. Each operation is local to the rows you choose; the isolation property holds.</p>

**Image prompt:** A chalk drawing of a 2×3 augmented matrix. Three arrows show the three operations: (1) R₁↔R₂ with swapped rows highlighted, (2) R₂ → 3R₂ with the row tripled, (3) R₂ → R₂ − 2R₁ with the calculation shown. Below: "These preserve the solution." Chalk on dark green board. Square 1:1.

---

## BB-NEW-79 — Row operations as bookkeeping actions

**Subject:** maths | **Topic:** matrices | **Concept:** row-operations-intuition; bookkeeping-analogy | **Ground:** g0 | **Builds on:** [BB-NEW-78]

**Floor 0 (Idea):**
<p>Every row operation has a bookkeeping counterpart. Swapping rows is reordering entries in a ledger — the information is the same, just in a different order. Scaling a row is converting units — "these figures were in hundreds, now they're in actuals." Adding rows is consolidating accounts — combining two partial records into one cleaner statement. None of these changes the underlying reality; they just reorganise how it's written down.</p>

**Floor 1 (Concrete):**
<p>A ledger tracks three accounts (rows) over two months (columns). You want account 3 to be the first row because it's the largest. Swap R₁ and R₃ — accounts 1 and 2 are untouched, account 3 moves to the top. Then you realize account 2's entries are in the wrong units — they need to be divided by 100. Scale R₂ by 0.01 — accounts 1 (now row 2) and 3 (now row 1) are unaffected. Finally, you notice account 1's entries are just twice account 2's — you replace row 2 with (R₂ + ½R₁) to consolidate. Each operation targets specific rows; the rest of the ledger sits undisturbed.</p>

**Floor 2 (Definition):**
<p>Row operations are the tools for systematically reorganising a matrix into a form where the information it encodes becomes obvious. They are the matrix analogue of algebraic manipulation, but cleaner: instead of manipulating equations term by term with variables written out, you manipulate rows of numbers. The three operations — swap, scale, replace — form a complete set: any sequence of legal algebraic moves on the original equations can be expressed as a sequence of row operations on the augmented matrix.</p>

**Floor 3 (In action):**
<p>This is the real power of the bookkeeping analogy. A messy ledger hides the totals; a tidy ledger makes them jump out. A messy augmented matrix hides the solutions; a row-reduced matrix makes them jump out. The goal of Gaussian elimination (next) is exactly this: use row operations to produce a matrix so clean that the solution can be read directly from it. Every operation is reversible (except scaling by zero, which is forbidden), so you can always trace back if you make a mistake. The matrix is a working document, not a fragile equation — you can reorganise it without fear.</p>

**Image prompt:** A chalk drawing of a 3×3 augmented matrix going through three row operations. Each operation is labelled with its bookkeeping analogy: "reorder rows" (swap), "convert units" (scale), "consolidate accounts" (replace). The final clean matrix has the solution circled. Chalk on dark green board. Square 1:1.

---

## BB-NEW-80 — Gaussian elimination: tidying the ledger until the answers appear

**Subject:** maths | **Topic:** matrices | **Concept:** gaussian-elimination; row-echelon-form; back-substitution | **Ground:** g1 | **Builds on:** [BB-NEW-78, BB-NEW-77]

**Floor 0 (Idea):**
<p>Gaussian elimination is a recipe: use row operations to transform a messy augmented matrix into a tidy triangular form where the answers can be read off from the bottom up. It's the same elimination you do by hand when solving equations — just systematised, with the matrix doing the bookkeeping so you don't have to carry variables around.</p>

**Floor 1 (Concrete):**
<p>Solve x + 2y + z = 3, 2x + 5y + 2z = 4, x + 3y + 3z = 6. Augmented matrix: [1 2 1 | 3; 2 5 2 | 4; 1 3 3 | 6]. Step 1: R₂ → R₂ − 2R₁ → [1 2 1 | 3; 0 1 0 | −2; 1 3 3 | 6]. Step 2: R₃ → R₃ − R₁ → [1 2 1 | 3; 0 1 0 | −2; 0 1 2 | 3]. Step 3: R₃ → R₃ − R₂ → [1 2 1 | 3; 0 1 0 | −2; 0 0 2 | 5]. Now row 3 gives 2z = 5 → z = 2.5. Row 2 gives y = −2. Row 1: x + 2(−2) + 2.5 = 3 → x = 4.5. The solution (x, y, z) = (4.5, −2, 2.5) falls out by reading upward.</p>

**Floor 2 (Definition):**
<p><strong>Gaussian elimination</strong> is an algorithm that transforms an augmented matrix [A | b] into <strong>row-echelon form</strong> — a staircase shape where each leading non-zero entry sits to the right of the one above it, and rows of all zeros (if any) are at the bottom. The process: for each column from left to right, use the diagonal entry as a pivot to eliminate all entries below it by adding suitable multiples of the pivot row. Once in row-echelon form, <strong>back-substitution</strong> solves for the unknowns from the bottom up.</p>

**Floor 3 (In action):**
<p>Gaussian elimination is one of the oldest algorithms still in daily use — Carl Friedrich Gauss used it to track the asteroid Ceres in 1801, computing its orbit from a handful of observations by solving a system of equations. Today it runs inside every computer graphics engine (solving for light, shadows, and collisions), every circuit simulator, every economic model. The algorithm is the same; only the size of the matrix has changed. Gauss's 6×6 system took him weeks by hand; a modern computer does a million-by-million system in seconds.</p>

**Image prompt:** A chalk drawing of a 3×4 augmented matrix transforming through three steps into row-echelon form (triangular). At each step, the operation is annotated. The final form has z = 2.5, y = −2, x = 4.5 read off with arrows. Below: "Gaussian elimination — the ledger, tidied." Chalk on dark green board. Square 1:1.

---

## BB-NEW-81 — The identity matrix: the "change nothing" instruction

**Subject:** maths | **Topic:** matrices | **Concept:** identity-matrix; multiplicative-identity; I | **Ground:** g0 | **Builds on:** [BB-NEW-75]

**Floor 0 (Idea):**
<p>In ordinary arithmetic, multiplying by 1 changes nothing: 7 × 1 = 7. Matrices have their own version of 1 — the identity matrix, written I. Multiply any matrix (of compatible size) by I and you get the original back, unchanged. I is the "do nothing" matrix.</p>

**Floor 1 (Concrete):**
<p>The 2×2 identity matrix is I = [1 0; 0 1]. Multiply it by A = [2 5; 1 3]: IA = [1 0; 0 1] × [2 5; 1 3] = [1×2+0×1, 1×5+0×3; 0×2+1×1, 0×5+1×3] = [2 5; 1 3] — exactly A. Multiply the other way, AI: [2 5; 1 3] × [1 0; 0 1] = [2×1+5×0, 2×0+5×1; 1×1+3×0, 1×0+3×1] = [2 5; 1 3] — also A. For the identity, unlike most matrix pairs, the order doesn't matter.</p>

**Floor 2 (Definition):**
<p>The <strong>identity matrix</strong> Iₙ (or simply I) of order n is the n × n square matrix with 1's on the main diagonal (where i = j) and 0's everywhere else. For any m × n matrix A: I_m A = A and A I_n = A. The identity matrix is the <strong>multiplicative identity</strong> for matrix multiplication — it plays the same role as the number 1 in ordinary multiplication. The columns of I are the standard basis vectors e₁, e₂, ..., eₙ.</p>

**Floor 3 (In action):**
<p>The identity matrix is the reference ledger — the state where every account starts at 1 in its own column and 0 everywhere else. It's the "before" snapshot in any transformation. When a matrix A represents an action (a rotation, a scaling, a reflection), multiplying by I represents doing nothing first — and getting A back. The identity also anchors the concept of an inverse matrix: A⁻¹ is defined as the matrix that, multiplied by A, gives I. The identity is the target, the neutral state, the unchanged baseline.</p>

**Image prompt:** A chalk drawing of a 3×3 identity matrix with 1's on the diagonal highlighted in pale yellow and 0's elsewhere. Below: I × A = A, A × I = A. A matrix A is shown on the right, identical before and after multiplication by I. Chalk on dark green board. Square 1:1.

---

## BB-NEW-82 — The inverse matrix: the "undo" instruction

**Subject:** maths | **Topic:** matrices | **Concept:** inverse-matrix; A-inverse; solving-with-inverse | **Ground:** g1 | **Builds on:** [BB-NEW-81, BB-NEW-77]

**Floor 0 (Idea):**
<p>Every operation has an undo. Add 5 → subtract 5 to undo. Multiply by 3 → divide by 3 to undo. For matrices, the undo of A is A⁻¹ — the inverse matrix. Multiply A by A⁻¹ and you get the identity: the operation, then its undo, leaves everything as it was. If A⁻¹ exists, you can solve Ax = b in one step: x = A⁻¹b.</p>

**Floor 1 (Concrete):**
<p>The system 2x + 3y = 8, 4x + 5y = 13 has A = [2 3; 4 5]. The inverse of a 2×2 matrix [a b; c d] is (1/(ad−bc)) × [d −b; −c a], provided ad−bc ≠ 0. Here ad−bc = 2×5 − 3×4 = 10 − 12 = −2. So A⁻¹ = (1/−2) × [5 −3; −4 2] = [−2.5 1.5; 2 −1]. Verify: A⁻¹A = [−2.5 1.5; 2 −1] × [2 3; 4 5] = [−5+6, −7.5+7.5; 4−4, 6−5] = [1 0; 0 1] = I. The solution: x = A⁻¹b = [−2.5 1.5; 2 −1] × [8; 13] = [−20+19.5; 16−13] = [−0.5; 3]. Check: 2(−0.5)+3(3)=−1+9=8 ✓, 4(−0.5)+5(3)=−2+15=13 ✓.</p>

**Floor 2 (Definition):**
<p>The <strong>inverse</strong> of a square matrix A is the matrix A⁻¹ such that A⁻¹A = AA⁻¹ = I. A matrix that has an inverse is <strong>invertible</strong> (or non-singular). A matrix without an inverse is <strong>singular</strong>. For a 2×2 matrix, A⁻¹ exists if and only if ad − bc ≠ 0. The quantity ad − bc is the <strong>determinant</strong> — it measures whether A collapses the plane or not. If the determinant is zero, A flattens the plane and cannot be undone.</p>

**Floor 3 (In action):**
<p>The inverse solves Ax = b instantly: multiply both sides on the left by A⁻¹ to get x = A⁻¹b. This is elegant but computationally expensive for large matrices — Gaussian elimination is usually faster. The inverse is most useful conceptually: it tells you that a system has a unique solution when A⁻¹ exists, and no unique solution when it doesn't. The determinant test (det A ≠ 0) is the gatekeeper — if the determinant is zero, the matrix is singular, the rows are not independent, and the system either has no solution or infinitely many.</p>

**Image prompt:** A chalk drawing showing the chain: Ax = b, multiply both sides by A⁻¹, get x = A⁻¹b. A 2×2 inverse formula is shown: (1/(ad−bc)) × [d −b; −c a]. Below: "det A = ad−bc ≠ 0 → inverse exists." Chalk on dark green board. Square 1:1.

---

## Summary

| Placeholder | Title | Ground | Builds on |
|---|---|---|---|
| BB-NEW-70 | A matrix is a ledger, not an equation | g0 | — |
| BB-NEW-71 | Rows, columns, and the shape of a matrix | g0 | BB-NEW-70 |
| BB-NEW-72 | The isolation property | g0 | BB-NEW-70 |
| BB-NEW-73 | Adding matrices: merging two ledgers | g0 | BB-NEW-71 |
| BB-NEW-74 | Scalar multiplication: across-the-board change | g0 | BB-NEW-70 |
| BB-NEW-75 | Matrix multiplication: the row×column rule | g0 | BB-NEW-71, BB-NEW-73 |
| BB-NEW-76 | Why row×column? It comes from equations | g0 | BB-NEW-75 |
| BB-NEW-77 | Writing any linear system as Ax = b | g0 | BB-NEW-76 |
| BB-NEW-78 | Row operations: the three legal moves | g0 | BB-NEW-72, BB-NEW-77 |
| BB-NEW-79 | Row operations as bookkeeping actions | g0 | BB-NEW-78 |
| BB-NEW-80 | Gaussian elimination | g1 | BB-NEW-78, BB-NEW-77 |
| BB-NEW-81 | The identity matrix | g0 | BB-NEW-75 |
| BB-NEW-82 | The inverse matrix | g1 | BB-NEW-81, BB-NEW-77 |

**Thirteen BBs** (not ten — the material earned the extra three). The through-line: a matrix is a ledger where rows and columns are isolated → operations are surgical → equations become Ax = b → row operations tidy the augmented matrix → Gaussian elimination descends to the solution → inverses provide the conceptual capstone. The existing `MATRICES-DRAFT.js` (MX1–MX7) is a different approach (straight algebra, no bookkeeping framing) — this batch is intended to replace or precede it.
