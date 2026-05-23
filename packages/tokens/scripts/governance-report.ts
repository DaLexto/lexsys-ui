import { createStyleTokenInput } from "../src/generators/inputs/input.source"
import {
  createContrastValidationReport,
  evaluateContrastPolicy,
  formatContrastValidationReport,
  resolveContrastPolicy,
  shouldFailOnContrastPolicy,
} from "../src/engine/validator"
import {
  createSemanticAuditReport,
  createTokenGovernanceReport,
  evaluateSemanticAuditPolicy,
  formatSemanticAuditReport,
  formatSemanticAuditPolicyFailures,
  formatTokenGovernanceReport,
  resolveGovernancePolicy,
  shouldFailOnGovernancePolicy,
} from "../src/engine/governance"

const allowedArgs = new Set(["--json"])

const parseArgs = (rawArgs: string[]): { json: boolean } => {
  const unknownArgs = rawArgs.filter((arg) => {
    return !allowedArgs.has(arg)
  })

  if (unknownArgs.length > 0) {
    throw new Error(
      `Unknown governance report argument(s): ${unknownArgs.join(", ")}.`,
    )
  }

  return {
    json: rawArgs.includes("--json"),
  }
}

const formatErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error)
}

const main = (): void => {
  const args = parseArgs(process.argv.slice(2))
  const input = createStyleTokenInput()
  const report = createTokenGovernanceReport({
    primitiveTokens: input.primitiveTokens,
    brandTokens: input.brandTokens,
    semanticTokens: input.semanticTokens,
    componentTokens: input.componentTokens,
    foundationTokens: input.foundationTokens,
    themeTokens: input.themeTokens,
  })

  if (args.json) {
    console.log(JSON.stringify(report, null, 2))
    return
  }

  console.log(formatTokenGovernanceReport(report))
  console.log("")
  const semanticAuditReport = createSemanticAuditReport({
    primitiveTokens: input.primitiveTokens,
    brandTokens: input.brandTokens,
    semanticTokens: input.semanticTokens,
    componentTokens: input.componentTokens,
    foundationTokens: input.foundationTokens,
    themeTokens: input.themeTokens,
  })
  console.log(formatSemanticAuditReport(semanticAuditReport))

  const governancePolicy = resolveGovernancePolicy()
  const semanticAuditEvaluation = evaluateSemanticAuditPolicy(
    semanticAuditReport,
  )

  if (
    !semanticAuditEvaluation.passes &&
    shouldFailOnGovernancePolicy(governancePolicy)
  ) {
    console.error("")
    console.error(
      formatSemanticAuditPolicyFailures(semanticAuditEvaluation.failures),
    )
    console.error("")
    console.error(
      `Governance policy (${governancePolicy.tier}) failed with ${semanticAuditEvaluation.failures.length} semantic audit error(s). Set ${"NEUREX_GOVERNANCE_POLICY=report"} to report-only locally.`,
    )
    process.exit(1)
  }

  console.log("")
  const contrastReport = createContrastValidationReport({
    foundationTokens: input.foundationTokens,
    componentTokens: input.componentTokens,
    themeTokens: input.themeTokens,
  })
  console.log(formatContrastValidationReport(contrastReport))

  const contrastPolicy = resolveContrastPolicy()
  const contrastEvaluation = evaluateContrastPolicy(
    contrastReport,
    contrastPolicy,
  )

  if (
    !contrastEvaluation.passes &&
    shouldFailOnContrastPolicy(contrastPolicy)
  ) {
    console.error("")
    console.error(
      `Contrast policy (${contrastPolicy.tier}) failed with ${contrastEvaluation.failures.length} issue(s). Set ${"NEUREX_CONTRAST_POLICY=report"} to report-only locally.`,
    )
    process.exit(1)
  }
}

try {
  main()
} catch (error) {
  console.error(
    `Failed to create token governance report: ${formatErrorMessage(error)}`,
  )
  process.exit(1)
}
