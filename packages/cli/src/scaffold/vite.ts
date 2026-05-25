import { mkdir, readFile, writeFile } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { fileExists } from "../core/fs.js"

const viteConfig = `import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
`

const tsConfig = `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
`

const tsConfigApp = `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "types": ["vite/client"],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
`

const tsConfigNode = `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
`

const gitIgnore = `node_modules
dist
dist-ssr
*.local
.env
.env.*
!.env.example
`

const prettierIgnore = `node_modules
dist
dist-ssr
coverage
pnpm-lock.yaml
package-lock.json
yarn.lock
`

const prettierConfig = `{
  "semi": false,
  "trailingComma": "all"
}
`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lexsys Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const mainTsx = `import React from "react"
import ReactDOM from "react-dom/client"
import "./style.css"
import { App } from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`

const appTsx = `export const App = () => {
  return (
    <main>
      <h1>Lexsys + Vite</h1>
    </main>
  )
}
`

const styleCss = `@import "tailwindcss";

:root {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: #111827;
  background: #ffffff;
}

body {
  margin: 0;
}

main {
  min-height: 100vh;
  display: grid;
  place-items: center;
}
`

const sanitizePackageName = (name: string): string => {
  const normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/gu, "-")
    .replace(/^-+|-+$/gu, "")

  return normalized || "lexsys-vite-app"
}

const getPackageManagerFromUserAgent = (): string | undefined => {
  const userAgent = process.env.npm_config_user_agent
  const match = userAgent?.match(/^(npm|pnpm|yarn)\/([^\s]+)/u)

  if (!match) {
    return undefined
  }

  return `${match[1]}@${match[2]}`
}

const getPackageJson = (targetDirectory: string): string => {
  const packageManager = getPackageManagerFromUserAgent()
  const packageJson: Record<string, unknown> = {
    name: sanitizePackageName(basename(targetDirectory)),
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      typecheck: "tsc -b",
      format: "prettier --write .",
      "format:check": "prettier --check .",
      preview: "vite preview",
    },
  }

  if (packageManager) {
    packageJson.packageManager = packageManager
  }

  return JSON.stringify(packageJson, null, 2) + "\n"
}

const getRecordValue = (value: unknown): Record<string, unknown> => {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {}
}

const mergePackageJson = (
  targetDirectory: string,
  existingPackageJson: Record<string, unknown>,
): string => {
  const packageManager = getPackageManagerFromUserAgent()
  const existingScripts = getRecordValue(existingPackageJson.scripts)
  const mergedPackageJson: Record<string, unknown> = {
    ...existingPackageJson,
    name:
      typeof existingPackageJson.name === "string"
        ? existingPackageJson.name
        : sanitizePackageName(basename(targetDirectory)),
    private:
      typeof existingPackageJson.private === "boolean"
        ? existingPackageJson.private
        : true,
    version:
      typeof existingPackageJson.version === "string"
        ? existingPackageJson.version
        : "0.0.0",
    type:
      typeof existingPackageJson.type === "string"
        ? existingPackageJson.type
        : "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      typecheck: "tsc -b",
      format: "prettier --write .",
      "format:check": "prettier --check .",
      preview: "vite preview",
      ...existingScripts,
    },
  }

  if (packageManager && typeof mergedPackageJson.packageManager !== "string") {
    mergedPackageJson.packageManager = packageManager
  }

  return JSON.stringify(mergedPackageJson, null, 2) + "\n"
}

const writePackageJson = async (targetDirectory: string): Promise<void> => {
  const targetPath = join(targetDirectory, "package.json")

  if (!(await fileExists(targetPath))) {
    await writeFile(targetPath, getPackageJson(targetDirectory), "utf-8")
    console.log(`Created scaffold file: ${targetPath}`)
    return
  }

  let parsed: Record<string, unknown>

  try {
    parsed = JSON.parse(await readFile(targetPath, "utf-8")) as Record<
      string,
      unknown
    >
  } catch {
    throw new Error(`Invalid existing package.json: ${targetPath}`)
  }

  const content = await readFile(targetPath, "utf-8")
  const mergedContent = mergePackageJson(targetDirectory, parsed)

  if (content === mergedContent) {
    console.log(`Skipped package.json: ${targetPath} already configured`)
    return
  }

  await writeFile(targetPath, mergedContent, "utf-8")
  console.log(`Updated package.json: ${targetPath}`)
}

const writeScaffoldFile = async (
  targetPath: string,
  content: string,
  options: { allowExisting?: boolean } = {},
): Promise<void> => {
  if (await fileExists(targetPath)) {
    const existingContent = await readFile(targetPath, "utf-8")

    if (existingContent === content) {
      console.log(`Skipped identical scaffold file: ${targetPath}`)
      return
    }

    if (options.allowExisting) {
      console.log(`Skipped existing scaffold file: ${targetPath}`)
      return
    }

    throw new Error(
      `Refusing to overwrite existing scaffold file: ${targetPath}`,
    )
  }

  await mkdir(dirname(targetPath), { recursive: true })
  await writeFile(targetPath, content, "utf-8")
  console.log(`Created scaffold file: ${targetPath}`)
}

export const scaffoldViteProject = async (
  targetDirectory: string,
): Promise<void> => {
  await mkdir(targetDirectory, { recursive: true })

  await writePackageJson(targetDirectory)
  await writeScaffoldFile(join(targetDirectory, ".gitignore"), gitIgnore, {
    allowExisting: true,
  })
  await writeScaffoldFile(
    join(targetDirectory, ".prettierignore"),
    prettierIgnore,
    {
      allowExisting: true,
    },
  )
  await writeScaffoldFile(
    join(targetDirectory, ".prettierrc"),
    prettierConfig,
    {
      allowExisting: true,
    },
  )
  await writeScaffoldFile(join(targetDirectory, "index.html"), indexHtml)
  await writeScaffoldFile(join(targetDirectory, "tsconfig.json"), tsConfig)
  await writeScaffoldFile(
    join(targetDirectory, "tsconfig.app.json"),
    tsConfigApp,
  )
  await writeScaffoldFile(
    join(targetDirectory, "tsconfig.node.json"),
    tsConfigNode,
  )
  await writeScaffoldFile(join(targetDirectory, "vite.config.ts"), viteConfig, {
    allowExisting: true,
  })
  await writeScaffoldFile(join(targetDirectory, "src", "main.tsx"), mainTsx)
  await writeScaffoldFile(join(targetDirectory, "src", "App.tsx"), appTsx)
  await writeScaffoldFile(join(targetDirectory, "src", "style.css"), styleCss, {
    allowExisting: true,
  })
}
