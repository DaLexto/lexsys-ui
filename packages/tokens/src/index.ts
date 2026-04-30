/**
 * Public entry point for @neurex/tokens.
 *
 * The tokens package is the design-system source of truth.
 */

export { componentTokens } from "./components/index.js"
export { createStyleOutputs } from "./generators/outputs.js"
export { primitiveTokens } from "./primitives/index.js"
export { semanticTokens } from "./semantics/index.js"
export {
  defaultStylePresetId,
  neurexDefaultStylePreset,
  stylePresets,
} from "./styles/index.js"
export { themes } from "./themes/index.js"
export type {
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
  StyleOutputs,
  StylePresetDefinition,
  StylePresetId,
  ThemeDefinition,
  ThemeModeId,
  ThemeTokenMap,
  TokenEntry,
} from "./types/index.js"
