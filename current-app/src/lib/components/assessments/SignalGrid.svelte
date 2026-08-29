<script>
  // Movement stage for Find the Signal. Renders the blacked-out rescue map: a
  // home marker, the locator drone, rescue signals, and an optional L-shaped
  // route trace. Vocabulary is staged by `mode`:
  //   plain  — blocks + home marker only, no numbers or axis letters
  //   signed — adds the console's compact +/-/0 numbers along the two tunnels
  //   formal — the reveal: adds x / y letters, the origin label, and quadrants
  // It never prints "x", "y", "axis", "origin" or "quadrant" before mode=formal.
  export let drone = null;        // { x, y } | null
  export let signals = [];        // [{ x, y, label?, found?, faint? }]
  export let trace = [];          // [{ x, y }] polyline points (grid coords)
  export let mode = 'plain';      // 'plain' | 'signed' | 'formal'
  export let showColumn = null;   // highlight a whole vertical tunnel at this x
  export let caption = '';        // accessible description of the current state
  export let scanStatus = 'SCANNING';

  const R = 4;                    // grid spans -4..4
  const CX = 120, CY = 120, CELL = 26;
  const gx = (x) => CX + x * CELL;
  const gy = (y) => CY - y * CELL;
  const ticks = [-4, -3, -2, -1, 1, 2, 3, 4];

  $: tracePath = trace.length
    ? trace.map((p, i) => `${i === 0 ? 'M' : 'L'}${gx(p.x)},${gy(p.y)}`).join(' ')
    : '';
  $: quadrants = mode === 'formal'
    ? [
        { t: 'I', x: 2.4, y: 2.4 }, { t: 'II', x: -2.4, y: 2.4 },
        { t: 'III', x: -2.4, y: -2.4 }, { t: 'IV', x: 2.4, y: -2.4 }
      ]
    : [];
</script>

<svg class="signal-grid" viewBox="0 0 240 240" role="img" aria-label={caption || 'Rescue map'}>
  <defs>
    <linearGradient id="gridBackdrop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--qx-surface-elevated)" />
      <stop offset="0.55" stop-color="var(--qx-surface-2)" />
      <stop offset="1" stop-color="var(--qx-accent-soft)" />
    </linearGradient>
    <radialGradient id="gridRadar">
      <stop offset="0" stop-color="var(--qx-accent)" stop-opacity=".18" />
      <stop offset="1" stop-color="var(--qx-accent)" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="radarBeam" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="var(--qx-green)" stop-opacity=".04" />
      <stop offset=".72" stop-color="var(--qx-green)" stop-opacity=".18" />
      <stop offset="1" stop-color="var(--qx-green)" stop-opacity=".45" />
    </linearGradient>
    <clipPath id="radarClip">
      <rect x="4" y="4" width="232" height="232" rx="11" />
    </clipPath>
  </defs>
  <rect x="0" y="0" width="240" height="240" rx="14" fill="url(#gridBackdrop)" />
  <circle cx="120" cy="120" r="108" fill="url(#gridRadar)" />
  <rect x="1" y="1" width="238" height="238" rx="13" fill="none" stroke="var(--qx-border-2)" stroke-width="1.5" />

  <!-- block grid -->
  {#each Array(2 * R + 1) as _, i}
    <line x1={gx(i - R)} y1={gy(-R)} x2={gx(i - R)} y2={gy(R)} stroke="var(--qx-border)" stroke-width="0.6" opacity="0.5" />
    <line x1={gx(-R)} y1={gy(i - R)} x2={gx(R)} y2={gy(i - R)} stroke="var(--qx-border)" stroke-width="0.6" opacity="0.5" />
  {/each}

  <!-- active 2D radar layer -->
  <g class="range-rings" aria-hidden="true">
    {#each [26, 52, 78, 104] as radius}
      <circle cx="120" cy="120" r={radius} fill="none" stroke="var(--qx-green)" stroke-width=".7" stroke-dasharray="3 5" opacity=".22" />
    {/each}
  </g>
  <g class="radar-sweep" clip-path="url(#radarClip)" aria-hidden="true">
    <path d="M120 120 L120 12 A108 108 0 0 1 218 74 Z" fill="url(#radarBeam)" />
    <line x1="120" y1="120" x2="120" y2="12" stroke="var(--qx-green)" stroke-width="1.2" opacity=".72" />
  </g>
  <g class="scan-chip" aria-hidden="true">
    <rect x="8" y="8" width="64" height="18" rx="7" fill="var(--qx-surface)" stroke="var(--qx-green)" stroke-width=".8" />
    <circle cx="18" cy="17" r="2.5" fill="var(--qx-green)" />
    <text x="25" y="20" font-size="7" font-weight="800" letter-spacing=".5"
      fill="var(--qx-green-text)" font-family="var(--qx-font)">{scanStatus}</text>
  </g>

  {#if quadrants.length}
    {#each quadrants as q}
      <text x={gx(q.x)} y={gy(q.y)} text-anchor="middle" font-size="10" font-weight="500"
        fill="var(--qx-text-faint)" font-family="var(--qx-font)">{q.t}</text>
    {/each}
  {/if}

  {#if showColumn !== null}
    <rect x={gx(showColumn) - CELL / 2} y={gy(R)} width={CELL} height={2 * R * CELL}
      fill="var(--qx-accent-soft)" opacity="0.5" />
  {/if}

  <!-- the two tunnels through home -->
  <line x1={gx(-R)} y1={gy(0)} x2={gx(R)} y2={gy(0)} stroke="var(--qx-text-faint)" stroke-width="1.6" />
  {#if mode !== 'plain'}
    <line x1={gx(0)} y1={gy(-R)} x2={gx(0)} y2={gy(R)} stroke="var(--qx-text-faint)" stroke-width="1.6" />
  {/if}

  <!-- compact +/-/0 numbers (signed and formal) -->
  {#if mode !== 'plain'}
    {#each ticks as t}
      <text x={gx(t)} y={gy(0) + 12} text-anchor="middle" font-size="8.5" font-weight="500"
        fill="var(--qx-text-dim)" font-family="var(--qx-font)">{t > 0 ? `+${t}` : t}</text>
      <text x={gx(0) - 9} y={gy(t) + 3} text-anchor="end" font-size="8.5" font-weight="500"
        fill="var(--qx-text-dim)" font-family="var(--qx-font)">{t > 0 ? `+${t}` : t}</text>
    {/each}
    <text x={gx(0) - 6} y={gy(0) + 12} text-anchor="end" font-size="8.5" font-weight="500"
      fill="var(--qx-text-dim)" font-family="var(--qx-font)">0</text>
  {/if}

  <!-- formal axis letters -->
  {#if mode === 'formal'}
    <text x={gx(R) - 3} y={gy(0) - 6} text-anchor="end" font-size="12" font-style="italic" font-weight="500" fill="var(--qx-text-2)" font-family="var(--qx-font)">x</text>
    <text x={gx(0) + 8} y={gy(R) + 8} text-anchor="start" font-size="12" font-style="italic" font-weight="500" fill="var(--qx-text-2)" font-family="var(--qx-font)">y</text>
  {/if}

  <!-- route trace -->
  {#if tracePath}
    <path d={tracePath} fill="none" stroke="var(--qx-accent)" stroke-width="2" stroke-dasharray="5,4" stroke-linecap="round" stroke-linejoin="round" />
  {/if}

  <!-- signals -->
  {#each signals as s}
    <g class="signal" class:found={s.found} opacity={s.faint ? 0.55 : 1}>
      <circle class="signal-pulse" cx={gx(s.x)} cy={gy(s.y)} r="10"
        fill="none" stroke={s.found ? 'var(--qx-green)' : 'var(--qx-danger)'} stroke-width="1" />
      <circle cx={gx(s.x)} cy={gy(s.y)} r={s.found ? 6 : 5}
        fill={s.found ? 'var(--qx-green)' : 'var(--qx-danger)'}
        stroke="var(--qx-surface-elevated)" stroke-width="2" />
      {#if s.label}
        <text x={gx(s.x)} y={gy(s.y) - 9} text-anchor="middle" font-size="8.5" font-weight="500"
          fill="var(--qx-text)" font-family="var(--qx-font)">{s.label}{#if mode === 'formal'} ({s.x}, {s.y}){/if}</text>
      {/if}
    </g>
  {/each}

  <!-- home marker -->
  <circle cx={gx(0)} cy={gy(0)} r="7" fill="none" stroke="var(--qx-text-2)" stroke-width="1.6" />
  <circle cx={gx(0)} cy={gy(0)} r="2.4" fill="var(--qx-text-2)" />
  {#if mode === 'formal'}
    <text x={gx(0) - 8} y={gy(0) + 14} text-anchor="end" font-size="8.5" font-weight="500" fill="var(--qx-text-dim)" font-family="var(--qx-font)">origin (0, 0)</text>
  {/if}

  <!-- drone -->
  {#if drone}
    <g class="drone">
      <circle class="drone-ring" cx={gx(drone.x)} cy={gy(drone.y)} r="13" fill="none" stroke="var(--qx-accent)" stroke-width="1" />
      <line x1={gx(drone.x) - 12} y1={gy(drone.y)} x2={gx(drone.x) + 12} y2={gy(drone.y)} stroke="var(--qx-accent)" stroke-width=".8" />
      <line x1={gx(drone.x)} y1={gy(drone.y) - 12} x2={gx(drone.x)} y2={gy(drone.y) + 12} stroke="var(--qx-accent)" stroke-width=".8" />
      <circle cx={gx(drone.x)} cy={gy(drone.y)} r="8" fill="var(--qx-accent-soft)" stroke="var(--qx-accent)" stroke-width="1.6" />
      <circle cx={gx(drone.x)} cy={gy(drone.y)} r="3" fill="var(--qx-accent)" />
    </g>
  {/if}
</svg>

<style>
  .signal-grid { display: block; width: 100%; max-width: 330px; margin: 0 auto; border-radius: 14px; filter: drop-shadow(0 14px 24px color-mix(in srgb, var(--qx-accent) 12%, transparent)); }
  .drone { transition: transform .3s ease; }
  .radar-sweep { transform-origin: 120px 120px; animation: radar-sweep 3.4s linear infinite; }
  .scan-chip circle { animation: scan-led 1s ease-in-out infinite alternate; }
  .drone-ring { transform-origin: center; animation: radar-spin 2.4s linear infinite; stroke-dasharray: 6 5; }
  .signal-pulse { transform-origin: center; animation: signal-pulse 1.8s ease-out infinite; }
  .signal circle { transition: fill .2s ease; }
  @keyframes signal-pulse {
    0% { opacity: .8; transform: scale(.6); }
    75%, 100% { opacity: 0; transform: scale(1.7); }
  }
  @keyframes radar-spin { to { transform: rotate(360deg); } }
  @keyframes radar-sweep { to { transform: rotate(360deg); } }
  @keyframes scan-led { to { opacity: .35; } }
  @media (max-width: 430px) {
    .signal-grid { max-width: 250px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .drone { transition: none; }
    .radar-sweep, .scan-chip circle, .drone-ring, .signal-pulse { animation: none; }
  }
</style>
