import type { SemanticTokenGroup } from "../types"
import { motionSemantics } from "./motion"
import { radiusSemantics } from "./radius"
import { sizeSemantics } from "./size"
import { spacingSemantics } from "./spacing"

export { motionSemantics } from "./motion"
export { radiusSemantics } from "./radius"
export { sizeSemantics } from "./size"
export { spacingSemantics } from "./spacing"

export const semanticTokens: SemanticTokenGroup[] = [
  radiusSemantics,
  spacingSemantics,
  sizeSemantics,
  motionSemantics,
]
