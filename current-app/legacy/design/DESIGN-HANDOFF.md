# Handoff: Strata — Auth, First-Run, Learning Map, Mastery & Leaderboard

## Overview
Strata is a swipeable, tap-to-descend STEM microlearning app (chalk on a green chalkboard).
The existing product is a reader: cards you **swipe ←/→** across and **tap ↓** to descend into deeper
layers. This handoff covers the **surrounding app shell** that was designed on top of that reader:

1. **Auth & first-run** — Welcome, Create account, Verify phone (SMS), Log in, and a first-run
   "you're in" screen that teaches the two gestures. Designed phone-first, with tablet and desktop reflows.
2. **Progress & play** — a **Subjects** overview, a cumulative **Learning Map** built on the six mastery
   states, and a **Leaderboard** with Daily / Weekly / Monthly tabs.

The whole thing keeps the Strata chalkboard art direction: chalk-on-slate, a wooden frame as the device
edge, dashed "chalk" borders, and three hand-drawn fonts. No new colors or fonts were invented — see
`STRATA-BRIEF.md` (included) for the canonical design system and the full mastery-system spec (§7).

## About the Design Files
The `.dc.html` files in this bundle are **design references created in HTML** — prototypes that show the
intended look and behavior. **They are not production code to copy directly.** They are "Design Components":
a lightweight authoring format that renders through the bundled `support.js` runtime (React under the hood).
You do **not** need to adopt that runtime.

Your task is to **recreate these designs in the target codebase's existing environment** (React, Vue,
SwiftUI, React Native, etc.) using its established components, design tokens, and patterns. If no front-end
environment exists yet, choose the most appropriate framework for the project and implement the designs there.

To preview the prototypes: open each `.dc.html` file in a browser (they must sit next to `support.js` and
`SubjectMark.dc.html`, which they reference as siblings — keep the folder intact). Each file lays out its
screens as **phone/tablet/desktop mockups on a gray gallery background** — that gallery chrome is just a
presentation surface, **not** part of the product UI. Build only the screens inside the device frames.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, and interactions are all intended as shown.
Recreate the in-device UI as closely as the target platform's components allow. The gray gallery background,
the device bezels (black phone shell, dynamic island, browser chrome, traffic lights), and the captions under
each frame are **scaffolding for review only** — do not build them.

---

## Design Tokens

### Colors (from Strata's `:root`, do not invent new ones)
| Token | Hex | Use |
|---|---|---|
| Board / slate (surface) | `#1f3b30` | primary card/screen background |
| Slate gradient stops | `#2a4d3d` → `#1a3127` | radial background on screens |
| Board deeper | `#24463a`, `#2c3a33` | descending depth tints (reader) |
| Bedrock | `#24221f` / `#262422` | deepest layer |
| Page bg (darker) | `#152a22` / `#142519` | board backdrop on tablet/desktop |
| Wood frame | `#5a4632` (walnut) · `#6b5436` (oak, current default) · `#2c2622` (ebony) | device/slab frame |
| Wood frame dark | `#3f3022` | inner frame shadow line |
| Chalk (main) | `#f4f1e9` | primary text / lines |
| Chalk dim | `#c7ccc0` | secondary text |
| Chalk faint | `#8fa093` | tertiary text, hints |
| Chalk faint (darker UI lines) | `#4d6b59`, `#3a5447`, `#3f5a4b` | dashed dividers / trail spine |
| Chalk yellow (accent, primary) | `#f2d585` | the ONE accent per screen, primary CTA |
| Chalk green (secondary) | `#a9d6a0` | labels, secondary emphasis, "well read" |
| Chalk blue (rare) | `#9ec6d8` | "recalled" state, rare emphasis |
| Hairline | `rgba(244,241,233,0.16)` | faint rules |
| Locked grey | `#6f7d72`, `#5d6b60` | locked nodes/cards |

**Accent rule:** at most **one filled accent per screen** (the single thing to tap next). Yellow is the
primary accent; green for secondary/labels; blue is rare. Never more than two emphasis colors in one view.

The accent color and the wood-frame tone are exposed as themeable tokens in the prototypes
(`--accent`, `--frame`). Treat them as theme variables in your implementation.

### Typography (Google Fonts)
| Role | Family | Used for |
|---|---|---|
| Display / titles | **Architects Daughter** (400) | screen titles, big numbers, avatar initials |
| Body | **Kalam** (400/700) | reading copy, descriptions, helper text |
| Print / labels | **Patrick Hand** (400) | eyebrows, labels, buttons, counters, chips |

No sans-serif in content. Type scale used in the mocks (phone): titles 30–44px, body 13.5–15.5px,
labels/buttons 12.5–17px, micro-labels 10–12px. On 1280 desktop the hero title is 62px.

Load: `https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Kalam:wght@400;700&family=Patrick+Hand&display=swap`

### Spacing, radius, borders, shadow
- **Dashed "chalk" borders** are the signature: `1.4–1.6px dashed <chalk color>`. Dotted = locked/disabled.
- Border radius: inputs/buttons `11–14px`; pills/CTAs `24–28px` (full-round); cards `12–16px`; framed slabs `6px`; phone screen `38px`; phone bezel `48px`; tablet bezel `40px` / screen `22px`; desktop window `14px`.
- Slight playful rotation on printed elements: CTAs and chips use `transform: rotate(-0.4deg)` to `-1.2deg`.
- Framed-slab shadow (the chalkboard-in-a-frame look):
  `box-shadow: 0 0 0 2px #3f3022, 0 30px 60px -26px rgba(0,0,0,0.85), inset 0 0 70px rgba(0,0,0,0.35);`
  with `border: 8–12px solid var(--frame)`.
- Primary button shadow: `0 2px 0 rgba(0,0,0,0.28)` (a chalk-tray drop).
- Inputs: `background: rgba(0,0,0,0.22–0.24)`, dashed `#8fa093` border, focus → border becomes `var(--accent)`.

### Motion
- Code-input caret: `@keyframes blink { 50% { opacity: 0 } }`, 1s steps(1) infinite.
- Current map node: `@keyframes pulsehere { 0%,100% { box-shadow: 0 0 0 0 rgba(242,213,133,0.5) } 50% { box-shadow: 0 0 0 7px rgba(242,213,133,0) } }`, 2s ease-out infinite.
- Reader (existing) uses a 0.62s cubic-bezier slide and respects `prefers-reduced-motion`.

---

## Screens / Views

> Device target: **phone-first** (mock screen 330×724, ~iPhone 13/14). Tablet ≈ 834×1112, desktop ≈ 1280-wide.
> 44–48px minimum tap targets throughout.

### FILE A — `Strata Auth.dc.html`

#### A1. Welcome
- **Purpose:** entry point; route to sign-up or log-in.
- **Layout:** full chalkboard screen, wooden frame as the edge. Centered column.
- **Components (top→bottom):** brand `STRATA` (Patrick Hand, letter-spacing 0.16em, "STRATA" in accent);
  a chalk "strata layers" doodle (4 stacked dashed horizontal rules of varying width + a `↓`); eyebrow
  `PHYSICS · MATHS · CHEMISTRY` (green); title **"Your daily STEM intake."** (Architects Daughter 38px,
  "STEM" in accent with a 4px accent underline); subcopy (Kalam, max 26ch); **primary CTA "Create my account"**
  (filled accent, dark text `#1f3b30`, full-width pill); text link "Already have one? **Log in**" (accent, dashed underline).

#### A2. Create account
- **Purpose:** register via Google, phone, or email+password.
- **Components:** back chevron (top-left, dashed circle); centered `STRATA`; title "Create your account" (31px);
  subcopy; **"Continue with Google"** (dashed outline button, chalk "G" in a white disc — *use the real Google
  brand button in production*); **"Continue with phone"** (dashed outline, chalk phone glyph); divider
  "or use email" (dashed rules + faint label); **Email** field (label `EMAIL` in green, dashed input);
  **Password** field (label `PASSWORD`); **"Create account"** primary CTA; legal microcopy
  "By continuing you agree to the Terms & Privacy."; footer (not shown here) "Already have an account? Log in".
- Inputs are real, focusable, min-height ~46px.

#### A3. Verify phone (SMS)
- **Purpose:** confirm the phone number with a 6-digit code.
- **Components:** back chevron; `✉` glyph; title "Check your phone"; subcopy with the number
  `+1 (555) 012 — 3456`; **6 code boxes** (equal-width dashed boxes; first three filled `4 2 7`, the 4th is the
  active box with a blinking accent caret, last two empty); "Didn't get it? **Resend in 0:24**"; primary
  **"Verify & continue"**; text link "Use a different number".

#### A4. Log in
- **Purpose:** returning user.
- **Components:** back chevron; `STRATA`; title "Welcome back"; subcopy; "Continue with Google";
  "Continue with phone"; divider "or"; **Email**; **Password** (with a "Forgot?" link inline on the label row);
  primary **"Log in"**; footer "New to Strata? **Create an account**".

#### A5. First run ("You're in")
- **Purpose:** post-signup; teach the two core gestures, then drop into the reader.
- **Components:** eyebrow "— you're all set —" (green, rotated); title **"You're in, Ada."** (44px, name in accent);
  subcopy "Here's the whole game — two gestures, that's it."; **two gesture rows** — a dashed circle with `→`
  ("Swipe across / on to the next idea") and a dashed accent circle with `↓` ("Dig in / deeper into this one");
  primary **"Start the lesson"**; footer "37 boards waiting · Act I — Things move".

#### A6. Tablet reflow (≈834×1112)
- The board gains margins; the auth form **floats as a framed slab** (wood border, the slab shadow above),
  centered on the darker board. Same content as Welcome + the three auth methods + email CTA.

#### A7. Desktop / web reflow (≈1280)
- Browser window chrome (traffic lights + URL `strata.app/welcome`) — **chrome is scaffolding**.
- **Two-pane split:** LEFT (~55%) = brand panel (brand, big strata doodle, `PHYSICS · MATHS · CHEMISTRY`,
  62px "Your daily STEM intake.", value copy). A dashed vertical divider. RIGHT (~45%) = the **form slab**
  (Create account: Google / phone / divider / email / password / Create account / "Already have one? Log in").

### FILE B — `Strata Map.dc.html`

#### B1. Subjects
- **Purpose:** overview of the three tracks and overall progress; entry to each subject's paths.
- **Components:** header row — `STRATA` + level chip "Lv.7 · Geologist" (accent pill); title "Your tracks";
  subcopy; overall progress meter "18 of 37 boards read · 49%" (accent fill on a dark track);
  **three subject cards**, each = a 64px **progress-ring medallion** (CSS conic-gradient ring + dark inner disc
  + the subject's chalk mark) · subject name (Architects Daughter) · "X / Y boards" · a state line · chevron:
  - **Physics** (atom mark), ring 72%, "11 / 18 boards", "★ Forces & motion — Mastered ×2" (accent).
  - **Mathematics** (parabola mark), ring 36% (green), "5 / 14 boards", "↻ Trigonometry — Recalled" (blue).
  - **Chemistry** (flask mark), ring 0%, **locked** (dotted border, 0.72 opacity), "0 / 5 boards",
    "🔒 Unlocks after Energy" (small drawn lock).
  - Footer: "Read → Tested → Recalled. Mastery stacks; nothing resets."

#### B2. The Map (cumulative learning trail)
- **Purpose:** a vertical, **scrollable** chalk trail of paths/levels; shows where you are and what's next.
- **Layout:** sticky-ish header ("The Map" + "Level 7 · 18/37" + a thin progress meter), then a scroll area
  with a **dashed vertical spine** down the center and nodes placed on it, labels alternating left/right.
- **Nodes** are 64px circles; each encodes one of the **six mastery states** (see below) and carries the path's
  subject **chalk mark** (or a lock when locked). The mocked order top→down (one node per state, to show them all):
  1. **Forces & motion** — *Mastered ×2* (filled accent, glow, `✓2` badge)
  2. **Energy** — *Mastered ×1* (filled accent, `✓` badge)
  3. **Getting infinitely close** — *Well read* (slate fill, solid green ring, green mark)
  4. **Trigonometry** — *Recalled* (slate fill, solid blue ring, blue mark)
  5. **Vectors & 2D motion** — *In progress · Checked* (dashed accent ring, **"YOU ARE HERE"** chip above the
     node, `pulsehere` animation) ← current
  6. **Graphs & curves** — *Wandered* (faint dashed ring, faint mark)
  7. **Into the atom** — *Locked* (dotted ring, drawn lock, "Chemistry · 5 boards")
- Each label card shows: path name (Patrick Hand) · board count (Kalam) · state chip (colored).

#### B3. Leaderboard (Daily / Weekly / Monthly) — INTERACTIVE
- **Purpose:** ranked standings that reset over three windows.
- **Components:** title "Leaderboard"; subcopy "Energy earned from boards read, quizzes passed and recalls.";
  a **segmented control** (Daily | Weekly | Monthly) — the active tab is a filled accent pill, inactive are
  transparent chalk; tapping a tab swaps the data and moves the highlight. Below: a **top-3 podium** (#1 center,
  larger, with a `♛` and a glow; #2 left, #3 right — avatars are chalk discs with initials, dashed colored rings)
  and a **list of ranks 4–7** (rank · avatar · name · score). **"You · Ada"** is highlighted with a solid accent
  border + accent avatar when present in the visible range.
- **Mock data** (replace with real):
  - **Daily:** 1 Mara K. 980 · 2 Tomás 870 · 3 Priya 845 · 4 Wei 760 · **5 You·Ada 712** · 6 Sam 690 · 7 Leah 654
  - **Weekly:** 1 Priya 5,420 · 2 Mara K. 5,180 · **3 You·Ada 4,990** · 4 Wei 4,610 · 5 Tomás 4,540 · 6 Leah 4,300 · 7 Sam 4,120
  - **Monthly:** 1 Wei 22,300 · 2 Priya 21,750 · 3 Mara K. 20,900 · 4 Tomás 19,800 · **5 You·Ada 18,650** · 6 Leah 17,200 · 7 Sam 16,050

### FILE C — `SubjectMark.dc.html` (reusable subject icon)
Three chalk-drawn marks, one per subject, drawn as inline SVG with a `feTurbulence`+`feDisplacementMap`
"chalk roughen" filter (scale ≈1.5) and a `currentColor` stroke so they inherit the surrounding text color.
An `accent` prop tints one highlight stroke/fill per mark.
- **Physics** = an atom: three rotated ellipses (0°/60°/120°) + a filled nucleus (accent).
- **Mathematics** = coordinate axes (an L) + a parabola arc (accent stroke).
- **Chemistry** = an Erlenmeyer flask outline + lip + an accent liquid line + two bubbles.

Reproduce these as a single reusable icon component taking `subject` and a color. The roughen filter is a
nice-to-have; crisp single-weight strokes are an acceptable fallback.

---

## Interactions & Behavior
- **Auth methods:** Google (OAuth), Phone/SMS (request code → 6-digit verify → resend countdown), Email+password.
  Use the platform's real "Continue with Google" button + brand mark in production (the chalk "G" is a stand-in).
- **Phone verify:** 6 single-char inputs, auto-advance on entry, auto-back on delete, paste fills all six; resend
  disabled during the countdown (mock shows `0:24`).
- **First-run:** "Start the lesson" → reader at Card 01.
- **Subjects → Map:** tapping a subject card opens that subject's paths; locked cards are non-interactive and
  show the unlock condition.
- **Map:** vertical scroll; tapping an unlocked node opens that path's boards; "YOU ARE HERE" marks the current
  path; locked nodes are non-interactive.
- **Leaderboard tabs:** Daily/Weekly/Monthly switch the dataset and the active-tab highlight (client state).
- **Responsive:** phone = single stacked column edge-to-edge with the wood frame as the device edge; tablet =
  board with margins + a centered floating framed slab; desktop = two-pane split (brand backdrop left, form slab
  right). The same content, three layouts.
- **Accent rule & reduced motion** as in Design Tokens.

## State Management
- **Auth/session:** auth method, form fields + validation, SMS code + resend timer, current user (display name,
  e.g. "Ada"), account/subscription status (this is a **paid/subscription** product — account exists to save
  progress and sync across devices).
- **Progress (per the brief, §7 — note this backend does NOT exist yet):** progress attaches to a **path**
  (a curated ordered group of cards) per subject. Six mastery states, earned per path and cumulative:
  | State | Trigger |
  |---|---|
  | Wandered | opened the path once |
  | Checked | read all boards in the path |
  | Well read | passed the path's quiz once |
  | Recalled | returned ~7 days later |
  | Mastered ×1 | quiz scored ≥ 9/10 |
  | Mastered ×2 | recalled after ~28 days **and** scored ≥ 9/10 |

  Three derived values feed the score/leaderboard: **reading value** (opening/reading), **testing value**
  (quizzes), **recall value** (time-gap returns + re-pass). Store **events + timestamps** so states/values are
  *computed*, not flagged. Keep the reader a pure content+render layer; progress lives in the backend.
  Path map and open questions are in `STRATA-BRIEF.md` §7. **The map is cumulative — nothing resets** (only the
  leaderboard windows reset daily/weekly/monthly).
- **Leaderboard:** selected window (daily/weekly/monthly) + the ranked list per window.

## Assets
- **Fonts:** Architects Daughter, Kalam, Patrick Hand (Google Fonts).
- **Subject icons:** drawn inline (SVG) in `SubjectMark.dc.html` — no external image files. Recreate as an icon component.
- **All other UI** (doodles, locks, code boxes, status bar, device bezels) is pure CSS/markup — no raster assets.
- **Reader illustrations** (existing app): `images/card-01.png … card-11.png` (cards 1–11 only) — not part of this handoff but referenced by the brief.
- **No Anthropic brand assets are used.** Use your codebase's own component library + the Strata tokens above.

## Files
- `Strata Auth.dc.html` — Welcome, Create account, Verify phone, Log in, First-run + tablet & desktop reflows.
- `Strata Map.dc.html` — Subjects, The Map, Leaderboard (interactive tabs) + system reference cards.
- `SubjectMark.dc.html` — the reusable Physics/Maths/Chemistry chalk icon.
- `support.js` — the prototype runtime (lets the `.dc.html` files render in a browser; **not for production**).
- `STRATA-BRIEF.md` — the canonical Strata brief: full design system, editorial voice, content map, and the
  complete mastery-system spec (read §4 design system and §7 mastery before implementing).

> To preview: open the `.dc.html` files from this folder in a browser (keep all files together). The gray
> gallery layout and device frames are review scaffolding — implement only the screens inside the frames.
