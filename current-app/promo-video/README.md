# QUBIX promotional video

A 20-second, 9:16 promotional cut for QUBIX University, built from real app screens.

## Deliverable

- `qubix-promo-vertical.webm`: 1080×1920, 30 fps, with an original minimal music bed
- `qubix-promo-horizontal.webm`: 1920×1080, 30 fps, with live recorded app interactions and music
- `qubix-promo-horizontal-35s.webm`: extended 35-second cut covering all five lesson concepts
- `qubix-modern-learning-physics-16x9.webm`: 40-second campaign film about learning by doing, featuring the latest physics course
- `classroom-frames/` contains eight side-view pixel-art frames used in the campaign opening

## X launch copy

> I built the learning app I wish existed when I was a student.
>
> We live in a fast, interactive world. Learning should reflect that.
>
> As AI handles more repetitive steps, understanding the basics, thinking clearly and creating something new will matter more.
>
> Meet QUBIX.

## Creative structure

1. Hook: “What if calculus felt obvious?”
2. Manipulate: move `x` and see the concept respond
3. Connect: watch dependent change happen
4. Prove: complete a quick knowledge check
5. Understand: arrive at a local rate
6. CTA: “Learn in Bytes. Grow by Leaps.”

## Rebuild

The capture script serves the current `dist/` build automatically:

```powershell
node promo-video/capture-app.mjs
node promo-video/render-video.mjs
node promo-video/capture-interactions.mjs
node promo-video/render-horizontal.mjs
```

The visual composition lives in `promo.html`, so copy, pacing, colours, and scenes can be adjusted without editing the app itself.
