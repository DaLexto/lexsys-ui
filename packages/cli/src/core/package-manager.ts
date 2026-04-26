import { execSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileExists } from "./fs.js";

type PackageManager = "npm" | "pnpm" | "yarn";

export const detectPackageManager = async (
  packageJson: Record<string, unknown>,
): Promise<PackageManager> => {
  const declaredPackageManager =
    typeof packageJson.packageManager === "string"
      ? packageJson.packageManager
      : undefined;

  if (declaredPackageManager?.startsWith("pnpm@")) return "pnpm";
  if (declaredPackageManager?.startsWith("yarn@")) return "yarn";
  if (declaredPackageManager?.startsWith("npm@")) return "npm";

  const hasPackageLock = await fileExists(join(process.cwd(), "package-lock.json"));
  const hasPnpmLock = await fileExists(join(process.cwd(), "pnpm-lock.yaml"));
  const hasYarnLock = await fileExists(join(process.cwd(), "yarn.lock"));

  if (hasPackageLock) return "npm";
  if (hasPnpmLock) return "pnpm";
  if (hasYarnLock) return "yarn";

  return "npm";
};

export const installDependencies = async (deps: string[]): Promise<void> => {
  if (!deps.length) return;

  let packageJson: Record<string, unknown> = {};

  try {
    const content = await readFile("package.json", "utf-8");
    packageJson = JSON.parse(content) as Record<string, unknown>;
  } catch {
    console.log("No package.json found, skipping dependency install.");
    return;
  }

  const dependencies =
    typeof packageJson.dependencies === "object" &&
    packageJson.dependencies !== null
      ? (packageJson.dependencies as Record<string, string>)
      : {};

  const devDependencies =
    typeof packageJson.devDependencies === "object" &&
    packageJson.devDependencies !== null
      ? (packageJson.devDependencies as Record<string, string>)
      : {};

  const existingDeps = {
    ...dependencies,
    ...devDependencies,
  };

  const packageManager = await detectPackageManager(packageJson);
  const missing = deps.filter((dep) => !existingDeps[dep]);

  if (!missing.length) {
    console.log("All dependencies already installed.\n");
    return;
  }

  console.log("Installing dependencies:");
  missing.forEach((dependency) => console.log(`- ${dependency}`));
  console.log(`Using package manager: ${packageManager}`);
  console.log("");

  const installCommand =
    packageManager === "pnpm"
      ? `pnpm add ${missing.join(" ")}`
      : packageManager === "yarn"
        ? `yarn add ${missing.join(" ")}`
        : `npm install ${missing.join(" ")}`;

  execSync(installCommand, {
    stdio: "inherit",
  });
};