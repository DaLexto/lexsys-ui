import type { SemanticTokenGroup } from "../types"
import { typographySemantics } from "./typography"
import { motionSemantics } from "./motion"
import { radiusSemantics } from "./radius"
import { sizeSemantics } from "./size"
import { spacingSemantics } from "./spacing"
import { colorSemantics } from "./color"
import { actionSemantics } from "./action"
import { borderSemantics } from "./border"
import { elevationSemantics } from "./elevation"
import { outlineSemantics } from "./outline"
import { layoutSemantics } from "./layout"

export { colorSemantics } from "./color"
export { actionSemantics } from "./action"
export { typographySemantics } from "./typography"
export { motionSemantics } from "./motion"
export { radiusSemantics } from "./radius"
export { sizeSemantics } from "./size"
export { spacingSemantics } from "./spacing"
export { borderSemantics } from "./border"
export { elevationSemantics } from "./elevation"
export { outlineSemantics } from "./outline"
export { layoutSemantics } from "./layout"

export const semanticTokens: SemanticTokenGroup[] = [
  radiusSemantics,
  spacingSemantics,
  sizeSemantics,
  motionSemantics,
  typographySemantics,
  colorSemantics,
  actionSemantics,
  borderSemantics,
  elevationSemantics,
  outlineSemantics,
  layoutSemantics,
]
