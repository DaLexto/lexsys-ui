#!/usr/bin/env node

import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "@neurex-ui/registry";
import type { RegistryItem } from "@neurex-ui/registry";
import prompts from "prompts";

interface NeurexConfig {
  componentsPath: string;
  utilitiesPath: string;
  stylesPath: string;
}

const defaultConfig: NeurexConfig = {
  componentsPath: "components/ui",
  utilitiesPath: "lib/neurex",
  stylesPath: "styles/neurex",
};

const [, , command, ...args] = process.argv;

const cliFilePath = fileURLToPath(import.meta.url);
const cliDistDir = dirname(cliFilePath);
const repoRoot = join(cliDistDir, "..", "..", "..");

const registryTemplatesRoot = join(
  repoRoot,
  "packages",
  "registry",
  "templates",
);

const sharedTemplatesRoot = join(registryTemplatesRoot, "shared");

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const filesAreEqual = async (
  sourcePath: string,
  targetPath: string,
): Promise<boolean> => {
  const sourceContent = await readFile(sourcePath, "utf-8");
  const targetContent = await readFile(targetPath, "utf-8");

  return sourceContent === targetContent;
};

const loadConfig = async (): Promise<NeurexConfig> => {
  const configPath = join(process.cwd(), "neurex.config.json");

  if (!(await fileExists(configPath))) {
    return defaultConfig;
  }

  const content = await readFile(configPath, "utf-8");
  const parsed = JSON.parse(content) as Partial<NeurexConfig>;

  return {
    ...defaultConfig,
    ...parsed,
  };
};

const findItem = (name: string): RegistryItem | undefined => {
  const normalizedName = name.toLowerCase();

  return registryItems.find(
    (item) =>
      item.name.toLowerCase() === normalizedName ||
      item.canonicalName.toLowerCase() === normalizedName ||
      item.aliases.some((alias) => alias.toLowerCase() === normalizedName),
  );
};

const installDependencies = async (deps: string[]): Promise<void> => {
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

  const missing = deps.filter((dep) => !existingDeps[dep]);

  if (!missing.length) {
    console.log("All dependencies already installed.\n");
    return;
  }

  console.log("Installing dependencies:");
  missing.forEach((dependency) => console.log(`- ${dependency}`));
  console.log("");

  execSync(`pnpm add ${missing.join(" ")}`, {
    stdio: "inherit",
  });
};

const installUtilities = async (
  utilities: string[],
  config: NeurexConfig,
): Promise<void> => {
  for (const utility of utilities) {
    if (utility !== "cn") {
      console.log(`Unknown utility "${utility}", skipping.`);
      continue;
    }

    const sourcePath = join(sharedTemplatesRoot, "utils", "cn.ts");
    const targetPath = join(process.cwd(), config.utilitiesPath, "cn.ts");

    await mkdir(dirname(targetPath), { recursive: true });

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath);

      if (isSameFile) {
        console.log(`Skipped identical utility: ${targetPath}`);
        continue;
      }

      console.log(
        `Conflict: utility already exists and differs: ${targetPath}`,
      );
      continue;
    }

    await copyFile(sourcePath, targetPath);
    console.log(`Created utility: ${targetPath}`);
  }
};

const ensureProjectStructure = async (config: NeurexConfig): Promise<void> => {
  await mkdir(join(process.cwd(), config.componentsPath), { recursive: true });
  await mkdir(join(process.cwd(), config.utilitiesPath), { recursive: true });
  await mkdir(join(process.cwd(), config.stylesPath), { recursive: true });
};

const resolveRegistryItems = (names: string[]): RegistryItem[] => {
  const resolved = new Map<string, RegistryItem>();

  const visit = (name: string): void => {
    const item = findItem(name);

    if (!item) {
      console.log(`Component "${name}" not found.`);
      process.exit(1);
    }

    const key = item.canonicalName.toLowerCase();

    if (resolved.has(key)) {
      return;
    }

    resolved.set(key, item);

    for (const dependency of item.registryDependencies) {
      visit(dependency);
    }
  };

  for (const name of names) {
    visit(name);
  }

  return Array.from(resolved.values());
};

const collectDependencies = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.dependencies)));
};

const collectUtilities = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.utilities)));
};

const installItemFiles = async (
  item: RegistryItem,
  config: NeurexConfig,
): Promise<void> => {
  console.log(`Installing ${item.canonicalName}...\n`);

  for (const file of item.files) {
    const sourcePath = join(registryTemplatesRoot, file);
    const fileName = file.split("/").at(-1);

    if (!fileName) {
      console.log(`Invalid registry file path: ${file}`);
      process.exit(1);
    }

    const targetPath = join(
      process.cwd(),
      config.componentsPath,
      item.canonicalName,
      fileName,
    );

    await mkdir(dirname(targetPath), { recursive: true });

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath);

      if (isSameFile) {
        console.log(`Skipped identical file: ${targetPath}`);
        continue;
      }

      console.log(`Conflict: file already exists and differs: ${targetPath}`);
      continue;
    }

    await copyFile(sourcePath, targetPath);
    console.log(`Created: ${targetPath}`);
  }

  console.log("\nDone.");
};

const runDoctor = async (): Promise<void> => {
  console.log("Neurex UI doctor\n");

  const checks = [
    {
      label: "package.json",
      path: join(process.cwd(), "package.json"),
    },
    {
      label: "components/ui",
      path: join(process.cwd(), "components", "ui"),
    },
    {
      label: "lib/neurex",
      path: join(process.cwd(), "lib", "neurex"),
    },
    {
      label: "styles/neurex",
      path: join(process.cwd(), "styles", "neurex"),
    },
  ];

  for (const check of checks) {
    const exists = await fileExists(check.path);
    console.log(`${exists ? "✓" : "×"} ${check.label}`);
  }
};

const writeFileIfMissing = async (
  path: string,
  content: string,
): Promise<void> => {
  if (await fileExists(path)) {
    console.log(`Skipped existing file: ${path}`);
    return;
  }

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf-8");
  console.log(`Created: ${path}`);
};

const printAvailableItems = (): void => {
  console.log("Available Neurex UI components:\n");

  for (const item of registryItems) {
    console.log(`- ${item.canonicalName} (${item.category})`);
  }
};

const runInit = async (): Promise<void> => {
  console.log("Initializing Neurex UI...\n");

  await mkdir(join(process.cwd(), "components", "ui"), { recursive: true });
  await mkdir(join(process.cwd(), "lib", "neurex"), { recursive: true });
  await mkdir(join(process.cwd(), "styles", "neurex"), { recursive: true });

  await writeFileIfMissing(
    join(process.cwd(), "neurex.config.json"),
    JSON.stringify(
      {
        componentsPath: "components/ui",
        utilitiesPath: "lib/neurex",
        stylesPath: "styles/neurex",
      },
      null,
      2,
    ) + "\n",
  );

  console.log("\nDone.");
};

const promptSelectItems = async (): Promise<string[]> => {
  const response = await prompts({
    type: "multiselect",
    name: "items",
    message: "Select components to add",
    choices: registryItems.map((item) => ({
      title: `${item.canonicalName} (${item.category})`,
      value: item.name,
    })),
  });

  return response.items || [];
};

if (command === "list") {
  printAvailableItems();
  process.exit(0);
}

if (command === "doctor") {
  await runDoctor();
  process.exit(0);
}

if (command === "init") {
  await runInit();
  process.exit(0);
}

if (command === "add") {
  let items = args;

  if (!items.length) {
    items = await promptSelectItems();

    if (!items.length) {
      console.log("No components selected.");
      process.exit(0);
    }
  }

  const resolvedItems = resolveRegistryItems(items);
  const dependencies = collectDependencies(resolvedItems);
  const utilities = collectUtilities(resolvedItems);
  const config = await loadConfig();

  await ensureProjectStructure(config);
  await installDependencies(dependencies);
  await installUtilities(utilities, config);

  for (const item of resolvedItems) {
    await installItemFiles(item, config);
    console.log("");
  }

  process.exit(0);
}

console.log("Neurex UI CLI\n");
console.log("Available commands:");
console.log("- list");
console.log("- add <component>");
console.log("- doctor");
console.log("- init");