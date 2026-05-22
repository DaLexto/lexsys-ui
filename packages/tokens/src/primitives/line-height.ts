/**
 * line-height.ts
 *
 * @layer primitives
 * @description Defines the raw primitive line height scale used by the token system.
 *
 * @responsibility
 * - Provides reusable unitless line height values for typography semantics
 * - Keeps raw line height decisions centralized in the primitive layer
 * - Serves as the source for semantic typography line-height mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic typography tokens should map from this file
 * - Components must not consume primitive line heights directly
 *
 * @notes
 * - This file contains raw line height values only
 * - It does not define semantic usage such as body, heading, label, or caption text
 * - Line height values are intentionally unitless and use the DTCG `number` type
 */


import { primitiveTokens } from "../types/authoring"

export const lineHeightPrimitives = primitiveTokens("line-height", {
  $type: "number",
  $description:
    "Raw unitless line height scale used as the source for typography semantics.",

  none: { $value: 1 },
  tight: { $value: 1.25 },
  snug: { $value: 1.375 },
  normal: { $value: 1.5 },
  relaxed: { $value: 1.625 },
  loose: { $value: 2 },

})
