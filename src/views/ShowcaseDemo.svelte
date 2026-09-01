<script>
  import { onDestroy } from 'svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';

  const STEPS = Object.freeze([
    Object.freeze({ at: '00:00', minutes: 3, phase: 'ORIENT', title: 'Start with the learner promise', concept: 'Data science is a decision process, not a list of tools.', user: 'Chooses a role and sees the complete foundation before committing.', say: '“Qubix begins at zero. A learner can see where they are going and why each skill exists before opening a lesson.”', proof: 'A visible pathway, seven chapters, practical missions and earned progression.', href: '/learn/foundations', action: 'Open the learner pathway' }),
    Object.freeze({ at: '03:00', minutes: 3, phase: 'ENTER', title: 'Walk into the Superstore', concept: 'Every concept belongs to a place, activity and business consequence.', user: 'Moves from the course overview into a persistent learning world.', say: '“Instead of disconnected exercises, the learner works inside one company whose tables, rooms and decisions keep returning.”', proof: 'The floor map connects 21 missions across the store and offices.', href: '/superstore', action: 'Open the Superstore' }),
    Object.freeze({ at: '06:00', minutes: 4, phase: 'READ', title: 'Build the mental model first', concept: 'A row keeps one case together; a column records one variable consistently.', user: 'Reads a short briefing, studies an example and answers a misconception check.', say: '“The reading is intentionally short. It gives the learner the exact model needed for the practice that follows.”', proof: 'Read and Do are paired; the explanation and mission use the same language.', href: '/learn/data-foundations/chapter/1/session/2', action: 'Open the briefing' }),
    Object.freeze({ at: '10:00', minutes: 4, phase: 'DO', title: 'Read a real table', concept: 'Meaning comes before calculation.', user: 'Uses row and column evidence to answer eight decisions and receives immediate explanatory feedback.', say: '“Notice that the wrong answers are plausible. The learner must read the structure, not guess the top button.”', proof: 'Keyboard-friendly decisions, visible evidence and persistent completion.', href: '/academy/missions/read-the-table?showcase=1', action: 'Play Read the Table' }),
    Object.freeze({ at: '14:00', minutes: 4, phase: 'EXPLORE', title: 'Look at shape before summary', concept: 'A mean can hide clusters, skew and outliers.', user: 'Inspects distributions and chooses the summary that survives the data shape.', say: '“This is the step many courses skip: the learner sees why a technically correct average can still be the wrong answer.”', proof: 'Statistics is taught as judgement over evidence, not formula recital.', href: '/academy/missions/distribution-desk?showcase=1', action: 'Open Distribution Desk' }),
    Object.freeze({ at: '18:00', minutes: 4, phase: 'QUERY', title: 'Ask the table with SQL', concept: 'Every query changes a result’s rows, columns and grain.', user: 'Builds a SQL query clause by clause and predicts what each clause will do.', say: '“The point is not memorising syntax. The learner must understand what the query did to the meaning of one row.”', proof: 'A real analytical workflow joins concepts to executable SQL.', href: '/academy/missions/sql-console?showcase=1', action: 'Run the SQL mission' }),
    Object.freeze({ at: '22:00', minutes: 4, phase: 'REPRESENT', title: 'Choose an honest chart', concept: 'The analytical question decides the chart.', user: 'Chooses bar, line, histogram or scatter, then audits axes, units and accessibility.', say: '“A chart is an argument. Qubix lets the learner make the visual decision and immediately see its consequences.”', proof: 'Live code-native charts, integrity checks and accessible labelling.', href: '/academy/missions/data-visualization?showcase=1', action: 'Run the Chart Clinic' }),
    Object.freeze({ at: '26:00', minutes: 4, phase: 'DECIDE', title: 'Finish at the Analyst Desk', concept: 'A defensible answer joins question, unit, evidence, representation and limits.', user: 'Turns a vague stakeholder request into a chart and a sentence the evidence supports.', say: '“This is the end-to-end transfer: the learner combines everything rather than answering one isolated statistics question.”', proof: 'The course ends where work ends—with a finding another person can challenge and use.', href: '/academy/missions/analyst-desk?showcase=1', action: 'Work the Analyst Desk' })
  ]);

  let active = 0;
  let completed = [];
  let notes = true;
  let remaining = 30 * 60;
  let running = false;
  let timer;

  $: step = STEPS[active];
  $: minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  $: seconds = String(remaining % 60).padStart(2, '0');
  $: percent = Math.round((completed.length / STEPS.length) * 100);

  function toggleTimer() {
    running = !running;
    clearInterval(timer);
    if (running) timer = setInterval(() => {
      if (remaining <= 0) { running = false; clearInterval(timer); return; }
      remaining -= 1;
    }, 1000);
  }

  function reset() {
    clearInterval(timer); running = false; remaining = 30 * 60; active = 0; completed = [];
  }

  function complete(index) {
    if (!completed.includes(index)) completed = [...completed, index];
    if (index < STEPS.length - 1) active = index + 1;
  }

  onDestroy(() => clearInterval(timer));
</script>

<svelte:head>
  <title>30-Minute Qubix Demo | Qubix University</title>
  <meta name="description" content="A presenter-ready 30-minute walkthrough of the complete Qubix University learner journey." />
</svelte:head>

<section class="demo qx-shell">
  <div class="nav-wrap"><SiteNav current="showcase" subjects={false} /></div>

  <header>
    <div class="intro"><p class="eyebrow">PRESENTER CONSOLE · 30-MINUTE RUN OF SHOW</p><h1>Show how a learner moves from confusion to a defensible answer.</h1><p>Keep this guide open. Each experience launches in a new tab, so you can demonstrate the real product and return to the meeting flow without losing your place.</p></div>
    <aside class="clock" aria-label="Meeting timer"><span>TIME REMAINING</span><strong aria-live="polite">{minutes}:{seconds}</strong><div><button class="start" on:click={toggleTimer}>{running ? 'Pause timer' : remaining < 1800 ? 'Resume timer' : 'Start meeting'}</button><button on:click={reset}>Reset</button></div></aside>
  </header>

  <div class="status"><div><span style={`width:${percent}%`}></span></div><p>{completed.length} of {STEPS.length} moments complete · {percent}%</p><label><input type="checkbox" bind:checked={notes} /> Show presenter notes</label></div>

  <main>
    <nav class="run" aria-label="Demo timeline">
      {#each STEPS as item, i}
        <button class:on={active === i} class:done={completed.includes(i)} on:click={() => (active = i)} aria-current={active === i ? 'step' : undefined}>
          <span>{item.at}</span><div><em>{item.phase} · {item.minutes} MIN</em><b>{item.title}</b></div><i aria-hidden="true">{completed.includes(i) ? '✓' : String(i + 1).padStart(2, '0')}</i>
        </button>
      {/each}
    </nav>

    <article class="stage">
      <div class="stage-top"><span>{step.at}–{String(Number(step.at.slice(0, 2)) + step.minutes).padStart(2, '0')}:00</span><em>{step.phase} · MOMENT {active + 1} OF {STEPS.length}</em></div>
      <p class="eyebrow">CONCEPT TO LAND</p><h2>{step.title}</h2><p class="concept">{step.concept}</p>

      <div class="user-action"><span>WHAT THE USER DOES</span><p>{step.user}</p></div>

      {#if notes}
        <blockquote><span>WHAT TO SAY</span><p>{step.say}</p></blockquote>
        <div class="proof"><span>WHAT THIS PROVES</span><p>{step.proof}</p></div>
      {/if}

      <div class="actions"><a href={step.href} target="_blank" rel="noreferrer">{step.action} <span aria-hidden="true">↗</span></a><button on:click={() => complete(active)}>{completed.includes(active) ? 'Completed' : active === STEPS.length - 1 ? 'Complete the demo' : 'Mark complete & continue'} <span aria-hidden="true">→</span></button></div>
      <div class="step-nav"><button on:click={() => (active = Math.max(0, active - 1))} disabled={active === 0}>← Previous</button><a href="/showcase">Exit to Showcase</a><button on:click={() => (active = Math.min(STEPS.length - 1, active + 1))} disabled={active === STEPS.length - 1}>Next →</button></div>
    </article>
  </main>

  <section class="close">
    <p class="eyebrow">CLOSING LINE · 30:00</p><h2>“Qubix teaches the judgement around the tools—then makes the learner prove it in the work.”</h2>
    <div><span><b>7</b> concise chapters</span><span><b>21</b> practical missions</span><span><b>1</b> connected data world</span><span><b>0</b> assumed experience</span></div>
  </section>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#e9e3d6}
  :global(body){position:static}
  .demo{--ink:#20241f;--soft:#646b61;--green:#315f48;--orange:#b85530;--paper:#f8f4eb;--rule:#c7bfaf;min-height:100vh;max-width:none;padding-bottom:54px;background:#e9e3d6;color:var(--ink)}
  .demo>*{max-width:1220px;margin-inline:auto}.nav-wrap,header,.status,main,.close{padding-inline:clamp(15px,4vw,52px)}.eyebrow{margin:0 0 9px;color:var(--orange);font:900 11px var(--qx-font);letter-spacing:.15em}
  header{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,.5fr);gap:clamp(30px,7vw,90px);align-items:end;padding-top:54px;padding-bottom:46px}.intro h1{max-width:810px;margin:0;font:500 clamp(42px,6vw,70px)/.98 Georgia,serif;letter-spacing:-.04em;text-wrap:balance}.intro>p:last-child{max-width:690px;margin:20px 0 0;color:var(--soft);font:550 16px/1.6 var(--qx-font)}.clock{padding:24px;border-top:4px solid var(--green);background:var(--paper)}.clock>span{display:block;color:var(--soft);font:900 11px var(--qx-font);letter-spacing:.12em}.clock strong{display:block;margin:8px 0 18px;font:500 48px Georgia,serif;font-variant-numeric:tabular-nums}.clock div{display:grid;grid-template-columns:1fr auto;gap:8px}.clock button{min-height:42px;padding:0 13px;border:1px solid var(--rule);background:transparent;color:var(--soft);font:850 12px var(--qx-font);cursor:pointer}.clock button.start{border-color:var(--orange);background:var(--orange);color:#fff}
  .status{display:grid;grid-template-columns:minmax(180px,1fr) auto auto;gap:18px;align-items:center;padding-top:17px;padding-bottom:17px;border-block:1px solid var(--rule)}.status>div{height:6px;background:#d2ccbf;overflow:hidden}.status>div span{display:block;height:100%;background:var(--green);transition:width .25s ease}.status p,.status label{margin:0;color:var(--soft);font:750 11.5px var(--qx-font)}.status label{display:flex;align-items:center;gap:7px}.status input{width:17px;height:17px;accent-color:var(--green)}
  main{display:grid;grid-template-columns:minmax(280px,.72fr) minmax(0,1.28fr);gap:20px;padding-top:32px;padding-bottom:52px}.run{display:grid;align-self:start;border-top:3px solid var(--green)}.run button{display:grid;grid-template-columns:48px minmax(0,1fr) 27px;gap:10px;align-items:center;min-height:77px;padding:12px;border:0;border-bottom:1px solid var(--rule);background:rgba(248,244,235,.55);color:var(--ink);text-align:left;cursor:pointer}.run button:hover,.run button.on{background:var(--paper)}.run button.on{box-shadow:inset 4px 0 0 var(--orange)}.run button.done{background:rgba(49,95,72,.08)}.run>button>span{color:var(--orange);font:600 13px Georgia,serif;font-variant-numeric:tabular-nums}.run div{min-width:0}.run em,.run b{display:block}.run em{margin-bottom:4px;color:var(--soft);font:900 11px var(--qx-font);font-style:normal;letter-spacing:.1em}.run b{font:650 14px/1.3 var(--qx-font)}.run i{display:grid;place-items:center;width:27px;height:27px;border:1px solid var(--rule);border-radius:50%;color:var(--soft);font:800 11px var(--qx-font);font-style:normal}.run button.done i{border-color:var(--green);background:var(--green);color:#fff}
  .stage{min-width:0;padding:clamp(24px,4vw,44px);border:6px solid var(--ink);background:var(--paper);box-shadow:11px 11px 0 rgba(32,36,31,.14)}.stage-top{display:flex;justify-content:space-between;gap:15px;margin-bottom:45px}.stage-top span{color:var(--orange);font:600 14px Georgia,serif}.stage-top em{color:var(--soft);font:900 11px var(--qx-font);font-style:normal;letter-spacing:.1em}.stage h2{max-width:720px;margin:0;font:500 clamp(34px,5vw,52px)/1.02 Georgia,serif;letter-spacing:-.025em}.concept{max-width:690px;margin:15px 0 30px;color:var(--soft);font:600 16px/1.55 var(--qx-font)}.user-action,.proof,blockquote{margin:0 0 13px;padding:17px 19px;border-left:4px solid var(--green);background:#e7ece4}.user-action span,.proof span,blockquote span{color:var(--green);font:900 11px var(--qx-font);letter-spacing:.12em}.user-action p,.proof p,blockquote p{margin:7px 0 0;font:650 13.5px/1.55 var(--qx-font)}blockquote{border-color:var(--orange);background:#f2e5db}blockquote span{color:var(--orange)}blockquote p{font-family:Georgia,serif;font-size:17px}.proof{border-color:#7b715f;background:#ece7dd}.proof span{color:#62594c}.actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:25px}.actions a,.actions button{min-height:52px;display:grid;place-items:center;padding:0 17px;border:2px solid var(--orange);background:var(--orange);color:#fff;font:900 13px var(--qx-font);text-decoration:none;cursor:pointer}.actions button{border-color:var(--green);background:var(--green)}.step-nav{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:18px}.step-nav button,.step-nav a{min-height:44px;padding:6px;border:0;background:transparent;color:var(--soft);font:800 11.5px var(--qx-font);text-decoration:none;cursor:pointer}.step-nav button:disabled{opacity:.35;cursor:default}
  button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid var(--orange);outline-offset:3px}.close{padding-top:52px;padding-bottom:60px;border-top:1px solid var(--rule);text-align:center}.close h2{max-width:870px;margin:0 auto;font:500 clamp(31px,5vw,50px)/1.08 Georgia,serif;text-wrap:balance}.close>div{display:grid;grid-template-columns:repeat(4,1fr);max-width:820px;margin:34px auto 0;border-top:3px solid var(--green);border-left:1px solid var(--rule)}.close>div span{display:grid;gap:5px;padding:18px 12px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);color:var(--soft);font:700 11.5px var(--qx-font)}.close b{color:var(--ink);font:500 29px Georgia,serif}
  @media(max-width:900px){header,main{grid-template-columns:1fr}.clock{max-width:440px}.run{grid-template-columns:1fr 1fr}.stage{box-shadow:8px 8px 0 rgba(32,36,31,.14)}.status{grid-template-columns:1fr auto}.status label{grid-column:1/-1}}
  @media(max-width:580px){header{padding-top:38px}.intro h1{font-size:43px}.run{grid-template-columns:1fr}.run button{min-height:68px}.stage{padding:22px 16px;border-width:5px}.stage-top{align-items:flex-start;flex-direction:column;margin-bottom:30px}.actions{grid-template-columns:1fr}.step-nav{flex-wrap:wrap}.close>div{grid-template-columns:1fr 1fr}.status{grid-template-columns:1fr}.status p{order:2}.status label{grid-column:auto}.clock div{grid-template-columns:1fr}.clock button{width:100%}}
  @media(prefers-reduced-motion:reduce){.status>div span{transition:none}}
</style>
