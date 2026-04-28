import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { defaultConfig, getConfigPath } from "../core/config.js"
import { writeFileIfMissing } from "../core/fs.js"
import { getCwd } from "../core/context.js"

export const runInit = async (): Promise<void> => {
  console.log("Initializing Neurex UI...\n")

  await mkdir(join(getCwd(), "components", "ui"), { recursive: true })
  await mkdir(join(getCwd(), "lib", "neurex"), { recursive: true })
  await mkdir(join(getCwd(), "styles", "neurex"), { recursive: true })

  await writeFileIfMissing(
    getConfigPath(),
    JSON.stringify(defaultConfig, null, 2) + "\n",
  )

  console.log("\nDone.")
}
