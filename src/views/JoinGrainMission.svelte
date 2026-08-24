<script>
  // Two table stacks and the bridge between them. The bridge starts as a single
  // span, which is what a learner assumes a join is, and is rebuilt with the
  // true number of matches once they answer. Seeing it fan is the moment.
  import { onDestroy, onMount } from 'svelte';
  import { createTableStack, createJoinBridge } from '../lib/three/assets/index.js';
  import { JOIN_GRAIN_MISSION, answerForJoinCase, joinChangesGrain } from '../lib/game/join-grain-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';

  let host, ready = false, loadError = '';
  let caseIndex = 0, step = 'matches', selected = '', checked = false, correct = false, completed = [];
  let renderer, scene, camera, controls, frame, resizeObserver, THREE;
  let leftStack, rightStack, bridge, reducedMotion = false;

  $: caseRecord = JOIN_GRAIN_MISSION.cases[caseIndex];
  $: missionComplete = completed.length === JOIN_GRAIN_MISSION.cases.length;
  $: options = caseRecord ? (step === 'matches' ? caseRecord.matchOptions : caseRecord.grainOptions) : [];
  $: question = step === 'matches'
    ? `How many ${caseRecord?.right} rows can match one ${caseRecord?.left} row?`
    : 'After the join, what does one row represent?';
  $: theory = step === 'matches'
    ? 'This is a question about the data, not about SQL. Ask whether the key you are joining on repeats in the table on the right.'
    : 'A join that matches more than once multiplies rows. Every total computed afterwards is computed at the new grain, whether or not anyone noticed it moved.';
  $: progress = Math.round(((completed.length * 2 + (step === 'grain' ? 1 : 0) + (correct ? 1 : 0)) / (JOIN_GRAIN_MISSION.cases.length * 2)) * 100);
  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('join-grain');

  const dispose = a => { if (a) { scene?.remove(a.group); a.dispose(); } };

  function buildScene(spans) {
    if (!scene || !caseRecord) return;
    [leftStack, rightStack, bridge].forEach(dispose);
    leftStack = createTableStack(THREE, {
      id: caseRecord.left, name: caseRecord.left, rowCount: caseRecord.leftRows, columnCount: 4, colour: 0xa85a34
    });
    leftStack.group.position.set(-3.4, 0, 0);
    rightStack = createTableStack(THREE, {
      id: caseRecord.right, name: caseRecord.right, rowCount: caseRecord.rightRows, columnCount: 4, colour: 0x477c9f
    });
    rightStack.group.position.set(3.4, 0, 0);
    bridge = createJoinBridge(THREE, { id: caseRecord.id, leftRows: caseRecord.leftRows, matchesPerLeft: spans });
    scene.add(leftStack.group, rightStack.group, bridge.group);
  }

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForJoinCase(caseRecord, step);
    if (correct && step === 'matches') buildScene(caseRecord.spans);
    const state = correct ? (joinChangesGrain(caseRecord) ? 'warning' : 'resolved') : 'error';
    [leftStack, rightStack, bridge].forEach(a => a?.setState(state));
  }

  function continueMission() {
    if (!correct) return;
    if (step === 'matches') {
      step = 'grain'; selected = ''; checked = false; correct = false;
      return;
    }
    completed = [...completed, caseRecord.id];
    caseIndex += 1;
    step = 'matches'; selected = ''; checked = false; correct = false;
    if (caseIndex < JOIN_GRAIN_MISSION.cases.length) setTimeout(() => buildScene(1), 0);
    else [leftStack, rightStack, bridge].forEach(dispose);
  }

  function resetMission() {
    caseIndex = 0; step = 'matches'; selected = ''; checked = false; correct = false; completed = [];
    setTimeout(() => buildScene(1), 0);
  }

  onMount(async () => {
    try {
      reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#e7e0d3');
      camera = new THREE.PerspectiveCamera(38, Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1), 0.1, 60);
      camera.position.set(1.5, 6.2, 11.5);
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.domElement.setAttribute('aria-label',
        'Two table stacks whose heights show their row counts, joined by a bridge with one span per match');
      host.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      // The page scrolls, so the wheel belongs to the page. Drag still rotates.
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.target.set(0, 1.2, 0.6);
      controls.update();
      buildScene(1);
      const floor = new THREE.Mesh(new THREE.CircleGeometry(15, 60),
        new THREE.MeshStandardMaterial({ color: 0xd6cebd, roughness: 0.96 }));
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(5, 9, 6);
      key.castShadow = true;
      scene.add(floor, new THREE.HemisphereLight(0xfffbef, 0x65625b, 2.2), key);
      resizeObserver = new ResizeObserver(() => {
        if (!host.clientWidth || !host.clientHeight) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight, false);
      });
      resizeObserver.observe(host);
      ready = true;
      const render = now => {
        frame = requestAnimationFrame(render);
        controls.update();
        if (!reducedMotion && bridge) bridge.group.position.y = Math.sin(now * 0.0011) * 0.015;
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(render);
    } catch (error) {
      loadError = 'The join workbench could not start on this device.';
      console.error(error);
    }
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    controls?.dispose();
    [leftStack, rightStack, bridge].forEach(a => a?.dispose());
    renderer?.dispose();
    renderer?.domElement?.remove();
  });
</script>

<svelte:head><title>Join Without Changing the Grain | Qubix University</title><meta name="description" content="Local AI draft of the Qubix Superstore join-grain mission." /></svelte:head>
<section class="mission-shell qx-shell">
  <header>
    <div class="identity"><span class="role">PRE<br/>INTERN</span><div><p>{JOIN_GRAIN_MISSION.id} · {JOIN_GRAIN_MISSION.status}</p><h1>{JOIN_GRAIN_MISSION.title}</h1></div></div>
    <nav><a href="?mode=game&mission=duplicate-records">Mission 005</a><a href="?mode=assets&asset=world">Assets</a><a href="?mode=wiki">Library</a></nav>
  </header>
  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>
  <main>
    <section class="stage-card">
      <div class="stage-heading">
        <div><p class="eyebrow">CORPORATE HQ · JOIN WORKBENCH</p><h2>{missionComplete ? 'Join review complete' : `${caseRecord.left} ⋈ ${caseRecord.right}`}</h2></div>
        <span>{missionComplete ? '6 / 6' : `${caseIndex + 1} / ${JOIN_GRAIN_MISSION.cases.length}`}</span>
      </div>
      <div class="viewport" bind:this={host}>
        {#if !ready && !loadError}<div class="loading">Opening join workbench…</div>{/if}
        {#if loadError}<div class="loading" role="alert">{loadError}</div>{/if}
      </div>
      {#if !missionComplete}
        <div class="rowbar">
          <span><b>{caseRecord.leftRows.toLocaleString()}</b> {caseRecord.left}</span>
          <span class="on">ON {caseRecord.key}</span>
          <span><b>{caseRecord.rightRows.toLocaleString()}</b> {caseRecord.right}</span>
          <span class="out">{correct && step === 'grain' ? `${caseRecord.resultRows.toLocaleString()} rows out` : '? rows out'}</span>
        </div>
        <div class="table-wrap"><table>
          <thead><tr>{#each caseRecord.columns as column}<th>{column}</th>{/each}</tr></thead>
          <tbody>{#each caseRecord.rows as row}<tr>{#each row as value}<td>{value}</td>{/each}</tr>{/each}</tbody>
        </table></div>
      {/if}
    </section>
    <aside class="decision-card">
      {#if missionComplete}
        <div class="completion">
          <span>✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Six joins predicted</h2>
          <p>{JOIN_GRAIN_MISSION.competency}</p>
          <ul>{#each JOIN_GRAIN_MISSION.cases as item}<li><b>{item.left} ⋈ {item.right}</b><span>{item.leftRows.toLocaleString()} → {item.resultRows.toLocaleString()}</span></li>{/each}</ul>
          <button on:click={resetMission}>Run mission again</button>
        </div>
      {:else}
        <div class="theory"><p class="eyebrow">THEORY → PRACTICAL · {step === 'matches' ? 'CARDINALITY' : 'RESULT GRAIN'}</p><h2>{question}</h2><p>{theory}</p></div>
        <article class="evidence">
          <p>{caseRecord.context}</p>
          <code>{caseRecord.left} is {caseRecord.leftGrain} · joining on {caseRecord.key}</code>
        </article>
        <div class="options">
          {#each options as option}
            <button class:selected={selected === option} class:right={correct && selected === option}
              class:wrong={checked && !correct && selected === option}
              on:click={() => choose(option)} disabled={correct}><b>{option}</b></button>
          {/each}
        </div>
        {#if checked}
          <div class:success={correct} class:retry={!correct} class="feedback" role="status">
            {#if correct}<b>Correct.</b> {step === 'matches' ? caseRecord.matchExplanation : caseRecord.grainExplanation}
            {:else}<b>Try again.</b> {step === 'matches' ? `Ask whether ${caseRecord.key} can repeat in ${caseRecord.right}.` : 'Name what changes from one row of the result to the next.'}{/if}
          </div>
        {/if}
        {#if correct}
          <button class="continue" on:click={continueMission}>
            {step === 'matches' ? 'Read the result grain' : caseIndex === JOIN_GRAIN_MISSION.cases.length - 1 ? 'Complete mission' : 'Next join'} →
          </button>
        {/if}
      {/if}
    </aside>
  </main>
  <footer>
    <span>Source-informed learning draft · accessed 22 August 2026</span>
    <span>{#each JOIN_GRAIN_MISSION.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < JOIN_GRAIN_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);overflow:auto;color:#f1ede4}header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px}.identity{display:flex;align-items:center;gap:12px}.role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:white;font:900 12px/1.15 var(--qx-font);text-align:center}.identity p{margin:0 0 3px;color:#bcb19e;font:800 12px var(--qx-font);letter-spacing:.1em}.identity h1{margin:0;color:white;font:700 26px Georgia,serif}nav{display:flex;gap:14px}nav a,footer a{color:#e2c7b7;font:800 13.5px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}.progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#63b13b;transition:width .35s ease}main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(360px,.82fr);gap:16px;align-items:start}.stage-card,.decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}.stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}.stage-heading h2{margin:1px 0 0;font:700 22px Georgia,serif;overflow-wrap:anywhere}.stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#25231f;color:white;font:900 13px var(--qx-font)}.eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}.viewport{position:relative;min-height:clamp(380px,51vh,570px);background:#e7e0d3;border-block:1px solid #d4cbb9;overflow:hidden;touch-action:none}.viewport :global(canvas){display:block;width:100%;height:100%}.loading{position:absolute;inset:0;display:grid;place-items:center;color:#6e6655;font:800 14.5px var(--qx-font)}.rowbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:11px 14px;background:#28251f;color:#f1ede4;font:700 13px var(--qx-font)}.rowbar b{font:900 15px var(--qx-font);font-variant-numeric:tabular-nums}.rowbar .on{color:#bcb19e;letter-spacing:.08em}.rowbar .out{margin-left:auto;padding:4px 10px;border-radius:16px;background:#a85a34;font:900 13px var(--qx-font)}.table-wrap{overflow-x:auto;padding:13px;background:#fbf8f1}.table-wrap table{width:100%;border-collapse:collapse;white-space:nowrap}.table-wrap th,.table-wrap td{padding:8px 10px;border:1px solid #d8d0be;text-align:left;font:700 12px var(--qx-font)}.table-wrap th{background:#28251f;color:white;font-size:12px}.table-wrap td{color:#4e473b}.decision-card{padding:clamp(18px,2.5vw,29px);overflow:visible}.theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}.theory h2,.completion h2{margin:0;font:700 24px Georgia,serif;text-wrap:balance}.theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 14.5px/1.5 var(--qx-font)}.evidence{margin:14px 0;padding:13px;border-radius:11px;background:#fbf8f1;border:1px solid #ddd5c5}.evidence p{margin:0 0 8px;font:650 14.5px/1.45 var(--qx-font)}.evidence code{color:#8c4c2e;font:800 13px var(--qx-font);overflow-wrap:anywhere}.options{display:grid;gap:8px}.options button{min-height:54px;padding:10px 12px;border:2px solid #ded6c6;border-radius:11px;background:white;color:#25231f;text-align:left;cursor:pointer}.options button b{font:850 13.5px/1.35 var(--qx-font)}.options button:hover,.options button.selected{border-color:#a85a34}.options button.right{border-color:#559535;background:#e7f0df}.options button.wrong{border-color:#b83a29;background:#f6ddd8}.options button:focus-visible,.continue:focus-visible,.completion button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.options button:disabled{cursor:default}.feedback{margin-top:11px;padding:11px 12px;border-radius:10px;font:650 13.5px/1.45 var(--qx-font)}.feedback.success{background:#e7f0df;color:#3d6529}.feedback.retry{background:#f6ddd8;color:#912c1e}.continue,.completion button{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a85a34;color:white;font:900 13.5px var(--qx-font);cursor:pointer}.completion{text-align:center}.completion>span{display:grid;place-items:center;width:58px;height:58px;margin:10px auto 14px;border-radius:50%;background:#559535;color:white;font:900 26px var(--qx-font)}.completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}.completion li{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #ddd5c5;font:700 13px var(--qx-font)}.completion li:last-child{border-bottom:0}.completion li span{color:#706856;font-variant-numeric:tabular-nums}footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font)}footer a{font-size:12px}@media(max-width:940px){main{grid-template-columns:1fr}.viewport{min-height:480px}footer{flex-direction:column}}@media(max-width:600px){.mission-shell{padding:13px 10px 25px}header{align-items:flex-start}.identity h1{font-size:20px}.role{width:42px;height:42px}nav{flex-direction:column;align-items:flex-end;gap:6px}.viewport{min-height:350px}.decision-card{padding:16px}.rowbar .out{margin-left:0}}@media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
