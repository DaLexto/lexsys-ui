import { access } from "node:fs/promises"
import { spawnSync } from "node:child_process"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
  DEFAULT_STYLE_FILES,
  findOutOfSyncStyleFiles,
} from "./lib/registry-styles-sync.mjs"

const registryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = resolve(registryRoot, "../..")
const tokensDistIndex = resolve(repoRoot, "packages/tokens/dist/index.js")
const registryStylesRoot = resolve(registryRoot, "templates/styles")

const ensureTokensBuilt = async () => {
  try {
    await access(tokensDistIndex)
    return
  } catch {
    console.log("Building @neurex/tokens for registry style sync check...")
  }

  const result = spawnSync("pnpm", ["--filter", "@neurex/tokens", "build"], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: true,
  })

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
  const { outOfSyncFiles, checkedCount } = await findOutOfSyncStyleFiles({
    outputs,
    registryStylesRoot,
    styleFiles: DEFAULT_STYLE_FILES,
  })

  if (outOfSyncFiles.length > 0) {
    console.error("Registry style templates are out of sync:")
    for (const file of outOfSyncFiles) {
      console.error(`- ${file}`)
    }
    console.error(
      "Run `pnpm tokens:generate:styles` to refresh registry templates.",
    )
    process.exitCode = 1
    return
  }

  console.log(`Checked ${checkedCount} registry style template files.`)
}

await checkRegistryStylesSync()
