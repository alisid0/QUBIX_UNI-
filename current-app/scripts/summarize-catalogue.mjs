import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('.audit-cache/live-production-bbs.json', 'utf8'));

// Group boards by their first path
const byPath = {};
for (const board of data.boards) {
  const p = board.paths[0];
  if (!p) continue;
  const key = p.pathId;
  if (!byPath[key]) byPath[key] = { name: p.pathName, subject: p.subject, boards: [] };
  byPath[key].boards.push(board);
}

const SUBJECT_ORDER = {
  physics: ['PHYS_001','PHY_ENERGY_MOMENTUM','PHY_SI_SCALE','PHY_MOTION_FOUNDATIONS','PHY_MEASUREMENT_LIMITS','PHY_UNITS','PHY_SCALE','PHY_INTRO','PHY_FORCES','PHY_ELECTRICITY','PHY_THERMO','PHY_OPTICS'],
  maths: ['LINE_001','MATH_COORD_MAPS','MATH_COORD','MATH_FUNCTIONS','MATH_EXP_LOGS','MATH_MATRICES','MATH_LINEAR_GRAPHS','MATH_TRIG_ADV','MATH_LIMITS','MATH_DIFF'],
  chemistry: ['ATOM_001','CHEM_NUCLEUS_ISOTOPES','CHEM_BONDING_TYPES','CHEM_MOLE_COUNTING','CHEM_BIOMOLECULES','CHEM_ATOMIC','CHEM_BONDING','CHEM_MOLE','CHEM_ARCH','CHEM_STRUCTURE_REACTIONS','CHEM_QUANT'],
  computing: ['BIT_001','COMP_CODE_COMMAND','COMP_HARDWARE','COMP_NETWORKS_SECURITY','COMP_SYSTEM_DESIGN','COMP_AI_ERA','COMP_AI_BEHIND']
};

const SUBJECT_LABELS = { physics: 'Physics', maths: 'Mathematics', chemistry: 'Chemistry', computing: 'Computer Science' };

let out = '# Qubix — Full Lesson Catalogue\n';
out += `> Exported: ${data.fetchedAt}\n`;
out += `> Total: ${data.boardCount} lessons / ${data.floorCount} floors\n\n`;

for (const [subj, pathIds] of Object.entries(SUBJECT_ORDER)) {
  out += `## ${SUBJECT_LABELS[subj]} — ${data.subjects[subj].boards} lessons / ${data.subjects[subj].floors} floors\n\n`;
  for (const pid of pathIds) {
    const entry = byPath[pid];
    if (!entry) continue;
    out += `### ${entry.name} (${pid}) — ${entry.boards.length} lessons\n\n`;
    out += `| # | ID | Title | Floors | Source |\n`;
    out += `|---|-----|-------|--------|--------|\n`;
    for (const b of entry.boards) {
      const floors = b.layers ? b.layers.filter(l => l && (l.text || l.img)).length : 0;
      out += `| ${b.id} | ${b.id} | ${b.title} | ${floors} | ${b.source === 'production-supabase' ? 'Supabase' : 'bundle'} |\n`;
    }
    out += '\n';
  }
}

writeFileSync('.audit-cache/full-catalogue.md', out);
console.log('Written to .audit-cache/full-catalogue.md');
console.log(`Total lessons listed: ${data.boards.length}`);
