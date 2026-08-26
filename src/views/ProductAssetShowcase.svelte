<script>
  import { onDestroy, onMount } from 'svelte';
  import { PRODUCT_CATALOG, PRODUCT_PACKAGE_ASSET, createProductPackage } from '../lib/three/assets/index.js';

  let host;
  let ready = false;
  let loadError = '';
  let selected = PRODUCT_CATALOG[0];
  let quantity = 1;
  let scanEvent = null;
  let eventSequence = 1;
  let scanStarted = 0;
  let reducedMotion = false;
  let renderer, scene, camera, controls, productAsset, productStage, scanBeam, frame, resizeObserver, THREE;

  $: grossAmount = +(selected.unitPrice * quantity).toFixed(2);
  $: lineRecord = scanEvent ? {
    transaction_id: 'TX-PREVIEW-001',
    sku: selected.sku,
    quantity,
    unit_price: selected.unitPrice,
    gross_amount: grossAmount,
    tax_rate: selected.taxRate
  } : null;

  function showProduct(record) {
    selected = record;
    quantity = 1;
    scanEvent = null;
    if (!THREE || !productStage) return;
    if (productAsset) {
      productStage.remove(productAsset.group);
      productAsset.dispose();
    }
    productAsset = createProductPackage(THREE, record);
    productAsset.group.rotation.y = -0.28;
    productStage.add(productAsset.group);
  }

  function scanProduct() {
    if (!ready) return;
    scanEvent = Object.freeze({
      event_id: `SCAN-PREVIEW-${String(eventSequence++).padStart(3, '0')}`,
      event_type: 'barcode_scanned',
      barcode: selected.barcode,
      checkout_id: 'CO-03',
      observed_at: new Date().toISOString()
    });
    scanStarted = reducedMotion ? 0 : performance.now();
    if (scanBeam) scanBeam.visible = !reducedMotion;
  }

  function changeQuantity(change) {
    quantity = Math.max(1, Math.min(12, quantity + change));
  }

  onMount(async () => {
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

      scene = new THREE.Scene();
      scene.background = new THREE.Color('#f1ede4');
      scene.fog = new THREE.Fog('#f1ede4', 7, 12);
      camera = new THREE.PerspectiveCamera(34, Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1), 0.1, 30);
      camera.position.set(3.15, 2.25, 4.2);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.domElement.setAttribute('aria-label', 'Interactive three-dimensional preview of a data-bearing Qubix Superstore product package');
      host.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 2.8;
      controls.maxDistance = 7;
      controls.minPolarAngle = 0.55;
      controls.maxPolarAngle = 1.42;
      controls.target.set(0, 0.52, 0);
      controls.update();

      productStage = new THREE.Group();
      scene.add(productStage);
      showProduct(selected);

      const turntableMaterial = new THREE.MeshStandardMaterial({ color: 0x302a21, roughness: 0.55, metalness: 0.16 });
      const turntable = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.02, 0.14, 48), turntableMaterial);
      turntable.position.y = -0.075;
      turntable.receiveShadow = true;
      scene.add(turntable);

      const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe5ddcf, roughness: 0.96 });
      const floor = new THREE.Mesh(new THREE.CircleGeometry(5, 64), floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.15;
      floor.receiveShadow = true;
      scene.add(floor);

      const beamMaterial = new THREE.MeshBasicMaterial({ color: 0xcf3423, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      scanBeam = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.035), beamMaterial);
      scanBeam.name = 'preview-scan-beam';
      scanBeam.position.set(0, 0.28, 0.58);
      scanBeam.visible = false;
      scene.add(scanBeam);

      scene.add(new THREE.HemisphereLight(0xfffbf1, 0x6c655a, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 3);
      key.position.set(3.5, 6, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xddeee4, 1.2);
      rim.position.set(-3, 2.5, -3);
      scene.add(rim);

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
        if (!reducedMotion && productStage) productStage.rotation.y += 0.002;
        if (scanBeam?.visible) {
          const elapsed = (now - scanStarted) / 950;
          scanBeam.position.y = 0.18 + Math.sin(Math.min(elapsed, 1) * Math.PI) * 0.82;
          scanBeam.material.opacity = Math.sin(Math.min(elapsed, 1) * Math.PI) * 0.65;
          if (elapsed >= 1) scanBeam.visible = false;
        }
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(render);
    } catch (error) {
      loadError = 'The 3D product preview could not start on this device. The product records and data demonstration remain available.';
      console.error(error);
    }
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    controls?.dispose();
    productAsset?.dispose();
    scene?.traverse(object => {
      if (object === productAsset?.group || productAsset?.group?.getObjectById(object.id)) return;
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
      else object.material?.dispose?.();
    });
    renderer?.dispose();
    renderer?.domElement?.remove();
  });
</script>

<svelte:head>
  <title>Product Package Asset | Qubix University</title>
  <meta name="description" content="Local authoring preview of data-bearing Qubix Superstore product packages." />
</svelte:head>

<section class="asset-shell qx-shell">
  <header>
    <div>
      <p class="eyebrow">THREE.JS ASSET 002 · {PRODUCT_PACKAGE_ASSET.status}</p>
      <h1>Data-bearing products</h1>
      <p class="lede">One reusable product factory turns structured catalogue records into recognisable packages—and lets a scan create new raw data.</p>
    </div>
    <nav aria-label="Asset previews">
      <a href="?mode=assets&asset=checkout-station">Asset 001</a>
      <a href="?mode=wiki">Wiki</a>
    </nav>
  </header>

  <main>
    <section class="preview-card" aria-labelledby="preview-title">
      <div class="preview-heading">
        <div><span>LIVE ASSET PREVIEW</span><h2 id="preview-title">{selected.name}</h2></div>
        <span class:ready class="status">{ready ? 'Ready' : 'Loading'}</span>
      </div>
      <div class="viewport" bind:this={host}>
        {#if !ready && !loadError}<div class="loading">Preparing the product…</div>{/if}
        {#if loadError}<p class="fallback" role="status">{loadError}</p>{/if}
        <div class="canvas-note">Drag to orbit · pinch or scroll to zoom</div>
      </div>
      <div class="catalogue" role="group" aria-label="Choose a Superstore product">
        {#each PRODUCT_CATALOG as product}
          <button class:active={selected.sku === product.sku} on:click={() => showProduct(product)}>
            <span>{product.packageType}</span>{product.name}
          </button>
        {/each}
      </div>
    </section>

    <aside class="data-panel">
      <section class="master-data">
        <p class="eyebrow">EXISTING MASTER DATA</p>
        <h2>Product record</h2>
        <dl>
          <div><dt>SKU</dt><dd>{selected.sku}</dd></div>
          <div><dt>Barcode</dt><dd>{selected.barcode}</dd></div>
          <div><dt>Category</dt><dd>{selected.category}</dd></div>
          <div><dt>Unit price</dt><dd>£{selected.unitPrice.toFixed(2)}</dd></div>
          <div><dt>Tax rate</dt><dd>{Math.round(selected.taxRate * 100)}%</dd></div>
        </dl>
      </section>

      <section class="scan-section">
        <p class="eyebrow">CREATE NEW RAW DATA</p>
        <button class="scan" on:click={scanProduct} disabled={!ready}>Scan this barcode</button>
        {#if scanEvent}
          <p class="success" role="status">A new observation was recorded.</p>
          <pre>{JSON.stringify(scanEvent, null, 2)}</pre>
        {:else}
          <p class="empty">The product record already exists. Scanning creates a separate event recording what happened.</p>
        {/if}
      </section>

      <section class="derived-section">
        <p class="eyebrow">DERIVE A TRANSACTION LINE</p>
        <div class="quantity">
          <span>Quantity</span>
          <div><button aria-label="Decrease quantity" on:click={() => changeQuantity(-1)} disabled={quantity <= 1}>−</button><strong>{quantity}</strong><button aria-label="Increase quantity" on:click={() => changeQuantity(1)}>+</button></div>
        </div>
        <p class="formula">{quantity} × £{selected.unitPrice.toFixed(2)} = <strong>£{grossAmount.toFixed(2)}</strong></p>
        {#if lineRecord}<pre>{JSON.stringify(lineRecord, null, 2)}</pre>{:else}<p class="empty">Scan first. The raw event and product lookup will then support a derived transaction line.</p>{/if}
      </section>
    </aside>
  </main>
</section>

<style>
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important; background:#f1ede4; }
  :global(body) { position:static; }
  .asset-shell { min-height:100vh; max-width:none; padding:clamp(18px,4vw,52px); background:radial-gradient(circle at 74% 5%,#fbf8f1,#f1ede4 58%); overflow:auto; }
  header { max-width:1280px; margin:0 auto 24px; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; }
  header > div { max-width:780px; }
  .eyebrow { margin:0 0 8px; color:var(--qx-accent-text); font:800 13.5px/1.3 var(--qx-font); letter-spacing:.12em; }
  h1,h2 { color:var(--qx-text); font-family:Georgia,serif; }
  h1 { margin:0; font-size:clamp(34px,5vw,66px); line-height:.96; letter-spacing:-.045em; }
  h2 { margin:2px 0 0; font-size:23px; }
  .lede { max-width:720px; margin:16px 0 0; color:var(--qx-text-2); font:500 17px/1.55 var(--qx-font); }
  nav { display:flex; gap:14px; }
  nav a { color:var(--qx-accent-text); font:800 15px var(--qx-font); text-decoration:none; border-bottom:1px solid currentColor; padding-bottom:3px; }
  main { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:minmax(0,1fr) 370px; gap:20px; align-items:start; }
  .preview-card,.data-panel section { background:rgba(255,255,255,.82); border:1px solid var(--qx-border-2); border-radius:18px; box-shadow:var(--qx-shadow-card); }
  .preview-card { overflow:hidden; }
  .preview-heading { min-height:82px; padding:18px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
  .preview-heading span { color:var(--qx-text-faint); font:800 13px var(--qx-font); letter-spacing:.12em; }
  .status { padding:7px 11px; border-radius:999px; background:var(--qx-surface-3); }
  .status.ready { color:var(--qx-green-text); background:var(--qx-green-soft); }
  .viewport { position:relative; min-height:clamp(360px,55vh,600px); background:#f1ede4; border-block:1px solid var(--qx-border); overflow:hidden; touch-action:none; }
  .viewport :global(canvas) { display:block; width:100%; height:100%; }
  .loading,.fallback { position:absolute; inset:0; display:grid; place-items:center; padding:32px; color:var(--qx-text-dim); font:700 14px var(--qx-font); text-align:center; }
  .canvas-note { position:absolute; left:14px; bottom:14px; padding:7px 10px; border-radius:999px; background:rgba(36,31,22,.78); color:#fff; font:700 13px var(--qx-font); pointer-events:none; }
  .catalogue { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:9px; padding:14px; }
  button { min-height:44px; border:1px solid var(--qx-border-2); border-radius:12px; padding:10px 13px; background:#fff; color:var(--qx-text); font:800 14.5px var(--qx-font); cursor:pointer; }
  button:hover:not(:disabled),button:focus-visible { border-color:var(--qx-accent); outline:2px solid var(--qx-accent-soft); outline-offset:2px; }
  button:disabled { opacity:.46; cursor:not-allowed; }
  .catalogue button { min-width:0; text-align:left; overflow-wrap:anywhere; }
  .catalogue button span { display:block; margin-bottom:4px; color:var(--qx-text-faint); font-size:12px; letter-spacing:.08em; text-transform:uppercase; }
  .catalogue button.active { color:#fff; background:var(--qx-text); border-color:var(--qx-text); }
  .catalogue button.active span { color:#d8cdbb; }
  .data-panel { display:flex; flex-direction:column; gap:14px; }
  .data-panel section { padding:18px; box-shadow:none; }
  dl { display:grid; gap:10px; margin:14px 0 0; }
  dl div { display:grid; grid-template-columns:90px 1fr; gap:10px; align-items:baseline; }
  dt { color:var(--qx-text-faint); font:700 13.5px var(--qx-font); }
  dd { min-width:0; margin:0; color:var(--qx-text); font:700 14.5px/1.4 var(--qx-font); overflow-wrap:anywhere; }
  .scan { width:100%; color:#fff; background:var(--qx-accent); border-color:var(--qx-accent); }
  .success { margin:11px 0 0; color:var(--qx-green-text); font:800 14.5px var(--qx-font); }
  .empty { margin:11px 0 0; color:var(--qx-text-dim); font:500 14.5px/1.5 var(--qx-font); }
  pre { max-height:190px; margin:10px 0 0; padding:12px; overflow:auto; border-radius:10px; background:#241f16; color:#f1ede4; font:500 13px/1.48 ui-monospace,monospace; white-space:pre-wrap; overflow-wrap:anywhere; }
  .quantity { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .quantity > span { color:var(--qx-text-2); font:700 15px var(--qx-font); }
  .quantity > div { display:flex; align-items:center; gap:9px; }
  .quantity button { width:44px; padding:0; font-size:18px; }
  .quantity strong { min-width:22px; color:var(--qx-text); font:900 15px var(--qx-font); text-align:center; }
  .formula { margin:12px 0 0; padding:10px 12px; border-radius:10px; background:var(--qx-green-soft); color:var(--qx-green-text); font:700 15px var(--qx-font); }
  @media(max-width:900px) { main { grid-template-columns:1fr; } .data-panel { display:grid; grid-template-columns:1fr 1fr; } .derived-section { grid-column:1/-1; } }
  @media(max-width:600px) {
    .asset-shell { padding:18px 14px 34px; }
    header { align-items:flex-start; flex-direction:column; }
    h1 { font-size:40px; }
    .lede { font-size:15px; }
    .viewport { min-height:370px; }
    .catalogue { grid-template-columns:1fr 1fr; }
    .data-panel { display:flex; }
    .canvas-note { left:50%; transform:translateX(-50%); white-space:nowrap; }
  }
  @media(prefers-reduced-motion:reduce) { .canvas-note { display:none; } }
</style>
