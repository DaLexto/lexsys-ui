import { loadConfig } from "../core/config.js";
import { findItem } from "../core/registry-resolver.js";

const isDryRun = (args: string[]): boolean => {
  return args.includes("--dry-run");
};

const removeFlags = (args: string[]): string[] => {
  return args.filter((arg) => arg !== "--dry-run");
};

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

const checkItemUpdate = (
  name: string,
  installedVersion: string,
  dryRun: boolean,
): void => {
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

  if (dryRun) {
    console.log("Dry run: no files will be changed.");
  }

  console.log("Update plan:");
  console.log(`- Check installed files for ${item.canonicalName}`);
  console.log("- Compare existing files with registry templates");
  console.log("- Report conflicts before writing changes");
  console.log("- Never overwrite user-modified files silently");
};

export const runUpdate = async (args: string[]): Promise<void> => {
  const dryRun = isDryRun(args);
  const targetArgs = removeFlags(args);

  const config = await loadConfig();
  const installed = config.installed ?? {};

  if (!Object.keys(installed).length) {
    console.log("No Neurex UI components are currently tracked.");
    return;
  }

  if (args.includes("--all")) {
    console.log("Checking installed Neurex UI components:\n");

    for (const [name, version] of Object.entries(installed)) {
      checkItemUpdate(name, version, dryRun);
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

    checkItemUpdate(installedKey, installed[installedKey], dryRun);
  }
};