import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import type { LexsysConfig } from "./config.js"
import { getCwd } from "./context.js"
import { fileExists } from "./fs.js"

const tailwindImport = '@import "tailwindcss";'
const viteConfigFiles = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
]
const tsConfigFiles = ["tsconfig.app.json", "tsconfig.json"]
const postcssConfigFiles = ["postcss.config.mjs", "postcss.config.js"]
const viteSrcAlias = `"@": fileURLToPath(new URL("./src", import.meta.url))`
const tsSrcAlias = `"@/*": ["./src/*"]`

export const ensureTailwindCssImport = async (
  config: LexsysConfig,
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

export const ensureViteSrcAlias = async (): Promise<void> => {
  const viteConfigPath = await findViteConfigPath()

  if (!viteConfigPath) {
    console.log("Skipped Vite alias: no Vite config found.")
    return
  }

  const content = await readFile(viteConfigPath, "utf-8")
  const withImport = ensureNodeUrlImport(content)
  const updatedContent = ensureViteResolveAliasUsage(withImport)

  if (updatedContent === content) {
    console.log(`Skipped Vite alias: ${viteConfigPath} already configured`)
    return
  }

  await writeFile(viteConfigPath, updatedContent, "utf-8")
  console.log(`Updated Vite alias: ${viteConfigPath}`)
}

export const ensureTypeScriptSrcAlias = async (): Promise<void> => {
  const tsConfigPath = await findTypeScriptConfigPath()

  if (!tsConfigPath) {
    const fallbackPath = join(getCwd(), "tsconfig.json")

    await writeFile(
      fallbackPath,
      `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
`,
      "utf-8",
    )
    console.log(`Created TypeScript alias config: ${fallbackPath}`)
    return
  }

  const content = await readFile(tsConfigPath, "utf-8")
  const updatedContent = ensureTypeScriptPathsAlias(content)

  if (updatedContent === content) {
    console.log(`Skipped TypeScript alias: ${tsConfigPath} already configured`)
    return
  }

  await writeFile(tsConfigPath, updatedContent, "utf-8")
  console.log(`Updated TypeScript alias: ${tsConfigPath}`)
}

export const ensureNextPostCssConfig = async (): Promise<void> => {
  for (const file of postcssConfigFiles) {
    const configPath = join(getCwd(), file)

    if (!(await fileExists(configPath))) {
      continue
    }

    const content = await readFile(configPath, "utf-8")

    if (content.includes("@tailwindcss/postcss")) {
      console.log(
        `Skipped PostCSS config: ${configPath} already configures Tailwind`,
      )
      return
    }
  }

  const targetPath = join(getCwd(), "postcss.config.mjs")
  await writeFile(
    targetPath,
    `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
`,
    "utf-8",
  )
  console.log(`Created PostCSS config: ${targetPath}`)
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

const findTypeScriptConfigPath = async (): Promise<string | undefined> => {
  for (const file of tsConfigFiles) {
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
    return `import tailwindcss from "@tailwindcss/vite"\n${content}`
  }

  return `${content.slice(0, importMatch[0].length)}import tailwindcss from "@tailwindcss/vite"\n${content.slice(importMatch[0].length)}`
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

const ensureNodeUrlImport = (content: string): string => {
  if (content.includes('from "node:url"')) {
    return content
  }

  return `import { fileURLToPath, URL } from "node:url"\n${content}`
}

const ensureViteResolveAliasUsage = (content: string): string => {
  if (content.includes(viteSrcAlias)) {
    return content
  }

  if (/"@":\s*fileURLToPath/u.test(content) || content.includes("resolve:")) {
    return content
  }

  return content.replace(
    /defineConfig\(\s*\{/u,
    `defineConfig({
  resolve: {
    alias: {
      ${viteSrcAlias},
    },
  },`,
  )
}

const ensureTypeScriptPathsAlias = (content: string): string => {
  if (content.includes(tsSrcAlias)) {
    return content
  }

  if (/"paths"\s*:\s*\{\s*\}/u.test(content)) {
    return content.replace(
      /"paths"\s*:\s*\{\s*\}/u,
      `"paths": {
      ${tsSrcAlias}
    }`,
    )
  }

  if (/"paths"\s*:\s*\{/u.test(content)) {
    return content.replace(
      /"paths"\s*:\s*\{/u,
      `"paths": {\n      ${tsSrcAlias},`,
    )
  }

  if (/"compilerOptions"\s*:\s*\{\s*\}/u.test(content)) {
    return content.replace(
      /"compilerOptions"\s*:\s*\{\s*\}/u,
      `"compilerOptions": {
    "paths": {
      ${tsSrcAlias}
    }
  }`,
    )
  }

  if (/"compilerOptions"\s*:\s*\{/u.test(content)) {
    return content.replace(
      /"compilerOptions"\s*:\s*\{/u,
      `"compilerOptions": {
    "paths": {
      ${tsSrcAlias}
    },`,
    )
  }

  return content
}
