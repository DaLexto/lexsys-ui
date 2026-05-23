/**
 * reference-chain.ts
 *
 * @layer resolver
 * @description Shared alias-chain resolution with hop tracking for values pipeline reuse.
 */

import type {
  ResolveReferenceChainResult,
  ResolverOptions,
} from "./reference.types"
import {
  createResolverError,
  createResolverWarning,
  DEFAULT_RESOLVER_OPTIONS,
  getDefaultLeafFromBranch,
  getNodeByPath,
  isReferenceString,
  isTokenLeaf,
  parseReference,
} from "../shared/shared.resolver.utils"
import type { TokenTree } from "../../../types"

const mergeOptions = (
  options: ResolverOptions = {},
): Required<ResolverOptions> => {
  return {
    strict: options.strict ?? DEFAULT_RESOLVER_OPTIONS.strict ?? true,
    maxDepth: options.maxDepth ?? DEFAULT_RESOLVER_OPTIONS.maxDepth ?? 50,
  }
}

export const resolveReferenceChain = (
  root: TokenTree,
  reference: string,
  options: ResolverOptions = {},
  sourcePath = "",
  chain: string[] = [],
): ResolveReferenceChainResult => {
  const originalReference = reference
  const resolvedOptions = mergeOptions(options)
  const warnings: ResolveReferenceChainResult["warnings"] = []
  const errors: ResolveReferenceChainResult["errors"] = []

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
      referenceChain: chain,
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
      referenceChain: [...chain, targetPath],
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
      referenceChain: chain,
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
      referenceChain: chain,
    }
  }

  const targetLeaf = isTokenLeaf(targetNode)
    ? targetNode
    : getDefaultLeafFromBranch(targetNode)

  if (targetLeaf === undefined) {
    errors.push(
      createResolverError(
        "REFERENCE_POINTS_TO_BRANCH",
        `Token reference "${reference}" points to a branch without a DEFAULT token leaf.`,
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
      referenceChain: chain,
    }
  }

  const targetValue = targetLeaf.$value

  if (!isReferenceString(targetValue)) {
    return {
      value: targetValue,
      errors,
      warnings,
      referenceChain: [...chain, targetPath],
    }
  }

  const nestedResult = resolveReferenceChain(
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
    referenceChain: nestedResult.referenceChain,
  }
}
