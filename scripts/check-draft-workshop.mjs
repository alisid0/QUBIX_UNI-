import fs from 'node:fs';
import { buildHandoffPrompt, draftDocument, parseTranscript, safeDraftFilename, selectRecentMessages, validateDraft } from '../src/lib/draft-workshop.js';

let failed = false;
const check = (condition, label) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}`);
  if (!condition) failed = true;
};

const transcript = Array.from({ length: 24 }, (_, index) => `${index % 2 ? 'Assistant' : 'User'}: Message ${index + 1}`).join('\n');
check(parseTranscript(transcript).length === 24, 'speaker-labelled transcript becomes discrete messages');
const recent = selectRecentMessages(transcript, 20);
check(recent.length === 20 && recent[0].text === 'Message 5' && recent.at(-1).text === 'Message 24',
  'the workshop selects exactly the latest twenty messages');
check(parseTranscript('First block\n\nSecond block').length === 2,
  'unlabelled pasted text falls back to paragraph blocks');

const prompt = buildHandoffPrompt({ transcript, target: 'pair', title: 'Events and outcomes', limit: 20 });
check(prompt.includes('Status must be exactly: AI_DRAFT') && prompt.includes('founder alone approves'),
  'the handoff prompt preserves the founder authority boundary');
check(prompt.includes('Message 5') && prompt.includes('Message 24') && !prompt.includes('Message 4\n'),
  'the handoff prompt contains only the selected conversation window');
check(prompt.includes('## Read') && prompt.includes('## Play') && prompt.includes('## Assessment'),
  'a Read / Play handoff requests the complete review structure');

const goodDraft = `${prompt.slice(prompt.indexOf('# Events and outcomes'), prompt.indexOf('SOURCE CONVERSATION'))}\n${'Substantive learner material. '.repeat(20)}\n## Founder review checklist\n- Review scope`;
const validation = validateDraft(goodDraft, 'pair');
check(validation.ready, 'a complete AI_DRAFT becomes ready for founder review');
const conversationalHeadings = goodDraft
  .replace('## Conversation decisions captured', '## Captured decisions')
  .replace('## Assumptions made', '## Assumptions');
check(validateDraft(conversationalHeadings, 'pair').ready,
  'clear equivalent decision and assumption headings are accepted');
check(!validateDraft(goodDraft.replace('Status: AI_DRAFT', 'Status: APPROVED'), 'pair').ready,
  'a draft cannot claim founder approval');

const exported = draftDocument({ draft: goodDraft, title: 'Events and outcomes', target: 'pair', sourceCount: 20 });
check(exported.includes('status: AI_DRAFT') && exported.includes('founder_approval_required: true'),
  'downloaded drafts carry explicit review metadata');
check(!exported.includes('Source conversation appendix'), 'source conversation is excluded from downloads by default');
check(safeDraftFilename('Events & Outcomes') === 'events-outcomes.ai-draft.md', 'draft filenames are safe and recognisable');

const view = fs.readFileSync(new URL('../src/views/QubixBuilder.svelte', import.meta.url), 'utf8');
check(view.includes('sessionStorage') && !view.includes("fetch('/api/tutor'"),
  'the workshop persists only in this browser tab and makes no model request');
check(view.includes('Include the selected conversation as an appendix'),
  'including potentially private source text requires an explicit choice');
check(view.includes('cannot approve or publish'), 'the screen states its authority boundary');

console.log(failed ? '\nDraft Workshop checks failed\n' : '\nQubix Draft Workshop remains local, structured and AI_DRAFT-only\n');
process.exit(failed ? 1 : 0);
