import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileExists } from "../utils/fs.js"

export const writeScaffoldFile = async (
  targetPath: string,
  content: string,
  options: { allowExisting?: boolean } = {},
): Promise<void> => {
  if (await fileExists(targetPath)) {
    const existingContent = await readFile(targetPath, "utf-8")

    if (existingContent === content) {
      console.log(`Skipped identical scaffold file: ${targetPath}`)
      return
    }

    if (options.allowExisting) {
      console.log(`Skipped existing scaffold file: ${targetPath}`)
      return
    }

    throw new Error(
      `Refusing to overwrite existing scaffold file: ${targetPath}`,
    )
  }

  await mkdir(dirname(targetPath), { recursive: true })
  await writeFile(targetPath, content, "utf-8")
  console.log(`Created scaffold file: ${targetPath}`)
}

export const writePackageJsonFile = async (
  targetDirectory: string,
  getContent: (dir: string) => string,
  mergeContent: (dir: string, existing: Record<string, unknown>) => string,
): Promise<void> => {
  const targetPath = join(targetDirectory, "package.json")

  if (!(await fileExists(targetPath))) {
    await writeFile(targetPath, getContent(targetDirectory), "utf-8")
    console.log(`Created scaffold file: ${targetPath}`)
    return
  }

  let parsed: Record<string, unknown>

  try {
    parsed = JSON.parse(await readFile(targetPath, "utf-8")) as Record<
      string,
      unknown
    >
  } catch {
    throw new Error(`Invalid existing package.json: ${targetPath}`)
  }

  const content = await readFile(targetPath, "utf-8")
  const mergedContent = mergeContent(targetDirectory, parsed)

  if (content === mergedContent) {
    console.log(`Skipped package.json: ${targetPath} already configured`)
    return
  }

  await writeFile(targetPath, mergedContent, "utf-8")
  console.log(`Updated package.json: ${targetPath}`)
}
