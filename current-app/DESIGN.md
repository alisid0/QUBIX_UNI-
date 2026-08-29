---
version: alpha
name: Qubix
description: Warm book-studio STEM learning UI. Five locked hues, paper surfaces, Clay accent for the single primary action.
colors:
  primary: "#3D2E1F"
  secondary: "#7A6A54"
  tertiary: "#D28A5E"
  tertiary-strong: "#A85F32"
  tertiary-soft: "#F7E6D8"
  tertiary-text: "#8A4A22"
  on-tertiary: "#FFFFFF"
  neutral: "#FEF9F3"
  surface: "#FFFDF9"
  surface-2: "#F7F0E8"
  border: "#E8DCC8"
  olive: "#3D9B3D"
  olive-soft: "#E6F5E6"
  olive-text: "#2E6E2E"
  danger: "#D94335"
  danger-soft: "#FCEAE8"
  danger-text: "#B33024"
  ink-dark: "#141310"
  canvas-dark: "#1C1A16"
typography:
  brand:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 30px
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 22px
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: -0.02em
  body-md:
    fontFamily: Mulish
    fontSize: 17.5px
    fontWeight: 500
    lineHeight: 1.72
  body-sm:
    fontFamily: Mulish
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.45
  label-caps:
    fontFamily: Mulish
    fontSize: 10px
    fontWeight: 850
    lineHeight: 1.2
    letterSpacing: 0.1em
rounded:
  sm: 8px
  md: 14px
  lg: 22px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  page: 28px
components:
  button-primary:
    backgroundColor: "{colors.tertiary-strong}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  nav-tab-active:
    backgroundColor: "{colors.tertiary-soft}"
    textColor: "{colors.tertiary-text}"
    rounded: "{rounded.md}"
  focus-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 20px
---

# Qubix DESIGN.md

Agent-facing design system for the Qubix app and marketing shell. Normative
values live in YAML above and in `src/lib/styles/qubix-tokens.css` (`--qx-*`).
This file follows the [DESIGN.md format](https://github.com/google-labs-code/design.md).

## Overview

Qubix should feel like a **warm learning studio / open book**, not a SaaS
dashboard. The personality is calm, tactile, and slightly editorial: paper
surfaces, a soft desk glow, and one Clay accent that marks the next useful
action.

Brand voice in the UI: quiet confidence. Prefer one clear CTA per viewport.
Depth comes from paper layers and restrained atmosphere, not neon glow or
stacked card chrome.

Internal codename was Strata; public brand is **Qubix**. Do not revive the
legacy chalk Quiz palette for Reader, Home, Path, or workshops.

## Colors

Five locked UI roles (never add a sixth UI hue):

- **Primary / Ink (#3D2E1F):** Core text and dark marks.
- **Secondary (#7A6A54):** Supporting copy, captions, quiet chrome.
- **Tertiary / Clay (#D28A5E):** The brand action colour — primary buttons,
  active tabs, streak emphasis, the one “do this next” signal.
- **Neutral / Canvas (#FEF9F3):** Page foundation; surfaces are warmer tints of
  this paper family.
- **Olive (#3D9B3D):** Success / mastered / correct only.
- **Danger (#D94335):** Errors and destructive actions only.

Dark theme keeps the same Clay/Olive/Red roles on an ink canvas (`#141310`).
Illustrations and 3D models may use their own palettes but must harmonise.

## Typography

Two families only:

- **Bricolage Grotesque** for brand, headlines, and big figures (`.qx-display`).
- **Mulish** for body, labels, and UI chrome.

Headlines are tight and heavy. Body is book-like (≈17.5px / 1.72). Caps labels
are small, tracked, and used sparingly for section kickers — never as a wall of
badges.

## Layout

Mobile-first column with `--qx-page-pad` gutters and a soft max content width
(`--qx-content-max`, ≈900px; Home may breathe wider on desktop). Prefer one
composition per first viewport: brand or greeting, one headline action, one
supporting line, then secondary sections.

Use spacing rhythm `4 / 8 / 16 / 24 / 40`. Related items share a surface;
unrelated sections get air, not another nested card.

## Elevation & Depth

Prefer **tonal paper layers** over heavy shadows:

1. Canvas background + quiet radial atmosphere
2. Surface panels with 1px warm borders
3. Soft card shadow only when the surface is interactive

No multi-layer glow stacks. No floating sticker badges on hero media.

## Shapes

Friendly but not bubbly: `8 / 14 / 22` radii, pills only for true chips and
nav affordances. Keep corner language consistent inside a screen — do not mix
sharp slabs with oversized pills.

## Components

- **Primary button:** Clay strong fill, white label, one per section.
- **Secondary button:** Surface fill + warm border, Ink text.
- **Bottom nav:** Surface bar; active tab uses Clay soft + Clay text underline.
- **Focus / Continue card:** Single dominant home action; avoid competing CTAs.
- **Doors / topic tiles:** Light surface cards; hover lifts 2–3px with Clay
  border — no dense stat strips inside the tile.

Quiz chalk styling remains isolated to `Quiz.svelte` and must not leak.

## Do's and Don'ts

- Do use Clay for the single most important action on a screen.
- Do keep brand/display type on headlines; Mulish everywhere else.
- Do preserve `--qx-*` tokens — no one-off hex in new UI.
- Do favour atmosphere (grain, soft radials) over flat grey slabs.
- Don't invent a sixth UI accent colour.
- Don't cover heroes with floating chips, promo stickers, or stat strips.
- Don't put cards inside cards; if removing a border/shadow doesn’t hurt
  understanding, remove it.
- Don't use Inter/Roboto/Arial as the primary face.
- Don't apply chalk-board styling outside Quiz.
- Don't ship looping decorative “GIF-like” panels where a calm interactive
  diagram would teach better.
