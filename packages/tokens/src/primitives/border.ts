/**
 * border.ts
 *
 * @layer primitives
 * @description Defines the raw primitive border width scale used by the token system.
 *
 * @responsibility
 * - Provides reusable border width values
 * - Keeps raw border width decisions centralized in the primitive layer
 * - Serves as the source for semantic border and component outline mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic border tokens should map from this file
 * - Components must not consume primitive border widths directly
 *
 * @notes
 * - This file contains raw border width values only
 * - It does not define semantic usage such as default, strong, focus, or divider borders
 * - Border width tokens use the DTCG `dimension` type
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const borderPrimitives: PrimitiveTokenGroup = {
  name: "border",
  $description:
    "Raw border width scale used as the source for border and outline semantics.",
  $type: "dimension",

  none: { $value: "0" },
  hairline: { $value: "0.5px" },
  thin: { $value: "1px" },
  medium: { $value: "2px" },
  thick: { $value: "4px" },
}
