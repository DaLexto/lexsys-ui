import type { PrimitiveTokenGroup } from "../types/index.js"

export const radiusPrimitives: PrimitiveTokenGroup = {
  name: "radius",
  tokens: [
    { name: "radius-none", value: "0" },
    { name: "radius-sm", value: "0.25rem" },
    { name: "radius-md", value: "0.375rem" },
    { name: "radius-lg", value: "0.5rem" },
    { name: "radius-xl", value: "0.75rem" },
    { name: "radius-full", value: "9999px" },
  ],
}
