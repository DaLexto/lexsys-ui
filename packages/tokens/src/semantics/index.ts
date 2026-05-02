import type { SemanticTokenGroup } from "../types"
import { typographySemantics } from "./typography"
import { motionSemantics } from "./motion"
import { radiusSemantics } from "./radius"
import { sizeSemantics } from "./size"
import { spacingSemantics } from "./spacing"

export { typographySemantics } from "./typography"
export { motionSemantics } from "./motion"
export { radiusSemantics } from "./radius"
export { sizeSemantics } from "./size"
export { spacingSemantics } from "./spacing"

export const semanticTokens: SemanticTokenGroup[] = [
  radiusSemantics,
  spacingSemantics,
  sizeSemantics,
  motionSemantics,
  typographySemantics
]
