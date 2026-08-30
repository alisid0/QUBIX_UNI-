// Write the founder's approval of chapter one, digest-locked.
//
// Run once, on the founder's instruction. It records what was approved, which
// review decided it, and a sha256 of every file the approval covers, so a later
// silent edit to approved learner-facing text is detectable rather than
// invisible. docs/REVIEW-PROTOCOL.md: any change after this returns the
// sessions to AMENDMENTS_REQUIRED until the founder reviews them again.
//
//   node scripts/record-chapter-one-approval.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const FILES = [
  'src/lib/content/shared-foundations-part-one.js',
  'src/lib/content/shared-foundations-part-three.js'
];

// LF-normalised, matching the existing approvals: the repo checks out CRLF on
// Windows, so a raw hash would differ per machine and per checkout.
const digest = file => createHash('sha256')
  .update(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n'), 'utf8')
  .digest('hex');

const files = {};
for (const f of FILES) files[f] = digest(f);

const record = {
  'CHAPTER-ONE-2026-08-30': {
    approvedBy: 'founder',
    approvedOn: '2026-08-30',
    source: 'Editorial review ledger, reviews 001 to 006, drafts A to F. Founder and external reviewer.',
    scope: 'Learner-facing wording of chapter one, sessions 01 to 05, and the data-type opening moved into ch03.02 by review 003. Sequence placement, session length under the Phase One design, and public release of later chapters are excluded.',
    applied: {
      '001': 'ch01.03 opening replaced. Twelve visible checkout rows with repeating receipt numbers, before any calculation.',
      '002': 'ch01.01 rebuilt on one three-item purchase. Food to goods, the second heading restored, the riddle about changing the past removed, and the unrelated systems no longer implied to owe each other information.',
      '003': 'ch01.02 split. Rows, columns, observations and variables stay; data types leave for ch03.02, which now opens on the barcode.',
      '004': 'ch01.03 body rebuilt around grain and one purchase in two tables. COUNT(*), the join section, the three-table example, the rehearsal and the attendance workbook removed as unprepared.',
      '005': 'ch01.04 rebuilt on a grocery inventory at noon. Zero against NULL, with not-applicable named as a third meaning. Units left to ch02.01.',
      '006': 'ch01.05 rebuilt as From a request to an analysis. Neutral request, data analysis defined before its four-part brief, checkout counters rather than tills, and trial design, success thresholds and monitoring deferred.'
    },
    conflictResolved: 'Reviews 001 and 004 both rebuilt ch01.03 incompatibly. 001 is scoped to the opening and matches the frozen Phase One title, so its title and opening stand with the body and removals from 004.',
    openAfterApproval: [
      'ch01.05 is approved as a session while phase-one.js still retires it. One of the two is now wrong.',
      'ch01.02 teaches rows and columns but still ends on the classify-data mission, which is about data types.',
      'Draft D asked for two purchase illustrations and draft F for a four-card brief illustration. Neither exists; the existing row-grain figure carries ch01.03 for now.',
      'The heading in ch01.04 keeps its em dash at the founder\'s explicit instruction, against the standing no-em-dash rule.'
    ],
    files
  }
};

const path = new URL('../curriculum/APPROVED-CHAPTER-ONE.json', import.meta.url);
writeFileSync(path, JSON.stringify(record, null, 2) + '\n');
console.log('  written curriculum/APPROVED-CHAPTER-ONE.json');
for (const [f, d] of Object.entries(files)) console.log(`  ${d.slice(0, 12)}…  ${f}`);
