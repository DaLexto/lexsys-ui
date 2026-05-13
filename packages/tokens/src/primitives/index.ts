import type { PrimitiveTokenGroup } from "../types"
import { colorPrimitives } from "./color.primitive"
import { fontFamilyPrimitives } from "./font-family.primitive"
import { fontSizePrimitives } from "./font-size.primitive"
import { fontWeightPrimitives } from "./font-weight.primitive"
import { letterSpacingPrimitives } from "./letter-spacing.primitive"
import { lineHeightPrimitives } from "./line-height.primitive"
import { motionPrimitives } from "./motion.primitive"
import { radiusPrimitives } from "./radius.primitive"
import { sizePrimitives } from "./size.primitive"
import { spacingPrimitives } from "./spacing.primitive"

export { colorPrimitives } from "./color.primitive"
export { fontFamilyPrimitives } from "./font-family.primitive"
export { fontSizePrimitives } from "./font-size.primitive"
export { fontWeightPrimitives } from "./font-weight.primitive"
export { letterSpacingPrimitives } from "./letter-spacing.primitive"
export { lineHeightPrimitives } from "./line-height.primitive"
export { motionPrimitives } from "./motion.primitive"
export { radiusPrimitives } from "./radius.primitive"
export { sizePrimitives } from "./size.primitive"
export { spacingPrimitives } from "./spacing.primitive"

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
