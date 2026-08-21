<script>
  import { onDestroy, onMount } from 'svelte';
  import { recordCompletion } from '../lib/game/progress.js';
  import { createBranchFeedCartridge, createDataQualityTerminal } from '../lib/three/assets/index.js';
  import { MISSING_DATA_MISSION, MISSINGNESS_OPTIONS, TREATMENT_OPTIONS, answerForMissingCase } from '../lib/game/missing-data-mission.js';

  let host;
  let ready = false;
  let loadError = '';
  let caseIndex = 0;
  let step = 'classification';
  let selected = '';
  let checked = false;
  let correct = false;
  let completed = [];
  let renderer, scene, camera, controls, terminal, cartridge, frame, resizeObserver, THREE;
  let reducedMotion = false;

  $: caseRecord = MISSING_DATA_MISSION.cases[caseIndex];
  $: missionComplete = completed.length === MISSING_DATA_MISSION.cases.length;
  $: options = step === 'classification' ? MISSINGNESS_OPTIONS : TREATMENT_OPTIONS;
  $: progress = Math.round(((completed.length * 2 + (step === 'action' ? 1 : 0) + (correct ? 1 : 0)) / (MISSING_DATA_MISSION.cases.length * 2)) * 100);
  $: question = step === 'classification' ? 'What does this value mean in context?' : 'What should the data team do?';
  $: theory = step === 'classification'
    ? 'An empty cell does not explain itself. Use the process evidence to distinguish unknown, not applicable, pending, and deliberately uncollected data from a true zero.'
    : 'Preserve what is known and why it is missing. Never replace uncertainty with a convenient number unless a justified method is explicitly recorded.';

  function placeCartridge() {
    if (!scene || !terminal || !caseRecord) return;
    if (cartridge) {
      scene.remove(cartridge.group);
      cartridge.dispose();
    }
    cartridge = createBranchFeedCartridge(THREE, { ...caseRecord, valueState: caseRecord.valueState });
    cartridge.group.scale.setScalar(0.82);
    cartridge.group.position.copy(terminal.attachment('review-position').position);
    cartridge.group.position.y -= 0.35;
    cartridge.group.rotation.set(-0.08, -0.18, 0.03);
    scene.add(cartridge.group);
    terminal.setStatus(caseRecord.valueState === 'missing' ? 'warning' : 'idle');
  }

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForMissingCase(caseRecord, step);
    terminal?.setStatus(correct ? 'resolved' : 'error');
    cartridge?.setState(correct ? 'resolved' : 'error');
  }

  function continueMission() {
    if (!correct) return;
    if (step === 'classification') {
      step = 'action';
      selected = '';
      checked = false;
      correct = false;
      terminal?.setStatus('warning');
      cartridge?.setState('warning');
      return;
    }
    completed = [...completed, caseRecord.id];
    caseIndex += 1;
    step = 'classification';
    selected = '';
    checked = false;
    correct = false;
    if (caseIndex < MISSING_DATA_MISSION.cases.length) setTimeout(placeCartridge, 0);
    else {
      terminal?.setStatus('resolved');
      if (cartridge) {
        scene?.remove(cartridge.group);
        cartridge.dispose();
        cartridge = null;
      }
    }
  }

  function resetMission() {
    caseIndex = 0;
    step = 'classification';
    selected = '';
    checked = false;
    correct = false;
    completed = [];
    setTimeout(placeCartridge, 0);
  }

  onMount(async () => {
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#e9e2d5');
      scene.fog = new THREE.Fog('#e9e2d5', 8, 16);
      camera = new THREE.PerspectiveCamera(36, Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1), 0.1, 35);
      camera.position.set(4.6, 3.2, 5.2);
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.domElement.setAttribute('aria-label', 'Interactive Qubix data quality terminal reviewing branch feed cartridges');
      host.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 4.6;
      controls.maxDistance = 9;
      controls.target.set(0, 0.95, 0);
      controls.update();
      terminal = createDataQualityTerminal(THREE);
      scene.add(terminal.group);
      placeCartridge();
      const floor = new THREE.Mesh(new THREE.CircleGeometry(6.5, 56), new THREE.MeshStandardMaterial({ color: 0xd9d0bf, roughness: 0.96 }));
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.HemisphereLight(0xfffbef, 0x68645d, 2.25));
      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(4, 7, 4);
      key.castShadow = true;
      scene.add(key);
      resizeObserver = new ResizeObserver(() => {
        if (!renderer || !camera || !host.clientWidth || !host.clientHeight) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight, false);
      });
      resizeObserver.observe(host);
      ready = true;
      const render = now => {
        frame = requestAnimationFrame(render);
        controls.update();
        if (cartridge && !reducedMotion) cartridge.group.rotation.z = 0.03 + Math.sin(now * 0.0018) * 0.018;
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(render);
    } catch (error) {
      loadError = 'The data quality terminal could not start on this device.';
      console.error(error);
    }
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    controls?.dispose();
    cartridge?.dispose();
    terminal?.dispose();
    scene?.traverse(object => {
      if (terminal?.group?.getObjectById(object.id) || cartridge?.group?.getObjectById(object.id)) return;
      object.geometry?.dispose();
      object.material?.dispose?.();
    });
    renderer?.dispose();
    renderer?.domElement?.remove();
  });

  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('missing-data');
</script>

<svelte:head><title>Missing Values Are Not Zero | Qubix University</title><meta name="description" content="Local AI draft of Qubix Superstore missing-data mission." /></svelte:head>

<section class="mission-shell qx-shell">
  <header><div class="identity"><span class="role">PRE<br />INTERN</span><div><p>{MISSING_DATA_MISSION.id} · {MISSING_DATA_MISSION.status}</p><h1>{MISSING_DATA_MISSION.title}</h1></div></div><nav><a href="?mode=game&mission=classify-data">Mission 002</a><a href="?mode=assets&asset=data-quality-terminal">New assets</a><a href="?mode=wiki">Library</a></nav></header>
  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class="stage-card">
      <div class="stage-heading"><div><p class="eyebrow">CORPORATE HQ · BRANCH FEED DESK</p><h2>{missionComplete ? 'Daily feed reviewed' : caseRecord.source}</h2></div><span>{missionComplete ? '6 / 6' : `${caseIndex + 1} / ${MISSING_DATA_MISSION.cases.length}`}</span></div>
      <div class="viewport" bind:this={host}>{#if !ready && !loadError}<div class="loading">Starting data quality terminal…</div>{/if}{#if loadError}<div class="loading" role="alert">{loadError}</div>{/if}</div>
      {#if !missionComplete}
        <article class="record-strip"><div><small>TABLE</small><b>{caseRecord.table}</b></div><div><small>FIELD</small><b>{caseRecord.field}</b></div><div class="value"><small>VALUE</small><b>{caseRecord.displayValue}</b></div></article>
      {/if}
    </section>

    <aside class="decision-card">
      {#if missionComplete}
        <div class="completion"><span>✓</span><p class="eyebrow">COMPETENCY DEMONSTRATED</p><h2>Meaning preserved</h2><p>{MISSING_DATA_MISSION.competency}</p><ul>{#each MISSING_DATA_MISSION.cases as item}<li><b>{item.field}</b><span>{item.classification.replaceAll('-', ' ')}</span></li>{/each}</ul><a class="next-mission" href="?mode=game&mission=table-grain">Continue to Mission 004</a><button on:click={resetMission}>Run mission again</button></div>
      {:else}
        <div class="theory"><p class="eyebrow">THEORY → PRACTICAL · {step === 'classification' ? 'MEANING' : 'TREATMENT'}</p><h2>{question}</h2><p>{theory}</p></div>
        <article class="evidence"><p>{caseRecord.context}</p><code>{caseRecord.evidence}</code></article>
        <div class="options">
          {#each options as option}
            <button class:selected={selected === option.value} class:right={correct && selected === option.value} class:wrong={checked && !correct && selected === option.value} on:click={() => choose(option.value)} disabled={correct}><b>{option.label}</b><span>{option.note}</span></button>
          {/each}
        </div>
        {#if checked}<div class:success={correct} class:retry={!correct} class="feedback" role="status">{#if correct}<b>Correct.</b> {step === 'classification' ? caseRecord.explanation : caseRecord.treatment}{:else}<b>Try again.</b> Use the operational evidence; the visible cell alone is not enough.{/if}</div>{/if}
        {#if correct}<button class="continue" on:click={continueMission}>{step === 'classification' ? 'Choose the treatment' : caseIndex === MISSING_DATA_MISSION.cases.length - 1 ? 'Complete mission' : 'Review next record'} →</button>{/if}
      {/if}
    </aside>
  </main>
  <footer><span>Source-informed learning draft · accessed 21 August 2026</span><span>{#each MISSING_DATA_MISSION.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < MISSING_DATA_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span></footer>
</section>

<style>
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);overflow:auto;color:#f1ede4}header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px}.identity{display:flex;align-items:center;gap:12px}.role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:white;font:900 9px/1.15 var(--qx-font);text-align:center}.identity p{margin:0 0 3px;color:#bcb19e;font:800 9px var(--qx-font);letter-spacing:.1em}.identity h1{margin:0;color:white;font:700 26px Georgia,serif}nav{display:flex;gap:14px}nav a,footer a{color:#e2c7b7;font:800 11px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}.progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#63b13b;transition:width .35s ease}main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(370px,.82fr);gap:16px;align-items:start}.stage-card,.decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}.stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between}.stage-heading h2{margin:1px 0 0;font:700 22px Georgia,serif}.stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#25231f;color:white;font:900 10px var(--qx-font)}.eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 9px var(--qx-font);letter-spacing:.12em}.viewport{position:relative;min-height:clamp(430px,62vh,680px);background:#e9e2d5;border-block:1px solid #d4cbb9;overflow:hidden;touch-action:none}.viewport :global(canvas){display:block;width:100%;height:100%}.loading{position:absolute;inset:0;display:grid;place-items:center;padding:24px;color:#706856;font:800 12px var(--qx-font)}.record-strip{display:grid;grid-template-columns:1fr 1.25fr .55fr}.record-strip div{padding:13px 16px;border-right:1px solid #d8d0be;min-width:0}.record-strip div:last-child{border-right:0}.record-strip small,.record-strip b{display:block}.record-strip small{margin-bottom:4px;color:#7a715f;font:900 8px var(--qx-font);letter-spacing:.1em}.record-strip b{font:800 11px var(--qx-font);overflow-wrap:anywhere}.record-strip .value b{color:#b02f22;font-size:15px}.decision-card{padding:clamp(18px,2.5vw,29px);overflow:visible}.theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}.theory h2,.completion h2{margin:0;font:700 24px Georgia,serif}.theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 12.5px/1.5 var(--qx-font)}.evidence{margin:14px 0;padding:13px;border-radius:11px;background:#fbf8f1;border:1px solid #ddd5c5}.evidence p{margin:0 0 9px;font:650 12px/1.45 var(--qx-font)}.evidence code{display:block;color:#8c4c2e;font:800 10.5px/1.45 var(--qx-font);white-space:normal}.options{display:grid;gap:8px}.options button{min-height:58px;padding:10px 12px;border:2px solid #ded6c6;border-radius:11px;background:white;color:#25231f;text-align:left;cursor:pointer}.options button b,.options button span{display:block}.options button b{font:900 11.5px var(--qx-font)}.options button span{margin-top:3px;color:#746b59;font:600 10px var(--qx-font)}.options button:hover,.options button.selected{border-color:#a85a34}.options button.right{border-color:#559535;background:#e7f0df}.options button.wrong{border-color:#b83a29;background:#f6ddd8}.options button:focus-visible,.continue:focus-visible,.completion button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.options button:disabled{cursor:default}.feedback{margin-top:11px;padding:11px 12px;border-radius:10px;font:650 11.5px/1.45 var(--qx-font)}.feedback.success{background:#e7f0df;color:#3d6529}.feedback.retry{background:#f6ddd8;color:#912c1e}.continue,.completion button,.next-mission{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a85a34;color:white;font:900 11.5px var(--qx-font);cursor:pointer}.completion{text-align:center}.completion>span{display:grid;place-items:center;width:58px;height:58px;margin:10px auto 14px;border-radius:50%;background:#559535;color:white;font:900 26px var(--qx-font)}.completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}.completion li{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #ddd5c5;font:700 10.5px var(--qx-font)}.completion li:last-child{border-bottom:0}.completion li span{color:#706856;text-transform:capitalize}.next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 9px/1.5 var(--qx-font)}footer a{font-size:9px}
  @media(max-width:940px){main{grid-template-columns:1fr}.viewport{min-height:500px}.decision-card{min-height:0}footer{flex-direction:column}}
  @media(max-width:600px){.mission-shell{padding:13px 10px 25px}header{align-items:flex-start}.identity h1{font-size:20px}.role{width:42px;height:42px}nav{flex-direction:column;align-items:flex-end;gap:6px}.viewport{min-height:360px}.record-strip{grid-template-columns:1fr}.record-strip div{border-right:0;border-bottom:1px solid #d8d0be}.record-strip div:last-child{border-bottom:0}.decision-card{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
