import { resolve } from "node:path"
import { readFile } from "node:fs/promises"
import prompts from "prompts"
import { loadConfig, saveConfig } from "../config/config.js"
import { getCwd, setCwd } from "../utils/context.js"
import { CliError } from "../utils/cli-error.js"
import { removeFlagsWithValues } from "../utils/flags.js"
import { fileExists } from "../utils/fs.js"
import { ensureProjectStructure } from "../install/installer.js"
import { installDependencies } from "../utils/package-manager.js"
import { NEXT_VERSION, scaffoldNextProject } from "../scaffold/next.js"
import {
  ensureNextPostCssConfig,
  ensureTailwindCssImport,
  ensureTypeScriptSrcAlias,
  ensureViteSrcAlias,
  ensureViteTailwindPlugin,
} from "../scaffold/tailwind.js"
import { scaffoldViteProject } from "../scaffold/vite.js"

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
  const response: unknown = await prompts([
    {
      type: "select",
      name: "framework",
      message: "What would you like to create?",
      choices: [
        { title: "Vite React app", value: "vite" },
        { title: "Next.js App Router app", value: "next" },
      ],
    },
    {
      type: "text",
      name: "dir",
      message: "Project name",
      initial: "my-app",
    },
  ])

  if (typeof response !== "object" || response === null) {
    return
  }

  const framework =
    "framework" in response && typeof response.framework === "string"
      ? response.framework
      : undefined

  if (!framework) return

  const dir =
    "dir" in response && typeof response.dir === "string" && response.dir
      ? [response.dir]
      : []

  if (framework === "vite") {
    await runViteInit(dir)
    return
  }

  if (framework === "next") {
    await runNextInit(dir)
    return
  }
}

const hasViteScaffold = async (): Promise<boolean> => {
  for (const configFile of [
    "vite.config.ts",
    "vite.config.js",
    "vite.config.mts",
  ]) {
    if (await fileExists(resolve(getCwd(), configFile))) return true
  }
  return false
}

export const runInit = async (args: string[] = []): Promise<void> => {
  const positionalArgs = removeFlagsWithValues(args, ["--cwd"])
  const [framework, ...frameworkArgs] = positionalArgs

  if (!framework) {
    // If an existing scaffold is detected, just run Lexsys init on it
    if ((await hasNextScaffold()) || (await hasViteScaffold())) {
      await runLexsysInit()
      return
    }
    await promptFrameworkInit()
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
