import { mkdir, readFile, writeFile } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { fileExists } from "./fs.js"

const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neurex Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const mainTsx = `import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`

const appTsx = `export const App = () => {
  return (
    <main>
      <h1>Neurex + Vite</h1>
    </main>
  );
};
`

const styleCss = `@import "tailwindcss";

:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
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

  return normalized || "neurex-vite-app"
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
      preview: "vite preview",
    },
  }

  if (packageManager) {
    packageJson.packageManager = packageManager
  }

  return JSON.stringify(packageJson, null, 2) + "\n"
}

const writeScaffoldFile = async (
  targetPath: string,
  content: string,
): Promise<void> => {
  if (await fileExists(targetPath)) {
    const existingContent = await readFile(targetPath, "utf-8")

    if (existingContent === content) {
      console.log(`Skipped identical scaffold file: ${targetPath}`)
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

  await writeScaffoldFile(
    join(targetDirectory, "package.json"),
    getPackageJson(targetDirectory),
  )
  await writeScaffoldFile(join(targetDirectory, "index.html"), indexHtml)
  await writeScaffoldFile(join(targetDirectory, "vite.config.ts"), viteConfig)
  await writeScaffoldFile(join(targetDirectory, "src", "main.tsx"), mainTsx)
  await writeScaffoldFile(join(targetDirectory, "src", "App.tsx"), appTsx)
  await writeScaffoldFile(join(targetDirectory, "src", "style.css"), styleCss)
}
