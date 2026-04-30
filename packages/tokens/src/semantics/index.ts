import type { SemanticTokenGroup } from "../types/index.js"
import { motionSemantics } from "./motion.js"
import { radiusSemantics } from "./radius.js"
import { spacingSemantics } from "./spacing.js"

export { motionSemantics } from "./motion.js"
export { radiusSemantics } from "./radius.js"
export { spacingSemantics } from "./spacing.js"

export const semanticTokens: SemanticTokenGroup[] = [
  radiusSemantics,
  spacingSemantics,
  motionSemantics,
]
