import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import type { NeurexConfig } from "./config.js"
import { getCwd } from "./context.js"
import { fileExists } from "./fs.js"

const tailwindImport = '@import "tailwindcss";'
const viteConfigFiles = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
]

export const ensureTailwindCssImport = async (
  config: NeurexConfig,
): Promise<void> => {
  const cssPath = join(getCwd(), config.tailwind.css)

  if (!(await fileExists(cssPath))) {
    await mkdir(dirname(cssPath), { recursive: true })
    await writeFile(cssPath, `${tailwindImport}\n`, "utf-8")
    console.log(`Created Tailwind CSS entrypoint: ${cssPath}`)
    return
  }

  const content = await readFile(cssPath, "utf-8")

  if (content.includes(tailwindImport)) {
    console.log(
      `Skipped Tailwind CSS import: ${cssPath} already imports Tailwind`,
    )
    return
  }

  await writeFile(cssPath, `${tailwindImport}\n${content}`, "utf-8")
  console.log(`Updated Tailwind CSS entrypoint: ${cssPath}`)
}

export const ensureViteTailwindPlugin = async (): Promise<void> => {
  const viteConfigPath = await findViteConfigPath()

  if (!viteConfigPath) {
    console.log("Skipped Vite Tailwind plugin: no Vite config found.")
    return
  }

  const content = await readFile(viteConfigPath, "utf-8")
  const withImport = ensureTailwindViteImport(content)
  const updatedContent = ensureTailwindVitePluginUsage(withImport)

  if (updatedContent === content) {
    console.log(
      `Skipped Vite Tailwind plugin: ${viteConfigPath} already configured`,
    )
    return
  }

  await writeFile(viteConfigPath, updatedContent, "utf-8")
  console.log(`Updated Vite config: ${viteConfigPath}`)
}

const findViteConfigPath = async (): Promise<string | undefined> => {
  for (const file of viteConfigFiles) {
    const path = join(getCwd(), file)

    if (await fileExists(path)) {
      return path
    }
  }

  return undefined
}

const ensureTailwindViteImport = (content: string): string => {
  if (content.includes("@tailwindcss/vite")) {
    return content
  }

  const importMatch = content.match(/^(?:import[^\n]*\n)+/u)

  if (!importMatch) {
    return `import tailwindcss from "@tailwindcss/vite";\n${content}`
  }

  return `${content.slice(0, importMatch[0].length)}import tailwindcss from "@tailwindcss/vite";\n${content.slice(importMatch[0].length)}`
}

const ensureTailwindVitePluginUsage = (content: string): string => {
  if (content.includes("tailwindcss()")) {
    return content
  }

  const pluginsMatch = content.match(/plugins\s*:\s*\[/u)

  if (pluginsMatch?.index !== undefined) {
    const insertionIndex = pluginsMatch.index + pluginsMatch[0].length

    return `${content.slice(0, insertionIndex)}tailwindcss(), ${content.slice(insertionIndex)}`
  }

  return content.replace(
    /defineConfig\(\s*\{/u,
    "defineConfig({\n  plugins: [tailwindcss()],",
  )
}
