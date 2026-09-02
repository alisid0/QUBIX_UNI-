# Qubix AI tutors

Status: implementation architecture. This document does not approve or release
curriculum.

Qubix has two deliberately separate AI experiences backed by the same
server-only endpoint.

## Ask Qubix · learner tutor

`Ask Qubix` remains mounted in the existing lesson-aware assistant. Prepared
explanations, hints, quizzes and reasoning checks still run locally. An
open-ended learner question is sent to `/api/tutor` with the current lesson
context and up to four passages retrieved from the local Qubix index.

The server applies a data-science scope gate before calling a model. It tells
the model to use the supplied Qubix evidence, cite it, refuse unrelated work and
avoid answering a scored mission for the learner. If the API or model is not
available, the browser returns to the existing deterministic Qubix response and
retrieval cards.

## Qubix Builder · founder copilot

`/builder` is a production route with a server-verified access key. It supports
curriculum audits, Read/Play framing, prerequisite checks, learning-design
critique and approval preparation. Its standing instruction states that only
the founder may mark curriculum `APPROVED` or `RELEASED`.

The access key is entered by the founder and kept in `sessionStorage`, so it is
removed when the browser tab session ends. It is never placed in the source,
URL, Vite environment or generated bundle.

This is a useful access gate for the pilot. Before granting access to other
authors, replace it with authenticated accounts, server-side roles and an audit
log.

## Server configuration

Configure these as encrypted production environment variables in the dedicated
`qubix-university` Vercel project:

```text
OPENAI_API_KEY=<OpenAI project API key>
OPENAI_TUTOR_MODEL=gpt-5.6-terra
QUBIX_BUILDER_KEY=<long unique founder passphrase>
```

These names must never use the `VITE_` prefix. Vite-prefixed values are public
browser configuration.

After adding or changing the variables, redeploy the current `main` commit so
the serverless function receives the new environment revision.

## Controls in the first release

- server-only OpenAI credential;
- separate learner and builder instructions;
- deterministic subject gates before any model call;
- no web-search tool;
- maximum input sizes and output-token limits;
- maximum four supplied Qubix passages;
- `store: false` on Responses API calls;
- per-instance request throttling;
- fixed local fallback for learners;
- no curriculum-status or deployment tool;
- Builder `noindex,nofollow` metadata.

The scope gate and prompt make out-of-domain responses substantially less
likely; they are not a mathematical guarantee. Before a public launch, add
shared rate limiting, authenticated learner identity where appropriate,
adversarial evaluations and usage monitoring.

## Model

The default is `gpt-5.6-terra`, selected for the balance of reasoning quality
and cost. It can be changed without rebuilding by updating
`OPENAI_TUTOR_MODEL` and redeploying. Any model change must pass the same Qubix
scope, grounding and answer-helpfulness evaluation set before production use.
