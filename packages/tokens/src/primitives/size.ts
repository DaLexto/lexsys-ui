/**
 * size.ts
 *
 * @layer primitives
 * @description Defines the raw primitive size scale used by the token system.
 *
 * @responsibility
 * - Provides reusable width, height, and fixed-size values
 * - Keeps raw size decisions centralized in the primitive layer
 * - Serves as the source for semantic and component size mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic size tokens should map from this file
 * - Components must not consume primitive sizes directly
 *
 * @notes
 * - This file contains raw size values only
 * - It does not define semantic usage such as control height, icon size, or container size
 * - Size tokens use the DTCG `dimension` type
 */

import type { PrimitiveTokenGroup } from "../types"

export const sizePrimitives: PrimitiveTokenGroup = {
  name: "size",
  $description:
    "Raw size scale used as the source for fixed width, height, and component sizing semantics.",

  1: { $value: "0.25rem", $type: "dimension" },
  2: { $value: "0.5rem", $type: "dimension" },
  3: { $value: "0.75rem", $type: "dimension" },
  4: { $value: "1rem", $type: "dimension" },
  5: { $value: "1.25rem", $type: "dimension" },
  6: { $value: "1.5rem", $type: "dimension" },
  7: { $value: "1.75rem", $type: "dimension" },
  8: { $value: "2rem", $type: "dimension" },
  9: { $value: "2.25rem", $type: "dimension" },
  10: { $value: "2.5rem", $type: "dimension" },
  11: { $value: "2.75rem", $type: "dimension" },
  12: { $value: "3rem", $type: "dimension" },
  13: { $value: "3.25rem", $type: "dimension" },
  14: { $value: "3.5rem", $type: "dimension" },
  15: { $value: "3.75rem", $type: "dimension" },
  16: { $value: "4rem", $type: "dimension" },
  20: { $value: "5rem", $type: "dimension" },
  48: { $value: "12rem", $type: "dimension" },
  80: { $value: "20rem", $type: "dimension" },
  96: { $value: "24rem", $type: "dimension" },
  128: { $value: "32rem", $type: "dimension" },
  160: { $value: "40rem", $type: "dimension" },
}