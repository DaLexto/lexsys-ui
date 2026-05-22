import { createStyleTokenInput } from "../generators/inputs/input.source"
import {
  createTokenGovernanceReport,
  formatTokenGovernanceReport,
} from "../governance/create-governance-report"

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
}

try {
  main()
} catch (error) {
  console.error(`Failed to create token governance report: ${formatErrorMessage(error)}`)
  process.exit(1)
}
