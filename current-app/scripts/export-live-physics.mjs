import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase env');
  process.exit(1);
}

const topics = [
  { id: 'PHYS_001', name: 'Physics', cards: [1139,1140,1141,1142,1143,1144,1145,1146,1147,1148] },
  { id: 'PHY_ENERGY_MOMENTUM', name: 'Energy and momentum', cards: [1407,1408,1409,1410,1421] },
  { id: 'PHY_SI_SCALE', name: 'SI units & scale', cards: [1149,1150,1151,1152,1153,1154,1155,1156,1157,1158] },
  { id: 'PHY_MOTION_FOUNDATIONS', name: 'Motion foundations', cards: [1159,1160,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192] },
  { id: 'PHY_MEASUREMENT_LIMITS', name: 'Measurement limits', cards: [1193,1194,1195,1196,1197,1198,1199,1200] },
  { id: 'PHY_UNITS', name: 'Units & dimensions', cards: [1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012] },
  { id: 'PHY_SCALE', name: 'Scale, estimation & errors', cards: [1013,1014,1015,1016,1017,1018] },
  { id: 'PHY_INTRO', name: 'Foundations & frontiers', cards: [1019,1020,1021] },
  { id: 'PHY_FORCES', name: "Forces & Newton's laws", cards: [1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1037] },
  { id: 'PHY_ELECTRICITY', name: 'Electricity & circuits', cards: [1323,1324,1325,1326,1327,1328,1329,1330,1331,1332] },
  { id: 'PHY_THERMO', name: 'Thermodynamics & heat', cards: [1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357] },
  { id: 'PHY_OPTICS', name: 'Optics', cards: [1391,1392,1393,1394,1395,1396] }
];

const allNumbers = [...new Set(topics.flatMap((topic) => topic.cards))].sort((a, b) => a - b);
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
const { data, error } = await supabase
  .from('cards')
  .select('sort_order,kicker,title,layers,tags')
  .in('sort_order', allNumbers)
  .order('sort_order', { ascending: true });

if (error) {
  console.error(error.message);
  process.exit(1);
}

const byNumber = new Map(data.map((card) => [card.sort_order, card]));

function layerText(layer) {
  if (layer == null) return '';
  if (typeof layer === 'string') return layer.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (typeof layer.text === 'string') return layer.text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return JSON.stringify(layer);
}

function wordCount(text) {
  return (text.match(/\b[\w'-]+\b/g) || []).length;
}

let markdown = '# Live Physics BB Floor Review\n\n';
markdown += `Topics: ${topics.length}\n\n`;
markdown += `Boards referenced: ${allNumbers.length}\n\n`;
markdown += '---\n\n';

for (const topic of topics) {
  markdown += `## ${topic.name} (${topic.id})\n\n`;
  markdown += `Boards: ${topic.cards.length}\n\n`;
  topic.cards.forEach((number, index) => {
    const card = byNumber.get(number);
    if (!card) {
      markdown += `### ${index + 1}. BB ${number} - MISSING\n\n`;
      return;
    }
    markdown += `### ${index + 1}. BB ${number} - ${card.title}\n\n`;
    const layers = Array.isArray(card.layers) ? card.layers : [];
    markdown += `Source: Supabase | Floors: ${layers.length}\n\n`;
    layers.forEach((layer, floorIndex) => {
      const text = layerText(layer);
      const flags = [];
      if (!text) flags.push('EMPTY');
      if (text && wordCount(text) < 20) flags.push(`SHORT:${wordCount(text)}`);
      if (/\b(you|your|we|let us|let's|imagine|notice|try)\b/i.test(text)) flags.push('DIRECT-VOICE');
      if (/[ÎÏâ�]/.test(text)) flags.push('BROKEN-ENCODING');
      markdown += `**Floor ${floorIndex + 1}:** ${text}\n`;
      if (flags.length) markdown += `Flags: ${flags.join(', ')}\n`;
      markdown += '\n';
    });
  });
  markdown += '---\n\n';
}

const output = 'C:/Users/ali10/Documents/Codex/2026-07-07/was/outputs/live-physics-bb-floor-review.md';
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, markdown);

console.log(`Exported ${data.length} cards to ${output}`);
