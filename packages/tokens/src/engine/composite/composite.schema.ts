/**
 * composite.schema.ts
 *
 * @layer composite
 * @description Registry of implemented composite token types and slot schemas.
 */

import type { CompositeTokenType, ScalarTokenType } from "../../types"

import type {
  CompositeSlotSchema,
  CompositeTypeDefinition,
} from "./composite.types"

export const TYPOGRAPHY_SLOT_KEYS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
] as const

export type TypographySlotKey = (typeof TYPOGRAPHY_SLOT_KEYS)[number]

export const TYPOGRAPHY_COMPOSITE_SLOTS: readonly CompositeSlotSchema[] = [
  { slotKey: "fontFamily", scalarType: "fontFamily" },
  { slotKey: "fontSize", scalarType: "fontSize" },
  { slotKey: "fontWeight", scalarType: "fontWeight" },
  { slotKey: "lineHeight", scalarType: "number" },
  { slotKey: "letterSpacing", scalarType: "letterSpacing" },
]

const TYPOGRAPHY_SLOT_KEY_SET = new Set<string>(TYPOGRAPHY_SLOT_KEYS)

export const TYPOGRAPHY_COMPOSITE_DEFINITION: CompositeTypeDefinition = {
  compositeType: "typography",
  slots: TYPOGRAPHY_COMPOSITE_SLOTS,
}

/**
 * Composite types with generator/engine support in Phase 8.
 *
 * Other CompositeTokenType values remain reserved for future phases.
 */
export const COMPOSITE_TYPE_REGISTRY: Readonly<
  Partial<Record<CompositeTokenType, CompositeTypeDefinition>>
> = {
  typography: TYPOGRAPHY_COMPOSITE_DEFINITION,
}

export const IMPLEMENTED_COMPOSITE_TYPES = Object.keys(
  COMPOSITE_TYPE_REGISTRY,
) as CompositeTokenType[]

export const isImplementedCompositeType = (
  compositeType: string,
): compositeType is CompositeTokenType => {
  return compositeType in COMPOSITE_TYPE_REGISTRY
}

export const isTypographySlotKey = (
  slotKey: string,
): slotKey is TypographySlotKey => {
  return TYPOGRAPHY_SLOT_KEY_SET.has(slotKey)
}

export const resolveCompositeSlotType = (
  compositeType: CompositeTokenType,
  slotKey: string,
): ScalarTokenType | undefined => {
  const definition = COMPOSITE_TYPE_REGISTRY[compositeType]

  if (definition === undefined) {
    return undefined
  }

  return definition.slots.find((slot) => {
    return slot.slotKey === slotKey
  })?.scalarType
}
