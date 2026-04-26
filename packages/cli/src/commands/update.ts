import { loadConfig, saveConfig } from "../core/config.js";
import { findItem } from "../core/registry-resolver.js";
import { checkItemUpdate } from "../core/update-engine.js";
import { hasFlag, removeFlags } from "../core/flags.js";

const resolveInstalledKey = (
  name: string,
  installed: Record<string, string>,
): string | undefined => {
  if (installed[name]) {
    return name;
  }

  const item = findItem(name);

  if (!item) {
    return undefined;
  }

  return installed[item.name] ? item.name : undefined;
};

export const runUpdate = async (args: string[]): Promise<void> => {
  let changed = false;

  const dryRun = hasFlag(args, "--dry-run");
  const force = hasFlag(args, "--force");
  const targetArgs = removeFlags(args, ["--dry-run", "--force"]);

  const config = await loadConfig();
  const installed = config.installed ?? {};

  if (force) {
    console.log(
      "Force update is not implemented yet. Conflicted files will still be protected.",
    );
  }

  if (!Object.keys(installed).length) {
    console.log("No Neurex UI components are currently tracked.");
    return;
  }

  if (args.includes("--all")) {
    console.log("Checking installed Neurex UI components:\n");

    for (const [name, version] of Object.entries(installed)) {
      const didUpdate = await checkItemUpdate(
        name,
        version,
        dryRun,
        config.componentsPath,
      );

      const item = findItem(name);

      if (didUpdate && item) {
        installed[name] = item.version;
        changed = true;
      }
    }

    if (changed) {
      await saveConfig({
        ...config,
        installed,
      });
    }

    return;
  }

  if (!targetArgs.length) {
    console.log("Please specify components to update or use --all.");
    return;
  }

  for (const name of targetArgs) {
    const installedKey = resolveInstalledKey(name, installed);

    if (!installedKey) {
      console.log(`Component "${name}" is not tracked as installed.`);
      continue;
    }

    const didUpdate = await checkItemUpdate(
      installedKey,
      installed[installedKey],
      dryRun,
      config.componentsPath,
    );

    const item = findItem(installedKey);

    if (didUpdate && item) {
      installed[installedKey] = item.version;
      changed = true;
    }
  }

  if (changed) {
    await saveConfig({
      ...config,
      installed,
    });
  }
};
