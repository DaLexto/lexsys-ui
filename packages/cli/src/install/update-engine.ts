import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { createBackupFile } from "../core/backup.js"
import { loadConfig } from "../config/config.js"
import { getCwd } from "../core/context.js"
import { fileExists } from "../core/fs.js"
import { hashesAreEqual } from "../core/hash.js"
import { prepareInstalledFileContent } from "./import-rewriter.js"
import { resolveItemInstallTarget } from "./target.js"
import { getRegistryTemplatePath } from "./installer.js"
import { findItem } from "../registry/resolver.js"
import { isUpdateAvailable } from "../utils/version.js"

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

const applySafeItemUpdate = async (
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
      "Update finished with conflicts. Installed version was not changed.",
    )
    return false
  }

  console.log(
    `✔ ${item.canonicalName} updated successfully to v${item.version}`,
  )
  return true
}

export const checkItemUpdate = async (
  name: string,
  installedVersion: string,
  dryRun: boolean,
  force: boolean,
  sync = false,
): Promise<boolean> => {
  const item = await findItem(name)

  if (!item) {
    console.log(`Component "${name}" no longer exists in the registry.`)
    return false
  }

  const versionUpdateAvailable = isUpdateAvailable(
    installedVersion,
    item.version,
  )

  if (!sync && !versionUpdateAvailable) {
    console.log(`${item.canonicalName} is up to date (v${installedVersion}).`)
    return false
  }

  if (sync && !versionUpdateAvailable) {
    console.log(
      `${item.canonicalName} template sync (installed v${installedVersion}, registry v${item.version})`,
    )
  } else {
    console.log(
      `${item.canonicalName} can be updated: v${installedVersion} → v${item.version}`,
    )
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

  return await applySafeItemUpdate(name, force)
}
