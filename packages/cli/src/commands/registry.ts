import {
  registryItems,
  registryManifest,
  validateRegistry,
} from "@dalexto/lexsys-registry"
import {
  getRegistryProviderResult,
  type RegistryProviderResult,
} from "../registry/provider.js"
import { fetchRemoteRegistry } from "../registry/remote.js"
import { getRegistrySource } from "../registry/source.js"

interface RunRegistryOptions {
  summary?: boolean
  source?: boolean
  local?: boolean
  remote?: boolean
  noFallback?: boolean
}

const localRegistryResult: RegistryProviderResult = {
  items: registryItems,
  source: "local",
  fallbackUsed: false,
  manifestVersion: registryManifest.version,
}

const printRegistrySummary = (result: RegistryProviderResult): void => {
  console.log("Lexsys registry summary\n")
  console.log(`Registry source: ${result.source}`)
  console.log(`Fallback used: ${result.fallbackUsed ? "yes" : "no"}`)
  console.log(`Items: ${result.items.length}`)

  for (const item of result.items) {
    const remoteFileCount = item.remoteFiles?.length ?? 0

    console.log(
      `- ${item.canonicalName} (${item.type}/${item.category}, remote files: ${remoteFileCount})`,
    )
  }
}

const printRegistryJson = (result: RegistryProviderResult): void => {
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
): Promise<RegistryProviderResult> => {
  const remote = await fetchRemoteRegistry(source)
  validateRegistry(
    remote.items,
    remote.styles !== undefined
      ? {
          styles: remote.styles,
        }
      : {},
  )

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
