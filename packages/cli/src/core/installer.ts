import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import type { RegistryItem, RegistryStyle } from "@neurex-ui/registry"
import type { NeurexConfig } from "./config.js"
import { fileExists, filesAreEqual } from "./fs.js"
import { getCwd } from "./context.js"
import { fetchRemoteFile } from "./remote-files.js"
import { hashesAreEqual } from "./hash.js"
import { validateTemplateFiles } from "./template-validator.js"

export const getRegistryTemplatePath = (templatePath: string): string => {
  const templateUrl = import.meta.resolve(
    `@neurex-ui/registry/templates/${templatePath}`,
  )

  return fileURLToPath(templateUrl)
}

export interface InstallResourceResult {
  created: string[]
  skipped: string[]
  conflicted: string[]
}

export const createInstallResourceResult = (): InstallResourceResult => {
  return {
    created: [],
    skipped: [],
    conflicted: [],
  }
}

export const hasInstallConflicts = (result: InstallResourceResult): boolean => {
  return result.conflicted.length > 0
}

export const ensureProjectStructure = async (
  config: NeurexConfig,
): Promise<void> => {
  await mkdir(join(getCwd(), config.componentsPath), { recursive: true })
  await mkdir(join(getCwd(), config.utilitiesPath), { recursive: true })
  await mkdir(join(getCwd(), config.stylesPath), { recursive: true })
}

export const installUtilities = async (
  utilities: string[],
  config: NeurexConfig,
): Promise<InstallResourceResult> => {
  const result = createInstallResourceResult()

  for (const utility of utilities) {
    if (utility !== "cn") {
      console.log(`Unknown utility "${utility}", skipping.`)
      result.skipped.push(utility)
      continue
    }

    const sourcePath = getRegistryTemplatePath("shared/utils/cn.ts")
    const targetPath = join(getCwd(), config.utilitiesPath, "cn.ts")

    await mkdir(dirname(targetPath), { recursive: true })

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath)

      if (isSameFile) {
        console.log(`Skipped identical utility: ${targetPath}`)
        result.skipped.push(targetPath)
        continue
      }

      console.log(`Conflict: utility already exists and differs: ${targetPath}`)
      result.conflicted.push(targetPath)
      continue
    }

    await copyFile(sourcePath, targetPath)
    console.log(`Created utility: ${targetPath}`)
    result.created.push(targetPath)
  }

  return result
}

export const installStyles = async (
  styles: RegistryStyle[],
  config: NeurexConfig,
): Promise<InstallResourceResult> => {
  const result = createInstallResourceResult()
  const installedStyleTargets: string[] = []

  for (const style of styles) {
    console.log(`Installing style ${style.name}...`)

    for (const file of style.files) {
      const sourcePath = getRegistryTemplatePath(file.path)
      const targetPath = join(getCwd(), config.stylesPath, file.target)

      await mkdir(dirname(targetPath), { recursive: true })

      if (await fileExists(targetPath)) {
        const isSameFile = await filesAreEqual(sourcePath, targetPath)

        if (isSameFile) {
          console.log(`Skipped identical style: ${targetPath}`)
          result.skipped.push(targetPath)
          installedStyleTargets.push(file.target)
          continue
        }

        console.log(`Conflict: style already exists and differs: ${targetPath}`)
        result.conflicted.push(targetPath)
        continue
      }

      await copyFile(sourcePath, targetPath)
      console.log(`Created style: ${targetPath}`)
      result.created.push(targetPath)
      installedStyleTargets.push(file.target)
    }
  }

  if (!hasInstallConflicts(result) && installedStyleTargets.length) {
    await installStyleEntrypointImports(installedStyleTargets, config)
  }

  return result
}

const toCssImportPath = (
  cssPath: string,
  styleTarget: string,
  config: NeurexConfig,
): string => {
  const importPath = relative(
    dirname(cssPath),
    join(config.stylesPath, styleTarget),
  ).replaceAll("\\", "/")

  return importPath.startsWith(".") ? importPath : `./${importPath}`
}

const getStyleImportInsertionIndex = (content: string): number => {
  const importHeaderMatch = content.match(
    /^(?:\s*@charset\s+["'][^"']+["'];\s*)?(?:\s*@import\s+[^;]+;\s*)*/u,
  )

  return importHeaderMatch?.[0].length ?? 0
}

const installStyleEntrypointImports = async (
  styleTargets: string[],
  config: NeurexConfig,
): Promise<void> => {
  const cssPath = join(getCwd(), config.tailwind.css)

  if (!(await fileExists(cssPath))) {
    console.log(
      `Skipped style wiring: Tailwind CSS entrypoint not found at ${cssPath}`,
    )
    return
  }

  const content = await readFile(cssPath, "utf-8")
  const missingImports = styleTargets
    .map((styleTarget) =>
      toCssImportPath(config.tailwind.css, styleTarget, config),
    )
    .filter(
      (importPath) =>
        !content.includes(`"${importPath}"`) &&
        !content.includes(`'${importPath}'`),
    )
    .map((importPath) => `@import "${importPath}";`)

  if (!missingImports.length) {
    console.log(
      `Skipped style wiring: ${cssPath} already imports Neurex styles`,
    )
    return
  }

  const insertionIndex = getStyleImportInsertionIndex(content)
  const before = content.slice(0, insertionIndex)
  const after = content.slice(insertionIndex)
  const separator = before.endsWith("\n") || before.length === 0 ? "" : "\n"
  const updatedContent = `${before}${separator}${missingImports.join("\n")}\n${after}`

  await writeFile(cssPath, updatedContent, "utf-8")
  console.log(`Updated style entrypoint: ${cssPath}`)
}

export const installItemFiles = async (
  item: RegistryItem,
  config: NeurexConfig,
): Promise<InstallResourceResult> => {
  const result = createInstallResourceResult()

  console.log(`Installing ${item.canonicalName}...\n`)

  await validateTemplateFiles(item)

  for (const file of item.files) {
    const remoteFile = item.remoteFiles?.find(
      (registryFile) => registryFile.path === file && registryFile.remoteUrl,
    )

    const sourcePath = getRegistryTemplatePath(file)
    const fileName = file.split("/").at(-1)

    if (!fileName) {
      throw new Error(`Invalid registry file path: ${file}`)
    }

    const targetPath = join(
      getCwd(),
      config.componentsPath,
      item.canonicalName,
      fileName,
    )

    await mkdir(dirname(targetPath), { recursive: true })

    if (remoteFile?.remoteUrl) {
      console.log(`Fetching remote file: ${remoteFile.remoteUrl}`)

      const remoteContent = await fetchRemoteFile(remoteFile.remoteUrl)

      if (await fileExists(targetPath)) {
        const targetContent = await readFile(targetPath, "utf-8")

        if (hashesAreEqual(remoteContent, targetContent)) {
          console.log(`Skipped identical file: ${targetPath}`)
          result.skipped.push(targetPath)
          continue
        }

        console.log(`Conflict: file already exists and differs: ${targetPath}`)
        result.conflicted.push(targetPath)
        continue
      }

      await writeFile(targetPath, remoteContent, "utf-8")
      console.log(`Created: ${targetPath}`)
      result.created.push(targetPath)
      continue
    }

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath)

      if (isSameFile) {
        console.log(`Skipped identical file: ${targetPath}`)
        result.skipped.push(targetPath)
        continue
      }

      console.log(`Conflict: file already exists and differs: ${targetPath}`)
      result.conflicted.push(targetPath)
      continue
    }

    await copyFile(sourcePath, targetPath)
    console.log(`Created: ${targetPath}`)
    result.created.push(targetPath)
  }

  console.log("\nDone.")

  return result
}
