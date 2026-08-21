import physicsIntro from '../../../content-drafts/physics-intro-batch-01.json';
import mathsPhysics from '../../../content-drafts/maths-physics-batch-03.json';
import physicsChemistry from '../../../content-drafts/physics-chemistry-batch-04.json';
import crossSubject from '../../../content-drafts/cross-subject-expansion-bb1403-1422.json';

const toBoard = (draft, number) => ({
  act: draft.act || 'I',
  kicker: draft.kicker || `BB ${number}`,
  title: draft.title,
  tags: draft.tags || { subject: 'physics' },
  layers: (draft.floors || draft.layers || []).map((floor) => ({
    text: floor?.content ?? floor?.text ?? '',
    img: floor?.img ?? floor?.image ?? null,
    audio: floor?.audio ?? null
  }))
});

const pairs = [];
const addSequence = (numbers, drafts) => {
  if (numbers.length !== drafts.length) {
    throw new Error(`Physics fallback mismatch: ${drafts.length} drafts for ${numbers.length} boards`);
  }
  numbers.forEach((number, index) => pairs.push([number, toBoard(drafts[index], number)]));
};

const intro = physicsIntro.boards || [];
addSequence([1139,1140,1141,1142,1143,1144,1145,1146,1147,1148], intro.slice(0, 10));
addSequence([1149,1150,1151,1152,1153,1154,1155,1156,1157,1158], intro.slice(10, 20));
addSequence([1159,1160], intro.slice(20, 22));

const motion = (mathsPhysics.boards || []).filter((board) => board.tags?.subject === 'physics');
addSequence([1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189], motion);

const laterPhysics = (physicsChemistry.boards || []).filter((board) => board.tags?.subject === 'physics');
addSequence([1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200], laterPhysics);

const energyByNumber = new Map(
  (crossSubject.boards || []).map((board) => [Number(String(board.kicker || '').match(/\d+/)?.[0]), board])
);
for (const number of [1407,1408,1409,1410,1421]) {
  const draft = energyByNumber.get(number);
  if (!draft) throw new Error(`Missing reviewed Physics fallback for BB ${number}`);
  pairs.push([number, toBoard(draft, number)]);
}

export const PHYSICS_DRAFT_BOARDS = Object.fromEntries(pairs);

if (Object.keys(PHYSICS_DRAFT_BOARDS).length !== 54) {
  throw new Error('Physics fallback must contain exactly 54 reviewed boards');
}
