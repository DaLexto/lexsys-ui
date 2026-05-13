import type { PrimitiveTokenGroup } from "../types"

export const lineHeightPrimitives: PrimitiveTokenGroup = {
  name: "line-height",
  3: { $value: ".75rem", $type: "dimension" },
  4: { $value: "1rem", $type: "dimension" },
  5: { $value: "1.25rem", $type: "dimension" },
  6: { $value: "1.5rem", $type: "dimension" },
  7: { $value: "1.75rem", $type: "dimension" },
  8: { $value: "2rem", $type: "dimension" },
  9: { $value: "2.25rem", $type: "dimension" },
  10: { $value: "2.5rem", $type: "dimension" },
  none: { $value: 1, $type: "number" },
  tight: { $value: 1.25, $type: "number" },
  snug: { $value: 1.375, $type: "number" },
  normal: { $value: 1.5, $type: "number" },
  relaxed: { $value: 1.625, $type: "number" },
  loose: { $value: 2, $type: "number" },
}
