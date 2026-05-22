/**
 * graph.resolver.ts
 *
 * @layer resolver
 * @description Token graph traversal, reachability, and dependency analysis.
 */

import type { TokenBranch, TokenLeaf, TokenTree } from "../../../types"
import {
  collectLeafPaths,
  collectReferenceUsages,
  walkTokenTree,
} from "../../shared/tree.utils"
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

export { collectLeafPaths } from "../../shared/tree.utils"

const readDeprecated = (
  node: TokenLeaf | TokenBranch,
): boolean | string | undefined => {
  return node.$deprecated
}

const readDescription = (node: TokenLeaf | TokenBranch): string | undefined => {
  const description = node.$description

  return typeof description === "string" ? description : undefined
}

export const collectTokenGraphReferences = (
  tree: TokenTree,
  layer: TokenGraphLayer,
  themeName?: string,
  path: string[] = [],
  references: TokenGraphReference[] = [],
): TokenGraphReference[] => {
  for (const usage of collectReferenceUsages(tree, path)) {
    references.push({
      layer,
      sourcePath: usage.sourcePath,
      reference: usage.reference,
      targetPath: usage.targetPath,
      themeName,
    })
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
  walkTokenTree(
    tree,
    {
      onNode: (node, nodePath) => {
        const currentPath = toPathString(nodePath)
        const description = readDescription(node)
        const deprecated = readDeprecated(node)

        if (description === undefined && deprecated === undefined) {
          return
        }

        metadata.push({
          layer,
          path: currentPath === "" ? layer : currentPath,
          description,
          deprecated,
          themeName,
        })
      },
    },
    path,
  )

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
