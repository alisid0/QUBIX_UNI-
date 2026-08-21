/**
 * observations.js — museum-style “what to observe” booklet for self-study.
 *
 * Numbered entries match the on-view callouts (①–④) and HUD readouts. No
 * questions, no completion state — students read and watch the numbers.
 */

/** Shared steps: Newton II, mass, and friction (both lessons). */
export const CORE_OBSERVATIONS = [
  {
    num: 1,
    title: 'Net force and acceleration',
    body: 'Newton\'s second law: the net horizontal force on the car determines its acceleration. '
      + 'The relationship is F<sub>net</sub> = m·a, so a = F<sub>net</sub> / m. '
      + 'Compare the net force and acceleration readouts in the telemetry panel. '
      + 'The verification line shows both sides of the equation using the current simulation values.',
    refs: ['observe-fnet', 'observe-accel', 'observe-verify']
  },
  {
    num: 2,
    title: 'Mass m',
    body: 'Mass appears in a = F<sub>net</sub> / m, in the weight m·g, and in rolling resistance. '
      + 'Select different vehicles from the preset list (Mustang, compact car, loaded van). '
      + 'Hold the same throttle on dry tarmac and compare acceleration: a lighter car reaches a higher a '
      + 'for the same net force. The 3D model does not change; only the physics values do.',
    refs: ['observe-preset', 'observe-mass', 'observe-accel', 'observe-verify']
  },
  {
    num: 3,
    title: 'Driving force at the tyre',
    body: 'The engine (or a push) delivers force at the contact patch. This appears in the traction gauge as demand. '
      + 'Select <em>Human push</em> to use the same mass as the Mustang but a much smaller maximum force (~500 N). '
      + 'The equation a = F<sub>net</sub> / m still applies; only the force supplied changes, not the law.',
    refs: ['observe-demand', 'observe-grip', 'observe-preset']
  },
  {
    num: 4,
    title: 'Normal force and the friction limit',
    body: 'The limiting (static) friction force is proportional to the normal force at the tyre: '
      + 'F<sub>max</sub> = μ<sub>s</sub>·N. '
      + 'Watch the rear axle load N and the grip ceiling μ<sub>s</sub>·N. '
      + 'A lighter car has a lower N and therefore a lower grip limit, even on the same surface.',
    refs: ['observe-n', 'observe-grip']
  },
  {
    num: 5,
    title: 'When demand exceeds the grip limit',
    body: 'If the demanded driving force exceeds μ<sub>s</sub>·N, the tyre slides. '
      + 'Kinetic friction μ<sub>k</sub>·N then applies, with μ<sub>k</sub> &lt; μ<sub>s</sub>. '
      + 'The status readout changes when the tyre is gripping versus sliding.',
    refs: ['observe-grip', 'observe-slip']
  },
  {
    num: 6,
    title: 'Surface and the coefficient μ',
    body: 'The road surface sets μ<sub>s</sub> and μ<sub>k</sub>. '
      + 'The same throttle input produces different acceleration on dry tarmac, wet tarmac, gravel, or ice. '
      + 'Change the surface selector and observe how N, the grip limit, and a respond.',
    refs: ['observe-surface', 'observe-grip']
  }
];

/** Shown when the braking lesson is selected. */
export const BRAKING_OBSERVATION = {
  num: 7,
  title: 'Braking and stopping distance',
  body: 'Braking applies a force opposite to the direction of motion. '
    + 'Deceleration follows F<sub>net</sub> / m while slowing. '
    + 'The ideal stopping distance from speed v is d = v² / (2μg) when all tyres are at the friction limit — '
    + 'this ideal distance does not depend on mass. '
    + 'Compare live speed, brake force, and the stopping-distance estimate while braking. '
    + 'Try different vehicle presets: deceleration from grip changes with load, but d = v²/(2μg) uses μ and v only.',
  refs: ['observe-brake', 'observe-stop-dist', 'observe-verify']
};

export class ObservationBooklet {
  constructor(root) {
    this.root = root;
    this.lessonKey = 'friction';
    this.pinned = null;
    this.render();
  }

  setLesson(key) {
    this.lessonKey = key;
    this.pinned = null;
    this.clearHighlight();
    this.render();
  }

  items() {
    const list = [...CORE_OBSERVATIONS];
    if (this.lessonKey === 'brakes') list.push(BRAKING_OBSERVATION);
    return list;
  }

  render() {
    const items = this.items();
    this.root.innerHTML = `
      <h3>What to observe</h3>
      <p class="booklet-intro">Read in order. Each step names a quantity to watch. Hover or tap a step to highlight where to look.</p>
      <ol class="booklet-list">
        ${items.map((item) => `
          <li class="booklet-item" data-refs="${item.refs.join(' ')}">
            <span class="booklet-num">${item.num}</span>
            <div class="booklet-text">
              <strong>${item.title}</strong>
              <p>${item.body}</p>
            </div>
          </li>`).join('')}
      </ol>`;

    this.root.querySelectorAll('.booklet-item').forEach((el) => {
      const refs = () => el.dataset.refs.split(' ');
      el.addEventListener('mouseenter', () => { if (!this.pinned) this.highlightRefs(refs()); });
      el.addEventListener('mouseleave', () => { if (!this.pinned) this.clearHighlight(); });
      // Clicking pins the highlight, which is the only way this works on a
      // touch screen and lets a reader keep a step marked while they drive.
      el.addEventListener('click', () => {
        const alreadyPinned = this.pinned === el;
        this.clearHighlight();
        this.root.querySelectorAll('.booklet-item').forEach(o => o.classList.remove('pinned'));
        if (alreadyPinned) { this.pinned = null; return; }
        this.pinned = el;
        el.classList.add('pinned');
        this.highlightRefs(refs());
      });
    });
  }

  highlightRefs(ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) el.classList.add('observe-highlight');
    }
    document.querySelectorAll('.callout').forEach((el) => {
      el.classList.toggle('callout-active', ids.includes(el.dataset.ref));
    });
  }

  clearHighlight() {
    document.querySelectorAll('.observe-highlight').forEach((el) => el.classList.remove('observe-highlight'));
    document.querySelectorAll('.callout-active').forEach((el) => el.classList.remove('callout-active'));
  }
}
