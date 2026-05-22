/**
 * values.resolver.ts
 *
 * @layer resolver
 * @description On-demand resolved leaf value pipeline (Phase 9).
 */

import {
  collectLeafPaths,
  createThemedTokenTree,
} from "../../shared/tree.utils"
import type {
  ThemedTokenTreeOverlay,
  ThemedTokenTreeSource,
} from "../../shared/tree.utils"
import { resolveReferenceChain } from "../reference/reference-chain"
import type {
  ResolverError,
  ResolverWarning,
} from "../reference/reference.types"
import {
  createResolverError,
  DEFAULT_RESOLVER_OPTIONS,
  getNodeByPath,
  isReferenceString,
  isTokenLeaf,
} from "../shared/shared.resolver.utils"
import type {
  ResolvedLeafValue,
  ResolveLeafResult,
  ResolveLeafValuesResult,
  ResolveValuesOptions,
} from "./values.types"
import type { TokenLeaf, TokenTree, TokenValue } from "../../../types"

const mergeValuesOptions = (
  options: ResolveValuesOptions = {},
): Required<ResolveValuesOptions> => {
  return {
    strict: options.strict ?? DEFAULT_RESOLVER_OPTIONS.strict ?? true,
    maxDepth: options.maxDepth ?? DEFAULT_RESOLVER_OPTIONS.maxDepth ?? 50,
    validateTypeCompatibility: options.validateTypeCompatibility ?? false,
  }
}

const toResolvedLeafValue = (
  path: string,
  leaf: TokenLeaf,
  value: TokenValue,
  referenceChain: string[],
): ResolvedLeafValue => {
  return {
    path,
    value,
    referenceChain,
    ...(leaf.$type !== undefined ? { $type: leaf.$type } : {}),
    ...(leaf.$description !== undefined
      ? { $description: leaf.$description }
      : {}),
  }
}

export const resolveLeafValue = (
  tree: TokenTree,
  path: string,
  options: ResolveValuesOptions = {},
): ResolveLeafResult => {
  const errors: ResolverError[] = []
  const warnings: ResolverWarning[] = []
  const node = getNodeByPath(tree, path)

  if (node === undefined) {
    errors.push(
      createResolverError(
        "MISSING_REFERENCE",
        `Missing token at path: "${path}"`,
        path,
        `{${path}}`,
        [],
        path,
      ),
    )

    return {
      resolved: null,
      errors,
      warnings,
    }
  }

  if (!isTokenLeaf(node)) {
    errors.push(
      createResolverError(
        "INVALID_TOKEN_LEAF",
        `Token path "${path}" points to a branch, not a leaf.`,
        path,
        path,
        [],
      ),
    )

    return {
      resolved: null,
      errors,
      warnings,
    }
  }

  const leaf = node
  const sourceValue = leaf.$value

  if (!isReferenceString(sourceValue)) {
    return {
      resolved: toResolvedLeafValue(path, leaf, sourceValue, []),
      errors,
      warnings,
    }
  }

  const resolvedOptions = mergeValuesOptions(options)
  const chainResult = resolveReferenceChain(
    tree,
    sourceValue,
    resolvedOptions,
    path,
  )

  errors.push(...chainResult.errors)
  warnings.push(...chainResult.warnings)

  return {
    resolved: toResolvedLeafValue(
      path,
      leaf,
      chainResult.value,
      chainResult.referenceChain,
    ),
    errors,
    warnings,
  }
}

export const resolveLeafValues = (
  tree: TokenTree,
  paths?: Iterable<string>,
  options: ResolveValuesOptions = {},
): ResolveLeafValuesResult => {
  const targetPaths = paths ?? collectLeafPaths(tree)
  const values: ResolvedLeafValue[] = []
  const errors: ResolverError[] = []
  const warnings: ResolverWarning[] = []

  for (const path of targetPaths) {
    const result = resolveLeafValue(tree, path, options)

    if (result.resolved !== null) {
      values.push(result.resolved)
    }

    errors.push(...result.errors)
    warnings.push(...result.warnings)
  }

  return {
    values,
    errors,
    warnings,
  }
}

export const resolveLeafValueForTheme = (
  input: ThemedTokenTreeSource,
  theme: ThemedTokenTreeOverlay,
  path: string,
  options: ResolveValuesOptions = {},
): ResolveLeafResult => {
  const tree = createThemedTokenTree(input, theme)

  return resolveLeafValue(tree, path, options)
}
