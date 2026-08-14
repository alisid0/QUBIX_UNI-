import bitIntro from '../../../content-drafts/bit-intro-batch-01.json';
import functionBridge from '../../../content-drafts/bridge-functions-computing-08.json';
import codeBatch from '../../../content-drafts/computers-code-batch-09.json';
import hardwareBatch from '../../../content-drafts/computers-hardware-batch-10.json';
import megaBatch from '../../../content-drafts/computers-mega-batch-11.json';
import architectureBatch from '../../../content-drafts/computers-architecture-batch-12.json';
import crossSubject from '../../../content-drafts/cross-subject-expansion-bb1403-1422.json';

const toBoard = (draft, number) => ({
  act: draft.act || 'I', kicker: draft.kicker || `BB ${number}`, title: draft.title,
  tags: draft.tags || { subject: 'computing' },
  layers: (draft.floors || draft.layers || []).map((floor) => ({
    text: floor?.content ?? floor?.text ?? '', img: floor?.img ?? floor?.image ?? null,
    audio: floor?.audio ?? null
  }))
});

const pairs = [];
const addSequence = (numbers, drafts) => {
  if (numbers.length !== drafts.length) throw new Error(`Computing fallback mismatch: ${drafts.length} drafts for ${numbers.length} boards`);
  numbers.forEach((number, index) => pairs.push([number, toBoard(drafts[index], number)]));
};

addSequence([1130,1131,1132,1133,1134,1135,1136,1137,1138], bitIntro.boards || []);
addSequence([1229,1230,1231,1232,1233], functionBridge.boards || []);
addSequence([1234,1235,1236,1237,1238], codeBatch.boards || []);
addSequence([1239,1240,1241,1242,1243], hardwareBatch.boards || []);

const mega = megaBatch.boards || [];
addSequence([1244,1245,1246,1247,1248,1249], mega.slice(0, 6));
addSequence([1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260], mega.slice(6, 17));
addSequence([1261,1262,1263,1264,1265], architectureBatch.boards || []);

const crossByNumber = new Map((crossSubject.boards || []).map((board) => [Number(String(board.kicker || '').match(/\d+/)?.[0]), board]));
for (const number of [1415,1416,1417,1418]) {
  const draft = crossByNumber.get(number);
  if (!draft) throw new Error(`Missing reviewed Computing fallback for BB ${number}`);
  pairs.push([number, toBoard(draft, number)]);
}

export const COMPUTING_DRAFT_BOARDS = Object.fromEntries(pairs);
if (Object.keys(COMPUTING_DRAFT_BOARDS).length !== 50) throw new Error('Computing fallback must contain exactly 50 reviewed boards');
