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

export const SHADOW_SLOT_KEYS = [
  "color",
  "offsetX",
  "offsetY",
  "blur",
  "spread",
] as const

export type ShadowSlotKey = (typeof SHADOW_SLOT_KEYS)[number]

export const SHADOW_COMPOSITE_SLOTS: readonly CompositeSlotSchema[] = [
  { slotKey: "color", scalarType: "color" },
  { slotKey: "offsetX", scalarType: "dimension" },
  { slotKey: "offsetY", scalarType: "dimension" },
  { slotKey: "blur", scalarType: "dimension" },
  { slotKey: "spread", scalarType: "dimension" },
]

export const BORDER_SLOT_KEYS = ["color", "width", "style"] as const

export type BorderSlotKey = (typeof BORDER_SLOT_KEYS)[number]

export const BORDER_COMPOSITE_SLOTS: readonly CompositeSlotSchema[] = [
  { slotKey: "color", scalarType: "color" },
  { slotKey: "width", scalarType: "dimension" },
  { slotKey: "style", scalarType: "strokeStyle" },
]

const TYPOGRAPHY_SLOT_KEY_SET = new Set<string>(TYPOGRAPHY_SLOT_KEYS)
const SHADOW_SLOT_KEY_SET = new Set<string>(SHADOW_SLOT_KEYS)
const BORDER_SLOT_KEY_SET = new Set<string>(BORDER_SLOT_KEYS)

export const TYPOGRAPHY_COMPOSITE_DEFINITION: CompositeTypeDefinition = {
  compositeType: "typography",
  slots: TYPOGRAPHY_COMPOSITE_SLOTS,
}

export const SHADOW_COMPOSITE_DEFINITION: CompositeTypeDefinition = {
  compositeType: "shadow",
  slots: SHADOW_COMPOSITE_SLOTS,
}

export const BORDER_COMPOSITE_DEFINITION: CompositeTypeDefinition = {
  compositeType: "border",
  slots: BORDER_COMPOSITE_SLOTS,
}

/**
 * Composite types with generator/engine support.
 *
 * DTCG composite object `$value` leaves (option B) remain deferred — see docs/RESOLVER_EVOLUTION.md.
 */
export const COMPOSITE_TYPE_REGISTRY: Readonly<
  Partial<Record<CompositeTokenType, CompositeTypeDefinition>>
> = {
  typography: TYPOGRAPHY_COMPOSITE_DEFINITION,
  shadow: SHADOW_COMPOSITE_DEFINITION,
  border: BORDER_COMPOSITE_DEFINITION,
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

export const isShadowSlotKey = (slotKey: string): slotKey is ShadowSlotKey => {
  return SHADOW_SLOT_KEY_SET.has(slotKey)
}

export const isBorderSlotKey = (slotKey: string): slotKey is BorderSlotKey => {
  return BORDER_SLOT_KEY_SET.has(slotKey)
}

export const isRegisteredCompositeSlotKey = (
  compositeType: CompositeTokenType,
  slotKey: string,
): boolean => {
  const definition = COMPOSITE_TYPE_REGISTRY[compositeType]

  if (definition === undefined) {
    return false
  }

  return definition.slots.some((slot) => {
    return slot.slotKey === slotKey
  })
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
