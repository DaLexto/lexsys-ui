import type { RegistryItem } from "./registry.types.js"

export type InstallLayer = "primitive" | "block" | "template"

export const getInstallLayer = (item: RegistryItem): InstallLayer | null => {
  if (item.type === "component") {
    return "primitive"
  }

  if (item.type !== "block") {
    return null
  }

  const firstFile = item.files[0] ?? ""

  if (firstFile.startsWith("blocks/")) {
    return "block"
  }

  if (firstFile.startsWith("templates/")) {
    return "template"
  }

  return null
}

export const getDependencyInstallLayer = (
  item: RegistryItem,
): InstallLayer | null => {
  return getInstallLayer(item)
}
