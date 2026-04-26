import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileExists } from "./fs.js";

export interface NeurexConfig {
  componentsPath: string;
  utilitiesPath: string;
  stylesPath: string;
  installed?: Record<string, string>;
}

export const defaultConfig: NeurexConfig = {
  componentsPath: "components/ui",
  utilitiesPath: "lib/neurex",
  stylesPath: "styles/neurex",
  installed: {},
};

export const getConfigPath = (): string => {
  return join(process.cwd(), "neurex.config.json");
};

export const loadConfig = async (): Promise<NeurexConfig> => {
  const configPath = getConfigPath();

  if (!(await fileExists(configPath))) {
    return defaultConfig;
  }

  const content = await readFile(configPath, "utf-8");
  const parsed = JSON.parse(content) as Partial<NeurexConfig>;

  return {
    ...defaultConfig,
    ...parsed,
  };
};

export const saveConfig = async (config: NeurexConfig): Promise<void> => {
  const configPath = getConfigPath();

  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
};