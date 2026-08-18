// Book 1: Functions — source of record.
//
// Draft 1 existed only as a PDF with no origin in this repo. It is now
// authored here, chapter by chapter, and rendered by scripts/build-book.mjs.
// Nothing in the rendered book is written by hand: figures are computed from
// the formulas beside them, and the completion table at the back is counted
// from these files at build time.
//
//   node scripts/build-book.mjs

import ch01 from './ch01-reliable-rule.js';
import ch02 from './ch02-one-answer.js';
import ch03 from './ch03-notation.js';
import ch04 from './ch04-domain-range.js';
import ch05 from './ch05-graphs.js';
import ch06 from './ch06-families.js';
import ch07 from './ch07-transformations.js';
import ch08 from './ch08-composition.js';
import ch09 from './ch09-inverse.js';
import ch10 from './ch10-average-rate.js';
import ch11 from './ch11-limits.js';
import ch12 from './ch12-derivatives.js';
import ch13 from './ch13-integrals.js';

export const meta = {
  series: 'QUBIX UNIVERSITY · FOUNDATIONS SERIES',
  title: 'Calculus From The Ground Up',
  subtitle: 'Book 1: Functions',
  blurb: 'Inputs, outputs, graphs, composition, inverse functions, and the first idea of change.',
  status: 'REFERENCE E-BOOK · DRAFT 2',
  note: 'Authored in-repo and generated. Every practice item is answered in full, and the back of the book counts what is still missing.'
};

export const chapters = [
  ch01, ch02, ch03, ch04, ch05, ch06, ch07,   // Part I: what a function is
  ch08, ch09, ch10,                            // Part I: combining, reversing, measuring change
  ch11, ch12, ch13                             // Part II: the next three books
];
