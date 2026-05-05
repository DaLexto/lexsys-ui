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
    50: { value: "oklch(0.836 0.083 28.091)" },
    100: { value: "oklch(0.800 0.101 28.526)" },
    200: { value: "oklch(0.730 0.136 28.480)" },
    300: { value: "oklch(0.650 0.170 28.192)" },
    400: { value: "oklch(0.595 0.186 27.396)" },
    500: { value: "oklch(0.540 0.200 26.992)" },
    600: { value: "oklch(0.466 0.185 26.009)" },
    700: { value: "oklch(0.390 0.158 25.454)" },
    800: { value: "oklch(0.306 0.124 25.101)" },
    900: { value: "oklch(0.234 0.095 24.172)" },
    950: { value: "oklch(0.197 0.080 24.164)" },
  },

  orange: {
    50: { value: "oklch(0.969 0.014 39.420)" },
    100: { value: "oklch(0.934 0.035 39.988)" },
    200: { value: "oklch(0.864 0.076 39.826)" },
    300: { value: "oklch(0.785 0.129 39.490)" },
    400: { value: "oklch(0.729 0.172 38.784)" },
    500: { value: "oklch(0.675 0.218 38.562)" },
    600: { value: "oklch(0.585 0.193 37.555)" },
    700: { value: "oklch(0.475 0.165 35.426)" },
    800: { value: "oklch(0.345 0.126 33.371)" },
    900: { value: "oklch(0.216 0.083 31.655)" },
    950: { value: "oklch(0.153 0.059 31.482)" },
  },

  yellow: {
    50: { value: "oklch(0.874 0.072 89.787)" },
    100: { value: "oklch(0.871 0.090 90.817)" },
    200: { value: "oklch(0.865 0.126 92.053)" },
    300: { value: "oklch(0.863 0.152 91.819)" },
    400: { value: "oklch(0.859 0.167 92.034)" },
    500: { value: "oklch(0.861 0.173 91.936)" },
    600: { value: "oklch(0.735 0.150 92.179)" },
    700: { value: "oklch(0.604 0.124 92.013)" },
    800: { value: "oklch(0.469 0.096 91.898)" },
    900: { value: "oklch(0.331 0.068 92.197)" },
    950: { value: "oklch(0.262 0.053 91.171)" },
  },

  green: {
    50: { value: "oklch(0.936 0.063 154.090)" },
    100: { value: "oklch(0.913 0.083 153.563)" },
    200: { value: "oklch(0.867 0.124 152.080)" },
    300: { value: "oklch(0.823 0.161 150.170)" },
    400: { value: "oklch(0.782 0.191 148.446)" },
    500: { value: "oklch(0.726 0.200 146.985)" },
    600: { value: "oklch(0.621 0.168 147.169)" },
    700: { value: "oklch(0.511 0.134 147.564)" },
    800: { value: "oklch(0.394 0.099 148.066)" },
    900: { value: "oklch(0.272 0.062 148.962)" },
    950: { value: "oklch(0.211 0.044 148.998)" },
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
