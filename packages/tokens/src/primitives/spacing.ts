import type { PrimitiveTokenGroup } from "../types/index.js"

export const spacingPrimitives: PrimitiveTokenGroup = {
  name: "spacing",
  tokens: [
    { name: "space-1", value: "0.25rem" },
    { name: "space-2", value: "0.5rem" },
    { name: "space-3", value: "0.75rem" },
    { name: "space-4", value: "1rem" },
    { name: "space-6", value: "1.5rem" },
    { name: "space-8", value: "2rem" },
  ],
}
