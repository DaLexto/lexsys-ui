/**
 * index.ts
 *
 * @layer primitives
 * @description Public primitive token group exports and primitive token collection.
 *
 * @responsibility
 * - Re-export implemented primitive token groups
 * - Assemble the ordered primitive token group list used by generators
 * - Keep staged placeholder primitives out of generated outputs
 *
 * @notes
 * - Do not add placeholder primitives to `primitiveTokens`
 * - Only implemented primitives should participate in CSS and JSON generation
 */

import type { PrimitiveTokenGroup } from "../types"

import { aspectRatioPrimitives } from "./aspect-ratio"
import { blurPrimitives } from "./blur"
import { borderPrimitives } from "./border"
import { breakpointPrimitives } from "./breakpoint"
import { colorPrimitives } from "./color"
import { fontFamilyPrimitives } from "./font-family"
import { fontSizePrimitives } from "./font-size"
import { fontWeightPrimitives } from "./font-weight"
import { letterSpacingPrimitives } from "./letter-spacing"
import { lineHeightPrimitives } from "./line-height"
import { motionPrimitives } from "./motion"
import { opacityPrimitives } from "./opacity"
import { outlinePrimitives } from "./outline"
import { radiusPrimitives } from "./radius"
import { shadowPrimitives } from "./shadow"
import { sizePrimitives } from "./size"
import { spacingPrimitives } from "./spacing"
import { zIndexPrimitives } from "./z-index"

export { aspectRatioPrimitives } from "./aspect-ratio"
export { blurPrimitives } from "./blur"
export { borderPrimitives } from "./border"
export { breakpointPrimitives } from "./breakpoint"
export { colorPrimitives } from "./color"
export { fontFamilyPrimitives } from "./font-family"
export { fontSizePrimitives } from "./font-size"
export { fontWeightPrimitives } from "./font-weight"
export { letterSpacingPrimitives } from "./letter-spacing"
export { lineHeightPrimitives } from "./line-height"
export { motionPrimitives } from "./motion"
export { opacityPrimitives } from "./opacity"
export { outlinePrimitives } from "./outline"
export { radiusPrimitives } from "./radius"
export { shadowPrimitives } from "./shadow"
export { sizePrimitives } from "./size"
export { spacingPrimitives } from "./spacing"
export { zIndexPrimitives } from "./z-index"

export const primitiveTokens: PrimitiveTokenGroup[] = [
  colorPrimitives,
  radiusPrimitives,
  spacingPrimitives,
  sizePrimitives,
  fontFamilyPrimitives,
  fontSizePrimitives,
  fontWeightPrimitives,
  lineHeightPrimitives,
  letterSpacingPrimitives,
  motionPrimitives,
  aspectRatioPrimitives,
  blurPrimitives,
  borderPrimitives,
  breakpointPrimitives,
  opacityPrimitives,
  outlinePrimitives,
  shadowPrimitives,
  zIndexPrimitives,
]