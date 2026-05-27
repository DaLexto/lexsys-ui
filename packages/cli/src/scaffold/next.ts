import { mkdir } from "node:fs/promises"
import { basename, join } from "node:path"
import { writePackageJsonFile, writeScaffoldFile } from "./scaffold-helpers.js"

export const NEXT_VERSION = "15.3.3"

const gitIgnore = `node_modules
.next
out
dist
*.local
.env
.env.*
!.env.example
`

const prettierIgnore = `node_modules
.next
out
dist
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

const nextConfig = `import type { NextConfig } from "next"

const nextConfig: NextConfig = {}

export default nextConfig
`

const postcssConfig = `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
`

const tsConfig = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "global.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`

const nextEnvDts = `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`

const globalDts = `declare module "*.css" {
  const content: Record<string, string>
  export default content
}
`

const layoutTsx = `import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lexsys Next App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`

const pageTsx = `export default function Home() {
  return (
    <main>
      <h1>Lexsys + Next.js</h1>
    </main>
  )
}
`

const globalsCss = `@import "tailwindcss";

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

  return normalized || "lexsys-next-app"
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
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      typecheck: "tsc --noEmit",
      format: "prettier --write .",
      "format:check": "prettier --check .",
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
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      typecheck: "tsc --noEmit",
      format: "prettier --write .",
      "format:check": "prettier --check .",
      ...existingScripts,
    },
  }

  if (packageManager && typeof mergedPackageJson.packageManager !== "string") {
    mergedPackageJson.packageManager = packageManager
  }

  return JSON.stringify(mergedPackageJson, null, 2) + "\n"
}

export const scaffoldNextProject = async (
  targetDirectory: string,
): Promise<void> => {
  await mkdir(targetDirectory, { recursive: true })

  await writePackageJsonFile(targetDirectory, getPackageJson, mergePackageJson)
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
  await writeScaffoldFile(join(targetDirectory, "next.config.ts"), nextConfig, {
    allowExisting: true,
  })
  await writeScaffoldFile(
    join(targetDirectory, "postcss.config.mjs"),
    postcssConfig,
    {
      allowExisting: true,
    },
  )
  await writeScaffoldFile(join(targetDirectory, "tsconfig.json"), tsConfig, {
    allowExisting: true,
  })
  await writeScaffoldFile(join(targetDirectory, "next-env.d.ts"), nextEnvDts, {
    allowExisting: true,
  })
  await writeScaffoldFile(join(targetDirectory, "global.d.ts"), globalDts, {
    allowExisting: true,
  })
  await writeScaffoldFile(join(targetDirectory, "app", "layout.tsx"), layoutTsx)
  await writeScaffoldFile(join(targetDirectory, "app", "page.tsx"), pageTsx)
  await writeScaffoldFile(
    join(targetDirectory, "app", "globals.css"),
    globalsCss,
    {
      allowExisting: true,
    },
  )
}
