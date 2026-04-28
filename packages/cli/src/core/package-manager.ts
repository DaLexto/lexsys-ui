import { execFileSync } from "node:child_process"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileExists } from "./fs.js"
import { getCwd } from "./context.js"

type PackageManager = "npm" | "pnpm" | "yarn"

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

export const installDependencies = async (deps: string[]): Promise<void> => {
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
  const missing = deps.filter((dep) => !existingDeps[dep])

  if (!missing.length) {
    console.log("All dependencies already installed.\n")
    return
  }

  console.log("Installing dependencies:")
  missing.forEach((dependency) => console.log(`- ${dependency}`))
  console.log(`Using package manager: ${packageManager}`)
  console.log("")

  const installCommand: [string, string[]] =
    packageManager === "pnpm"
      ? ["pnpm", ["add", ...missing]]
      : packageManager === "yarn"
        ? ["yarn", ["add", ...missing]]
        : ["npm", ["install", ...missing]]

  const [command, commandArgs] = installCommand

  execFileSync(command, commandArgs, {
    cwd: getCwd(),
    stdio: "inherit",
  })
}
