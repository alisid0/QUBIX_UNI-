import atomOne from '../../../content-drafts/atom-intro-batch-01.json';
import atomTwo from '../../../content-drafts/atom-intro-batch-02.json';
import atomThree from '../../../content-drafts/atom-intro-batch-03.json';
import atomFour from '../../../content-drafts/atom-intro-batch-04.json';
import physicsChemistry from '../../../content-drafts/physics-chemistry-batch-04.json';
import moleBatch from '../../../content-drafts/chemistry-mole-batch-05.json';
import shapesBatch from '../../../content-drafts/chemistry-shapes-batch-06.json';
import crossSubject from '../../../content-drafts/cross-subject-expansion-bb1403-1422.json';

const toBoard = (draft, number) => ({
  act: draft.act || 'I', kicker: draft.kicker || `BB ${number}`, title: draft.title,
  tags: draft.tags || { subject: 'chemistry' },
  layers: (draft.floors || draft.layers || []).map((floor) => ({
    text: floor?.content ?? floor?.text ?? '', img: floor?.img ?? floor?.image ?? null,
    audio: floor?.audio ?? null
  }))
});

const pairs = [];
const addSequence = (numbers, drafts) => {
  if (numbers.length !== drafts.length) throw new Error(`Chemistry fallback mismatch: ${drafts.length} drafts for ${numbers.length} boards`);
  numbers.forEach((number, index) => pairs.push([number, toBoard(drafts[index], number)]));
};

addSequence([1094,1095,1096,1097,1098,1099,1100,1101,1102,1103], atomOne.boards || []);
addSequence([1104], (atomTwo.boards || []).slice(0, 1));
addSequence([1109,1110,1111,1112,1113,1114,1115,1116], (atomThree.boards || []).slice(0, 8));
addSequence([1117,1118,1119,1120], (atomThree.boards || []).slice(8, 12));
addSequence([1121,1122,1123,1124], (atomThree.boards || []).slice(12, 16));
addSequence([1125,1126,1127,1128,1129], atomFour.boards || []);

const biomoleculeBridge = (physicsChemistry.boards || []).filter((board) => board.tags?.subject === 'chemistry');
addSequence([1201,1202,1203,1204,1205,1206], biomoleculeBridge);
addSequence([1207,1208,1209,1210,1211,1212], moleBatch.boards || []);
addSequence([1213,1214,1215,1216,1217,1218], shapesBatch.boards || []);

// The older Mole Concept path shares this reviewed concept with the later,
// more complete sequence. Reuse it rather than leaving the lesson empty.
pairs.push([1066, toBoard((moleBatch.boards || [])[0], 1066)]);

const crossByNumber = new Map((crossSubject.boards || []).map((board) => [Number(String(board.kicker || '').match(/\d+/)?.[0]), board]));
for (const number of [1411,1412,1413,1414,1419,1422]) {
  const draft = crossByNumber.get(number);
  if (!draft) throw new Error(`Missing reviewed Chemistry fallback for BB ${number}`);
  pairs.push([number, toBoard(draft, number)]);
}

export const CHEMISTRY_DRAFT_BOARDS = Object.fromEntries(pairs);
if (Object.keys(CHEMISTRY_DRAFT_BOARDS).length !== 57) throw new Error('Chemistry fallback must contain exactly 57 reviewed boards');
