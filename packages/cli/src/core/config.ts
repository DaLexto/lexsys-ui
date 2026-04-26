import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileExists } from "./fs.js";

export interface NeurexConfig {
  componentsPath: string;
  utilitiesPath: string;
  stylesPath: string;
}

export const defaultConfig: NeurexConfig = {
  componentsPath: "components/ui",
  utilitiesPath: "lib/neurex",
  stylesPath: "styles/neurex",
};

export const loadConfig = async (): Promise<NeurexConfig> => {
  const configPath = join(process.cwd(), "neurex.config.json");

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