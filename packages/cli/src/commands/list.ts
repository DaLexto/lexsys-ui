import { getInstallLayer } from "@lexsys/registry"
import { getRegistryItems } from "../core/registry-provider.js"

interface RunListOptions {
  json?: boolean
  noFallback?: boolean
}

const layerLabels: Record<string, string> = {
  block: "Blocks",
  primitive: "Primitives",
  template: "Templates",
}

export const runList = async (options: RunListOptions = {}): Promise<void> => {
  try {
    const registryItems = await getRegistryItems({
      fallback: !options.noFallback,
    })

    if (options.json) {
      const simplified = registryItems.map((item) => ({
        name: item.name,
        canonicalName: item.canonicalName,
        version: item.version,
        category: item.category,
        layer: getInstallLayer(item),
      }))

      console.log(JSON.stringify(simplified, null, 2))
      return
    }

    const grouped = new Map<string, typeof registryItems>()

    for (const item of registryItems) {
      const layer = getInstallLayer(item) ?? "other"
      const current = grouped.get(layer) ?? []
      current.push(item)
      grouped.set(layer, current)
    }

    console.log("Available Lexsys registry items:\n")

    for (const layer of ["primitive", "block", "template"] as const) {
      const items = grouped.get(layer)

      if (!items?.length) {
        continue
      }

      console.log(`${layerLabels[layer] ?? layer}:`)

      for (const item of items) {
        console.log(
          `- ${item.canonicalName} v${item.version} (${item.category})`,
        )
      }

      console.log("")
    }
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
