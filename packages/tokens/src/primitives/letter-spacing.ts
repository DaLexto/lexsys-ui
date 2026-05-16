/**
 * letter-spacing.ts
 *
 * @layer primitives
 * @description Defines the raw primitive letter spacing scale used by the token system.
 *
 * @responsibility
 * - Provides reusable character spacing values for typography semantics
 * - Keeps raw letter spacing decisions centralized in the primitive layer
 * - Serves as the source for semantic typography tracking mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic typography tokens should map from this file
 * - Components must not consume primitive letter spacing directly
 *
 * @notes
 * - This file contains raw letter spacing values only
 * - It does not define semantic usage such as heading, label, caption, or body text
 * - Letter spacing tokens use the DTCG `letterSpacing` type
 */

import type { PrimitiveTokenGroup } from "../types"

export const letterSpacingPrimitives: PrimitiveTokenGroup = {
  name: "letter-spacing",
  $type: "letterSpacing",
  $description:
    "Raw letter spacing scale used as the source for typography semantics.",

  tighter: { $value: { value: -0.05, unit: "em" } },
  tight: { $value: { value: -0.025, unit: "em" } },
  normal: { $value: { value: 0, unit: "em" } },
  wide: { $value: { value: 0.025, unit: "em" } },
  wider: { $value: { value: 0.05, unit: "em" } },
  widest: { $value: { value: 0.1, unit: "em" } },
}
