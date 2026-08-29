export const MATRIX_BOARDS = {
  1305: {
    act: 'I',
    kicker: 'Matrices 1.0',
    title: 'A matrix is a spreadsheet without the app',
    tags: { subject: 'maths', topic: 'matrices', concept: 'matrix-as-grid', ground: 'g0' },
    layers: [
      { text: '<p>A matrix is a rectangular grid of numbers. It looks simple because it is simple at first: rows go across, columns go down, and each box holds one value.</p>' },
      { text: '<p>Think of a spreadsheet with the labels stripped away. The cell in row 2, column 3 has its own address. Change that cell, and the rest of the grid does not automatically change with it.</p>' },
      { text: '<p>This is the first important idea: a matrix stores many numbers inside one object. It is not one equation. It is a structured table.</p>' },
      { text: '<p>That structure is why matrices are useful. Once numbers sit in fixed rows and columns, a computer can read, copy, scan, and transform them in a reliable order.</p>' }
    ]
  },
  1306: {
    act: 'I',
    kicker: 'Matrices 1.1',
    title: 'Rows and columns are the address system',
    tags: { subject: 'maths', topic: 'matrices', concept: 'rows-columns-entry', ground: 'g0' },
    layers: [
      { text: '<p>Every entry in a matrix has an address. The address is written by row first, then column. Row 3, column 2 means: go to the third horizontal line, then the second vertical position.</p>' },
      { text: '<p>This is like a spreadsheet cell, except mathematicians usually write the position as a small pair of indices. The entry a<sub>3,2</sub> means the number in row 3 and column 2.</p>' },
      { text: '<p>The order matters. Row 2, column 3 and row 3, column 2 can hold completely different numbers. Swapping the address points to a different box.</p>' },
      { text: '<p>Once this address system is clear, matrices stop looking like a block of symbols. They become organised data.</p>' }
    ]
  },
  1307: {
    act: 'I',
    kicker: 'Matrices 1.2',
    title: 'The shape of a matrix matters',
    tags: { subject: 'maths', topic: 'matrices', concept: 'matrix-dimensions', ground: 'g0' },
    layers: [
      { text: '<p>A matrix is described by its shape: rows by columns. A 2 by 3 matrix has 2 rows and 3 columns. A 3 by 2 matrix has 3 rows and 2 columns.</p>' },
      { text: '<p>Those two shapes are not the same. They may both contain six numbers, but the numbers are arranged differently, so the matrix behaves differently.</p>' },
      { text: '<p>This is like a spreadsheet range. A block that is 2 rows tall and 3 columns wide is not the same layout as one that is 3 rows tall and 2 columns wide.</p>' },
      { text: '<p>Matrix dimensions are not decoration. They tell us what operations are legal later on.</p>' }
    ]
  },
  1308: {
    act: 'I',
    kicker: 'Matrices 1.3',
    title: 'Adding matrices means matching cells',
    tags: { subject: 'maths', topic: 'matrices', concept: 'matrix-addition', ground: 'g0' },
    layers: [
      { text: '<p>To add two matrices, their shapes must match. Same rows, same columns. Then each cell adds to the cell in the same position.</p>' },
      { text: '<p>If one warehouse table says 3 boxes of item A and another says 5 boxes of item A, the combined table has 8 boxes in that same cell.</p>' },
      { text: '<p>Nothing mysterious happens across the grid. Row 1 column 1 adds to row 1 column 1. Row 2 column 3 adds to row 2 column 3.</p>' },
      { text: '<p>If the shapes do not match, there is no clean cell-by-cell pairing. The operation stops making sense.</p>' }
    ]
  },
  1309: {
    act: 'I',
    kicker: 'Matrices 1.4',
    title: 'A matrix can hold a picture',
    tags: { subject: 'maths', topic: 'matrices', concept: 'image-as-matrix', ground: 'g0' },
    layers: [
      { text: '<p>A black-and-white digital image can be treated like a matrix. Each cell stores the brightness of one tiny square, called a pixel.</p>' },
      { text: '<p>A 0 might mean black. A 255 might mean white. Numbers in between create shades of grey. The whole image is just a grid of brightness values.</p>' },
      { text: '<p>This is where the spreadsheet idea becomes powerful. The matrix is not only storing homework numbers. It can store an image, a map, a sound sample, or training data.</p>' },
      { text: '<p>Modern computing uses matrices because so much of the world can be converted into grids of numbers.</p>' }
    ]
  },
  1310: {
    act: 'I',
    kicker: 'Matrices 1.5',
    title: 'A matrix can also be a machine',
    tags: { subject: 'maths', topic: 'matrices', concept: 'matrix-as-transformation', ground: 'g1' },
    layers: [
      { text: '<p>At first, a matrix looks like storage. But a matrix can also act like a machine. Give it a point, and it can move, stretch, flip, or rotate that point.</p>' },
      { text: '<p>For example, the matrix [2 0; 0 1] doubles the x-coordinate and leaves the y-coordinate alone. The point (3, 4) becomes (6, 4).</p>' },
      { text: '<p>This is the second big idea: a matrix can describe an action. The numbers in the grid become instructions.</p>' },
      { text: '<p>That is why matrices appear in games, animation, robotics, physics, machine learning, and computer graphics. They are compact instructions for changing space.</p>' }
    ]
  },
  1311: {
    act: 'I',
    kicker: 'Matrices 1.6',
    title: 'The identity matrix does nothing',
    tags: { subject: 'maths', topic: 'matrices', concept: 'identity-matrix', ground: 'g1' },
    layers: [
      { text: '<p>Some machines change things. One special matrix is the do-nothing machine. It is called the identity matrix.</p>' },
      { text: '<p>In two dimensions, the identity matrix is [1 0; 0 1]. It sends (x, y) back to (x, y). Nothing moves. Nothing stretches. Nothing flips.</p>' },
      { text: '<p>It plays the same role as multiplying by 1. The object passes through unchanged.</p>' },
      { text: '<p>This matters because once matrices become actions, we also need a clear idea of no action at all. The identity matrix is that baseline.</p>' }
    ]
  },
  1312: {
    act: 'I',
    kicker: 'Matrices 1.7',
    title: 'Rotation is a matrix too',
    tags: { subject: 'maths', topic: 'matrices', concept: 'rotation-matrix', ground: 'g1' },
    layers: [
      { text: '<p>A rotation matrix turns points around the origin. It does not need to draw a circle; it uses four numbers to encode the rotation.</p>' },
      { text: '<p>A 90 degree rotation sends the point (1, 0) to (0, 1). The matrix [0 -1; 1 0] performs that turn.</p>' },
      { text: '<p>This is where trigonometry and matrices meet. Sine and cosine describe points on a circle, and the matrix uses them to rotate every point consistently.</p>' },
      { text: '<p>So the spreadsheet idea was only the entrance. A matrix begins as a grid, then becomes a language for transforming space.</p>' }
    ]
  }
};
