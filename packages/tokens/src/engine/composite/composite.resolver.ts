/**
 * composite.resolver.ts
 *
 * @layer composite
 * @description Detect, normalize, and classify composite token branches.
 */

import type { CompositeTokenType, TokenTree } from "../../types"
import { shouldSkipTokenTreeKey } from "../shared/metadata-keys"
import {
  isTokenLeaf,
  isTokenTree,
  toPathString,
} from "../resolver/shared/shared.resolver.utils"

import {
  COMPOSITE_TYPE_REGISTRY,
  IMPLEMENTED_COMPOSITE_TYPES,
  isImplementedCompositeType,
  isRegisteredCompositeSlotKey,
} from "./composite.schema"

import type {
  CompositeAtomicPath,
  CompositeBranchInfo,
  CompositeTypeDefinition,
} from "./composite.types"

const getNonMetadataChildEntries = (
  branch: TokenTree,
): Array<[string, unknown]> => {
  return Object.entries(branch).filter(([key]) => {
    return !shouldSkipTokenTreeKey(key, { includeAuthoringKeys: true })
  })
}

const hasCompositeSlotLeaves = (
  branch: TokenTree,
  definition: CompositeTypeDefinition,
): boolean => {
  for (const slot of definition.slots) {
    const value = branch[slot.slotKey]

    if (!isTokenLeaf(value)) {
      return false
    }
  }

  return getNonMetadataChildEntries(branch).every(([, value]) => {
    return isTokenLeaf(value)
  })
}

const isCompositeRoleGroup = (
  branch: TokenTree,
  compositeType: CompositeTokenType,
): boolean => {
  const definition = COMPOSITE_TYPE_REGISTRY[compositeType]

  if (definition === undefined) {
    return false
  }

  const childEntries = getNonMetadataChildEntries(branch)

  if (childEntries.length === 0) {
    return false
  }

  return childEntries.every(([, value]) => {
    return isTokenTree(value) && hasCompositeSlotLeaves(value, definition)
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

  for (const compositeType of IMPLEMENTED_COMPOSITE_TYPES) {
    const definition = COMPOSITE_TYPE_REGISTRY[compositeType]

    if (definition === undefined) {
      continue
    }

    if (hasCompositeSlotLeaves(branch, definition)) {
      return compositeType
    }

    if (isCompositeRoleGroup(branch, compositeType)) {
      return compositeType
    }
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

  if (hasCompositeSlotLeaves(branch, definition)) {
    for (const slot of definition.slots) {
      paths.push({
        compositeType,
        path: toPathString([...path, slot.slotKey]),
      })
    }

    return
  }

  for (const [key, value] of getNonMetadataChildEntries(branch)) {
    if (isTokenTree(value)) {
      collectCompositeAtomicPathsFromBranch(
        value,
        [...path, key],
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

export const resolveCompositeTypeFromAtomicPath = (
  path: string[],
): CompositeTokenType | undefined => {
  const slotKey = path[path.length - 1]

  if (slotKey === undefined) {
    return undefined
  }

  for (const compositeType of IMPLEMENTED_COMPOSITE_TYPES) {
    if (!isRegisteredCompositeSlotKey(compositeType, slotKey)) {
      continue
    }

    if (compositeType === "typography" && path.includes("typography")) {
      return compositeType
    }

    if (compositeType === "shadow" && path.includes("shadow")) {
      return compositeType
    }

    if (
      compositeType === "border" &&
      path.includes("border") &&
      path.length >= 3
    ) {
      return compositeType
    }
  }

  return undefined
}
