import { getInstallLayer } from "./install-layer.js"
import type { RegistryItem } from "./registry.types.js"

const COMPOSITION_IMPORT_RE =
  /from "\.\.\/\.\.\/(primitives|blocks)\/([A-Za-z0-9]+)\//g

export const toRegistryItemName = (canonicalName: string): string => {
  return canonicalName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export const extractRegistryCompositionImports = (source: string): string[] => {
  const names = new Set<string>()

  for (const match of source.matchAll(COMPOSITION_IMPORT_RE)) {
    names.add(toRegistryItemName(match[2]))
  }

  return [...names]
}

export const validateRegistryTemplateImports = (
  items: RegistryItem[],
  readTemplate: (templatePath: string) => string,
): string[] => {
  const errors: string[] = []
  const itemsByName = new Map(items.map((item) => [item.name, item]))

  for (const item of items) {
    const layer = getInstallLayer(item)

    if (layer !== "block" && layer !== "template") {
      continue
    }

    const declared = new Set(item.registryDependencies)

    for (const file of item.files) {
      if (!file.endsWith(".tsx")) {
        continue
      }

      const source = readTemplate(file)

      for (const importedName of extractRegistryCompositionImports(source)) {
        if (!declared.has(importedName)) {
          errors.push(
            `Registry "${item.name}" template "${file}" imports "${importedName}" but registryDependencies omits it`,
          )
        }

        const dependency = itemsByName.get(importedName)
        const dependencyLayer = dependency ? getInstallLayer(dependency) : null

        if (layer === "block" && dependencyLayer === "template") {
          errors.push(
            `Registry block "${item.name}" template "${file}" imports template "${importedName}" directly`,
          )
        }
      }
    }
  }

  return errors
}
