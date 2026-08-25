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
  let workstationOpen = false;
  let renderer, scene, camera, controls, terminal, cartridge, frame, resizeObserver, raycaster, pointer, screenClickHandler, THREE;
  let reducedMotion = false;
  let lightweightMode = false;

  $: caseRecord = MISSING_DATA_MISSION.cases[caseIndex];
  $: missionComplete = completed.length === MISSING_DATA_MISSION.cases.length;
  $: options = step === 'classification' ? MISSINGNESS_OPTIONS : TREATMENT_OPTIONS;
  $: progress = Math.round(((completed.length * 2 + (step === 'action' ? 1 : 0) + (correct ? 1 : 0)) / (MISSING_DATA_MISSION.cases.length * 2)) * 100);
  $: question = step === 'classification' ? 'What does this value mean in context?' : 'What should the data team do?';

  function openWorkstation() {
    workstationOpen = true;
  }

  function handleMonitorClick(event) {
    if (!raycaster || !pointer || !camera || !terminal?.parts?.screen) return;
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.intersectObject(terminal.parts.screen, false).length) openWorkstation();
  }

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
      lightweightMode = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
      if (lightweightMode) {
        reducedMotion = true;
        ready = true;
        return;
      }
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
      renderer.domElement.setAttribute('title', 'Click the monitor to open the data-quality workstation');
      renderer.domElement.style.cursor = 'pointer';
      host.appendChild(renderer.domElement);
      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();
      screenClickHandler = handleMonitorClick;
      renderer.domElement.addEventListener('click', screenClickHandler);
      controls = new OrbitControls(camera, renderer.domElement);
      // The page scrolls, so the wheel belongs to the page. Drag still rotates.
      controls.enableZoom = false;
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
        if (!renderer || !camera || !host?.clientWidth || !host?.clientHeight) return;
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
    if (renderer?.domElement && screenClickHandler) renderer.domElement.removeEventListener('click', screenClickHandler);
    renderer?.domElement?.remove();
  });

  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('missing-data');
</script>

<svelte:head><title>Missing Values Are Not Zero | Qubix University</title><meta name="description" content="Local AI draft of Qubix Superstore missing-data mission." /></svelte:head>

<section class="mission-shell qx-shell">
  <header><div class="identity"><span class="role">PRE<br />INTERN</span><div><p>{MISSING_DATA_MISSION.id} · {MISSING_DATA_MISSION.status}</p><h1>{MISSING_DATA_MISSION.title}</h1></div></div><nav><a href="?mode=game&mission=foundations">Foundations</a><a href="?mode=game&mission=classify-data">Mission 002</a><a href="?mode=assets&asset=data-quality-terminal">New assets</a><a href="?mode=wiki">Library</a></nav></header>
  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class:open={workstationOpen} class="stage-card">
      <div class="stage-heading"><div><p class="eyebrow">CORPORATE HQ · BRANCH FEED DESK</p><h2>{missionComplete ? 'Daily feed reviewed' : workstationOpen ? caseRecord.source : 'Your first data-quality shift'}</h2></div><span>{missionComplete ? '6 / 6' : `${caseIndex + 1} / ${MISSING_DATA_MISSION.cases.length}`}</span></div>

      {#if !workstationOpen}
        <section class="mission-intro" aria-labelledby="mission-intro-title">
          {#if !lightweightMode}
            <div class="viewport" bind:this={host}>
              {#if !ready && !loadError}<div class="loading">Starting data quality terminal…</div>{/if}
              {#if loadError}<div class="loading" role="alert">{loadError}</div>{/if}
              <button class="monitor-prompt" on:click={openWorkstation}><span>01</span><b>Click the monitor</b><small>Open today’s branch-feed review</small></button>
            </div>
          {:else}
            <button class="mobile-monitor" on:click={openWorkstation}><span class="screen-icon">QX<br /><small>DATA QUALITY</small></span><b>Open the monitor</b><small>Today’s branch-feed review is ready.</small></button>
          {/if}
          <div class="intro-copy">
            <p class="eyebrow">MISSION BRIEF · LEARN BY DOING</p>
            <h3>Six feed records need review.</h3>
            <p>Open the terminal and resolve each flagged value.</p>
            <button on:click={openWorkstation}>Enter the workstation <span aria-hidden="true">→</span></button>
          </div>
        </section>
      {:else}
        <section class="workstation-screen" aria-label="Data-quality workstation">
          <div class="screen-bar"><div><i></i><i></i><i></i></div><b>QX DATA QUALITY TERMINAL</b><span>{missionComplete ? 'REVIEW COMPLETE' : `CASE ${caseIndex + 1} OF ${MISSING_DATA_MISSION.cases.length}`}</span></div>
          {#if missionComplete}
            <section class="decision-card completion-panel">
              <div class="completion"><span>✓</span><p class="eyebrow">COMPETENCY DEMONSTRATED</p><h2>Meaning preserved</h2><p>{MISSING_DATA_MISSION.competency}</p><ul>{#each MISSING_DATA_MISSION.cases as item}<li><b>{item.field}</b><span>{item.classification.replaceAll('-', ' ')}</span></li>{/each}</ul><a class="next-mission" href="?mode=game&mission=table-grain">Continue to Mission 004</a><button on:click={resetMission}>Run mission again</button></div>
            </section>
          {:else}
            <div class="screen-layout">
              <section class="case-pane">
                <p class="pane-label">DATA PREVIEW</p>
                <div class="data-table-wrap record-strip">
                  <table>
                    <caption>{caseRecord.table} · 1 row</caption>
                    <thead><tr>{#each caseRecord.preview.columns as column}<th class:flagged={column === caseRecord.field}>{column}</th>{/each}</tr></thead>
                    <tbody><tr>{#each caseRecord.preview.row as value, index}<td class:flagged={caseRecord.preview.columns[index] === caseRecord.field}>{value}</td>{/each}</tr></tbody>
                  </table>
                </div>
                <article class="evidence"><small>ACTIVITY LOG</small><code>{caseRecord.evidence}</code></article>
              </section>

              <section class="decision-card">
                <div class="theory"><p class="eyebrow">{step === 'classification' ? 'STEP 1 · CLASSIFY' : 'STEP 2 · TREAT'}</p><h2>{question}</h2></div>
                <div class="options">
                  {#each options as option}
                    <button class:selected={selected === option.value} class:right={correct && selected === option.value} class:wrong={checked && !correct && selected === option.value} on:click={() => choose(option.value)} disabled={correct}><b>{option.label}</b></button>
                  {/each}
                </div>
                {#if checked}<div class:success={correct} class:retry={!correct} class="feedback" role="status">{#if correct}<b>Correct.</b> {step === 'classification' ? caseRecord.explanation : caseRecord.treatment}{:else}<b>Try again.</b> Check the activity log.{/if}</div>{/if}
                {#if correct}<button class="continue" on:click={continueMission}>{step === 'classification' ? 'Choose the treatment' : caseIndex === MISSING_DATA_MISSION.cases.length - 1 ? 'Complete mission' : 'Review next record'} →</button>{/if}
              </section>
            </div>
          {/if}
        </section>
      {/if}
    </section>
  </main>
  <footer><span>Source-informed learning draft · accessed 21 August 2026</span><span>{#each MISSING_DATA_MISSION.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < MISSING_DATA_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span></footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);overflow:auto;color:#f1ede4}header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px}.identity{display:flex;align-items:center;gap:12px}.role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:white;font:900 12px/1.15 var(--qx-font);text-align:center}.identity p{margin:0 0 3px;color:#bcb19e;font:800 12px var(--qx-font);letter-spacing:.1em}.identity h1{margin:0;color:white;font:700 26px Georgia,serif}nav{display:flex;gap:14px}nav a,footer a{color:#e2c7b7;font:800 13.5px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}.progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#63b13b;transition:width .35s ease}main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(370px,.82fr);gap:16px;align-items:start}.stage-card,.decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}.stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between}.stage-heading h2{margin:1px 0 0;font:700 22px Georgia,serif}.stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#25231f;color:white;font:900 13px var(--qx-font)}.eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}.viewport{position:relative;min-height:clamp(430px,62vh,680px);background:#e9e2d5;border-block:1px solid #d4cbb9;overflow:hidden;touch-action:none}.viewport :global(canvas){display:block;width:100%;height:100%}.loading{position:absolute;inset:0;display:grid;place-items:center;padding:24px;color:#706856;font:800 14.5px var(--qx-font)}.record-strip{display:grid;grid-template-columns:1fr 1.25fr .55fr}.record-strip div{padding:13px 16px;border-right:1px solid #d8d0be;min-width:0}.record-strip div:last-child{border-right:0}.record-strip small,.record-strip b{display:block}.record-strip small{margin-bottom:4px;color:#7a715f;font:900 11.5px var(--qx-font);letter-spacing:.1em}.record-strip b{font:800 13.5px var(--qx-font);overflow-wrap:anywhere}.record-strip .value b{color:#b02f22;font-size:15px}.decision-card{padding:clamp(18px,2.5vw,29px);overflow:visible}.theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}.theory h2,.completion h2{margin:0;font:700 24px Georgia,serif}.theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 14.5px/1.5 var(--qx-font)}.evidence{margin:14px 0;padding:13px;border-radius:11px;background:#fbf8f1;border:1px solid #ddd5c5}.evidence p{margin:0 0 9px;font:650 14.5px/1.45 var(--qx-font)}.evidence code{display:block;color:#8c4c2e;font:800 13px/1.45 var(--qx-font);white-space:normal}.options{display:grid;gap:8px}.options button{min-height:58px;padding:10px 12px;border:2px solid #ded6c6;border-radius:11px;background:white;color:#25231f;text-align:left;cursor:pointer}.options button b,.options button span{display:block}.options button b{font:900 13.5px var(--qx-font)}.options button span{margin-top:3px;color:#746b59;font:600 13px var(--qx-font)}.options button:hover,.options button.selected{border-color:#a85a34}.options button.right{border-color:#559535;background:#e7f0df}.options button.wrong{border-color:#b83a29;background:#f6ddd8}.options button:focus-visible,.continue:focus-visible,.completion button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.options button:disabled{cursor:default}.feedback{margin-top:11px;padding:11px 12px;border-radius:10px;font:650 13.5px/1.45 var(--qx-font)}.feedback.success{background:#e7f0df;color:#3d6529}.feedback.retry{background:#f6ddd8;color:#912c1e}.continue,.completion button,.next-mission{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a85a34;color:white;font:900 13.5px var(--qx-font);cursor:pointer}.completion{text-align:center}.completion>span{display:grid;place-items:center;width:58px;height:58px;margin:10px auto 14px;border-radius:50%;background:#559535;color:white;font:900 26px var(--qx-font)}.completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}.completion li{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #ddd5c5;font:700 13px var(--qx-font)}.completion li:last-child{border-bottom:0}.completion li span{color:#706856;text-transform:capitalize}.next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font)}footer a{font-size:12px}
  main{display:block}
  .stage-card{max-width:1320px;margin:0 auto}.stage-card.open{background:#201c17}.stage-card.open .stage-heading{border-bottom:1px solid #344c43;background:#201c17}.stage-card.open .stage-heading h2{color:#eef3ec}
  .mission-intro{display:grid;grid-template-columns:minmax(0,1.22fr) minmax(340px,.78fr);min-height:610px}
  .mission-intro .viewport{min-height:610px;border-bottom:0}
  .monitor-prompt{position:absolute;left:50%;bottom:22px;z-index:3;transform:translateX(-50%);min-width:310px;min-height:70px;padding:10px 18px;display:grid;grid-template-columns:38px 1fr;column-gap:10px;align-items:center;border:1px solid rgba(255,255,255,.55);border-radius:13px;background:rgba(30,34,29,.92);box-shadow:0 12px 35px rgba(0,0,0,.2);color:#fff;text-align:left;cursor:pointer}
  .monitor-prompt>span{grid-row:1/3;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#63b13b;font:900 12px var(--qx-font)}.monitor-prompt b{align-self:end;font:900 14px var(--qx-font)}.monitor-prompt small{align-self:start;color:#cdd8c8;font:700 12px var(--qx-font)}
  .monitor-prompt:hover{background:#25231f}.monitor-prompt:focus-visible,.intro-copy button:focus-visible,.mobile-monitor:focus-visible{outline:3px solid #a85a34;outline-offset:3px}
  .intro-copy{padding:clamp(28px,4vw,52px);display:flex;flex-direction:column;justify-content:center;border-left:1px solid #d4cbb9;background:#fbf8f1}
  .intro-copy h3{margin:4px 0 12px;font:700 clamp(27px,3vw,38px)/1.08 Georgia,serif;letter-spacing:-.02em}.intro-copy>p:not(.eyebrow){margin:0;color:#625a49;font:650 15px/1.65 var(--qx-font)}
  .intro-copy button{min-height:48px;margin-top:24px;border:0;border-radius:11px;background:#a85a34;color:#fff;font:900 14px var(--qx-font);cursor:pointer}.intro-copy button:hover{background:#25231f}
  .mobile-monitor{min-height:280px;margin:18px;padding:24px;display:grid;place-items:center;align-content:center;gap:12px;border:10px solid #25231f;border-bottom-width:30px;border-radius:14px;background:#bfe8d6;color:#20382e;cursor:pointer}.mobile-monitor .screen-icon{font:900 42px/1 var(--qx-font);letter-spacing:.04em}.mobile-monitor .screen-icon small{font-size:10px}.mobile-monitor>b{font:900 17px var(--qx-font)}.mobile-monitor>small{font:700 13px var(--qx-font)}
  .workstation-screen{margin:0 14px 14px;padding:12px;border:8px solid #25231f;border-radius:12px;background:#201c17;box-shadow:inset 0 0 0 1px #47665a,0 18px 50px rgba(0,0,0,.25);color:#e9f0e9}
  .screen-bar{min-height:42px;padding:0 12px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;border-bottom:1px solid #47665a;color:#a9bdb3;font:850 11px var(--qx-font);letter-spacing:.08em}.screen-bar>div{display:flex;gap:6px}.screen-bar i{width:8px;height:8px;border-radius:50%;background:#a85a34}.screen-bar i:nth-child(2){background:#e2a42d}.screen-bar i:nth-child(3){background:#63b13b}.screen-bar b{color:#e9f0e9}.screen-bar>span{text-align:right}
  .screen-layout{display:grid;grid-template-columns:minmax(330px,.84fr) minmax(0,1.16fr);gap:1px;background:#47665a}
  .case-pane,.workstation-screen .decision-card{min-width:0;border:0;border-radius:0;background:#edf1ed;color:#25231f}
  .case-pane{padding:clamp(18px,2.6vw,30px)}.pane-label{margin:0 0 10px;color:#55756f;font:900 11px var(--qx-font);letter-spacing:.12em}.data-table-wrap.record-strip{display:block;max-width:100%;overflow-x:auto;border:1px solid #c7d1ca;border-radius:11px;background:#fff}.data-table-wrap table{width:100%;border-collapse:collapse;font:750 12px var(--qx-font);white-space:nowrap}.data-table-wrap caption{padding:10px 12px;border-bottom:1px solid #d5ddd7;background:#f7f9f6;color:#375a4e;font:900 11px var(--qx-font);letter-spacing:.06em;text-align:left}.data-table-wrap th,.data-table-wrap td{padding:11px 12px;border-right:1px solid #d5ddd7;text-align:left}.data-table-wrap th:last-child,.data-table-wrap td:last-child{border-right:0}.data-table-wrap th{color:#61706a;font-size:10.5px;letter-spacing:.04em}.data-table-wrap td{border-top:1px solid #d5ddd7;color:#25231f}.data-table-wrap .flagged{background:#f8e4df;color:#a02d1d;font-weight:900}.case-pane .evidence{margin:16px 0 0;background:#dfe7e2;border-color:#c1cec5}.case-pane .evidence small{display:block;margin-bottom:7px;color:#55756f;font:900 10.5px var(--qx-font);letter-spacing:.1em}
  .workstation-screen .decision-card{padding:clamp(18px,2.6vw,30px);overflow:visible}.workstation-screen .theory{border-color:#c7d1ca}.workstation-screen .options{grid-template-columns:repeat(2,minmax(0,1fr))}.workstation-screen .options button{min-height:54px}.workstation-screen .options button:last-child:nth-child(odd){grid-column:1/-1}.completion-panel{max-width:760px;margin:0 auto}.completion-panel .completion{padding:18px}
  @media(max-width:940px){main{grid-template-columns:1fr}.mission-intro,.screen-layout{grid-template-columns:1fr}.intro-copy{border-top:1px solid #d4cbb9;border-left:0}.viewport{min-height:500px}.decision-card{min-height:0}footer{flex-direction:column}}
  @media(max-width:600px){.mission-shell{padding:13px 10px 25px}header{align-items:flex-start}.identity h1{font-size:20px}.role{width:42px;height:42px}nav{flex-direction:column;align-items:flex-end;gap:6px}.viewport{min-height:360px}.intro-copy{padding:24px 18px}.mobile-monitor{margin:10px}.workstation-screen{margin:0 6px 8px;padding:5px;border-width:5px}.screen-bar{grid-template-columns:1fr auto;padding:8px}.screen-bar>b{display:none}.screen-layout{display:block}.record-strip{grid-template-columns:1fr}.record-strip div{border-right:0;border-bottom:1px solid #d8d0be}.record-strip div:last-child{border-bottom:0}.decision-card{padding:16px}.workstation-screen .options{grid-template-columns:1fr}.workstation-screen .options button:last-child:nth-child(odd){grid-column:auto}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
