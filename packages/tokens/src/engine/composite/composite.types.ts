/**
 * composite.types.ts
 *
 * @layer composite
 * @description Types for composite token branch detection and slot schemas.
 */

import type { CompositeTokenType, ScalarTokenType } from "../../types"

export interface CompositeSlotSchema {
  slotKey: string
  scalarType: ScalarTokenType
}

export interface CompositeTypeDefinition {
  compositeType: CompositeTokenType
  slots: readonly CompositeSlotSchema[]
}

export interface CompositeBranchInfo {
  compositeType: CompositeTokenType
  path: string[]
}

export interface CompositeAtomicPath {
  compositeType: CompositeTokenType
  path: string
}
