// The complete, finite URL inventory for Qubix University.
//
// The application is a single Vite page selected mostly by query parameters.
// That made the old sitemap look complete while omitting missions, sessions,
// rooms and previews. Keep every address here, deriving variable lists from the
// same registries as the learner UI. `build-seo.mjs` publishes only canonical
// learner routes; previews, aliases and internal tools remain testable without
// being presented to search engines as released curriculum.

import { MISSIONS } from '../src/lib/game/progress.js';
import { ROOMS } from '../src/lib/game/store-map.js';
import { CLASSIFICATION_MISSION } from '../src/lib/game/data-classification-mission.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { superstoreTopics } from '../src/factory/superstore-topics.js';
import { registry as factoryBoards } from '../src/factory/index.js';
import { cleanPathForHref } from '../src/lib/routes/clean-paths.js';
import { learningKeywords } from '../src/lib/content/learning-keywords.js';

const route = (url, area, title, visibility = 'public', indexable = visibility === 'public') => {
  const clean = ['public', 'preview'].includes(visibility) ? cleanPathForHref(url) : url;
  return Object.freeze({ url: clean, queryAlias: clean !== url ? url : null, area, title, visibility, indexable });
};

const game = (mission, extra = '') => `/?mode=game&mission=${mission}${extra}`;

const EXTRA_MISSIONS = Object.freeze([
  ['store', 'The Superstore floor'],
  ['foundations', 'Shared foundations'],
  ['shared-book', 'Shared Foundations reader'],
  ['role-game', 'Role game plans'],
  ['campaign', 'Data quality campaign']
]);

const DSA_PREVIEWS = Object.freeze([
  ['dsa-introduction-preview', 'DSA introduction'],
  ['dsa-sequence-preview', 'Sequences and indexed access'],
  ['dsa-array-insertion-preview', 'Making room in an array'],
  ['dsa-array-growth-preview', 'When an array runs out of room']
]);

const ROLE_GAMES = Object.freeze([
  ['analyst', 'Analyst Decision Desk'],
  ['engineer', 'Pipeline Control'],
  ['scientist', 'Investigation Lab'],
  ['ml-engineer', 'Model Operations']
]);

const ASSET_PREVIEWS = Object.freeze([
  ['', 'Checkout station'],
  ['computer-screen', 'Mission operations studio'],
  ['world', 'Superstore world'],
  ['product-package', 'Product package'],
  ['data-quality-terminal', 'Data quality terminal'],
  ['relational-workbench', 'Relational workbench']
]);

export function buildSiteRoutes(libraryPages = []) {
  const routes = [
    route('/', 'Core', 'Qubix University'),
    route('/?mode=start', 'Core', 'Start · your next step'),
    route('/?mode=start&stage=shared-data-truths', 'Core', 'Shared Data Truths · one stage of the floor'),
    route('/?mode=start&stage=concepts', 'Core', 'Concepts first · one stage of the floor'),
    route('/?mode=start&stage=python', 'Core', 'Python first · one stage of the floor'),
    route('/?mode=start&stage=sql', 'Core', 'SQL first · one stage of the floor'),
    route('/?mode=start&stage=analyst', 'Core', 'The Analyst floor · one stage of the floor'),
    route('/?mode=showcase', 'Core', 'Qubix University Showcase'),
    route('/?mode=showcase-demo', 'Core', '30-Minute Qubix Demo'),
    route('/?mode=updates', 'Core', 'Learning updates'),
    route('/?mode=builder', 'Founder tools', 'Qubix Draft Workshop', 'preview', false),
    // Reachable and linked from every page, but kept out of the sitemap: an
    // account form is not curriculum and has nothing to offer a search result.
    route('/?mode=signin', 'Core', 'Sign in', 'preview', false),
    route('/?mode=game', 'Core', 'Academy mission hub'),
    route('/?mode=wiki', 'Wiki', 'Data Science Wiki'),
    route('/?mode=wiki&section=books', 'Wiki', 'Reference books'),
    route('/?mode=wiki&section=world', 'Wiki', 'Superstore data world'),
    route('/?lab=sql', 'Tools', 'Data console'),
    route('/?prototype=variables-and-rates', 'Mathematics pilot', 'Variables and Rates of Change'),

    // Supported compatibility URLs are tested, but only their canonical
    // learner URL belongs in a sitemap.
    route('/?prototype=change-lab', 'Legacy aliases', 'Mathematics pilot legacy alias', 'legacy', false),
    route('/?mode=learner', 'Legacy aliases', 'Learner preview alias', 'legacy', false),

    // Founder-approved authoring samples are deliberately not RELEASED or
    // rostered. Their live review URLs must be tested without becoming SEO
    // claims about the public curriculum.
    ...DSA_PREVIEWS.map(([mode, title]) =>
      route(`/?mode=${mode}`, 'DSA previews', title, 'preview', false)),

    ...superstoreTopics.map(({ phase, title }) =>
      route(`/?mode=wiki&phase=${phase}`, 'Wiki', `Phase ${phase}: ${title}`)),

    ...learningKeywords.map(({ slug, term }) =>
      route(`/?mode=wiki&term=${slug}`, 'Wiki terms', term)),

    ...libraryPages.map(path =>
      route(path, 'Library', path.split('/').pop().replace(/\.html$/, '').replace(/-/g, ' '))),
  ];

  const missionTitles = new Map([
    ...MISSIONS.map(item => [item.slug, item.mission.title]),
    ...EXTRA_MISSIONS
  ]);
  for (const [slug, title] of missionTitles) {
    routes.push(route(game(slug), 'Missions', title));
  }

  for (const { chapter, book } of SHARED_FOUNDATIONS) {
    for (let index = 0; index < book.sessions.length; index += 1) {
      routes.push(route(
        game('shared-book', `&chapter=${chapter}&session=${index + 1}`),
        'Reading sessions',
        `Chapter ${chapter}, session ${index + 1}: ${book.sessions[index].title}`
      ));
    }
  }

  for (const room of ROOMS) {
    routes.push(route(game('store', `&room=${room.id}`), 'Superstore rooms', room.name));
  }

  for (const variation of CLASSIFICATION_MISSION.variations) {
    routes.push(route(
      game('classify-data', `&variation=${variation.id}`),
      'Mission variants',
      `Classify Store Data: ${variation.title}`
    ));
  }

  routes.push(route(game('campaign', '&screen=complete'), 'Mission variants', 'Data quality campaign completion'));
  for (const [role, title] of ROLE_GAMES) {
    routes.push(route(game('role-game', `&role=${role}`), 'Role game plans', title));
  }

  // Internal routes are finite and belong in smoke testing, but the production
  // build intentionally gates them behind VITE_WORKSHOP.
  routes.push(
    route('/?mode=review', 'Internal review', 'Founder review workspace', 'internal', false),
    route('/?mode=factory', 'Internal factory', 'Curriculum Factory', 'internal', false),
    route('/?mode=strata-factory', 'Internal factory', 'Strata migration factory', 'internal', false),
    route('/?mode=exercises', 'Internal factory', 'Exercises Factory', 'internal', false),
    route('/?mode=parts', 'Internal factory', 'Parts sheet: interactions', 'internal', false),
    route('/?mode=parts&parts=exercises', 'Internal factory', 'Parts sheet: exercises', 'internal', false)
  );

  for (const board of factoryBoards) {
    routes.push(
      route(`/?mode=factory&bb=${board.key}`, 'Internal factory boards', board.label, 'internal', false),
      route(`/?mode=factory&bb=${board.key}&kept=1`, 'Internal kept sheets', `${board.label}: kept sheet`, 'internal', false)
    );
  }

  for (const [asset, title] of ASSET_PREVIEWS) {
    routes.push(route(
      `/?mode=assets${asset ? `&asset=${asset}` : ''}`,
      'Internal assets',
      title,
      'internal',
      false
    ));
  }

  // Query addresses remain valid bookmarks. Keeping them in the audit makes
  // compatibility deliberate while the clean path is the only sitemap entry.
  const aliases = routes
    .filter(item => item.queryAlias)
    .map(item => route(item.queryAlias, 'Query aliases', `${item.title}: query compatibility`, 'legacy', false));
  routes.push(...aliases);

  const seen = new Set();
  for (const item of routes) {
    if (seen.has(item.url)) throw new Error(`Duplicate route inventory entry: ${item.url}`);
    seen.add(item.url);
  }
  return Object.freeze(routes);
}

export const ROUTED_MISSION_SLUGS = Object.freeze([
  ...new Set([...MISSIONS.map(item => item.slug), ...EXTRA_MISSIONS.map(([slug]) => slug)])
].sort());

export const ROUTED_MODES = Object.freeze([
  'assets', 'builder', 'dsa-array-growth-preview', 'dsa-array-insertion-preview',
  'dsa-introduction-preview', 'dsa-sequence-preview', 'exercises', 'factory',
  'game', 'learner', 'parts', 'review', 'showcase', 'showcase-demo', 'signin',
  'start', 'strata-factory', 'updates', 'wiki'
]);
