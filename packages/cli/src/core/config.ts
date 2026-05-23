import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileExists } from "./fs.js"
import { getCwd } from "./context.js"

export interface NeurexPathsConfig {
  components: string
  utilities: string
  styles: string
}

export interface NeurexAliasesConfig {
  components: string
  ui: string
  utils: string
  lib: string
  hooks: string
}

export interface NeurexConfig {
  style: "default"
  paths: NeurexPathsConfig
  aliases: NeurexAliasesConfig
  tailwind: NeurexTailwindConfig
  installed?: Record<string, string>
  registryUrl?: string | null
}

export interface NeurexTailwindConfig {
  version: "v4"
  css: string
}

const defaultPathsConfig: NeurexPathsConfig = {
  components: "src/components/ui",
  utilities: "src/lib",
  styles: "styles",
}

const defaultAliasesConfig: NeurexAliasesConfig = {
  components: "@/components/ui",
  ui: "@/components/ui",
  utils: "@/lib/utils",
  lib: "@/lib",
  hooks: "@/hooks",
}

const defaultTailwindConfig: NeurexTailwindConfig = {
  version: "v4",
  css: "src/style.css",
}

export const defaultConfig: NeurexConfig = {
  style: "default",
  paths: defaultPathsConfig,
  aliases: defaultAliasesConfig,
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
    paths: {
      ...defaultPathsConfig,
      ...parsed.paths,
    },
    aliases: {
      ...defaultAliasesConfig,
      ...parsed.aliases,
    },
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
