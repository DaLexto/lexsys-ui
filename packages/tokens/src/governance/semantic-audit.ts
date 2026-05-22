/**
 * semantic-audit.ts
 *
 * @layer governance
 * @description Audits semantic token organization: unused paths, component-intent names, theme alignment.
 */

import {
  getNodeByPath,
  isReferenceString,
  isTokenLeaf,
  isTokenTree,
  parseReference,
} from "../resolver/resolver.utils"
import type { TokenTree } from "../types"
import type { TokenGovernanceInput } from "./governance.types"
import type {
  SemanticAuditIssue,
  SemanticAuditReport,
} from "./semantic-audit.types"
import {
  collectLeafPaths,
  collectTokenGraphReferences,
} from "./token-graph.utils"

const SEMANTIC_COMPONENT_INTENT_BRANCHES: Record<string, readonly string[]> = {
  size: ["dialog", "drawer", "popover", "badge", "switch", "textarea", "toast"],
}

const THEME_NESTED_MISALIGNED_GROUPS = ["border", "action"] as const

const expandReferencedSemanticPaths = (
  foundationTokens: TokenTree,
  targetPath: string,
  visited: Set<string> = new Set(),
): Set<string> => {
  if (visited.has(targetPath)) {
    return new Set()
  }

  visited.add(targetPath)

  const paths = new Set<string>()
  const node = getNodeByPath(foundationTokens, targetPath)

  if (node === undefined) {
    return paths
  }

  if (isTokenLeaf(node)) {
    paths.add(targetPath)

    if (isReferenceString(node.$value)) {
      for (const nestedPath of expandReferencedSemanticPaths(
        foundationTokens,
        parseReference(node.$value),
        visited,
      )) {
        paths.add(nestedPath)
      }
    }

    return paths
  }

  for (const leafPath of collectLeafPaths(node, targetPath.split("."))) {
    paths.add(leafPath)
  }

  return paths
}

const collectReferencedSemanticPaths = (
  input: TokenGovernanceInput,
): Set<string> => {
  const referencedPaths = new Set<string>()
  const references = [
    ...collectTokenGraphReferences(input.semanticTokens, "semantic"),
    ...collectTokenGraphReferences(input.componentTokens, "component"),
  ]

  for (const theme of input.themeTokens) {
    references.push(
      ...collectTokenGraphReferences(theme.tokens, "theme", theme.name),
    )
  }

  for (const reference of references) {
    for (const expandedPath of expandReferencedSemanticPaths(
      input.foundationTokens,
      reference.targetPath,
    )) {
      if (getNodeByPath(input.semanticTokens, expandedPath) !== undefined) {
        referencedPaths.add(expandedPath)
      }
    }
  }

  return referencedPaths
}

const collectUnusedSemanticIssues = (
  semanticPaths: Set<string>,
  referencedSemanticPaths: Set<string>,
): SemanticAuditIssue[] => {
  return [...semanticPaths]
    .filter((path) => {
      return !referencedSemanticPaths.has(path)
    })
    .sort((left, right) => {
      return left.localeCompare(right)
    })
    .map((path) => {
      return {
        kind: "unused-semantic" as const,
        path,
        message: `Semantic token "${path}" is not referenced by components, themes, or other semantics.`,
      }
    })
}

const collectComponentIntentIssues = (
  semanticTokens: TokenTree,
): SemanticAuditIssue[] => {
  const issues: SemanticAuditIssue[] = []

  for (const [groupName, branchNames] of Object.entries(
    SEMANTIC_COMPONENT_INTENT_BRANCHES,
  )) {
    const groupTree = semanticTokens[groupName]

    if (!isTokenTree(groupTree)) {
      continue
    }

    for (const branchName of branchNames) {
      if (branchName in groupTree) {
        issues.push({
          kind: "component-intent",
          path: `${groupName}.${branchName}`,
          message: `Semantic branch "${groupName}.${branchName}" uses a component-specific name.`,
        })
      }
    }
  }

  return issues.sort((left, right) => {
    return left.path.localeCompare(right.path)
  })
}

const collectThemePathMismatchIssues = (
  input: TokenGovernanceInput,
): SemanticAuditIssue[] => {
  const issues: SemanticAuditIssue[] = []

  for (const theme of input.themeTokens) {
    const colorTree = theme.tokens.color

    if (!isTokenTree(colorTree)) {
      continue
    }

    for (const groupName of THEME_NESTED_MISALIGNED_GROUPS) {
      if (!(groupName in colorTree)) {
        continue
      }

      issues.push({
        kind: "theme-path-mismatch",
        path: `color.${groupName}`,
        themeName: theme.name,
        message: `Theme override "${theme.name}" nests "${groupName}" under "color". Use top-level "${groupName}.*" to match semantics.`,
      })
    }
  }

  return issues
}

export const createSemanticAuditReport = (
  input: TokenGovernanceInput,
): SemanticAuditReport => {
  const semanticPaths = collectLeafPaths(input.semanticTokens)
  const referencedSemanticPaths = collectReferencedSemanticPaths(input)

  const issues = [
    ...collectUnusedSemanticIssues(semanticPaths, referencedSemanticPaths),
    ...collectComponentIntentIssues(input.semanticTokens),
    ...collectThemePathMismatchIssues(input),
  ]

  return {
    issues,
    semanticPathCount: semanticPaths.size,
    referencedSemanticPathCount: referencedSemanticPaths.size,
  }
}

export const formatSemanticAuditReport = (
  report: SemanticAuditReport,
): string => {
  const lines = [
    "Semantic Token Audit",
    `- Semantic paths: ${report.semanticPathCount}`,
    `- Referenced semantic paths: ${report.referencedSemanticPathCount}`,
    `- Issues: ${report.issues.length}`,
  ]

  if (report.issues.length === 0) {
    return lines.join("\n")
  }

  lines.push("", "Issues:")

  for (const issue of report.issues) {
    const themeSuffix =
      issue.themeName === undefined ? "" : ` [theme: ${issue.themeName}]`
    lines.push(
      `- [${issue.kind}] ${issue.path}${themeSuffix}: ${issue.message}`,
    )
  }

  return lines.join("\n")
}
