/**
 * resolver.ts
 *
 * @layer resolver
 * @description Token reference resolver for Neurex token trees.
 *
 * @responsibility
 * - Resolve strict full-string token references
 * - Preserve the Neurex { value } token leaf shape
 * - Report missing, invalid, circular, and branch references
 *
 * @notes
 * - This resolver is output-agnostic.
 * - It does not generate CSS variables.
 * - It does not know about Tailwind or output naming.
 */

import type {
  ResolveReferenceResult,
  ResolveTreeResult,
  ResolverError,
  ResolverOptions,
  ResolverWarning,
} from "./resolver.types"

import {
  createResolverError,
  createResolverWarning,
  DEFAULT_RESOLVER_OPTIONS,
  getNodeByPath,
  isReferenceString,
  isTokenLeaf,
  isTokenTree,
  parseReference,
  toPathString,
} from "./resolver.utils"

import type {
  TokenLeaf,
  TokenNode,
  TokenPrimitive,
  TokenTree,
} from "../types/index.js"

/* -------------------------------------------------------------------------------------------------
 * Internal helpers
 * ------------------------------------------------------------------------------------------------- */

const mergeOptions = (
  options: ResolverOptions = {},
): Required<ResolverOptions> => {
  return {
    strict: options.strict ?? DEFAULT_RESOLVER_OPTIONS.strict ?? true,
    maxDepth: options.maxDepth ?? DEFAULT_RESOLVER_OPTIONS.maxDepth ?? 50,
  }
}

const cloneLeafWithValue = (
  leaf: TokenLeaf,
  value: TokenPrimitive,
): TokenLeaf => {
  return {
    ...leaf,
    value,
  }
}

/* -------------------------------------------------------------------------------------------------
 * Reference resolver
 * ------------------------------------------------------------------------------------------------- */

export const resolveReference = (
  root: TokenTree,
  reference: string,
  options: ResolverOptions = {},
  sourcePath = "",
  chain: string[] = [],
): ResolveReferenceResult => {
  const originalReference = reference
  const resolvedOptions = mergeOptions(options)
  const warnings: ResolverWarning[] = []
  const errors: ResolverError[] = []

  if (!isReferenceString(reference)) {
    errors.push(
      createResolverError(
        "INVALID_REFERENCE_FORMAT",
        `Invalid token reference format: "${originalReference}"`,
        sourcePath,
        originalReference,
        chain,
      ),
    )

    return {
      value: originalReference,
      errors,
      warnings,
    }
  }

  const targetPath = parseReference(reference)

  if (chain.includes(targetPath)) {
    errors.push(
      createResolverError(
        "CIRCULAR_REFERENCE",
        `Circular token reference detected: ${[...chain, targetPath].join(" -> ")}`,
        sourcePath,
        reference,
        [...chain, targetPath],
        targetPath,
      ),
    )

    return {
      value: reference,
      errors,
      warnings,
    }
  }

  if (chain.length >= resolvedOptions.maxDepth) {
    errors.push(
      createResolverError(
        "MAX_DEPTH_EXCEEDED",
        `Maximum token reference depth exceeded while resolving "${reference}"`,
        sourcePath,
        reference,
        chain,
        targetPath,
      ),
    )

    return {
      value: reference,
      errors,
      warnings,
    }
  }

  const targetNode = getNodeByPath(root, targetPath)

  if (targetNode === undefined) {
    if (resolvedOptions.strict) {
      errors.push(
        createResolverError(
          "MISSING_REFERENCE",
          `Missing token reference target: "${targetPath}"`,
          sourcePath,
          reference,
          chain,
          targetPath,
        ),
      )
    } else {
      warnings.push(createResolverWarning(sourcePath, reference))
    }

    return {
      value: reference,
      errors,
      warnings,
    }
  }

  if (!isTokenLeaf(targetNode)) {
    errors.push(
      createResolverError(
        "REFERENCE_POINTS_TO_BRANCH",
        `Token reference "${reference}" points to a branch, not a token leaf.`,
        sourcePath,
        reference,
        chain,
        targetPath,
      ),
    )

    return {
      value: reference,
      errors,
      warnings,
    }
  }

  const targetValue = targetNode.value

  if (!isReferenceString(targetValue)) {
    return {
      value: targetValue,
      errors,
      warnings,
    }
  }

  const nestedResult = resolveReference(
    root,
    targetValue,
    resolvedOptions,
    targetPath,
    [...chain, targetPath],
  )

  return {
    value: nestedResult.value,
    errors: [...errors, ...nestedResult.errors],
    warnings: [...warnings, ...nestedResult.warnings],
  }
}

/* -------------------------------------------------------------------------------------------------
 * Tree resolver
 * ------------------------------------------------------------------------------------------------- */

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

    if (!isReferenceString(node.value)) {
      return {
        node,
        errors,
        warnings,
      }
    }

    const result = resolveReference(root, node.value, options, sourcePath)

    return {
      node: cloneLeafWithValue(node, result.value),
      errors: result.errors,
      warnings: result.warnings,
    }
  }

  if (isTokenTree(node)) {
    const resolvedTree: TokenTree = {}

    for (const [key, value] of Object.entries(node)) {
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
