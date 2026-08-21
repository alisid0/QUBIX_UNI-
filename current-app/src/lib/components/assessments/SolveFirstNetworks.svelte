<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SolveFirstPause from './SolveFirstPause.svelte';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const PHASES = ['link', 'scale', 'failure', 'mission', 'transfer', 'reveal'];
  const LINK_TOOLS = [
    { id: 'power', label: 'Power lead', detail: 'supplies electricity' },
    { id: 'cable', label: 'Data cable', detail: 'joins two sockets' },
    { id: 'radio', label: 'Radio link', detail: 'joins without a cable' }
  ];
  const LAYOUTS = [
    { id: 'chain', label: 'One long chain', detail: 'each machine passes data onward', cables: 3, isolated: 2 },
    { id: 'centre', label: 'Shared middle', detail: 'every machine has its own middle link', cables: 4, isolated: 1 },
    { id: 'web', label: 'Many paths', detail: 'machines have backup links', cables: 6, isolated: 0 }
  ];
  const MISSIONS = [
    {
      label: 'Pop-up shop',
      brief: 'Connect four tills with at most four cables. Easy expansion matters.',
      answer: 'centre'
    },
    {
      label: 'Outdoor festival',
      brief: 'Connect six handheld scanners. Cables across the crowd are forbidden.',
      answer: 'radio'
    },
    {
      label: 'Control room',
      brief: 'Three controllers must keep talking after any one link breaks.',
      answer: 'web'
    }
  ];

  let phase = 'brief';
  let reducedMotion = false;
  let hintUsed = false;
  let activeHint = '';
  let recorded = false;
  let status = '';

  let linkChoice = 'power';
  let linkTests = {};

  let scaleTests = {};
  let scaleChoice = '';

  let failureTests = {};
  let failureChoice = '';

  let missionIndex = 0;
  let missionChoice = '';
  let missionLog = [];
  let missionMistakes = 0;
  let missionAccepted = false;

  let transferChoice = '';
  let transferMistakes = 0;

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  $: phaseIndex = phase === 'brief' ? 0 : PHASES.indexOf(phase) + 1;
  $: linkReady = !!linkTests.power && !!linkTests.cable && !!linkTests.radio;
  $: scaleReady = !!scaleTests.pairs && !!scaleTests.centre && scaleChoice === 'centre';
  $: failureReady = Object.keys(failureTests).length === 3 && failureChoice === 'web';
  $: missionReady = missionIndex === MISSIONS.length;
  $: transferReady = transferChoice === 'centre';
  $: currentMission = MISSIONS[Math.min(missionIndex, MISSIONS.length - 1)];
  $: transferFirstTry = transferReady && transferMistakes === 0 && missionMistakes === 0;
  $: evidenceScore = linkReady && scaleTests.pairs && scaleTests.centre && Object.keys(failureTests).length === 3 ? 4 : 3;
  $: reward = Math.min(15, 6 + evidenceScore + (transferFirstTry ? 3 : 1) + (hintUsed ? 0 : 2));
  $: arcadeStage = phase === 'brief' ? 'BOOT' : `${Math.max(1, phaseIndex)}`.padStart(2, '0');
  $: evidenceUnits =
    Object.keys(linkTests).length +
    Object.keys(scaleTests).length +
    Object.keys(failureTests).length +
    missionLog.length +
    (transferReady ? 1 : 0);

  function testLink() {
    const success = linkChoice !== 'power';
    linkTests = {
      ...linkTests,
      [linkChoice]: {
        success,
        message: success
          ? linkChoice === 'cable'
            ? 'Message delivered through the physical link.'
            : 'Message delivered through the radio link.'
          : 'Both machines have power, but there is no path for the message.'
      }
    };
    status = linkTests[linkChoice].message;
  }

  function testScale(kind) {
    scaleTests = {
      ...scaleTests,
      [kind]: kind === 'pairs'
        ? { cables: 6, result: 'All four machines connected, but every new machine needs several new links.' }
        : { cables: 4, result: 'All four machines connected through one shared middle.' }
    };
    status = scaleTests[kind].result;
  }

  function chooseScale(value) {
    scaleChoice = value;
    status = value === 'centre'
      ? 'Four links reach all four machines. Adding a fifth needs only one more.'
      : 'This works, but the number of pair links grows quickly.';
  }

  function testFailure(layout) {
    failureTests = {
      ...failureTests,
      [layout.id]: { isolated: layout.isolated }
    };
    status = layout.isolated === 0
      ? 'The message found another path. No machine was cut off.'
      : `${layout.isolated} machine${layout.isolated === 1 ? '' : 's'} lost the route after one link broke.`;
  }

  function chooseFailure(value) {
    failureChoice = value;
    status = value === 'web'
      ? 'Correct: spare paths keep every machine reachable.'
      : 'That layout still leaves at least one machine without a route.';
  }

  function deployMission() {
    if (!missionChoice || missionReady || missionAccepted) return;
    const correct = missionChoice === currentMission.answer;
    if (!correct) {
      missionMistakes += 1;
      status = currentMission.answer === 'radio'
        ? 'That plan puts cables across the crowd. Try a link that travels through the air.'
        : currentMission.answer === 'centre'
          ? 'That plan exceeds four cables or makes expansion awkward.'
          : 'Break one link in that plan: at least one controller becomes isolated.';
      return;
    }
    missionLog = [...missionLog, { label: currentMission.label, choice: missionChoice }];
    missionAccepted = true;
    status = 'Network accepted. Keep the constraint and the working design together before loading the next job.';
  }

  function continueMission() {
    if (!missionAccepted) return;
    missionIndex += 1;
    missionChoice = '';
    missionAccepted = false;
    status = missionIndex === MISSIONS.length
      ? 'All three networks passed their real-world constraint.'
      : 'Network accepted. New job loaded.';
  }

  function chooseTransfer(value) {
    if (value !== 'centre') transferMistakes += 1;
    transferChoice = value;
    status = value === 'centre'
      ? 'Five short links connect all five sensors to the controller.'
      : value === 'pairs'
        ? 'Ten pair links exceed the greenhouse cable allowance.'
        : 'The metal-and-glass room blocks the radio signal.';
  }

  function showHint(key) {
    hintUsed = true;
    activeHint = activeHint === key ? '' : key;
  }

  function finishDiscovery() {
    if (!transferReady) return;
    phase = 'reveal';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: Object.keys(linkTests).length + Object.keys(scaleTests).length + Object.keys(failureTests).length,
        patternFound: true,
        compared: true,
        transferFirstTry,
        usedHint: hintUsed
      });
    }
  }

  function restart() {
    phase = 'brief';
    hintUsed = false;
    activeHint = '';
    recorded = false;
    status = '';
    linkChoice = 'power';
    linkTests = {};
    scaleTests = {};
    scaleChoice = '';
    failureTests = {};
    failureChoice = '';
    missionIndex = 0;
    missionChoice = '';
    missionLog = [];
    missionMistakes = 0;
    missionAccepted = false;
    transferChoice = '';
    transferMistakes = 0;
  }
</script>

<div class="solve-first">
  <header class="mode-head">
    <button class="exit" on:click={onExit} aria-label="Return to all workshops">←</button>
    <div><span>{config.eyebrow}</span><strong>Solve First</strong></div>
    <div class="phase-count">{phaseIndex}/6</div>
  </header>

  <div class="phase-line" aria-label="Discovery progress">
    {#each PHASES as item, i}
      <span class:active={phase === item} class:done={phaseIndex > i + 1}></span>
    {/each}
  </div>

  <div class="arcade-hud" aria-label={`Stage ${arcadeStage}, ${evidenceUnits} evidence units`}>
    <span><i></i> NET//LINK</span>
    <b>STAGE {arcadeStage}</b>
    <span>DATA {`${evidenceUnits}`.padStart(2, '0')}</span>
  </div>

  <div class="sr-status" aria-live="polite">{status}</div>

  {#key phase}
    <section
      class="phase"
      in:fly={{ x: reducedMotion ? 0 : 24, duration: reducedMotion ? 0 : 220 }}
      out:fade={{ duration: reducedMotion ? 0 : 80 }}
    >
      {#if phase === 'brief'}
        <div class="brief">
          <div class="pixel-skyline" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          <div class="network-mark" aria-hidden="true">
            <div class="mini-computer left"><i></i></div>
            <div class="mystery-link"></div>
            <div class="mini-computer right"><i></i></div>
          </div>
          <div class="micro-label">New office · No connection</div>
          <h2 class="arcade-title"><span>CONNECT</span> THE COMPUTERS</h2>
          <p>Two computers need to exchange a file. Then two more arrive. Build several working systems and discover which design fits each job.</p>
          <div class="mission">
            <span>Your mission</span>
            <strong>Create a path, scale it to four machines, break a link on purpose, and build the right system under real constraints.</strong>
          </div>
          <div class="brief-rules">
            <span>Failed builds are free</span>
            <span>Every design gets tested</span>
            <span>Formal names come last</span>
          </div>
          <button class="primary start-button" on:click={() => phase = 'link'}><span>▶</span> Open the parts case</button>
        </div>

      {:else if phase === 'link'}
        <div class="section-title">
          <span>Build 01 · Two computers</span>
          <h2>Make the file cross the gap</h2>
          <p>Try every tool. A successful test must give the message a real path between both machines.</p>
        </div>

        <div class="direct-stage">
          <div class="stage-grid" aria-hidden="true"></div>
          <div class="computer"><i></i><strong>A</strong><small>send</small></div>
          <div class="link-space" class:cable={linkChoice === 'cable'} class:radio={linkChoice === 'radio'} class:power={linkChoice === 'power'}>
            {#if linkChoice === 'radio'}<span class="wave">)))</span>{:else}<span></span>{/if}
            <b class:travelling={linkTests[linkChoice]?.success}>FILE</b>
          </div>
          <div class="computer"><i></i><strong>B</strong><small>receive</small></div>
          <div class="packet-readout">
            <span>PAYLOAD</span><b>32 KB</b><span>CHECK</span><b>{linkTests[linkChoice]?.success ? 'PASS' : 'WAIT'}</b>
          </div>
        </div>

        <div class="tool-grid" role="radiogroup" aria-label="Choose a connection tool">
          {#each LINK_TOOLS as tool}
            <button
              role="radio"
              aria-checked={linkChoice === tool.id}
              class:active={linkChoice === tool.id}
              class:tested={linkTests[tool.id]}
              on:click={() => linkChoice = tool.id}
            >
              <strong>{tool.label}</strong><small>{tool.detail}</small>
              {#if linkTests[tool.id]}<b>{linkTests[tool.id].success ? 'works ✓' : 'no path'}</b>{/if}
            </button>
          {/each}
        </div>

        <button class="test-action" on:click={testLink}>Send test file</button>
        {#if status}<div class:success-note={linkTests[linkChoice]?.success} class:error-note={linkTests[linkChoice] && !linkTests[linkChoice].success}>{status}</div>{/if}

        <button class="hint-link" on:click={() => showHint('link')}>{activeHint === 'link' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'link'}<div class="hint">Power makes a computer run. Look for a tool that carries information between machines.</div>{/if}

        <button class="primary" disabled={!linkReady} on:click={() => { phase = 'scale'; status = ''; }}>
          {linkReady ? 'Two paths proven · Add more computers' : `Test all three tools · ${Object.keys(linkTests).length}/3`}
        </button>

      {:else if phase === 'scale'}
        <div class="section-title">
          <span>Build 02 · Four computers</span>
          <h2>Connect everyone</h2>
          <p>Build both arrangements. Count the links, then choose the one that is simpler to expand.</p>
        </div>

        <div class="scale-options">
          <div class="layout-card">
            <div class="pair-map" aria-label="Four computers with a separate link between every pair">
              <span>A</span><span>B</span><span>C</span><span>D</span>
              <div class="pair-lines">╲╱╳╲╱</div>
            </div>
            <strong>Every pair joined</strong>
            <small>4 machines · 6 links</small>
            <button class:tested={scaleTests.pairs} on:click={() => testScale('pairs')}>{scaleTests.pairs ? 'Built ✓' : 'Build and test'}</button>
          </div>
          <div class="layout-card">
            <div class="centre-map" aria-label="Four computers connected to one shared middle">
              <span>A</span><span>B</span><span>C</span><span>D</span><b>●</b>
            </div>
            <strong>Shared middle</strong>
            <small>4 machines · 4 links</small>
            <button class:tested={scaleTests.centre} on:click={() => testScale('centre')}>{scaleTests.centre ? 'Built ✓' : 'Build and test'}</button>
          </div>
        </div>

        <div class="system-readout">
          <span><b>PAIR BUILD</b><i>{scaleTests.pairs ? 'ONLINE' : 'UNTESTED'}</i><em>6 links / 4 nodes</em></span>
          <span><b>MIDDLE BUILD</b><i>{scaleTests.centre ? 'ONLINE' : 'UNTESTED'}</i><em>4 links / 4 nodes</em></span>
        </div>

        {#if scaleTests.pairs && scaleTests.centre}
          <div class="decision">
            <strong>A fifth computer arrives. Which design needs only one new link?</strong>
            <div>
              <button class:wrong={scaleChoice === 'pairs'} on:click={() => chooseScale('pairs')}>Every pair joined</button>
              <button class:correct={scaleChoice === 'centre'} on:click={() => chooseScale('centre')}>Shared middle</button>
            </div>
            {#if scaleChoice}<small class:ok={scaleChoice === 'centre'}>{status}</small>{/if}
          </div>
        {/if}

        <button class="primary" disabled={!scaleReady} on:click={() => { phase = 'failure'; status = ''; }}>
          {scaleReady ? 'Expansion solved · Break a link' : 'Build both systems and choose'}
        </button>

      {:else if phase === 'failure'}
        <div class="section-title">
          <span>Build 03 · Fault test</span>
          <h2>Cut one link</h2>
          <p>Run the same fault through three layouts. Count how many machines lose every route.</p>
        </div>

        <div class="failure-list">
          {#each LAYOUTS as layout}
            <div class="failure-card" class:tested={failureTests[layout.id]}>
              <div class={`layout-icon ${layout.id}`} aria-hidden="true">
                <span>A</span><span>B</span><span>C</span><span>D</span><b>×</b>
              </div>
              <div class="failure-copy">
                <strong>{layout.label}</strong>
                <small>{layout.detail}</small>
                {#if failureTests[layout.id]}
                  <b>{layout.isolated === 0 ? '0 cut off · rerouted' : `${layout.isolated} cut off`}</b>
                {/if}
              </div>
              <button on:click={() => testFailure(layout)}>{failureTests[layout.id] ? 'Retest' : 'Break link'}</button>
            </div>
          {/each}
        </div>

        <div class="fault-ledger">
          <span>FAULT REPORT</span>
          {#each LAYOUTS as layout}
            <b>{layout.label}<i>{failureTests[layout.id] ? `${layout.isolated} OFFLINE` : '—'}</i></b>
          {/each}
        </div>

        {#if Object.keys(failureTests).length === 3}
          <div class="decision">
            <strong>Which layout keeps every machine reachable after this fault?</strong>
            <div class="three">
              {#each LAYOUTS as layout}
                <button class:correct={failureChoice === layout.id && layout.id === 'web'} class:wrong={failureChoice === layout.id && layout.id !== 'web'} on:click={() => chooseFailure(layout.id)}>{layout.label}</button>
              {/each}
            </div>
            {#if failureChoice}<small class:ok={failureChoice === 'web'}>{status}</small>{/if}
          </div>
        {/if}

        <button class="hint-link" on:click={() => showHint('failure')}>{activeHint === 'failure' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'failure'}<div class="hint">A machine survives only if another complete path still reaches it after the cut.</div>{/if}

        <button class="primary" disabled={!failureReady} on:click={() => { phase = 'mission'; status = ''; }}>
          {failureReady ? 'Fault pattern proven · Take the jobs' : `Test every layout · ${Object.keys(failureTests).length}/3`}
        </button>

      {:else if phase === 'mission'}
        <div class="section-title">
          <span>Network game · Job {Math.min(missionIndex + 1, 3)}/3</span>
          <h2>{missionReady ? 'All jobs passed' : currentMission.label}</h2>
          <p>{missionReady ? 'You selected a different network shape for each real constraint.' : currentMission.brief}</p>
        </div>

        <div class="job-board">
          {#if !missionReady}
            <div class="contract-strip">
              <span>ACTIVE CONTRACT</span>
              <b>{currentMission.label}</b>
              <i>{currentMission.answer === 'centre' ? 'CABLE LIMIT: 4' : currentMission.answer === 'radio' ? 'CABLES: BLOCKED' : 'FAULTS: 1'}</i>
            </div>
          {/if}
          <div class="job-progress">
            {#each MISSIONS as job, i}
              <span class:done={i < missionIndex || (missionAccepted && i === missionIndex)} class:active={i === missionIndex}>
                {i < missionIndex || (missionAccepted && i === missionIndex) ? '✓' : i + 1} · {job.label}
              </span>
            {/each}
          </div>

          {#if !missionReady}
            <div class="blueprint-grid" role="radiogroup" aria-label="Choose a network design">
              <button role="radio" aria-checked={missionChoice === 'centre'} class:active={missionChoice === 'centre'} disabled={missionAccepted} on:click={() => missionChoice = 'centre'}>
                <i class="bp centre-bp"></i><strong>Shared middle</strong><small>one link per machine</small>
              </button>
              <button role="radio" aria-checked={missionChoice === 'radio'} class:active={missionChoice === 'radio'} disabled={missionAccepted} on:click={() => missionChoice = 'radio'}>
                <i class="bp radio-bp">)))</i><strong>Radio cloud</strong><small>no data cables</small>
              </button>
              <button role="radio" aria-checked={missionChoice === 'web'} class:active={missionChoice === 'web'} disabled={missionAccepted} on:click={() => missionChoice = 'web'}>
                <i class="bp web-bp">╳</i><strong>Many paths</strong><small>backup routes</small>
              </button>
            </div>
            <button class="test-action" disabled={!missionChoice || missionAccepted} on:click={deployMission}>Deploy network</button>
          {/if}
        </div>

        {#if status}<div class:success-note={missionReady || missionAccepted || missionLog.length === missionIndex} class:error-note={!missionReady && status.includes('Try') || status.includes('exceed') || status.includes('isolated')}>{status}</div>{/if}

        {#if missionAccepted}
          <SolveFirstPause
            title={`${currentMission.label}: design accepted`}
            message={`The ${missionChoice === 'centre' ? 'shared-middle' : missionChoice === 'radio' ? 'radio' : 'many-path'} design solved this job because it matched the stated constraint—not because one network shape is always best.`}
            actionLabel={missionIndex < MISSIONS.length - 1 ? 'Continue to the next job' : 'Review all three jobs'}
            onContinue={continueMission}
          />
        {/if}

        {#if missionLog.length}
          <div class="mission-log">
            {#each missionLog as result}<span><b>✓</b> {result.label}</span>{/each}
          </div>
        {/if}

        <button class="primary" disabled={!missionReady} on:click={() => { phase = 'transfer'; status = ''; }}>
          {missionReady ? 'Jobs complete · Transfer the pattern' : `Solve ${3 - missionIndex} more job${missionIndex === 2 ? '' : 's'}`}
        </button>

      {:else if phase === 'transfer'}
        <div class="section-title">
          <span>Transfer · Greenhouse controls</span>
          <h2>Connect five moisture sensors</h2>
          <p>The sensors must reach one controller using no more than five cables. The metal-and-glass room blocks radio.</p>
        </div>

        <div class="greenhouse">
          <div class="greenhouse-grid" aria-hidden="true"></div>
          <div class="controller">CONTROL</div>
          {#each ['A', 'B', 'C', 'D', 'E'] as sensor, i}
            <div class={`sensor sensor-${i + 1}`}><i></i><span>{sensor}</span></div>
          {/each}
          {#if transferChoice === 'centre'}<div class="greenhouse-centre">●</div>{/if}
        </div>

        <div class="transfer-spec">
          <span><b>INPUTS</b><i>5 sensors</i></span>
          <span><b>OUTPUT</b><i>1 controller</i></span>
          <span><b>LIMIT</b><i>5 cables</i></span>
          <span><b>RADIO</b><i>blocked</i></span>
        </div>

        <div class="transfer-options">
          <button class:wrong={transferChoice === 'pairs'} on:click={() => chooseTransfer('pairs')}><strong>Every pair</strong><small>10 cables</small></button>
          <button class:correct={transferChoice === 'centre'} on:click={() => chooseTransfer('centre')}><strong>Shared middle</strong><small>5 cables</small></button>
          <button class:wrong={transferChoice === 'radio'} on:click={() => chooseTransfer('radio')}><strong>Radio cloud</strong><small>0 cables</small></button>
        </div>

        {#if transferChoice}<div class:success-note={transferReady} class:error-note={!transferReady}>{status}</div>{/if}

        <button class="primary" disabled={!transferReady} on:click={finishDiscovery}>
          {transferReady ? 'Reveal the network designs' : 'Choose a design that meets both constraints'}
        </button>

      {:else if phase === 'reveal'}
        <div class="reveal">
          <div class="reveal-kicker">Your designs have names</div>
          <h2>You built computer networks.</h2>
          <p>A network is two or more devices connected so they can exchange data and share resources.</p>

          <div class="formal-map">
            <div><span>Two machines · cable</span><strong>Direct Ethernet link</strong></div>
            <div><span>Two machines · radio</span><strong>Wireless network</strong></div>
            <div><span>Every device · middle</span><strong>Star topology + switch</strong></div>
            <div><span>Several backup paths</span><strong>Mesh topology</strong></div>
          </div>

          <div class="completion-banner">
            <span>NETWORK DESIGN ARCHIVE</span>
            <strong>06 STAGES CLEARED</strong>
            <small>Every connection was proven under load or failure.</small>
          </div>

          <div class="named-diagram" aria-label="Four computers in a star topology connected through a network switch">
            <span>A</span><span>B</span><span>C</span><span>D</span>
            <b>SWITCH</b>
            <i class="line-one"></i><i class="line-two"></i><i class="line-three"></i><i class="line-four"></i>
          </div>

          <ul class="reveal-list">
            <li><strong>Peer-to-peer:</strong> two computers can connect directly and exchange data without a central server.</li>
            <li><strong>Wired or wireless:</strong> Ethernet carries data through cable; Wi-Fi carries it by radio.</li>
            <li><strong>Star topology:</strong> a switch gives each device one link and forwards data toward the right device.</li>
            <li><strong>Mesh topology:</strong> extra links create alternate routes, improving resilience at greater cost.</li>
            <li><strong>Topology:</strong> the physical or logical arrangement of devices and links.</li>
          </ul>

          <div class="reward-panel">
            <div class="reward-top">
              <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
              <b>+{reward} W</b>
            </div>
            <div class="reward-skills">
              <span class:earned={linkReady && scaleTests.pairs && scaleTests.centre && Object.keys(failureTests).length === 3}>Evidence</span>
              <span class:earned={true}>Pattern</span>
              <span class:earned={transferReady}>Transfer</span>
              <span class:earned={!hintUsed}>Independent</span>
            </div>
            <small>Ws are awarded once. This distinction records design reasoning, not speed.</small>
          </div>

          <div class="reveal-actions">
            <button class="primary" on:click={onExit}>Return to workshops</button>
            <button class="secondary" on:click={restart}>Build again</button>
          </div>
        </div>
      {/if}
    </section>
  {/key}
</div>

<style>
  .solve-first {
    --pixel-shadow: 4px 4px 0 var(--qx-text);
    width: 100%;
    max-width: 430px;
    margin: 0 auto;
    color: var(--qx-text);
    position: relative;
    isolation: isolate;
    font-variant-numeric: tabular-nums;
  }
  .solve-first * { min-width: 0; }
  .solve-first::after {
    content: '';
    position: absolute;
    inset: 92px -4px 0;
    pointer-events: none;
    z-index: 20;
    opacity: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 3px,
      var(--qx-text-faint) 4px
    );
    mix-blend-mode: multiply;
  }
  .mode-head { display: grid; grid-template-columns: 38px 1fr auto; gap: 10px; align-items: center; margin-bottom: 11px; }
  .exit { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--qx-border); background: var(--qx-surface-2); color: var(--qx-text); font-size: 17px; cursor: pointer; }
  .mode-head div:nth-child(2) { display: flex; flex-direction: column; }
  .mode-head span { color: var(--qx-accent); font-size: 9px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  .mode-head strong { font-size: 17px; font-weight: 900; }
  .phase-count { color: var(--qx-text-faint); font-size: 11px; font-weight: 900; font-variant-numeric: tabular-nums; }
  .phase-line { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; margin-bottom: 18px; }
  .phase-line span { height: 4px; border-radius: 4px; background: var(--qx-surface-3); }
  .phase-line span.active { background: var(--qx-accent); }
  .phase-line span.done { background: var(--qx-green); }
  .phase { min-height: 450px; display: flex; flex-direction: column; gap: 11px; }
  .sr-status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  .arcade-hud {
    min-height: 34px;
    margin: -7px 0 15px;
    padding: 0 9px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 7px;
    align-items: center;
    border: 2px solid var(--qx-text);
    border-radius: 2px;
    background: var(--qx-text);
    color: var(--qx-bg);
    box-shadow: 3px 3px 0 var(--qx-accent);
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .09em;
  }
  .arcade-hud span { display: flex; gap: 5px; align-items: center; }
  .arcade-hud span:last-child { justify-content: flex-end; color: var(--qx-yellow); }
  .arcade-hud b { padding: 4px 7px; border-inline: 1px solid var(--qx-text-faint); color: var(--qx-green); }
  .arcade-hud i { width: 6px; height: 6px; background: var(--qx-green); box-shadow: 0 0 0 2px var(--qx-green-soft); animation: pixelBlink 1.2s steps(2, end) infinite; }
  @keyframes pixelBlink { 50% { opacity: .25; } }

  .brief, .reveal { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 11px; }
  .pixel-skyline {
    width: 100%;
    height: 38px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 5px;
    margin-bottom: -22px;
    overflow: hidden;
    opacity: .5;
  }
  .pixel-skyline i { width: 34px; height: 20px; background: var(--qx-surface-3); border-top: 4px solid var(--qx-text-faint); box-shadow: inset 7px 7px 0 var(--qx-surface); }
  .pixel-skyline i:nth-child(2) { height: 32px; }
  .pixel-skyline i:nth-child(3) { height: 27px; }
  .pixel-skyline i:nth-child(4) { height: 36px; }
  .pixel-skyline i:nth-child(5) { height: 23px; }
  .network-mark { width: 170px; height: 90px; position: relative; display: flex; align-items: center; justify-content: space-between; }
  .mini-computer { width: 48px; height: 35px; border: 3px solid var(--qx-text); border-radius: 5px; background: var(--qx-surface-2); position: relative; }
  .mini-computer::after { content: ''; position: absolute; width: 22px; height: 3px; left: 10px; bottom: -10px; background: var(--qx-text); }
  .mini-computer i { position: absolute; inset: 6px; background: var(--qx-accent-soft); border: 1px solid var(--qx-accent); }
  .mystery-link { flex: 1; border-top: 3px dashed var(--qx-text-faint); margin: 0 9px; }
  .mystery-link::after { content: '?'; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; margin: -14px auto 0; background: var(--qx-surface); color: var(--qx-pink-text); font-weight: 950; }
  .micro-label, .section-title > span, .reveal-kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  h2 { font-size: 24px; line-height: 1.15; margin: 0; font-weight: 950; }
  .arcade-title {
    max-width: 300px;
    padding: 6px 10px;
    color: var(--qx-text);
    font-size: 26px;
    letter-spacing: .03em;
    line-height: 1.04;
  }
  .arcade-title span { display: block; color: var(--qx-accent); font-size: 34px; letter-spacing: .08em; }
  p { color: var(--qx-text-dim); font-size: 13.5px; line-height: 1.5; margin: 0; }
  .brief > p, .reveal > p { max-width: 36ch; }
  .mission { margin-top: 7px; text-align: left; width: 100%; box-sizing: border-box; border: 1px solid color-mix(in srgb, var(--qx-accent) 38%, var(--qx-border)); border-radius: var(--qx-radius-md); padding: 13px 14px; background: var(--qx-accent-soft); box-shadow: var(--qx-shadow-card); }
  .mission span { display: block; color: var(--qx-accent-text); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .mission strong { display: block; color: var(--qx-text); margin-top: 4px; font-size: 14px; line-height: 1.4; }
  .brief-rules { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .brief-rules span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 5px 9px; font-size: 10px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); }
  .section-title { text-align: left; }
  .section-title h2 { font-size: 21px; margin: 6px 0; }
  .section-title > span {
    display: inline-block;
    padding: 4px 7px;
    border-left: 5px solid var(--qx-pink);
    background: var(--qx-surface-3);
  }

  .primary, .secondary, .test-action { min-height: 46px; width: 100%; border-radius: 999px; font-family: var(--qx-font); font-size: 14px; font-weight: 900; cursor: pointer; }
  .primary { border: none; border-radius: var(--qx-radius-sm); background: var(--qx-accent); color: #fff; box-shadow: var(--qx-shadow-card); }
  .primary:active:not(:disabled) { transform: translateY(1px); box-shadow: none; }
  .primary:disabled, .test-action:disabled { opacity: .42; cursor: not-allowed; }
  .secondary { border: 1px solid var(--qx-border-2); border-radius: var(--qx-radius-sm); background: var(--qx-surface); color: var(--qx-text-dim); box-shadow: var(--qx-shadow-card); }
  .test-action { border: 1px solid var(--qx-text); border-radius: var(--qx-radius-sm); background: var(--qx-text); color: var(--qx-bg); box-shadow: var(--qx-shadow-card); letter-spacing: .03em; }
  .start-button span { margin-right: 6px; color: var(--qx-yellow); animation: pixelBlink 1s steps(2, end) infinite; }
  .hint-link { border: none; background: none; color: var(--qx-text-faint); font-family: var(--qx-font); font-size: 11px; font-weight: 800; cursor: pointer; margin: 0 auto; min-height: 32px; }
  .hint { border-radius: 10px; padding: 9px 11px; color: var(--qx-accent-text); background: var(--qx-accent-soft); font-size: 11px; line-height: 1.4; }
  .success-note, .error-note { border-radius: 2px; border-left: 5px solid currentColor; padding: 9px 11px; font-size: 11px; line-height: 1.4; font-weight: 800; }
  .success-note { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .error-note { color: var(--qx-danger-text); background: var(--qx-danger-soft); }

  .direct-stage { min-height: 174px; display: grid; grid-template-columns: 80px 1fr 80px; align-items: center; border: 3px solid var(--qx-text); border-radius: 2px; padding: 13px 13px 34px; background: var(--qx-surface-2); box-shadow: inset 0 0 0 4px var(--qx-border), 4px 4px 0 var(--qx-accent); position: relative; overflow: hidden; }
  .stage-grid { position: absolute; inset: 0; opacity: .35; background-image: linear-gradient(var(--qx-border) 1px, transparent 1px), linear-gradient(90deg, var(--qx-border) 1px, transparent 1px); background-size: 16px 16px; }
  .computer { height: 72px; position: relative; display: grid; place-items: center; align-content: center; border: 4px solid var(--qx-text); border-radius: 2px; background: var(--qx-surface); z-index: 2; box-shadow: inset 0 -7px 0 var(--qx-surface-3), 4px 4px 0 var(--qx-text-faint); }
  .computer::after { content: ''; position: absolute; width: 36px; height: 4px; bottom: -11px; background: var(--qx-text); }
  .computer i { position: absolute; inset: 7px; border: 1px solid var(--qx-border); background: var(--qx-accent-soft); z-index: -1; }
  .computer strong { font-size: 19px; }.computer small { font-size: 8px; color: var(--qx-text-faint); }
  .link-space { height: 70px; position: relative; display: grid; place-items: center; }
  .link-space > span:not(.wave) { width: 100%; border-top: 4px solid var(--qx-text-faint); }
  .link-space.power > span:not(.wave) { border-top-style: dotted; }
  .link-space.cable > span:not(.wave) { border-color: var(--qx-accent); }
  .link-space .wave { color: var(--qx-pink-text); font-size: 23px; letter-spacing: 4px; transform: rotate(180deg); }
  .link-space b { position: absolute; left: 4px; top: 8px; padding: 4px 6px; border-radius: 5px; background: var(--qx-surface); border: 1px solid var(--qx-border); color: var(--qx-text-faint); font-size: 8px; }
  .link-space b.travelling { left: calc(100% - 38px); color: var(--qx-green-text); border-color: var(--qx-green); animation: packetTravel .55s steps(6, end); }
  @keyframes packetTravel { from { left: 4px; } to { left: calc(100% - 38px); } }
  .packet-readout { position: absolute; left: 8px; right: 8px; bottom: 6px; height: 22px; display: grid; grid-template-columns: auto 1fr auto 1fr; gap: 5px; align-items: center; padding: 0 7px; border-top: 2px solid var(--qx-border-2); background: var(--qx-text); color: var(--qx-bg); font-size: 7px; font-weight: 950; letter-spacing: .08em; z-index: 3; }
  .packet-readout b { color: var(--qx-green); }
  .tool-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .tool-grid button { min-height: 76px; border: 2px solid var(--qx-border); border-radius: 2px; background: var(--qx-surface); color: var(--qx-text); display: grid; gap: 2px; align-content: center; padding: 8px; font-family: var(--qx-font); cursor: pointer; box-shadow: 3px 3px 0 var(--qx-border); }
  .tool-grid button.active { border-color: var(--qx-accent); background: var(--qx-accent-soft); box-shadow: 3px 3px 0 var(--qx-accent); transform: translateY(-2px); }
  .tool-grid button.tested { box-shadow: inset 0 -3px var(--qx-green); }
  .tool-grid strong { font-size: 10px; }.tool-grid small { font-size: 8px; color: var(--qx-text-dim); }.tool-grid b { font-size: 8px; color: var(--qx-green-text); }

  .scale-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .layout-card { border: 2px solid var(--qx-text); border-radius: 2px; padding: 9px; background: var(--qx-surface-2); text-align: center; display: grid; gap: 5px; box-shadow: 4px 4px 0 var(--qx-border-2); }
  .layout-card > strong { font-size: 11px; }.layout-card > small { font-size: 9px; color: var(--qx-text-dim); }
  .layout-card > button, .failure-card > button { min-height: 44px; border: 1px solid var(--qx-border-2); border-radius: 9px; background: var(--qx-surface); color: var(--qx-text); font: 850 9px var(--qx-font); cursor: pointer; }
  .layout-card > button.tested { border-color: var(--qx-green); color: var(--qx-green-text); background: var(--qx-green-soft); }
  .pair-map, .centre-map { height: 92px; position: relative; }
  .pair-map span, .centre-map span, .named-diagram > span { position: absolute; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; background: var(--qx-surface); border: 2px solid var(--qx-text); font-size: 9px; font-weight: 900; z-index: 2; }
  .pair-map span:nth-child(1), .centre-map span:nth-child(1) { left: 5px; top: 4px; }
  .pair-map span:nth-child(2), .centre-map span:nth-child(2) { right: 5px; top: 4px; }
  .pair-map span:nth-child(3), .centre-map span:nth-child(3) { left: 5px; bottom: 4px; }
  .pair-map span:nth-child(4), .centre-map span:nth-child(4) { right: 5px; bottom: 4px; }
  .pair-lines {
    position: absolute;
    inset: 25px 16px;
    overflow: hidden;
    color: var(--qx-pink-text);
    font-size: clamp(21px, 6vw, 27px);
    letter-spacing: -10px;
    text-align: center;
    white-space: nowrap;
  }
  .centre-map::before, .centre-map::after { content: ''; position: absolute; left: 18px; right: 18px; top: 45px; border-top: 2px solid var(--qx-accent); transform: rotate(28deg); }
  .centre-map::after { transform: rotate(-28deg); }
  .centre-map b { position: absolute; left: calc(50% - 11px); top: 35px; z-index: 3; color: var(--qx-accent); font-size: 22px; }
  .system-readout { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .system-readout > span { display: grid; grid-template-columns: 1fr auto; gap: 2px 6px; padding: 8px; border-left: 4px solid var(--qx-accent); background: var(--qx-text); color: var(--qx-bg); font-size: 8px; }
  .system-readout b { letter-spacing: .05em; }.system-readout i { color: var(--qx-green); font-style: normal; text-align: right; }.system-readout em { grid-column: 1 / -1; color: var(--qx-text-faint); font-size: 7px; font-style: normal; }

  .decision { border: 2px solid var(--qx-text); border-radius: 2px; padding: 11px; background: var(--qx-surface-2); display: grid; gap: 9px; box-shadow: 4px 4px 0 var(--qx-yellow); }
  .decision > strong { font-size: 12px; line-height: 1.4; }
  .decision > div { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .decision > div.three { grid-template-columns: repeat(3, 1fr); }
  .decision button, .transfer-options button { min-height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); font: 900 10px/1.25 var(--qx-font); padding: 7px; cursor: pointer; }
  .decision button.correct, .transfer-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .decision button.wrong, .transfer-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .decision small { color: var(--qx-danger-text); font-size: 10.5px; line-height: 1.4; }
  .decision small.ok { color: var(--qx-green-text); }

  .failure-list { display: grid; gap: 7px; }
  .failure-card { display: grid; grid-template-columns: 78px 1fr 66px; gap: 8px; align-items: center; padding: 8px; border: 2px solid var(--qx-border); border-radius: 2px; background: var(--qx-surface-2); box-shadow: 3px 3px 0 var(--qx-border); }
  .failure-card.tested { border-color: var(--qx-green); }
  .failure-copy { display: grid; gap: 2px; }.failure-copy strong { font-size: 11px; }.failure-copy small { font-size: 8px; color: var(--qx-text-dim); }.failure-copy b { color: var(--qx-green-text); font-size: 9px; }
  .layout-icon { height: 58px; position: relative; }
  .layout-icon span { position: absolute; width: 20px; height: 20px; display: grid; place-items: center; border: 1.5px solid var(--qx-text); border-radius: 4px; background: var(--qx-surface); font-size: 7px; font-weight: 900; z-index: 2; }
  .layout-icon span:nth-child(1) { left: 0; top: 19px; }.layout-icon span:nth-child(2) { left: 20px; top: 19px; }.layout-icon span:nth-child(3) { left: 40px; top: 19px; }.layout-icon span:nth-child(4) { left: 60px; top: 19px; }
  .layout-icon::before { content: ''; position: absolute; left: 10px; right: 0; top: 28px; border-top: 2px solid var(--qx-accent); }
  .layout-icon.centre span:nth-child(1) { left: 0; top: 0; }.layout-icon.centre span:nth-child(2) { left: 58px; top: 0; }.layout-icon.centre span:nth-child(3) { left: 0; top: 38px; }.layout-icon.centre span:nth-child(4) { left: 58px; top: 38px; }
  .layout-icon.centre::before, .layout-icon.web::before { left: 10px; right: 8px; transform: rotate(25deg); }
  .layout-icon.centre::after, .layout-icon.web::after { content: ''; position: absolute; left: 10px; right: 8px; top: 28px; border-top: 2px solid var(--qx-accent); transform: rotate(-25deg); }
  .layout-icon.web span:nth-child(1) { left: 0; top: 0; }.layout-icon.web span:nth-child(2) { left: 58px; top: 0; }.layout-icon.web span:nth-child(3) { left: 0; top: 38px; }.layout-icon.web span:nth-child(4) { left: 58px; top: 38px; }
  .layout-icon.web { border-top: 2px solid var(--qx-pink); border-bottom: 2px solid var(--qx-pink); }
  .layout-icon b { position: absolute; left: 31px; top: 20px; color: var(--qx-danger-text); font-size: 16px; z-index: 3; }
  .fault-ledger { display: grid; grid-template-columns: 1fr repeat(3, 1fr); border: 2px solid var(--qx-text); background: var(--qx-text); color: var(--qx-bg); }
  .fault-ledger > span { display: grid; place-items: center; padding: 6px; color: var(--qx-yellow); font-size: 7px; font-weight: 950; letter-spacing: .07em; }
  .fault-ledger > b { display: grid; gap: 2px; padding: 6px; border-left: 1px solid var(--qx-text-faint); font-size: 7px; text-align: center; }
  .fault-ledger i { color: var(--qx-green); font-style: normal; font-size: 6.5px; }

  .job-board { border: 3px solid var(--qx-text); border-radius: 2px; padding: 11px; background: var(--qx-surface-2); display: grid; gap: 11px; box-shadow: inset 0 0 0 3px var(--qx-border), 5px 5px 0 var(--qx-pink); }
  .contract-strip { display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; padding: 8px 9px; background: var(--qx-text); color: var(--qx-bg); }
  .contract-strip span { grid-column: 1 / -1; color: var(--qx-yellow); font-size: 7px; font-weight: 950; letter-spacing: .1em; }
  .contract-strip b { font-size: 12px; text-transform: uppercase; }.contract-strip i { color: var(--qx-green); font-size: 8px; font-style: normal; font-weight: 900; }
  .job-progress { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
  .job-progress span { border-radius: 7px; padding: 7px 4px; background: var(--qx-surface); color: var(--qx-text-faint); font-size: 8px; font-weight: 850; text-align: center; }
  .job-progress span.active { color: var(--qx-accent-text); outline: 1px solid var(--qx-accent); }.job-progress span.done { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .blueprint-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .blueprint-grid button { min-height: 105px; display: grid; gap: 3px; place-items: center; align-content: center; border: 2px solid var(--qx-border); border-radius: 2px; background: var(--qx-surface); color: var(--qx-text); font-family: var(--qx-font); padding: 7px; cursor: pointer; box-shadow: 3px 3px 0 var(--qx-border); }
  .blueprint-grid button.active { border-color: var(--qx-accent); background: var(--qx-accent-soft); box-shadow: 3px 3px 0 var(--qx-accent); transform: translateY(-2px); }
  .blueprint-grid strong { font-size: 9px; }.blueprint-grid small { font-size: 7.5px; color: var(--qx-text-dim); }
  .bp { display: grid; place-items: center; width: 42px; height: 42px; color: var(--qx-accent-text); font-size: 24px; font-style: normal; }
  .centre-bp::before { content: '•'; box-shadow: 16px 0 var(--qx-text), -16px 0 var(--qx-text), 0 16px var(--qx-text), 0 -16px var(--qx-text); font-size: 25px; }
  .radio-bp { transform: rotate(180deg); color: var(--qx-pink-text); }.web-bp { font-size: 37px; color: var(--qx-green-text); }
  .mission-log { display: flex; gap: 6px; flex-wrap: wrap; }.mission-log span { border: 1px solid var(--qx-green); border-radius: 999px; padding: 5px 8px; color: var(--qx-green-text); font-size: 9px; }.mission-log b { font-weight: 950; }

  .greenhouse { height: 210px; position: relative; border: 4px solid var(--qx-text); border-radius: 32px 32px 2px 2px; background: var(--qx-green-soft); overflow: hidden; box-shadow: 4px 4px 0 var(--qx-green); }
  .greenhouse-grid { position: absolute; inset: 0; opacity: .35; background-image: linear-gradient(var(--qx-green) 1px, transparent 1px), linear-gradient(90deg, var(--qx-green) 1px, transparent 1px); background-size: 24px 24px; }
  .greenhouse::before, .greenhouse::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1px solid var(--qx-green); opacity: .45; }.greenhouse::after { left: 0; right: 0; top: 60%; bottom: auto; border-left: 0; border-top: 1px solid var(--qx-green); }
  .controller { position: absolute; left: calc(50% - 36px); bottom: 12px; width: 72px; height: 34px; display: grid; place-items: center; border: 2px solid var(--qx-text); border-radius: 6px; background: var(--qx-surface); font-size: 8px; font-weight: 950; z-index: 3; }
  .sensor { position: absolute; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: var(--qx-surface); border: 2px solid var(--qx-accent); z-index: 2; }.sensor i { position: absolute; width: 2px; height: 90px; background: var(--qx-accent); transform-origin: bottom; bottom: -82px; opacity: .55; }.sensor span { font-size: 8px; font-weight: 950; }
  .sensor-1 { left: 8%; top: 29px; }.sensor-2 { left: 25%; top: 76px; }.sensor-3 { left: calc(50% - 18px); top: 23px; }.sensor-4 { right: 25%; top: 76px; }.sensor-5 { right: 8%; top: 29px; }
  .greenhouse-centre { position: absolute; left: calc(50% - 14px); top: 105px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--qx-accent); color: var(--qx-bg); z-index: 3; }
  .transfer-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }.transfer-options button { display: grid; gap: 2px; }.transfer-options small { font-size: 8px; color: var(--qx-text-dim); }
  .transfer-spec { display: grid; grid-template-columns: repeat(4, 1fr); border: 2px solid var(--qx-text); background: var(--qx-text); }
  .transfer-spec span { display: grid; gap: 2px; padding: 7px 4px; border-right: 1px solid var(--qx-text-faint); color: var(--qx-bg); text-align: center; }
  .transfer-spec span:last-child { border-right: 0; }.transfer-spec b { color: var(--qx-yellow); font-size: 7px; }.transfer-spec i { color: var(--qx-green); font-size: 7px; font-style: normal; }

  .formal-map { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 7px; text-align: left; }
  .formal-map > div { display: grid; gap: 3px; border: 1px solid var(--qx-border); border-radius: 10px; padding: 10px; background: var(--qx-surface-2); }
  .formal-map span { color: var(--qx-text-faint); font-size: 8px; font-weight: 900; text-transform: uppercase; }.formal-map strong { font-size: 11px; }
  .named-diagram { width: 100%; height: 170px; position: relative; border-radius: 14px; background: var(--qx-surface-2); }
  .named-diagram > span:nth-child(1) { left: 20px; top: 15px; }.named-diagram > span:nth-child(2) { right: 20px; top: 15px; }.named-diagram > span:nth-child(3) { left: 20px; bottom: 15px; }.named-diagram > span:nth-child(4) { right: 20px; bottom: 15px; }
  .named-diagram b { position: absolute; left: calc(50% - 34px); top: 65px; width: 68px; height: 34px; display: grid; place-items: center; border-radius: 8px; background: var(--qx-accent); color: var(--qx-bg); font-size: 9px; z-index: 2; }
  .named-diagram i { position: absolute; left: 15%; right: 15%; top: 50%; border-top: 2px solid var(--qx-pink); transform-origin: center; }.named-diagram .line-one { transform: rotate(25deg); }.named-diagram .line-two { transform: rotate(-25deg); }.named-diagram .line-three { transform: rotate(155deg); }.named-diagram .line-four { transform: rotate(-155deg); }
  .completion-banner { width: 100%; box-sizing: border-box; display: grid; gap: 3px; padding: 11px; border: 3px double var(--qx-yellow); background: var(--qx-text); color: var(--qx-bg); text-align: center; box-shadow: 4px 4px 0 var(--qx-accent); }
  .completion-banner span { color: var(--qx-yellow); font-size: 8px; font-weight: 950; letter-spacing: .12em; }.completion-banner strong { color: var(--qx-green); font-size: 16px; letter-spacing: .05em; }.completion-banner small { color: var(--qx-text-faint); font-size: 8px; }
  .reveal-list { list-style: none; text-align: left; width: 100%; margin: 0; padding: 0; display: grid; gap: 6px; }
  .reveal-list li { border: 1px solid var(--qx-border); border-radius: 9px; padding: 9px 11px; background: var(--qx-surface-2); font-size: 11.5px; line-height: 1.4; color: var(--qx-text-dim); }.reveal-list strong { color: var(--qx-text); }
  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; }
  .reward-top { display: flex; justify-content: space-between; align-items: center; }.reward-top div { display: flex; flex-direction: column; }.reward-top span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }.reward-top strong { font-size: 15px; color: var(--qx-text); }.reward-top b { color: var(--qx-green-text); font-size: 21px; }
  .reward-skills { display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0 7px; }.reward-skills span { border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text-faint); border-radius: 999px; padding: 4px 8px; font-size: 9px; font-weight: 850; }.reward-skills span.earned { color: var(--qx-green-text); border-color: var(--qx-green); }
  .reward-panel small { color: var(--qx-text-dim); font-size: 9.5px; line-height: 1.35; display: block; }.reveal-actions { width: 100%; display: grid; gap: 7px; }

  /* Keep the late-80s game language in the diagrams and HUD, while giving the
     playable surface a calmer modern hierarchy. One outline per idea is enough. */
  .solve-first {
    max-width: 480px;
  }
  .solve-first::after {
    inset: 90px 0 0;
    opacity: .035;
    mix-blend-mode: normal;
  }
  .mode-head {
    margin-bottom: 9px;
    padding-inline: 2px;
  }
  .exit {
    border-width: 1px;
    border-radius: 12px;
    box-shadow: var(--qx-shadow-card);
  }
  .phase-line {
    gap: 6px;
    margin: 0 2px 12px;
  }
  .phase-line span {
    height: 5px;
  }
  .arcade-hud {
    min-height: 38px;
    margin: 0 0 18px;
    padding-inline: 11px;
    border: 1px solid var(--qx-border-2);
    border-radius: 11px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--qx-text) 94%, var(--qx-accent)), var(--qx-text));
    box-shadow: var(--qx-shadow-card);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  .arcade-hud b {
    padding-block: 6px;
  }
  .phase {
    gap: 14px;
  }
  .section-title {
    padding: 2px;
  }
  .section-title h2 {
    margin: 7px 0 5px;
    font-size: clamp(22px, 5.5vw, 26px);
    letter-spacing: -.025em;
  }
  .section-title > span {
    padding: 4px 8px;
    border-left-width: 3px;
    border-radius: 0 7px 7px 0;
    background: color-mix(in srgb, var(--qx-accent) 9%, var(--qx-surface-2));
  }
  .mission {
    border-width: 1px;
    border-radius: 16px;
    background: linear-gradient(145deg, var(--qx-accent-soft), color-mix(in srgb, var(--qx-surface) 72%, var(--qx-accent-soft)));
    box-shadow: none;
  }
  .primary,
  .secondary,
  .test-action {
    min-height: 48px;
    border-width: 1px;
    border-radius: 13px;
    box-shadow: 0 7px 18px rgba(0, 0, 0, .16);
  }
  .primary:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: 0 3px 9px rgba(0, 0, 0, .14);
  }
  .direct-stage,
  .layout-card,
  .decision,
  .failure-card,
  .job-board {
    border: 1px solid var(--qx-border-2);
    border-radius: 16px;
    box-shadow: var(--qx-shadow-card);
  }
  .direct-stage {
    border-radius: 18px;
    box-shadow: inset 0 0 0 1px var(--qx-border), var(--qx-shadow-card);
  }
  .layout-card {
    padding: 10px;
  }
  .layout-card > button,
  .failure-card > button {
    border-width: 1px;
    border-radius: 12px;
  }
  .tool-grid button,
  .blueprint-grid button {
    border-width: 1px;
    border-radius: 14px;
    box-shadow: none;
  }
  .tool-grid button.active,
  .blueprint-grid button.active {
    transform: none;
    box-shadow: inset 0 0 0 1px var(--qx-accent);
  }
  .system-readout {
    gap: 8px;
  }
  .system-readout > span {
    padding: 9px 10px;
    border: 1px solid var(--qx-border);
    border-left: 3px solid var(--qx-accent);
    border-radius: 11px;
    background: var(--qx-surface-2);
    color: var(--qx-text);
  }
  .system-readout em {
    color: var(--qx-text-faint);
  }
  .decision {
    padding: 13px;
    background: var(--qx-surface-2);
  }
  .failure-list {
    gap: 10px;
  }
  .fault-ledger {
    overflow: hidden;
    border: 1px solid var(--qx-border-2);
    border-radius: 12px;
    background: var(--qx-surface-2);
    color: var(--qx-text);
  }
  .fault-ledger > span {
    color: var(--qx-accent-text);
  }
  .fault-ledger > b {
    border-left-color: var(--qx-border);
  }
  .job-board {
    padding: 13px;
    box-shadow: var(--qx-shadow-card);
  }
  .contract-strip {
    border-radius: 11px;
  }
  .greenhouse {
    border-width: 2px;
    border-radius: 30px 30px 14px 14px;
    box-shadow: var(--qx-shadow-card);
  }
  .transfer-spec {
    overflow: hidden;
    border: 1px solid var(--qx-border-2);
    border-radius: 12px;
    background: var(--qx-surface-2);
  }
  .transfer-spec span {
    color: var(--qx-text);
    border-right-color: var(--qx-border);
  }
  .completion-banner {
    border-width: 1px;
    border-radius: 14px;
    box-shadow: var(--qx-shadow-card);
  }

  button:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  @media (max-width: 380px) {
    .phase { min-height: 420px; }
    h2 { font-size: 21px; }
    .direct-stage { grid-template-columns: 66px 1fr 66px; padding-inline: 8px; }
    .failure-card { grid-template-columns: 72px 1fr; }.failure-card > button { grid-column: 1 / -1; }
    .decision > div.three { grid-template-columns: 1fr; }
    .tool-grid button { padding-inline: 4px; }
    .arcade-hud { grid-template-columns: 1fr auto; }
    .arcade-hud span:last-child { grid-column: 1 / -1; justify-content: center; border-top: 1px solid var(--qx-text-faint); padding-top: 4px; }
    .system-readout { grid-template-columns: 1fr; }
    .fault-ledger { grid-template-columns: 1fr 1fr; }
    .fault-ledger > span { grid-column: 1 / -1; }
    .formal-map { grid-template-columns: 1fr; }
    .transfer-spec { grid-template-columns: 1fr 1fr; }
    .reward-top { align-items: flex-start; gap: 8px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .link-space b.travelling { transition: none; }
  }
</style>
