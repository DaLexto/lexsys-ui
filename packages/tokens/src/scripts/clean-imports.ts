import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const ROOT_DIR = join(process.cwd(), "src")
const TARGET_EXTENSIONS = new Set([".ts", ".tsx"])

const cleanImportSpecifiers = (content: string): string => {
  return content.replaceAll('/index.js"', '"').replaceAll('.js"', '"')
}

const walk = (directory: string): string[] => {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      return walk(fullPath)
    }

    for (const extension of TARGET_EXTENSIONS) {
      if (fullPath.endsWith(extension)) {
        return [fullPath]
      }
    }

    return []
  })
}

for (const filePath of walk(ROOT_DIR)) {
  const before = readFileSync(filePath, "utf8")
  const after = cleanImportSpecifiers(before)

  if (before !== after) {
    writeFileSync(filePath, after)
  }
}
