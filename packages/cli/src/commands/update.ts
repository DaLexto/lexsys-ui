import { loadConfig } from "../core/config.js";
import { findItem } from "../core/registry-resolver.js";

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

const checkItemUpdate = (name: string, installedVersion: string): void => {
  const item = findItem(name);

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`);
    return;
  }

  if (item.version === installedVersion) {
    console.log(`${item.canonicalName} is up to date (v${installedVersion}).`);
    return;
  }

  console.log(
    `${item.canonicalName} can be updated: v${installedVersion} → v${item.version}`,
  );
};

export const runUpdate = async (args: string[]): Promise<void> => {
  const config = await loadConfig();
  const installed = config.installed ?? {};

  if (!Object.keys(installed).length) {
    console.log("No Neurex UI components are currently tracked.");
    return;
  }

  if (args.includes("--all")) {
    console.log("Checking installed Neurex UI components:\n");

    for (const [name, version] of Object.entries(installed)) {
      checkItemUpdate(name, version);
    }

    return;
  }

  if (!args.length) {
    console.log("Please specify components to update or use --all.");
    return;
  }

  for (const name of args) {
    const installedKey = resolveInstalledKey(name, installed);

    if (!installedKey) {
      console.log(`Component "${name}" is not tracked as installed.`);
      continue;
    }

    checkItemUpdate(installedKey, installed[installedKey]);
  }
};
