// The people who work at Qubix Superstore.
//
// Added because the missions were already using HR data without a source.
// employee_shift already had E-204 working two shifts in one day at Northgate,
// which is how Table Grain teaches that employee_id alone does not identify a
// row, and Classify Store Data already had six-digit employee numbers.
//
// That pair is kept rather than tidied away. A person here has two identifiers,
// because the rota system and payroll were bought separately and each brought
// its own key: E-204 and 700184 are the same colleague. Any join between the two
// systems has to know that, which is a lesson waiting to be written.
//
// Headcount lives on the branch. This is an extract, not the payroll. Northgate
// alone has 84 people and nobody needs 84 rows to learn what a grain is.

import { BRANCHES } from './superstore.js';

/** Job roles, with the grade and hourly rate attached to the role. */
export const ROLES = Object.freeze([
  Object.freeze({ id: 'store-manager', title: 'Store Manager', grade: 6, hourly: 24.10, salaried: true }),
  Object.freeze({ id: 'deputy-manager', title: 'Deputy Manager', grade: 5, hourly: 18.60, salaried: true }),
  Object.freeze({ id: 'section-lead', title: 'Section Lead', grade: 4, hourly: 14.85, salaried: false }),
  Object.freeze({ id: 'checkout', title: 'Checkout Assistant', grade: 2, hourly: 12.40, salaried: false }),
  Object.freeze({ id: 'stock', title: 'Stock Assistant', grade: 2, hourly: 12.40, salaried: false }),
  Object.freeze({ id: 'goods-in', title: 'Goods-In Assistant', grade: 3, hourly: 13.15, salaried: false }),
  Object.freeze({ id: 'customer-service', title: 'Customer Service Assistant', grade: 3, hourly: 13.15, salaried: false }),
  Object.freeze({ id: 'night-replen', title: 'Night Replenishment', grade: 3, hourly: 14.05, salaried: false }),
  Object.freeze({ id: 'analyst', title: 'Data Analyst', grade: 5, hourly: 19.80, salaried: true }),
  Object.freeze({ id: 'data-engineer', title: 'Data Engineer', grade: 6, hourly: 23.40, salaried: true })
]);

/** Where somebody works. HQ is a place too: most missions are set there. */
export const LOCATIONS = Object.freeze([
  ...BRANCHES.map(b => Object.freeze({ id: b.id, name: b.name, kind: 'branch' })),
  Object.freeze({ id: 'HQ', name: 'Corporate HQ', kind: 'office' })
]);

/**
 * An extract of the payroll.
 *
 * `left` is null for somebody still employed, and that is a real absence rather
 * than a missing one: the date does not exist yet. A leaver keeps their row,
 * because last quarter's shifts still point at it, which is why headcount has to
 * be counted with a condition rather than by counting rows.
 */
export const EMPLOYEES = Object.freeze([
  Object.freeze({ id: 'E-204', number: '700184', name: 'Priya Raman', location: 'B-17', role: 'checkout', contract: 'permanent', weeklyHours: 37.5, started: '2019-05-13', left: null }),
  Object.freeze({ id: 'E-311', number: '700185', name: 'Tomas Bihari', location: 'B-17', role: 'checkout', contract: 'permanent', weeklyHours: 30, started: '2021-09-06', left: null }),
  Object.freeze({ id: 'E-118', number: '700186', name: 'Aoife Brennan', location: 'B-17', role: 'store-manager', contract: 'permanent', weeklyHours: 40, started: '2015-02-02', left: null }),
  Object.freeze({ id: 'E-247', number: '700191', name: 'Marcus Ellery', location: 'B-17', role: 'section-lead', contract: 'permanent', weeklyHours: 37.5, started: '2020-11-16', left: null }),
  Object.freeze({ id: 'E-402', number: '700203', name: 'Nadia Oyelaran', location: 'B-17', role: 'goods-in', contract: 'permanent', weeklyHours: 37.5, started: '2022-03-28', left: null }),
  Object.freeze({ id: 'E-455', number: '700214', name: 'Callum Frayne', location: 'B-17', role: 'night-replen', contract: 'casual', weeklyHours: 16, started: '2024-01-15', left: null }),

  Object.freeze({ id: 'E-129', number: '700188', name: 'Ruth Adeyemi', location: 'B-08', role: 'store-manager', contract: 'permanent', weeklyHours: 40, started: '2016-08-01', left: null }),
  Object.freeze({ id: 'E-283', number: '700195', name: 'Piotr Zielinski', location: 'B-08', role: 'stock', contract: 'permanent', weeklyHours: 37.5, started: '2020-06-22', left: null }),
  Object.freeze({ id: 'E-338', number: '700199', name: 'Hana Kowalczyk', location: 'B-08', role: 'customer-service', contract: 'fixed-term', weeklyHours: 24, started: '2025-04-07', left: null }),
  // A leaver. Their shifts from before May still exist and still point here.
  Object.freeze({ id: 'E-091', number: '700177', name: 'Derek Mwangi', location: 'B-08', role: 'section-lead', contract: 'permanent', weeklyHours: 37.5, started: '2018-01-09', left: '2026-05-29' }),

  Object.freeze({ id: 'E-506', number: '700221', name: 'Iona Fairbairn', location: 'B-09', role: 'deputy-manager', contract: 'permanent', weeklyHours: 37.5, started: '2021-02-15', left: null }),
  Object.freeze({ id: 'E-517', number: '700224', name: 'Samir Qureshi', location: 'B-09', role: 'checkout', contract: 'casual', weeklyHours: 12, started: '2025-10-06', left: null }),

  Object.freeze({ id: 'E-533', number: '700229', name: 'Grace Lindqvist', location: 'B-04', role: 'store-manager', contract: 'permanent', weeklyHours: 40, started: '2019-04-08', left: null }),
  Object.freeze({ id: 'E-548', number: '700233', name: 'Owen Tremayne', location: 'B-04', role: 'stock', contract: 'casual', weeklyHours: 8, started: '2026-06-01', left: null }),

  Object.freeze({ id: 'E-561', number: '700238', name: 'Bea Nkemdirim', location: 'B-02', role: 'checkout', contract: 'permanent', weeklyHours: 30, started: '2022-11-23', left: null }),

  Object.freeze({ id: 'E-574', number: '700242', name: 'Lars Petersen', location: 'B-01', role: 'deputy-manager', contract: 'permanent', weeklyHours: 37.5, started: '2022-02-01', left: null }),
  Object.freeze({ id: 'E-588', number: '700247', name: 'Yusuf Abadi', location: 'B-01', role: 'customer-service', contract: 'fixed-term', weeklyHours: 20, started: '2026-02-16', left: null }),

  Object.freeze({ id: 'E-701', number: '700261', name: 'Elena Marchetti', location: 'HQ', role: 'analyst', contract: 'permanent', weeklyHours: 37.5, started: '2023-07-10', left: null }),
  Object.freeze({ id: 'E-712', number: '700264', name: 'Joseph Okonkwo', location: 'HQ', role: 'data-engineer', contract: 'permanent', weeklyHours: 37.5, started: '2022-05-30', left: null }),
  Object.freeze({ id: 'E-728', number: '700270', name: 'Mei Sandoval', location: 'HQ', role: 'analyst', contract: 'fixed-term', weeklyHours: 30, started: '2026-01-05', left: null })
]);

export const employee = id => EMPLOYEES.find(e => e.id === id) || null;
export const employeeByNumber = n => EMPLOYEES.find(e => e.number === n) || null;
export const role = id => ROLES.find(r => r.id === id) || null;
export const location = id => LOCATIONS.find(l => l.id === id) || null;

/** Still employed, which is what a null leaving date means here. */
export const currentStaff = () => EMPLOYEES.filter(e => e.left === null);

/**
 * Full-time equivalent, on a 37.5 hour week.
 *
 * Counting heads and counting FTE give different answers wherever part-time work
 * exists, and a staffing figure that does not say which it is, is not a staffing
 * figure. This is chapter 02's denominator problem with people in it.
 */
export const FULL_TIME_WEEK = 37.5;
export const fte = e => Math.round((e.weeklyHours / FULL_TIME_WEEK) * 100) / 100;
export const headcount = loc => currentStaff().filter(e => !loc || e.location === loc).length;
export const fteTotal = loc =>
  Math.round(currentStaff().filter(e => !loc || e.location === loc).reduce((n, e) => n + fte(e), 0) * 10) / 10;
