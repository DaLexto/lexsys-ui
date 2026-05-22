/**
 * token-graph.utils.ts
 *
 * @layer governance
 * @description Shared token tree traversal helpers for governance reports.
 */

import type { TokenBranch, TokenLeaf, TokenTree } from "../types"
import {
  isReferenceString,
  isTokenLeaf,
  isTokenMetadataKey,
  isTokenTree,
  parseReference,
  toPathString,
} from "../resolver/resolver.utils"
import type { TokenGovernanceLayer } from "./governance.types"

export interface TokenGraphReference {
  layer: TokenGovernanceLayer
  sourcePath: string
  reference: string
  targetPath: string
  themeName?: string
}

export interface TokenGraphMetadata {
  layer: TokenGovernanceLayer
  path: string
  description?: string
  deprecated?: boolean | string
  themeName?: string
}

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
  layer: TokenGovernanceLayer,
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
  layer: TokenGovernanceLayer,
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

export const pathMatchesDeprecatedTarget = (
  targetPath: string,
  deprecatedPath: string,
): boolean => {
  return (
    targetPath === deprecatedPath || targetPath.startsWith(`${deprecatedPath}.`)
  )
}
