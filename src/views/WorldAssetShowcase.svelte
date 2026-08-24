<script>
  // One showcase for the world batch: a branch, two tables of very different
  // size, the bridge between them, and the three fault markers. They are shown
  // together because that is how a mission uses them, and because the join
  // bridge only means anything with a stack at each end.
  import { onDestroy, onMount } from 'svelte';
  import {
    BRANCH_STORE_MODULE_ASSET, TABLE_STACK_ASSET, JOIN_BRIDGE_ASSET,
    createBranchStoreModule, createTableStack, createJoinBridge,
    createNullToken, createDuplicateStamp, createOutlierFlag, layersFor
  } from '../lib/three/assets/index.js';

  let host, renderer, scene, camera, controls, frame, resizeObserver;
  let ready = false, status = 'idle', matches = 1;
  let built = [], bridge, restack;

  // Two tables three orders of magnitude apart, which is the comparison the
  // stack exists to make readable.
  const SALE = { id: 'sale', name: 'sale', rowCount: 4312, columnCount: 4 };
  const BRANCH = { id: 'branch', name: 'branch', rowCount: 48, columnCount: 3 };

  function setStatus(value) { status = value; built.forEach(a => a.setState?.(value)); }
  function setMatches(value) { matches = value; restack?.(value); }

  onMount(async () => {
    const THREE = await import('three');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#e7e0d3');
    camera = new THREE.PerspectiveCamera(38, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 120);
    camera.position.set(9.5, 6.4, 13);
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.domElement.setAttribute('aria-label',
      'Orbitable preview of a Superstore branch, two table stacks of different height, a join bridge and three record markers');
    host.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(-0.5, 1.1, 2.6);

    const branch = createBranchStoreModule(THREE, { id: 'B-17', region: 'north', format: 'standard', aisles: 5 });
    branch.group.position.set(-6.5, 0, -7.5);
    scene.add(branch.group);

    const sale = createTableStack(THREE, SALE);
    sale.group.position.set(-3.4, 0, 3);
    const branchTable = createTableStack(THREE, BRANCH);
    branchTable.group.position.set(3.4, 0, 3);
    scene.add(sale.group, branchTable.group);

    // The bridge is rebuilt when the match count changes, because the number of
    // spans is geometry rather than a setting.
    const mountBridge = n => {
      if (bridge) { scene.remove(bridge.group); bridge.dispose(); built = built.filter(a => a !== bridge); }
      bridge = createJoinBridge(THREE, { id: 'sale-to-line', leftRows: SALE.rowCount, matchesPerLeft: n });
      bridge.group.position.set(0, 0, 3);
      scene.add(bridge.group);
      built = [...built, bridge];
    };
    restack = mountBridge;
    mountBridge(matches);

    const markers = [
      createNullToken(THREE, { id: 'm-null' }),
      createDuplicateStamp(THREE, { id: 'm-dup' }),
      createOutlierFlag(THREE, { id: 'm-out' })
    ];
    markers.forEach((m, i) => { m.group.position.set(-1.2 + i * 1.2, 0.02, 6.6); scene.add(m.group); });

    built = [branch, sale, branchTable, bridge, ...markers];

    const floor = new THREE.Mesh(new THREE.CircleGeometry(26, 64),
      new THREE.MeshStandardMaterial({ color: 0xd6cebd, roughness: 0.96 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(10, 16, 9);
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
    const render = () => { frame = requestAnimationFrame(render); controls.update(); renderer.render(scene, camera); };
    frame = requestAnimationFrame(render);
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    controls?.dispose();
    built.forEach(a => a.dispose?.());
    renderer?.dispose();
    renderer?.domElement?.remove();
  });
</script>

<svelte:head><title>World Assets | Qubix University</title></svelte:head>
<section class="showcase qx-shell">
  <header>
    <div><p>THREE.JS ASSET WORKSHOP · AI_DRAFT</p><h1>Branch, Stacks and the Join Bridge</h1></div>
    <nav>
      <a href="?mode=game&mission=table-grain">Open Mission 004</a>
      <a href="?mode=assets&asset=relational-workbench">Previous assets</a>
    </nav>
  </header>
  <main>
    <div class="viewport" bind:this={host}>{#if !ready}<span>Loading assets…</span>{/if}</div>
    <aside>
      <p class="eyebrow">REUSABLE WORLD BATCH</p>
      <h2>One branch, two tables, one join</h2>
      <p>The branch is built from its record: format sets the footprint, aisle count sets the shelving, region tints the sign. Each stack is as tall as its row count in orders of magnitude, so <code>sale</code> at {SALE.rowCount.toLocaleString()} rows stands {layersFor(SALE.rowCount) - layersFor(BRANCH.rowCount)} plates above <code>branch</code> at {BRANCH.rowCount}.</p>
      <dl>
        <div><dt>Branch</dt><dd>{BRANCH_STORE_MODULE_ASSET.id}</dd></div>
        <div><dt>Stack</dt><dd>{TABLE_STACK_ASSET.id}</dd></div>
        <div><dt>Bridge</dt><dd>{JOIN_BRIDGE_ASSET.id}</dd></div>
        <div><dt>Rows returned</dt><dd>{(SALE.rowCount * matches).toLocaleString()}</dd></div>
      </dl>
      <div class="controls">
        <span>Matches per left row</span>
        {#each [1, 2, 3] as option}
          <button class:active={matches === option} on:click={() => setMatches(option)}
            aria-label={`Show ${option} match${option === 1 ? '' : 'es'} per left row`}>{option}</button>
        {/each}
      </div>
      <div class="controls">
        <span>Preview state</span>
        {#each ['idle', 'error', 'resolved'] as option}
          <button class:active={status === option} on:click={() => setStatus(option)}>{option}</button>
        {/each}
      </div>
      <p class="note">Drag to orbit · pinch or wheel to zoom</p>
    </aside>
  </main>
</section>

<style>
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.showcase{min-height:100vh;max-width:none;padding:20px clamp(14px,3vw,38px);background:radial-gradient(circle at 40% 0,#3e3327,#171510 60%);color:white;overflow:auto}header{max-width:1280px;margin:0 auto 16px;display:flex;justify-content:space-between;align-items:end;gap:16px}header p{margin:0 0 4px;color:#bcb19e;font:900 12px var(--qx-font);letter-spacing:.12em}h1{margin:0;font:700 28px Georgia,serif}nav{display:flex;gap:15px}nav a{color:#e2c7b7;font:800 13.5px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}main{max-width:1280px;margin:auto;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:16px}.viewport,aside{border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden}.viewport{position:relative;min-height:clamp(540px,76vh,780px);background:#e7e0d3;touch-action:none}.viewport :global(canvas){display:block;width:100%;height:100%}.viewport>span{position:absolute;inset:0;display:grid;place-items:center;color:#6d6453;font:800 14.5px var(--qx-font)}aside{padding:24px;background:#f1ede4;color:#25231f}.eyebrow{margin:0 0 6px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}h2{margin:0;font:700 23px Georgia,serif}aside>p:not(.eyebrow,.note){color:#655d4d;font:600 14.5px/1.5 var(--qx-font)}code{font:700 13.5px ui-monospace,monospace;color:#8c4c2e}dl{margin:20px 0;border-block:1px solid #d8d0be;padding:8px 0}dl div{display:flex;justify-content:space-between;gap:10px;padding:7px 0}dt{color:#766d5b;font:700 13px var(--qx-font)}dd{margin:0;text-align:right;font:800 12px var(--qx-font);overflow-wrap:anywhere}.controls{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:14px}.controls>span{grid-column:1/-1;color:#766d5b;font:900 12px var(--qx-font);text-transform:uppercase;letter-spacing:.08em}.controls button{min-height:42px;border:1px solid #d8d0be;border-radius:10px;background:white;color:#25231f;font:800 13px var(--qx-font);text-transform:capitalize;cursor:pointer}.controls button.active{background:#a85a34;border-color:#a85a34;color:white}.controls button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.note{margin-top:18px;color:#766d5b;font:700 13px var(--qx-font)}@media(max-width:820px){main{grid-template-columns:1fr}.viewport{min-height:520px}}@media(max-width:520px){.showcase{padding:14px 10px}header{align-items:flex-start}nav{flex-direction:column;align-items:flex-end;gap:6px}.viewport{min-height:400px}aside{padding:18px}}
</style>
