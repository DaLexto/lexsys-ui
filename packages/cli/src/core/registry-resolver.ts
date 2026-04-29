import { CliError } from "./cli-error.js"
import type { RegistryItem } from "@neurex/registry"
import {
  registryStyles as registryStyleDefinitions,
  validateRegistryItem,
} from "@neurex/registry"
import { getRegistryItems } from "./registry-provider.js"
import type { ResolvedRegistryStyle } from "./registry-types.js"
import { findClosestValue } from "./suggestions.js"

const registryStyles =
  registryStyleDefinitions as unknown as readonly ResolvedRegistryStyle[]

interface RegistryResolverOptions {
  fallback?: boolean
}

const normalizeName = (name: string): string => {
  return name.toLowerCase()
}

export const findItem = async (
  name: string,
  options: RegistryResolverOptions = {},
): Promise<RegistryItem | undefined> => {
  const items = await getRegistryItems(options)
  const normalizedName = normalizeName(name)

  const item = items.find(
    (registryItem) =>
      normalizeName(registryItem.name) === normalizedName ||
      normalizeName(registryItem.canonicalName) === normalizedName ||
      registryItem.aliases.some(
        (alias) => normalizeName(alias) === normalizedName,
      ),
  )

  if (item) {
    validateRegistryItem(item)
  }

  return item
}

export const resolveRegistryItems = async (
  names: string[],
  options: RegistryResolverOptions = {},
): Promise<RegistryItem[]> => {
  const items = await getRegistryItems(options)
  const resolved = new Map<string, RegistryItem>()

  const findLocalItem = (name: string): RegistryItem | undefined => {
    const normalizedName = normalizeName(name)

    return items.find(
      (item) =>
        normalizeName(item.name) === normalizedName ||
        normalizeName(item.canonicalName) === normalizedName ||
        item.aliases.some((alias) => normalizeName(alias) === normalizedName),
    )
  }

  const visit = (name: string): void => {
    const item = findLocalItem(name)

    if (!item) {
      const availableNames = items.flatMap((registryItem) => [
        registryItem.name,
        registryItem.canonicalName,
        ...registryItem.aliases,
      ])

      const suggestion = findClosestValue(name, availableNames)

      throw new CliError(
        suggestion
          ? `Component "${name}" not found. Did you mean "${suggestion}"?`
          : `Component "${name}" not found.`,
      )
    }

    validateRegistryItem(item)

    const key = normalizeName(item.canonicalName)

    if (resolved.has(key)) {
      return
    }

    resolved.set(key, item)

    for (const dependency of item.registryDependencies) {
      visit(dependency)
    }
  }

  for (const name of names) {
    visit(name)
  }

  return Array.from(resolved.values())
}

export const collectDependencies = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.dependencies)))
}

export const collectUtilities = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.utilities)))
}

export const collectStyles = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.styles)))
}

export const resolveRegistryStyles = (
  names: string[],
): ResolvedRegistryStyle[] => {
  return names.map((name) => {
    const style = registryStyles.find((registryStyle) => {
      return normalizeName(registryStyle.name) === normalizeName(name)
    })

    if (!style) {
      throw new CliError(`Style "${name}" not found in registry.`)
    }

    return style
  })
}
