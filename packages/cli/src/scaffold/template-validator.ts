import type { RegistryItem } from "@dalexto/lexsys-registry"
import { fileExists } from "../utils/fs.js"
import { getRegistryTemplatePath } from "../install/installer.js"

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
