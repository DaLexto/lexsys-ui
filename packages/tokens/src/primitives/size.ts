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


import { primitiveTokens } from "../types/authoring"

export const sizePrimitives = primitiveTokens("size", {
  $type: "dimension",
  $description:
    "Raw size scale used as the source for fixed width, height, and component sizing semantics.",

  1: { $value: { value: 0.25, unit: "rem" } },
  2: { $value: { value: 0.5, unit: "rem" } },
  3: { $value: { value: 0.75, unit: "rem" } },
  4: { $value: { value: 1, unit: "rem" } },
  5: { $value: { value: 1.25, unit: "rem" } },
  6: { $value: { value: 1.5, unit: "rem" } },
  7: { $value: { value: 1.75, unit: "rem" } },
  8: { $value: { value: 2, unit: "rem" } },
  9: { $value: { value: 2.25, unit: "rem" } },
  10: { $value: { value: 2.5, unit: "rem" } },
  11: { $value: { value: 2.75, unit: "rem" } },
  12: { $value: { value: 3, unit: "rem" } },
  13: { $value: { value: 3.25, unit: "rem" } },
  14: { $value: { value: 3.5, unit: "rem" } },
  15: { $value: { value: 3.75, unit: "rem" } },
  16: { $value: { value: 4, unit: "rem" } },
  20: { $value: { value: 5, unit: "rem" } },
  48: { $value: { value: 12, unit: "rem" } },
  80: { $value: { value: 20, unit: "rem" } },
  96: { $value: { value: 24, unit: "rem" } },
  128: { $value: { value: 32, unit: "rem" } },
  160: { $value: { value: 40, unit: "rem" } },

})
