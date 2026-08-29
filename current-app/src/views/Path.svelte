<script>
  // Path tab — the four gateways (Line / Atom / Bit / Unit), each with its
  // covered (live) topics and greyed future topics from ROADMAP. Replaces the
  // old flat Topics browser (blueprint §5.4).
  import { PATHS, PATH_GROUPS, ROADMAP } from '../lib/content/paths.js';
  import { progress } from '../lib/stores/progress.js';
  import SubjectMark from '../lib/components/SubjectMark.svelte';

  export let onNavigate;
  let activeGateway = 'line';

  const GATEWAY_META = {
    line: { icon: '/icons/gateways/line.png', tagline: 'Space & abstraction' },
    atom: { icon: '/icons/gateways/atom.png', tagline: 'Matter & charge' },
    bit:  { icon: '/icons/gateways/bit.png',  tagline: 'Information & logic' },
    unit: { icon: '/icons/gateways/unit.png', tagline: 'Measurement & scale' }
  };

  $: gateways = ($progress, Object.entries(PATH_GROUPS).map(([gid, g]) => {
    const topics = g.paths.filter(id => PATHS[id]).map(id => ({
      id, manifest: PATHS[id], state: progress.getPathState(id, PATHS[id])
    }));
    const read = topics.reduce((a, t) => a + (t.state.boardsRead || 0), 0);
    const total = topics.reduce((a, t) => a + (t.state.boardsTotal || 0), 0);
    return { gid, ...g, ...GATEWAY_META[gid], topics, read, total, roadmap: ROADMAP[gid] || [] };
  }));
  $: selectedGateway = gateways.find((gateway) => gateway.gid === activeGateway) || gateways[0];

  function chip(state) {
    if (!state.boardsRead) return 'Not started';
    if (state.boardsTotal && state.boardsRead >= state.boardsTotal) return 'Done ✓';
    return `${state.boardsRead}/${state.boardsTotal}`;
  }
</script>

<div class="qx-shell path-tab">
  <div class="path-header">
    <div class="path-kicker">Curriculum</div>
    <h1>Path</h1>
    <p class="header-sub">Choose a discipline and build depth at your own pace.</p>
  </div>

  <div class="subject-tabs" role="tablist" aria-label="Choose a discipline">
    {#each gateways as gateway (gateway.gid)}
      <button
        role="tab"
        aria-selected={activeGateway === gateway.gid}
        class:active={activeGateway === gateway.gid}
        on:click={() => activeGateway = gateway.gid}
      >
        <SubjectMark subject={gateway.icon} size={26} />
        <span>{gateway.name}</span>
        <small>{gateway.read}/{gateway.total}</small>
      </button>
    {/each}
  </div>

  {#if selectedGateway}
    {@const g = selectedGateway}
    <section class="gateway-block">
      <div class="gw-head">
        <span class="gw-icon"><SubjectMark subject={g.icon} size={42} /></span>
        <div class="gw-info">
          <div class="gw-name">{g.name}</div>
          <div class="gw-tagline">{g.tagline}</div>
        </div>
        <span class="gw-progress">{g.read}/{g.total}</span>
      </div>
      <div class="gw-meter" aria-hidden="true">
        <span style={`width:${g.total ? Math.round((g.read / g.total) * 100) : 0}%`}></span>
      </div>

      <div class="topic-grid">
        {#each g.topics as t, index (t.id)}
          <button class="topic-tile" on:click={() => onNavigate?.('topicDetail', t.id)}>
            <span class="tile-index">{String(index + 1).padStart(2, '0')}</span>
            <span class="tile-name">{t.manifest.name}</span>
            <span class="tile-meta">{t.state.boardsTotal} boards</span>
            <span class="tile-chip"
              class:started={t.state.boardsRead > 0}
              class:done={t.state.boardsTotal > 0 && t.state.boardsRead >= t.state.boardsTotal}>
              {chip(t.state)}
            </span>
            <span class="row-chev">›</span>
          </button>
        {/each}

        {#each g.roadmap as name, index}
          <div class="topic-tile future">
            <span class="tile-index">{String(g.topics.length + index + 1).padStart(2, '0')}</span>
            <span class="tile-name">{name}</span>
            <span class="soon-chip">Soon</span>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .path-tab { height: 100%; overflow-y: auto; padding: clamp(20px, 4vw, 34px) var(--qx-page-pad) 32px; box-sizing: border-box; }
  .path-header { margin-bottom: clamp(24px, 5vw, 40px); }
  .path-kicker { margin-bottom: 4px; color: var(--qx-accent-text); font-size: 9px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
  h1 { font-size: clamp(26px, 4vw, 34px); font-weight: 900; color: var(--qx-text); margin: 0; letter-spacing: -.035em; }
  .header-sub { max-width: 42ch; font-size: 13px; color: var(--qx-text-dim); margin: 4px 0 0; line-height: 1.45; }

  .subject-tabs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: -12px 0 18px; }
  .subject-tabs button {
    min-height: 54px; display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; align-items: center; gap: 8px;
    padding: 9px 11px; border: 1px solid var(--qx-border); border-radius: 14px;
    background: var(--qx-surface); color: var(--qx-text-dim); font: 800 11px var(--qx-font); text-align: left; cursor: pointer;
  }
  .subject-tabs button.active { border-color: var(--qx-accent); background: var(--qx-accent-soft-2); color: var(--qx-text); }
  .subject-tabs small { color: var(--qx-text-faint); font-size: 9px; font-variant-numeric: tabular-nums; }

  .gateway-block {
    margin-bottom: 18px;
    padding: clamp(15px, 3vw, 20px);
    border: 1px solid var(--qx-border);
    border-radius: 24px;
    background: color-mix(in srgb, var(--qx-surface) 72%, transparent);
    box-shadow: var(--qx-shadow-card);
  }
  .gw-head { display: flex; align-items: center; gap: 12px; margin-bottom: 9px; }
  .gw-icon { flex-shrink: 0; display: block; }
  .gw-info { flex: 1; min-width: 0; }
  .gw-name { font-size: 17px; font-weight: 900; color: var(--qx-text); line-height: 1.2; letter-spacing: -.02em; }
  .gw-tagline { font-size: 11px; font-weight: 650; color: var(--qx-text-faint); margin-top: 2px; }
  .gw-progress { font-size: 11px; font-weight: 850; color: var(--qx-text-dim); font-variant-numeric: tabular-nums; }
  .gw-meter { height: 3px; margin: 0 0 14px 54px; overflow: hidden; border-radius: 99px; background: var(--qx-surface-3); }
  .gw-meter span { display: block; height: 100%; border-radius: inherit; background: var(--qx-accent); }

  .topic-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 7px;
  }
  .topic-tile {
    min-height: 82px;
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr) auto;
    grid-template-rows: auto auto;
    align-items: center;
    column-gap: 11px;
    row-gap: 2px;
    width: 100%; text-align: left;
    padding: 11px 12px; border-radius: 16px;
    border: 1px solid transparent; background: var(--qx-surface);
    cursor: pointer; font-family: var(--qx-font);
    box-shadow: 0 1px 0 color-mix(in srgb, var(--qx-border) 70%, transparent);
  }
  .topic-tile:not(.future):hover { border-color: var(--qx-accent); background: var(--qx-accent-soft-2); transform: translateY(-1px); }
  .tile-index {
    grid-row: 1 / 3;
    width: 34px; height: 34px; border-radius: 10px; background: var(--qx-surface-2); color: var(--qx-text-dim);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 10px; font-weight: 900; font-variant-numeric: tabular-nums;
  }
  .tile-name {
    grid-column: 2;
    align-self: end;
    font-size: 13px; font-weight: 850; color: var(--qx-text);
    line-height: 1.22; overflow-wrap: anywhere;
  }
  .tile-meta { grid-column: 2; align-self: start; font-size: 10px; font-weight: 650; color: var(--qx-text-faint); }
  .tile-chip {
    grid-column: 3; grid-row: 1 / 3;
    font-size: 9.5px; font-weight: 800; color: var(--qx-text-faint);
    background: transparent; padding: 4px 2px; flex-shrink: 0;
  }
  .tile-chip.started { color: var(--qx-accent-text); }
  .tile-chip.done { color: var(--qx-green-text); }
  .row-chev { display: none; }

  .topic-tile.future { cursor: default; opacity: 0.58; background: transparent; border-color: var(--qx-border); border-style: dashed; box-shadow: none; }
  .topic-tile.future .tile-name { color: var(--qx-text-dim); font-weight: 700; }
  .soon-chip {
    grid-column: 3; grid-row: 1 / 3;
    font-size: 9px; font-weight: 850; letter-spacing: 0.06em; color: var(--qx-text-faint);
    text-transform: uppercase; flex-shrink: 0;
  }

  @media (min-width: 620px) {
    .subject-tabs { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .topic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .gateway-block { margin-bottom: 22px; }
  }

  /* ── Desktop ── */
  @media (min-width: 900px) {
    .path-tab { padding: 40px 48px 32px; max-width: 1100px; margin: 0 auto; }
    .path-header { margin-bottom: 48px; }
    .subject-tabs { margin-top: -28px; margin-bottom: 24px; }
    h1 { font-size: 38px; }
    .header-sub { font-size: 15px; }
    .topic-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .topic-tile { min-height: 94px; padding: 14px 16px; }
    .tile-name { font-size: 14px; }
    .gateway-block { padding: 24px 28px; margin-bottom: 26px; }
    .gw-head { gap: 14px; }
    .gw-name { font-size: 20px; }
  }
</style>
