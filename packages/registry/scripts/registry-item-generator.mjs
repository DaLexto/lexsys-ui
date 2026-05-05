import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"

const syncableExtensions = new Set([".ts", ".tsx"])

const formComponentNames = new Set([
  "Checkbox",
  "Field",
  "Input",
  "Radio",
  "RadioGroup",
  "Select",
  "Slider",
  "Switch",
  "Textarea",
])

const getExtension = (path) => {
  const lastDot = path.lastIndexOf(".")

  if (lastDot === -1) {
    return ""
  }

  return path.slice(lastDot)
}

const fileExists = async (path) => {
  try {
    await readFile(path, "utf-8")
    return true
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return false
    }

    throw error
  }
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

const listComponentNames = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
}

const toKebabCase = (value) => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

const toCamelCase = (value) => {
  return value.replace(/[-_\s]+([a-zA-Z0-9])/g, (_, letter) =>
    letter.toUpperCase(),
  )
}

const getCategory = (componentName) => {
  if (formComponentNames.has(componentName)) {
    return "forms"
  }

  return "utilities"
}

const getTemplateFileOrder = (componentName, path) => {
  const fileName = path.split("/").at(-1)

  if (fileName === `${componentName}.tsx`) {
    return 0
  }

  if (fileName === `${componentName}.types.ts`) {
    return 1
  }

  if (fileName === `${componentName}.variants.ts`) {
    return 2
  }

  return 10
}

const formatStringArray = (values) => {
  if (values.length === 0) {
    return "[]"
  }

  return `[\n${values.map((value) => `    "${value}",`).join("\n")}\n  ]`
}

const formatRemoteFiles = (files) => {
  return `[\n${files
    .map(
      (file) => `    {
      path: "${file}",
    },`,
    )
    .join("\n")}\n  ]`
}

const getTemplateContent = async (files) => {
  const contents = await Promise.all(
    files.map(async (file) => {
      return readFile(file, "utf-8")
    }),
  )

  return contents.join("\n")
}

const getDependencies = (templateContent) => {
  const dependencies = new Set()

  if (templateContent.includes("@base-ui/react")) {
    dependencies.add("@base-ui/react")
  }

  if (templateContent.includes("class-variance-authority")) {
    dependencies.add("class-variance-authority")
  }

  if (templateContent.includes("@/lib/utils")) {
    dependencies.add("clsx")
    dependencies.add("tailwind-merge")
  }

  return [...dependencies]
}

const getUtilities = (templateContent) => {
  if (templateContent.includes("@/lib/utils")) {
    return ["cn"]
  }

  return []
}

const createRegistryItemSource = async ({
  componentName,
  itemName,
  itemVariableName,
  templateRoot,
}) => {
  const componentRoot = resolve(templateRoot, componentName)
  const files = (await collectFiles(componentRoot))
    .map((file) => {
      return `components/${relative(templateRoot, file).replaceAll("\\", "/")}`
    })
    .sort((a, b) => {
      const orderDifference =
        getTemplateFileOrder(componentName, a) -
        getTemplateFileOrder(componentName, b)

      if (orderDifference !== 0) {
        return orderDifference
      }

      return a.localeCompare(b)
    })
  const templateContent = await getTemplateContent(
    files.map((file) =>
      resolve(templateRoot, file.replace(/^components\//, "")),
    ),
  )
  const dependencies = getDependencies(templateContent)
  const utilities = getUtilities(templateContent)

  return `/**
 * ${itemName}.ts
 *
 * Registry metadata for the ${componentName} component.
 */

import type { RegistryItem } from "../registry.types.js"

export const ${itemVariableName}: RegistryItem = {
  name: "${itemName}",
  canonicalName: "${componentName}",
  version: "0.0.1",
  type: "component",
  category: "${getCategory(componentName)}",
  aliases: [],
  files: ${formatStringArray(files)},
  remoteFiles: ${formatRemoteFiles(files)},
  dependencies: ${formatStringArray(dependencies)},
  registryDependencies: [],
  utilities: ${formatStringArray(utilities)},
  styles: ["theme"],
  target: "src/components/ui/${componentName}",
}
`
}

const insertBefore = (source, insertion, marker) => {
  if (source.includes(insertion)) {
    return source
  }

  const markerIndex = source.indexOf(marker)

  if (markerIndex === -1) {
    throw new Error(`Could not find marker in registry index: ${marker}`)
  }

  return `${source.slice(0, markerIndex)}${insertion}${source.slice(markerIndex)}`
}

const ensureRegistryItemEntry = (source, itemVariableName) => {
  const entry = `  ${itemVariableName},`

  if (source.includes(entry)) {
    return source
  }

  const registryItemsPattern =
    /export const registryItems: RegistryItem\[] = \[\n(?<items>[\s\S]*?)\n\]/
  const match = registryItemsPattern.exec(source)

  if (match === null || match.groups === undefined) {
    throw new Error("Could not find registryItems array in registry index.")
  }

  const nextItems = `${match.groups.items}\n${entry}`

  return source.replace(
    registryItemsPattern,
    `export const registryItems: RegistryItem[] = [\n${nextItems}\n]`,
  )
}

const ensureRegistryIndex = async ({ checkOnly, indexPath, items }) => {
  let source = await readFile(indexPath, "utf-8")
  const missingEntries = []

  for (const item of items) {
    const exportLine = `export { ${item.itemVariableName} } from "./items/${item.itemName}.js"\n`
    const importLine = `import { ${item.itemVariableName} } from "./items/${item.itemName}.js"\n`
    const registryEntry = `  ${item.itemVariableName},`

    if (!source.includes(exportLine.trim())) {
      missingEntries.push(`export:${item.itemName}`)
    }

    if (!source.includes(importLine.trim())) {
      missingEntries.push(`import:${item.itemName}`)
    }

    if (!source.includes(registryEntry)) {
      missingEntries.push(`registryItems:${item.itemName}`)
    }

    if (checkOnly) {
      continue
    }

    source = insertBefore(source, exportLine, "export { themeRegistryStyle }")
    source = insertBefore(source, importLine, "import { themeRegistryStyle }")
    source = ensureRegistryItemEntry(source, item.itemVariableName)
  }

  if (checkOnly) {
    return missingEntries
  }

  await writeFile(indexPath, source, "utf-8")
  return []
}

export const syncRegistryItems = async ({
  checkOnly,
  registryRoot,
  sourceComponentNames,
  templateRoot,
}) => {
  const componentNames =
    sourceComponentNames ?? (await listComponentNames(templateRoot))
  const itemRoot = resolve(registryRoot, "src/items")
  const indexPath = resolve(registryRoot, "src/index.ts")
  const missingItemFiles = []
  const items = []

  for (const componentName of componentNames) {
    const itemName = toKebabCase(componentName)
    const itemVariableName = `${toCamelCase(itemName)}RegistryItem`
    const itemPath = resolve(itemRoot, `${itemName}.ts`)
    const itemAlreadyExists = await fileExists(itemPath)

    items.push({ itemName, itemVariableName })

    if (itemAlreadyExists) {
      continue
    }

    missingItemFiles.push(`${itemName}.ts`)

    if (checkOnly) {
      continue
    }

    const itemSource = await createRegistryItemSource({
      componentName,
      itemName,
      itemVariableName,
      templateRoot,
    })

    await mkdir(dirname(itemPath), { recursive: true })
    await writeFile(itemPath, itemSource, "utf-8")
  }

  const missingIndexEntries = await ensureRegistryIndex({
    checkOnly,
    indexPath,
    items,
  })

  return {
    missingIndexEntries,
    missingItemFiles,
  }
}
