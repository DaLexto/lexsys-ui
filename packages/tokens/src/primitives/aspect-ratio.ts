/**
 * aspect-ratio.ts
 *
 * @layer primitives
 * @description Defines the raw primitive aspect ratio values used by the token system.
 *
 * @responsibility
 * - Provides reusable width-to-height ratio values
 * - Keeps raw aspect ratio decisions centralized in the primitive layer
 * - Serves as the source for semantic layout and media ratio mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic layout tokens should map from this file
 * - Components must not consume primitive aspect ratios directly
 *
 * @notes
 * - This file contains raw aspect ratio values only
 * - It does not define semantic usage such as avatar, media, card, or preview ratios
 * - Aspect ratio values are stored as width divided by height
 * - Aspect ratio tokens use the DTCG `number` type
 */

import type { PrimitiveTokenGroup } from "../types"

export const aspectRatioPrimitives: PrimitiveTokenGroup = {
  name: "aspect-ratio",
  $type: "number",
  $description:
    "Raw aspect ratio values used as the source for layout and media semantics.",

  "1-1": { $value: 1 },
  "4-3": { $value: 1.333333 },
  "3-2": { $value: 1.5 },
  "3-4": { $value: 0.75 },
  "16-9": { $value: 1.777778 },
  "21-9": { $value: 2.333333 },
}
