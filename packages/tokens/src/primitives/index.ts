import type { PrimitiveTokenGroup } from "../types"
import { colorPrimitives } from "./color"
import { fontFamilyPrimitives } from "./font-family"
import { fontSizePrimitives } from "./font-size"
import { fontWeightPrimitives } from "./font-weight"
import { letterSpacingPrimitives } from "./letter-spacing"
import { lineHeightPrimitives } from "./line-height"
import { motionPrimitives } from "./motion"
import { radiusPrimitives } from "./radius"
import { sizePrimitives } from "./size"
import { spacingPrimitives } from "./spacing"

export { colorPrimitives } from "./color"
export { fontFamilyPrimitives } from "./font-family"
export { fontSizePrimitives } from "./font-size"
export { fontWeightPrimitives } from "./font-weight"
export { letterSpacingPrimitives } from "./letter-spacing"
export { lineHeightPrimitives } from "./line-height"
export { motionPrimitives } from "./motion"
export { radiusPrimitives } from "./radius"
export { sizePrimitives } from "./size"
export { spacingPrimitives } from "./spacing"

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
]
