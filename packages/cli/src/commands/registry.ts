import {
  registryItems,
  registryManifest,
  validateRegistry,
} from "@neurex/registry"
import type { RegistryItem } from "@neurex/registry"
import { getRegistryProviderResult } from "../core/registry-provider.js"
import { fetchRemoteRegistry } from "../core/remote-registry.js"
import { getRegistrySource } from "../core/registry-source.js"

interface RunRegistryOptions {
  summary?: boolean
  source?: boolean
  local?: boolean
  remote?: boolean
  noFallback?: boolean
}

interface RegistryCommandResult {
  items: RegistryItem[]
  source: string
  fallbackUsed: boolean
  manifestVersion: string
}

const localRegistryResult: RegistryCommandResult = {
  items: registryItems,
  source: "local",
  fallbackUsed: false,
  manifestVersion: registryManifest.version,
}

const printRegistrySummary = (result: RegistryCommandResult): void => {
  console.log("Neurex registry summary\n")
  console.log(`Registry source: ${result.source}`)
  console.log(`Fallback used: ${result.fallbackUsed ? "yes" : "no"}`)
  console.log(`Items: ${result.items.length}`)

  for (const item of result.items) {
    const remoteFileCount = item.remoteFiles?.length ?? 0

    console.log(
      `- ${item.canonicalName} v${item.version} (${item.type}/${item.category}, remote files: ${remoteFileCount})`,
    )
  }
}

const printRegistryJson = (result: RegistryCommandResult): void => {
  console.log(
    JSON.stringify(
      {
        version: result.manifestVersion,
        source: result.source,
        fallbackUsed: result.fallbackUsed,
        items: result.items,
      },
      null,
      2,
    ),
  )
}

const getRemoteRegistryResult = async (
  source: string,
): Promise<RegistryCommandResult> => {
  const remote = await fetchRemoteRegistry(source)
  validateRegistry(remote.items)

  return {
    items: remote.items,
    source,
    fallbackUsed: false,
    manifestVersion: remote.version,
  }
}

export const runRegistry = async (
  options: RunRegistryOptions = {},
): Promise<void> => {
  const fallback = !options.noFallback

  try {
    if (options.local) {
      if (options.source) {
        console.log(localRegistryResult.source)
        return
      }

      if (options.summary) {
        printRegistrySummary(localRegistryResult)
        return
      }

      console.log(JSON.stringify(registryManifest, null, 2))
      return
    }

    if (options.remote) {
      const source = await getRegistrySource()

      if (source === "local") {
        console.log("No remote registry URL configured.")
        return
      }

      const result = await getRemoteRegistryResult(source)

      if (options.source) {
        console.log(result.source)
        return
      }

      if (options.summary) {
        printRegistrySummary(result)
        return
      }

      printRegistryJson(result)
      return
    }

    const result = await getRegistryProviderResult({ fallback })

    if (options.source) {
      if (result.fallbackUsed) {
        console.log(`${result.source} (fallback: local)`)
        return
      }

      console.log(result.source)
      return
    }

    if (options.summary) {
      printRegistrySummary(result)
      return
    }

    printRegistryJson(result)
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
