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
  $description:
    "Raw spacing scale used as the source for layout rhythm semantics.",
  $type: "dimension",

  1: { $value: "0.25rem" },
  2: { $value: "0.5rem" },
  3: { $value: "0.75rem" },
  4: { $value: "1rem" },
  6: { $value: "1.5rem" },
  8: { $value: "2rem" },
  9: { $value: "2.25rem" },
  10: { $value: "2.5rem" },
  12: { $value: "3rem" },
  16: { $value: "4rem" },
}
