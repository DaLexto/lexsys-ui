import type { RegistryItem } from "@neurex/registry"
import { join } from "node:path"
import type { NeurexConfig } from "./config.js"

const toPosixPath = (value: string): string => {
  return value.replace(/\\/g, "/")
}

export const resolveComponentsRoot = (config: NeurexConfig): string => {
  return config.paths.components
}

export const resolveItemInstallTarget = (
  config: NeurexConfig,
  item: RegistryItem,
): string => {
  return toPosixPath(join(config.paths.components, item.canonicalName))
}
