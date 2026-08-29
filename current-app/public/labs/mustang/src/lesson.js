/**
 * lesson.js — the guided sequence for Lesson 1: Friction & Traction.
 *
 * The teaching loop is deliberately PREDICT -> INTERACT -> OBSERVE -> EXPLAIN.
 * The prediction step matters most: a student who has committed to an answer
 * pays attention to the result. A student who just clicks "next" does not.
 *
 * Each step is plain data, so writing lesson 2 (brakes) means writing another
 * array, not another program.
 */

import { DEFAULT_SPEC, tractionLimitedAcceleration, SURFACES, stoppingDistance, stoppingTime } from './physics.js';

const spec = DEFAULT_SPEC;
const aTraction = tractionLimitedAcceleration(spec, SURFACES.dry.mu_s);
const aNaive = spec.maxDriveForce / spec.mass;

export const frictionLesson = {
  title: 'Lesson 1 — Friction & Traction',
  steps: [

    {
      id: 'orient',
      heading: 'Drive it first',
      body: `
        <p>Hold <b>W</b> or the <b>throttle</b> slider to accelerate, <b>S</b> to brake.
        Turn on <b>Show forces</b> and watch the arrows.</p>
        <p>Two things to notice before we start measuring anything:</p>
        <ul>
          <li>The green arrow is the road pushing the <em>car</em> forwards. The pale
              arrow underneath is the tyre pushing the <em>road</em> backwards.
              Same size, opposite directions — that is Newton's third law.</li>
          <li>The red drag arrow is invisible at low speed and enormous at high speed.
              Drag goes with <b>v²</b>, so doubling your speed quadruples it.</li>
        </ul>`,
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'predict',
      heading: 'Predict before you press anything',
      body: `
        <p>In first gear the Boss 302 can deliver <b>${spec.maxDriveForce.toLocaleString()} N</b>
        at the contact patch. The car has a mass of <b>${spec.mass} kg</b>.</p>
        <p>Using <span class="eq">a = F / m</span>, that is
        <b>${aNaive.toFixed(1)} m/s²</b> — about 0.67 g.</p>
        <p><b>On dry tarmac, will the car actually accelerate at ${aNaive.toFixed(1)} m/s²?</b></p>`,
      question: {
        choices: [
          `Yes — ${aNaive.toFixed(1)} m/s², the engine decides`,
          `No — less, because the tyres can't transmit that much force`,
          `No — more, because the wheels spin up faster`
        ],
        correct: 1,
        explain: `
          <p>Correct answer: <b>less</b>. The engine's force has to get to the road
          <em>through friction</em>, and friction has a ceiling:</p>
          <p class="eq">F<sub>max</sub> = μ × N</p>
          <p>Only the <b>rear</b> tyres are driven, and they carry roughly
          ${Math.round((1 - spec.frontWeightBias) * 100)}% of the car's weight at rest —
          about ${Math.round(spec.mass * 9.81 * (1 - spec.frontWeightBias))} N.
          On dry tarmac (μ = ${SURFACES.dry.mu_s}) that permits roughly
          ${Math.round(SURFACES.dry.mu_s * spec.mass * 9.81 * (1 - spec.frontWeightBias))} N —
          far short of ${spec.maxDriveForce.toLocaleString()} N.</p>
          <p>Ask for more than the tyres can give and they let go. Now go and prove it.</p>`
      },
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'observe',
      heading: 'Watch the ceiling',
      body: `
        <p>Floor the throttle from a standstill. Keep your eye on the two numbers
        in the <b>Traction</b> panel:</p>
        <ul>
          <li><b>Demand</b> — what the engine is asking the tyres to transmit.</li>
          <li><b>Grip limit</b> — μN, the most they can transmit.</li>
        </ul>
        <p>When demand exceeds the limit the readout turns red and you are
        <b>wheelspinning</b>: the tyre is now sliding, so μ drops from
        ${SURFACES.dry.mu_s} (static) to ${SURFACES.dry.mu_k} (kinetic). You get
        <em>less</em> grip, not more. Spinning the wheels makes you slower.</p>
        <p>Now try to recover. Easing back to <em>just under</em> the static limit
        will not do it — once sliding, you have to drop below the lower
        <b>kinetic</b> limit before the tyre hooks up again. That gap is why a
        slide is easy to start and awkward to stop, and it is a real property of
        friction, not a quirk of this simulation.</p>
        <p>Then try a launch at part throttle and compare your 0–100 km/h time.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 },
      goal: {
        text: 'Reach 100 km/h in under 7.0 s without ever wheelspinning',
        check: (s) => s.reached100 && s.reached100 < 7.0 && !s.everSlipped
      }
    },

    {
      id: 'surfaces',
      heading: 'Change the road, not the car',
      body: `
        <p>Same engine, same mass, same driver. Switch the surface and try to pull
        away cleanly on each one.</p>
        <table class="mini">
          <tr><th>Surface</th><th>μ<sub>s</sub></th><th>Best possible a</th></tr>
          ${Object.entries(SURFACES).map(([k, s]) => `
            <tr><td>${s.label}</td><td>${s.mu_s.toFixed(2)}</td>
            <td>${tractionLimitedAcceleration(spec, s.mu_s).toFixed(2)} m/s²</td></tr>`).join('')}
        </table>
        <p>Those last figures come from setting the driving force equal to the grip
        limit and solving for <i>a</i>. Nothing about the engine appears in them —
        on ice, a 500 hp car and a 50 hp car accelerate identically.</p>`,
      setup: { surface: 'ice', throttleLimit: 1 }
    },

    {
      id: 'transfer',
      heading: 'Why the limit moves',
      body: `
        <p>You may have noticed the grip limit <em>rising</em> as the car accelerates.
        That is <b>weight transfer</b>. Accelerating pitches the car back, pressing
        the rear tyres down:</p>
        <p class="eq">N<sub>rear</sub> = m·g·(1−b<sub>f</sub>) + m·a·h / L</p>
        <p>where <i>h</i> is the centre-of-gravity height (${spec.cgHeight} m) and
        <i>L</i> the wheelbase (${spec.wheelbase} m). More acceleration → more rear
        load → more grip → more possible acceleration. It feeds back on itself,
        which is why the true limit on dry tarmac is
        <b>${aTraction.toFixed(2)} m/s²</b> rather than the
        ${(SURFACES.dry.mu_s * 9.81 * (1 - spec.frontWeightBias)).toFixed(2)} m/s²
        you would get from the static loads alone.</p>
        <p>Watch the two violet normal-force arrows while you accelerate hard, then
        brake hard. They swap size. Under braking the load goes forward — which is
        why the front brakes on any car do most of the work.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'challenge',
      heading: 'Challenge — the launch',
      body: `
        <p>Get to 100 km/h as fast as you can. The theoretical best on dry tarmac is
        about <b>${(27.78 / aTraction).toFixed(2)} s</b> if you sit exactly on the
        grip limit the whole way and ignore drag.</p>
        <p>You cannot beat it. You can get close by feeding in throttle rather than
        stamping on it — exactly what a traction control system does automatically,
        forty times a second.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 },
      goal: {
        text: 'Reach 100 km/h in under 6.2 s',
        check: (s) => s.reached100 && s.reached100 < 6.2
      }
    }
  ]
};

export const brakeLesson = {
  title: 'Lesson 2 — Braking & Stopping Distance',
  steps: [

    {
      id: 'orient',
      heading: 'Brake hard — watch the nose dive',
      body: `
        <p>Get up to about 30 m/s (108 km/h) using <b>W</b> or the throttle slider,
        then stamp on <b>S</b> to brake as hard as you can.</p>
        <p>Three things to watch:</p>
        <ul>
          <li>The car <b>pitches forward</b> — the nose dives. That is weight transfer:
              under braking the load shifts to the front axle.</li>
          <li>The <b>front normal-force arrow</b> (violet, pointing up) grows, and the
              rear arrow shrinks. The total weight hasn't changed; it has just
              moved forward.</li>
          <li>The <b>pink braking-force arrow</b> points backwards — that is the road
              pushing the car to slow it down, through the tyres, just like the
              green arrow pushes it forward during acceleration.</li>
        </ul>
        <p>Braking uses the <em>same friction ceiling</em> as acceleration. If you ask
        for more than μN, the tyre locks and you get <em>less</em> grip, not more.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'predict',
      heading: 'How far to stop?',
      body: `
        <p>You are doing <b>30 m/s</b> (108 km/h) on dry tarmac
        (μ<sub>s</sub> = ${SURFACES.dry.mu_s}). You stamp the brake pedal.</p>
        <p>Assuming all four tyres can use the full μ limit, the stopping distance is:</p>
        <p class="eq">d = v² / (2·μ·g)</p>
        <p>That is <b>${stoppingDistance(30, SURFACES.dry.mu_s).toFixed(0)} m</b> —
        about ${(stoppingDistance(30, SURFACES.dry.mu_s) / 4.5).toFixed(0)} car lengths.
        The stopping <em>time</em> is t = v/(μg) =
        <b>${stoppingTime(30, SURFACES.dry.mu_s).toFixed(1)} s</b>.</p>
        <p>Notice the equation has the <em>same μ</em> as traction. A car with
        great grip launches hard <b>and</b> stops hard. One without it does neither.</p>
        <p><b>Now predict: if you brake from 60 m/s instead of 30 m/s, how much
        further will it take?</b></p>`,
      question: {
        choices: [
          'Twice as far — double the speed, double the distance',
          'Four times as far — d ∝ v²',
          'About the same — brakes are powerful enough to compensate'
        ],
        correct: 1,
        explain: `
          <p>Correct: <b>four times as far</b>. Distance goes with the square of
          speed — d ∝ v². Double the speed = quadruple the energy to shed.</p>
          <p class="eq">d(60) / d(30) = (60²) / (30²) = 4</p>
          <p>At 30 m/s: <b>${stoppingDistance(30, SURFACES.dry.mu_s).toFixed(0)} m</b>.
          At 60 m/s: <b>${stoppingDistance(60, SURFACES.dry.mu_s).toFixed(0)} m</b>.
          This is why speed limits matter. It is also why we will revisit this
          in Lesson 7 (Energy), where you will see that kinetic energy itself
          scales with v².</p>`
      },
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'lockup',
      heading: 'Lockup — when grip gives way',
      body: `
        <p>Stamp the brake to 100% and watch the <b>Brakes</b> panel.</p>
        <p>When the brake force demanded exceeds μ<sub>s</sub>N on an axle, that
        axle <b>locks</b>. μ drops from ${SURFACES.dry.mu_s} (static) to
        ${SURFACES.dry.mu_k} (kinetic). You get <em>less</em> braking force — and a
        locked wheel cannot steer.</p>
        <p>With our ${Math.round(spec.brakeBias * 100)}% front brake bias, and weight shifting
        <em>forward</em> under braking (unloading the rear), the <b>rear axle locks first</b>.
        This is correct — real cars have bigger front brakes precisely because
        the front does most of the work under braking.</p>
        <p>Try <b>threshold braking</b>: ease off until both axles stay just
        below lockup. You will stop <em>shorter</em> than stamping the pedal,
        because you are using μ<sub>s</sub> rather than μ<sub>k</sub>.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'transfer',
      heading: 'Weight transfer under braking',
      body: `
        <p>Braking transfers load to the front axle. The equations are the same
        as for acceleration, but ax is now <em>negative</em>:</p>
        <p class="eq">N<sub>front</sub> = m·g·b<sub>f</sub> − m·a·h / L</p>
        <p class="eq">N<sub>rear</sub> = m·g·(1−b<sub>f</sub>) + m·a·h / L</p>
        <p>With a negative (deceleration), the −m·a·h/L term becomes
        <em>positive</em> for the front, so the front load grows and the rear
        shrinks. The sum stays m·g.</p>
        <p>This is why:</p>
        <ul>
          <li>Production cars have a <b>front brake bias</b> — the front does
              ~${Math.round(spec.brakeBias * 100)}% of the braking work.</li>
          <li>The nose <b>dives</b> visibly — watch the car body pitch.</li>
          <li>Suspension (Lesson 5) determines <em>how much</em> the car pitches,
              which changes the axle loads, which changes the grip available for
              <em>both</em> braking and acceleration.</li>
        </ul>`,
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'v2-trap',
      heading: 'The v² trap',
      body: `
        <p>Accelerate to <b>15 m/s</b> and brake to a stop. Note the distance.</p>
        <p>Now do the same from <b>30 m/s</b>. It will not be twice as far — it
        will be roughly <b>four times</b> as far.</p>
        <p>This is not a quirk of the brakes. It falls straight out of the physics:</p>
        <p class="eq">E<sub>k</sub> = ½·m·v²</p>
        <p>Double the speed → quadruple the kinetic energy you have to shed.
        The brakes can only absorb energy at a fixed rate (set by μ and the
        weight on the tyres), so quadruple the energy = quadruple the distance.</p>
        <p>This is the single most important safety fact in driving physics,
        and it is true for every vehicle, on every surface, in every condition.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 }
    },

    {
      id: 'challenge',
      heading: 'Challenge — the threshold stop',
      body: `
        <p>Get to <b>30 m/s</b> (108 km/h) on dry tarmac. Brake to a complete
        stop <b>without locking either axle</b>.</p>
        <p>The theoretical best is <b>${stoppingDistance(30, SURFACES.dry.mu_s).toFixed(0)} m</b>
        (d = v²/(2μg)), though drag and rolling resistance will help a little.
        Locking a wheel drops you to μ<sub>k</sub> = ${SURFACES.dry.mu_k} and
        <em>increases</em> your stopping distance.</p>
        <p>In a real car this is what ABS does — it detects lockup, releases
        the brake momentarily, and re-applies it, cycling dozens of times per
        second to keep the tyre at the peak of the grip curve.</p>`,
      setup: { surface: 'dry', throttleLimit: 1 },
      goal: {
        text: 'Stop from 30 m/s in under 60 m without locking a wheel',
        check: (s) => s.stoppedFrom30 && s.stoppedFrom30 < 60 && !s.everLocked
      }
    }
  ]
};

export class LessonController {
  constructor(lesson, root, onSetup) {
    this.lesson = lesson;
    this.root = root;
    this.onSetup = onSetup;
    this.index = 0;
    this.answered = false;
    this.render();
  }

  get step() { return this.lesson.steps[this.index]; }

  go(delta) {
    const next = this.index + delta;
    if (next < 0 || next >= this.lesson.steps.length) return;
    this.index = next;
    this.answered = false;
    this.render();
  }

  reportProgress(stats) {
    const goal = this.step.goal;
    if (!goal || this.goalMet) return;
    if (goal.check(stats)) {
      this.goalMet = true;
      const el = this.root.querySelector('.goal');
      if (el) { el.classList.add('met'); el.innerHTML = `✓ ${goal.text} — done`; }
    }
  }

  render() {
    const s = this.step;
    this.goalMet = false;
    if (s.setup) this.onSetup(s.setup);

    const q = s.question;
    this.root.innerHTML = `
      <div class="lesson-head">
        <span class="step-count">Step ${this.index + 1} / ${this.lesson.steps.length}</span>
        <h2>${s.heading}</h2>
      </div>
      <div class="lesson-body">${s.body}</div>
      ${q ? `<div class="quiz">${q.choices.map((c, i) =>
        `<button class="choice" data-i="${i}">${c}</button>`).join('')}
        <div class="quiz-answer" hidden></div></div>` : ''}
      ${s.goal ? `<div class="goal">◇ ${s.goal.text}</div>` : ''}
      <div class="lesson-nav">
        <button class="nav" data-d="-1" ${this.index === 0 ? 'disabled' : ''}>← Back</button>
        <button class="nav primary" data-d="1"
          ${this.index === this.lesson.steps.length - 1 ? 'disabled' : ''}>Next →</button>
      </div>`;

    this.root.querySelectorAll('.choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        this.answered = true;
        const chosen = Number(btn.dataset.i);
        this.root.querySelectorAll('.choice').forEach((b, i) => {
          b.classList.add(i === q.correct ? 'right' : (i === chosen ? 'wrong' : 'muted'));
          b.disabled = true;
        });
        const ans = this.root.querySelector('.quiz-answer');
        ans.innerHTML = q.explain;
        ans.hidden = false;
      });
    });

    this.root.querySelectorAll('.nav').forEach(btn =>
      btn.addEventListener('click', () => this.go(Number(btn.dataset.d))));
  }
}
