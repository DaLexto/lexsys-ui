import { join } from "node:path"
import { getInstallLayer } from "@dalexto/lexsys-registry"
import { getCwd } from "../utils/context.js"
import { loadConfig } from "../config/config.js"
import { fileExists } from "../utils/fs.js"
import { resolveItemInstallTarget } from "../install/target.js"
import { getRegistryProviderResult } from "../registry/provider.js"
import { findItem } from "../registry/resolver.js"

interface RunDoctorOptions {
  noFallback?: boolean
}

export const runDoctor = async (
  options: RunDoctorOptions = {},
): Promise<void> => {
  console.log("Lexsys doctor\n")

  const config = await loadConfig()
  let registryFailed = false

  const checks = [
    {
      label: "package.json",
      path: join(getCwd(), "package.json"),
    },
    {
      label: config.paths.components,
      path: join(getCwd(), config.paths.components),
    },
    {
      label: config.paths.utilities,
      path: join(getCwd(), config.paths.utilities),
    },
    {
      label: config.paths.styles,
      path: join(getCwd(), config.paths.styles),
    },
    {
      label: config.tailwind.css,
      path: join(getCwd(), config.tailwind.css),
    },
  ]

  for (const check of checks) {
    const exists = await fileExists(check.path)
    console.log(`${exists ? "✓" : "×"} ${check.label}`)
  }

  try {
    const registryResult = await getRegistryProviderResult({
      fallback: !options.noFallback,
    })

    console.log("\nRegistry:")
    console.log(`✓ source: ${registryResult.source}`)
    console.log(`✓ fallback: ${registryResult.fallbackUsed ? "yes" : "no"}`)
    console.log(`✓ items: ${registryResult.items.length}`)
  } catch (error) {
    registryFailed = true

    console.log("\nRegistry:")
    console.log("× failed to resolve registry")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }

  if (registryFailed && options.noFallback) {
    return
  }

  const installed = config.installed ?? {}

  if (Object.keys(installed).length) {
    console.log("\nTracked components:")

    for (const [name, version] of Object.entries(installed)) {
      const item = await findItem(name)

      if (!item) {
        console.log(`× ${name} v${version} (missing from registry)`)
        continue
      }

      const componentPath = join(
        getCwd(),
        resolveItemInstallTarget(config, item),
      )
      const exists = await fileExists(componentPath)
      const layer = getInstallLayer(item) ?? "unknown"

      console.log(
        `${exists ? "✓" : "×"} ${item.canonicalName} v${version} (${layer})`,
      )
    }
  }
}
