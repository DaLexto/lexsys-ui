import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createStyleOutputs } from "./generator.create.js"
import { defaultStyleOutputConfig } from "./generator.config.js"

const allowedArgs = new Set(["--package", "--registry"])

interface WriteStyleOutputsArgs {
  package: boolean
  registry: boolean
}

const writeOutput = async (path: string, content: string): Promise<void> => {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content, "utf-8")
}

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const repoRoot = resolve(packageRoot, "../..")

const parseArgs = (rawArgs: string[]): WriteStyleOutputsArgs => {
  const unknownArgs = rawArgs.filter((arg) => {
    return !allowedArgs.has(arg)
  })

  if (unknownArgs.length > 0) {
    throw new Error(
      `Unknown style output argument(s): ${unknownArgs.join(", ")}.`,
    )
  }

  const args = new Set(rawArgs)

  return {
    package: args.has("--package"),
    registry: args.has("--registry"),
  }
}

const warnWhenNoOutputTarget = (args: WriteStyleOutputsArgs): boolean => {
  if (args.package || args.registry) {
    return false
  }

  console.warn(
    "No style output target selected. Use --package, --registry, or both.",
  )
  return true
}

const writePackageOutputs = async (
  outputs: ReturnType<typeof createStyleOutputs>,
): Promise<void> => {
  await rm(resolve(packageRoot, "dist/tokens"), {
    force: true,
    recursive: true,
  })

  await writeOutput(resolve(packageRoot, "dist/tokens.css"), outputs.tokensCss)
  await writeOutput(resolve(packageRoot, "dist/theme.css"), outputs.themeCss)

  await Promise.all(
    Object.entries(outputs.tokenJsonFiles).map(([relativePath, content]) => {
      return writeOutput(resolve(packageRoot, "dist", relativePath), content)
    }),
  )
}

const writeRegistryOutputs = async (
  outputs: ReturnType<typeof createStyleOutputs>,
): Promise<void> => {
  const registryStylesPath = resolve(
    repoRoot,
    defaultStyleOutputConfig.registryStylesPath,
  )

  await writeOutput(
    resolve(registryStylesPath, "tokens.css"),
    outputs.tokensCss,
  )
  await writeOutput(resolve(registryStylesPath, "theme.css"), outputs.themeCss)
}

const formatErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error)
}

const main = async (): Promise<void> => {
  const args = parseArgs(process.argv.slice(2))

  if (warnWhenNoOutputTarget(args)) {
    return
  }

  const outputs = createStyleOutputs()

  if (args.package) {
    await writePackageOutputs(outputs)
  }

  if (args.registry) {
    await writeRegistryOutputs(outputs)
  }
}

try {
  await main()
} catch (error) {
  console.error(`Failed to write style outputs: ${formatErrorMessage(error)}`)
  process.exit(1)
}
