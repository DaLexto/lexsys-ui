import type { RegistryItem } from "@neurex/registry"

export interface RemoteRegistryManifest {
  version: string
  items: RegistryItem[]
}

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
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

const parseRemoteRegistry = (value: unknown): RemoteRegistryManifest => {
  if (Array.isArray(value)) {
    if (!value.every(isRegistryItem)) {
      throw new Error("Remote registry contains invalid registry items.")
    }

    return {
      version: "unknown",
      items: value,
    }
  }

  if (typeof value !== "object" || value === null) {
    throw new Error("Remote registry must be a JSON array or manifest object.")
  }

  const manifest = value as Partial<RemoteRegistryManifest>

  if (typeof manifest.version !== "string" || !Array.isArray(manifest.items)) {
    throw new Error("Remote registry manifest must contain version and items.")
  }

  if (!manifest.items.every(isRegistryItem)) {
    throw new Error("Remote registry contains invalid registry items.")
  }

  return {
    version: manifest.version,
    items: manifest.items,
  }
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
