import { access } from "node:fs/promises"
import { constants } from "node:fs"
import { join } from "node:path"

import type { RegistryItem } from "@neurex-ui/registry"
import { getRegistryTemplatesRoot } from "./installer.js"

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

export const validateTemplateFiles = async (
  item: RegistryItem,
): Promise<void> => {
  const templatesRoot = getRegistryTemplatesRoot()

  for (const file of item.files) {
    const fullPath = join(templatesRoot, file)

    if (!(await fileExists(fullPath))) {
      throw new Error(`Template file missing for "${item.name}": ${file}`)
    }
  }
}
