import type { PrimitiveTokenGroup } from "../types/index.js"

export const motionPrimitives: PrimitiveTokenGroup = {
  name: "motion",
  tokens: [
    { name: "duration-fast", value: "150ms" },
    { name: "duration-normal", value: "200ms" },
    { name: "easing-standard", value: "cubic-bezier(0.2, 0, 0, 1)" },
  ],
}
