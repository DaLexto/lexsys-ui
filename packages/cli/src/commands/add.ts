import prompts from "prompts";
import { registryItems } from "@neurex-ui/registry";

import { loadConfig, saveConfig } from "../core/config.js";
import {
  ensureProjectStructure,
  installItemFiles,
  installUtilities,
} from "../core/installer.js";
import { installDependencies } from "../core/package-manager.js";
import {
  collectDependencies,
  collectUtilities,
  resolveRegistryItems,
} from "../core/registry-resolver.js";

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

export const runAdd = async (args: string[]): Promise<void> => {
  let items = args;

  if (!items.length) {
    items = await promptSelectItems();

    if (!items.length) {
      console.log("No components selected.");
      return;
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

  const installed = {
    ...(config.installed ?? {}),
  };

  for (const item of resolvedItems) {
    installed[item.name] = item.version;
  }

  await saveConfig({
    ...config,
    installed,
  });
};
