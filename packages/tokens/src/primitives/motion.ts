/**
 * motion.ts
 *
 * @layer primitives
 * @description Defines the raw primitive motion duration and easing values used by the token system.
 *
 * @responsibility
 * - Provides reusable animation duration values
 * - Provides reusable easing curve values
 * - Keeps raw motion decisions centralized in the primitive layer
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic motion tokens should map from this file
 * - Components must not consume primitive motion values directly
 *
 * @notes
 * - This file contains raw motion values only
 * - It does not define semantic usage such as fast feedback, overlay entry, or drawer movement
 * - Duration tokens use the DTCG `duration` type
 * - Easing tokens use the DTCG `cubicBezier` type
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const motionPrimitives: PrimitiveTokenGroup = {
  name: "motion",
  $description:
    "Raw motion duration and easing values used as the source for motion semantics.",

  duration: {
    $description: "Raw duration scale for UI transitions and animations.",
    $type: "duration",

    instant: { $value: "0ms" },
    fastest: { $value: "100ms" },
    fast: { $value: "150ms" },
    normal: { $value: "200ms" },
    slow: { $value: "300ms" },
    slower: { $value: "500ms" },
  },

  easing: {
    $description: "Raw easing curves for UI transitions and animations.",
    $type: "cubicBezier",

    linear: { $value: "cubic-bezier(0, 0, 1, 1)" },
    standard: { $value: "cubic-bezier(0.2, 0, 0, 1)" },
    enter: { $value: "cubic-bezier(0, 0, 0.2, 1)" },
    exit: { $value: "cubic-bezier(0.4, 0, 1, 1)" },
    emphasized: { $value: "cubic-bezier(0.2, 0, 0, 1)" },
  },
}
