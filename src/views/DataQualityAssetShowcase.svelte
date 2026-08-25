<script>
  import { onDestroy, onMount } from 'svelte';
  import { BRANCH_FEED_CARTRIDGE_ASSET, DATA_QUALITY_TERMINAL_ASSET, createBranchFeedCartridge, createDataQualityTerminal } from '../lib/three/assets/index.js';
  let host, renderer, scene, camera, controls, terminal, cartridge, frame, resizeObserver;
  let ready = false;
  let status = 'warning';

  function setStatus(value) {
    status = value;
    terminal?.setStatus(value);
    cartridge?.setState(value);
  }

  onMount(async () => {
    const THREE = await import('three');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#e9e2d5');
    camera = new THREE.PerspectiveCamera(36, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 35);
    camera.position.set(4.7, 3.2, 5.3);
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.domElement.setAttribute('aria-label', 'Orbitable preview of the data quality terminal and branch feed cartridge');
    host.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.target.set(0, 1, 0);
    terminal = createDataQualityTerminal(THREE);
    scene.add(terminal.group);
    cartridge = createBranchFeedCartridge(THREE, { id: 'preview', source: 'Branch 17', table: 'inventory_snapshot', field: 'closing_stock_units', valueState: 'missing', colour: 0xc83c2c });
    cartridge.group.position.copy(terminal.attachment('review-position').position);
    cartridge.group.position.y -= 0.35;
    cartridge.group.rotation.y = -0.18;
    scene.add(cartridge.group);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(6.5, 56), new THREE.MeshStandardMaterial({ color: 0xd9d0bf, roughness: 0.96 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor, new THREE.HemisphereLight(0xfffbef, 0x68645d, 2.25));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(4, 7, 4);
    key.castShadow = true;
    scene.add(key);
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
    cartridge?.dispose();
    terminal?.dispose();
    renderer?.dispose();
    renderer?.domElement?.remove();
  });
</script>

<svelte:head><title>Data Quality Assets | Qubix University</title></svelte:head>
<section class="showcase qx-shell">
  <header><div><p>THREE.JS ASSET WORKSHOP · AI_DRAFT</p><h1>Data Quality Desk</h1></div><nav><a href="?mode=game&mission=missing-data">Open Mission 003</a><a href="?mode=assets&asset=product-package">Previous asset</a></nav></header>
  <main><div class="viewport" bind:this={host}>{#if !ready}<span>Loading assets…</span>{/if}</div><aside><p class="eyebrow">REUSABLE ASSET PAIR</p><h2>Terminal + feed cartridge</h2><p>The terminal provides status-controlled screens, a reader, keyboard, alert beacon, and named attachment points. Each cartridge carries one record descriptor and an independently controlled quality state.</p><dl><div><dt>Terminal</dt><dd>{DATA_QUALITY_TERMINAL_ASSET.id}</dd></div><div><dt>Cartridge</dt><dd>{BRANCH_FEED_CARTRIDGE_ASSET.id}</dd></div><div><dt>Version</dt><dd>1 · AI_DRAFT</dd></div></dl><div class="controls"><span>Preview state</span>{#each ['idle','warning','error','resolved'] as option}<button class:active={status === option} on:click={() => setStatus(option)}>{option}</button>{/each}</div><p class="note">Drag to orbit · pinch or wheel to zoom</p></aside></main>
</section>

<style>
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.showcase{min-height:100vh;max-width:none;padding:20px clamp(14px,3vw,38px);background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);color:white;overflow:auto}header{max-width:1280px;margin:0 auto 16px;display:flex;justify-content:space-between;align-items:end;gap:16px}header p{margin:0 0 4px;color:#bcb19e;font:900 12px var(--qx-font);letter-spacing:.12em}h1{margin:0;font:700 28px Georgia,serif}nav{display:flex;gap:15px}nav a{color:#e2c7b7;font:800 13.5px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}main{max-width:1280px;margin:auto;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:16px}.viewport,aside{border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden}.viewport{position:relative;min-height:clamp(540px,76vh,780px);background:#e9e2d5;touch-action:none}.viewport :global(canvas){display:block;width:100%;height:100%}.viewport>span{position:absolute;inset:0;display:grid;place-items:center;color:#6d6453;font:800 14.5px var(--qx-font)}aside{padding:24px;background:#f1ede4;color:#25231f}.eyebrow{margin:0 0 6px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}h2{margin:0;font:700 23px Georgia,serif}aside>p:not(.eyebrow,.note){color:#655d4d;font:600 14.5px/1.5 var(--qx-font)}dl{margin:20px 0;border-block:1px solid #d8d0be;padding:8px 0}dl div{display:flex;justify-content:space-between;gap:10px;padding:7px 0}dt{color:#766d5b;font:700 13px var(--qx-font)}dd{margin:0;text-align:right;font:800 12px var(--qx-font);overflow-wrap:anywhere}.controls{display:grid;grid-template-columns:1fr 1fr;gap:7px}.controls>span{grid-column:1/-1;color:#766d5b;font:900 12px var(--qx-font);text-transform:uppercase;letter-spacing:.08em}.controls button{min-height:42px;border:1px solid #d8d0be;border-radius:10px;background:white;color:#25231f;font:800 13px var(--qx-font);text-transform:capitalize;cursor:pointer}.controls button.active{background:#a85a34;border-color:#a85a34;color:white}.controls button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.note{margin-top:18px;color:#766d5b;font:700 13px var(--qx-font)}@media(max-width:820px){main{grid-template-columns:1fr}.viewport{min-height:520px}}@media(max-width:520px){.showcase{padding:14px 10px}header{align-items:flex-start}nav{flex-direction:column;align-items:flex-end;gap:6px}.viewport{min-height:400px}aside{padding:18px}}
</style>
