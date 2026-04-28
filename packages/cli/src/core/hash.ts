import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"

export const hashContent = (content: string): string => {
  return createHash("sha256").update(content, "utf-8").digest("hex")
}

export const hashFile = async (path: string): Promise<string> => {
  const content = await readFile(path, "utf-8")

  return hashContent(content)
}

export const hashesAreEqual = (
  firstContent: string,
  secondContent: string,
): boolean => {
  return hashContent(firstContent) === hashContent(secondContent)
}
