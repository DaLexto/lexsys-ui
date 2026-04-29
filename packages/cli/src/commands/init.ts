import { loadConfig, saveConfig } from "../core/config.js"
import { ensureProjectStructure } from "../core/installer.js"
import { installDependencies } from "../core/package-manager.js"
import {
  ensureTailwindCssImport,
  ensureViteTailwindPlugin,
} from "../core/tailwind-setup.js"

const tailwindViteDependencies = ["tailwindcss", "@tailwindcss/vite"]

export const runInit = async (): Promise<void> => {
  console.log("Initializing Neurex...\n")

  const config = await loadConfig()

  await ensureProjectStructure(config)
  await installDependencies(tailwindViteDependencies, { dev: true })
  await ensureTailwindCssImport(config)
  await ensureViteTailwindPlugin()
  await saveConfig(config)

  console.log("\nDone.")
}
