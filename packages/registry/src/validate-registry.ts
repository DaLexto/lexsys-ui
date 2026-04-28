import type { RegistryItem, RegistryStyle } from "./registry.types.js"

interface ValidateRegistryOptions {
  styles?: RegistryStyle[]
  utilities?: string[]
}

const isEmpty = (value: string): boolean => {
  return !value || !value.trim()
}

export const validateRegistry = (
  items: RegistryItem[],
  options: ValidateRegistryOptions = {},
): void => {
  const shouldValidateStyles = options.styles !== undefined
  const shouldValidateUtilities = options.utilities !== undefined
  const availableNames = new Set(items.map((item) => item.name))
  const availableStyles = new Set(
    (options.styles ?? []).map((style) => style.name),
  )
  const availableUtilities = new Set(options.utilities ?? [])
  const usedLookupKeys = new Map<string, string>()

  for (const style of options.styles ?? []) {
    if (isEmpty(style.name)) {
      throw new Error("Registry style has invalid name")
    }

    if (isEmpty(style.version)) {
      throw new Error(`Registry style "${style.name}" has invalid version`)
    }

    if (!style.files.length) {
      throw new Error(
        `Registry style "${style.name}" must define at least one file`,
      )
    }

    for (const file of style.files) {
      if (isEmpty(file.path)) {
        throw new Error(`Registry style "${style.name}" has invalid file path`)
      }

      if (isEmpty(file.target)) {
        throw new Error(`Registry style "${style.name}" has invalid target`)
      }
    }
  }

  for (const item of items) {
    const lookupKeys = [item.name, item.canonicalName, ...item.aliases]

    for (const key of lookupKeys) {
      if (isEmpty(key)) {
        throw new Error(`Registry item "${item.name}" has invalid lookup key`)
      }

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

    if (shouldValidateUtilities) {
      for (const utility of item.utilities) {
        if (!availableUtilities.has(utility)) {
          throw new Error(
            `Registry item "${item.name}" references missing utility: ${utility}`,
          )
        }
      }
    }

    if (shouldValidateStyles) {
      for (const style of item.styles) {
        if (!availableStyles.has(style)) {
          throw new Error(
            `Registry item "${item.name}" references missing style: ${style}`,
          )
        }
      }
    }

    for (const remoteFile of item.remoteFiles ?? []) {
      if (isEmpty(remoteFile.path)) {
        throw new Error(
          `Registry item "${item.name}" has invalid remote file path`,
        )
      }

      if (!item.files.includes(remoteFile.path)) {
        throw new Error(
          `Registry item "${item.name}" remote file is not declared in files: ${remoteFile.path}`,
        )
      }

      if (remoteFile.remoteUrl !== undefined && isEmpty(remoteFile.remoteUrl)) {
        throw new Error(
          `Registry item "${item.name}" has invalid remote file URL: ${remoteFile.path}`,
        )
      }
    }
  }
}
