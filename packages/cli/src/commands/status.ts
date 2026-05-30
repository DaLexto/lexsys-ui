import { loadConfig } from "../config/config.js"
import { findItem } from "../registry/resolver.js"
import { getRegistryProviderResult } from "../registry/provider.js"
import { getComponentDriftStatus } from "../install/component-drift.js"

interface RunStatusOptions {
  noFallback?: boolean
}

export const runStatus = async (
  options: RunStatusOptions = {},
): Promise<void> => {
  const config = await loadConfig()
  const installed = config.installed ?? []

  if (!installed.length) {
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

  for (const name of installed) {
    const item = await findItem(name)

    if (!item) {
      console.log(`- ${name} (missing from registry)`)
      continue
    }

    const driftStatus = await getComponentDriftStatus(name)
    const status =
      driftStatus === "drift"
        ? "out of sync with registry"
        : "up to date with registry"

    console.log(`- ${item.canonicalName} (${status})`)
  }
}
