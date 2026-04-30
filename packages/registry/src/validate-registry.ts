import type {
  RegistryItem,
  RegistryStyle,
  RegistryUtility,
} from "./registry.types.js"
import { validateRegistryItem } from "./validate-registry-item.js"

interface ValidateRegistryOptions {
  styles?: RegistryStyle[]
  utilities?: RegistryUtility[]
  templateFiles?: string[]
}

const isEmpty = (value: string): boolean => {
  return !value || !value.trim()
}

const isSafeRelativePath = (value: string): boolean => {
  return (
    !isEmpty(value) &&
    !value.includes("\\") &&
    !value.startsWith("/") &&
    !/^[a-z]:/iu.test(value) &&
    !value.split("/").includes("..")
  )
}

const validateSafePath = (value: string, message: string): void => {
  if (!isSafeRelativePath(value)) {
    throw new Error(message)
  }
}

const isSafePackageName = (value: string): boolean => {
  return /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/iu.test(value)
}

const validateRemoteUrl = (
  value: string | undefined,
  itemName: string,
  filePath: string,
): void => {
  if (value === undefined) {
    return
  }

  if (isEmpty(value)) {
    throw new Error(
      `Registry item "${itemName}" has invalid remote file URL: ${filePath}`,
    )
  }

  let url: URL

  try {
    url = new URL(value)
  } catch {
    throw new Error(
      `Registry item "${itemName}" has invalid remote file URL: ${filePath}`,
    )
  }

  if (url.protocol !== "https:") {
    throw new Error(
      `Registry item "${itemName}" remote file URL must use HTTPS: ${filePath}`,
    )
  }
}

const validateUniqueValues = (
  values: string[],
  getMessage: (value: string) => string,
): void => {
  const used = new Set<string>()

  for (const value of values) {
    const normalized = value.toLowerCase()

    if (used.has(normalized)) {
      throw new Error(getMessage(value))
    }

    used.add(normalized)
  }
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
  const availableUtilities = new Set(
    (options.utilities ?? []).map((utility) => utility.name),
  )
  const availableTemplateFiles = new Set(options.templateFiles ?? [])
  const usedLookupKeys = new Map<string, string>()
  const usedStyleNames = new Set<string>()
  const usedStyleTargets = new Set<string>()
  const usedUtilityNames = new Set<string>()
  const usedUtilityTargets = new Set<string>()

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

    const normalizedStyleName = style.name.toLowerCase()

    if (usedStyleNames.has(normalizedStyleName)) {
      throw new Error(`Registry style "${style.name}" is duplicated`)
    }

    usedStyleNames.add(normalizedStyleName)

    for (const file of style.files) {
      validateSafePath(
        file.path,
        `Registry style "${style.name}" has invalid file path`,
      )

      validateSafePath(
        file.target,
        `Registry style "${style.name}" has invalid target`,
      )

      if (
        availableTemplateFiles.size > 0 &&
        !availableTemplateFiles.has(file.path)
      ) {
        throw new Error(
          `Registry style "${style.name}" references missing template file: ${file.path}`,
        )
      }

      const normalizedTarget = file.target.toLowerCase()

      if (usedStyleTargets.has(normalizedTarget)) {
        throw new Error(
          `Registry style target "${file.target}" is used more than once`,
        )
      }

      usedStyleTargets.add(normalizedTarget)
    }
  }

  for (const utility of options.utilities ?? []) {
    if (isEmpty(utility.name)) {
      throw new Error("Registry utility has invalid name")
    }

    validateSafePath(
      utility.path,
      `Registry utility "${utility.name}" has invalid file path`,
    )

    validateSafePath(
      utility.target,
      `Registry utility "${utility.name}" has invalid target`,
    )

    const normalizedUtilityName = utility.name.toLowerCase()

    if (usedUtilityNames.has(normalizedUtilityName)) {
      throw new Error(`Registry utility "${utility.name}" is duplicated`)
    }

    usedUtilityNames.add(normalizedUtilityName)

    const normalizedUtilityTarget = utility.target.toLowerCase()

    if (usedUtilityTargets.has(normalizedUtilityTarget)) {
      throw new Error(
        `Registry utility target "${utility.target}" is used more than once`,
      )
    }

    usedUtilityTargets.add(normalizedUtilityTarget)

    if (
      availableTemplateFiles.size > 0 &&
      !availableTemplateFiles.has(utility.path)
    ) {
      throw new Error(
        `Registry utility "${utility.name}" references missing template file: ${utility.path}`,
      )
    }
  }

  for (const item of items) {
    validateRegistryItem(item)

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

    for (const dependency of item.dependencies) {
      if (!isSafePackageName(dependency)) {
        throw new Error(
          `Registry item "${item.name}" has invalid dependency: ${dependency}`,
        )
      }
    }

    validateUniqueValues(
      item.aliases,
      (alias) => `Registry item "${item.name}" has duplicated alias: ${alias}`,
    )

    for (const alias of item.aliases) {
      const normalizedAlias = alias.toLowerCase()

      if (
        normalizedAlias === item.name.toLowerCase() ||
        normalizedAlias === item.canonicalName.toLowerCase()
      ) {
        throw new Error(
          `Registry item "${item.name}" has alias that duplicates its name: ${alias}`,
        )
      }
    }

    for (const file of item.files) {
      validateSafePath(
        file,
        `Registry item "${item.name}" has invalid file entry`,
      )

      if (
        availableTemplateFiles.size > 0 &&
        !availableTemplateFiles.has(file)
      ) {
        throw new Error(
          `Registry item "${item.name}" references missing template file: ${file}`,
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
      validateSafePath(
        remoteFile.path,
        `Registry item "${item.name}" has invalid remote file path`,
      )

      if (!item.files.includes(remoteFile.path)) {
        throw new Error(
          `Registry item "${item.name}" remote file is not declared in files: ${remoteFile.path}`,
        )
      }

      validateRemoteUrl(remoteFile.remoteUrl, item.name, remoteFile.path)
    }

    validateUniqueValues(
      (item.remoteFiles ?? []).map((remoteFile) => remoteFile.path),
      (path) =>
        `Registry item "${item.name}" has duplicated remote file entry: ${path}`,
    )
  }
}
