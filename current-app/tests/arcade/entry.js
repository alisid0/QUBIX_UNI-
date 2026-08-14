import Trig from '../../src/lib/components/assessments/SolveFirstTrigonometry.svelte';
import Hacker from '../../src/lib/components/assessments/SolveFirstSignalHacker.svelte';
import Orbit from '../../src/lib/components/assessments/SolveFirstOrbitArchitect.svelte';
import Aegis from '../../src/lib/components/assessments/SolveFirstPolarAegis.svelte';
import Bayes from '../../src/lib/components/assessments/SolveFirstBayes.svelte';
import Projectile from '../../src/lib/components/assessments/SolveFirstProjectile.svelte';
import VectorRace from '../../src/lib/components/assessments/SolveFirstVectorRace.svelte';
const mk = (id, kind) => ({ id, moduleId: id, pathId: 'X', track: 'mathematics', kind, eyebrow: 'Test', title: id, sub: 't', rewardLabel: 'R' });
window.__games = {
  trig:       [Trig, mk('trigonometry-ramp-rider', 'ramp-rider')],
  hacker:     [Hacker, mk('sine-waves-signal-hacker', 'signal-hacker')],
  orbit:      [Orbit, mk('conic-sections-orbit-architect', 'orbit-architect')],
  aegis:      [Aegis, mk('polar-coordinates-polar-aegis', 'polar-aegis')],
  bayes:      [Bayes, mk('probability-trust-the-detector', 'bayes-screen')],
  projectile: [Projectile, mk('motion-trajectory', 'projectile-arc')],
  vectorrace: [VectorRace, mk('coord-geometry-vector-racer', 'vector-race')]
};
window.__done = [];
window.__mount = (key) => {
  window.__app?.$destroy();
  document.getElementById('app').innerHTML = '';
  const [Component, config] = window.__games[key];
  window.__app = new Component({ target: document.getElementById('app'), props: {
    config, onDone: (r) => window.__done.push(r), onExit: () => { window.__exited = true; }
  }});
};
window.$$ = (s) => Array.from(document.querySelectorAll(s));
window.btnByText = (t) => window.$$('button').find((b) => (b.textContent || '').trim().toLowerCase().includes(t.toLowerCase()));
