import type { RegistryItem, RegistryStyle } from "@dalexto/lexsys-registry"

export interface RemoteRegistryManifest {
  version: string
  items: RegistryItem[]
  styles?: RegistryStyle[]
}

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

const isRegistryStyle = (value: unknown): value is RegistryStyle => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const style = value as Partial<RegistryStyle>

  return (
    typeof style.name === "string" &&
    typeof style.version === "string" &&
    Array.isArray(style.files) &&
    style.files.every((file) => {
      return (
        typeof file === "object" &&
        file !== null &&
        typeof file.path === "string" &&
        typeof file.target === "string"
      )
    })
  )
}

const isRegistryItem = (value: unknown): value is RegistryItem => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const item = value as Partial<RegistryItem>

  return (
    typeof item.name === "string" &&
    typeof item.canonicalName === "string" &&
    typeof item.version === "string" &&
    typeof item.type === "string" &&
    typeof item.category === "string" &&
    Array.isArray(item.aliases) &&
    isStringArray(item.files) &&
    isStringArray(item.dependencies) &&
    isStringArray(item.registryDependencies) &&
    isStringArray(item.utilities) &&
    isStringArray(item.styles) &&
    typeof item.target === "string"
  )
}

const findInvalidRegistryItemIndex = (items: unknown[]): number => {
  return items.findIndex((item) => {
    return !isRegistryItem(item)
  })
}

const parseRegistryItems = (items: unknown[]): RegistryItem[] => {
  const invalidIndex = findInvalidRegistryItemIndex(items)

  if (invalidIndex !== -1) {
    throw new Error(
      `Remote registry contains invalid registry item at index ${invalidIndex}.`,
    )
  }

  return items as RegistryItem[]
}

const parseRegistryStyles = (styles: unknown[]): RegistryStyle[] => {
  const invalidIndex = styles.findIndex((style) => {
    return !isRegistryStyle(style)
  })

  if (invalidIndex !== -1) {
    throw new Error(
      `Remote registry contains invalid style entry at index ${invalidIndex}.`,
    )
  }

  return styles as RegistryStyle[]
}

/**
 * Parses a remote registry JSON payload into a manifest object.
 *
 * Accepts either:
 * - a manifest object `{ version, items, styles? }`
 * - a legacy bare array of registry items (version becomes `"unknown"`)
 */
export const parseRemoteRegistry = (value: unknown): RemoteRegistryManifest => {
  if (Array.isArray(value)) {
    return {
      version: "unknown",
      items: parseRegistryItems(value),
    }
  }

  if (typeof value !== "object" || value === null) {
    throw new Error("Remote registry must be a JSON array or manifest object.")
  }

  const manifest = value as Partial<RemoteRegistryManifest>

  if (typeof manifest.version !== "string" || !Array.isArray(manifest.items)) {
    throw new Error("Remote registry manifest must contain version and items.")
  }

  const parsed: RemoteRegistryManifest = {
    version: manifest.version,
    items: parseRegistryItems(manifest.items),
  }

  if (manifest.styles !== undefined) {
    if (!Array.isArray(manifest.styles)) {
      throw new Error("Remote registry manifest styles must be an array.")
    }

    parsed.styles = parseRegistryStyles(manifest.styles)
  }

  return parsed
}

export const fetchRemoteRegistry = async (
  url: string,
): Promise<RemoteRegistryManifest> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Remote registry responded with HTTP ${response.status}`)
  }

  const data: unknown = await response.json()

  return parseRemoteRegistry(data)
}
