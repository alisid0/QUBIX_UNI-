export { CHECKOUT_STATION_ASSET, createCheckoutStation } from './checkout-station.js';
export { PRODUCT_PACKAGE_ASSET, PRODUCT_CATALOG, createProductPackage } from './product-package.js';
export { DATA_QUALITY_TERMINAL_ASSET, createDataQualityTerminal } from './data-quality-terminal.js';
export { BRANCH_FEED_CARTRIDGE_ASSET, createBranchFeedCartridge } from './branch-feed-cartridge.js';
export { RELATIONAL_WORKBENCH_ASSET, createRelationalWorkbench } from './relational-workbench.js';
export { DATA_ROW_TILE_ASSET, createDataRowTile } from './data-row-tile.js';
export { BRANCH_STORE_MODULE_ASSET, BRANCH_FORMATS, REGION_COLOURS, createBranchStoreModule } from './branch-store-module.js';
export { TABLE_STACK_ASSET, MAX_LAYERS, layersFor, createTableStack } from './table-stack.js';
export { JOIN_BRIDGE_ASSET, MAX_SPANS, createJoinBridge } from './join-bridge.js';
export {
  NULL_TOKEN_ASSET, DUPLICATE_STAMP_ASSET, OUTLIER_FLAG_ASSET, RECORD_MARKERS,
  createNullToken, createDuplicateStamp, createOutlierFlag
} from './record-markers.js';
export { PALETTE, STATES, STATE_COLOURS } from './kit.js';

// Metadata only: importing the registry does not create a WebGL renderer or a
// scene. Future assets enter this list one at a time after their own review.
export const THREE_ASSET_REGISTRY = Object.freeze([
  Object.freeze({
    id: 'qx-superstore-checkout-station',
    title: 'Superstore checkout station',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=checkout-station'
  }),
  Object.freeze({
    id: 'qx-superstore-product-package',
    title: 'Data-bearing product packages',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=product-package'
  }),
  Object.freeze({
    id: 'qx-data-quality-terminal',
    title: 'Data quality terminal',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=data-quality-terminal'
  }),
  Object.freeze({
    id: 'qx-branch-feed-cartridge',
    title: 'Branch feed cartridge',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=data-quality-terminal'
  }),
  Object.freeze({
    id: 'qx-relational-workbench',
    title: 'Relational table workbench',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=relational-workbench'
  }),
  Object.freeze({
    id: 'qx-data-row-tile',
    title: 'Data row tile',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=relational-workbench'
  }),
  Object.freeze({
    id: 'qx-branch-store-module',
    title: 'Branch store module',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=world'
  }),
  Object.freeze({
    id: 'qx-table-stack',
    title: 'Table stack',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=world'
  }),
  Object.freeze({
    id: 'qx-join-bridge',
    title: 'Join bridge',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=world'
  }),
  Object.freeze({
    id: 'qx-null-token',
    title: 'Null token',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=world'
  }),
  Object.freeze({
    id: 'qx-duplicate-stamp',
    title: 'Duplicate stamp',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=world'
  }),
  Object.freeze({
    id: 'qx-outlier-flag',
    title: 'Outlier flag',
    version: 1,
    status: 'AI_DRAFT',
    preview: '?mode=assets&asset=world'
  })
]);
