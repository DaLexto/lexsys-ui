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

import type { TokenColorValue } from "../types"
import { primitiveTokens } from "../types/authoring"

const oklch = (
  lightness: number,
  chroma: number,
  hue: number,
  alpha?: number,
  hex?: string,
): TokenColorValue => {
  return {
    colorSpace: "oklch",
    components: [lightness, chroma, hue],
    ...(alpha === undefined ? {} : { alpha }),
    ...(hex === undefined ? {} : { hex }),
  }
}

export const colorPrimitives = primitiveTokens("color", {
  $type: "color",
  $description: "Raw color palette. Never use directly in components.",

  white: { $value: oklch(1, 0, 0, 1, "#ffffff") },
  black: { $value: oklch(0, 0, 0, 1, "#000000") },

  neutral: {
    $description: "Neutral gray scale for backgrounds, text, and borders.",
    50: { $value: oklch(0.925, 0.0, 0.0) },
    100: { $value: oklch(0.855, 0.0, 0.0) },
    200: { $value: oklch(0.786, 0.0, 0.0) },
    300: { $value: oklch(0.712, 0.0, 0.0) },
    400: { $value: oklch(0.637, 0.0, 0.0) },
    500: { $value: oklch(0.562, 0.0, 0.0) },
    600: { $value: oklch(0.482, 0.0, 0.0) },
    700: { $value: oklch(0.398, 0.0, 0.0) },
    800: { $value: oklch(0.309, 0.0, 0.0) },
    900: { $value: oklch(0.218, 0.0, 0.0) },
    950: { $value: oklch(0.097, 0.0, 0.0) },
  },

  red: {
    $description:
      "Red primitive palette for destructive, danger, and critical mappings.",
    50: { $value: oklch(0.836, 0.083, 28.091) },
    100: { $value: oklch(0.8, 0.101, 28.526) },
    200: { $value: oklch(0.73, 0.136, 28.48) },
    300: { $value: oklch(0.65, 0.17, 28.192) },
    400: { $value: oklch(0.595, 0.186, 27.396) },
    500: { $value: oklch(0.54, 0.2, 26.992) },
    600: { $value: oklch(0.466, 0.185, 26.009) },
    700: { $value: oklch(0.39, 0.158, 25.454) },
    800: { $value: oklch(0.306, 0.124, 25.101) },
    900: { $value: oklch(0.234, 0.095, 24.172) },
    950: { $value: oklch(0.197, 0.08, 24.164) },
  },

  orange: {
    $description:
      "Orange primitive palette for warm accent and warning mappings.",
    50: { $value: oklch(0.969, 0.014, 39.42) },
    100: { $value: oklch(0.934, 0.035, 39.988) },
    200: { $value: oklch(0.864, 0.076, 39.826) },
    300: { $value: oklch(0.785, 0.129, 39.49) },
    400: { $value: oklch(0.729, 0.172, 38.784) },
    500: { $value: oklch(0.675, 0.218, 38.562) },
    600: { $value: oklch(0.585, 0.193, 37.555) },
    700: { $value: oklch(0.475, 0.165, 35.426) },
    800: { $value: oklch(0.345, 0.126, 33.371) },
    900: { $value: oklch(0.216, 0.083, 31.655) },
    950: { $value: oklch(0.153, 0.059, 31.482) },
  },

  yellow: {
    $description:
      "Yellow primitive palette for caution, highlight, and warning mappings.",
    50: { $value: oklch(0.987, 0.026, 92) },
    100: { $value: oklch(0.973, 0.051, 92) },
    200: { $value: oklch(0.946, 0.089, 92) },
    300: { $value: oklch(0.906, 0.13, 92) },
    400: { $value: oklch(0.852, 0.168, 92) },
    500: { $value: oklch(0.79, 0.178, 92) },
    600: { $value: oklch(0.706, 0.17, 92) },
    700: { $value: oklch(0.578, 0.145, 92) },
    800: { $value: oklch(0.444, 0.097, 92) },
    900: { $value: oklch(0.315, 0.065, 92) },
    950: { $value: oklch(0.248, 0.05, 92) },
  },

  green: {
    $description:
      "Green primitive palette for success, positive, and confirmation mappings.",
    50: { $value: oklch(0.936, 0.063, 154.09) },
    100: { $value: oklch(0.913, 0.083, 153.563) },
    200: { $value: oklch(0.867, 0.124, 152.08) },
    300: { $value: oklch(0.823, 0.161, 150.17) },
    400: { $value: oklch(0.782, 0.191, 148.446) },
    500: { $value: oklch(0.726, 0.2, 146.985) },
    600: { $value: oklch(0.621, 0.168, 147.169) },
    700: { $value: oklch(0.511, 0.134, 147.564) },
    800: { $value: oklch(0.394, 0.099, 148.066) },
    900: { $value: oklch(0.272, 0.062, 148.962) },
    950: { $value: oklch(0.211, 0.044, 148.998) },
  },

  blue: {
    $description:
      "Blue primitive palette for brand, primary action, and information mappings.",
    50: { $value: oklch(0.924, 0.098, 274.036) },
    100: { $value: oklch(0.876, 0.13, 271.991) },
    200: { $value: oklch(0.778, 0.195, 267.901) },
    300: { $value: oklch(0.647, 0.214, 265.621) },
    400: { $value: oklch(0.596, 0.214, 264.251) },
    500: { $value: oklch(0.546, 0.215, 262.881) },
    600: { $value: oklch(0.455, 0.191, 259.631) },
    700: { $value: oklch(0.36, 0.151, 259.071) },
    800: { $value: oklch(0.276, 0.117, 259.071) },
    900: { $value: oklch(0.212, 0.085, 253.121) },
    950: { $value: oklch(0.18, 0.07, 250.146) },
  },

  purple: {
    $description:
      "Purple primitive palette for expressive accent and brand extension mappings.",
    50: { $value: oklch(0.977, 0.014, 308.299) },
    100: { $value: oklch(0.946, 0.033, 307.174) },
    200: { $value: oklch(0.902, 0.063, 306.703) },
    300: { $value: oklch(0.827, 0.119, 306.383) },
    400: { $value: oklch(0.714, 0.203, 305.504) },
    500: { $value: oklch(0.627, 0.265, 303.9) },
    600: { $value: oklch(0.558, 0.288, 302.321) },
    700: { $value: oklch(0.496, 0.265, 301.924) },
    800: { $value: oklch(0.438, 0.218, 303.724) },
    900: { $value: oklch(0.381, 0.176, 304.987) },
    950: { $value: oklch(0.291, 0.149, 302.717) },
  },

  spaceIndigo: {
    $description:
      "Space indigo primitive palette for deep brand and cosmic accent mappings.",
    50: { $value: oklch(0.937, 0.005, 274.963) },
    100: { $value: oklch(0.871, 0.011, 274.875) },
    200: { $value: oklch(0.737, 0.025, 275.233) },
    300: { $value: oklch(0.599, 0.037, 272.432) },
    400: { $value: oklch(0.452, 0.055, 272.278) },
    500: { $value: oklch(0.295, 0.076, 269.953) },
    600: { $value: oklch(0.259, 0.063, 270.048) },
    700: { $value: oklch(0.221, 0.048, 269.859) },
    800: { $value: oklch(0.179, 0.036, 272.337) },
    900: { $value: oklch(0.136, 0.019, 270.815) },
    950: { $value: oklch(0.108, 0.013, 269.716) },
  },
})


