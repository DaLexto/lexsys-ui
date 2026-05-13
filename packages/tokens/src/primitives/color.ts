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
  $description: "Raw color palette. Never use directly in components.",

  white: { $value: "oklch(1 0 0)", $type: "color" },
  black: { $value: "oklch(0 0 0)", $type: "color" },

  neutral: {
    $description: "Neutral gray scale for backgrounds, text, and borders.",
    50: { $value: "oklch(0.925 0.000 0.000)", $type: "color" },
    100: { $value: "oklch(0.855 0.000 0.000)", $type: "color" },
    200: { $value: "oklch(0.786 0.000 0.000)", $type: "color" },
    300: { $value: "oklch(0.712 0.000 0.000)", $type: "color" },
    400: { $value: "oklch(0.637 0.000 0.000)", $type: "color" },
    500: { $value: "oklch(0.562 0.000 0.000)", $type: "color" },
    600: { $value: "oklch(0.482 0.000 0.000)", $type: "color" },
    700: { $value: "oklch(0.398 0.000 0.000)", $type: "color" },
    800: { $value: "oklch(0.309 0.000 0.000)", $type: "color" },
    900: { $value: "oklch(0.218 0.000 0.000)", $type: "color" },
    950: { $value: "oklch(0.097 0.000 0.000)", $type: "color" },
  },

  red: {
    $description: "Red primitive palette for destructive, danger, and critical mappings.",
    50: { $value: "oklch(0.836 0.083 28.091)", $type: "color" },
    100: { $value: "oklch(0.800 0.101 28.526)", $type: "color" },
    200: { $value: "oklch(0.730 0.136 28.480)", $type: "color" },
    300: { $value: "oklch(0.650 0.170 28.192)", $type: "color" },
    400: { $value: "oklch(0.595 0.186 27.396)", $type: "color" },
    500: { $value: "oklch(0.540 0.200 26.992)", $type: "color" },
    600: { $value: "oklch(0.466 0.185 26.009)", $type: "color" },
    700: { $value: "oklch(0.390 0.158 25.454)", $type: "color" },
    800: { $value: "oklch(0.306 0.124 25.101)", $type: "color" },
    900: { $value: "oklch(0.234 0.095 24.172)", $type: "color" },
    950: { $value: "oklch(0.197 0.080 24.164)", $type: "color" },
  },

  orange: {
    $description: "Orange primitive palette for warm accent and warning mappings.",
    50: { $value: "oklch(0.969 0.014 39.420)", $type: "color" },
    100: { $value: "oklch(0.934 0.035 39.988)", $type: "color" },
    200: { $value: "oklch(0.864 0.076 39.826)", $type: "color" },
    300: { $value: "oklch(0.785 0.129 39.490)", $type: "color" },
    400: { $value: "oklch(0.729 0.172 38.784)", $type: "color" },
    500: { $value: "oklch(0.675 0.218 38.562)", $type: "color" },
    600: { $value: "oklch(0.585 0.193 37.555)", $type: "color" },
    700: { $value: "oklch(0.475 0.165 35.426)", $type: "color" },
    800: { $value: "oklch(0.345 0.126 33.371)", $type: "color" },
    900: { $value: "oklch(0.216 0.083 31.655)", $type: "color" },
    950: { $value: "oklch(0.153 0.059 31.482)", $type: "color" },
  },

  yellow: {
    $description: "Yellow primitive palette for caution, highlight, and warning mappings.",
    50: { $value: "oklch(0.987 0.026 92.000)", $type: "color" },
    100: { $value: "oklch(0.973 0.051 92.000)", $type: "color" },
    200: { $value: "oklch(0.946 0.089 92.000)", $type: "color" },
    300: { $value: "oklch(0.906 0.130 92.000)", $type: "color" },
    400: { $value: "oklch(0.852 0.168 92.000)", $type: "color" },
    500: { $value: "oklch(0.790 0.178 92.000)", $type: "color" },
    600: { $value: "oklch(0.706 0.157 92.000)", $type: "color" },
    700: { $value: "oklch(0.578 0.128 92.000)", $type: "color" },
    800: { $value: "oklch(0.444 0.097 92.000)", $type: "color" },
    900: { $value: "oklch(0.315 0.065 92.000)", $type: "color" },
    950: { $value: "oklch(0.248 0.050 92.000)", $type: "color" },
  },

  green: {
    $description: "Green primitive palette for success, positive, and confirmation mappings.",
    50: { $value: "oklch(0.936 0.063 154.090)", $type: "color" },
    100: { $value: "oklch(0.913 0.083 153.563)", $type: "color" },
    200: { $value: "oklch(0.867 0.124 152.080)", $type: "color" },
    300: { $value: "oklch(0.823 0.161 150.170)", $type: "color" },
    400: { $value: "oklch(0.782 0.191 148.446)", $type: "color" },
    500: { $value: "oklch(0.726 0.200 146.985)", $type: "color" },
    600: { $value: "oklch(0.621 0.168 147.169)", $type: "color" },
    700: { $value: "oklch(0.511 0.134 147.564)", $type: "color" },
    800: { $value: "oklch(0.394 0.099 148.066)", $type: "color" },
    900: { $value: "oklch(0.272 0.062 148.962)", $type: "color" },
    950: { $value: "oklch(0.211 0.044 148.998)", $type: "color" },
  },

  blue: {
    $description: "Blue primitive palette for brand, primary action, and information mappings.",
    50: { $value: "oklch(0.924 0.098 274.036)", $type: "color" },
    100: { $value: "oklch(0.876 0.130 271.991)", $type: "color" },
    200: { $value: "oklch(0.778 0.195 267.901)", $type: "color" },
    300: { $value: "oklch(0.647 0.214 265.621)", $type: "color" },
    400: { $value: "oklch(0.596 0.214 264.251)", $type: "color" },
    500: { $value: "oklch(0.546 0.215 262.881)", $type: "color" },
    600: { $value: "oklch(0.455 0.191 259.631)", $type: "color" },
    700: { $value: "oklch(0.360 0.151 259.071)", $type: "color" },
    800: { $value: "oklch(0.276 0.117 259.071)", $type: "color" },
    900: { $value: "oklch(0.212 0.085 253.121)", $type: "color" },
    950: { $value: "oklch(0.180 0.070 250.146)", $type: "color" },
  },

  purple: {
    $description: "Purple primitive palette for expressive accent and brand extension mappings.",
    50: { $value: "oklch(0.977 0.014 308.299)", $type: "color" },
    100: { $value: "oklch(0.946 0.033 307.174)", $type: "color" },
    200: { $value: "oklch(0.902 0.063 306.703)", $type: "color" },
    300: { $value: "oklch(0.827 0.119 306.383)", $type: "color" },
    400: { $value: "oklch(0.714 0.203 305.504)", $type: "color" },
    500: { $value: "oklch(0.627 0.265 303.900)", $type: "color" },
    600: { $value: "oklch(0.558 0.288 302.321)", $type: "color" },
    700: { $value: "oklch(0.496 0.265 301.924)", $type: "color" },
    800: { $value: "oklch(0.438 0.218 303.724)", $type: "color" },
    900: { $value: "oklch(0.381 0.176 304.987)", $type: "color" },
    950: { $value: "oklch(0.291 0.149 302.717)", $type: "color" },
  },
}