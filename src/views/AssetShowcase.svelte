<script>
  import { onDestroy, onMount } from 'svelte';
  import { CHECKOUT_STATION_ASSET, createCheckoutStation } from '../lib/three/assets/index.js';

  let host;
  let ready = false;
  let running = false;
  let selectedPart = 'Whole station';
  let loadError = '';
  let renderer, scene, camera, controls, station, product, frame, resizeObserver, THREE;
  let scanStart = 0;
  let reducedMotion = false;

  const partNames = ['Whole station', 'Conveyor belt', 'Scanner', 'Till display', 'Bagging area'];

  function selectPart(name) {
    selectedPart = name;
    if (!station) return;
    station.group.traverse((object) => {
      if (!object.material?.emissive) return;
      object.material.emissiveIntensity = object.name === 'scanner-light' ? 0.2 : 0;
    });
    const objectName = {
      'Conveyor belt': 'conveyor-belt',
      Scanner: 'scanner-light',
      'Till display': 'display-screen',
      'Bagging area': 'bagging-platform'
    }[name];
    const object = objectName ? station.group.getObjectByName(objectName) : null;
    if (object?.material?.emissive) object.material.emissiveIntensity = 0.72;
  }

  function runScan() {
    if (!ready || running) return;
    if (reducedMotion) {
      product.position.copy(station.attachment('bagging-area').position);
      product.position.y += 0.12;
      station.parts.display.material.emissiveIntensity = 0.95;
      selectedPart = 'Bagging area';
      return;
    }
    running = true;
    scanStart = performance.now();
    product.position.copy(station.attachment('belt-entry').position);
    product.position.y += 0.12;
    selectPart('Scanner');
  }

  function resetView() {
    if (!camera || !controls) return;
    camera.position.set(5.2, 3.7, 5.8);
    controls.target.set(0, 0.78, 0);
    controls.update();
    selectedPart = 'Whole station';
    selectPart(selectedPart);
  }

  onMount(async () => {
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

      scene = new THREE.Scene();
      scene.background = new THREE.Color('#f1ede4');
      scene.fog = new THREE.Fog('#f1ede4', 9, 15);

      camera = new THREE.PerspectiveCamera(34, Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1), 0.1, 40);
      camera.position.set(5.2, 3.7, 5.8);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.domElement.setAttribute('aria-label', 'Interactive three-dimensional preview of the Qubix Superstore checkout station');
      host.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 4.2;
      controls.maxDistance = 10;
      controls.minPolarAngle = 0.6;
      controls.maxPolarAngle = 1.42;
      controls.target.set(0, 0.78, 0);
      controls.update();

      station = createCheckoutStation(THREE);
      scene.add(station.group);

      const productMaterial = new THREE.MeshStandardMaterial({ color: 0xa85a34, roughness: 0.62 });
      product = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.25), productMaterial);
      product.name = 'demo-product';
      product.castShadow = true;
      product.position.copy(station.attachment('belt-entry').position);
      product.position.y += 0.12;
      scene.add(product);

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(6.2, 64),
        new THREE.MeshStandardMaterial({ color: 0xe7e0d2, roughness: 0.95 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.015;
      ground.receiveShadow = true;
      scene.add(ground);

      scene.add(new THREE.HemisphereLight(0xfffbf1, 0x6b655c, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 2.8);
      key.position.set(4.5, 7, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -6;
      key.shadow.camera.right = 6;
      key.shadow.camera.top = 5;
      key.shadow.camera.bottom = -5;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xddeee4, 1.15);
      fill.position.set(-4, 3, -3);
      scene.add(fill);

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

        if (running) {
          const elapsed = Math.min((now - scanStart) / 2200, 1);
          const eased = elapsed < 0.5 ? 2 * elapsed * elapsed : 1 - Math.pow(-2 * elapsed + 2, 2) / 2;
          const start = station.attachment('belt-entry').position;
          const end = station.attachment('bagging-area').position;
          product.position.lerpVectors(start, end, eased);
          product.position.y += 0.12 + Math.sin(elapsed * Math.PI) * 0.035;
          product.rotation.y = elapsed * Math.PI * 0.3;
          station.parts.scanLight.material.emissiveIntensity = Math.abs(product.position.x - 0.68) < 0.24 ? 2.4 : 0.2;
          station.parts.display.material.emissiveIntensity = elapsed > 0.48 ? 0.95 : 0.34;
          if (elapsed === 1) {
            running = false;
            selectedPart = 'Bagging area';
            station.parts.scanLight.material.emissiveIntensity = 0.2;
          }
        }

        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(render);
    } catch (error) {
      loadError = 'The 3D preview could not start on this device. The asset description and controls remain available.';
      console.error(error);
    }
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    controls?.dispose();
    station?.dispose();
    scene?.traverse(object => {
      if (object === station?.group || station?.group?.getObjectById(object.id)) return;
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
      else object.material?.dispose?.();
    });
    renderer?.dispose();
    renderer?.domElement?.remove();
  });
</script>

<svelte:head>
  <title>Checkout Station Asset | Qubix University</title>
  <meta name="description" content="Local authoring preview of the reusable Qubix Superstore checkout station." />
</svelte:head>

<section class="asset-shell qx-shell">
  <header>
    <div>
      <p class="eyebrow">THREE.JS ASSET 001 · {CHECKOUT_STATION_ASSET.status}</p>
      <h1>Superstore checkout station</h1>
      <p class="lede">A reusable, low-poly checkout lane for programming, transaction-data and inventory missions.</p>
    </div>
    <nav aria-label="Asset previews"><a href="?mode=assets&asset=product-package">Asset 002</a><a href="?mode=wiki">Library</a></nav>
  </header>

  <main>
    <section class="preview-card" aria-labelledby="preview-title">
      <div class="preview-heading">
        <div>
          <span>LIVE ASSET PREVIEW</span>
          <h2 id="preview-title">Inspect the station</h2>
        </div>
        <span class:ready class="status">{ready ? 'Ready' : 'Loading'}</span>
      </div>

      <div class="viewport" bind:this={host}>
        {#if !ready && !loadError}<div class="loading">Preparing the checkout…</div>{/if}
        {#if loadError}<p class="fallback" role="status">{loadError}</p>{/if}
        <div class="canvas-note">Drag to orbit · pinch or scroll to zoom</div>
      </div>

      <div class="primary-controls">
        <button class="run" on:click={runScan} disabled={!ready || running}>{running ? 'Scanning product…' : 'Run product scan'}</button>
        <button on:click={resetView} disabled={!ready}>Reset view</button>
      </div>
    </section>

    <aside class="inspector">
      <section>
        <p class="eyebrow">PART INSPECTOR</p>
        <h2>{selectedPart}</h2>
        <div class="part-list" role="group" aria-label="Highlight a checkout station part">
          {#each partNames as part}
            <button class:active={selectedPart === part} on:click={() => selectPart(part)} disabled={!ready}>{part}</button>
          {/each}
        </div>
      </section>

      <section class="facts">
        <p class="eyebrow">ASSET CONTRACT</p>
        <dl>
          <div><dt>Identifier</dt><dd>{CHECKOUT_STATION_ASSET.id}</dd></div>
          <div><dt>Scale</dt><dd>Real-world metres</dd></div>
          <div><dt>Footprint</dt><dd>4.6 × 1.45 m</dd></div>
          <div><dt>Named anchors</dt><dd>{CHECKOUT_STATION_ASSET.attachmentPoints.length}</dd></div>
        </dl>
      </section>

      <section class="description">
        <p class="eyebrow">NON-3D DESCRIPTION</p>
        <p>A cream checkout cabinet holds a dark conveyor belt, clay-coloured scanner, green bagging platform, keypad, receipt printer and customer display. A demonstration product travels from the belt through the scanner to the bagging area.</p>
      </section>
    </aside>
  </main>
</section>

<style>
  :global(html), :global(body) { overflow: auto; background: #f1ede4; }
  :global(body) { position: static; }
  .asset-shell { min-height: 100vh; max-width: none; padding: clamp(18px, 4vw, 52px); background: radial-gradient(circle at 76% 4%, #fbf8f1, #f1ede4 58%); overflow:auto; }
  header { max-width: 1240px; margin: 0 auto 24px; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; }
  header > div { max-width: 760px; }
  .eyebrow { margin:0 0 8px; color:var(--qx-accent-text); font:800 13.5px/1.3 var(--qx-font); letter-spacing:.12em; }
  h1, h2 { color:var(--qx-text); font-family:Georgia,serif; }
  h1 { margin:0; font-size:clamp(34px,5vw,66px); line-height:.96; letter-spacing:-.045em; }
  h2 { margin:2px 0 0; font-size:23px; }
  .lede { max-width:680px; margin:16px 0 0; color:var(--qx-text-2); font:500 17px/1.55 var(--qx-font); }
  nav { display:flex; gap:14px; }
  header a { color:var(--qx-accent-text); font:800 15px var(--qx-font); text-decoration:none; border-bottom:1px solid currentColor; padding-bottom:3px; white-space:nowrap; }
  main { max-width:1240px; margin:0 auto; display:grid; grid-template-columns:minmax(0,1fr) 310px; gap:20px; }
  .preview-card, .inspector section { background:rgba(255,255,255,.8); border:1px solid var(--qx-border-2); border-radius:18px; box-shadow:var(--qx-shadow-card); }
  .preview-card { overflow:hidden; }
  .preview-heading { min-height:82px; padding:18px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
  .preview-heading span { color:var(--qx-text-faint); font:800 13px var(--qx-font); letter-spacing:.12em; }
  .status { padding:7px 11px; border-radius:999px; background:var(--qx-surface-3); }
  .status.ready { color:var(--qx-green-text); background:var(--qx-green-soft); }
  .viewport { position:relative; min-height:clamp(360px,58vh,640px); background:#f1ede4; border-block:1px solid var(--qx-border); overflow:hidden; touch-action:none; }
  .viewport :global(canvas) { display:block; width:100%; height:100%; }
  .loading, .fallback { position:absolute; inset:0; display:grid; place-items:center; padding:32px; color:var(--qx-text-dim); font:700 14px var(--qx-font); text-align:center; }
  .canvas-note { position:absolute; left:14px; bottom:14px; padding:7px 10px; border-radius:999px; background:rgba(36,31,22,.78); color:#fff; font:700 13px var(--qx-font); letter-spacing:.03em; pointer-events:none; }
  .primary-controls { display:flex; flex-wrap:wrap; gap:10px; padding:16px 20px 20px; }
  button { min-height:44px; border:1px solid var(--qx-border-2); border-radius:12px; padding:10px 14px; background:#fff; color:var(--qx-text); font:800 14.5px var(--qx-font); cursor:pointer; }
  button:hover:not(:disabled), button:focus-visible { border-color:var(--qx-accent); outline:2px solid var(--qx-accent-soft); outline-offset:2px; }
  button:disabled { opacity:.48; cursor:not-allowed; }
  button.run { color:#fff; background:var(--qx-accent); border-color:var(--qx-accent); padding-inline:20px; }
  .inspector { display:flex; flex-direction:column; gap:14px; }
  .inspector section { padding:18px; box-shadow:none; }
  .part-list { display:grid; gap:7px; margin-top:15px; }
  .part-list button { text-align:left; }
  .part-list button.active { color:#fff; background:var(--qx-text); border-color:var(--qx-text); }
  dl { display:grid; gap:12px; margin:14px 0 0; }
  dl div { display:grid; grid-template-columns:98px 1fr; gap:9px; align-items:baseline; }
  dt { color:var(--qx-text-faint); font:700 13.5px var(--qx-font); }
  dd { min-width:0; margin:0; color:var(--qx-text); font:700 14.5px/1.4 var(--qx-font); overflow-wrap:anywhere; }
  .description p:last-child { margin:10px 0 0; color:var(--qx-text-2); font:500 15px/1.58 var(--qx-font); }
  @media (max-width:820px) {
    .asset-shell { padding:18px 14px 34px; }
    header { align-items:flex-start; flex-direction:column; }
    main { grid-template-columns:1fr; }
    .inspector { display:grid; grid-template-columns:1fr 1fr; }
    .description { grid-column:1/-1; }
    .viewport { min-height:430px; }
  }
  @media (max-width:520px) {
    h1 { font-size:40px; }
    .lede { font-size:15px; }
    .preview-heading { min-height:72px; }
    .viewport { min-height:360px; }
    .primary-controls > button { flex:1 1 140px; }
    .inspector { display:flex; }
    .canvas-note { left:50%; transform:translateX(-50%); white-space:nowrap; }
  }
  @media (prefers-reduced-motion:reduce) { .canvas-note { display:none; } }
</style>
