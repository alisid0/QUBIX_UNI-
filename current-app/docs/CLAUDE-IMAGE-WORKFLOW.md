# Claude + Copilot Image Pipeline — Split of Duties

> **RETIRED WORKFLOW. DO NOT EXECUTE.** It incorrectly proposes raster GIFs
> for every floor and treats prompt drafts as live inventory. Use
> `pnpm run audit:live-media` and `docs/SOURCE-OF-TRUTH.md`.

This is the instruction file for Claude (the other AI) to collaborate with GitHub Copilot on generating pixel-art GIFs for every BB in the Qubix/Strata app.

---

## Who does what

| Task | Owner |
|---|---|
| Write image prompts for each BB floor | **Copilot** writes into `content-drafts/IMAGE-PROMPTS.md` |
| Generate actual images from prompts | **You (Claude/GPT)** — user pastes prompts into you, you generate pixel art |
| Save generated images to disk | **User** downloads images, saves to `public/media/frames/bb-XXXX/fN/` |
| Compile frames into GIFs | **Copilot** runs FFmpeg compilation scripts |
| Wire GIFs into the app | **Copilot** edits `src/lib/content/boardMedia.js` |
| Deploy to production | **Copilot** runs `npm run build && git push` |

---

## Prompt format

Every prompt in `content-drafts/IMAGE-PROMPTS.md` follows this structure:

```
### BB 1132 — The atom of information (bit)

**Floor 0** — watchtower → bit swap
→ Frame 1: A stone watchtower standing alone on a hilltop, dark sky.
→ Frame 2: Thick column of black smoke rising from the watchtower.
→ Frame 3: An OFF switch, dark and unlit.
→ Frame 4: The same switch flipped ON, glowing amber.
→ Frame 5: A retro computer terminal with a single blinking cursor.

**Floor 1** — copper wire / electricity check
→ Frame 1: A single copper wire running horizontally across the frame.
→ Frame 2: The wire with no glow — dead circuit, dark.
→ Frame 3: The wire lit up bright yellow — electricity flowing.
→ Frame 4: A tiny toggle switch in the open (0) position.
```

### Style baseline (auto-prepended by the script)

> Pixel art, dark navy blue background, 16-bit retro game style, no text

The `scripts/parse-image-prompts.mjs` script prepends this to every frame. When generating images directly, Claude should add this prefix.

### Rules for generating images (tell Claude)

1. **One subject per frame.** No split scenes.
2. **4–5 sequential frames per floor** — together they form a GIF.
3. Frames progress through the concept shown on that floor.
4. **1:1 square ratio**, important content centered.
5. **No baked-in text** — the BB's own labels carry content. If text appears, leave it out.
6. **Dark navy blue background (#0a0a1a or similar).**
7. **16-bit retro game aesthetic** — SNES/Genesis era pixel art, not modern 3D.
8. Floors marked **SKIP** already have GIFs in `boardMedia.js` — skip those.

---

## How to generate images (step by step)

### Step 1: Copilot writes prompts

Copilot reads BB content from Supabase/deck.js and writes pixel-art frame prompts into:

```
content-drafts/IMAGE-PROMPTS.md
```

Under the gateway sections:
- `## THE BIT (Computing)` — BBs 1130–1138, 1229–1265 ✅ DONE
- `## THE ATOM (Chemistry)` — BBs 1094–1104 ✅ FIRST BATCH, more needed
- `## THE LINE (Maths)` — not yet started
- `## THE UNIT (Physics)` — not yet started

### Step 2: User copies prompts into Claude/GPT

The user opens `content-drafts/IMAGE-PROMPTS.md`, finds a BB they want images for, and copies one floor at a time into Claude/GPT with this wrapper:

```
Generate this pixel art image:
Pixel art, dark navy blue background, 16-bit retro game style, no text, 1:1 square.
[Frame prompt text here]
```

**Workflow for Claude when receiving prompts:**

1. Generate each frame as a **separate image** (not a single combined image)
2. Each frame should be a **1:1 square PNG**
3. Generate all frames for one floor together so they're visually consistent
4. The user will download them and name them `frame-1.png`, `frame-2.png`, etc.

### Step 3: User saves images to disk

Images go here:

```
public/media/frames/bb-XXXX/fN/frame-1.png
public/media/frames/bb-XXXX/fN/frame-2.png
public/media/frames/bb-XXXX/fN/frame-3.png
public/media/frames/bb-XXXX/fN/frame-4.png
```

Where `XXXX` is the BB number and `N` is the floor number.

Example for BB 1132, Floor 0:
```
public/media/frames/bb-1132/f0/frame-1.png
public/media/frames/bb-1132/f0/frame-2.png
public/media/frames/bb-1132/f0/frame-3.png
public/media/frames/bb-1132/f0/frame-4.png
public/media/frames/bb-1132/f0/frame-5.png
```

### Step 4: Copilot compiles GIFs

Once all frames for a BB are saved, tell Copilot:

> "Compile GIFs for BB XXXX"

Copilot will run FFmpeg to create animated GIFs in `public/videos/card-XXXX-floorN.gif` and wire them into `src/lib/content/boardMedia.js`.

### Step 5: Copilot deploys

After compilation and wiring, Copilot builds and pushes.

---

## Current status (updated by Copilot)

| Gateway | BBs | Prompts written | Images generated | GIFs compiled |
|---|---|---|---|---|
| BIT (Computing) | 1130–1138, 1229–1265 | ✅ All 46 BBs | ❌ | ❌ 1130–1131 only |
| ATOM (Chemistry) | 1094–1104, 1109–1129, 1201–1218, 1068–1077 | 🟡 1094–1104 (11 BBs) | ❌ | ❌ 1094 only |
| LINE (Maths) | 1078–1093, 1161–1173, 1219–1228, 1266–1275 | ❌ | ❌ | ❌ |
| UNIT (Physics) | 1139–1200 | ❌ | ❌ | ❌ |

---

## Commands reference (for the user)

```bash
# Test: see what frames a BB needs (no generation)
node scripts/generate-frames.mjs --bb 1000 --dry-run

# Parse all prompts and print the queue
node scripts/parse-image-prompts.mjs

# Parse one gateway
node scripts/parse-image-prompts.mjs --gateway "THE BIT"

# Auto-generate via ElevenLabs browser automation
node scripts/generate-frames.mjs --bb 1000

# Compile frames into GIF (Copilot does this)
# See scripts/ for FFmpeg commands
```

---

## Important notes for Claude

1. **You are the image generator.** You don't need to know the codebase. Just read the prompts from `content-drafts/IMAGE-PROMPTS.md` (the user will paste them) and generate pixel art images.

2. **Each frame is a standalone image.** Don't combine multiple frames into one image. Each `→ Frame N:` line in the prompt file = one separate generated image.

3. **Consistency matters.** All frames within a floor should share the same art style, palette, and character proportions so the GIF animates smoothly.

4. **Dark navy background.** Always use a dark navy blue background (`#0a0a1a` or close), not black and not bright. The app has a dark theme.

5. **No text in images.** The app overlays its own text labels. Generated images should be pure illustrations.

6. **If a floor says SKIP**, it already has a GIF. Don't generate anything for it.
