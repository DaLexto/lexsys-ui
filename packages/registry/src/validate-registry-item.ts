import { getInstallLayer } from "./install-layer.js"
import type { RegistryItem } from "./registry.types.js"

const isEmpty = (value: string): boolean => {
  return !value || !value.trim()
}

const consumerTarget = (canonicalName: string): string => {
  return `src/components/ui/${canonicalName}`
}

const primitiveTemplatePrefix = (canonicalName: string): string => {
  return `primitives/${canonicalName}/`
}

const blockTemplatePrefix = (canonicalName: string): string => {
  return `blocks/${canonicalName}/`
}

const templateTemplatePrefix = (canonicalName: string): string => {
  return `templates/${canonicalName}/`
}

export const validateRegistryItem = (item: RegistryItem): void => {
  if (isEmpty(item.name)) {
    throw new Error("Registry item has invalid 'name'")
  }

  if (isEmpty(item.canonicalName)) {
    throw new Error(`Registry item "${item.name}" has invalid 'canonicalName'`)
  }

  if (isEmpty(item.version)) {
    throw new Error(`Registry item "${item.name}" has invalid 'version'`)
  }

  if (!item.files || !item.files.length) {
    throw new Error(
      `Registry item "${item.name}" must define at least one file`,
    )
  }

  for (const file of item.files) {
    if (isEmpty(file)) {
      throw new Error(`Registry item "${item.name}" has invalid file entry`)
    }
  }

  if (item.dependencies) {
    for (const dep of item.dependencies) {
      if (isEmpty(dep)) {
        throw new Error(`Registry item "${item.name}" has invalid dependency`)
      }
    }
  }

  if (item.utilities) {
    for (const util of item.utilities) {
      if (isEmpty(util)) {
        throw new Error(`Registry item "${item.name}" has invalid utility`)
      }
    }
  }

  if (item.styles) {
    for (const style of item.styles) {
      if (isEmpty(style)) {
        throw new Error(`Registry item "${item.name}" has invalid style`)
      }
    }
  }

  if (isEmpty(item.target)) {
    throw new Error(`Registry item "${item.name}" has invalid target`)
  }

  const expectedTarget = consumerTarget(item.canonicalName)

  if (item.target !== expectedTarget) {
    throw new Error(
      `Registry item "${item.name}" target MUST be "${expectedTarget}" (got "${item.target}")`,
    )
  }

  const installLayer = getInstallLayer(item)

  if (item.type === "component") {
    if (installLayer !== "primitive") {
      throw new Error(
        `Registry component "${item.name}" MUST use primitive template paths`,
      )
    }

    for (const file of item.files) {
      const templatePrefix = primitiveTemplatePrefix(item.canonicalName)

      if (!file.startsWith(templatePrefix)) {
        throw new Error(
          `Registry component "${item.name}" file MUST live under "${templatePrefix}": ${file}`,
        )
      }
    }
  }

  if (item.type === "block") {
    if (item.category !== "blocks" && item.category !== "layout") {
      throw new Error(
        `Registry block "${item.name}" MUST use category "blocks" or "layout" (got "${item.category}")`,
      )
    }

    if (installLayer === "block") {
      const templatePrefix = blockTemplatePrefix(item.canonicalName)

      for (const file of item.files) {
        if (!file.startsWith(templatePrefix)) {
          throw new Error(
            `Registry block "${item.name}" file MUST live under "${templatePrefix}": ${file}`,
          )
        }
      }
    } else if (installLayer === "template") {
      const templatePrefix = templateTemplatePrefix(item.canonicalName)

      for (const file of item.files) {
        if (!file.startsWith(templatePrefix)) {
          throw new Error(
            `Registry template "${item.name}" file MUST live under "${templatePrefix}": ${file}`,
          )
        }
      }
    } else {
      throw new Error(
        `Registry block "${item.name}" files MUST live under "blocks/" or "templates/"`,
      )
    }
  }

  for (const file of item.files) {
    if (!file.includes(item.canonicalName)) {
      throw new Error(
        `Registry item "${item.name}" has file path that does not match canonicalName: ${file}`,
      )
    }
  }
}
