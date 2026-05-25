import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileExists } from "../core/fs.js"
import { getCwd } from "../core/context.js"

export interface LexsysPathsConfig {
  components: string
  utilities: string
  styles: string
}

export interface LexsysAliasesConfig {
  components: string
  ui: string
  utils: string
  lib: string
  hooks: string
}

export interface LexsysConfig {
  style: "default"
  paths: LexsysPathsConfig
  aliases: LexsysAliasesConfig
  tailwind: LexsysTailwindConfig
  installed?: Record<string, string>
  registryUrl?: string | null
}

export interface LexsysTailwindConfig {
  version: "v4"
  css: string
}

const defaultPathsConfig: LexsysPathsConfig = {
  components: "src/components/ui",
  utilities: "src/lib",
  styles: "styles",
}

const defaultAliasesConfig: LexsysAliasesConfig = {
  components: "@/components/ui",
  ui: "@/components/ui",
  utils: "@/lib/utils",
  lib: "@/lib",
  hooks: "@/hooks",
}

const defaultTailwindConfig: LexsysTailwindConfig = {
  version: "v4",
  css: "src/style.css",
}

export const defaultConfig: LexsysConfig = {
  style: "default",
  paths: defaultPathsConfig,
  aliases: defaultAliasesConfig,
  tailwind: defaultTailwindConfig,
  installed: {},
  registryUrl: null,
}

export const getConfigPath = (): string => {
  return join(getCwd(), "lexsys.config.json")
}

export const loadConfig = async (): Promise<LexsysConfig> => {
  const configPath = getConfigPath()

  if (!(await fileExists(configPath))) {
    return defaultConfig
  }

  const content = await readFile(configPath, "utf-8")
  const parsed = JSON.parse(content) as Partial<LexsysConfig>

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

export const saveConfig = async (config: LexsysConfig): Promise<void> => {
  const configPath = getConfigPath()

  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8")
}
