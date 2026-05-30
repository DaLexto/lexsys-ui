import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { loadConfig } from "../config/config.js"
import { getCwd } from "../utils/context.js"
import { fileExists } from "../utils/fs.js"
import { hashesAreEqual } from "../utils/hash.js"
import { prepareInstalledFileContent } from "./import-rewriter.js"
import { resolveItemInstallTarget } from "./target.js"
import { getRegistryTemplatePath } from "./installer.js"
import { findItem } from "../registry/resolver.js"
import type { RegistryItem } from "@dalexto/lexsys-registry"

export type ComponentDriftStatus = "missing" | "in-sync" | "drift"

export const getComponentDriftStatus = async (
  name: string,
): Promise<ComponentDriftStatus> => {
  const item = await findItem(name)

  if (!item) {
    return "missing"
  }

  const hasDrift = await itemHasTemplateDrift(item)

  return hasDrift ? "drift" : "in-sync"
}

export const itemHasTemplateDrift = async (
  item: RegistryItem,
): Promise<boolean> => {
  const config = await loadConfig()
  const installTarget = resolveItemInstallTarget(config, item)

  for (const file of item.files) {
    const fileName = file.split("/").at(-1)

    if (!fileName) {
      return true
    }

    const targetPath = join(getCwd(), installTarget, fileName)

    if (!(await fileExists(targetPath))) {
      return true
    }

    const preparedContent = prepareInstalledFileContent(
      await readFile(getRegistryTemplatePath(file), "utf-8"),
      item,
    )
    const targetContent = await readFile(targetPath, "utf-8")

    if (!hashesAreEqual(preparedContent, targetContent)) {
      return true
    }
  }

  return false
}
