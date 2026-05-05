/**
 * color.ts
 *
 * @layer primitives
 * @description Defines the raw primitive color palettes used as the visual foundation
 * of the token system.
 *
 * @responsibility
 * - Provides hue families with ordered light-to-dark shade scales
 * - Serves as the source palette for semantic token mapping
 * - Keeps raw color values centralized in a single primitive layer
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic tokens should map from this file
 * - Components must not consume primitive colors directly
 *
 * @notes
 * - This file contains raw palette values only
 * - It does not define semantic meaning such as background, text, border, or status usage
 * - Shade keys follow a consistent scale from 50 to 950
 *
 * @created 2026-04-18 09:48
 */

import type { PrimitiveTokenGroup } from "../types"

export const colorPrimitives: PrimitiveTokenGroup = {
  name: "color",

  white: { value: "oklch(1 0 0)" },
  black: { value: "oklch(0 0 0)" },

  neutral: {
    50: { value: "oklch(0.925 0.000 0.000)" },
    100: { value: "oklch(0.855 0.000 0.000)" },
    200: { value: "oklch(0.786 0.000 0.000)" },
    300: { value: "oklch(0.712 0.000 0.000)" },
    400: { value: "oklch(0.637 0.000 0.000)" },
    500: { value: "oklch(0.562 0.000 0.000)" },
    600: { value: "oklch(0.482 0.000 0.000)" },
    700: { value: "oklch(0.398 0.000 0.000)" },
    800: { value: "oklch(0.309 0.000 0.000)" },
    900: { value: "oklch(0.218 0.000 0.000)" },
    950: { value: "oklch(0.097 0.000 0.000)" },
  },

  red: {
    50: { value: "oklch(90% 0.04 17)" },
    100: { value: "oklch(81% 0.08 18)" },
    200: { value: "oklch(73% 0.13 20)" },
    300: { value: "oklch(66% 0.17 22)" },
    400: { value: "oklch(60% 0.21 26)" },
    500: { value: "oklch(54% 0.2 27)" },
    600: { value: "oklch(46% 0.17 27)" },
    700: { value: "oklch(37% 0.13 26)" },
    800: { value: "oklch(29% 0.09 25)" },
    900: { value: "oklch(20% 0.05 23)" },
    950: { value: "oklch(8% 0.02 20)" },
  },

  orange: {
    50: { value: "oklch(96% 0.02 46)" },
    100: { value: "oklch(89% 0.06 46)" },
    200: { value: "oklch(82% 0.11 46)" },
    300: { value: "oklch(76% 0.15 45)" },
    400: { value: "oklch(71% 0.19 43)" },
    500: { value: "oklch(67% 0.22 38)" },
    600: { value: "oklch(58% 0.19 38)" },
    700: { value: "oklch(49% 0.16 39)" },
    800: { value: "oklch(39% 0.12 40)" },
    900: { value: "oklch(28% 0.08 42)" },
    950: { value: "oklch(16% 0.04 55)" },
  },

  yellow: {
    50: { value: "oklch(100% 0.01 106)" },
    100: { value: "oklch(99% 0.06 107)" },
    200: { value: "oklch(98% 0.11 107)" },
    300: { value: "oklch(97% 0.15 107)" },
    400: { value: "oklch(96% 0.18 106)" },
    500: { value: "oklch(95% 0.2 106)" },
    600: { value: "oklch(92% 0.2 105)" },
    700: { value: "oklch(80% 0.17 105)" },
    800: { value: "oklch(67% 0.14 104)" },
    900: { value: "oklch(53% 0.11 103)" },
    950: { value: "oklch(39% 0.08 104)" },
  },

  green: {
    50: { value: "oklch(0.982 0.018 155.826)" },
    100: { value: "oklch(0.962 0.044 156.743)" },
    200: { value: "oklch(0.925 0.084 155.995)" },
    300: { value: "oklch(0.871 0.150 154.449)" },
    400: { value: "oklch(0.792 0.209 151.711)" },
    500: { value: "oklch(0.723 0.219 149.579)" },
    600: { value: "oklch(0.627 0.194 149.214)" },
    700: { value: "oklch(0.527 0.154 150.069)" },
    800: { value: "oklch(0.448 0.119 151.328)" },
    900: { value: "oklch(0.393 0.095 152.535)" },
    950: { value: "oklch(0.266 0.065 152.934)" },
  },

  blue: {
    50: { value: "oklch(0.924 0.098 274.036)" },
    100: { value: "oklch(0.876 0.130 271.991)" },
    200: { value: "oklch(0.778 0.195 267.901)" },
    300: { value: "oklch(0.647 0.214 265.621)" },
    400: { value: "oklch(0.596 0.214 264.251)" },
    500: { value: "oklch(0.546 0.215 262.881)" },
    600: { value: "oklch(0.455 0.191 259.631)" },
    700: { value: "oklch(0.360 0.151 259.071)" },
    800: { value: "oklch(0.276 0.117 259.071)" },
    900: { value: "oklch(0.212 0.085 253.121)" },
    950: { value: "oklch(0.180 0.070 250.146)" },
  },

  purple: {
    50: { value: "oklch(0.977 0.014 308.299)" },
    100: { value: "oklch(0.946 0.033 307.174)" },
    200: { value: "oklch(0.902 0.063 306.703)" },
    300: { value: "oklch(0.827 0.119 306.383)" },
    400: { value: "oklch(0.714 0.203 305.504)" },
    500: { value: "oklch(0.627 0.265 303.900)" },
    600: { value: "oklch(0.558 0.288 302.321)" },
    700: { value: "oklch(0.496 0.265 301.924)" },
    800: { value: "oklch(0.438 0.218 303.724)" },
    900: { value: "oklch(0.381 0.176 304.987)" },
    950: { value: "oklch(0.291 0.149 302.717)" },
  },
}
