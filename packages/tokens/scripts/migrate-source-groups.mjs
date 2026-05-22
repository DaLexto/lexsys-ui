/**
 * One-off codemod: migrate legacy flat-mixed token source groups to factory authoring.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src")

const findMatchingBrace = (content, openBraceIndex) => {
  let depth = 0

  for (let index = openBraceIndex; index < content.length; index += 1) {
    const char = content[index]

    if (char === "{") {
      depth += 1
    }

    if (char === "}") {
      depth -= 1

      if (depth === 0) {
        return index
      }
    }
  }

  return -1
}

const findExportObject = (content) => {
  const exportMatch = content.match(/export const \w+(?:: [A-Za-z]+)? = \{/)

  if (exportMatch === null || exportMatch.index === undefined) {
    return null
  }

  const openBraceIndex = exportMatch.index + exportMatch[0].length - 1
  const closeBraceIndex = findMatchingBrace(content, openBraceIndex)

  if (closeBraceIndex === -1) {
    return null
  }

  return {
    openBraceIndex,
    closeBraceIndex,
    body: content.slice(openBraceIndex + 1, closeBraceIndex),
  }
}

const removeLeadingKey = (body, key) => {
  return body.replace(new RegExp(`\\s*${key}: "[^"]+",\\s*\\n`), "\n")
}

const stripTypeOnlyImports = (content, typeName) => {
  return content
    .replace(
      new RegExp(`import type \\{ ${typeName} \\} from "\\.\\./types"\\n\\n`, "g"),
      "",
    )
    .replace(
      new RegExp(`import type \\{ ${typeName} \\} from "\\.\\./\\.\\./types"\\n\\n`, "g"),
      "",
    )
    .replace(
      new RegExp(`import type \\{ ${typeName} \\} from "\\.\\./types"\\n`, "g"),
      "",
    )
    .replace(
      new RegExp(`import type \\{ ${typeName} \\} from "\\.\\./\\.\\./types"\\n`, "g"),
      "",
    )
}

const ensureImport = (content, importLine) => {
  if (content.includes(importLine)) {
    return content
  }

  const lastImportMatch = [...content.matchAll(/^import .+$/gm)].at(-1)

  if (lastImportMatch?.index !== undefined) {
    const insertAt = lastImportMatch.index + lastImportMatch[0].length
    return `${content.slice(0, insertAt)}\n${importLine}${content.slice(insertAt)}`
  }

  const exportIndex = content.indexOf("export const")

  if (exportIndex === -1) {
    return `${importLine}\n\n${content}`
  }

  return `${importLine}\n\n${content.slice(0, exportIndex)}${content.slice(exportIndex)}`
}

const rewriteExport = (content, exportPrefix, closingSuffix) => {
  const exportMatch = content.match(/export const (\w+)(?:: [A-Za-z]+)? = \{/)

  if (exportMatch === null || exportMatch.index === undefined) {
    return null
  }

  const exportName = exportMatch[1]
  const objectInfo = findExportObject(content)

  if (objectInfo === null) {
    return null
  }

  const before = content.slice(0, exportMatch.index)
  const after = content.slice(objectInfo.closeBraceIndex + 1)

  return `${before}export const ${exportName} = ${exportPrefix} {${objectInfo.body}\n}${closingSuffix}${after}`
}

const migrateNamedGroup = (filePath, factoryName, importPath, typeName) => {
  let content = fs.readFileSync(filePath, "utf8")

  if (content.includes(`${factoryName}(`)) {
    return false
  }

  const objectInfo = findExportObject(content)

  if (objectInfo === null) {
    throw new Error(`Could not find export object in ${filePath}`)
  }

  const nameMatch = objectInfo.body.match(/\sname: "([^"]+)",/)

  if (nameMatch === null) {
    throw new Error(`Could not find name key in ${filePath}`)
  }

  const groupName = nameMatch[1]
  const tokenBody = removeLeadingKey(objectInfo.body, "name")

  content = stripTypeOnlyImports(content, typeName)
  content = ensureImport(
    content,
    `import { ${factoryName} } from "${importPath}"`,
  )

  const exportMatch = content.match(/export const (\w+)(?:: [A-Za-z]+)? = \{/)

  if (exportMatch === null || exportMatch.index === undefined) {
    throw new Error(`Could not find export in ${filePath}`)
  }

  const before = content.slice(0, exportMatch.index)
  const after = content.slice(findExportObject(content).closeBraceIndex + 1)

  content = `${before}export const ${exportMatch[1]} = ${factoryName}("${groupName}", {\n${tokenBody}\n})${after}`

  fs.writeFileSync(filePath, content)
  return true
}

const migrateComponentGroup = (filePath) => {
  let content = fs.readFileSync(filePath, "utf8")

  if (content.includes("componentTokens(")) {
    return false
  }

  const objectInfo = findExportObject(content)

  if (objectInfo === null) {
    throw new Error(`Could not find export object in ${filePath}`)
  }

  const componentMatch = objectInfo.body.match(/\scomponent: "([^"]+)",/)

  if (componentMatch === null) {
    throw new Error(`Could not find component key in ${filePath}`)
  }

  const componentName = componentMatch[1]
  const tokenBody = removeLeadingKey(objectInfo.body, "component")

  content = stripTypeOnlyImports(content, "ComponentTokenGroup")
  content = ensureImport(
    content,
    `import { componentTokens } from "../types/authoring"`,
  )

  const exportMatch = content.match(/export const (\w+)(?:: [A-Za-z]+)? = \{/)

  if (exportMatch === null || exportMatch.index === undefined) {
    throw new Error(`Could not find export in ${filePath}`)
  }

  const before = content.slice(0, exportMatch.index)
  const after = content.slice(findExportObject(content).closeBraceIndex + 1)

  content = `${before}export const ${exportMatch[1]} = componentTokens("${componentName}", {\n${tokenBody}\n})${after}`

  fs.writeFileSync(filePath, content)
  return true
}

const migrateThemeGroup = (filePath) => {
  let content = fs.readFileSync(filePath, "utf8")

  if (content.includes("themeTokens(")) {
    return false
  }

  const objectInfo = findExportObject(content)

  if (objectInfo === null) {
    throw new Error(`Could not find export object in ${filePath}`)
  }

  const config = {}
  const configKeys = ["name", "brand", "selector", "colorScheme"]

  for (const key of configKeys) {
    const match = objectInfo.body.match(
      new RegExp(`^\\s*${key}: "([^"]+)",\\s*\\n`, "m"),
    )

    if (match !== null) {
      config[key] = match[1]
    }
  }

  if (config.name === undefined || config.selector === undefined || config.colorScheme === undefined) {
    throw new Error(`Missing theme config in ${filePath}`)
  }

  let tokenBody = objectInfo.body

  for (const key of configKeys) {
    tokenBody = removeLeadingKey(tokenBody, key)
  }

  content = stripTypeOnlyImports(content, "ThemeDefinition")
  content = ensureImport(
    content,
    `import { themeTokens } from "../../types/authoring"`,
  )

  const exportMatch = content.match(/export const (\w+)(?:: [A-Za-z]+)? = \{/)

  if (exportMatch === null || exportMatch.index === undefined) {
    throw new Error(`Could not find export in ${filePath}`)
  }

  const configLines = [
    `    name: "${config.name}",`,
    config.brand !== undefined ? `    brand: "${config.brand}",` : null,
    `    selector: "${config.selector}",`,
    `    colorScheme: "${config.colorScheme}",`,
  ]
    .filter(Boolean)
    .join("\n")

  const before = content.slice(0, exportMatch.index)
  const after = content.slice(findExportObject(content).closeBraceIndex + 1)

  content = `${before}export const ${exportMatch[1]} = themeTokens(\n  {\n${configLines}\n  },\n  {${tokenBody}\n  },\n)${after}`

  fs.writeFileSync(filePath, content)
  return true
}

const migrated = []

for (const file of fs.readdirSync(path.join(root, "primitives"))) {
  if (!file.endsWith(".ts") || file === "index.ts" || file === "color.ts" || file === "asset.ts") {
    continue
  }

  const filePath = path.join(root, "primitives", file)

  if (migrateNamedGroup(filePath, "primitiveTokens", "../types/authoring", "PrimitiveTokenGroup")) {
    migrated.push(filePath)
  }
}

for (const file of fs.readdirSync(path.join(root, "semantics"))) {
  if (!file.endsWith(".ts") || file === "index.ts") {
    continue
  }

  const filePath = path.join(root, "semantics", file)
  const content = fs.readFileSync(filePath, "utf8")

  if (!content.includes('name: "')) {
    continue
  }

  if (migrateNamedGroup(filePath, "semanticTokens", "../types/authoring", "SemanticTokenGroup")) {
    migrated.push(filePath)
  }
}

if (
  migrateNamedGroup(
    path.join(root, "brand", "neurex.brand.ts"),
    "brandTokens",
    "../types/authoring",
    "BrandTokenGroup",
  )
) {
  migrated.push(path.join(root, "brand", "neurex.brand.ts"))
}

for (const file of fs.readdirSync(path.join(root, "components"))) {
  if (!file.endsWith(".ts") || file === "index.ts" || file === "button.ts") {
    continue
  }

  const filePath = path.join(root, "components", file)

  if (migrateComponentGroup(filePath)) {
    migrated.push(filePath)
  }
}

if (migrateThemeGroup(path.join(root, "themes", "neurex", "dark.ts"))) {
  migrated.push(path.join(root, "themes", "neurex", "dark.ts"))
}

console.log(`Migrated ${migrated.length} files:`)
for (const file of migrated) {
  console.log(`- ${path.relative(path.join(root, ".."), file)}`)
}
