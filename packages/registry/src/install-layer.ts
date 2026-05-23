import type { RegistryItem } from "./registry.types.js"

export type InstallLayer = "primitive" | "block" | "template"

export const getInstallLayer = (item: RegistryItem): InstallLayer | null => {
  if (item.type === "component") {
    return item.target.includes("/components/primitives/") ? "primitive" : null
  }

  if (item.type !== "block") {
    return null
  }

  if (item.target.includes("/components/blocks/")) {
    return "block"
  }

  if (item.target.includes("/components/templates/")) {
    return "template"
  }

  return null
}

export const getDependencyInstallLayer = (
  item: RegistryItem,
): InstallLayer | null => {
  return getInstallLayer(item)
}
