import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { createBackupFile } from "../utils/backup.js"
import { loadConfig } from "../config/config.js"
import { getCwd } from "../utils/context.js"
import { fileExists } from "../utils/fs.js"
import { hashesAreEqual } from "../utils/hash.js"
import { prepareInstalledFileContent } from "./import-rewriter.js"
import { resolveItemInstallTarget } from "./target.js"
import { getRegistryTemplatePath } from "./installer.js"
import { findItem } from "../registry/resolver.js"
import {
  getComponentDriftStatus,
  itemHasTemplateDrift,
} from "./component-drift.js"

export const checkItemFiles = async (name: string): Promise<void> => {
  const item = await findItem(name)
  const config = await loadConfig()

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`)
    return
  }

  const installTarget = resolveItemInstallTarget(config, item)

  console.log(`File check for ${item.canonicalName}:`)

  for (const file of item.files) {
    const fileName = file.split("/").at(-1)

    if (!fileName) {
      console.log(`- invalid registry file path: ${file}`)
      continue
    }

    const targetPath = join(getCwd(), installTarget, fileName)

    if (!(await fileExists(targetPath))) {
      console.log(`- missing: ${targetPath}`)
      continue
    }

    const preparedContent = prepareInstalledFileContent(
      await readFile(getRegistryTemplatePath(file), "utf-8"),
      item,
    )
    const targetContent = await readFile(targetPath, "utf-8")

    if (hashesAreEqual(preparedContent, targetContent)) {
      console.log(`- identical: ${targetPath}`)
      continue
    }

    console.log(`- conflict: ${targetPath}`)
  }
}

export const applyItemOverwrite = async (
  name: string,
  force: boolean,
): Promise<boolean> => {
  const item = await findItem(name)
  const config = await loadConfig()

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`)
    return false
  }

  const installTarget = resolveItemInstallTarget(config, item)
  let hasConflict = false

  console.log(`Applying update for ${item.canonicalName}:`)

  for (const file of item.files) {
    const sourcePath = getRegistryTemplatePath(file)
    const fileName = file.split("/").at(-1)

    if (!fileName) {
      console.log(`- invalid registry file path: ${file}`)
      hasConflict = true
      continue
    }

    const targetPath = join(getCwd(), installTarget, fileName)
    const preparedContent = prepareInstalledFileContent(
      await readFile(sourcePath, "utf-8"),
      item,
    )

    await mkdir(dirname(targetPath), { recursive: true })

    if (!(await fileExists(targetPath))) {
      await writeFile(targetPath, preparedContent, "utf-8")
      console.log(`- restored missing file: ${targetPath}`)
      continue
    }

    const targetContent = await readFile(targetPath, "utf-8")

    if (hashesAreEqual(preparedContent, targetContent)) {
      console.log(`- identical: ${targetPath}`)
      continue
    }

    if (force) {
      const backupPath = await createBackupFile(targetPath)

      if (backupPath) {
        console.log(`- backup created: ${backupPath}`)
      }

      await writeFile(targetPath, preparedContent, "utf-8")
      console.log(`- force updated file: ${targetPath}`)
      continue
    }

    hasConflict = true
    console.log(`- conflict (user modified): ${targetPath}`)
  }

  if (hasConflict) {
    console.log(
      "Update finished with conflicts. Review conflicted files before retrying.",
    )
    return false
  }

  console.log(`✔ ${item.canonicalName} updated successfully`)
  return true
}

export const checkItemUpdate = async (
  name: string,
  dryRun: boolean,
  force: boolean,
  sync = false,
): Promise<boolean> => {
  const item = await findItem(name)

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`)
    return false
  }

  const driftStatus = await getComponentDriftStatus(name)

  if (driftStatus === "missing") {
    console.log(`Component "${name}" no longer exists in the registry.`)
    return false
  }

  const hasDrift = driftStatus === "drift"

  if (!sync && !hasDrift) {
    console.log(`${item.canonicalName} is up to date with the registry.`)
    return false
  }

  if (sync && !hasDrift) {
    console.log(
      `${item.canonicalName} template sync (already matches registry)`,
    )
  } else {
    console.log(`${item.canonicalName} can be updated from registry templates`)
  }

  if (dryRun) {
    console.log("\nChanged file candidates:")

    for (const file of item.files) {
      console.log(`~ ${file}`)
    }

    console.log("\nDry run: no files will be changed.")
    console.log("Update plan:")

    if (force) {
      console.log(
        "- Force mode requested: conflicted files require backup before overwrite",
      )
      console.log(
        "- Dry run: backups would be created before forced overwrites",
      )
    }

    console.log(`- Check installed files for ${item.canonicalName}`)
    console.log("- Compare existing files with registry templates")
    console.log("- Report conflicts before writing changes")
    console.log("- Never overwrite user-modified files silently")

    await checkItemFiles(name)

    return false
  }

  return await applyItemOverwrite(name, force)
}

export const resetItem = async (
  name: string,
  dryRun: boolean,
): Promise<boolean> => {
  const item = await findItem(name)

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`)
    return false
  }

  const hasDrift = await itemHasTemplateDrift(item)

  if (!hasDrift) {
    console.log(`${item.canonicalName} already matches registry templates.`)
    return false
  }

  if (dryRun) {
    console.log(`Reset plan for ${item.canonicalName}:`)
    console.log("- Backups would be created before overwriting changed files")
    console.log("- Files would be restored from registry templates")

    for (const file of item.files) {
      console.log(`~ ${file}`)
    }

    console.log("\nDry run: no files will be changed.")
    await checkItemFiles(name)
    return false
  }

  return await applyItemOverwrite(name, true)
}
