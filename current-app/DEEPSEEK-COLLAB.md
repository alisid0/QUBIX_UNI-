# DeepSeek Collaboration Brief — ElevenLabs Frame Automation

## What we are building

A Node.js script (`scripts/generate-frames.mjs`) that drives the ElevenLabs Image & Video
generator via Playwright browser automation to produce pixel-art animation frames, then
stitches them into GIFs with ffmpeg. There is no public API for ElevenLabs image generation
— everything goes through the real browser UI (Brave) using an existing logged-in session.

## Division of labour

**Claude Code** (me — running in this VS Code session):
- Edits files, runs terminal commands, reads build output.
- Applies code changes you suggest to the actual `.mjs` scripts.
- Runs the scripts and reports back exact terminal output.

**DeepSeek** (you):
- Diagnoses Playwright automation errors from the terminal logs I paste.
- Suggests precise code fixes for the selector / interaction / timing issues.
- Proposes alternative strategies when the current approach is blocked.
- Does NOT have filesystem access — I paste relevant code sections to you.

## How to work together (protocol)

1. I paste a failing terminal log + the relevant function from the script.
2. You diagnose and return a drop-in replacement for that function (no surrounding code, just the function).
3. I apply it with the Edit tool and re-run.
4. I paste the new output back to you.
5. Repeat until green.

When you return a fix, format it as a single fenced JS block with the full function body — nothing else. No commentary outside the fence.

---

## The scripts

### `scripts/generate-frames.mjs`

Full Playwright automation script. Key functions:

```
fillPrompt(page, text)          — types into ProseMirror contenteditable prompt box
clickGenerate(page)             — clicks the Generate submit button
waitForGeneratedImage(page)     — waits for generation to finish, downloads the PNG
uploadReference(page, imgPath)  — uploads a previously-saved frame as a style reference
```

Run:
```
node scripts/generate-frames.mjs --bb 1000          # one BB (resume-safe)
node scripts/generate-frames.mjs --gateway UNIT     # whole UNIT gateway
node scripts/generate-frames.mjs --dry-run          # print queue, no browser
```

### `scripts/parse-image-prompts.mjs`

Parses `content-drafts/IMAGE-PROMPTS.md` into a queue of `{ bb, floor, frames[] }` objects.

### `scripts/stitch-gifs.mjs`

Stitches saved frames into GIFs:
```
node scripts/stitch-gifs.mjs --bb 1000 --fps 0.8
```

---

## ElevenLabs UI — confirmed selectors

| Element | Selector |
|---|---|
| Prompt box | `#image-video-prompt-box` (ProseMirror contenteditable div, NOT textarea) |
| Generate button | `button[type="submit"][aria-label="Generate"]` |
| Image refs upload zone | `button[role="presentation"][data-agent-id^="file-upload-"]` |
| Download button | `button[aria-label="Download"]` |
| Recreate button | `button[aria-label="Recreate"]` |
| Image tab | `button[type="button"]:has-text("Image")` |

The Image refs zone has `role="presentation"` — Playwright marks it **not-enabled** and
`btn.click({ force: true })` still fails with actionability checks. Current fix:
`page.evaluate(() => document.querySelector('[data-agent-id^="file-upload-"]').click())`
which bypasses Playwright entirely and fires a raw DOM click.

---

## Current state

### Saved frames (resume-safe via `.generated-frames.json`)

| Frame | Status |
|---|---|
| BB 1000 Floor 0 Frame 1 | ✓ saved |
| BB 1000 Floor 0 Frame 2 | ✓ saved |
| BB 1000 Floor 0 Frame 3 | ✓ saved |
| BB 1000 Floor 0 Frame 4 | ✗ not saved |
| BB 1000 Floors 1–2 (8 frames) | ✗ not started |

### Known issues fixed

| Issue | Fix applied |
|---|---|
| `promptBox.selectAll is not a function` | Replaced with `Control+a` + `Delete` keypresses |
| `fileInput.isAttached is not a function` | Replaced all `isAttached` calls with `isVisible` |
| `waitForGeneratedImage` timeout (counting Download buttons unreliable with 100+ history items) | Replaced with Generate button `disabled→enabled` state watch |
| `uploadReference` click timeout (`role="presentation"` not-enabled) | Replaced `btn.click({ force: true })` with `page.evaluate(() => zone.click())` |

### Open question

After `page.evaluate(() => zone.click())`, does ElevenLabs fire a `filechooser` event that
Playwright's `page.waitForEvent('filechooser')` can catch? This is the main thing to verify
on the next run. If not, we need Strategy 2 (direct `input[type="file"].setInputFiles`) or
Strategy 3 (DataTransfer drop event).

---

## The prompt format

Each frame prompt is: `"Pixel art, dark navy blue background, 16-bit retro game style, no text. <scene description>"`

4–5 frames per floor. Frame 1 is generated without a reference. Frames 2–N each use the
previous frame as a reference image (uploaded to the Image refs zone) so the style stays
consistent across the floor's animation.

---

## Error log format

When I paste a terminal log, look for:
- The function name in the stack trace (tells you which function failed)
- `locator resolved to <...>` lines (tells you which element Playwright found)
- `element is not enabled` / `element is not visible` / `element was detached` (actionability failure type)
- The timeout value (tells you which `await` timed out)

---

## Repo context (do not leak)

- Stack: Vite + Svelte SPA, Supabase backend, deployed on Vercel.
- Internal codename: Strata. Public brand: Qubix.
- This script is offline tooling — it runs locally, not in the deployed app.
- `.env.local` is gitignored and holds the Supabase service-role key (never in commits).
