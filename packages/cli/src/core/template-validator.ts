import type { RegistryItem } from "@neurex/registry"
import { fileExists } from "./fs.js"
import { getRegistryTemplatePath } from "./installer.js"

export const validateTemplateFiles = async (
  item: RegistryItem,
): Promise<void> => {
  for (const file of item.files) {
    const fullPath = getRegistryTemplatePath(file)

    if (!(await fileExists(fullPath))) {
      throw new Error(`Template file missing for "${item.name}": ${file}`)
    }
  }
}
