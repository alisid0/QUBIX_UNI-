# Qubix Switch and Machine Short

A 58-second vertical pixel-game lesson about functions.

The Short first shows how a light switch maps each position to one light state. It then compares two drink-machine buttons and asks the viewer which one follows the same rule.

## Format

- 1080 x 1920, 9:16
- 58 seconds
- VP9 WebM with Opus audio
- No music and no voice-over
- Gentle taps, toggles, and reveal tones only

## Render

From `current-app`:

```powershell
$env:QUBIX_CHROMIUM_PATH = 'path-to-chrome.exe'
node shorts/functions/switch-machine-story/render.mjs
```

The output is `qubix-switch-machine-function-short.webm` in this directory.

Open `index.html?frame=29` through a local server to inspect a specific point in the timeline.
