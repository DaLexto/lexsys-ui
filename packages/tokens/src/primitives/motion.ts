import type { PrimitiveTokenGroup } from "../types/index.js"

export const motionPrimitives: PrimitiveTokenGroup = {
  name: "motion",
  duration: {
    fast: { value: "150ms" },
    normal: { value: "200ms" },
  },
  easing: {
    standard: { value: "cubic-bezier(0.2, 0, 0, 1)" },
  },
}
