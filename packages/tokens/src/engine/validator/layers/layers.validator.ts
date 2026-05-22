/**
 * layers.validator.ts
 *
 * @layer validator
 * @description Validates cross-layer token reference contracts.
 */

import type { TokenTree } from "../../../types"
import {
  isReferenceString,
  isTokenLeaf,
  isTokenMetadataKey,
  isTokenTree,
  parseReference,
  toPathString,
} from "../../resolver/shared/shared.resolver.utils"
import type {
  LayerValidationInput,
  LayerValidationResult,
  LayerViolation,
  LayerViolationCode,
} from "./layers.types"

interface TokenReferenceUsage {
  reference: string
  sourcePath: string
  targetPath: string
}

const collectLeafPaths = (
  tree: TokenTree,
  path: string[] = [],
  paths: Set<string> = new Set(),
): Set<string> => {
  if (isTokenLeaf(tree)) {
    paths.add(toPathString(path))
    return paths
  }

  if (!isTokenTree(tree)) {
    return paths
  }

  for (const [key, value] of Object.entries(tree)) {
    if (isTokenMetadataKey(key)) {
      continue
    }

    if (isTokenLeaf(value) || isTokenTree(value)) {
      collectLeafPaths(value as TokenTree, [...path, key], paths)
    }
  }

  return paths
}

const collectTokenReferences = (
  tree: TokenTree,
  path: string[] = [],
  references: TokenReferenceUsage[] = [],
): TokenReferenceUsage[] => {
  if (isTokenLeaf(tree)) {
    if (isReferenceString(tree.$value)) {
      references.push({
        reference: tree.$value,
        sourcePath: toPathString(path),
        targetPath: parseReference(tree.$value),
      })
    }

    return references
  }

  if (!isTokenTree(tree)) {
    return references
  }

  for (const [key, value] of Object.entries(tree)) {
    if (isTokenMetadataKey(key)) {
      continue
    }

    if (isTokenLeaf(value) || isTokenTree(value)) {
      collectTokenReferences(value as TokenTree, [...path, key], references)
    }
  }

  return references
}

const createLayerViolation = (
  code: LayerViolationCode,
  message: string,
  usage: TokenReferenceUsage,
): LayerViolation => {
  return {
    code,
    message,
    sourcePath: usage.sourcePath,
    reference: usage.reference,
    targetPath: usage.targetPath,
  }
}

const collectThemeOnlyPaths = (input: LayerValidationInput): Set<string> => {
  const semanticPaths = collectLeafPaths(input.semanticTokens)
  const themeOnlyPaths = new Set<string>()

  for (const theme of input.themeTokens) {
    for (const path of collectLeafPaths(theme.tokens)) {
      if (!semanticPaths.has(path)) {
        themeOnlyPaths.add(path)
      }
    }
  }

  return themeOnlyPaths
}

const collectBrandComponentIntentViolations = (
  input: LayerValidationInput,
): LayerViolation[] => {
  const componentNamespaces = new Set(Object.keys(input.componentTokens))
  const violations: LayerViolation[] = []

  const visit = (tree: TokenTree, path: string[] = []): void => {
    if (isTokenLeaf(tree)) {
      return
    }

    if (!isTokenTree(tree)) {
      return
    }

    for (const [key, value] of Object.entries(tree)) {
      if (isTokenMetadataKey(key)) {
        continue
      }

      const nextPath = [...path, key]

      if (componentNamespaces.has(key)) {
        violations.push({
          code: "BRAND_COMPONENT_INTENT",
          message: `Brand token branch "${toPathString(nextPath)}" uses component-specific intent.`,
          sourcePath: toPathString(nextPath),
          reference: "",
          targetPath: toPathString(nextPath),
        })
      }

      if (isTokenLeaf(value) || isTokenTree(value)) {
        visit(value as TokenTree, nextPath)
      }
    }
  }

  visit(input.brandTokens)

  return violations
}

export const validateTokenLayerContracts = (
  input: LayerValidationInput,
): LayerValidationResult => {
  const primitivePaths = collectLeafPaths(input.primitiveTokens)
  const brandPaths = collectLeafPaths(input.brandTokens)
  const componentPaths = collectLeafPaths(input.componentTokens)
  const themeOnlyPaths = collectThemeOnlyPaths(input)
  const violations: LayerViolation[] = [
    ...collectBrandComponentIntentViolations(input),
  ]

  for (const usage of collectTokenReferences(input.componentTokens)) {
    if (primitivePaths.has(usage.targetPath)) {
      violations.push(
        createLayerViolation(
          "COMPONENT_TO_PRIMITIVE",
          `Component token "${usage.sourcePath}" references primitive token "${usage.targetPath}".`,
          usage,
        ),
      )
      continue
    }

    if (
      brandPaths.has(usage.targetPath) ||
      usage.targetPath.startsWith("brand.")
    ) {
      violations.push(
        createLayerViolation(
          "COMPONENT_TO_BRAND",
          `Component token "${usage.sourcePath}" references brand token "${usage.targetPath}".`,
          usage,
        ),
      )
      continue
    }

    if (themeOnlyPaths.has(usage.targetPath)) {
      violations.push(
        createLayerViolation(
          "COMPONENT_TO_THEME",
          `Component token "${usage.sourcePath}" references theme-only token "${usage.targetPath}".`,
          usage,
        ),
      )
    }
  }

  for (const usage of collectTokenReferences(input.semanticTokens)) {
    if (componentPaths.has(usage.targetPath)) {
      violations.push(
        createLayerViolation(
          "SEMANTIC_TO_COMPONENT",
          `Semantic token "${usage.sourcePath}" references component token "${usage.targetPath}".`,
          usage,
        ),
      )
    }
  }

  for (const theme of input.themeTokens) {
    for (const usage of collectTokenReferences(theme.tokens)) {
      if (componentPaths.has(usage.targetPath)) {
        violations.push(
          createLayerViolation(
            "THEME_TO_COMPONENT",
            `Theme token "${theme.name}.${usage.sourcePath}" references component token "${usage.targetPath}".`,
            usage,
          ),
        )
      }
    }
  }

  return { violations }
}

export const validateTokenLayerContractsStrict = (
  input: LayerValidationInput,
): void => {
  const { violations } = validateTokenLayerContracts(input)

  if (violations.length === 0) {
    return
  }

  const formattedViolations = violations
    .map((violation) => {
      return `- [${violation.code}] ${violation.message}`
    })
    .join("\n")

  throw new Error(`Token layer validation failed:\n${formattedViolations}`)
}
