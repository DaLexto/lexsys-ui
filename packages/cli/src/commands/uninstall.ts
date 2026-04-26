import { loadConfig } from "../core/config.js";
import { hasFlag, removeFlags } from "../core/flags.js";
import { findItem } from "../core/registry-resolver.js";

export const runUninstall = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run");
  const targetArgs = removeFlags(args, ["--dry-run"]);

  if (!targetArgs.length) {
    console.log("Please specify components to uninstall.");
    return;
  }

  const config = await loadConfig();
  const installed = config.installed ?? {};

  if (dryRun) {
    console.log("Dry run: no files will be removed.\n");
  }

  for (const name of targetArgs) {
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