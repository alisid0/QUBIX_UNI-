<script>
  import { onMount, onDestroy } from 'svelte';

  // A three.js square slab, sized from `side`. Deliberately inert: no controls,
  // no pointer handlers, no rotation. It exists to make the area feel like a
  // physical surface, not to be played with.
  //
  // It is a slab and not a cube on purpose. This board teaches y = x², the area
  // of a square. A cube would show x³ and contradict the lesson it sits inside.
  export let side = 2;
  export let height = 220;

  let host;
  let renderer, scene, camera, mesh, frame, THREE;
  let ready = false;

  $: if (ready && mesh) {
    // Width and depth only. Scaling the middle axis would thicken the slab as it
    // grew, and the face has to stay square: it is the thing whose area is y.
    const s = Math.max(0.1, side);
    mesh.scale.set(s, 1, s);
  }

  onMount(async () => {
    // Loaded on demand so three.js never enters the main bundle.
    THREE = await import('three');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(34, host.clientWidth / height, 0.1, 100);
    camera.position.set(3.4, 4.2, 6.4);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, height);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.pointerEvents = 'none';

    const accent = new THREE.Color('#b4541f');
    mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.14, 1),
      new THREE.MeshStandardMaterial({ color: accent, roughness: 0.55, metalness: 0.05 })
    );
    scene.add(mesh);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 0.14, 1)),
      new THREE.LineBasicMaterial({ color: 0x3a2418 })
    );
    mesh.add(edges);

    const grid = new THREE.GridHelper(12, 12, 0xc9bcae, 0xe0d6c9);
    grid.position.y = -0.09;
    scene.add(grid);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(4, 7, 5);
    scene.add(key);

    ready = true;
    const render = () => {
      frame = requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      if (!renderer || !host) return;
      camera.aspect = host.clientWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, height);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    if (renderer) {
      renderer.dispose();
      renderer.domElement?.remove();
    }
    scene?.traverse(o => {
      o.geometry?.dispose();
      o.material?.dispose?.();
    });
  });
</script>

<div class="scene" bind:this={host} style={`height:${height}px`} aria-hidden="true"></div>

<style>
  .scene { width: 100%; border-radius: 14px; overflow: hidden; pointer-events: none; }
</style>
