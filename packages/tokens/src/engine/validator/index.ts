/**
 * index.ts
 *
 * @layer validator
 * @description Public entry point for build-failing token validation.
 */

export {
  validateTokenLayerContracts,
  validateTokenLayerContractsStrict,
} from "./layers/layers.validator"

export type {
  LayerValidationInput,
  LayerValidationResult,
  LayerValidationThemeInput,
  LayerViolation,
  LayerViolationCode,
} from "./layers/layers.types"
