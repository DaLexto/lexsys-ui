import { hashFile } from "./hash.js"
import { access, mkdir, writeFile } from "node:fs/promises"
import { constants } from "node:fs"
import { dirname } from "node:path"

const isNotFoundError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  )
}

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK)
    return true
  } catch (error) {
    if (isNotFoundError(error)) {
      return false
    }

    throw error
  }
}

export const filesAreEqual = async (
  sourcePath: string,
  targetPath: string,
): Promise<boolean> => {
  const sourceHash = await hashFile(sourcePath)
  const targetHash = await hashFile(targetPath)

  return sourceHash === targetHash
}

export const writeFileIfMissing = async (
  path: string,
  content: string,
): Promise<void> => {
  if (await fileExists(path)) {
    console.log(`Skipped existing file: ${path}`)
    return
  }

  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content, "utf-8")
  console.log(`Created: ${path}`)
}
