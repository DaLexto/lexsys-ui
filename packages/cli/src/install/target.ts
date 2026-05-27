import type { RegistryItem } from "@dalexto/lexsys-registry"
import { join } from "node:path"
import type { LexsysConfig } from "../config/config.js"

const toPosixPath = (value: string): string => {
  return value.replace(/\\/g, "/")
}

export const resolveComponentsRoot = (config: LexsysConfig): string => {
  return config.paths.components
}

export const resolveItemInstallTarget = (
  config: LexsysConfig,
  item: RegistryItem,
): string => {
  return toPosixPath(join(config.paths.components, item.canonicalName))
}
