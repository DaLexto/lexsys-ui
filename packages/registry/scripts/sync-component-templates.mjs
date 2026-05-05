import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const registryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = resolve(registryRoot, "../..")
const sourceRoot = resolve(repoRoot, "packages/ui/src/components")
const targetRoot = resolve(registryRoot, "templates/components")

const componentSourceImport = 'import { cn } from "../../utils/cn"'
const componentTemplateImport = 'import { cn } from "@/lib/utils"'
const buttonSourceTypeFallback = 'type={type ?? "button"}'
const buttonTemplateTypeFallback =
  'type={(type as "button" | "submit" | "reset" | undefined) ?? "button"}'

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
    .replaceAll(buttonSourceTypeFallback, buttonTemplateTypeFallback)
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
  const outOfSyncFiles = []

  for (const sourcePath of sourceFiles) {
    const relativePath = relative(sourceRoot, sourcePath)
    const targetPath = resolve(targetRoot, relativePath)
    const source = await readFile(sourcePath, "utf-8")
    const template = toRegistryTemplate(source)

    if (checkOnly) {
      const existingTemplate = await readExistingTemplate(targetPath)

      if (existingTemplate !== template) {
        outOfSyncFiles.push(relativePath.replaceAll("\\", "/"))
      }

      continue
    }

    await mkdir(dirname(targetPath), { recursive: true })
    await writeFile(targetPath, template, "utf-8")
  }

  if (checkOnly) {
    if (outOfSyncFiles.length > 0) {
      console.error("Component templates are out of sync:")
      for (const file of outOfSyncFiles) {
        console.error(`- ${file}`)
      }
      process.exitCode = 1
      return
    }

    console.log(`Checked ${sourceFiles.length} component template files.`)
    return
  }

  console.log(`Synced ${sourceFiles.length} component template files.`)
}

await syncComponentTemplates()
