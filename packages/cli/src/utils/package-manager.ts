import { execFileSync } from "node:child_process"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileExists } from "../utils/fs.js"
import { getCwd } from "../utils/context.js"

type PackageManager = "npm" | "pnpm" | "yarn"

interface InstallDependenciesOptions {
  dev?: boolean
}

export interface PackageManagerInvocation {
  command: string
  args: string[]
}

const dependencyNamePattern =
  /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/iu

const parseDependencySpec = (
  spec: string,
): { name: string; version?: string } => {
  if (spec.startsWith("@")) {
    const versionSeparator = spec.indexOf("@", 1)

    if (versionSeparator === -1) {
      return { name: spec }
    }

    return {
      name: spec.slice(0, versionSeparator),
      version: spec.slice(versionSeparator + 1),
    }
  }

  const versionSeparator = spec.indexOf("@")

  if (versionSeparator === -1) {
    return { name: spec }
  }

  return {
    name: spec.slice(0, versionSeparator),
    version: spec.slice(versionSeparator + 1),
  }
}

const isSafeDependencySpec = (spec: string): boolean => {
  const { name, version } = parseDependencySpec(spec)

  if (!dependencyNamePattern.test(name)) {
    return false
  }

  if (version === undefined) {
    return true
  }

  return version.length > 0
}

const assertSafeDependencyNames = (deps: string[]): void => {
  const unsafeDependency = deps.find(
    (dependency) => !isSafeDependencySpec(dependency),
  )

  if (unsafeDependency) {
    throw new Error(`Invalid dependency name: ${unsafeDependency}`)
  }
}

export const getPackageManagerInvocation = (
  packageManager: PackageManager,
  args: string[],
): PackageManagerInvocation => {
  if (process.platform === "win32") {
    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", packageManager, ...args],
    }
  }

  return {
    command: packageManager,
    args,
  }
}

export const detectPackageManager = async (
  packageJson: Record<string, unknown>,
): Promise<PackageManager> => {
  const declaredPackageManager =
    typeof packageJson.packageManager === "string"
      ? packageJson.packageManager
      : undefined

  if (declaredPackageManager?.startsWith("pnpm@")) return "pnpm"
  if (declaredPackageManager?.startsWith("yarn@")) return "yarn"
  if (declaredPackageManager?.startsWith("npm@")) return "npm"

  const hasPackageLock = await fileExists(join(getCwd(), "package-lock.json"))
  const hasPnpmLock = await fileExists(join(getCwd(), "pnpm-lock.yaml"))
  const hasYarnLock = await fileExists(join(getCwd(), "yarn.lock"))

  if (hasPackageLock) return "npm"
  if (hasPnpmLock) return "pnpm"
  if (hasYarnLock) return "yarn"

  return "npm"
}

export const installDependencies = async (
  deps: string[],
  options: InstallDependenciesOptions = {},
): Promise<void> => {
  if (!deps.length) return

  let packageJson: Record<string, unknown>

  try {
    const content = await readFile(join(getCwd(), "package.json"), "utf-8")
    packageJson = JSON.parse(content) as Record<string, unknown>
  } catch (error) {
    if (
      typeof error !== "object" ||
      error === null ||
      !("code" in error) ||
      error.code !== "ENOENT"
    ) {
      throw error
    }

    console.log("No package.json found, skipping dependency install.")
    return
  }

  const dependencies =
    typeof packageJson.dependencies === "object" &&
    packageJson.dependencies !== null
      ? (packageJson.dependencies as Record<string, string>)
      : {}

  const devDependencies =
    typeof packageJson.devDependencies === "object" &&
    packageJson.devDependencies !== null
      ? (packageJson.devDependencies as Record<string, string>)
      : {}

  const existingDeps = {
    ...dependencies,
    ...devDependencies,
  }

  const packageManager = await detectPackageManager(packageJson)
  const missing = deps.filter((dep) => {
    const { name } = parseDependencySpec(dep)
    return !existingDeps[name]
  })

  assertSafeDependencyNames(missing)

  if (!missing.length) {
    console.log("All dependencies already installed.\n")
    return
  }

  console.log("Installing dependencies:")
  missing.forEach((dependency) => console.log(`- ${dependency}`))
  console.log(`Using package manager: ${packageManager}`)
  console.log("")

  const installCommand: [PackageManager, string[]] =
    packageManager === "pnpm"
      ? ["pnpm", ["add", ...(options.dev ? ["-D"] : []), ...missing]]
      : packageManager === "yarn"
        ? ["yarn", ["add", ...(options.dev ? ["--dev"] : []), ...missing]]
        : [
            "npm",
            ["install", ...(options.dev ? ["--save-dev"] : []), ...missing],
          ]

  const [command, commandArgs] = installCommand
  const invocation = getPackageManagerInvocation(command, commandArgs)

  execFileSync(invocation.command, invocation.args, {
    cwd: getCwd(),
    stdio: "inherit",
  })
}
