/**
 * registry-composition-imports.ts
 *
 * Infer registry item names from composition imports in template sources.
 * Keep in sync with scripts/lib/registry-composition-imports.mjs.
 */

const COMPOSITION_IMPORT_PATTERNS = [
  /from "\.\.\/\.\.\/(primitives|blocks|templates)\/([A-Za-z0-9]+)\//g,
  /from "@\/components\/(primitives|blocks|templates)\/([A-Za-z0-9]+)/g,
] as const

export const toRegistryItemName = (canonicalName: string): string => {
  return canonicalName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export const extractRegistryCompositionImports = (source: string): string[] => {
  const names = new Set<string>()

  for (const pattern of COMPOSITION_IMPORT_PATTERNS) {
    for (const match of source.matchAll(pattern)) {
      names.add(toRegistryItemName(match[2]))
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b))
}

export const getRegistryDependenciesFromTemplateContents = (
  templateContents: string[],
): string[] => {
  const names = new Set<string>()

  for (const content of templateContents) {
    for (const name of extractRegistryCompositionImports(content)) {
      names.add(name)
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b))
}
