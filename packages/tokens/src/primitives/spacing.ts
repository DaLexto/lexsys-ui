/**
 * spacing.ts
 *
 * @layer primitives
 * @description Defines the raw primitive spacing scale used by the token system.
 *
 * @responsibility
 * - Provides reusable spacing values for layout rhythm
 * - Keeps raw spacing decisions centralized in the primitive layer
 * - Serves as the source for semantic spacing mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic spacing tokens should map from this file
 * - Components must not consume primitive spacing values directly
 *
 * @notes
 * - This file contains raw spacing values only
 * - It does not define semantic usage such as gap, padding, inset, or section spacing
 * - Spacing tokens use the DTCG `dimension` type
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const spacingPrimitives: PrimitiveTokenGroup = {
  name: "spacing",
  $type: "dimension",
  $description:
    "Raw spacing scale used as the source for layout rhythm semantics.",

  1: { $value: { value: 0.25, unit: "rem" } },
  2: { $value: { value: 0.5, unit: "rem" } },
  3: { $value: { value: 0.75, unit: "rem" } },
  4: { $value: { value: 1, unit: "rem" } },
  6: { $value: { value: 1.5, unit: "rem" } },
  8: { $value: { value: 2, unit: "rem" } },
  9: { $value: { value: 2.25, unit: "rem" } },
  10: { $value: { value: 2.5, unit: "rem" } },
  12: { $value: { value: 3, unit: "rem" } },
  16: { $value: { value: 4, unit: "rem" } },
}
