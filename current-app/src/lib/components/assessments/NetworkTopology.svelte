<script>
  // Generic topology stage for Save the Broadcast. Data-driven so every phase
  // reuses it: nodes (sender / junction / receiver / relay), routes (with a
  // capacity and travel-tick label and a clear|congested|failed state), and
  // pieces shown as small chips at whichever node currently holds them.
  //
  // Route state is never conveyed by colour alone: failed routes are dashed
  // and labelled "down", congested routes are thick and labelled "busy". A
  // live aria-label summarises the whole stage for screen readers.
  export let nodes = [];    // [{ id, label, x, y, role }]  role: sender|junction|receiver|relay
  export let routes = [];   // [{ id, a, b, cap, tick, state, mark }]  state: clear|congested|failed
  export let pieces = [];   // [{ id, label, nodeId, tone }]  tone: pending|done|stalled
  export let caption = 'Network stage';

  const W = 300, H = 176;
  $: nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));
  $: piecesByNode = nodes.reduce((acc, n) => {
    acc[n.id] = pieces.filter((p) => p.nodeId === n.id);
    return acc;
  }, {});
</script>

<svg class="topology" viewBox="0 0 {W} {H}" role="img" aria-label={caption}>
  <rect x="0" y="0" width={W} height={H} rx="12" fill="var(--qx-surface-elevated)" />

  <!-- routes -->
  {#each routes as r}
    {@const a = nodeById[r.a]}
    {@const b = nodeById[r.b]}
    {#if a && b}
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
        stroke={r.state === 'failed' ? 'var(--qx-danger)' : r.state === 'congested' ? 'var(--qx-accent)' : 'var(--qx-text-faint)'}
        stroke-width={r.state === 'congested' ? 5 : 2.4}
        stroke-dasharray={r.state === 'failed' ? '5,5' : 'none'}
        stroke-linecap="round" />
      <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 6} text-anchor="middle" font-size="8" font-weight="500"
        fill="var(--qx-text-dim)" font-family="var(--qx-font)">
        {r.state === 'failed' ? 'down' : r.state === 'congested' ? 'busy' : ''}{r.mark ? ` ${r.mark}` : ''}
      </text>
      <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 11} text-anchor="middle" font-size="8.5" font-weight="500"
        fill="var(--qx-text-dim)" font-family="var(--qx-font)">cap {r.cap} · {r.tick} ticks</text>
    {/if}
  {/each}

  <!-- nodes -->
  {#each nodes as n}
    {#if n.role === 'junction'}
      <rect x={n.x - 13} y={n.y - 13} width="26" height="26" rx="6" fill="var(--qx-surface)" stroke="var(--qx-text-2)" stroke-width="1.6" transform={`rotate(45 ${n.x} ${n.y})`} />
    {:else}
      <rect x={n.x - 20} y={n.y - 14} width="40" height="28" rx="7"
        fill={n.role === 'receiver' ? 'var(--qx-accent-soft)' : 'var(--qx-surface)'}
        stroke={n.role === 'receiver' ? 'var(--qx-accent)' : 'var(--qx-text-2)'} stroke-width="1.6" />
    {/if}
    <text x={n.x} y={n.role === 'junction' ? n.y + 26 : n.y + 3} text-anchor="middle" font-size="8" font-weight="500"
      fill="var(--qx-text)" font-family="var(--qx-font)">{n.label}</text>
    <!-- chips held at this node — soft fill + matching text token (no hardcoded colour) -->
    {#each piecesByNode[n.id] || [] as p, i}
      {@const fillTok = p.tone === 'done' ? 'var(--qx-green-soft)' : p.tone === 'stalled' ? 'var(--qx-danger-soft)' : 'var(--qx-accent-soft)'}
      {@const textTok = p.tone === 'done' ? 'var(--qx-green-text)' : p.tone === 'stalled' ? 'var(--qx-danger-text)' : 'var(--qx-accent-text)'}
      {@const strokeTok = p.tone === 'done' ? 'var(--qx-green)' : p.tone === 'stalled' ? 'var(--qx-danger)' : 'var(--qx-accent)'}
      <g transform={`translate(${n.x - 18 + (i % 3) * 13}, ${n.y - 25 - Math.floor(i / 3) * 13})`}>
        <rect x="0" y="0" width="12" height="11" rx="2.5" fill={fillTok} stroke={strokeTok} stroke-width="0.8" />
        <text x="6" y="8.5" text-anchor="middle" font-size="7.5" font-weight="700" fill={textTok} font-family="var(--qx-font)">{p.label}</text>
      </g>
    {/each}
  {/each}
</svg>

<style>
  .topology { display: block; width: 100%; max-width: 320px; margin: 0 auto 6px; border-radius: var(--qx-radius-md); }
</style>
