import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileExists } from "./fs.js"
import { getCwd } from "./context.js"

export interface NeurexConfig {
  componentsPath: string
  utilitiesPath: string
  stylesPath: string
  tailwind: NeurexTailwindConfig
  installed?: Record<string, string>
  registryUrl?: string | null
}

export interface NeurexTailwindConfig {
  version: "v4"
  css: string
}

const defaultTailwindConfig: NeurexTailwindConfig = {
  version: "v4",
  css: "src/style.css",
}

export const defaultConfig: NeurexConfig = {
  componentsPath: "src/components/ui",
  utilitiesPath: "lib/neurex",
  stylesPath: "styles/neurex",
  tailwind: defaultTailwindConfig,
  installed: {},
  registryUrl: null,
}

export const getConfigPath = (): string => {
  return join(getCwd(), "neurex.config.json")
}

export const loadConfig = async (): Promise<NeurexConfig> => {
  const configPath = getConfigPath()

  if (!(await fileExists(configPath))) {
    return defaultConfig
  }

  const content = await readFile(configPath, "utf-8")
  const parsed = JSON.parse(content) as Partial<NeurexConfig>

  return {
    ...defaultConfig,
    ...parsed,
    tailwind: {
      ...defaultTailwindConfig,
      ...parsed.tailwind,
    },
  }
}

export const saveConfig = async (config: NeurexConfig): Promise<void> => {
  const configPath = getConfigPath()

  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8")
}
