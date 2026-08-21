<script>
  import { PATHS, SUBJECT_PATHS, totalBoards } from '../lib/content/paths.js';
  import { progress } from '../lib/stores/progress.js';
  import SubjectMark from '../lib/components/SubjectMark.svelte';

  export let onNavigate; // (view, args?) => void

  const TOTAL = totalBoards();
  const SUBJECT_ORDER = ['physics', 'maths', 'chemistry'];

  // The Map is its own always-dark surface, so these are literal colours drawn
  // from the locked 5-colour palette (dark-tuned): Clay #D28A5E, Olive #6BC93F,
  // warm neutrals. Ladder reads neutral -> Clay (checked) -> Olive (read/mastered).
  const STATES = {
    mastered_2: { mark: '#F2EADB', fill: '#6BC93F', border: 'none',                 glow: true,  badge: '✓2', label: '★ Mastered ×2', labelColor: '#6BC93F' },
    mastered_1: { mark: '#F2EADB', fill: '#6BC93F', border: 'none',                 glow: false, badge: '✓',  label: '★ Mastered ×1', labelColor: '#6BC93F' },
    well_read:  { mark: '#6BC93F', fill: '#201B12', border: '2.5px solid #6BC93F',  glow: false, badge: '',   label: '✓ Well read',   labelColor: '#6BC93F' },
    recalled:   { mark: '#6BC93F', fill: '#201B12', border: '2.5px solid #6BC93F',  glow: false, badge: '',   label: '↻ Recalled',    labelColor: '#6BC93F' },
    checked:    { mark: '#D28A5E', fill: '#241E14', border: '2.5px solid #D28A5E',  glow: false, badge: '',   label: '● Checked',      labelColor: '#D28A5E' },
    wandered:   { mark: '#8C8573', fill: '#201B12', border: '2px dashed #8C8573',   glow: false, badge: '',   label: '· In progress',  labelColor: '#8C8573' },
    unwandered: { mark: '#6F6656', fill: '#1B160E', border: '2px dotted #4A4436',   glow: false, badge: '',   label: 'Start here',     labelColor: '#6F6656' }
  };

  function buildEntries() {
    const ids = SUBJECT_ORDER.flatMap(subj => SUBJECT_PATHS[subj] || []);
    return ids
      .filter(id => PATHS[id])
      .map(id => ({ id, manifest: PATHS[id], state: progress.getPathState(id, PATHS[id]) }));
  }

  // Reference $progress so the trail recomputes if mastery changes while viewing.
  $: entries = ($progress, buildEntries());
  $: engaged = entries.filter(e => e.state.state !== 'unwandered');
  $: nextGoal = entries.find(e => e.state.state === 'unwandered') || null;
  $: trail = nextGoal ? [...engaged, nextGoal] : engaged;

  // "YOU ARE HERE": the most-progressed path that's still in progress (mirrors Home).
  $: current = engaged
    .filter(e => e.state.boardsRead > 0 && e.state.boardsRead < e.state.boardsTotal)
    .sort((a, b) => b.state.boardsRead - a.state.boardsRead)[0] || null;

  $: read = ($progress, progress.getOverall().read);
  $: level = 1 + Math.floor(read / 5);
  $: pct = TOTAL ? Math.min(100, (read / TOTAL) * 100) : 0;

  function st(stateKey) {
    return STATES[stateKey] || STATES.wandered;
  }
  function boardsLine(e) {
    if (e.state.state === 'unwandered') return `${e.state.boardsTotal} boards`;
    return `${e.state.boardsRead} / ${e.state.boardsTotal} boards`;
  }
</script>

<div class="map-view">
  <div class="map-header">
    <div class="title-row">
      <h1>The Map</h1>
      <div class="level">Level {level} · {read}/{TOTAL}</div>
    </div>
    <div class="progress"><div class="progress-fill" style="width:{pct}%"></div></div>
  </div>

  {#if engaged.length === 0}
    <div class="empty">
      <div class="empty-mark"><SubjectMark subject="physics" accent="#D28A5E" size={56} /></div>
      <div class="empty-title">Your map starts here</div>
      <div class="empty-sub">Open your first topic — every board you read becomes a stop on the trail, and nothing ever resets.</div>
      <button class="empty-cta" on:click={() => onNavigate?.('topics')}>Browse topics</button>
    </div>
  {:else}
    <div class="trail">
      <div class="trail-line"></div>
      {#each trail as e, i (e.id)}
        {@const s = st(e.state.state)}
        {@const here = current && e.id === current.id}
        {@const right = i % 2 === 0}
        <div class="stop" class:here>
          <!-- label -->
          <div
            class="label"
            class:label-right={right}
            class:label-left={!right}
            class:current={here}
            on:click={() => onNavigate?.('topicDetail', e.id)}
            on:keydown={(ev) => ev.key === 'Enter' && onNavigate?.('topicDetail', e.id)}
            role="button"
            tabindex="0"
          >
            <div class="label-name">{e.manifest.name}</div>
            <div class="label-boards">{boardsLine(e)}</div>
            <div class="label-state" style="color:{here ? '#D28A5E' : s.labelColor}">
              {here ? '● In progress' : s.label}
            </div>
          </div>

          <!-- node -->
          <button
            class="node"
            class:glow={s.glow}
            class:pulse={here}
            style="background:{s.fill};border:{here ? '2.5px dashed #D28A5E' : s.border};{s.glow ? 'box-shadow:0 0 0 3px rgba(134,184,99,0.22),0 0 16px rgba(134,184,99,0.4);' : ''}"
            on:click={() => onNavigate?.('topicDetail', e.id)}
            aria-label={e.manifest.name}
          >
            {#if here}<span class="here-pill">YOU ARE HERE</span>{/if}
            <SubjectMark subject={e.manifest.subject} accent={here ? '#D28A5E' : s.mark} size={33} />
            {#if s.badge}<span class="badge" style="color:{s.fill};">{s.badge}</span>{/if}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .map-view {
    height: 100%;
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background: radial-gradient(ellipse at 50% 6%, #241E13, #14110B 82%), #17140D;
    color: #F2EADB;
    font-family: var(--qx-font);
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  .map-header { padding: 18px 22px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); flex-shrink: 0; }
  .title-row { display: flex; justify-content: space-between; align-items: baseline; }
  h1 { font-weight: 800; font-size: 28px; color: #F2EADB; margin: 0; letter-spacing: -0.02em; }
  .level { font-size: 13px; font-weight: 600; color: #A79E8B; }
  .progress { height: 6px; border-radius: 999px; background: rgba(255, 255, 255, 0.08); overflow: hidden; margin-top: 10px; }
  .progress-fill { height: 100%; background: #D28A5E; border-radius: 999px; transition: width 0.5s ease; }

  /* ---- trail ---- */
  .trail { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; position: relative; padding: 18px 16px 28px; }
  .trail::-webkit-scrollbar { width: 5px; }
  .trail::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.25); border-radius: 3px; }
  .trail-line {
    position: absolute; left: 50%; top: 34px; bottom: 34px;
    border-left: 2px dashed rgba(255, 255, 255, 0.16); transform: translateX(-50%); z-index: 0;
  }

  .stop {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
    align-items: center; column-gap: 8px; margin-bottom: 18px;
  }
  .stop.here { z-index: 6; }
  .stop:last-child { margin-bottom: 0; }

  .label {
    background: rgba(255, 255, 255, 0.045); border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 14px; padding: 9px 12px; cursor: pointer; min-width: 0;
  }
  .label-right { grid-column: 3; text-align: left; }
  .label-left { grid-column: 1; text-align: right; }
  .label.current { background: rgba(210, 138, 94, 0.10); border-color: #D28A5E; }
  .label-name { font-size: 15px; font-weight: 700; color: #F2EADB; line-height: 1.1; }
  .label-boards { font-size: 11.5px; font-weight: 400; color: #8C8573; margin-top: 1px; }
  .label-state { font-size: 12px; font-weight: 700; margin-top: 2px; }

  .node {
    grid-column: 2; position: relative; z-index: 5;
    width: 64px; height: 64px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; padding: 0; color: #fff;
  }
  .node.pulse { animation: pulsehere 2s ease-out infinite; }
  .here-pill {
    position: absolute; top: -15px; left: 50%; transform: translateX(-50%); white-space: nowrap;
    background: #D28A5E; color: #17140D; font-size: 10px; font-weight: 800; letter-spacing: 0.04em;
    padding: 2px 9px; border-radius: 999px;
  }
  .badge {
    position: absolute; bottom: -3px; right: -3px; width: 22px; height: 22px; border-radius: 50%;
    background: #F2EADB; border: 1.5px solid currentColor; font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  @keyframes pulsehere {
    0%, 100% { box-shadow: 0 0 0 0 rgba(210, 138, 94, 0.55); }
    50% { box-shadow: 0 0 0 7px rgba(210, 138, 94, 0); }
  }

  /* ---- empty state ---- */
  .empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 32px; }
  .empty-mark { color: #F2EADB; opacity: 0.9; margin-bottom: 18px; }
  .empty-title { font-size: 20px; font-weight: 800; color: #F2EADB; margin-bottom: 8px; }
  .empty-sub { font-size: 14px; font-weight: 400; color: #A79E8B; line-height: 1.55; max-width: 30ch; margin-bottom: 22px; }
  .empty-cta {
    border: none; background: #D28A5E; color: #17140D; font-family: var(--qx-font);
    font-size: 15px; font-weight: 800; padding: 12px 22px; border-radius: 14px; cursor: pointer;
  }
</style>
