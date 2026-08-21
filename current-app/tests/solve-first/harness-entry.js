import SolveFirstNetworks from '../../src/lib/components/assessments/SolveFirstNetworks.svelte';
import SolveFirstDifferentiation from '../../src/lib/components/assessments/SolveFirstDifferentiation.svelte';
import SolveFirstMemory from '../../src/lib/components/assessments/SolveFirstMemory.svelte';
import SolveFirstOhm from '../../src/lib/components/assessments/SolveFirstOhm.svelte';

const configs = {
  ohm: {
    id: 'electricity-live-wire',
    moduleId: 'electricity',
    pathId: 'PHY_ELECTRICITY',
    track: 'physics',
    kind: 'ohm-circuit',
    eyebrow: 'Unmarked problem 16',
    title: 'Live Wire',
    sub: 'test',
    rewardLabel: 'Current Controller'
  },
  network: {
    id: 'networks-connect-the-computers',
    moduleId: 'networks-cloud',
    pathId: 'COMP_NETWORKS_SECURITY',
    track: 'computer',
    kind: 'network-routing',
    eyebrow: 'Unmarked problem 06',
    title: 'Connect the Computers',
    sub: 'test',
    rewardLabel: 'Network Architect'
  },
  differentiation: {
    id: 'differentiation-forecourt-flow',
    moduleId: 'differentiation',
    pathId: 'MATH_DIFF',
    track: 'mathematics',
    kind: 'fuel-rate',
    eyebrow: 'Unmarked problem 05',
    title: 'Run the Forecourt',
    sub: 'test',
    rewardLabel: 'Flow Controller'
  },
  memory: {
    id: 'hardware-memory-clear-the-rack',
    moduleId: 'hardware-memory',
    pathId: 'COMP_HARDWARE',
    track: 'computer',
    kind: 'memory-allocation',
    eyebrow: 'Unmarked problem 15',
    title: 'RAM Page: Warehouse Worker',
    sub: 'test',
    rewardLabel: 'Memory Marshal'
  }
};

window.__done = [];
window.__mount = (kind = 'network') => {
  window.__app?.$destroy();
  document.getElementById('app').innerHTML = '';
  const Component = kind === 'differentiation'
    ? SolveFirstDifferentiation
    : kind === 'memory'
      ? SolveFirstMemory
      : kind === 'ohm'
        ? SolveFirstOhm
        : SolveFirstNetworks;
  window.__app = new Component({
    target: document.getElementById('app'),
    props: {
      config: configs[kind],
      onDone: (result) => window.__done.push(result),
      onExit: () => { window.__exited = true; }
    }
  });
};

window.__mount('network');
window.$$ = (selector) => Array.from(document.querySelectorAll(selector));
window.btnByText = (text, selector = 'button') =>
  window.$$(selector).find((button) => (button.textContent || '').trim().toLowerCase().includes(text.toLowerCase()));
window.click = (element) => {
  if (!element) throw new Error('no element');
  if (element.disabled) return 'DISABLED';
  element.click();
  return 'ok';
};
