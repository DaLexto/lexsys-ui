/**
 * graph.resolver.ts
 *
 * @layer resolver
 * @description Token graph traversal, reachability, and dependency analysis.
 */

import type { TokenBranch, TokenLeaf, TokenTree } from "../../../types"
import {
  getNodeByPath,
  isReferenceString,
  isTokenLeaf,
  isTokenMetadataKey,
  isTokenTree,
  parseReference,
  toPathString,
} from "../shared/shared.resolver.utils"
import type {
  TokenGraphDependent,
  TokenGraphLayer,
  TokenGraphMetadata,
  TokenGraphReachabilityInput,
  TokenGraphReference,
} from "./graph.types"

const readDeprecated = (
  node: TokenLeaf | TokenBranch,
): boolean | string | undefined => {
  return node.$deprecated
}

const readDescription = (node: TokenLeaf | TokenBranch): string | undefined => {
  const description = node.$description

  return typeof description === "string" ? description : undefined
}

export const collectLeafPaths = (
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

export const collectTokenGraphReferences = (
  tree: TokenTree,
  layer: TokenGraphLayer,
  themeName?: string,
  path: string[] = [],
  references: TokenGraphReference[] = [],
): TokenGraphReference[] => {
  if (isTokenLeaf(tree)) {
    if (isReferenceString(tree.$value)) {
      references.push({
        layer,
        sourcePath: toPathString(path),
        reference: tree.$value,
        targetPath: parseReference(tree.$value),
        themeName,
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
      collectTokenGraphReferences(
        value as TokenTree,
        layer,
        themeName,
        [...path, key],
        references,
      )
    }
  }

  return references
}

export const collectTokenGraphMetadata = (
  tree: TokenTree,
  layer: TokenGraphLayer,
  themeName?: string,
  path: string[] = [],
  metadata: TokenGraphMetadata[] = [],
): TokenGraphMetadata[] => {
  const currentPath = toPathString(path)
  const description = readDescription(tree)
  const deprecated = readDeprecated(tree)

  if (description !== undefined || deprecated !== undefined) {
    metadata.push({
      layer,
      path: currentPath === "" ? layer : currentPath,
      description,
      deprecated,
      themeName,
    })
  }

  if (isTokenLeaf(tree)) {
    return metadata
  }

  if (!isTokenTree(tree)) {
    return metadata
  }

  for (const [key, value] of Object.entries(tree)) {
    if (isTokenMetadataKey(key)) {
      continue
    }

    if (isTokenLeaf(value) || isTokenTree(value)) {
      collectTokenGraphMetadata(
        value as TokenTree,
        layer,
        themeName,
        [...path, key],
        metadata,
      )
    }
  }

  return metadata
}

export const expandReferencedPaths = (
  root: TokenTree,
  targetPath: string,
  visited: Set<string> = new Set(),
): Set<string> => {
  if (visited.has(targetPath)) {
    return new Set()
  }

  visited.add(targetPath)

  const paths = new Set<string>([targetPath])
  const node = getNodeByPath(root, targetPath)

  if (
    node === undefined ||
    !isTokenLeaf(node) ||
    !isReferenceString(node.$value)
  ) {
    return paths
  }

  for (const nestedPath of expandReferencedPaths(
    root,
    parseReference(node.$value),
    visited,
  )) {
    paths.add(nestedPath)
  }

  return paths
}

export const collectUpperLayerReferences = (
  input: TokenGraphReachabilityInput,
): TokenGraphReference[] => {
  const references = [
    ...collectTokenGraphReferences(input.semanticTokens, "semantic"),
    ...collectTokenGraphReferences(input.brandTokens, "brand"),
    ...collectTokenGraphReferences(input.componentTokens, "component"),
  ]

  for (const theme of input.themeTokens) {
    references.push(
      ...collectTokenGraphReferences(theme.tokens, "theme", theme.name),
    )
  }

  return references
}

const pathMatchesTarget = (
  candidatePath: string,
  targetPath: string,
): boolean => {
  return (
    candidatePath === targetPath || candidatePath.startsWith(`${targetPath}.`)
  )
}

export const referenceDependsOnTarget = (
  foundationTokens: TokenTree,
  referenceTargetPath: string,
  targetPath: string,
): boolean => {
  for (const expandedPath of expandReferencedPaths(
    foundationTokens,
    referenceTargetPath,
  )) {
    if (pathMatchesTarget(expandedPath, targetPath)) {
      return true
    }
  }

  return false
}

export const findTransitiveDependents = (
  input: TokenGraphReachabilityInput,
  targetPath: string,
  references: TokenGraphReference[] = collectUpperLayerReferences(input),
): TokenGraphDependent[] => {
  const dependents: TokenGraphDependent[] = []

  for (const reference of references) {
    if (
      !referenceDependsOnTarget(
        input.foundationTokens,
        reference.targetPath,
        targetPath,
      )
    ) {
      continue
    }

    dependents.push({
      layer: reference.layer,
      sourcePath: reference.sourcePath,
      themeName: reference.themeName,
    })
  }

  return dependents.sort((left, right) => {
    return left.sourcePath.localeCompare(right.sourcePath)
  })
}

export const collectUsedPrimitivePaths = (
  input: TokenGraphReachabilityInput,
): Set<string> => {
  const primitivePaths = collectLeafPaths(input.primitiveTokens)
  const usedPrimitivePaths = new Set<string>()

  for (const reference of collectUpperLayerReferences(input)) {
    for (const expandedPath of expandReferencedPaths(
      input.foundationTokens,
      reference.targetPath,
    )) {
      if (primitivePaths.has(expandedPath)) {
        usedPrimitivePaths.add(expandedPath)
      }
    }
  }

  return usedPrimitivePaths
}

export const stripDeadPrimitivesFromTree = (
  tree: TokenTree,
  usedPaths: Set<string>,
  path: string[] = [],
): TokenTree => {
  if (isTokenLeaf(tree)) {
    return usedPaths.has(toPathString(path)) ? tree : {}
  }

  if (!isTokenTree(tree)) {
    return {}
  }

  const result: TokenTree = {}

  for (const [key, value] of Object.entries(tree)) {
    if (isTokenMetadataKey(key)) {
      result[key] = value
      continue
    }

    if (!isTokenLeaf(value) && !isTokenTree(value)) {
      continue
    }

    const child = stripDeadPrimitivesFromTree(
      value as TokenTree,
      usedPaths,
      [...path, key],
    )

    if (isTokenLeaf(child) || Object.keys(child).length > 0) {
      result[key] = child
    }
  }

  return result
}
