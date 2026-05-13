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

    instant: { $value: "0ms", $type: "duration" },
    fastest: { $value: "100ms", $type: "duration" },
    fast: { $value: "150ms", $type: "duration" },
    normal: { $value: "200ms", $type: "duration" },
    slow: { $value: "300ms", $type: "duration" },
    slower: { $value: "500ms", $type: "duration" },
  },

  easing: {
    $description: "Raw easing curves for UI transitions and animations.",

    linear: { $value: "cubic-bezier(0, 0, 1, 1)", $type: "cubicBezier" },
    standard: { $value: "cubic-bezier(0.2, 0, 0, 1)", $type: "cubicBezier" },
    enter: { $value: "cubic-bezier(0, 0, 0.2, 1)", $type: "cubicBezier" },
    exit: { $value: "cubic-bezier(0.4, 0, 1, 1)", $type: "cubicBezier" },
    emphasized: { $value: "cubic-bezier(0.2, 0, 0, 1)", $type: "cubicBezier" },
  },
}
