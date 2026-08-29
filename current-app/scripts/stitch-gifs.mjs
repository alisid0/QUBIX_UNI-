/**
 * Stitches frame PNGs into animated GIFs using ffmpeg.
 * Reads from public/media/frames/bb-XXXX/fY/frame-N.png
 * Writes to  public/media/bb-XXXX-fY.gif
 *
 * Usage:
 *   node scripts/stitch-gifs.mjs           # stitch everything
 *   node scripts/stitch-gifs.mjs --bb 1000 # one BB
 *   node scripts/stitch-gifs.mjs --fps 0.8 # custom frame rate (default 1 fps)
 */

import { execSync }   from 'child_process';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join }       from 'path';

const FRAMES_DIR = join(process.cwd(), 'public/media/frames');
const OUT_DIR    = join(process.cwd(), 'public/media');

const args    = process.argv.slice(2);
const bbIdx   = args.indexOf('--bb');
const fpsIdx  = args.indexOf('--fps');
const bbArg   = bbIdx  >= 0 ? parseInt(args[bbIdx + 1])    : null;
const fps     = fpsIdx >= 0 ? parseFloat(args[fpsIdx + 1]) : 1.0;

if (!existsSync(FRAMES_DIR)) {
  console.error('No frames directory found. Run generate-frames.mjs first.');
  process.exit(1);
}

// Find all bb-XXXX directories
const bbDirs = readdirSync(FRAMES_DIR)
  .filter(d => d.startsWith('bb-'))
  .filter(d => bbArg ? d === `bb-${bbArg}` : true)
  .sort();

let built = 0;

for (const bbDir of bbDirs) {
  const bbNum    = bbDir.replace('bb-', '');
  const bbPath   = join(FRAMES_DIR, bbDir);
  const floorDirs = readdirSync(bbPath).filter(d => d.startsWith('f')).sort((a,b) => {
    return parseInt(a.slice(1)) - parseInt(b.slice(1));
  });

  for (const floorDir of floorDirs) {
    const floorNum  = floorDir.slice(1);
    const floorPath = join(bbPath, floorDir);
    const frames    = readdirSync(floorPath)
      .filter(f => f.endsWith('.png'))
      .sort((a, b) => {
        const na = parseInt(a.match(/\d+/)[0]);
        const nb = parseInt(b.match(/\d+/)[0]);
        return na - nb;
      });

    if (frames.length === 0) continue;

    const outGif = join(OUT_DIR, `bb-${bbNum}-f${floorNum}.gif`);

    // Build ffmpeg command
    // Input: each PNG as a separate input at the given framerate
    const inputs = frames.map(f => `-loop 1 -t ${1/fps} -i "${join(floorPath, f)}"`).join(' ');

    // Filter: scale to 480px wide, palette for quality
    const filterIn  = frames.map((_, i) => `[${i}:v]`).join('');
    const filterCmd = `${filterIn}concat=n=${frames.length}:v=1:a=0[concat];` +
                      `[concat]scale=480:-1:flags=lanczos,split[s0][s1];` +
                      `[s0]palettegen=max_colors=64[pal];[s1][pal]paletteuse[out]`;

    const cmd = `ffmpeg -y ${inputs} -filter_complex "${filterCmd}" -map "[out]" "${outGif}"`;

    try {
      console.log(`🎞  BB ${bbNum} Floor ${floorNum} (${frames.length} frames) → bb-${bbNum}-f${floorNum}.gif`);
      execSync(cmd, { stdio: 'pipe' });
      built++;
      console.log(`   ✓ ${outGif.replace(process.cwd(), '.')}`);
    } catch (err) {
      console.error(`   ✗ ffmpeg failed: ${err.message}`);
    }
  }
}

console.log(`\n✅ Built ${built} GIF(s) in public/media/`);
console.log('\nNext step: wire GIFs into src/lib/content/boardMedia.js');
console.log('  e.g.  1000: { 0: { type: "gif", src: "/media/bb-1000-f0.gif" } }');
