/**
 * contrast.validator.ts
 *
 * @layer validator
 * @description WCAG contrast guard (Phase 10) — non-blocking report by default.
 */

import {
  resolveLeafValueForTheme,
  toContrastReadyColor,
} from "../../resolver/values"
import type { TokenValue } from "../../../types"
import {
  SEMANTIC_CONTRAST_PAIRS,
} from "./contrast.pairs"
import {
  evaluateContrastPolicy,
  formatContrastPolicyFailures,
  resolveBuildContrastPolicy,
  resolvePairMinimumRatio,
  shouldEnforceContrastInStyleValidation,
} from "./contrast.policy"
import {
  compositeLinearRgb,
  contrastRatio,
  contrastReadyColorToLinearRgb,
  parseColorStringToLinearRgb,
  type LinearRgb,
} from "./contrast.math"
import type {
  ContrastIssue,
  ContrastPairResult,
  ContrastValidationInput,
  ContrastValidationReport,
  SemanticContrastPair,
} from "./contrast.types"

const BACKGROUND_UNDERLAY_PATH = "color.background.base"

const resolveMinimumRatio = (pair: SemanticContrastPair): number => {
  return resolvePairMinimumRatio(pair)
}

const valueToLinearRgb = (value: TokenValue): LinearRgb | null => {
  const contrastReady = toContrastReadyColor(value)

  if (contrastReady !== null) {
    return contrastReadyColorToLinearRgb(contrastReady)
  }

  if (typeof value === "string") {
    return parseColorStringToLinearRgb(value)
  }

  return null
}

const resolveEffectiveBackgroundLinear = (
  input: ContrastValidationInput,
  theme: ContrastValidationInput["themeTokens"][number],
  backgroundLinear: LinearRgb,
): LinearRgb | null => {
  if (backgroundLinear.alpha >= 1) {
    return backgroundLinear
  }

  const themedSource = {
    foundationTokens: input.foundationTokens,
    componentTokens: input.componentTokens,
  }
  const themeOverlay = { tokens: theme.tokens }
  const underlayResult = resolveLeafValueForTheme(
    themedSource,
    themeOverlay,
    BACKGROUND_UNDERLAY_PATH,
  )

  if (underlayResult.errors.length > 0 || underlayResult.resolved === null) {
    return null
  }

  const underlayLinear = valueToLinearRgb(underlayResult.resolved.value)

  if (underlayLinear === null) {
    return null
  }

  return compositeLinearRgb(backgroundLinear, underlayLinear)
}

const createIssue = (
  issue: Omit<ContrastIssue, "minimumRatio"> & { minimumRatio: number },
): ContrastIssue => {
  return issue
}

const evaluatePairForTheme = (
  input: ContrastValidationInput,
  theme: ContrastValidationInput["themeTokens"][number],
  pair: SemanticContrastPair,
): ContrastPairResult => {
  const minimumRatio = resolveMinimumRatio(pair)
  const themedSource = {
    foundationTokens: input.foundationTokens,
    componentTokens: input.componentTokens,
  }
  const themeOverlay = { tokens: theme.tokens }
  const foregroundResult = resolveLeafValueForTheme(
    themedSource,
    themeOverlay,
    pair.foregroundPath,
  )
  const backgroundResult = resolveLeafValueForTheme(
    themedSource,
    themeOverlay,
    pair.backgroundPath,
  )
  const issues: ContrastIssue[] = []

  if (
    foregroundResult.errors.length > 0 ||
    foregroundResult.resolved === null
  ) {
    issues.push(
      createIssue({
        code: "RESOLVE_FAILED",
        message: `Failed to resolve foreground path "${pair.foregroundPath}" for theme "${theme.name}".`,
        pairId: pair.id,
        theme: theme.name,
        foregroundPath: pair.foregroundPath,
        backgroundPath: pair.backgroundPath,
        minimumRatio,
      }),
    )
  }

  if (
    backgroundResult.errors.length > 0 ||
    backgroundResult.resolved === null
  ) {
    issues.push(
      createIssue({
        code: "RESOLVE_FAILED",
        message: `Failed to resolve background path "${pair.backgroundPath}" for theme "${theme.name}".`,
        pairId: pair.id,
        theme: theme.name,
        foregroundPath: pair.foregroundPath,
        backgroundPath: pair.backgroundPath,
        minimumRatio,
      }),
    )
  }

  if (issues.length > 0) {
    return {
      pairId: pair.id,
      theme: theme.name,
      foregroundPath: pair.foregroundPath,
      backgroundPath: pair.backgroundPath,
      ratio: null,
      minimumRatio,
      passes: false,
      issues,
    }
  }

  const foregroundLinear = valueToLinearRgb(
    foregroundResult.resolved?.value as TokenValue,
  )
  const backgroundLinear = valueToLinearRgb(
    backgroundResult.resolved?.value as TokenValue,
  )

  if (foregroundLinear === null || backgroundLinear === null) {
    issues.push(
      createIssue({
        code: "UNPARSEABLE_COLOR",
        message: `Could not parse resolved colors for pair "${pair.id}" in theme "${theme.name}".`,
        pairId: pair.id,
        theme: theme.name,
        foregroundPath: pair.foregroundPath,
        backgroundPath: pair.backgroundPath,
        minimumRatio,
      }),
    )

    return {
      pairId: pair.id,
      theme: theme.name,
      foregroundPath: pair.foregroundPath,
      backgroundPath: pair.backgroundPath,
      ratio: null,
      minimumRatio,
      passes: false,
      issues,
    }
  }

  const effectiveBackgroundLinear = resolveEffectiveBackgroundLinear(
    input,
    theme,
    backgroundLinear,
  )

  if (effectiveBackgroundLinear === null) {
    issues.push(
      createIssue({
        code: "UNPARSEABLE_COLOR",
        message: `Could not composite background path "${pair.backgroundPath}" over "${BACKGROUND_UNDERLAY_PATH}" for pair "${pair.id}" in theme "${theme.name}".`,
        pairId: pair.id,
        theme: theme.name,
        foregroundPath: pair.foregroundPath,
        backgroundPath: pair.backgroundPath,
        minimumRatio,
      }),
    )

    return {
      pairId: pair.id,
      theme: theme.name,
      foregroundPath: pair.foregroundPath,
      backgroundPath: pair.backgroundPath,
      ratio: null,
      minimumRatio,
      passes: false,
      issues,
    }
  }

  const ratio = contrastRatio(foregroundLinear, effectiveBackgroundLinear)
  const passes = ratio >= minimumRatio

  if (!passes) {
    issues.push(
      createIssue({
        code: "INSUFFICIENT_CONTRAST",
        message: `Contrast ratio ${ratio.toFixed(2)}:1 is below WCAG AA minimum ${minimumRatio}:1 for pair "${pair.id}" in theme "${theme.name}".`,
        pairId: pair.id,
        theme: theme.name,
        foregroundPath: pair.foregroundPath,
        backgroundPath: pair.backgroundPath,
        ratio,
        minimumRatio,
      }),
    )
  }

  return {
    pairId: pair.id,
    theme: theme.name,
    foregroundPath: pair.foregroundPath,
    backgroundPath: pair.backgroundPath,
    ratio,
    minimumRatio,
    passes,
    issues,
  }
}

export const createContrastValidationReport = (
  input: ContrastValidationInput,
): ContrastValidationReport => {
  const pairs = input.pairs ?? SEMANTIC_CONTRAST_PAIRS
  const results: ContrastPairResult[] = []

  for (const theme of input.themeTokens) {
    for (const pair of pairs) {
      results.push(evaluatePairForTheme(input, theme, pair))
    }
  }

  return {
    pairs: results,
    issues: results.flatMap((result) => result.issues),
  }
}

export const formatContrastValidationReport = (
  report: ContrastValidationReport,
): string => {
  const failingPairs = report.pairs.filter((result) => !result.passes)
  const lines = [
    "Contrast Validation Report",
    `- Checked pair results: ${report.pairs.length}`,
    `- Failing pair results: ${failingPairs.length}`,
    `- Issues: ${report.issues.length}`,
  ]

  if (report.issues.length === 0) {
    lines.push(
      "",
      "All registered semantic contrast pairs pass WCAG AA thresholds.",
    )
    return lines.join("\n")
  }

  lines.push("", "Issues:")

  for (const issue of report.issues) {
    lines.push(
      `- [${issue.code}] ${issue.theme}/${issue.pairId}: ${issue.message}`,
    )
  }

  return lines.join("\n")
}

export const validateContrastPolicyStrict = (
  input: ContrastValidationInput,
): void => {
  if (!shouldEnforceContrastInStyleValidation()) {
    return
  }

  const policy = resolveBuildContrastPolicy()
  const report = createContrastValidationReport(input)
  const evaluation = evaluateContrastPolicy(report, policy)

  if (!evaluation.passes) {
    throw new Error(formatContrastPolicyFailures(evaluation.failures))
  }
}
