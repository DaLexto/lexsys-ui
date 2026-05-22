/**
 * index.ts
 *
 * @layer resolver
 * @description Public entry point for resolved value pipeline (Phase 9).
 */

export type {
  ResolvedLeafValue,
  ResolveLeafResult,
  ResolveLeafValuesResult,
  ResolveValuesOptions,
} from "./values.types"

export type { ContrastReadyColor } from "./values.normalize"

export {
  resolveLeafValue,
  resolveLeafValues,
  resolveLeafValueForTheme,
} from "./values.resolver"

export {
  isResolvedColorValue,
  toContrastReadyColor,
} from "./values.normalize"
