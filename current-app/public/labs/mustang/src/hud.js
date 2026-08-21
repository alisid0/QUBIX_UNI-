/**
 * hud.js — telemetry panel and driver controls.
 *
 * Every number shown here is a real quantity from physics.js, not a decoration.
 * Where a number comes from an equation, the equation is printed next to it.
 */

import { SURFACES, stoppingDistance } from './physics.js';
import { VEHICLE_PRESETS } from './vehicles.js';

const fmt = (n, d = 0) => n.toLocaleString(undefined, {
  minimumFractionDigits: d, maximumFractionDigits: d
});

export class Hud {
  /**
   * @param {HTMLElement} root instruments panel (scrolls with the sidebar)
   * @param {HTMLElement} controlsRoot driver bar, always visible
   */
  constructor(root, controlsRoot, { onSurface, onPreset, onReset, onToggleForces, onToggleSlowMo }) {
    this.root = root;
    this.controlsRoot = controlsRoot;
    this.controls = { throttle: 0, brake: 0 };
    this.keys = new Set();
    this.presetKey = 'mustang';

    // The driver bar stays pinned so the car is drivable from any tab.
    controlsRoot.innerHTML = `
      <div class="driver-grid">
        <label class="slider">
          <span><span id="force-label">Throttle</span> <b class="v" id="throttle-v">0%</b></span>
          <input type="range" id="throttle" min="0" max="100" value="0">
        </label>
        <label class="slider">
          <span>Brake <b class="v" id="brake-v">0%</b></span>
          <input type="range" id="brake" min="0" max="100" value="0">
        </label>
      </div>
      <div class="driver-row">
        <label class="sel" id="observe-surface">
          <select id="surface">
            ${Object.entries(SURFACES).map(([k, s]) =>
              `<option value="${k}">${s.label} (μ=${s.mu_s})</option>`).join('')}
          </select>
        </label>
        <label class="sel" id="observe-preset">
          <select id="vehicle-preset">
            ${Object.entries(VEHICLE_PRESETS).map(([k, p]) =>
              `<option value="${k}">${p.label}</option>`).join('')}
          </select>
        </label>
        <button id="reset">Reset</button>
      </div>
      <div class="driver-row hint-row">
        <span class="hint">hold <kbd>W</kbd> / <kbd>S</kbd></span>
        <label><input type="checkbox" id="forces" checked> Forces</label>
        <label><input type="checkbox" id="slowmo"> Slow-mo</label>
      </div>`;

    root.innerHTML = `
      <div class="panel" id="observe-verify">
        <h3>Verification</h3>
        <p class="verify-line" id="verify-newton"></p>
        <p class="verify-line" id="verify-friction"></p>
      </div>

      <div class="panel">
        <h3>Vehicle</h3>
        <p class="hint" id="preset-blurb">${VEHICLE_PRESETS.mustang.blurb}</p>
      </div>

      <div class="panel" id="observe-grip">
        <h3>Traction <span class="sub">is the tyre about to let go?</span></h3>
        <div class="gauge">
          <div class="bar"><div class="fill" id="grip-fill"></div>
            <div class="limit-line" id="grip-line"></div></div>
          <div class="bar-labels">
            <span>Demand <b id="observe-demand">0 N</b></span>
            <span>Limit μ<sub>s</sub>N <b id="observe-grip-limit">0 N</b></span>
          </div>
        </div>
        <div class="status" id="observe-slip">Gripping</div>
      </div>

      <div class="panel" id="observe-brake">
        <h3>Brakes <span class="sub">per-axle lockup model</span></h3>
        <div class="bar-labels" style="margin-top:4px">
          <span>Front <b id="brake-front">—</b></span>
          <span>Rear <b id="brake-rear">—</b></span>
        </div>
        <div class="status" id="brake-status">Brakes released</div>
        <div class="bar-labels" style="margin-top:6px">
          <span>Stopping dist <span class="eq">d=v²/(2μg)</span></span>
          <span><b id="observe-stop-dist">—</b> m</span>
        </div>
      </div>

      <div class="panel">
        <h3>Telemetry</h3>
        <table class="tele">
          <tr id="observe-mass"><td>Mass <span class="eq">m</span></td><td><b id="mass">0</b> kg</td></tr>
          <tr><td>Max drive <span class="eq">F</span></td><td><b id="max-drive">0</b> N</td></tr>
          <tr id="observe-speed"><td>Speed</td><td><b id="speed">0</b> km/h</td></tr>
          <tr id="observe-accel"><td>② Acceleration <span class="eq">a=F/m</span></td><td><b id="accel">0.00</b> m/s²</td></tr>
          <tr><td>0–100 km/h</td><td><b id="zero100">—</b></td></tr>
          <tr id="observe-fnet"><td>① Net force <span class="eq">F<sub>net</sub></span></td><td><b id="fnet">0</b> N</td></tr>
          <tr><td>Drag <span class="eq">½ρC<sub>d</sub>Av²</span></td><td><b id="fdrag">0</b> N</td></tr>
          <tr><td>Rolling <span class="eq">C<sub>rr</sub>mg</span></td><td><b id="frr">0</b> N</td></tr>
          <tr id="observe-n"><td>③ Rear load N</td><td><b id="n-rear">0</b> N</td></tr>
          <tr><td>Load front / rear</td><td><b id="loads">0 / 0</b> N</td></tr>
          <tr><td>Kinetic energy <span class="eq">½mv²</span></td><td><b id="ke">0</b> kJ</td></tr>
          <tr><td>Heat in brakes</td><td><b id="heat">0</b> kJ</td></tr>
        </table>
      </div>`;

    this.el = {};
    const find = (id) => controlsRoot.querySelector('#' + id) || root.querySelector('#' + id);
    for (const id of ['vehicle-preset', 'preset-blurb', 'force-label', 'throttle', 'brake',
      'throttle-v', 'brake-v', 'surface', 'forces', 'slowmo', 'reset', 'observe-demand',
      'observe-grip-limit', 'grip-fill', 'grip-line', 'observe-slip', 'mass', 'max-drive',
      'speed', 'accel', 'zero100', 'fnet', 'fdrag', 'frr', 'loads', 'n-rear', 'ke', 'heat',
      'brake-front', 'brake-rear', 'brake-status', 'observe-stop-dist',
      'verify-newton', 'verify-friction']) {
      this.el[id] = find(id);
    }

    this.el.throttle.addEventListener('input', () => this.syncSliders());
    this.el.brake.addEventListener('input', () => this.syncSliders());
    this.el.surface.addEventListener('change', e => onSurface(e.target.value));
    this.el['vehicle-preset'].addEventListener('change', e => onPreset(e.target.value));
    this.el.reset.addEventListener('click', onReset);
    this.el.forces.addEventListener('change', e => onToggleForces(e.target.checked));
    this.el.slowmo.addEventListener('change', e => onToggleSlowMo(e.target.checked));

    addEventListener('keydown', e => {
      if (['w', 's', 'W', 'S'].includes(e.key)) { this.keys.add(e.key.toLowerCase()); e.preventDefault(); }
    });
    addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()));
    addEventListener('blur', () => this.keys.clear());
  }

  syncSliders() {
    this.el['throttle-v'].textContent = this.el.throttle.value + '%';
    this.el['brake-v'].textContent = this.el.brake.value + '%';
  }

  readControls() {
    const t = this.keys.has('w') ? 1 : this.el.throttle.value / 100;
    const b = this.keys.has('s') ? 1 : this.el.brake.value / 100;
    return { throttle: t, brake: b };
  }

  setSurface(key) { this.el.surface.value = key; }

  setPreset(key) {
    const preset = VEHICLE_PRESETS[key];
    if (!preset) return;
    this.presetKey = key;
    this.el['vehicle-preset'].value = key;
    this.el['preset-blurb'].textContent = preset.blurb;
    this.el['force-label'].textContent = preset.forceLabel;
  }

  update(v, stats) {
    const e = this.el;
    const mass = v.spec.mass;
    const pct = v.gripLimit > 0 ? Math.min(160, (v.demand / v.gripLimit) * 100) : 0;

    e.mass.textContent = fmt(mass);
    e['max-drive'].textContent = fmt(v.spec.maxDriveForce);

    e['observe-demand'].textContent = fmt(v.demand) + ' N';
    e['observe-grip-limit'].textContent = fmt(v.gripLimit) + ' N';
    e['grip-fill'].style.width = Math.min(100, pct) + '%';
    e['grip-fill'].classList.toggle('over', v.slipping);

    e['observe-slip'].innerHTML = v.slipping
      ? `Sliding — kinetic friction μ<sub>k</sub>·N = ${fmt(v.slideLimit)} N`
      : 'Gripping — static friction, F ≤ μ<sub>s</sub>·N';
    e['observe-slip'].classList.toggle('bad', v.slipping);

    e.speed.textContent = fmt(v.speedKph, 1);
    e.accel.textContent = fmt(v.ax, 2);
    e.zero100.textContent = stats.reached100 ? fmt(stats.reached100, 2) + ' s' : '—';
    e.fnet.textContent = fmt(v.forces.net);
    e.fdrag.textContent = fmt(v.forces.drag);
    e.frr.textContent = fmt(v.forces.rolling);
    e['n-rear'].textContent = fmt(v.rearLoad);
    e.loads.textContent = `${fmt(v.frontLoad)} / ${fmt(v.rearLoad)}`;
    e.ke.textContent = fmt(v.kineticEnergy / 1000, 1);
    e.heat.textContent = fmt(v.heatJoules / 1000, 1);

    const predictedA = v.forces.net / mass;
    e['verify-newton'].innerHTML =
      `F<sub>net</sub> / m = ${fmt(predictedA, 2)} m/s² · measured a = ${fmt(v.ax, 2)} m/s² · m = ${fmt(mass)} kg`;

    if (v.demand > 1) {
      e['verify-friction'].innerHTML =
        `μ<sub>s</sub>·N = ${fmt(v.gripLimit)} N · demand = ${fmt(v.demand)} N`;
      e['verify-friction'].hidden = false;
    } else if (v.forces.brake > 1) {
      const sd = v.v > 0.5 ? stoppingDistance(v.v, v.surface.mu_s) : 0;
      e['verify-friction'].innerHTML = sd > 0
        ? `d = v²/(2μg) = ${fmt(sd, 1)} m at v = ${fmt(v.v, 1)} m/s (ideal; independent of m)`
        : 'Apply brake to compare deceleration with F<sub>net</sub> / m';
      e['verify-friction'].hidden = false;
    } else {
      e['verify-friction'].hidden = true;
    }

    const bf = v.frontLocked ? 'LOCKED' : 'gripping';
    const br = v.rearLocked ? 'LOCKED' : 'gripping';
    e['brake-front'].textContent = bf;
    e['brake-rear'].textContent = br;
    e['brake-front'].style.color = v.frontLocked ? 'var(--bad)' : 'var(--accent)';
    e['brake-rear'].style.color = v.rearLocked ? 'var(--bad)' : 'var(--accent)';

    if (v.frontLocked || v.rearLocked) {
      const which = [];
      if (v.frontLocked) which.push('front');
      if (v.rearLocked) which.push('rear');
      e['brake-status'].innerHTML = `${which.join(' and ')} axle locked — μ<sub>k</sub> = ${v.surface.mu_k}`;
      e['brake-status'].classList.add('bad');
    } else if (v.forces.brake > 10) {
      e['brake-status'].textContent = 'Braking — both axles gripping';
      e['brake-status'].classList.remove('bad');
    } else {
      e['brake-status'].textContent = 'Brakes released';
      e['brake-status'].classList.remove('bad');
    }

    const sd = v.v > 0.5 ? stoppingDistance(v.v, v.surface.mu_s) : 0;
    e['observe-stop-dist'].textContent = sd > 0 ? fmt(sd, 1) : '—';
  }
}
