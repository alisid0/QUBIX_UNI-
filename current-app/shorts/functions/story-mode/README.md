# Qubix Function Quest Short

A 58-second, 9:16 story-mode explanation of the defining property of a
function. Aron is the learner and the Qubix cube is the guide.

The Short deliberately avoids the machine-and-button metaphor. It teaches with
input-output paths, one branching counterexample, a viewer challenge, and a
concise answer reveal.

## Structure

1. Function Quest title screen
2. Aron asks what a function actually means
3. One input follows one rule to one output
4. A branching input reveals what is not a function
5. The viewer chooses between maps A and B
6. The one-output rule is stated, including the shared-output nuance
7. Qubix beta invitation

There is no music or voice-over. Only gentle game-interface taps and short
answer chimes are used.

## Render

From `current-app/`:

```bash
node shorts/functions/story-mode/render.mjs
```

The renderer writes a reliable VP9 WebM master. The target bitrate keeps the
social upload compact while retaining the full 1080×1920 frame. Chromium's
experimental MP4 recorder is not used because it can write incorrect timeline
metadata for long canvas recordings.

If Playwright's browser is not installed, run `npx playwright install chromium`.
An existing Chromium executable can instead be supplied through
`QUBIX_CHROMIUM_PATH`.
