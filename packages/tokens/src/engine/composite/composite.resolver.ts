/**
 * composite.resolver.ts
 *
 * @layer composite
 * @description Detect, normalize, and classify composite token branches.
 */

import type { CompositeTokenType, TokenTree } from "../../types"
import {
  isTokenLeaf,
  isTokenMetadataKey,
  isTokenTree,
  toPathString,
} from "../resolver/shared/shared.resolver.utils"

import {
  COMPOSITE_TYPE_REGISTRY,
  isImplementedCompositeType,
  isTypographySlotKey,
  TYPOGRAPHY_COMPOSITE_DEFINITION,
} from "./composite.schema"

import type {
  CompositeAtomicPath,
  CompositeBranchInfo,
} from "./composite.types"

const AUTHORING_METADATA_KEYS = new Set([
  "name",
  "component",
  "selector",
  "colorScheme",
])

const getNonMetadataChildEntries = (
  branch: TokenTree,
): Array<[string, unknown]> => {
  return Object.entries(branch).filter(([key]) => {
    return !isTokenMetadataKey(key) && !AUTHORING_METADATA_KEYS.has(key)
  })
}

const hasTypographySlotLeaves = (branch: TokenTree): boolean => {
  const childEntries = getNonMetadataChildEntries(branch)

  if (childEntries.length === 0) {
    return false
  }

  return childEntries.every(([key, value]) => {
    return isTypographySlotKey(key) && isTokenLeaf(value)
  })
}

const isTypographyRoleGroup = (branch: TokenTree): boolean => {
  const childEntries = getNonMetadataChildEntries(branch)

  if (childEntries.length === 0) {
    return false
  }

  return childEntries.every(([, value]) => {
    return isTokenTree(value) && hasTypographySlotLeaves(value)
  })
}

const readBranchCompositeType = (
  branch: TokenTree,
): CompositeTokenType | undefined => {
  const branchType = branch.$type

  if (
    typeof branchType === "string" &&
    isImplementedCompositeType(branchType)
  ) {
    return branchType
  }

  if (isTypographyRoleGroup(branch)) {
    return TYPOGRAPHY_COMPOSITE_DEFINITION.compositeType
  }

  return undefined
}

export const isCompositeBranch = (
  branch: unknown,
  path: string[] = [],
): branch is TokenTree => {
  if (!isTokenTree(branch)) {
    return false
  }

  return getCompositeBranchInfo(branch, path) !== undefined
}

export const getCompositeBranchInfo = (
  branch: TokenTree,
  path: string[] = [],
): CompositeBranchInfo | undefined => {
  const compositeType = readBranchCompositeType(branch)

  if (compositeType === undefined) {
    return undefined
  }

  return {
    compositeType,
    path,
  }
}

export const normalizeCompositeBranches = (tree: TokenTree): TokenTree => {
  if (isTokenLeaf(tree)) {
    return tree
  }

  const compositeType = readBranchCompositeType(tree)

  if (compositeType !== undefined) {
    return {
      ...tree,
      $type: compositeType,
    }
  }

  const normalizedTree: TokenTree = { ...tree }

  for (const [key, value] of getNonMetadataChildEntries(tree)) {
    if (isTokenTree(value)) {
      normalizedTree[key] = normalizeCompositeBranches(value)
      continue
    }

    if (isTokenLeaf(value)) {
      normalizedTree[key] = value
    }
  }

  return normalizedTree
}

const collectCompositeAtomicPathsFromBranch = (
  branch: TokenTree,
  path: string[],
  compositeType: CompositeTokenType,
  paths: CompositeAtomicPath[],
): void => {
  const definition = COMPOSITE_TYPE_REGISTRY[compositeType]

  if (definition === undefined) {
    return
  }

  const slotKeys = new Set(
    definition.slots.map((slot) => {
      return slot.slotKey
    }),
  )

  for (const [key, value] of getNonMetadataChildEntries(branch)) {
    const childPath = [...path, key]

    if (isTokenLeaf(value) && slotKeys.has(key)) {
      paths.push({
        compositeType,
        path: toPathString(childPath),
      })
      continue
    }

    if (isTokenTree(value)) {
      collectCompositeAtomicPathsFromBranch(
        value,
        childPath,
        compositeType,
        paths,
      )
    }
  }
}

export const collectCompositeAtomicPaths = (
  tree: TokenTree,
  path: string[] = [],
): CompositeAtomicPath[] => {
  const paths: CompositeAtomicPath[] = []

  const walk = (node: TokenTree, currentPath: string[]): void => {
    const compositeInfo = getCompositeBranchInfo(node, currentPath)

    if (compositeInfo !== undefined) {
      collectCompositeAtomicPathsFromBranch(
        node,
        currentPath,
        compositeInfo.compositeType,
        paths,
      )
      return
    }

    for (const [key, value] of getNonMetadataChildEntries(node)) {
      if (isTokenTree(value)) {
        walk(value, [...currentPath, key])
      }
    }
  }

  walk(tree, path)

  return paths
}
