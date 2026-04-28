import type { RegistryItem } from "./registry.types.js"

export const validateRegistry = (items: RegistryItem[]): void => {
  const availableNames = new Set(items.map((item) => item.name))
  const usedLookupKeys = new Map<string, string>()

  for (const item of items) {
    const lookupKeys = [item.name, item.canonicalName, ...item.aliases]

    for (const key of lookupKeys) {
      const normalizedKey = key.toLowerCase()
      const existingItemName = usedLookupKeys.get(normalizedKey)

      if (existingItemName && existingItemName !== item.name) {
        throw new Error(
          `Registry lookup key "${key}" is used by both "${existingItemName}" and "${item.name}"`,
        )
      }

      usedLookupKeys.set(normalizedKey, item.name)
    }

    for (const dependency of item.registryDependencies) {
      if (!availableNames.has(dependency)) {
        throw new Error(
          `Registry item "${item.name}" references missing registry dependency: ${dependency}`,
        )
      }
    }
  }
}
