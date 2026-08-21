/** Balanced second-pass Maths coverage: every topic reaches at least 82%. */
const PACKS = {
  three: `1379.1.trig,1379.2.trig,1379.3.trig,1380.1.trig,1380.2.trig,1380.3.trig,1380.4.trig,1381.0.trig,1381.1.trig,1381.3.trig`,
  interactive: `1035.1.coordinate,1035.3.coordinate,1035.4.coordinate,1036.1.coordinate,1036.3.coordinate,1036.4.coordinate,1038.1.coordinate,1039.0.coordinate,1040.2.coordinate,1042.0.coordinate,1042.2.coordinate,1042.4.coordinate,1046.4.coordinate,1047.2.coordinate,1403.2.number-line,1163.1.vector,1163.2.vector,1165.1.vector,1165.2.vector,1166.2.vector,1166.3.vector,1167.3.vector,1168.1.vector,1168.2.vector,1168.3.vector,1169.0.vector,1169.1.vector,1169.2.vector,1170.2.vector,1171.0.vector,1220.0.function,1220.1.function,1221.0.function,1221.1.function,1222.0.function,1222.1.function,1223.1.function,1224.1.function,1268.2.linear,1271.2.linear,1271.3.linear,1272.2.linear,1305.0.matrix,1305.1.matrix,1305.3.matrix,1305.4.matrix,1306.1.matrix,1306.4.matrix,1307.1.matrix,1307.2.matrix,1307.3.matrix,1307.4.matrix,1308.0.matrix,1308.1.matrix,1308.2.matrix,1308.3.matrix,1309.0.matrix,1309.1.matrix,1309.2.matrix,1310.2.matrix,1310.3.matrix,1313.1.exponential,1314.1.exponential,1314.2.exponential,1315.1.exponential,1315.2.exponential,1315.4.exponential,1316.1.exponential,1316.2.exponential,1316.3.exponential,1319.2.exponential,1319.3.exponential,1319.4.exponential,1320.2.exponential,1381.4.trig,1382.1.trig,1388.2.derivative,1388.3.derivative,1390.4.derivative,1425.4.limit`,
  diagram: `1082.1.number-line,1082.3.number-line,1084.1.number-line,1085.2.number-line,1085.3.number-line,1086.2.number-line,1087.2.number-line,1088.0.number-line,1088.1.number-line,1089.3.number-line,1091.0.number-line,1091.1.number-line,1092.1.number-line,1092.2.number-line,1093.2.number-line,1167.0.vector,1167.2.vector,1309.4.matrix,1389.4.derivative,1390.1.derivative,1390.3.derivative`,
  // No Functions math-motion: the looping “sequence restarts” panel was
  // distracting on MATH_FUNCTIONS. Prefer concept-explorer / math-visual there.
  motion: `1039.1.coordinate,1039.2.coordinate,1040.3.coordinate,1041.1.coordinate,1041.2.coordinate,1041.3.coordinate,1042.3.coordinate,1043.2.coordinate,1043.3.coordinate,1044.1.coordinate,1044.3.coordinate,1044.4.coordinate,1045.1.coordinate,1045.2.coordinate,1045.3.coordinate,1084.0.number-line,1085.0.number-line,1088.2.number-line,1088.3.number-line,1088.4.number-line,1089.0.number-line,1089.1.number-line,1090.2.number-line,1090.3.number-line,1164.1.vector,1164.2.vector,1164.3.vector,1170.1.vector,1170.3.vector,1266.0.linear,1266.1.linear,1266.3.linear,1267.1.linear,1267.2.linear,1267.4.linear,1268.0.linear,1268.1.linear,1268.3.linear,1269.1.linear,1269.2.linear,1269.4.linear,1270.1.linear,1270.2.linear,1270.4.linear,1271.4.linear,1272.3.linear,1272.4.linear,1273.1.linear,1273.2.linear,1273.3.linear,1273.4.linear,1313.0.exponential,1313.3.exponential,1313.4.exponential,1314.0.exponential,1314.4.exponential,1315.3.exponential,1316.0.exponential,1317.1.exponential,1317.2.exponential,1317.3.exponential,1318.1.exponential,1318.3.exponential,1318.4.exponential,1382.2.trig,1382.3.trig,1383.0.trig,1383.2.trig,1385.1.derivative,1385.3.derivative,1385.4.derivative,1386.1.derivative,1386.2.derivative,1386.3.derivative,1387.1.derivative,1387.2.derivative,1387.3.derivative,1388.0.derivative,1388.4.derivative,1389.0.derivative,1389.1.derivative,1389.3.derivative,1423.1.limit,1423.2.limit,1423.3.limit,1424.1.limit,1424.2.limit,1424.3.limit,1424.4.limit,1425.1.limit,1425.2.limit,1425.3.limit,1426.0.limit,1426.1.limit,1426.3.limit,1426.4.limit,1427.0.limit,1427.2.limit,1427.3.limit,1427.4.limit,1428.1.limit,1428.3.limit`,
  pixel: `1038.2.coordinate,1038.3.coordinate,1039.4.coordinate,1040.1.coordinate,1044.2.coordinate,1046.1.coordinate,1046.2.coordinate,1046.3.coordinate,1047.1.coordinate,1047.3.coordinate,1078.1.number-line,1079.0.number-line,1079.1.number-line,1080.2.number-line,1081.2.number-line,1083.2.number-line,1084.2.number-line,1084.3.number-line,1086.1.number-line,1086.3.number-line,1087.1.number-line,1089.2.number-line,1089.4.number-line,1090.0.number-line,1090.1.number-line,1090.4.number-line,1090.5.number-line,1092.0.number-line,1093.0.number-line,1093.1.number-line,1403.1.number-line,1161.0.vector,1161.1.vector,1161.3.vector,1161.4.vector,1162.1.vector,1162.2.vector,1162.3.vector,1306.3.matrix,1390.2.derivative`
};

const LABELS = {
  coordinate:'Coordinate laboratory', vector:'Vector laboratory', 'number-line':'Number-line laboratory',
  function:'Function laboratory', linear:'Gradient laboratory', matrix:'Matrix laboratory',
  exponential:'Exponent laboratory', trig:'Angle laboratory', derivative:'Slope microscope', limit:'Limit explorer'
};
const conceptKind = { coordinate:'vector', exponential:'log' };
const diagramKind = { vector:'coordinate', 'number-line':'line' };

export const MATHS_MEDIA_80_EXPANSION = {};
let count = 0;
for (const [mode, packed] of Object.entries(PACKS)) {
  for (const token of packed.split(',')) {
    const [boardText, floorText, kind] = token.split('.');
    const board = Number(boardText); const floor = Number(floorText);
    let media;
    if (mode === 'three') media = { type:'three', spec:{ kind:'unit-circle', title:'Angle, circle and coordinates', theta: 28 + ((board + floor * 13) % 55) } };
    else if (mode === 'interactive') media = { type:'concept-explorer', spec:{ kind:conceptKind[kind] || kind, title:LABELS[kind] } };
    else if (mode === 'diagram') media = { type:'math-visual', spec:{ kind:diagramKind[kind] || kind, variant:kind, title:LABELS[kind] } };
    else if (mode === 'motion') media = { type:'math-motion', spec:{ kind, title:LABELS[kind] } };
    else media = { type:'pixel-math', spec:{ kind, title:LABELS[kind] } };
    (MATHS_MEDIA_80_EXPANSION[board] ||= {})[floor] = media;
    count++;
  }
}
export const MATHS_MEDIA_80_EXPANSION_COUNT = count;
