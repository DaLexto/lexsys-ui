import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const cliFilePath = fileURLToPath(import.meta.url)
const cliDistDir = dirname(cliFilePath)

const packageJsonPath = join(cliDistDir, "..", "..", "package.json")

export const runVersion = async (): Promise<void> => {
  const content = await readFile(packageJsonPath, "utf-8")
  const packageJson = JSON.parse(content) as { version?: string }

  console.log(`lexsys ${packageJson.version ?? "unknown"}`)
}
