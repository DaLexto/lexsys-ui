/**
 * index.ts
 *
 * @layer composite
 * @description Public entry point for composite token classification.
 */

export {
  BORDER_COMPOSITE_DEFINITION,
  BORDER_COMPOSITE_SLOTS,
  BORDER_SLOT_KEYS,
  COMPOSITE_TYPE_REGISTRY,
  IMPLEMENTED_COMPOSITE_TYPES,
  SHADOW_COMPOSITE_DEFINITION,
  SHADOW_COMPOSITE_SLOTS,
  SHADOW_SLOT_KEYS,
  TYPOGRAPHY_COMPOSITE_DEFINITION,
  TYPOGRAPHY_COMPOSITE_SLOTS,
  TYPOGRAPHY_SLOT_KEYS,
  isBorderSlotKey,
  isImplementedCompositeType,
  isRegisteredCompositeSlotKey,
  isShadowSlotKey,
  isTypographySlotKey,
  resolveCompositeSlotType,
} from "./composite.schema"

export type {
  BorderSlotKey,
  ShadowSlotKey,
  TypographySlotKey,
} from "./composite.schema"

export {
  collectCompositeAtomicPaths,
  getCompositeBranchInfo,
  isCompositeBranch,
  normalizeCompositeBranches,
  resolveCompositeTypeFromAtomicPath,
} from "./composite.resolver"

export type {
  CompositeAtomicPath,
  CompositeBranchInfo,
  CompositeSlotSchema,
  CompositeTypeDefinition,
} from "./composite.types"
