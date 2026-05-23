/**
 * report.governance.ts
 *
 * @layer governance
 * @description Builds deprecation, metadata, and dead-token governance reports.
 */

import {
  collectLeafPaths,
  collectTokenGraphMetadata,
  collectUsedPrimitivePaths,
  findTransitiveDependents,
} from "../../resolver"
import type {
  DeadTokenEntry,
  DeprecationDependency,
  DeprecationReportEntry,
  TokenGovernanceInput,
  TokenGovernanceReport,
  TokenMetadataEntry,
} from "../shared/shared.governance.types"
import type { TokenGraphMetadata } from "../../resolver/graph/graph.types"

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

const mapDependents = (
  input: TokenGovernanceInput,
  targetPath: string,
): DeprecationDependency[] => {
  return findTransitiveDependents(input, targetPath).map(
    (dependent): DeprecationDependency => {
      return {
        layer: dependent.layer,
        sourcePath: dependent.sourcePath,
        themeName: dependent.themeName,
      }
    },
  )
}

const createMetadataEntries = (
  input: TokenGovernanceInput,
  metadata: TokenGraphMetadata[],
): TokenMetadataEntry[] => {
  return metadata
    .filter((entry) => {
      return entry.description !== undefined || entry.deprecated !== undefined
    })
    .map((entry) => {
      const dependents = mapDependents(input, entry.path)

      return {
        path: entry.path,
        layer: entry.layer,
        themeName: entry.themeName,
        description: entry.description,
        deprecated: entry.deprecated,
        ...(dependents.length > 0 ? { dependents } : {}),
      }
    })
    .sort((left, right) => {
      return left.path.localeCompare(right.path)
    })
}

const createDeprecationReport = (
  input: TokenGovernanceInput,
  metadata: TokenGraphMetadata[],
): DeprecationReportEntry[] => {
  const deprecatedEntries = metadata.filter((entry) => {
    return entry.deprecated !== undefined
  })

  return deprecatedEntries
    .map((entry) => {
      return {
        path: entry.path,
        layer: entry.layer,
        themeName: entry.themeName,
        deprecated: entry.deprecated ?? true,
        dependents: mapDependents(input, entry.path),
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
  const usedPrimitivePaths = collectUsedPrimitivePaths(input)

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

  return {
    metadata: createMetadataEntries(input, metadata),
    deprecations: createDeprecationReport(input, metadata),
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

  const metadataWithDependents = report.metadata.filter((entry) => {
    return (entry.dependents?.length ?? 0) > 0
  })

  if (metadataWithDependents.length > 0) {
    lines.push("", "Metadata with transitive dependents:")

    for (const entry of metadataWithDependents.slice(0, 20)) {
      lines.push(
        `- ${entry.path} (${entry.dependents?.length ?? 0} transitive dependent(s))`,
      )
    }

    if (metadataWithDependents.length > 20) {
      lines.push(`- ... and ${metadataWithDependents.length - 20} more`)
    }
  }

  if (report.deprecations.length > 0) {
    lines.push("", "Deprecated tokens:")

    for (const entry of report.deprecations) {
      lines.push(
        `- ${entry.path} (${entry.dependents.length} transitive dependent(s))`,
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
