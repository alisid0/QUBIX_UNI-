# Qubix Draft Workshop

Status: founder authoring tool. It cannot approve or release curriculum.

Public route: `https://qubix.university/builder` (excluded from search).

## Purpose

The workshop turns a conversation from Codex, ChatGPT, Claude or another AI
chat into a controlled Qubix `AI_DRAFT` without making an OpenAI API request.
It is a handoff and validation surface, not a model.

1. The founder pastes a conversation transcript.
2. Qubix detects speaker-labelled messages, or falls back to paragraph blocks.
3. The founder selects the latest 10, 20, 30 or 50 messages, a working title
   and one narrow output type.
4. Qubix prepares a governance-aware prompt locally.
5. The founder carries that prompt to an existing AI chat subscription.
6. The returned draft is pasted back into Qubix and checked for the required
   structure, authority boundary and review checklist.
7. The result can be copied or downloaded as `*.ai-draft.md`.

## Privacy and cost boundary

The transcript, prepared prompt and returned draft are stored in
`sessionStorage`. They stay in the current browser tab, are not synced to
Supabase and are not submitted to `/api/tutor`. Clearing the session removes
them. Closing the browser session also clears them.

The source transcript is excluded from downloaded drafts unless the founder
explicitly selects the appendix option. Pasted content is rendered as text and
is never executed.

No Qubix API credits are used. The external chat may still be governed by its
own subscription, usage limits and data controls.

## Authority boundary

The prompt requires `Status: AI_DRAFT`, separates conversation decisions from
assumptions and refuses to claim `APPROVED` or `RELEASED`. Passing every
workshop check means only “ready for founder review.” Founder review and
deployment remain separate actions.

## Verification

`scripts/check-draft-workshop.mjs` covers transcript parsing, the latest-message
window, prompt structure, draft checks, export metadata, filename safety,
local-only persistence and the no-API boundary. It runs before lint and
therefore in every production build.
