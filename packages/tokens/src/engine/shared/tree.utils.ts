/**
 * tree.utils.ts
 *
 * @layer engine
 * @description Shared token tree merge and traversal helpers.
 */

import type { TokenLeaf, TokenTree } from "../../types"
import {
  isReferenceString,
  isTokenLeaf,
  isTokenTree,
  parseReference,
  toPathString,
} from "../resolver/shared/shared.resolver.utils"
import { shouldSkipTokenTreeKey } from "./metadata-keys"

export interface WalkTokenTreeOptions {
  onNode?: (node: TokenTree | TokenLeaf, path: string[]) => void
  includeAuthoringKeys?: boolean
}

export interface TokenReferenceUsage {
  reference: string
  sourcePath: string
  targetPath: string
}

export interface ThemedTokenTreeSource {
  foundationTokens: TokenTree
  componentTokens: TokenTree
}

export interface ThemedTokenTreeOverlay {
  tokens: TokenTree
}

export const walkTokenTree = (
  tree: TokenTree,
  options: WalkTokenTreeOptions,
  path: string[] = [],
): void => {
  options.onNode?.(tree, path)

  if (isTokenLeaf(tree)) {
    return
  }

  if (!isTokenTree(tree)) {
    return
  }

  for (const [key, value] of Object.entries(tree)) {
    if (
      shouldSkipTokenTreeKey(key, {
        includeAuthoringKeys: options.includeAuthoringKeys,
      })
    ) {
      continue
    }

    if (isTokenLeaf(value) || isTokenTree(value)) {
      walkTokenTree(value as TokenTree, options, [...path, key])
    }
  }
}

export const collectLeafPaths = (
  tree: TokenTree,
  path: string[] = [],
  paths: Set<string> = new Set(),
): Set<string> => {
  walkTokenTree(
    tree,
    {
      onNode: (node, nodePath) => {
        if (isTokenLeaf(node)) {
          paths.add(toPathString(nodePath))
        }
      },
    },
    path,
  )

  return paths
}

export const collectReferenceUsages = (
  tree: TokenTree,
  path: string[] = [],
  usages: TokenReferenceUsage[] = [],
): TokenReferenceUsage[] => {
  walkTokenTree(
    tree,
    {
      onNode: (node, nodePath) => {
        if (!isTokenLeaf(node) || !isReferenceString(node.$value)) {
          return
        }

        usages.push({
          reference: node.$value,
          sourcePath: toPathString(nodePath),
          targetPath: parseReference(node.$value),
        })
      },
    },
    path,
  )

  return usages
}

export const mergeTokenTrees = (...trees: TokenTree[]): TokenTree => {
  const merged: TokenTree = {}

  for (const tree of trees) {
    for (const [key, value] of Object.entries(tree)) {
      const existingValue = merged[key]

      if (isTokenTree(existingValue) && isTokenTree(value)) {
        merged[key] = mergeTokenTrees(existingValue, value)
        continue
      }

      merged[key] = value
    }
  }

  return merged
}

export const createThemedTokenTree = (
  input: ThemedTokenTreeSource,
  theme: ThemedTokenTreeOverlay,
): TokenTree => {
  return mergeTokenTrees(
    input.foundationTokens,
    theme.tokens,
    input.componentTokens,
  )
}
