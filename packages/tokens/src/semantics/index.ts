import type { SemanticTokenGroup } from "../types"
import { typographySemantics } from "./typography.semantic"
import { motionSemantics } from "./motion.semantic"
import { radiusSemantics } from "./radius.semantic"
import { sizeSemantics } from "./size.semantic"
import { spacingSemantics } from "./spacing.semantic"
import { colorSemantics } from "./color.semantic"

export { colorSemantics } from "./color.semantic"
export { typographySemantics } from "./typography.semantic"
export { motionSemantics } from "./motion.semantic"
export { radiusSemantics } from "./radius.semantic"
export { sizeSemantics } from "./size.semantic"
export { spacingSemantics } from "./spacing.semantic"

export const semanticTokens: SemanticTokenGroup[] = [
  radiusSemantics,
  spacingSemantics,
  sizeSemantics,
  motionSemantics,
  typographySemantics,
  colorSemantics,
]
