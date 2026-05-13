import type { PrimitiveTokenGroup } from "../types"

export const fontSizePrimitives: PrimitiveTokenGroup = {
  name: "font-size",
  xs: { $value: "0.75rem", $type: "dimension" },
  sm: { $value: "0.875rem", $type: "dimension" },
  base: { $value: "1rem", $type: "dimension" },
  lg: { $value: "1.125rem", $type: "dimension" },
  xl: { $value: "1.25rem", $type: "dimension" },
  "2xl": { $value: "1.5rem", $type: "dimension" },
  "3xl": { $value: "1.875rem", $type: "dimension" },
  "4xl": { $value: "2.25rem", $type: "dimension" },
  "5xl": { $value: "3rem", $type: "dimension" },
  "6xl": { $value: "3.75rem", $type: "dimension" },
  "7xl": { $value: "4.5rem", $type: "dimension" },
  "8xl": { $value: "6rem", $type: "dimension" },
  "9xl": { $value: "8rem", $type: "dimension" },
}
