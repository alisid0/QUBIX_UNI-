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

The stage is a low-resolution 9:16 WebGL canvas enlarged with nearest-neighbour rendering. Backgrounds can be navy, cream, or transparent. Use the controls to save a PNG or record one complete cycle of the selected state as a WebM clip.

## Shortcuts

- `1` to `9`: select the matching state
- `0`: pixel transition
- `S`: save a PNG
