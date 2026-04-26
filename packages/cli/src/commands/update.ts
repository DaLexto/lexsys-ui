import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { loadConfig, saveConfig } from "../core/config.js";
import { fileExists, filesAreEqual } from "../core/fs.js";
import { getRegistryTemplatesRoot } from "../core/installer.js";
import { findItem } from "../core/registry-resolver.js";

const isDryRun = (args: string[]): boolean => {
  return args.includes("--dry-run");
};

const removeFlags = (args: string[]): string[] => {
  return args.filter((arg) => arg !== "--dry-run" && arg !== "--force");
};

const isForce = (args: string[]): boolean => {
  return args.includes("--force");
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

const checkItemFiles = async (
  name: string,
  componentsPath: string,
): Promise<void> => {
  const item = findItem(name);

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`);
    return;
  }

  const registryTemplatesRoot = getRegistryTemplatesRoot();

  console.log(`File check for ${item.canonicalName}:`);

  for (const file of item.files) {
    const sourcePath = join(registryTemplatesRoot, file);
    const fileName = file.split("/").at(-1);

    if (!fileName) {
      console.log(`- invalid registry file path: ${file}`);
      continue;
    }

    const targetPath = join(
      process.cwd(),
      componentsPath,
      item.canonicalName,
      fileName,
    );

    if (!(await fileExists(targetPath))) {
      console.log(`- missing: ${targetPath}`);
      continue;
    }

    const isSameFile = await filesAreEqual(sourcePath, targetPath);

    if (isSameFile) {
      console.log(`- identical: ${targetPath}`);
      continue;
    }

    console.log(`- conflict: ${targetPath}`);
  }
};

const applySafeItemUpdate = async (
  name: string,
  componentsPath: string,
): Promise<boolean> => {
  const item = findItem(name);

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`);
    return false;
  }

  const registryTemplatesRoot = getRegistryTemplatesRoot();
  let hasConflict = false;

  console.log(`Applying safe update for ${item.canonicalName}:`);

  for (const file of item.files) {
    const sourcePath = join(registryTemplatesRoot, file);
    const fileName = file.split("/").at(-1);

    if (!fileName) {
      console.log(`- invalid registry file path: ${file}`);
      hasConflict = true;
      continue;
    }

    const targetPath = join(
      process.cwd(),
      componentsPath,
      item.canonicalName,
      fileName,
    );

    await mkdir(dirname(targetPath), { recursive: true });

    if (!(await fileExists(targetPath))) {
      await copyFile(sourcePath, targetPath);
      console.log(`- restored missing file: ${targetPath}`);
      continue;
    }

    const isSameFile = await filesAreEqual(sourcePath, targetPath);

    if (!isSameFile) {
      hasConflict = true;
      console.log(`- skipped conflict: ${targetPath}`);
      continue;
    }

    await copyFile(sourcePath, targetPath);
    console.log(`- updated file: ${targetPath}`);
  }

  if (hasConflict) {
    console.log(
      "Update finished with conflicts. Installed version was not changed.",
    );
    return false;
  }

  return true;
};

const checkItemUpdate = async (
  name: string,
  installedVersion: string,
  dryRun: boolean,
  componentsPath: string,
): Promise<boolean> => {
  const item = findItem(name);

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`);
    return false;
  }

  if (item.version === installedVersion) {
    console.log(`${item.canonicalName} is up to date (v${installedVersion}).`);
    return false;
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

  await checkItemFiles(name, componentsPath);

  if (dryRun) {
    return false;
  }

  return await applySafeItemUpdate(name, componentsPath);
};

export const runUpdate = async (args: string[]): Promise<void> => {
  let changed = false;

  const force = isForce(args);
  const dryRun = isDryRun(args);
  const targetArgs = removeFlags(args);

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
