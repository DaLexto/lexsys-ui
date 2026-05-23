import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const registryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = resolve(registryRoot, "../..")

const layerConfigs = [
  {
    layerName: "blocks",
    sourceRoot: resolve(repoRoot, "packages/ui/src/components/blocks"),
    targetRoot: resolve(registryRoot, "templates/blocks"),
    templatePrefix: "blocks",
    targetPrefix: "src/components/blocks",
  },
  {
    layerName: "templates",
    sourceRoot: resolve(repoRoot, "packages/ui/src/components/templates"),
    targetRoot: resolve(registryRoot, "templates/templates"),
    templatePrefix: "templates",
    targetPrefix: "src/components/templates",
  },
]

const componentSourceImport = 'import { cn } from "../../../utils/cn"'
const componentTemplateImport = 'import { cn } from "@/lib/utils"'

const mergeClassNameSourceImport =
  'import { mergeClassName } from "../../../utils/merge-class-name"'
const mergeClassNameTemplateImport =
  'import { mergeClassName } from "@/lib/utils"'

const primitiveImportPattern = /from "\.\.\/primitives\/([^"]+)"/gu

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
    .replaceAll(primitiveImportPattern, 'from "@/components/primitives/$1"')
    .replaceAll(
      /from "\.\.\/blocks\/([^"]+)"/gu,
      'from "@/components/blocks/$1"',
    )
    .replaceAll(
      /from "\.\.\/templates\/([^"]+)"/gu,
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

const syncBlockTemplates = async () => {
  const results = []

  for (const config of layerConfigs) {
    results.push(await syncLayerTemplates(config))
  }

  if (checkOnly) {
    const outOfSyncFiles = results.flatMap((result) => result.outOfSyncFiles)

    if (outOfSyncFiles.length > 0) {
      console.error("Block/template layers are out of sync:")

      for (const file of outOfSyncFiles) {
        console.error(`- ${file}`)
      }

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
}

await syncBlockTemplates()
