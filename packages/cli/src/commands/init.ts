import { resolve } from "node:path"
import { readFile } from "node:fs/promises"
import prompts from "prompts"
import { loadConfig, saveConfig } from "../core/config.js"
import { getCwd, setCwd } from "../core/context.js"
import { CliError } from "../core/cli-error.js"
import { removeFlagsWithValues } from "../core/flags.js"
import { fileExists } from "../core/fs.js"
import { ensureProjectStructure } from "../core/installer.js"
import { installDependencies } from "../core/package-manager.js"
import {
  ensureTailwindCssImport,
  ensureViteTailwindPlugin,
} from "../core/tailwind-setup.js"
import { scaffoldViteProject } from "../core/vite-scaffold.js"

const tailwindViteDependencies = ["tailwindcss", "@tailwindcss/vite"]

const viteDependencies = ["react", "react-dom"]

const viteDevDependencies = [
  "@types/react",
  "@types/react-dom",
  "@vitejs/plugin-react",
  "typescript",
  "vite",
]

const viteConfigFiles = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
]

const packageJsonHasDependency = (
  packageJson: Record<string, unknown>,
  dependencyName: string,
): boolean => {
  const dependencies =
    typeof packageJson.dependencies === "object" &&
    packageJson.dependencies !== null
      ? packageJson.dependencies
      : {}
  const devDependencies =
    typeof packageJson.devDependencies === "object" &&
    packageJson.devDependencies !== null
      ? packageJson.devDependencies
      : {}

  return dependencyName in dependencies || dependencyName in devDependencies
}

const hasViteScaffold = async (): Promise<boolean> => {
  for (const configFile of viteConfigFiles) {
    if (await fileExists(resolve(getCwd(), configFile))) {
      return true
    }
  }

  const packageJsonPath = resolve(getCwd(), "package.json")

  if (!(await fileExists(packageJsonPath))) {
    return false
  }

  const packageJson = JSON.parse(
    await readFile(packageJsonPath, "utf-8"),
  ) as Record<string, unknown>

  return packageJsonHasDependency(packageJson, "vite")
}

const hasSupportedScaffold = async (): Promise<boolean> => {
  return hasViteScaffold()
}

const runNeurexInit = async (): Promise<void> => {
  console.log("Initializing Neurex...\n")

  const config = await loadConfig()

  await ensureProjectStructure(config)
  await installDependencies(tailwindViteDependencies, { dev: true })
  await ensureTailwindCssImport(config)
  await ensureViteTailwindPlugin()
  await saveConfig(config)

  console.log("\nDone.")
}

const runViteInit = async (args: string[]): Promise<void> => {
  if (args.length > 1) {
    throw new CliError("Usage: neurex init vite [directory]")
  }

  const targetDirectory = resolve(getCwd(), args[0] ?? ".")

  setCwd(targetDirectory)

  console.log(`Initializing Vite project at ${targetDirectory}...\n`)

  await scaffoldViteProject(targetDirectory)
  await installDependencies(viteDependencies)
  await installDependencies(viteDevDependencies, { dev: true })
  await runNeurexInit()
}

const promptFrameworkInit = async (): Promise<void> => {
  const response: unknown = await prompts({
    type: "confirm",
    name: "useVite",
    message:
      "No supported app scaffold was detected. Create a Vite + React project here?",
    initial: true,
  })

  const useVite =
    typeof response === "object" &&
    response !== null &&
    "useVite" in response &&
    response.useVite === true

  if (!useVite) {
    console.log("No project scaffold selected. Nothing changed.")
    console.log("Run `neurex init vite` to create a Vite starter.")
    return
  }

  await runViteInit([])
}

export const runInit = async (args: string[] = []): Promise<void> => {
  const positionalArgs = removeFlagsWithValues(args, ["--cwd"])
  const [framework, ...frameworkArgs] = positionalArgs

  if (!framework) {
    if (!(await hasSupportedScaffold())) {
      await promptFrameworkInit()
      return
    }

    await runNeurexInit()
    return
  }

  if (framework === "vite") {
    await runViteInit(frameworkArgs)
    return
  }

  throw new CliError(`Unsupported init target: ${framework}`)
}
