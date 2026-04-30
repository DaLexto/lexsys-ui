import type { PrimitiveTokenGroup } from "../types/index.js"
import { colorPrimitives } from "./color.js"
import { motionPrimitives } from "./motion.js"
import { radiusPrimitives } from "./radius.js"
import { spacingPrimitives } from "./spacing.js"

export { colorPrimitives } from "./color.js"
export { motionPrimitives } from "./motion.js"
export { radiusPrimitives } from "./radius.js"
export { spacingPrimitives } from "./spacing.js"

export const primitiveTokens: PrimitiveTokenGroup[] = [
  colorPrimitives,
  radiusPrimitives,
  spacingPrimitives,
  motionPrimitives,
]
