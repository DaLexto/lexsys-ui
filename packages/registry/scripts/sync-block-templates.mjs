import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import {
  listComponentNames,
  syncRegistryItems,
} from "./registry-item-generator.mjs"

const registryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = resolve(registryRoot, "../..")

const layerConfigs = [
  {
    layerName: "blocks",
    sourceRoot: resolve(repoRoot, "packages/ui/src/components/blocks"),
    targetRoot: resolve(registryRoot, "templates/blocks"),
    templatePrefix: "blocks",
    defaultCategory: "blocks",
    targetPrefix: "src/components/ui",
  },
  {
    layerName: "templates",
    sourceRoot: resolve(repoRoot, "packages/ui/src/components/templates"),
    targetRoot: resolve(registryRoot, "templates/templates"),
    templatePrefix: "templates",
    defaultCategory: "layout",
    targetPrefix: "src/components/ui",
  },
]

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
  try {
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
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return []
    }

    throw error
  }
}

const toRegistryTemplate = (source) => {
  return source
    .replaceAll(componentSourceImport, componentTemplateImport)
    .replaceAll(mergeClassNameSourceImport, mergeClassNameTemplateImport)
    .replaceAll('from "../../../utils/cn"', 'from "@/lib/utils"')
    .replaceAll('from "../../../utils/variant-states"', 'from "@/lib/utils"')
    .replaceAll(
      /from "\.\.\/\.\.\/primitives\/([^"/]+)\/[^"]+"/gu,
      'from "@/components/primitives/$1"',
    )
    .replaceAll(
      /from "\.\.\/primitives\/([^"/]+)\/[^"]+"/gu,
      'from "@/components/primitives/$1"',
    )
    .replaceAll(
      /from "\.\.\/\.\.\/blocks\/([^"/]+)\/[^"]+"/gu,
      'from "@/components/blocks/$1"',
    )
    .replaceAll(
      /from "\.\.\/blocks\/([^"/]+)\/[^"]+"/gu,
      'from "@/components/blocks/$1"',
    )
    .replaceAll(
      /from "\.\.\/\.\.\/templates\/([^"/]+)\/[^"]+"/gu,
      'from "@/components/templates/$1"',
    )
    .replaceAll(
      /from "\.\.\/templates\/([^"/]+)\/[^"]+"/gu,
      'from "@/components/templates/$1"',
    )
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

const syncLayerTemplates = async ({
  layerName,
  sourceRoot,
  targetRoot,
  templatePrefix,
}) => {
  const sourceFiles = await collectFiles(sourceRoot)
  const outOfSyncFiles = []
  let changedTemplateCount = 0
  let unchangedTemplateCount = 0

  for (const sourcePath of sourceFiles) {
    const relativePath = relative(sourceRoot, sourcePath)
    const targetPath = resolve(targetRoot, relativePath)
    const source = await readFile(sourcePath, "utf-8")
    const template = toRegistryTemplate(source)
    const checkPath = `${templatePrefix}/${relativePath.replaceAll("\\", "/")}`

    if (checkOnly) {
      const existingTemplate = await readExistingTemplate(targetPath)

      if (existingTemplate !== template) {
        outOfSyncFiles.push(checkPath)
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

  return {
    changedTemplateCount,
    layerName,
    outOfSyncFiles,
    sourceFileCount: sourceFiles.length,
    unchangedTemplateCount,
  }
}

const reportRegistryItemSyncErrors = (label, registryItemResult) => {
  let hasErrors = false

  if (registryItemResult.missingItemFiles.length > 0) {
    console.error(`${label} missing registry item files:`)
    for (const file of registryItemResult.missingItemFiles) {
      console.error(`- missing item: ${file}`)
    }
    hasErrors = true
  }

  if (registryItemResult.outOfSyncItemFiles.length > 0) {
    console.error(`${label} registry item metadata out of sync:`)
    for (const file of registryItemResult.outOfSyncItemFiles) {
      console.error(`- out of sync item: ${file}`)
    }
    hasErrors = true
  }

  if (registryItemResult.missingIndexEntries.length > 0) {
    console.error(`${label} registry index out of sync:`)
    for (const entry of registryItemResult.missingIndexEntries) {
      console.error(`- missing index entry: ${entry}`)
    }
    hasErrors = true
  }

  return hasErrors
}

const syncBlockTemplates = async () => {
  const results = []
  const registryItemResults = []

  for (const config of layerConfigs) {
    results.push(await syncLayerTemplates(config))

    const sourceComponentNames = await listComponentNames(config.sourceRoot)

    registryItemResults.push({
      label: config.layerName,
      result: await syncRegistryItems({
        checkOnly,
        defaultCategory: config.defaultCategory,
        itemType: "block",
        reconcile: true,
        registryRoot,
        sourceComponentNames,
        templatePrefix: config.templatePrefix,
        targetPrefix: config.targetPrefix,
        templateRoot: config.targetRoot,
        uiSourceRoot: config.sourceRoot,
      }),
    })
  }

  if (checkOnly) {
    const outOfSyncFiles = results.flatMap((result) => result.outOfSyncFiles)
    let hasErrors = outOfSyncFiles.length > 0

    if (outOfSyncFiles.length > 0) {
      console.error("Block/template layers are out of sync:")

      for (const file of outOfSyncFiles) {
        console.error(`- ${file}`)
      }
    }

    for (const { label, result } of registryItemResults) {
      if (reportRegistryItemSyncErrors(label, result)) {
        hasErrors = true
      }
    }

    if (hasErrors) {
      process.exitCode = 1
      return
    }

    const totalFiles = results.reduce(
      (sum, result) => sum + result.sourceFileCount,
      0,
    )

    console.log(`Checked ${totalFiles} block/template source files.`)
    return
  }

  for (const result of results) {
    console.log(
      `Synced ${result.layerName}: ${result.changedTemplateCount} changed; ${result.unchangedTemplateCount} up to date.`,
    )
  }

  for (const { label, result } of registryItemResults) {
    console.log(
      `Registry items (${label}): ${result.createdItemCount} created; ${result.updatedItemCount} updated.`,
    )
  }
}

await syncBlockTemplates()
