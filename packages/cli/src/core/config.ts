import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileExists } from "./fs.js"
import { getCwd } from "./context.js"

export interface NeurexPathsConfig {
  primitives: string
  blocks: string
  templates: string
  utilities: string
  styles: string
}

export interface NeurexAliasesConfig {
  primitives: string
  blocks: string
  templates: string
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
  primitives: "src/components/primitives",
  blocks: "src/components/blocks",
  templates: "src/components/templates",
  utilities: "src/lib",
  styles: "styles",
}

const defaultAliasesConfig: NeurexAliasesConfig = {
  primitives: "@/components/primitives",
  blocks: "@/components/blocks",
  templates: "@/components/templates",
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

const migrateLegacyConfig = (
  parsed: Record<string, unknown>,
): Partial<NeurexConfig> => {
  const legacyComponentsPath =
    typeof parsed.componentsPath === "string"
      ? parsed.componentsPath
      : undefined
  const legacyUtilitiesPath =
    typeof parsed.utilitiesPath === "string" ? parsed.utilitiesPath : undefined
  const legacyStylesPath =
    typeof parsed.stylesPath === "string" ? parsed.stylesPath : undefined
  const legacyAliases =
    typeof parsed.aliases === "object" && parsed.aliases !== null
      ? (parsed.aliases as Record<string, string>)
      : undefined
  const parsedPaths =
    typeof parsed.paths === "object" && parsed.paths !== null
      ? (parsed.paths as Partial<NeurexPathsConfig>)
      : undefined

  const paths: NeurexPathsConfig = {
    ...defaultPathsConfig,
    ...parsedPaths,
  }

  if (legacyComponentsPath && !parsedPaths?.primitives) {
    paths.primitives = legacyComponentsPath.replace(/\/ui\/?$/u, "/primitives")
  }

  if (legacyUtilitiesPath && !parsedPaths?.utilities) {
    paths.utilities = legacyUtilitiesPath
  }

  if (legacyStylesPath && !parsedPaths?.styles) {
    paths.styles = legacyStylesPath
  }

  const aliases: NeurexAliasesConfig = {
    ...defaultAliasesConfig,
    ...(legacyAliases?.components
      ? { primitives: `${legacyAliases.components}/primitives` }
      : {}),
    ...(legacyAliases?.ui
      ? { primitives: legacyAliases.ui.replace(/\/ui\/?$/u, "/primitives") }
      : {}),
    ...(typeof parsed.aliases === "object" && parsed.aliases !== null
      ? (parsed.aliases as Partial<NeurexAliasesConfig>)
      : {}),
  }

  return {
    ...(parsed as Partial<NeurexConfig>),
    aliases,
    paths,
  }
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
  const parsed = JSON.parse(content) as Record<string, unknown>
  const migrated = migrateLegacyConfig(parsed)

  return {
    ...defaultConfig,
    ...migrated,
    paths: {
      ...defaultPathsConfig,
      ...migrated.paths,
    },
    aliases: {
      ...defaultAliasesConfig,
      ...migrated.aliases,
    },
    tailwind: {
      ...defaultTailwindConfig,
      ...migrated.tailwind,
    },
  }
}

export const saveConfig = async (config: NeurexConfig): Promise<void> => {
  const configPath = getConfigPath()

  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8")
}
