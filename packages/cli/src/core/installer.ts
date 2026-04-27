import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryItem } from "@neurex-ui/registry";
import type { NeurexConfig } from "./config.js";
import { fileExists, filesAreEqual } from "./fs.js";
import { getCwd } from "./context.js";
import { fetchRemoteFile } from "./remote-files.js";
import { hashesAreEqual } from "./hash.js";
import { validateTemplateFiles } from "./template-validator.js";

const cliFilePath = fileURLToPath(import.meta.url);
const cliDistDir = dirname(cliFilePath);
const repoRoot = join(cliDistDir, "..", "..", "..", "..");

const registryTemplatesRoot = join(
  repoRoot,
  "packages",
  "registry",
  "templates",
);

const sharedTemplatesRoot = join(registryTemplatesRoot, "shared");

export const getRegistryTemplatesRoot = (): string => {
  return registryTemplatesRoot;
};

export const ensureProjectStructure = async (
  config: NeurexConfig,
): Promise<void> => {
  await mkdir(join(getCwd(), config.componentsPath), { recursive: true });
  await mkdir(join(getCwd(), config.utilitiesPath), { recursive: true });
  await mkdir(join(getCwd(), config.stylesPath), { recursive: true });
};

export const installUtilities = async (
  utilities: string[],
  config: NeurexConfig,
): Promise<void> => {
  for (const utility of utilities) {
    if (utility !== "cn") {
      console.log(`Unknown utility "${utility}", skipping.`);
      continue;
    }

    const sourcePath = join(sharedTemplatesRoot, "utils", "cn.ts");
    const targetPath = join(getCwd(), config.utilitiesPath, "cn.ts");

    await mkdir(dirname(targetPath), { recursive: true });

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath);

      if (isSameFile) {
        console.log(`Skipped identical utility: ${targetPath}`);
        continue;
      }

      console.log(
        `Conflict: utility already exists and differs: ${targetPath}`,
      );
      continue;
    }

    await copyFile(sourcePath, targetPath);
    console.log(`Created utility: ${targetPath}`);
  }
};

export const installItemFiles = async (
  item: RegistryItem,
  config: NeurexConfig,
): Promise<void> => {
  console.log(`Installing ${item.canonicalName}...\n`);

  await validateTemplateFiles(item);

  for (const file of item.files) {
    const remoteFile = item.remoteFiles?.find(
      (registryFile) => registryFile.path === file && registryFile.remoteUrl,
    );

    const sourcePath = join(registryTemplatesRoot, file);
    const fileName = file.split("/").at(-1);

    if (!fileName) {
      console.log(`Invalid registry file path: ${file}`);
      process.exit(1);
    }

    const targetPath = join(
      getCwd(),
      config.componentsPath,
      item.canonicalName,
      fileName,
    );

    await mkdir(dirname(targetPath), { recursive: true });

    if (remoteFile?.remoteUrl) {
      console.log(`Fetching remote file: ${remoteFile.remoteUrl}`);

      const remoteContent = await fetchRemoteFile(remoteFile.remoteUrl);

      if (await fileExists(targetPath)) {
        const targetContent = await readFile(targetPath, "utf-8");

        if (hashesAreEqual(remoteContent, targetContent)) {
          console.log(`Skipped identical file: ${targetPath}`);
          continue;
        }

        console.log(`Conflict: file already exists and differs: ${targetPath}`);
        continue;
      }

      await writeFile(targetPath, remoteContent, "utf-8");
      console.log(`Created: ${targetPath}`);
      continue;
    }

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath);

      if (isSameFile) {
        console.log(`Skipped identical file: ${targetPath}`);
        continue;
      }

      console.log(`Conflict: file already exists and differs: ${targetPath}`);
      continue;
    }

    await copyFile(sourcePath, targetPath);
    console.log(`Created: ${targetPath}`);
  }

  console.log("\nDone.");
};
