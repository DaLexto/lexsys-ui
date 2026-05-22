/**
 * index.ts
 *
 * @layer composite
 * @description Public entry point for composite token classification.
 */

export {
  COMPOSITE_TYPE_REGISTRY,
  IMPLEMENTED_COMPOSITE_TYPES,
  TYPOGRAPHY_COMPOSITE_DEFINITION,
  TYPOGRAPHY_COMPOSITE_SLOTS,
  TYPOGRAPHY_SLOT_KEYS,
  isImplementedCompositeType,
  isTypographySlotKey,
  resolveCompositeSlotType,
} from "./composite.schema"

export type { TypographySlotKey } from "./composite.schema"

export {
  collectCompositeAtomicPaths,
  getCompositeBranchInfo,
  isCompositeBranch,
  normalizeCompositeBranches,
} from "./composite.resolver"

export type {
  CompositeAtomicPath,
  CompositeBranchInfo,
  CompositeSlotSchema,
  CompositeTypeDefinition,
} from "./composite.types"
