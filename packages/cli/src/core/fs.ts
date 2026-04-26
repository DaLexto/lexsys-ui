import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname } from "node:path";

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const filesAreEqual = async (
  sourcePath: string,
  targetPath: string,
): Promise<boolean> => {
  const sourceContent = await readFile(sourcePath, "utf-8");
  const targetContent = await readFile(targetPath, "utf-8");

  return sourceContent === targetContent;
};

export const writeFileIfMissing = async (
  path: string,
  content: string,
): Promise<void> => {
  if (await fileExists(path)) {
    console.log(`Skipped existing file: ${path}`);
    return;
  }

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf-8");
  console.log(`Created: ${path}`);
};