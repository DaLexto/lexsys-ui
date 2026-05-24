import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

// Bundled entry is dist/index.js — one level up is packages/cli/.
const cliDistDir = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = join(cliDistDir, "..", "package.json")

export const runVersion = async (): Promise<void> => {
  const content = await readFile(packageJsonPath, "utf-8")
  const packageJson = JSON.parse(content) as { version?: string }

  console.log(`lexsys ${packageJson.version ?? "unknown"}`)
}
