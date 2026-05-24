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
import { NEXT_VERSION, scaffoldNextProject } from "../core/next-scaffold.js"
import {
  ensureNextPostCssConfig,
  ensureTailwindCssImport,
  ensureTypeScriptSrcAlias,
  ensureViteSrcAlias,
  ensureViteTailwindPlugin,
} from "../core/tailwind-setup.js"
import { scaffoldViteProject } from "../core/vite-scaffold.js"

const tailwindViteDependencies = ["tailwindcss", "@tailwindcss/vite"]
const tailwindNextDependencies = ["tailwindcss", "@tailwindcss/postcss"]

const viteDependencies = ["react", "react-dom"]

const viteDevDependencies = [
  "@types/react",
  "@types/react-dom",
  "@types/node",
  "@vitejs/plugin-react",
  "prettier",
  "typescript",
  "vite",
]

const nextDependencies = ["react", "react-dom", `next@${NEXT_VERSION}`]

const nextDevDependencies = [
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "prettier",
  "typescript",
]

const viteConfigFiles = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
]

const nextConfigFiles = ["next.config.ts", "next.config.mjs", "next.config.js"]

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

const hasNextScaffold = async (): Promise<boolean> => {
  for (const configFile of nextConfigFiles) {
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

  return packageJsonHasDependency(packageJson, "next")
}

const hasSupportedScaffold = async (): Promise<boolean> => {
  return (await hasViteScaffold()) || (await hasNextScaffold())
}

const runLexsysInit = async (): Promise<void> => {
  console.log("Initializing Lexsys...\n")

  const config = await loadConfig()
  const usesNext = await hasNextScaffold()

  if (usesNext && config.tailwind.css === "src/style.css") {
    config.tailwind.css = "app/globals.css"
  }

  await ensureProjectStructure(config)
  await installDependencies(
    usesNext ? tailwindNextDependencies : tailwindViteDependencies,
    { dev: true },
  )
  await ensureTailwindCssImport(config)

  if (usesNext) {
    await ensureNextPostCssConfig()
  } else {
    await ensureViteTailwindPlugin()
    await ensureViteSrcAlias()
  }

  await ensureTypeScriptSrcAlias()
  await saveConfig(config)

  console.log("\nDone.")
}

const runViteInit = async (args: string[]): Promise<void> => {
  if (args.length > 1) {
    throw new CliError("Usage: lexsys init vite [directory]")
  }

  const targetDirectory = resolve(getCwd(), args[0] ?? ".")

  setCwd(targetDirectory)

  console.log(`Initializing Vite project at ${targetDirectory}...\n`)

  await scaffoldViteProject(targetDirectory)
  await installDependencies(viteDependencies)
  await installDependencies(viteDevDependencies, { dev: true })
  await runLexsysInit()
}

const runNextInit = async (args: string[]): Promise<void> => {
  if (args.length > 1) {
    throw new CliError("Usage: lexsys init next [directory]")
  }

  const targetDirectory = resolve(getCwd(), args[0] ?? ".")

  setCwd(targetDirectory)

  console.log(`Initializing Next.js project at ${targetDirectory}...\n`)

  await scaffoldNextProject(targetDirectory)
  await installDependencies(nextDependencies)
  await installDependencies(nextDevDependencies, { dev: true })
  await runLexsysInit()
}

const promptFrameworkInit = async (): Promise<void> => {
  const response: unknown = await prompts({
    type: "select",
    name: "framework",
    message:
      "No supported app scaffold was detected. Create a starter project:",
    choices: [
      { title: "Vite + React", value: "vite" },
      { title: "Next.js App Router", value: "next" },
    ],
    initial: 0,
  })

  const framework =
    typeof response === "object" &&
    response !== null &&
    "framework" in response &&
    typeof response.framework === "string"
      ? response.framework
      : undefined

  if (framework === "vite") {
    await runViteInit([])
    return
  }

  if (framework === "next") {
    await runNextInit([])
    return
  }

  console.log("No project scaffold selected. Nothing changed.")
  console.log(
    "Run `lexsys init vite` or `lexsys init next` to create a starter.",
  )
}

export const runInit = async (args: string[] = []): Promise<void> => {
  const positionalArgs = removeFlagsWithValues(args, ["--cwd"])
  const [framework, ...frameworkArgs] = positionalArgs

  if (!framework) {
    if (!(await hasSupportedScaffold())) {
      await promptFrameworkInit()
      return
    }

    await runLexsysInit()
    return
  }

  if (framework === "vite") {
    await runViteInit(frameworkArgs)
    return
  }

  if (framework === "next") {
    await runNextInit(frameworkArgs)
    return
  }

  throw new CliError(`Unsupported init target: ${framework}`)
}
