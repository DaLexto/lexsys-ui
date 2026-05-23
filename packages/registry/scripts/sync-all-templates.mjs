import { spawnSync } from "node:child_process"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const scriptsRoot = dirname(fileURLToPath(import.meta.url))
const checkOnly = process.argv.includes("--check")
const args = checkOnly ? ["--check"] : []

const runScript = (scriptName) => {
  const scriptPath = resolve(scriptsRoot, scriptName)
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    stdio: "inherit",
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

runScript("sync-component-templates.mjs")
runScript("sync-block-templates.mjs")
