/**
 * reference.resolver.ts
 *
 * @layer resolver
 * @description Token reference resolver for Neurex token trees.
 */

import type {
  ResolveReferenceResult,
  ResolveTreeResult,
  ResolverError,
  ResolverOptions,
  ResolverWarning,
} from "./reference.types"
import { resolveReferenceChain } from "./reference-chain"
import { resolveLeafValue } from "../values/values.resolver"
import {
  createResolverError,
  DEFAULT_RESOLVER_OPTIONS,
  isReferenceString,
  isTokenLeaf,
  isTokenMetadataKey,
  isTokenTree,
  toPathString,
} from "../shared/shared.resolver.utils"
import type {
  TokenLeaf,
  TokenNode,
  TokenTree,
  TokenValue,
} from "../../../types"

const cloneLeafWithValue = (leaf: TokenLeaf, value: TokenValue): TokenLeaf => {
  return {
    ...leaf,
    $value: value,
  }
}

export const resolveReference = (
  root: TokenTree,
  reference: string,
  options: ResolverOptions = {},
  sourcePath = "",
  chain: string[] = [],
): ResolveReferenceResult => {
  const result = resolveReferenceChain(
    root,
    reference,
    options,
    sourcePath,
    chain,
  )

  return {
    value: result.value,
    errors: result.errors,
    warnings: result.warnings,
  }
}

const resolveNode = (
  root: TokenTree,
  node: TokenNode,
  path: string[],
  options: ResolverOptions,
): {
  node: TokenNode
  errors: ResolverError[]
  warnings: ResolverWarning[]
} => {
  const errors: ResolverError[] = []
  const warnings: ResolverWarning[] = []

  if (isTokenLeaf(node)) {
    const sourcePath = toPathString(path)

    if (!isReferenceString(node.$value)) {
      return {
        node,
        errors,
        warnings,
      }
    }

    const leafResult = resolveLeafValue(root, sourcePath, options)

    return {
      node: cloneLeafWithValue(node, leafResult.resolved?.value ?? node.$value),
      errors: leafResult.errors,
      warnings: leafResult.warnings,
    }
  }

  if (isTokenTree(node)) {
    const resolvedTree: TokenTree = {}

    for (const [key, value] of Object.entries(node)) {
      if (isTokenMetadataKey(key)) {
        resolvedTree[key] = value
        continue
      }

      if (!isTokenLeaf(value) && !isTokenTree(value)) {
        errors.push(
          createResolverError(
            "INVALID_TOKEN_LEAF",
            `Invalid token node at "${toPathString([...path, key])}". Expected a token leaf or token branch.`,
            toPathString([...path, key]),
            String(value),
            [],
          ),
        )

        continue
      }

      const childResult = resolveNode(root, value, [...path, key], options)

      resolvedTree[key] = childResult.node
      errors.push(...childResult.errors)
      warnings.push(...childResult.warnings)
    }

    return {
      node: resolvedTree,
      errors,
      warnings,
    }
  }

  errors.push(
    createResolverError(
      "INVALID_TOKEN_LEAF",
      `Invalid token node at "${toPathString(path)}". Expected a token leaf or token branch.`,
      toPathString(path),
      String(node),
      [],
    ),
  )

  return {
    node,
    errors,
    warnings,
  }
}

const mergeOptions = (
  options: ResolverOptions = {},
): Required<ResolverOptions> => {
  return {
    strict: options.strict ?? DEFAULT_RESOLVER_OPTIONS.strict ?? true,
    maxDepth: options.maxDepth ?? DEFAULT_RESOLVER_OPTIONS.maxDepth ?? 50,
  }
}

export const resolveTokenTree = (
  root: TokenTree,
  options: ResolverOptions = {},
): ResolveTreeResult => {
  const result = resolveNode(root, root, [], mergeOptions(options))

  return {
    tree: result.node as TokenTree,
    errors: result.errors,
    warnings: result.warnings,
  }
}

export const resolveTokenTreeStrict = (root: TokenTree): TokenTree => {
  const result = resolveTokenTree(root, {
    strict: true,
  })

  if (result.errors.length > 0) {
    const [firstError] = result.errors

    throw new Error(firstError?.message ?? "Token resolution failed.")
  }

  return result.tree
}

export const resolveTokenTreeSafe = (
  root: TokenTree,
  options: ResolverOptions = {},
): ResolveTreeResult => {
  return resolveTokenTree(root, {
    ...options,
    strict: false,
  })
}
