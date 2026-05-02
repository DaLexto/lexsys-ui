import type { PrimitiveTokenGroup } from "../types"
import { colorPrimitives } from "./color"
import { motionPrimitives } from "./motion"
import { radiusPrimitives } from "./radius"
import { sizePrimitives } from "./size"
import { spacingPrimitives } from "./spacing"

export { colorPrimitives } from "./color"
export { motionPrimitives } from "./motion"
export { radiusPrimitives } from "./radius"
export { sizePrimitives } from "./size"
export { spacingPrimitives } from "./spacing"

export const primitiveTokens: PrimitiveTokenGroup[] = [
  colorPrimitives,
  radiusPrimitives,
  spacingPrimitives,
  sizePrimitives,
  motionPrimitives,
]
