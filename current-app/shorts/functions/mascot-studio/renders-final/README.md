# Qubix cube animation pack

Thirteen delivery-ready mascot clips rendered from one canonical Three.js model.

## Format

- VP9 WebM with alpha
- 270 × 480, vertical 9:16
- No audio
- One complete animation cycle per file

These are the bandwidth-conscious delivery copies. Keep the 540 × 960 masters
in `../renders/`. For a 1080 × 1920 Short, scale by exactly 4× with
nearest-neighbour filtering; the app and website may render them at any smaller
layout size.

## Clips

| File | Intended use |
| --- | --- |
| `qubix-cube-idle.webm` | Resting and blinking |
| `qubix-cube-curious.webm` | Inspecting a concept |
| `qubix-cube-face-front.webm` | Neutral front presentation shot |
| `qubix-cube-face-right.webm` | Right-facing presentation turn |
| `qubix-cube-face-left.webm` | Left-facing presentation turn |
| `qubix-cube-think.webm` | Working through an idea |
| `qubix-cube-surprise.webm` | Unexpected result |
| `qubix-cube-celebrate.webm` | Meaningful completion |
| `qubix-cube-error.webm` | Friendly retry |
| `qubix-cube-point-left.webm` | Direct attention left |
| `qubix-cube-point-right.webm` | Direct attention right |
| `qubix-cube-press.webm` | Demonstrate an interaction |
| `qubix-cube-transition.webm` | Produced-media scene change |

The three presentation views remain studio/shorts assets. The ten intent states
plus `qubix-cube-idle.png` are copied into each app's
`public/media/mascot/` directory for interface use.
