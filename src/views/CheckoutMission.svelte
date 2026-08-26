<script>
  import { onDestroy, onMount } from 'svelte';
  import { recordCompletion } from '../lib/game/progress.js';
  import { createCheckoutStation, createProductPackage } from '../lib/three/assets/index.js';
  import { CHECKOUT_MISSION, createScanOutcome, productFor, summariseBasket } from '../lib/game/checkout-mission.js';
  import SiteNav from '../lib/components/SiteNav.svelte';

  const classificationOptions = ['', 'Raw observation', 'Master data', 'Derived data'];
  let host;
  let ready = false;
  let loadError = '';
  let missionIndex = 0;
  let quantity = 1;
  let lines = [];
  let latestOutcome = null;
  let feedback = 'Set the requested quantity, then scan the product.';
  let feedbackTone = '';
  let running = false;
  let missionComplete = false;
  let classificationChecked = false;
  let answers = { scan: '', price: '', total: '' };
  let renderer, scene, camera, controls, station, productAsset, productRoot, frame, resizeObserver, THREE;
  let scanStart = 0;
  let outcomeCreated = false;
  let reducedMotion = false;
  let lightweightMode = false;

  $: currentOrder = CHECKOUT_MISSION.order[missionIndex] || null;
  $: currentProduct = currentOrder ? productFor(currentOrder.sku) : null;
  $: basket = summariseBasket(lines);
  $: progress = missionComplete ? 100 : Math.round((lines.length / CHECKOUT_MISSION.order.length) * 72) + (lines.length === CHECKOUT_MISSION.order.length ? 8 : 0);

  function placeCurrentProduct() {
    if (!scene || !station || !currentProduct) return;
    if (productAsset) {
      scene.remove(productAsset.group);
      productAsset.dispose();
    }
    productAsset = createProductPackage(THREE, currentProduct);
    productRoot = productAsset.group;
    productRoot.scale.setScalar(0.56);
    productRoot.position.copy(station.attachment('belt-entry').position);
    productRoot.position.y = 0.92;
    productRoot.rotation.y = Math.PI / 2;
    scene.add(productRoot);
  }

  function changeQuantity(change) {
    quantity = Math.max(1, Math.min(9, quantity + change));
    feedbackTone = '';
  }

  function beginScan() {
    if (!ready || running || !currentOrder) return;
    if (quantity !== currentOrder.quantity) {
      feedback = `The customer requested ${currentOrder.quantity}. Correct the quantity before recording the line.`;
      feedbackTone = 'wrong';
      return;
    }
    running = true;
    outcomeCreated = false;
    scanStart = performance.now();
    feedback = 'Raw scan event arriving…';
    feedbackTone = 'working';
    if (reducedMotion) {
      recordOutcome();
      finishScan();
    }
  }

  function recordOutcome() {
    if (outcomeCreated || !currentProduct) return;
    outcomeCreated = true;
    latestOutcome = createScanOutcome({
      transactionId: 'TX-PREVIEW-001',
      checkoutId: 'CO-03',
      sequence: lines.length + 1,
      product: currentProduct,
      quantity,
      observedAt: new Date().toISOString()
    });
    if (station) {
      station.parts.scanLight.material.emissiveIntensity = 2.4;
      station.parts.display.material.emissiveIntensity = 0.95;
    }
    feedback = 'Barcode observed → product found → transaction line calculated.';
  }

  function finishScan() {
    lines = [...lines, latestOutcome.lineRecord];
    running = false;
    missionIndex += 1;
    quantity = 1;
    if (station) station.parts.scanLight.material.emissiveIntensity = 0.2;
    if (missionIndex < CHECKOUT_MISSION.order.length) {
      feedback = 'Line saved. Prepare the next product.';
      feedbackTone = 'right';
      setTimeout(placeCurrentProduct, 0);
    } else {
      if (productAsset) {
        scene.remove(productAsset.group);
        productAsset.dispose();
        productAsset = null;
        productRoot = null;
      }
      feedback = 'Sale processed. Classify the data to complete the mission.';
      feedbackTone = 'right';
    }
  }

  function checkClassification() {
    classificationChecked = true;
    const correct = answers.scan === 'Raw observation' && answers.price === 'Master data' && answers.total === 'Derived data';
    if (correct) {
      missionComplete = true;
      feedback = 'Mission complete: you traced one sale from observation to derived data.';
      feedbackTone = 'right';
    } else {
      feedback = 'One or more classifications need another look. Ask whether the value was observed, already stored, or calculated.';
      feedbackTone = 'wrong';
    }
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
      scene.background = new THREE.Color('#efe9dd');
      scene.fog = new THREE.Fog('#efe9dd', 10, 17);
      camera = new THREE.PerspectiveCamera(35, Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1), 0.1, 40);
      camera.position.set(5.4, 3.4, 5.4);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.domElement.setAttribute('aria-label', 'Interactive Qubix checkout mission showing products moving through a Superstore checkout');
      host.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      // The page scrolls, so the wheel belongs to the page. Drag still rotates.
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 5;
      controls.maxDistance = 10;
      controls.minPolarAngle = 0.62;
      controls.maxPolarAngle = 1.42;
      controls.target.set(0, 0.78, 0);
      controls.update();

      station = createCheckoutStation(THREE);
      scene.add(station.group);
      placeCurrentProduct();

      const floor = new THREE.Mesh(new THREE.CircleGeometry(7, 64), new THREE.MeshStandardMaterial({ color: 0xe2dacb, roughness: 0.98 }));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.02;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.HemisphereLight(0xfffbf1, 0x6b655b, 2.15));
      const key = new THREE.DirectionalLight(0xffffff, 2.8);
      key.position.set(4.5, 7, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xdcece5, 1.1);
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
        if (running && productRoot) {
          const elapsed = Math.min((now - scanStart) / 1800, 1);
          const eased = elapsed < 0.5 ? 2 * elapsed * elapsed : 1 - Math.pow(-2 * elapsed + 2, 2) / 2;
          const start = station.attachment('belt-entry').position;
          const end = station.attachment('bagging-area').position;
          productRoot.position.lerpVectors(start, end, eased);
          productRoot.position.y = 0.92 + eased * 0.04;
          productRoot.rotation.y = Math.PI / 2 + eased * 0.45;
          if (elapsed >= 0.43) recordOutcome();
          if (elapsed === 1) finishScan();
        }
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(render);
    } catch (error) {
      loadError = 'The 3D mission could not start on this device. No transaction data was recorded.';
      console.error(error);
    }
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    controls?.dispose();
    productAsset?.dispose();
    station?.dispose();
    scene?.traverse(object => {
      if (station?.group?.getObjectById(object.id) || productAsset?.group?.getObjectById(object.id)) return;
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
      else object.material?.dispose?.();
    });
    renderer?.dispose();
    renderer?.domElement?.remove();
  });

  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('checkout');
</script>

<svelte:head>
  <title>Process a Sale | Qubix University</title>
  <meta name="description" content="Local AI draft of the first Qubix Superstore data mission." />
</svelte:head>

<section class="game-shell qx-shell">
  <div class="nav-wrap"><SiteNav current="play" subjects={false} /></div>
  <header class="mission-hero">
    <div><p class="eyebrow">CHECKOUT · SHIFT ASSIGNMENT 001</p><h1>{CHECKOUT_MISSION.title}</h1></div>
    <div class="mission-meta"><span>{CHECKOUT_MISSION.xp || 40} XP · CASE {Math.min(missionIndex + 1, CHECKOUT_MISSION.order.length)} OF {CHECKOUT_MISSION.order.length}</span><div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div></div>
  </header>

  <main>
    <section class="stage-card">
      <div class="brief">
        {#if currentProduct}
          <div><p class="eyebrow">CUSTOMER ORDER · LINE {missionIndex + 1} OF {CHECKOUT_MISSION.order.length}</p><h2>{currentProduct.name}</h2><p>{currentProduct.sku} · £{currentProduct.unitPrice.toFixed(2)} each</p></div>
          <strong>× {currentOrder.quantity}</strong>
        {:else}
          <div><p class="eyebrow">SALE PROCESSED</p><h2>Transaction TX-PREVIEW-001</h2><p>{basket.item_count} items across {basket.line_count} lines</p></div>
          <strong>£{basket.basket_total.toFixed(2)}</strong>
        {/if}
      </div>

      {#if !lightweightMode}<div class="viewport" bind:this={host}>
        {#if !ready && !loadError}<div class="loading">Opening checkout three…</div>{/if}
        {#if loadError}<p class="loading" role="alert">{loadError}</p>{/if}
      </div>{/if}

      {#if currentProduct}
        <div class="checkout-controls">
          <div class="quantity"><span>Quantity</span><button aria-label="Decrease quantity" on:click={() => changeQuantity(-1)} disabled={running || quantity <= 1}>−</button><strong>{quantity}</strong><button aria-label="Increase quantity" on:click={() => changeQuantity(1)} disabled={running}>+</button></div>
          <button class="scan" on:click={beginScan} disabled={!ready || running}>{running ? 'Processing…' : 'Scan and record'}</button>
        </div>
      {/if}

      <p class:wrong={feedbackTone === 'wrong'} class:right={feedbackTone === 'right'} class:working={feedbackTone === 'working'} class="feedback" role="status">{feedback}</p>
    </section>

    <aside>
      <section class="decision-card">
        <p class="eyebrow">YOUR DECISION</p>
        <h2>What becomes evidence?</h2>
        <p>Separate the scan event, governed product record and calculated line total.</p>
        <a href="?mode=game&mission=shared-book&chapter=1&session=1">Open the briefing →</a>
      </section>

      <section class="basket-card">
        <div class="card-title"><div><p class="eyebrow">TRANSACTION STATE</p><h2>Current basket</h2></div><strong>£{basket.basket_total.toFixed(2)}</strong></div>
        {#if lines.length}
          <ol>{#each lines as line}<li><span>{productFor(line.sku).name} × {line.quantity}</span><b>£{line.line_total.toFixed(2)}</b></li>{/each}</ol>
        {:else}<p class="muted">No transaction lines yet.</p>{/if}
      </section>

      <section class="data-card">
        <p class="eyebrow">LIVE DATA LINEAGE</p>
        <div class="lineage">
          <div class:active={latestOutcome}><span>1</span><p><b>Observe</b>Barcode scan event</p></div>
          <div class:active={latestOutcome}><span>2</span><p><b>Look up</b>Product master record</p></div>
          <div class:active={latestOutcome}><span>3</span><p><b>Derive</b>Quantity × unit price</p></div>
        </div>
        {#if latestOutcome}
          <dl><div><dt>Raw barcode</dt><dd>{latestOutcome.rawEvent.barcode}</dd></div><div><dt>Master price</dt><dd>£{latestOutcome.masterRecord.unit_price.toFixed(2)}</dd></div><div><dt>Derived total</dt><dd>£{latestOutcome.lineRecord.line_total.toFixed(2)}</dd></div></dl>
        {:else}<p class="muted">The first scan will create an observation here.</p>{/if}
      </section>

      {#if lines.length === CHECKOUT_MISSION.order.length}
        <section class="classify-card">
          <p class="eyebrow">FINAL CHECK</p><h2>Classify the data</h2>
          <label>Barcode scan event<select bind:value={answers.scan}>{#each classificationOptions as option}<option value={option}>{option || 'Choose…'}</option>{/each}</select></label>
          <label>Stored unit price<select bind:value={answers.price}>{#each classificationOptions as option}<option value={option}>{option || 'Choose…'}</option>{/each}</select></label>
          <label>Calculated line total<select bind:value={answers.total}>{#each classificationOptions as option}<option value={option}>{option || 'Choose…'}</option>{/each}</select></label>
          <button class="check" on:click={checkClassification}>{missionComplete ? 'Competency demonstrated' : 'Check classification'}</button>
          {#if missionComplete}<p class="complete">✓ {CHECKOUT_MISSION.competency}</p><a class="next-mission" href="?mode=game&mission=classify-data">Next mission</a>{/if}
        </section>
      {/if}
    </aside>
  </main>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(body){position:static}
  .game-shell{min-height:100vh;max-width:none;padding:18px clamp(14px,3vw,36px) 40px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);overflow:auto;color:#f1ede4}
  .progress{max-width:1380px;height:5px;margin:0 auto 16px;border-radius:9px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#6bc93f;transition:width .4s ease}
  main{max-width:1380px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) 370px;gap:16px;align-items:start}.stage-card,aside section{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#241f16;overflow:hidden}.brief{min-height:86px;padding:16px 19px;display:flex;align-items:center;justify-content:space-between;gap:16px}.brief h2,.card-title h2,.classify-card h2{margin:2px 0 3px;font:700 22px Georgia,serif}.brief p:not(.eyebrow){margin:0;color:#726a58;font:700 14.5px var(--qx-font)}.brief>strong{font:800 28px Georgia,serif;color:#8c4c2e}.eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}.viewport{position:relative;min-height:clamp(390px,58vh,650px);background:#efe9dd;border-block:1px solid #d8d0be;overflow:hidden;touch-action:none}.viewport :global(canvas){display:block;width:100%;height:100%}.loading{position:absolute;inset:0;display:grid;place-items:center;padding:28px;color:#726a58;font:800 15px var(--qx-font)}.checkout-controls{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 17px}.quantity{display:flex;align-items:center;gap:9px}.quantity span{margin-right:3px;color:#726a58;font:800 13.5px var(--qx-font)}button,select{min-height:44px;border:1px solid #d8d0be;border-radius:11px;background:#fff;color:#241f16;font:800 14.5px var(--qx-font)}button{padding:9px 14px;cursor:pointer}.quantity button{width:44px;padding:0;font-size:18px}.quantity strong{min-width:20px;text-align:center;font:900 15px var(--qx-font)}button:focus-visible,select:focus-visible{outline:3px solid #a85a34;outline-offset:2px}button:disabled{opacity:.45;cursor:not-allowed}.scan{min-width:160px;background:#a85a34;border-color:#a85a34;color:#fff}.feedback{margin:0;padding:12px 17px;border-top:1px solid #d8d0be;color:#726a58;background:#fbf8f1;font:700 14.5px/1.45 var(--qx-font)}.feedback.wrong{color:#a02d1d;background:#f7dcd6}.feedback.right{color:#3c6427;background:#e7efdc}.feedback.working{color:#8c4c2e;background:#f2e4da}
  aside{display:flex;flex-direction:column;gap:12px}aside section{padding:17px;overflow:visible}.lineage{display:grid;gap:8px;margin-top:10px}.lineage>div{display:flex;align-items:center;gap:10px;padding:9px;border:1px solid #e4ddce;border-radius:10px;background:#fbf8f1;opacity:.58}.lineage>div.active{opacity:1;border-color:#a8c797;background:#eff4e8}.lineage span{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#241f16;color:#fff;font:900 13px var(--qx-font)}.lineage p{margin:0;font:600 13.5px/1.3 var(--qx-font)}.lineage b{display:block;font-size:13px;text-transform:uppercase;letter-spacing:.06em}dl{display:grid;gap:7px;margin:12px 0 0;padding-top:11px;border-top:1px solid #e4ddce}dl div{display:flex;justify-content:space-between;gap:10px}dt{color:#726a58;font:700 13px var(--qx-font)}dd{margin:0;font:800 13px var(--qx-font);overflow-wrap:anywhere}.muted{margin:11px 0 0;color:#726a58;font:600 14.5px/1.45 var(--qx-font)}.card-title{display:flex;align-items:center;justify-content:space-between;gap:12px}.card-title>strong{color:#3c6427;font:800 24px Georgia,serif}.basket-card ol{list-style:none;margin:10px 0 0;padding:0}.basket-card li{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-top:1px solid #e4ddce;font:700 13.5px var(--qx-font)}.classify-card label{display:grid;grid-template-columns:1fr 145px;gap:10px;align-items:center;margin-top:9px;color:#57503f;font:700 13.5px var(--qx-font)}select{width:100%;padding:0 9px}.check{width:100%;margin-top:13px;background:#241f16;color:#fff;border-color:#241f16}.complete{margin:12px 0 0;padding:10px;border-radius:9px;background:#e7efdc;color:#3c6427;font:800 13.5px/1.4 var(--qx-font)}.next-mission{width:100%;min-height:44px;margin-top:8px;display:grid;place-items:center;box-sizing:border-box;border-radius:11px;background:#241f16;color:#fff;font:800 14.5px var(--qx-font);text-decoration:none}.next-mission:focus-visible{outline:3px solid #a85a34;outline-offset:2px}
  @media(max-width:920px){main{grid-template-columns:1fr}aside{display:grid;grid-template-columns:1fr 1fr}.classify-card{grid-column:1/-1}.viewport{min-height:480px}}
  @media(max-width:600px){.viewport{min-height:360px}.checkout-controls{align-items:stretch;flex-direction:column}.quantity{justify-content:center}.scan{width:100%}aside{display:flex}.classify-card label{grid-template-columns:1fr}.brief>strong{font-size:23px}}

  /* M1 · decision counter */
  :global(html),:global(body),:global(#app){background:#e6e0d2}
  .game-shell{--nav-ink:#20241f;--nav-soft:#62695f;--nav-rule:#c8c1b1;--nav-accent:#315f48;
              min-height:100vh;padding:0 0 60px;background:#e6e0d2;color:#20241f;overflow:visible}
  .nav-wrap,.mission-hero,main{width:min(100%,1120px);margin-inline:auto;padding-inline:clamp(16px,5vw,56px)}
  .mission-hero{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:30px;padding-top:48px}
  .mission-hero h1{margin:0;color:#20241f;font:400 clamp(42px,7vw,70px)/.98 Georgia,serif;letter-spacing:-.035em}
  .mission-meta{min-width:190px;color:#62695f;font:800 10px var(--qx-font);letter-spacing:.08em;text-align:right}
  .progress{width:100%;max-width:none;height:5px;margin:10px 0 0;border-radius:0;background:#c8c1b1}
  .progress span{background:#315f48}
  main{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(250px,.75fr);gap:24px;align-items:start;box-sizing:border-box}
  .stage-card{border:6px solid #20241f;border-radius:0;background:#f7f3e9;box-shadow:11px 11px 0 rgba(32,36,31,.16)}
  .brief{min-height:94px;padding:19px 23px;border-bottom:1px solid #c8c1b1}
  .brief h2,.card-title h2,.classify-card h2{font-weight:400}.brief>strong{color:#b85530}
  .eyebrow{color:#b85530;font-size:10px;letter-spacing:.13em}
  .viewport{min-height:clamp(360px,52vh,570px);border-color:#c8c1b1;background:#e8e2d5}
  .checkout-controls{padding:18px 22px}.quantity span{color:#62695f}.quantity button,button,select{border-radius:0;border-color:#c8c1b1;background:#f7f3e9}
  .scan{background:#b85530;border-color:#b85530}.feedback{border-color:#c8c1b1;background:#f0ebdf;color:#62695f}
  aside{gap:16px}aside section{padding:19px;border:1px solid #9c998d;border-radius:0;background:#f7f3e9;color:#20241f}
  .decision-card{border:0;border-top:3px solid #315f48;background:#f7f3e9}
  .decision-card h2{margin:0 0 9px;font:400 25px/1.1 Georgia,serif}.decision-card>p:last-of-type{margin:0;color:#62695f;font:600 12px/1.55 var(--qx-font)}
  .decision-card a{display:inline-block;margin-top:15px;color:#315f48;font:800 11px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}
  .basket-card{background:#20241f;color:#f7f3e9}.basket-card .eyebrow{color:#e9a07d}.basket-card .card-title h2{color:#f7f3e9}.basket-card .muted{color:#c8c1b1}.card-title>strong{color:#f7f3e9;font-weight:400}.basket-card li{border-color:#596157}
  .lineage{grid-template-columns:repeat(3,1fr);gap:1px;margin:10px -19px -19px;background:#c8c1b1}.lineage>div{display:block;padding:15px;border:0;border-radius:0;background:#f7f3e9;opacity:.62}.lineage>div.active{border:0;background:#e4e9df;opacity:1}.lineage span{display:block;width:auto;height:auto;border-radius:0;background:transparent;color:#315f48;text-align:left;font-size:10px}.lineage p{margin-top:9px;font-size:11px}.lineage b{font-size:10px;color:#315f48}.data-card dl{margin-top:19px}.classify-card{border:5px solid #20241f;box-shadow:8px 8px 0 rgba(32,36,31,.14)}
  .check,.next-mission{border-radius:0;background:#20241f}.complete{border-radius:0}
  @media(max-width:920px){main{grid-template-columns:1fr}.mission-hero{padding-top:38px}aside{display:grid;grid-template-columns:1fr 1fr}.decision-card,.classify-card{grid-column:1/-1}.viewport{min-height:450px}}
  @media(max-width:600px){.game-shell{padding:0 0 38px}.nav-wrap,.mission-hero,main{padding-inline:16px}.mission-hero{display:block;margin-bottom:24px}.mission-hero h1{font-size:46px}.mission-meta{margin-top:14px;text-align:left}.stage-card{border-width:5px;box-shadow:8px 8px 0 rgba(32,36,31,.16)}.brief{align-items:flex-start;flex-direction:column}.checkout-controls{padding:17px}.viewport{min-height:0}.feedback{font-size:13px}aside{display:flex}.lineage{grid-template-columns:1fr}.classify-card{box-shadow:6px 6px 0 rgba(32,36,31,.14)}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
