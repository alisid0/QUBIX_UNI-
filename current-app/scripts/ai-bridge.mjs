/**
 * AI bridge: sends a markdown problem file to DeepSeek and writes the response.
 *
 * Usage:
 *   node scripts/ai-bridge.mjs                          # sends scripts/ask.md
 *   node scripts/ai-bridge.mjs --ask scripts/ask.md     # explicit input
 *   node scripts/ai-bridge.mjs --model deepseek-coder   # override model
 *
 * Reads DEEPSEEK_API_KEY from .env.local.
 * Writes response to scripts/answer.md (overwrites).
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// ── load .env.local ──────────────────────────────────────────────────────────
const envPath = join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) {
  console.error('❌  DEEPSEEK_API_KEY not found in .env.local');
  console.error('    Get a free key at https://platform.deepseek.com');
  process.exit(1);
}

// ── args ─────────────────────────────────────────────────────────────────────
const args     = process.argv.slice(2);
const askIdx   = args.indexOf('--ask');
const modelIdx = args.indexOf('--model');

const ASK_FILE  = askIdx  >= 0 ? args[askIdx  + 1] : join(process.cwd(), 'scripts/ask.md');
const ANS_FILE  = join(process.cwd(), 'scripts/answer.md');
const MODEL     = modelIdx >= 0 ? args[modelIdx + 1] : 'deepseek-coder';

if (!existsSync(ASK_FILE)) {
  console.error(`❌  Ask file not found: ${ASK_FILE}`);
  process.exit(1);
}

const problem = readFileSync(ASK_FILE, 'utf8');

// ── call DeepSeek ─────────────────────────────────────────────────────────────
console.log(`🤖  Sending to DeepSeek (${MODEL})...`);
console.log(`    Problem: ${ASK_FILE}`);

const body = JSON.stringify({
  model: MODEL,
  messages: [
    {
      role: 'system',
      content: [
        'You are an expert Node.js and Playwright automation engineer.',
        'The user will describe a specific Playwright automation problem.',
        'Return ONLY the fixed JavaScript function(s) as a single fenced code block.',
        'No explanation before or after the fence. No commentary inside the fence.',
        'The code must be a drop-in replacement for the function(s) described.',
      ].join(' '),
    },
    {
      role: 'user',
      content: problem,
    },
  ],
  temperature: 0.1,
  max_tokens: 4096,
});

const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
  method:  'POST',
  headers: {
    'Content-Type':  'application/json',
    Authorization:   `Bearer ${API_KEY}`,
  },
  body,
});

if (!res.ok) {
  const text = await res.text();
  console.error(`❌  DeepSeek API error ${res.status}: ${text.slice(0, 300)}`);
  process.exit(1);
}

const data   = await res.json();
const answer = data.choices?.[0]?.message?.content ?? '';

// ── write answer ──────────────────────────────────────────────────────────────
const output = [
  `# DeepSeek Answer`,
  ``,
  `Model: ${MODEL}`,
  `Tokens: ${data.usage?.total_tokens ?? '?'}`,
  ``,
  `---`,
  ``,
  answer,
].join('\n');

writeFileSync(ANS_FILE, output);

console.log(`\n✅  Answer written to: scripts/answer.md`);
console.log(`    Tokens used: ${data.usage?.total_tokens ?? '?'}`);
console.log(`\n--- Answer preview ---`);
console.log(answer.slice(0, 600));
if (answer.length > 600) console.log(`\n... (${answer.length - 600} more chars in answer.md)`);
