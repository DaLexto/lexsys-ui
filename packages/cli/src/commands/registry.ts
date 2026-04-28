import { registryItems, registryManifest } from "@neurex-ui/registry"
import {
  getRegistryItems,
  getRegistryProviderResult,
} from "../core/registry-provider.js"

interface RunRegistryOptions {
  summary?: boolean
  source?: boolean
  local?: boolean
  remote?: boolean
  noFallback?: boolean
}

export const runRegistry = async (
  options: RunRegistryOptions = {},
): Promise<void> => {
  const fallback = !options.noFallback

  try {
    const result = await getRegistryProviderResult({ fallback })
    const effectiveSource = options.local ? "local" : result.source

    if (options.source) {
      if (result.fallbackUsed && !options.local) {
        console.log(`${result.source} (fallback: local)`)
        return
      }

      console.log(effectiveSource)
      return
    }

    if (options.remote) {
      if (effectiveSource === "local") {
        console.log("No remote registry URL configured.")
        return
      }

      const items = await getRegistryItems({ fallback })

      console.log(JSON.stringify(items, null, 2))
      return
    }

    if (options.summary) {
      console.log("Neurex UI registry summary\n")
      console.log(`Registry source: ${effectiveSource}`)
      console.log(
        `Fallback used: ${result.fallbackUsed && !options.local ? "yes" : "no"}`,
      )
      console.log(
        `Items: ${options.local ? registryItems.length : result.items.length}`,
      )

      const items = options.local ? registryItems : result.items

      for (const item of items) {
        const remoteFileCount = item.remoteFiles?.length ?? 0

        console.log(
          `- ${item.canonicalName} v${item.version} (${item.type}/${item.category}, remote files: ${remoteFileCount})`,
        )
      }

      return
    }

    if (options.local) {
      console.log(JSON.stringify(registryManifest, null, 2))
      return
    }

    console.log(
      JSON.stringify(
        {
          version: result.manifestVersion,
          items: result.items,
        },
        null,
        2,
      ),
    )
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
