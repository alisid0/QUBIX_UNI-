<script>
  // The Exercises Factory. Every entry is a question the learner answers by
  // operating it, shown from three sides at once.
  //
  // Authoring-only and dev-only, like the other factory surfaces. It selects
  // nothing and places nothing; adopting an exercise onto a board is a separate
  // decision made in the board's own sheet.
  import { theme } from '../lib/stores/theme.js';
  import { LIMIT_EXERCISES, FUNCTION_GALLERY, VIEWS } from '../factory/exercise-bank.js';

  let view = 'graph';
  // How close to the point each exercise has been dragged, keyed by code, so one
  // exercise's approach never moves another's.
  let approach = {};
  // Read `approach` at the call site, never inside a helper. A
  // `const stepsOf = code => approach[code] ?? 0` called from the template hides
  // the dependency from Svelte, the markup is never marked dirty, and every
  // button appears to do nothing. Seventh occurrence of this fault in the
  // project, and the second today.
  const STEPS = [1, 0.5, 0.25, 0.1, 0.01, 0.001];
  const gapAt = i => STEPS[Math.min(i, STEPS.length - 1)];

  function closer(code) {
    approach = { ...approach, [code]: Math.min(STEPS.length - 1, (approach[code] ?? 0) + 1) };
  }
  function reset(code) {
    approach = { ...approach, [code]: 0 };
  }

  // Values either side of the point, at the current gap.
  const sample = (ex, gap) => ({
    left: ex.f(ex.at - gap),
    right: ex.f(ex.at + gap)
  });
  const fmt = v => !isFinite(v) ? '—' : Math.abs(v) >= 1e4 ? v.toExponential(1) : Number(v.toFixed(4)).toString().replace('-', '−');

  // Settled means both sides agree to the precision on screen.
  const settled = (ex, gap) => {
    const s = sample(ex, gap);
    return isFinite(s.left) && isFinite(s.right) && Math.abs(s.left - s.right) < 0.01;
  };

  // Plane geometry, equal scale on both axes, as the plotting drills use.
  const U = 18, PX = 150, PY = 96;
  const pt = (x, y) => ({ x: PX + x * U, y: PY - y * U });
  const curve = (f, from = -5, to = 5, skip = null) => {
    const out = [];
    let run = [];
    for (let i = 0; i <= 200; i++) {
      const x = from + (to - from) * i / 200;
      if (skip !== null && Math.abs(x - skip) < 0.02) { if (run.length) out.push(run); run = []; continue; }
      const y = f(x);
      if (!isFinite(y) || Math.abs(y) > 7) { if (run.length) out.push(run); run = []; continue; }
      const p = pt(x, y);
      run.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    if (run.length) out.push(run);
    return out.map(r => r.join(' '));
  };

  let tab = 'limits';
</script>

<div class="ex-shell">
  <header class="ex-header">
    <div class="identity">
      <span class="mark">E</span>
      <span class="stack"><b>EXERCISES FACTORY</b><small>Questions answered by operating them</small></span>
    </div>
    <div class="head-right">
      <span class="warn-pill">AUTHORING ONLY · NOT PLACED ON ANY BOARD</span>
      <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
        {#if $theme === 'dark'}◑{:else}◐{/if}
      </button>
    </div>
  </header>

  <main class="ex-body">
    <nav class="tabs">
      <button class:on={tab === 'limits'} on:click={() => (tab = 'limits')}>
        Limits<em>{LIMIT_EXERCISES.length} operable exercises</em>
      </button>
      <button class:on={tab === 'gallery'} on:click={() => (tab = 'gallery')}>
        Function gallery<em>{FUNCTION_GALLERY.length} shapes on the plane</em>
      </button>
    </nav>

    <p class="lede">
      An exercise here is not a prompt with options beneath it. It is a thing you
      operate, and operating it is the act of answering. Each is shown three ways,
      because a learner who only ever meets the algebra never finds out what they
      were doing.
    </p>

    {#if tab === 'limits'}
      <nav class="views" aria-label="Choose a view">
        {#each VIEWS as v}
          <button class:on={view === v.key} on:click={() => (view = v.key)}>{v.name}<em>{v.hint}</em></button>
        {/each}
      </nav>

      {#each LIMIT_EXERCISES as ex}
        {@const i = approach[ex.code] ?? 0}
        {@const gap = gapAt(i)}
        {@const s = sample(ex, gap)}
        <article class="ex">
          <div class="ex-head">
            <span class="code">{ex.code}</span>
            <span class="topic">{ex.topic}</span>
          </div>
          <p class="ask">{ex.ask}</p>

          {#if view === 'numeric'}
            <table class="io-table num">
              <thead><tr><th>x from below</th><th>value</th><th>x from above</th><th>value</th></tr></thead>
              <tbody>
                {#each STEPS.slice(0, i + 1) as g}
                  <tr>
                    <td>{fmt(ex.at - g)}</td><td><b>{fmt(ex.f(ex.at - g))}</b></td>
                    <td>{fmt(ex.at + g)}</td><td><b>{fmt(ex.f(ex.at + g))}</b></td>
                  </tr>
                {/each}
              </tbody>
            </table>

          {:else if view === 'graph'}
            <svg class="ex-plane" viewBox="0 0 300 192" role="img" aria-label={`Graph of ${ex.expr}`}>
              {#each [-4, -2, 2, 4] as t}
                <line class="g" x1={pt(t, -5).x} y1={pt(0, 5).y} x2={pt(t, -5).x} y2={pt(0, -5).y}/>
                <line class="g" x1={pt(-5, 0).x} y1={pt(0, t).y} x2={pt(5, 0).x} y2={pt(0, t).y}/>
              {/each}
              <line class="ax" x1={pt(-5, 0).x} y1={pt(0, 0).y} x2={pt(5, 0).x} y2={pt(0, 0).y}/>
              <line class="ax" x1={pt(0, 5).x} y1={pt(0, 5).y} x2={pt(0, 5).x} y2={pt(0, -5).y}/>
              {#each curve(ex.f, -5, 5, ex.hole ? ex.at : null) as seg}
                <polyline class="fn" points={seg}/>
              {/each}
              <!-- Where the learner has got to, from both sides. -->
              {#each [ex.at - gap, ex.at + gap] as x}
                {#if isFinite(ex.f(x)) && Math.abs(ex.f(x)) <= 7}
                  <circle class="probe" cx={pt(x, ex.f(x)).x} cy={pt(x, ex.f(x)).y} r="4"/>
                {/if}
              {/each}
              {#if ex.hole && ex.limit !== null}
                <circle class="hole" cx={pt(ex.at, ex.limit).x} cy={pt(ex.at, ex.limit).y} r="4.5"/>
              {/if}
              <line class="mark" x1={pt(ex.at, 5).x} y1={pt(0, 5).y} x2={pt(ex.at, 5).x} y2={pt(0, -5).y}/>
            </svg>

          {:else}
            <ol class="algebra">
              {#each ex.algebra as step, si}
                <li class:shown={si <= i}>{si <= i ? step : '·····'}</li>
              {/each}
            </ol>
          {/if}

          <div class="ex-controls">
            <button class="chip" on:click={() => closer(ex.code)} disabled={i >= STEPS.length - 1}>
              {i === 0 ? 'start closing the gap' : 'closer'}
            </button>
            <button class="chip quiet" on:click={() => reset(ex.code)}>reset</button>
            <span class="gap">gap {gap}</span>
          </div>

          <p class="verdict" class:done={i >= STEPS.length - 1}>
            {#if i === 0}
              Close the gap and watch what the value does.
            {:else if ex.oneSided}
              From below {fmt(s.left)}, from above {fmt(s.right)}.
              {#if i >= 2}The two sides are not converging on one number, so there is no limit here.{/if}
            {:else if settled(ex, gap)}
              Both sides now read about {fmt(ex.limit)}, and the expression still has no value at x = {ex.at}. That number is the limit.
            {:else}
              From below {fmt(s.left)}, from above {fmt(s.right)}. Keep closing.
            {/if}
          </p>
          <p class="note">{ex.note}</p>
        </article>
      {/each}

    {:else}
      <div class="gallery">
        {#each FUNCTION_GALLERY as fn}
          <article class="ex">
            <div class="ex-head"><span class="code">{fn.code}</span><span class="topic">{fn.expr}</span></div>
            <svg class="ex-plane" viewBox="0 0 300 192" role="img" aria-label={`Graph of ${fn.expr}`}>
              {#each [-4, -2, 2, 4] as t}
                <line class="g" x1={pt(t, 0).x} y1={pt(0, 5).y} x2={pt(t, 0).x} y2={pt(0, -5).y}/>
                <line class="g" x1={pt(-5, 0).x} y1={pt(0, t).y} x2={pt(5, 0).x} y2={pt(0, t).y}/>
              {/each}
              <line class="ax" x1={pt(-5, 0).x} y1={pt(0, 0).y} x2={pt(5, 0).x} y2={pt(0, 0).y}/>
              <line class="ax" x1={pt(0, 0).x} y1={pt(0, 5).y} x2={pt(0, 0).x} y2={pt(0, -5).y}/>
              {#each curve(fn.f) as seg}<polyline class="fn" points={seg}/>{/each}
            </svg>
            <p class="ask">{fn.name}</p>
            <p class="note">{fn.note}</p>
          </article>
        {/each}
      </div>
    {/if}
  </main>
</div>

<style>
  .ex-shell { height: 100%; overflow-y: auto; background: var(--qx-bg); color: var(--qx-text); }
  .ex-header { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; background: var(--qx-bg); border-bottom: 1px solid var(--qx-border-2); }
  .identity { display: flex; align-items: center; gap: 10px; }
  .mark { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; border: 1px solid var(--qx-accent); color: var(--qx-accent-text); font-weight: 900; }
  .stack { display: flex; flex-direction: column; }
  .stack b { font-size: 11px; letter-spacing: .1em; }
  .stack small { font-size: 10px; color: var(--qx-text-faint); }
  .head-right { display: flex; align-items: center; gap: 9px; }
  .warn-pill { font-size: 9px; font-weight: 900; letter-spacing: .06em; padding: 5px 9px; border-radius: 999px; border: 1px dashed var(--qx-accent); color: var(--qx-accent-text); }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: transparent; color: var(--qx-text); cursor: pointer; }

  .ex-body { max-width: 900px; margin: 0 auto; padding: 18px 20px 60px; display: flex; flex-direction: column; gap: 14px; }
  .tabs, .views { display: flex; gap: 8px; flex-wrap: wrap; }
  .tabs button, .views button { flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 3px; align-items: flex-start; padding: 9px 13px; border: 1px solid var(--qx-border-2); border-radius: 11px; background: var(--qx-surface); color: var(--qx-text); font-weight: 900; font-size: 11.5px; cursor: pointer; }
  .tabs button em, .views button em { font-style: normal; font-size: 10px; font-weight: 700; color: var(--qx-text-faint); }
  .tabs button.on, .views button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .lede { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--qx-text-dim); }

  .ex { border: 1px solid var(--qx-border-2); border-radius: 13px; padding: 13px; display: flex; flex-direction: column; gap: 10px; background: var(--qx-surface); }
  .ex-head { display: flex; align-items: center; gap: 9px; }
  .code { font-size: 9.5px; font-weight: 900; letter-spacing: .05em; padding: 2px 7px; border-radius: 999px; border: 1px solid var(--qx-border-2); color: var(--qx-text-faint); }
  .topic { font-size: 10px; font-weight: 800; color: var(--qx-text-faint); }
  .ask { margin: 0; font-size: 14px; font-weight: 800; line-height: 1.4; }

  .ex-plane { width: 100%; max-width: 340px; height: auto; align-self: center; }
  .ex-plane .g { stroke: var(--qx-border-2); stroke-width: .5; opacity: .5; }
  .ex-plane .ax { stroke: var(--qx-text-dim); stroke-width: 1.3; }
  .ex-plane .fn { fill: none; stroke: var(--qx-accent); stroke-width: 2.2; }
  .ex-plane .probe { fill: var(--qx-green, #3E9E2A); }
  .ex-plane .hole { fill: var(--qx-surface); stroke: var(--qx-accent); stroke-width: 2; }
  .ex-plane .mark { stroke: var(--qx-text-faint); stroke-width: 1; stroke-dasharray: 3 3; }

  .io-table.num { border-collapse: collapse; font-size: 12px; align-self: center; }
  .io-table.num th { font-size: 9px; letter-spacing: .06em; text-transform: uppercase; color: var(--qx-text-faint); padding: 0 12px 5px 0; text-align: left; }
  .io-table.num td { padding: 2px 12px 2px 0; color: var(--qx-text-2); }
  .io-table.num b { color: var(--qx-accent-text); }

  .algebra { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 5px; font-size: 13px; }
  .algebra li { color: var(--qx-text-faint); }
  .algebra li.shown { color: var(--qx-text); }

  .ex-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .chip { font-size: 11px; font-weight: 800; padding: 7px 13px; border-radius: 999px; border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); cursor: pointer; }
  .chip.quiet { border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-dim); }
  .chip:disabled { opacity: .45; cursor: default; }
  .gap { font-size: 10.5px; color: var(--qx-text-faint); font-weight: 800; }

  .verdict { margin: 0; font-size: 12px; line-height: 1.5; color: var(--qx-text-2); }
  .verdict.done { color: var(--qx-accent-text); font-weight: 700; }
  .note { margin: 0; font-size: 11.5px; line-height: 1.5; color: var(--qx-text-faint); border-top: 1px dashed var(--qx-border-2); padding-top: 9px; }
  .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 12px; }
</style>
