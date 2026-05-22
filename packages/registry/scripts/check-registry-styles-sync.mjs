import { access, readFile } from "node:fs/promises"
import { spawnSync } from "node:child_process"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const registryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = resolve(registryRoot, "../..")
const tokensDistIndex = resolve(repoRoot, "packages/tokens/dist/index.js")
const registryStylesRoot = resolve(registryRoot, "templates/styles")

const styleFiles = [
  { fileName: "tokens.css", outputKey: "tokensCss" },
  { fileName: "theme.css", outputKey: "themeCss" },
]

const normalizeContent = (content) => {
  return content.replace(/\r\n/g, "\n")
}

const ensureTokensBuilt = async () => {
  try {
    await access(tokensDistIndex)
    return
  } catch {
    console.log("Building @neurex/tokens for registry style sync check...")
  }

  const result = spawnSync(
    "pnpm",
    ["--filter", "@neurex/tokens", "build"],
    {
      cwd: repoRoot,
      stdio: "inherit",
      shell: true,
    },
  )

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const loadStyleOutputs = async () => {
  await ensureTokensBuilt()

  const { createStyleOutputs } = await import(
    pathToFileURL(tokensDistIndex).href
  )

  return createStyleOutputs()
}

const checkRegistryStylesSync = async () => {
  const outputs = await loadStyleOutputs()
  const outOfSyncFiles = []

  for (const { fileName, outputKey } of styleFiles) {
    const registryPath = resolve(registryStylesRoot, fileName)
    const expected = normalizeContent(outputs[outputKey])

    let actual

    try {
      actual = normalizeContent(await readFile(registryPath, "utf-8"))
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

  if (outOfSyncFiles.length > 0) {
    console.error("Registry style templates are out of sync:")
    for (const file of outOfSyncFiles) {
      console.error(`- ${file}`)
    }
    console.error(
      "Run `pnpm --filter @neurex/tokens generate:styles` to refresh registry templates.",
    )
    process.exitCode = 1
    return
  }

  console.log(`Checked ${styleFiles.length} registry style template files.`)
}

await checkRegistryStylesSync()
