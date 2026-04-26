#!/usr/bin/env node

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "@neurex-ui/registry";
import type { RegistryItem } from "@neurex-ui/registry";
import prompts from "prompts";

import type { NeurexConfig } from "./core/config.js";
import { defaultConfig, loadConfig } from "./core/config.js";
import { fileExists, filesAreEqual, writeFileIfMissing } from "./core/fs.js";
import { installDependencies } from "./core/package-manager.js";
import {
  collectDependencies,
  collectUtilities,
  resolveRegistryItems
} from "./core/registry-resolver.js"

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
