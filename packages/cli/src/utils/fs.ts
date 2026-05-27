import { hashFile } from "./hash.js"
import { access } from "node:fs/promises"
import { constants } from "node:fs"

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
