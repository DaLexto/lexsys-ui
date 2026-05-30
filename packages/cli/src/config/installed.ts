export const normalizeInstalled = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string")
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.keys(value)
  }

  return []
}

export const isInstalled = (installed: string[], name: string): boolean => {
  const normalized = name.toLowerCase()

  return installed.some((entry) => entry.toLowerCase() === normalized)
}

export const addInstalled = (
  installed: string[],
  itemName: string,
): string[] => {
  if (isInstalled(installed, itemName)) {
    return installed
  }

  return [...installed, itemName]
}

export const removeInstalled = (
  installed: string[],
  itemName: string,
): string[] => {
  const normalized = itemName.toLowerCase()

  return installed.filter((entry) => entry.toLowerCase() !== normalized)
}

export const findInstalledKey = (
  installed: string[],
  name: string,
): string | undefined => {
  const normalized = name.toLowerCase()

  return installed.find((entry) => entry.toLowerCase() === normalized)
}
