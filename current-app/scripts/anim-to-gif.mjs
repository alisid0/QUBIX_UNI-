#!/usr/bin/env node
/**
 * anim-to-gif.mjs — convert a Manim (or any) mp4 into a high-quality, looping GIF
 * using ffmpeg's two-pass palettegen / paletteuse. Output lands next to the input.
 *
 *   node scripts/anim-to-gif.mjs public/videos/cg08_theatre_seats.mp4
 *   node scripts/anim-to-gif.mjs <in.mp4> [fps=15] [width=640]
 *
 * Full pipeline for a new animation:
 *   1. Author the scene in manim_anims/<name>.py (import from strata_theme).
 *   2. Render:  .venv/Scripts/manim render -qm manim_anims/<name>.py <SceneClass>
 *   3. Copy the produced mp4 into public/videos/<name>.mp4
 *   4. node scripts/anim-to-gif.mjs public/videos/<name>.mp4
 *   5. Add a boardMedia.js entry: { 0: { type:'img', src:'/videos/<name>.gif' } }
 *
 * ffmpeg is taken from PATH; override with the FFMPEG env var if needed.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, basename, extname } from 'node:path';

const [input, fpsArg, widthArg] = process.argv.slice(2);
if (!input || !existsSync(input)) {
  console.error('Usage: node scripts/anim-to-gif.mjs <in.mp4> [fps=15] [width=640]');
  process.exit(1);
}
const fps = fpsArg || '15';
const width = widthArg || '640';
const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const out = join(dirname(input), basename(input, extname(input)) + '.gif');
const tmp = mkdtempSync(join(tmpdir(), 'anim-'));
const palette = join(tmp, 'palette.png');
const filters = `fps=${fps},scale=${width}:-1:flags=lanczos`;

try {
  // Pass 1: build an optimal palette from the whole clip.
  execFileSync(ffmpeg, ['-y', '-i', input, '-vf', `${filters},palettegen=stats_mode=diff`, palette], { stdio: 'inherit' });
  // Pass 2: apply it with light dithering for smooth gradients at small file size.
  execFileSync(ffmpeg, ['-y', '-i', input, '-i', palette, '-lavfi', `${filters}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3`, out], { stdio: 'inherit' });
  console.log('\n✓ wrote', out);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
