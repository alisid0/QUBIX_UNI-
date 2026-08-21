/**
 * Strata — Paths Manifest (launch curriculum)
 * Subject → topic → ordered board numbers.
 *
 * Launch content is the audited set: 78 reviewed boards, ingested into
 * Supabase as dynamic cards at sort_order 1000-1077 (see
 * scripts/ingest-final-review.mjs, source 1945_BBs/_PUBLISHABLE.md).
 * Topic groupings need re-audit after 2026-06-28 ingest (3 new boards
 * appended: molecule, bond angles, DNA/proteins shifted numbering).
 */
export const PATHS = {
  // ── Physics ──
  // ── Physics (starting point) ──
  PHYS_001: { subject: 'physics', name: 'Physics', icon: 'physics',
    cards: [1139,1140,1141,1142,1143,1144,1145,1146,1147,1148], quizUrls: [] },
  PHY_ENERGY_MOMENTUM: { subject: 'physics', name: 'Energy and momentum', icon: 'physics',
    cards: [1407,1408,1409,1410,1421], quizUrls: [] },
  PHY_SI_SCALE: { subject: 'physics', name: 'SI units & scale', icon: 'physics',
    cards: [1149,1150,1151,1152,1153,1154,1155,1156,1157,1158], quizUrls: [] },
  PHY_MOTION_FOUNDATIONS: { subject: 'physics', name: 'Motion foundations', icon: 'physics',
    cards: [1159,1160,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192], quizUrls: [] },
  PHY_MEASUREMENT_LIMITS: { subject: 'physics', name: 'Measurement limits', icon: 'physics',
    cards: [1193,1194,1195,1196,1197,1198,1199,1200], quizUrls: [] },

  PHY_UNITS: { subject: 'physics', name: 'Units & dimensions', icon: 'physics',
    cards: [1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012], quizUrls: ['tier0'] },
  PHY_SCALE: { subject: 'physics', name: 'Scale, estimation & errors', icon: 'physics',
    cards: [1013,1014,1015,1016,1017,1018], quizUrls: [] },
  PHY_INTRO: { subject: 'physics', name: 'Foundations & frontiers', icon: 'physics',
    cards: [1019,1020,1021], quizUrls: [] },
  PHY_FORCES: { subject: 'physics', name: "Forces & Newton's laws", icon: 'physics',
    cards: [1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1037], quizUrls: ['tier0'] },
  PHY_ELECTRICITY: { subject: 'physics', name: 'Electricity & circuits', icon: 'physics',
    cards: [1323,1324,1325,1326,1327,1328,1329,1330,1331,1332], quizUrls: [] },
  PHY_THERMO: { subject: 'physics', name: 'Thermodynamics & heat', icon: 'physics',
    cards: [1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357], quizUrls: ['tier0'] },
  PHY_OPTICS: { subject: 'physics', name: 'Optics', icon: 'physics',
    cards: [1391,1392,1393,1394,1395,1396], quizUrls: [] },

  // ── The Line (starting point) ──
  LINE_001: { subject: 'maths', name: 'The Line', icon: 'maths',
    cards: [1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1403,1404,1405,1406,1420], quizUrls: [] },
  MATH_COORD_MAPS: { subject: 'maths', name: 'Coordinate maps', icon: 'maths',
    cards: [1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173], quizUrls: [] },
  MATH_COORD: { subject: 'maths', name: 'Coordinate geometry', icon: 'maths',
    cards: [1035,1036,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050], quizUrls: ['tier0'] },
  MATH_FUNCTIONS: { subject: 'maths', name: 'Functions', icon: 'maths',
    cards: [1219,1220,1221,1222,1223,1224,1225,1226,1227,1228], quizUrls: [] },
  MATH_EXP_LOGS: { subject: 'maths', name: 'Exponents & logarithms', icon: 'maths',
    cards: [1313,1314,1315,1316,1317,1318,1319,1320,1321,1322], quizUrls: [] },
  MATH_MATRICES: { subject: 'maths', name: 'Matrices', icon: 'maths',
    cards: [1305,1306,1307,1308,1309,1310,1311,1312], quizUrls: [] },
  MATH_LINEAR_GRAPHS: { subject: 'maths', name: 'Lines & gradients', icon: 'maths',
    cards: [1266,1267,1268,1269,1270,1271,1272,1273,1274,1275], quizUrls: [] },
  MATH_TRIG_ADV: { subject: 'maths', name: 'Trigonometry', icon: 'maths',
    cards: [1379,1380,1381,1382,1383,1384], quizUrls: [] },
  MATH_LIMITS: { subject: 'maths', name: 'Limits', icon: 'maths',
    cards: [1423,1424,1425,1426,1427,1428,1429,1430], quizUrls: [] },
  MATH_DIFF: { subject: 'maths', name: 'Differentiation', icon: 'maths',
    cards: [1385,1386,1387,1388,1389,1390,1431,1432], quizUrls: [] },

  // ── The Atom (starting point) ──
  // Phase 1: What is an atom? (1094-1104)
  // Phase 2: The nucleus & isotopes (1109-1116)
  // Phase 3: Bonding types (1117-1120)
  // Phase 4: The mole (1121-1124)
  // Phase 5: Molecular architecture (existing 1068-1077, curated)
  ATOM_001: { subject: 'chemistry', name: 'The Atom', icon: 'chemistry',
    cards: [1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1411,1412,1413,1414,1419,1422], quizUrls: ['tier0'] },
  CHEM_NUCLEUS_ISOTOPES: { subject: 'chemistry', name: 'Nucleus & isotopes', icon: 'chemistry',
    cards: [1109,1110,1111,1112,1113,1114,1115,1116], quizUrls: [] },
  CHEM_BONDING_TYPES: { subject: 'chemistry', name: 'Bonding types', icon: 'chemistry',
    cards: [1117,1118,1119,1120], quizUrls: [] },
  CHEM_MOLE_COUNTING: { subject: 'chemistry', name: 'Counting atoms', icon: 'chemistry',
    cards: [1121,1122,1123,1124,1125,1126,1127,1128,1129], quizUrls: [] },
  CHEM_BIOMOLECULES: { subject: 'chemistry', name: 'Biomolecules', icon: 'chemistry',
    cards: [1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218], quizUrls: [] },

  // ── The Bit (starting point) ──
  BIT_001: { subject: 'computing', name: 'The Bit', icon: 'computing',
    cards: [1130,1131,1132,1133,1134,1135,1136,1137,1138,1229,1230,1231,1232,1233,1415,1416], quizUrls: [] },
  COMP_CODE_COMMAND: { subject: 'computing', name: 'Code & command line', icon: 'computing',
    cards: [1234,1235,1236,1237,1238,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304], quizUrls: [] },
  COMP_HARDWARE: { subject: 'computing', name: 'Hardware & memory', icon: 'computing',
    cards: [1239,1240,1241,1242,1243,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260], quizUrls: [] },
  COMP_NETWORKS_SECURITY: { subject: 'computing', name: 'Machines talk', icon: 'computing',
    cards: [1244,1245,1246,1247,1248,1249,1261,1262,1263,1264,1265,1417,1418], quizUrls: [] },
  COMP_SYSTEM_DESIGN: { subject: 'computing', name: 'System design basics', icon: 'computing',
    cards: [1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288], quizUrls: [] },
  COMP_AI_ERA: { subject: 'computing', name: 'AI-era computing', icon: 'computing',
    cards: [1358,1359,1360,1361,1362,1363,1364,1365,1366,1367,1368,1369,1370,1371,1372,1373,1374,1375,1376,1377], quizUrls: [] },
  COMP_AI_BEHIND: { subject: 'computing', name: 'AI Behind the Curtain', icon: 'computing',
    cards: [1378], quizUrls: [] },

  CHEM_ATOMIC: { subject: 'chemistry', name: 'Atomic structure', icon: 'chemistry',
    cards: [1051,1052,1053,1054,1055,1056,1057,1058,1059,1060], quizUrls: ['tier0'] },
  CHEM_BONDING: { subject: 'chemistry', name: 'Chemical bonding', icon: 'chemistry',
    cards: [1061,1062,1063,1064,1065], quizUrls: ['tier0'] },
  CHEM_MOLE: { subject: 'chemistry', name: 'Reactions & the mole', icon: 'chemistry',
    cards: [1066,1067,1068,1069], quizUrls: ['tier0'] },
  CHEM_ARCH: { subject: 'chemistry', name: 'Molecular architecture', icon: 'chemistry',
    cards: [1070,1071,1072,1073,1074,1075,1076,1077], quizUrls: [] },
  CHEM_STRUCTURE_REACTIONS: { subject: 'chemistry', name: 'Structure & reactions', icon: 'chemistry',
    cards: [1333,1334,1335,1336,1337,1338,1339,1340,1341,1342], quizUrls: [] },
  CHEM_QUANT: { subject: 'chemistry', name: 'Quantitative chemistry', icon: 'chemistry',
    cards: [1397,1398,1399,1400,1401,1402], quizUrls: [] }
};

/** Grouped by subject for the subjects overview (display order). */
export const SUBJECT_PATHS = {
  physics: ['PHYS_001', 'PHY_ENERGY_MOMENTUM', 'PHY_SI_SCALE', 'PHY_UNITS', 'PHY_SCALE', 'PHY_MEASUREMENT_LIMITS', 'PHY_INTRO', 'PHY_MOTION_FOUNDATIONS', 'PHY_FORCES', 'PHY_ELECTRICITY', 'PHY_THERMO', 'PHY_OPTICS'],
  maths: ['LINE_001', 'MATH_COORD_MAPS', 'MATH_COORD', 'MATH_FUNCTIONS', 'MATH_LINEAR_GRAPHS', 'MATH_EXP_LOGS', 'MATH_MATRICES', 'MATH_TRIG_ADV', 'MATH_LIMITS', 'MATH_DIFF'],
  chemistry: ['ATOM_001', 'CHEM_NUCLEUS_ISOTOPES', 'CHEM_BONDING_TYPES', 'CHEM_MOLE_COUNTING', 'CHEM_BIOMOLECULES', 'CHEM_ATOMIC', 'CHEM_BONDING', 'CHEM_MOLE', 'CHEM_ARCH', 'CHEM_STRUCTURE_REACTIONS', 'CHEM_QUANT'],
  computing: ['BIT_001', 'COMP_CODE_COMMAND', 'COMP_HARDWARE', 'COMP_NETWORKS_SECURITY', 'COMP_SYSTEM_DESIGN', 'COMP_AI_ERA', 'COMP_AI_BEHIND']
};

export const SUBJECT_LABELS = {
  physics: 'Physics',
  maths: 'Mathematics',
  chemistry: 'Chemistry',
  computing: 'Computer Science'
};

export const SUBJECT_ICONS = {
  physics: 'physics',
  maths: 'maths',
  chemistry: 'chemistry',
  computing: 'computing'
};

/** Future topics per gateway — shown greyed with a "Soon" chip on the Path tab.
 *  Names only, never a board count (no empty "0/N" promises). */
export const ROADMAP = {
  line: ['Quadratics & polynomials', 'Probability', 'Statistics'],
  atom: ['Periodic table & periodicity', 'Organic basics', 'Biomolecules'],
  bit: ['Operating systems', 'Databases & SQL', 'AI agents'],
  unit: ['1D Kinematics', 'Work, energy & power', 'Magnetism & induction']
};

/** Four starting-point gateways — each groups related topics into a learning path. */
export const PATH_GROUPS = {
  line: {
    name: 'Mathematics',
    subject: 'maths',
    paths: ['LINE_001', 'MATH_COORD_MAPS', 'MATH_COORD', 'MATH_FUNCTIONS', 'MATH_LINEAR_GRAPHS', 'MATH_EXP_LOGS', 'MATH_MATRICES', 'MATH_TRIG_ADV', 'MATH_LIMITS', 'MATH_DIFF'],
    firstTopic: 'LINE_001'
  },
  bit: {
    name: 'Computer Science',
    subject: 'computing',
    paths: ['BIT_001', 'COMP_CODE_COMMAND', 'COMP_HARDWARE', 'COMP_NETWORKS_SECURITY', 'COMP_SYSTEM_DESIGN', 'COMP_AI_ERA', 'COMP_AI_BEHIND'],
    firstTopic: 'BIT_001'
  },
  atom: {
    name: 'Chemistry',
    subject: 'chemistry',
    paths: ['ATOM_001', 'CHEM_NUCLEUS_ISOTOPES', 'CHEM_BONDING_TYPES', 'CHEM_MOLE_COUNTING', 'CHEM_BIOMOLECULES', 'CHEM_ATOMIC', 'CHEM_BONDING', 'CHEM_MOLE', 'CHEM_ARCH', 'CHEM_STRUCTURE_REACTIONS', 'CHEM_QUANT'],
    firstTopic: 'ATOM_001'
  },
  unit: {
    name: 'Physics',
    subject: 'physics',
    paths: ['PHYS_001', 'PHY_ENERGY_MOMENTUM', 'PHY_SI_SCALE', 'PHY_UNITS', 'PHY_SCALE', 'PHY_MEASUREMENT_LIMITS', 'PHY_INTRO', 'PHY_MOTION_FOUNDATIONS', 'PHY_FORCES', 'PHY_ELECTRICITY', 'PHY_THERMO', 'PHY_OPTICS'],
    firstTopic: 'PHYS_001'
  }
};

/** Get paths that contain a given board number */
export function pathsForCard(cardNumber) {
  const ids = [];
  for (const id in PATHS) {
    if (PATHS[id].cards.includes(cardNumber)) ids.push(id);
  }
  return ids;
}

/** Total number of distinct boards in the launch curriculum (derived, not hardcoded). */
export function totalBoards() {
  const set = new Set();
  for (const id in PATHS) for (const n of PATHS[id].cards) set.add(n);
  return set.size;
}
