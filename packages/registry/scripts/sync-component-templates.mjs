import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { syncRegistryItems } from "./registry-item-generator.mjs"

const registryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = resolve(registryRoot, "../..")
const sourceRoot = resolve(repoRoot, "packages/ui/src/components/primitives")
const targetRoot = resolve(registryRoot, "templates/primitives")

const componentSourceImport = 'import { cn } from "../../../utils/cn"'
const componentTemplateImport = 'import { cn } from "@/lib/utils"'

const mergeClassNameSourceImport =
  'import { mergeClassName } from "../../../utils/merge-class-name"'
const mergeClassNameTemplateImport =
  'import { mergeClassName } from "@/lib/utils"'

const syncableExtensions = new Set([".ts", ".tsx"])
const checkOnly = process.argv.includes("--check")

const getExtension = (path) => {
  const lastDot = path.lastIndexOf(".")

  if (lastDot === -1) {
    return ""
  }

  return path.slice(lastDot)
}

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)))
      continue
    }

    if (entry.isFile() && syncableExtensions.has(getExtension(entry.name))) {
      files.push(path)
    }
  }

  return files
}

const toRegistryTemplate = (source) => {
  return source
    .replaceAll(componentSourceImport, componentTemplateImport)
    .replaceAll(mergeClassNameSourceImport, mergeClassNameTemplateImport)
    .replaceAll('from "../../../utils/cn"', 'from "@/lib/utils"')
    .replaceAll('from "../../../utils/variant-states"', 'from "@/lib/utils"')
}

const readExistingTemplate = async (path) => {
  try {
    return await readFile(path, "utf-8")
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return undefined
    }

    throw error
  }
}

const syncComponentTemplates = async () => {
  const sourceFiles = await collectFiles(sourceRoot)
  const sourceComponentNames = [
    ...new Set(
      sourceFiles.map((sourcePath) => {
        return relative(sourceRoot, sourcePath).split(/[\\/]/)[0]
      }),
    ),
  ].sort((a, b) => a.localeCompare(b))
  const outOfSyncFiles = []
  let changedTemplateCount = 0
  let unchangedTemplateCount = 0

  for (const sourcePath of sourceFiles) {
    const relativePath = relative(sourceRoot, sourcePath)
    const targetPath = resolve(targetRoot, relativePath)
    const source = await readFile(sourcePath, "utf-8")
    const template = toRegistryTemplate(source)

    if (checkOnly) {
      const existingTemplate = await readExistingTemplate(targetPath)

      if (existingTemplate !== template) {
        outOfSyncFiles.push(`primitives/${relativePath.replaceAll("\\", "/")}`)
      }

      continue
    }

    const existingTemplate = await readExistingTemplate(targetPath)

    if (existingTemplate === template) {
      unchangedTemplateCount += 1
      continue
    }

    await mkdir(dirname(targetPath), { recursive: true })
    await writeFile(targetPath, template, "utf-8")
    changedTemplateCount += 1
  }

  const registryItemResult = await syncRegistryItems({
    checkOnly,
    registryRoot,
    sourceComponentNames,
    templateRoot: targetRoot,
    templatePrefix: "primitives",
    targetPrefix: "src/components/primitives",
  })

  if (checkOnly) {
    if (
      registryItemResult.missingItemFiles.length > 0 ||
      registryItemResult.missingIndexEntries.length > 0
    ) {
      console.error("Registry component items are out of sync:")

      for (const file of registryItemResult.missingItemFiles) {
        console.error(`- missing item: ${file}`)
      }

      for (const entry of registryItemResult.missingIndexEntries) {
        console.error(`- missing index entry: ${entry}`)
      }
    }

    if (outOfSyncFiles.length > 0) {
      console.error("Component templates are out of sync:")
      for (const file of outOfSyncFiles) {
        console.error(`- ${file}`)
      }
    }

    if (
      outOfSyncFiles.length > 0 ||
      registryItemResult.missingItemFiles.length > 0 ||
      registryItemResult.missingIndexEntries.length > 0
    ) {
      process.exitCode = 1
      return
    }

    console.log(`Checked ${sourceFiles.length} component template files.`)
    return
  }

  console.log(
    `Synced ${changedTemplateCount} changed component template files; ${unchangedTemplateCount} already up to date.`,
  )
  console.log(
    `Created ${registryItemResult.missingItemFiles.length} missing registry item files.`,
  )
}

await syncComponentTemplates()
