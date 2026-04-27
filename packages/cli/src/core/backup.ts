import { copyFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileExists } from "./fs.js";

export const createBackupFile = async (path: string): Promise<string | null> => {
  if (!(await fileExists(path))) {
    return null;
  }

  const backupPath = `${path}.bak`;

  await mkdir(dirname(backupPath), { recursive: true });
  await copyFile(path, backupPath);

  return backupPath;
};