import type { PrimitiveTokenGroup } from "../types"

export const colorPrimitives: PrimitiveTokenGroup = {
  name: "color",
  white: { value: "oklch(1 0 0)" },
  black: { value: "oklch(0 0 0)" },
  neutral: {
    50: { value: "oklch(0.985 0 0)" },
    100: { value: "oklch(0.97 0 0)" },
    200: { value: "oklch(0.922 0 0)" },
    300: { value: "oklch(0.87 0 0)" },
    500: { value: "oklch(0.556 0 0)" },
    700: { value: "oklch(0.371 0 0)" },
    900: { value: "oklch(0.205 0 0)" },
    950: { value: "oklch(0.145 0 0)" },
  },
  blue: {
    500: { value: "oklch(0.623 0.214 259.815)" },
    600: { value: "oklch(0.546 0.245 262.881)" },
    700: { value: "oklch(0.488 0.243 264.376)" },
  },
  red: {
    500: { value: "oklch(0.637 0.237 25.331)" },
    600: { value: "oklch(0.577 0.245 27.325)" },
  },
}
