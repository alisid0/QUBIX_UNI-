/**
 * vehicles.js — preset vehicle specifications for comparison experiments.
 *
 * The 3D model stays a Mustang; only the physics spec changes. Use presets to
 * compare how mass and drive-force limits affect F_net/m without changing the
 * underlying equations in physics.js.
 */

import { DEFAULT_SPEC } from './physics.js';

/** @typedef {{ label: string, blurb: string, forceLabel: string, spec: typeof DEFAULT_SPEC }} VehiclePreset */

/** @type {Record<string, VehiclePreset>} */
export const VEHICLE_PRESETS = {
  mustang: {
    label: 'Mustang Boss 302',
    blurb: '1450 kg · engine drive to 9600 N',
    forceLabel: 'Throttle',
    spec: { ...DEFAULT_SPEC }
  },
  compact: {
    label: 'Compact car',
    blurb: '900 kg · same 9600 N drive limit (compare mass)',
    forceLabel: 'Throttle',
    spec: {
      ...DEFAULT_SPEC,
      mass: 900,
      wheelbase: 2.45,
      cgHeight: 0.44,
      frontalArea: 1.65,
      maxBrakeForce: 10000
    }
  },
  van: {
    label: 'Loaded van',
    blurb: '2200 kg · same 9600 N drive limit (compare mass)',
    forceLabel: 'Throttle',
    spec: {
      ...DEFAULT_SPEC,
      mass: 2200,
      wheelbase: 3.10,
      cgHeight: 0.58,
      frontWeightBias: 0.55,
      frontalArea: 2.80,
      maxBrakeForce: 18000
    }
  },
  push: {
    label: 'Human push',
    blurb: '1450 kg · push effort up to 500 N (same law, smaller force)',
    forceLabel: 'Push effort',
    spec: {
      ...DEFAULT_SPEC,
      maxDriveForce: 500
    }
  }
};

export const DEFAULT_PRESET_KEY = 'mustang';

export function specForPreset(key) {
  const preset = VEHICLE_PRESETS[key];
  if (!preset) throw new Error(`Unknown vehicle preset: ${key}`);
  return { ...preset.spec };
}
