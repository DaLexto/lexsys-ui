/**
 * css.shadow-compose.ts
 *
 * @layer generators
 * @description Compose CSS box-shadow values from shadow composite slot variables.
 */

import { toTokenName } from "../../shared"

import type { CssVarsGeneratorOptions } from "./css.types"
import { createDefaultCssVarsGeneratorOptions, toCssVarName } from "./css.utils"

export const SHADOW_BOX_SHADOW_LEAF_KEY = "boxShadow"

const SHADOW_BRANCH_SEGMENT = "shadow"

const SHADOW_BOX_SHADOW_SLOT_ORDER = [
  "offsetX",
  "offsetY",
  "blur",
  "spread",
  "color",
] as const

export const isShadowCompositeBoxShadowPath = (
  path: readonly string[],
): boolean => {
  if (path.length < 4) {
    return false
  }

  if (path[path.length - 1] !== SHADOW_BOX_SHADOW_LEAF_KEY) {
    return false
  }

  return path[path.length - 3] === SHADOW_BRANCH_SEGMENT
}

export const composeShadowBoxShadowCSSValue = (
  rolePath: readonly string[],
  options: CssVarsGeneratorOptions,
): string => {
  const resolvedOptions = createDefaultCssVarsGeneratorOptions(options)

  return SHADOW_BOX_SHADOW_SLOT_ORDER.map((slotKey) => {
    const slotPath = [...rolePath, slotKey]
    const tokenName = toTokenName(slotPath, resolvedOptions.groupNameOverrides)

    return `var(${toCssVarName(tokenName, resolvedOptions)})`
  }).join(" ")
}
