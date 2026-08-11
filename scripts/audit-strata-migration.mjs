import {
  allItems,
  decisions,
  engines,
  media,
  paths,
  systems,
} from '../src/strata-migration/content.js';

const validDecisions = new Set(decisions);
const keys = new Set(allItems.map((item) => item.key));
const invalidRecommendations = allItems.filter(
  (item) => !validDecisions.has(item.recommendation),
);
const pathsWithoutWorkshops = paths.filter((path) => !path.workshops?.length);

const result = {
  paths: paths.length,
  engines: engines.length,
  systems: systems.length,
  media: media.length,
  total: allItems.length,
  uniqueKeys: keys.size,
  invalidRecommendations: invalidRecommendations.length,
  pathsWithoutWorkshops: pathsWithoutWorkshops.length,
};

console.log(JSON.stringify(result, null, 2));

if (
  paths.length !== 40 ||
  engines.length !== 36 ||
  systems.length !== 19 ||
  media.length !== 5 ||
  allItems.length !== 100 ||
  keys.size !== allItems.length ||
  invalidRecommendations.length ||
  pathsWithoutWorkshops.length
) {
  process.exitCode = 1;
}
