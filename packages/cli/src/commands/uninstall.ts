import { loadConfig } from "../core/config.js";
import { findItem } from "../core/registry-resolver.js";

export const runUninstall = async (args: string[]): Promise<void> => {
  if (!args.length) {
    console.log("Please specify components to uninstall.");
    return;
  }

  const config = await loadConfig();
  const installed = config.installed ?? {};

  for (const name of args) {
    const item = findItem(name);
    const key = item?.name ?? name;

    if (!installed[key]) {
      console.log(`Component "${name}" is not tracked as installed.`);
      continue;
    }

    console.log(
      `Uninstall is not implemented yet. "${key}" is tracked at v${installed[key]}.`,
    );
  }
};