import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createStyleOutputs } from "./outputs.js"

const writeOutput = async (path: string, content: string): Promise<void> => {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content, "utf-8")
}

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const repoRoot = resolve(packageRoot, "../..")
const args = new Set(process.argv.slice(2))
const outputs = createStyleOutputs()

if (args.has("--package")) {
  await writeOutput(resolve(packageRoot, "dist/tokens.css"), outputs.tokensCss)
  await writeOutput(resolve(packageRoot, "dist/theme.css"), outputs.themeCss)
  await writeOutput(
    resolve(packageRoot, "dist/tokens.json"),
    outputs.tokensJson,
  )
}

if (args.has("--registry")) {
  const registryStylesPath = resolve(
    repoRoot,
    "packages/registry/templates/styles",
  )

  await writeOutput(
    resolve(registryStylesPath, "tokens.css"),
    outputs.tokensCss,
  )
  await writeOutput(resolve(registryStylesPath, "theme.css"), outputs.themeCss)
}
