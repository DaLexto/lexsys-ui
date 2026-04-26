#!/usr/bin/env node

import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { registryItems } from "@neurex-ui/registry";
import prompts from "prompts";

import { loadConfig } from "./core/config.js";
import { fileExists, writeFileIfMissing } from "./core/fs.js";
import { installDependencies } from "./core/package-manager.js";
import {
  collectDependencies,
  collectUtilities,
  resolveRegistryItems,
} from "./core/registry-resolver.js";
import {
  ensureProjectStructure,
  installItemFiles,
  installUtilities,
} from "./core/installer.js";
import { runDoctor } from "./commands/doctor.js";
import { runList } from "./commands/list.js";

const [, , command, ...args] = process.argv;

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
  runList();
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
