# Design system — Strata

> **LEGACY — QUIZ ONLY.** This chalk system is not the current app/Reader
> design and must not be used for new BB media. The main UI uses
> `qubix-tokens.css`. Read `CLAUDE.md` and `docs/SOURCE-OF-TRUTH.md` first.

The visual identity is **hand-drawn white chalk on a dark green chalkboard**, in a wooden frame. Everything new — cards, controls, future pages, generated illustrations — must match this. Do not introduce gradients-as-decoration, drop shadows beyond what's defined, rounded "app" UI, or sans-serif body text. When in doubt, it should look like a good teacher's board, not a SaaS dashboard.

## Colour tokens (CSS variables, already in `:root`)

Use these variables, never raw hex, so the whole deck stays consistent and re-themable.

```
Board (card backgrounds, by depth — warmer/older as you descend)
  --board-1  #1f3b30   surface, fresh green slate   (depth 0)
  --board-2  #24463a                                  (depth 1)
  --board-3  #2c2f2a   older, greyer board            (depth 2)
  --board-4  #262422   near-black slate, bedrock      (depth 3+)

Frame
  --frame      #5a4632  wooden chalk-tray brown (slab border)
  --frame-dark #3f3022  inner frame line

Page background
  --bg-1     #152a22   the dark green wall behind the boards

Chalk (text & strokes)
  --chalk        #f4f1e9   main chalk white (warm)
  --chalk-dim    #c7ccc0   faded chalk (secondary text)
  --chalk-faint  #8fa093   faintest chalk (lines, ladder, borders)
  --chalk-yellow #f2d585   yellow chalk — primary emphasis / key terms
  --chalk-green  #a9d6a0   pale green chalk — secondary emphasis / labels
  --chalk-blue   #9ec6d8   pale blue chalk — occasional accent
  --line         rgba(244,241,233,0.16)  hairline dividers
```

Emphasis rule: **yellow chalk** for the single most important word/idea; **green chalk** for secondary callouts and labels; blue used sparingly. Never more than two emphasis colours active in one card.

## Typography

Three hand fonts, loaded from Google Fonts. Match the role to the token:

```
--hand-display  "Architects Daughter"   card titles / big display (loose chalk scrawl)
--hand          "Kalam"                  body text (rounder hand)
--print         "Patrick Hand"           labels, eyebrows, buttons, counters (neat chalk print)
```

- Titles: `--hand-display`, weight 400, slight negative-to-neutral letter-spacing, a faint `text-shadow:0 1px 0 rgba(0,0,0,0.25)` for chalk depth.
- Body: `--hand`, ~18–22px fluid, line-height ~1.6. Key terms in `--chalk-yellow` (bold) or `--chalk-green` (dotted underline via `border-bottom:1.5px dotted`).
- Labels/eyebrows/buttons: `--print`, modest letter-spacing.
- **No sans-serif in content.** `--sans` exists only as a fallback; the deck reads as handwriting.

## Chalk texture cues (how UI elements should feel drawn)

- **Borders are dashed**, not solid, wherever practical: `border:1.5px dashed var(--chalk-...)`. Buttons, the dig-in circle, the formula box, the progress line, nav arrows, the depth-tag pill.
- **Slight rotations** on small printed elements so they look chalked, not typeset: e.g. `transform:rotate(-1deg)` on tags, the kicker, formula boxes, the intro button.
- **Formula boxes**: dashed `--chalk-green` border, dark translucent fill `rgba(0,0,0,0.22)`, mono-ish hand font, an italic plain-language gloss under the formula in `--chalk-dim`.
- **The slab** is a framed board: `border:12px solid var(--frame)` plus an inset shadow stack for the chalk-tray feel. Don't flatten it to a plain rectangle.
- **Ambient field**: a quiet drifting chalk-dust particle canvas behind the cards; its tint warms by act (white → green → yellow). Keep it subtle (low opacity).

## Layout & interaction (must stay consistent)

- **Two axes:** swipe **← / →** moves across cards; tap **dig in / ↓** descends a layer, **↑** ascends. Don't repurpose these.
- **Depth ladder** on the left edge: chalk dots, filled = current depth, faint = deeper. "Bedrock reached" when no deeper layer.
- **Card sizing:** text cards `min(680px, 100%)`; **image cards `min(860px, 100%)`** (wider, since illustrations are landscape).
- **Image-mode card** (depth 0 with an image): image fills the board edge-to-edge (`background-size:contain`, board-green letterbox), dig-in button floats over a bottom fade. Deeper layers are normal text.
- Respect `prefers-reduced-motion` (animations already gated).

## Adding a new card — checklist

1. Add a `C(act, kicker, title, [layers], img)` entry in `DECK` (in `index.html`).
2. Renumber `"Card NN"` kickers so they stay continuous. Counter/progress auto-derive from `DECK.length`.
3. If illustrated: drop the PNG in `images/` as `card-NN.png` and pass that path as the 5th arg. Image must follow the illustration spec below.
4. Keep copy in the established editorial voice (see `CONTENT.md`).
5. Do not add new fonts, colours outside the tokens, or non-chalk UI.

## Illustration spec (for any new chalkboard image)

Generate at **landscape** (16:9 or 3:2), and use this style prompt so new images match the existing eleven:

> Hand-drawn white chalk illustration on a dark green chalkboard (#1f3b30 board colour). Slightly rough, imperfect chalk lines with faint dust and smudging. Simple, clear, diagrammatic — a physics teacher's quick board sketch, not polished vector art. Off-white chalk for main lines; pale yellow (#f2d585) and pale green (#a9d6a0) chalk for emphasis and labels only. No colour photography, no realism, no gradients or soft shading. Flat educational diagram. Generous empty board space around the subject.

Conventions seen across the set, keep them:
- Stick figures or simple line-drawn people; objects in clean single-weight chalk outline.
- Labels in chalk caps or neat print, underlined in yellow/green.
- Arrows for forces/motion; dashed lines for reference levels/measurements.
- One clear idea per image; don't crowd it.
- If a formula appears, box it with a dashed chalk border.

Save as `images/card-NN.png`. Image generators are unreliable with text/equations — proof them; a card's own dashed formula box can carry the equation instead if the baked-in text comes out garbled.
