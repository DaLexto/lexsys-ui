import type { PrimitiveTokenGroup } from "../types/index.js"

export const colorPrimitives: PrimitiveTokenGroup = {
  name: "color",
  tokens: [
    { name: "color-white", value: "oklch(1 0 0)" },
    { name: "color-black", value: "oklch(0 0 0)" },
    { name: "color-neutral-50", value: "oklch(0.985 0 0)" },
    { name: "color-neutral-100", value: "oklch(0.97 0 0)" },
    { name: "color-neutral-200", value: "oklch(0.922 0 0)" },
    { name: "color-neutral-300", value: "oklch(0.87 0 0)" },
    { name: "color-neutral-500", value: "oklch(0.556 0 0)" },
    { name: "color-neutral-700", value: "oklch(0.371 0 0)" },
    { name: "color-neutral-900", value: "oklch(0.205 0 0)" },
    { name: "color-neutral-950", value: "oklch(0.145 0 0)" },
    { name: "color-blue-500", value: "oklch(0.623 0.214 259.815)" },
    { name: "color-blue-600", value: "oklch(0.546 0.245 262.881)" },
    { name: "color-blue-700", value: "oklch(0.488 0.243 264.376)" },
    { name: "color-red-500", value: "oklch(0.637 0.237 25.331)" },
    { name: "color-red-600", value: "oklch(0.577 0.245 27.325)" },
  ],
}
