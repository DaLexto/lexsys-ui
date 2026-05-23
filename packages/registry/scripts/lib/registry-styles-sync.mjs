import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

export const DEFAULT_STYLE_FILES = [
  { fileName: "tokens.css", outputKey: "tokensCss" },
  { fileName: "theme.css", outputKey: "themeCss" },
]

export const normalizeContent = (content) => {
  return content.replace(/\r\n/g, "\n")
}

export const findOutOfSyncStyleFiles = async ({
  outputs,
  registryStylesRoot,
  styleFiles = DEFAULT_STYLE_FILES,
  readFileImpl = readFile,
}) => {
  const outOfSyncFiles = []

  for (const { fileName, outputKey } of styleFiles) {
    const registryPath = resolve(registryStylesRoot, fileName)
    const expected = normalizeContent(outputs[outputKey])

    let actual

    try {
      actual = normalizeContent(await readFileImpl(registryPath, "utf-8"))
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        outOfSyncFiles.push(`${fileName} (missing registry template file)`)
        continue
      }

      throw error
    }

    if (actual !== expected) {
      outOfSyncFiles.push(fileName)
    }
  }

  return {
    outOfSyncFiles,
    checkedCount: styleFiles.length,
  }
}
