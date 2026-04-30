/**
 * Public entry point for @neurex/tokens.
 *
 * The tokens package is the design-system source of truth.
 */

export { componentTokens } from "./component-tokens.js"
export { createStyleOutputs } from "./outputs.js"
export { primitiveTokens } from "./primitives.js"
export {
  defaultStylePresetId,
  neurexDefaultStylePreset,
  stylePresets,
} from "./styles/index.js"
export { themes } from "./themes.js"
export type {
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  StyleOutputs,
  StylePresetDefinition,
  StylePresetId,
  ThemeDefinition,
  ThemeModeId,
  ThemeTokenMap,
  TokenEntry,
} from "./types.js"
