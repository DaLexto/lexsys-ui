import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileExists, filesAreEqual } from "./fs.js";
import { getRegistryTemplatesRoot } from "./installer.js";
import { findItem } from "./registry-resolver.js";

export const checkItemFiles = async (
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

export const checkItemUpdate = async (
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