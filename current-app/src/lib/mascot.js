const ROOT = '/media/mascot';

export const MASCOT_ANIMATIONS = Object.freeze({
  idle: {
    src: `${ROOT}/qubix-cube-idle.webm`,
    label: 'Qubix mascot resting',
    loop: true,
    framing: 'close'
  },
  curious: {
    src: `${ROOT}/qubix-cube-curious.webm`,
    label: 'Qubix mascot looking curious',
    loop: true,
    framing: 'close'
  },
  think: {
    src: `${ROOT}/qubix-cube-think.webm`,
    label: 'Qubix mascot thinking',
    loop: true,
    framing: 'wide'
  },
  surprise: {
    src: `${ROOT}/qubix-cube-surprise.webm`,
    label: 'Qubix mascot reacting with surprise',
    loop: false,
    framing: 'close'
  },
  celebrate: {
    src: `${ROOT}/qubix-cube-celebrate.webm`,
    label: 'Qubix mascot celebrating',
    loop: false,
    framing: 'close'
  },
  error: {
    src: `${ROOT}/qubix-cube-error.webm`,
    label: 'Qubix mascot encouraging another try',
    loop: false,
    framing: 'close'
  },
  'point-left': {
    src: `${ROOT}/qubix-cube-point-left.webm`,
    label: 'Qubix mascot pointing left',
    loop: true,
    framing: 'wide'
  },
  'point-right': {
    src: `${ROOT}/qubix-cube-point-right.webm`,
    label: 'Qubix mascot pointing right',
    loop: true,
    framing: 'wide'
  },
  press: {
    src: `${ROOT}/qubix-cube-press.webm`,
    label: 'Qubix mascot demonstrating an action',
    loop: true,
    framing: 'wide'
  },
  transition: {
    src: `${ROOT}/qubix-cube-transition.webm`,
    label: 'Qubix mascot moving to the next step',
    loop: true,
    framing: 'wide'
  }
});

export const MASCOT_INTENTS = Object.freeze({
  welcome: 'curious',
  guide: 'point-right',
  action: 'press',
  loading: 'think',
  success: 'celebrate',
  retry: 'error',
  notice: 'surprise',
  back: 'point-left',
  rest: 'idle',
  transition: 'transition'
});

export const MASCOT_POSTER = `${ROOT}/qubix-cube-idle.png`;

export function resolveMascotAnimation({ animation = '', intent = 'rest' } = {}) {
  const name = MASCOT_ANIMATIONS[animation]
    ? animation
    : MASCOT_INTENTS[intent] || MASCOT_INTENTS.rest;
  return { name, ...MASCOT_ANIMATIONS[name] };
}
