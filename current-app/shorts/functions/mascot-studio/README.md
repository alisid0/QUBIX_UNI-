# QUBIX cube mascot studio

Standalone Three.js animation studio for the recurring QUBIX cube mascot.

## Preview

Serve the repository root with any static web server, then open:

```text
/shorts/functions/mascot-studio/
```

The page imports the repository's existing `three` dependency through an import map.

## Animation states

- Idle and blink
- Curious tilt
- Front-facing loop
- Turn right
- Turn left
- Thinking orbit
- Surprise
- Celebration
- Incorrect-answer shake
- Point left and right
- Button press
- Pixel transition

The stage is a production-sharp 540 × 960 WebGL canvas with block-built facial features, flat colour planes, and small chamfered corners. The mascot keeps its pixel character without enlarging a low-resolution render. Backgrounds can be navy, cream, or transparent. Use the controls to save a PNG or record one complete cycle of the selected state as a WebM clip.

The layered eyes track the pointer with damped motion, blink naturally, and adopt animation-specific gaze and eyebrow poses. The exported loop remains deterministic once the pointer is left still.

## Shortcuts

- `1` to `9`: select the matching state
- `0`: pixel transition
- `F`, `R`, `L`: front, right, and left presentation views
- `S`: save a PNG
