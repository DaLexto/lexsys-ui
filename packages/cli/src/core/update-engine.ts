import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileExists, filesAreEqual } from "./fs.js";
import { getRegistryTemplatesRoot } from "./installer.js";
import { findItem } from "./registry-resolver.js";
import { getCwd } from "./context.js";
import { isUpdateAvailable } from "./version.js";

export const checkItemFiles = async (
  name: string,
  componentsPath: string,
): Promise<void> => {
  const item = await findItem(name);

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
      getCwd(),
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
  const item = await findItem(name);

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
      getCwd(),
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

    if (isSameFile) {
      console.log(`- identical: ${targetPath}`);
      continue;
    }

    hasConflict = true;
    console.log(`- conflict (user modified): ${targetPath}`);
    continue;

  }

  if (hasConflict) {
    console.log(
      "Update finished with conflicts. Installed version was not changed.",
    );
    return false;
  }

  return true;
};

export const checkItemUpdate = async (
  name: string,
  installedVersion: string,
  dryRun: boolean,
  componentsPath: string,
  force: boolean,
): Promise<boolean> => {
  const item = await findItem(name);

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`);
    return false;
  }

  if (!isUpdateAvailable(installedVersion, item.version)) {
    console.log(`${item.canonicalName} is up to date (v${installedVersion}).`);
    return false;
  }

  console.log(
    `${item.canonicalName} can be updated: v${installedVersion} → v${item.version}`,
  );

  console.log("\nChanged file candidates:");

  for (const file of item.files) {
    console.log(`~ ${file}`);
  }

  if (dryRun) {
    console.log("Dry run: no files will be changed.");
  }

  console.log("Update plan:");
  if (force) {
    console.log(
      "- Force mode requested: conflicted files require backup before overwrite",
    );
  }

  if (force && dryRun) {
    console.log("- Dry run: backups would be created before forced overwrites");
  }
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
