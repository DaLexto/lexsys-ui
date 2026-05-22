/**
 * create-governance-report.ts
 *
 * @layer governance
 * @description Builds deprecation, metadata, and dead-token governance reports.
 */

import {
  getNodeByPath,
  isReferenceString,
  isTokenLeaf,
  parseReference,
} from "../resolver/resolver.utils"
import type {
  DeadTokenEntry,
  DeprecationDependency,
  DeprecationReportEntry,
  TokenGovernanceInput,
  TokenGovernanceReport,
  TokenMetadataEntry,
} from "./governance.types"
import {
  collectLeafPaths,
  collectTokenGraphMetadata,
  collectTokenGraphReferences,
  pathMatchesDeprecatedTarget,
  type TokenGraphMetadata,
  type TokenGraphReference,
} from "./token-graph.utils"

const expandReferencedPaths = (
  root: TokenGovernanceInput["foundationTokens"],
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

const collectReferences = (
  input: TokenGovernanceInput,
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

const collectMetadata = (input: TokenGovernanceInput): TokenGraphMetadata[] => {
  const metadata = [
    ...collectTokenGraphMetadata(input.primitiveTokens, "primitive"),
    ...collectTokenGraphMetadata(input.brandTokens, "brand"),
    ...collectTokenGraphMetadata(input.semanticTokens, "semantic"),
    ...collectTokenGraphMetadata(input.componentTokens, "component"),
  ]

  for (const theme of input.themeTokens) {
    metadata.push(
      ...collectTokenGraphMetadata(theme.tokens, "theme", theme.name),
    )
  }

  return metadata
}

const createMetadataEntries = (
  metadata: TokenGraphMetadata[],
): TokenMetadataEntry[] => {
  return metadata
    .filter((entry) => {
      return entry.description !== undefined || entry.deprecated !== undefined
    })
    .map((entry) => {
      return {
        path: entry.path,
        layer: entry.layer,
        themeName: entry.themeName,
        description: entry.description,
        deprecated: entry.deprecated,
      }
    })
    .sort((left, right) => {
      return left.path.localeCompare(right.path)
    })
}

const createDeprecationReport = (
  metadata: TokenGraphMetadata[],
  references: TokenGraphReference[],
): DeprecationReportEntry[] => {
  const deprecatedEntries = metadata.filter((entry) => {
    return entry.deprecated !== undefined
  })

  return deprecatedEntries
    .map((entry) => {
      const dependents = references
        .filter((reference) => {
          return pathMatchesDeprecatedTarget(reference.targetPath, entry.path)
        })
        .map((reference): DeprecationDependency => {
          return {
            layer: reference.layer,
            sourcePath: reference.sourcePath,
            themeName: reference.themeName,
          }
        })
        .sort((left, right) => {
          return left.sourcePath.localeCompare(right.sourcePath)
        })

      return {
        path: entry.path,
        layer: entry.layer,
        themeName: entry.themeName,
        deprecated: entry.deprecated ?? true,
        dependents,
      }
    })
    .sort((left, right) => {
      return left.path.localeCompare(right.path)
    })
}

const createDeadTokenReport = (
  input: TokenGovernanceInput,
): DeadTokenEntry[] => {
  const primitivePaths = collectLeafPaths(input.primitiveTokens)
  const usedPrimitivePaths = new Set<string>()

  for (const reference of collectReferences(input)) {
    for (const expandedPath of expandReferencedPaths(
      input.foundationTokens,
      reference.targetPath,
    )) {
      if (primitivePaths.has(expandedPath)) {
        usedPrimitivePaths.add(expandedPath)
      }
    }
  }

  return [...primitivePaths]
    .filter((path) => {
      return !usedPrimitivePaths.has(path)
    })
    .sort((left, right) => {
      return left.localeCompare(right)
    })
    .map((path) => {
      return { path }
    })
}

export const createTokenGovernanceReport = (
  input: TokenGovernanceInput,
): TokenGovernanceReport => {
  const metadata = collectMetadata(input)
  const references = collectReferences(input)

  return {
    metadata: createMetadataEntries(metadata),
    deprecations: createDeprecationReport(metadata, references),
    deadTokens: createDeadTokenReport(input),
  }
}

export const formatTokenGovernanceReport = (
  report: TokenGovernanceReport,
): string => {
  const lines = [
    "Token Governance Report",
    `- Metadata entries: ${report.metadata.length}`,
    `- Deprecated tokens: ${report.deprecations.length}`,
    `- Dead primitive tokens: ${report.deadTokens.length}`,
  ]

  if (report.deprecations.length > 0) {
    lines.push("", "Deprecated tokens:")

    for (const entry of report.deprecations) {
      lines.push(
        `- ${entry.path} (${entry.dependents.length} dependent reference(s))`,
      )
    }
  }

  if (report.deadTokens.length > 0) {
    lines.push("", "Dead primitive tokens:")

    for (const entry of report.deadTokens.slice(0, 20)) {
      lines.push(`- ${entry.path}`)
    }

    if (report.deadTokens.length > 20) {
      lines.push(`- ... and ${report.deadTokens.length - 20} more`)
    }
  }

  return lines.join("\n")
}
