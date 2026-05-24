import { loadConfig } from "../core/config.js"
import { findItem } from "../core/registry-resolver.js"
import { getRegistryProviderResult } from "../core/registry-provider.js"

interface RunStatusOptions {
  noFallback?: boolean
}

export const runStatus = async (
  options: RunStatusOptions = {},
): Promise<void> => {
  const config = await loadConfig()
  const installed = config.installed ?? {}

  if (!Object.keys(installed).length) {
    console.log("No Lexsys components are currently tracked.")
    return
  }

  try {
    await getRegistryProviderResult({
      fallback: !options.noFallback,
    })
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
    return
  }

  console.log("Installed Lexsys components:\n")

  for (const [name, installedVersion] of Object.entries(installed)) {
    const item = await findItem(name)

    if (!item) {
      console.log(`- ${name} v${installedVersion} (missing from registry)`)
      continue
    }

    const status =
      item.version === installedVersion
        ? "up to date"
        : `update available: v${installedVersion} → v${item.version}`

    console.log(`- ${item.canonicalName} v${installedVersion} (${status})`)
  }
}
