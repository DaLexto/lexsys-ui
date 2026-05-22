/**
 * dtcg.type-resolution.ts
 *
 * @layer generators
 * @description DTCG token type inference helpers.
 */

import type { TokenColorValue, TokenLeaf, TokenUnitValue } from "../../../types"
import {
  isTypographySlotKey,
  resolveCompositeSlotType,
} from "../../../engine/composite"
import { toTokenName, type FlattenedTokenEntry } from "../../shared"

import type { DtcgGeneratorOptions, DtcgTokenType } from "./dtcg.types"

/**
 * Default DTCG type mapping by normalized token group/name.
 *
 * The keys are matched against normalized token names.
 * Longer keys win, so motion-duration is checked before motion.
 */
export const DEFAULT_TOKEN_TYPE_BY_GROUP: Readonly<
  Record<string, DtcgTokenType>
> = {
  color: "color",
  spacing: "dimension",
  radius: "dimension",
  size: "dimension",
  border: "dimension",
  outline: "dimension",
  blur: "dimension",
  breakpoint: "dimension",

  opacity: "number",
  "z-index": "number",
  "aspect-ratio": "number",

  shadow: "shadow",

  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
  "line-height": "number",

  "motion-duration": "duration",
  "motion-easing": "cubicBezier",

  "typography-family": "fontFamily",
}

const DEFAULT_TOKEN_TYPE_BY_SUFFIX: Readonly<Record<string, DtcgTokenType>> = {
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
  "line-height": "number",
}

const STRICT_REFERENCE_PATTERN = /^\{([a-zA-Z0-9_.-]+)\}$/

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const isDtcgUnitValue = (value: unknown): value is TokenUnitValue => {
  return (
    isRecord(value) &&
    typeof value.value === "number" &&
    typeof value.unit === "string"
  )
}

const isDtcgColorValue = (value: unknown): value is TokenColorValue => {
  return (
    isRecord(value) &&
    typeof value.colorSpace === "string" &&
    Array.isArray(value.components)
  )
}

const resolveDtcgObjectValueType = (
  value: unknown,
): DtcgTokenType | undefined => {
  if (isDtcgColorValue(value)) {
    return "color"
  }

  if (!isDtcgUnitValue(value)) {
    return undefined
  }

  return value.unit === "ms" || value.unit === "s" ? "duration" : "dimension"
}

const resolveTokenNameType = (
  tokenName: string,
  tokenTypeByGroup: Readonly<Record<string, DtcgTokenType>>,
): DtcgTokenType | undefined => {
  const sortedTypeEntries = Object.entries(tokenTypeByGroup).sort(
    ([left], [right]) => right.length - left.length,
  )

  for (const [groupName, tokenType] of sortedTypeEntries) {
    if (tokenName === groupName || tokenName.startsWith(`${groupName}-`)) {
      return tokenType
    }
  }

  const sortedSuffixEntries = Object.entries(DEFAULT_TOKEN_TYPE_BY_SUFFIX).sort(
    ([left], [right]) => right.length - left.length,
  )

  for (const [suffix, tokenType] of sortedSuffixEntries) {
    if (tokenName === suffix || tokenName.endsWith(`-${suffix}`)) {
      return tokenType
    }
  }

  return undefined
}

const getReferenceTokenName = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined
  }

  const reference = value.match(STRICT_REFERENCE_PATTERN)
  const referencePath = reference?.[1]

  if (referencePath === undefined) {
    return undefined
  }

  return referencePath.replace(/\./g, "-")
}

const resolveTypographyCompositeSlotType = (
  path: string[],
): DtcgTokenType | undefined => {
  const slotKey = path[path.length - 1]

  if (
    slotKey === undefined ||
    path.length < 2 ||
    !isTypographySlotKey(slotKey)
  ) {
    return undefined
  }

  return resolveCompositeSlotType("typography", slotKey)
}

export const resolveDtcgFlattenedTokenType = (
  entry: FlattenedTokenEntry,
  options: Required<DtcgGeneratorOptions>,
): DtcgTokenType => {
  if (entry.type !== undefined) {
    return entry.type
  }

  const compositeSlotType = resolveTypographyCompositeSlotType(entry.path)

  if (compositeSlotType !== undefined) {
    return compositeSlotType
  }

  const tokenName = entry.path.join("-")
  const pathTokenType = resolveTokenNameType(
    tokenName,
    options.tokenTypeByGroup,
  )

  if (pathTokenType !== undefined) {
    return pathTokenType
  }

  const referenceTokenName = getReferenceTokenName(entry.value)
  const referenceTokenType =
    referenceTokenName === undefined
      ? undefined
      : resolveTokenNameType(referenceTokenName, options.tokenTypeByGroup)

  return referenceTokenType ?? "string"
}

export const resolveDtcgTokenLeafType = (
  leaf: TokenLeaf,
  path: string[],
  options: Required<DtcgGeneratorOptions>,
): DtcgTokenType => {
  if (leaf.$type !== undefined) {
    return leaf.$type
  }

  const compositeSlotType = resolveTypographyCompositeSlotType(path)

  if (compositeSlotType !== undefined) {
    return compositeSlotType
  }

  const tokenName = toTokenName(path, {})
  const pathTokenType = resolveTokenNameType(
    tokenName,
    options.tokenTypeByGroup,
  )

  if (pathTokenType !== undefined) {
    return pathTokenType
  }

  const referenceTokenName = getReferenceTokenName(leaf.$value)
  const referenceTokenType =
    referenceTokenName === undefined
      ? undefined
      : resolveTokenNameType(referenceTokenName, options.tokenTypeByGroup)

  if (referenceTokenType !== undefined) {
    return referenceTokenType
  }

  const objectValueType = resolveDtcgObjectValueType(leaf.$value)

  if (objectValueType !== undefined) {
    return objectValueType
  }

  if (typeof leaf.$value === "number") {
    return "number"
  }

  return "string"
}
