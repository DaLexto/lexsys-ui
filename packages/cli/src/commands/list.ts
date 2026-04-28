import { getRegistryItems } from "../core/registry-provider.js"

interface RunListOptions {
  json?: boolean
  noFallback?: boolean
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
      }))

      console.log(JSON.stringify(simplified, null, 2))
      return
    }

    console.log("Available Neurex UI components:\n")

    for (const item of registryItems) {
      console.log(`- ${item.canonicalName} v${item.version} (${item.category})`)
    }
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
