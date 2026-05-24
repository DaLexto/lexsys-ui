import type {
  RegistryItem,
  RegistryStyle,
  RegistryUtility,
} from "./registry.types.js"
import { validateRegistryItem } from "./validate-registry-item.js"
import { validateRegistryComposition } from "./validate-registry-composition.js"
import { validateRegistryTemplateImports } from "./validate-registry-template-imports.js"

interface ValidateRegistryOptions {
  styles?: RegistryStyle[]
  utilities?: RegistryUtility[]
  templateFiles?: string[]
  readTemplateFile?: (templatePath: string) => string
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

const isSafePackageName = (value: string): boolean => {
  return /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/iu.test(value)
}

export const validateRegistry = (
  items: RegistryItem[],
  options: ValidateRegistryOptions = {},
): void => {
  const errors: string[] = []
  const addError = (msg: string) => errors.push(msg)

  const shouldValidateStyles = options.styles !== undefined
  const shouldValidateUtilities = options.utilities !== undefined

  const availableNames = new Set(items.map((item) => item.name))
  const availableStyles = new Set((options.styles ?? []).map((s) => s.name))
  const availableUtilities = new Set(
    (options.utilities ?? []).map((u) => u.name),
  )
  const availableTemplateFiles = new Set(options.templateFiles ?? [])

  const usedLookupKeys = new Map<string, string>()
  const usedStyleNames = new Set<string>()
  const usedStyleTargets = new Set<string>()
  const usedUtilityNames = new Set<string>()
  const usedUtilityTargets = new Set<string>()

  // --- 1. VALIDATE STYLES ---
  for (const style of options.styles ?? []) {
    if (isEmpty(style.name)) {
      addError("Registry style has an invalid name")
      continue
    }

    if (isEmpty(style.version)) {
      addError(`Registry style "${style.name}" has an invalid version`)
    }

    if (!style.files.length) {
      addError(`Registry style "${style.name}" must define at least one file`)
    }

    const normalizedStyleName = style.name.toLowerCase()
    if (usedStyleNames.has(normalizedStyleName)) {
      addError(`Registry style "${style.name}" is duplicated`)
    }
    usedStyleNames.add(normalizedStyleName)

    for (const file of style.files) {
      if (!isSafeRelativePath(file.path)) {
        addError(
          `Registry style "${style.name}" has invalid file path: ${file.path}`,
        )
      }
      if (!isSafeRelativePath(file.target)) {
        addError(
          `Registry style "${style.name}" has invalid target: ${file.target}`,
        )
      }

      if (
        availableTemplateFiles.size > 0 &&
        !availableTemplateFiles.has(file.path)
      ) {
        addError(
          `Registry style "${style.name}" references missing template file: ${file.path}`,
        )
      }

      const normalizedTarget = file.target.toLowerCase()
      if (usedStyleTargets.has(normalizedTarget)) {
        addError(
          `Registry style target "${file.target}" is used more than once (in style "${style.name}")`,
        )
      }
      usedStyleTargets.add(normalizedTarget)
    }
  }

  // --- 2. VALIDATE UTILITIES ---
  for (const utility of options.utilities ?? []) {
    if (isEmpty(utility.name)) {
      addError("Registry utility has an invalid name")
      continue
    }

    if (!isSafeRelativePath(utility.path)) {
      addError(
        `Registry utility "${utility.name}" has invalid file path: ${utility.path}`,
      )
    }
    if (!isSafeRelativePath(utility.target)) {
      addError(
        `Registry utility "${utility.name}" has invalid target: ${utility.target}`,
      )
    }

    const normalizedUtilityName = utility.name.toLowerCase()
    if (usedUtilityNames.has(normalizedUtilityName)) {
      addError(`Registry utility "${utility.name}" is duplicated`)
    }
    usedUtilityNames.add(normalizedUtilityName)

    const normalizedUtilityTarget = utility.target.toLowerCase()
    if (usedUtilityTargets.has(normalizedUtilityTarget)) {
      addError(
        `Registry utility target "${utility.target}" is used more than once (in utility "${utility.name}")`,
      )
    }
    usedUtilityTargets.add(normalizedUtilityTarget)

    if (
      availableTemplateFiles.size > 0 &&
      !availableTemplateFiles.has(utility.path)
    ) {
      addError(
        `Registry utility "${utility.name}" references missing template file: ${utility.path}`,
      )
    }
  }

  // --- 3. VALIDATE REGISTRY ITEMS ---
  for (const item of items) {
    // Pokušavamo pokrenuti eksternu validaciju itema
    try {
      validateRegistryItem(item)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      addError(
        `Registry item "${item.name}" failed basic validation: ${message}`,
      )
    }

    // Lookup Keys (Name, Canonical, Aliases)
    const lookupKeys = [item.name, item.canonicalName, ...item.aliases]
    for (const key of lookupKeys) {
      if (isEmpty(key)) {
        addError(
          `Registry item "${item.name}" has an invalid empty lookup key (alias or name)`,
        )
        continue
      }

      const normalizedKey = key.toLowerCase()
      const existingItemName = usedLookupKeys.get(normalizedKey)

      if (existingItemName && existingItemName !== item.name) {
        addError(
          `Registry lookup key "${key}" is used by both "${existingItemName}" and "${item.name}"`,
        )
      }
      usedLookupKeys.set(normalizedKey, item.name)
    }

    // Dependencies
    for (const dep of item.registryDependencies) {
      if (!availableNames.has(dep)) {
        addError(
          `Registry item "${item.name}" references missing registry dependency: ${dep}`,
        )
      }
    }

    for (const dep of item.dependencies) {
      if (!isSafePackageName(dep)) {
        addError(
          `Registry item "${item.name}" has invalid npm dependency: ${dep}`,
        )
      }
    }

    // Aliases integrity
    const aliasSet = new Set<string>()
    for (const alias of item.aliases) {
      const normalizedAlias = alias.toLowerCase()
      if (aliasSet.has(normalizedAlias)) {
        addError(`Registry item "${item.name}" has duplicated alias: ${alias}`)
      }
      aliasSet.add(normalizedAlias)

      if (
        normalizedAlias === item.name.toLowerCase() ||
        normalizedAlias === item.canonicalName.toLowerCase()
      ) {
        addError(
          `Registry item "${item.name}" has alias that duplicates its name/canonicalName: ${alias}`,
        )
      }
    }

    // Files and Template check
    for (const file of item.files) {
      if (!isSafeRelativePath(file)) {
        addError(`Registry item "${item.name}" has invalid file path: ${file}`)
      }
      if (
        availableTemplateFiles.size > 0 &&
        !availableTemplateFiles.has(file)
      ) {
        addError(
          `Registry item "${item.name}" references missing template file: ${file}`,
        )
      }
    }

    // Cross-references (Utilities & Styles)
    if (shouldValidateUtilities) {
      for (const util of item.utilities) {
        if (!availableUtilities.has(util)) {
          addError(
            `Registry item "${item.name}" references missing utility: ${util}`,
          )
        }
      }
    }

    if (shouldValidateStyles) {
      for (const style of item.styles) {
        if (!availableStyles.has(style)) {
          addError(
            `Registry item "${item.name}" references missing style: ${style}`,
          )
        }
      }
    }

    // Remote Files
    const usedRemotePaths = new Set<string>()
    for (const remoteFile of item.remoteFiles ?? []) {
      if (!isSafeRelativePath(remoteFile.path)) {
        addError(
          `Registry item "${item.name}" has invalid remote file path: ${remoteFile.path}`,
        )
      }

      if (!item.files.includes(remoteFile.path)) {
        addError(
          `Registry item "${item.name}" remote file "${remoteFile.path}" is not declared in the "files" array`,
        )
      }

      if (usedRemotePaths.has(remoteFile.path)) {
        addError(
          `Registry item "${item.name}" has duplicated remote file entry: ${remoteFile.path}`,
        )
      }
      usedRemotePaths.add(remoteFile.path)

      // Remote URL validation
      if (remoteFile.remoteUrl !== undefined) {
        if (isEmpty(remoteFile.remoteUrl)) {
          addError(
            `Registry item "${item.name}" has empty remote URL for file: ${remoteFile.path}`,
          )
        } else {
          try {
            const url = new URL(remoteFile.remoteUrl)
            if (url.protocol !== "https:") {
              addError(
                `Registry item "${item.name}" remote URL must use HTTPS: ${remoteFile.remoteUrl}`,
              )
            }
          } catch {
            addError(
              `Registry item "${item.name}" has invalid remote URL: ${remoteFile.remoteUrl}`,
            )
          }
        }
      }
    }
  }

  for (const compositionError of validateRegistryComposition(items)) {
    addError(compositionError)
  }

  if (options.readTemplateFile) {
    for (const importError of validateRegistryTemplateImports(
      items,
      options.readTemplateFile,
    )) {
      addError(importError)
    }
  }

  // --- FINAL THROW ---
  if (errors.length > 0) {
    const message = `Registry validation failed with ${errors.length} error(s):\n\n${errors
      .map((err, i) => `${i + 1}. ${err}`)
      .join("\n")}`
    throw new Error(message)
  }
}
