import type { PrimitiveTokenGroup } from "../types/index.js"

export const radiusPrimitives: PrimitiveTokenGroup = {
  name: "radius",
  none: { $value: "0" },
  sm: { $value: "0.25rem" },
  md: { $value: "0.375rem" },
  lg: { $value: "0.5rem" },
  xl: { $value: "0.75rem" },
  full: { $value: "9999px" },
}
