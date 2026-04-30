import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/core/context.js"
import { runAdd } from "../../src/commands/add.js"
import { runInit } from "../../src/commands/init.js"

const writeJson = async (path: string, value: unknown): Promise<void> => {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf-8")
}

const countOccurrences = (content: string, pattern: string): number => {
  return content.split(pattern).length - 1
}

describe("install flow smoke", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-flow-"))
    setCwd(tempDir)
    vi.spyOn(console, "log").mockImplementation(() => undefined)
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("initializes a Vite consumer and installs components idempotently", async () => {
    await writeJson(join(tempDir, "package.json"), {
      dependencies: {
        "@base-ui/react": "^1.4.1",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "tailwind-merge": "^3.5.0",
      },
      devDependencies: {
        "@tailwindcss/vite": "^4.2.4",
        tailwindcss: "^4.2.4",
      },
      packageManager: "npm@11.0.0",
    })
    await mkdir(join(tempDir, "src"), { recursive: true })
    await writeFile(join(tempDir, "src/style.css"), ":root {}\n", "utf-8")
    await writeFile(
      join(tempDir, "vite.config.ts"),
      'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n});\n',
      "utf-8",
    )

    await runInit()
    await runAdd(["button", "card"])
    await runInit()
    await runAdd(["button", "card"])

    const css = await readFile(join(tempDir, "src/style.css"), "utf-8")
    expect(css).toBe(
      '@import "tailwindcss";\n' +
        '@import "../styles/tokens.css";\n' +
        '@import "../styles/theme.css";\n' +
        ":root {}\n",
    )
    expect(countOccurrences(css, '@import "tailwindcss";')).toBe(1)
    expect(countOccurrences(css, "../styles/tokens.css")).toBe(1)
    expect(countOccurrences(css, "../styles/theme.css")).toBe(1)

    await expect(
      readFile(join(tempDir, "vite.config.ts"), "utf-8"),
    ).resolves.toContain("plugins: [tailwindcss(), react()]")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-button-radius")
    await expect(
      readFile(join(tempDir, "styles/theme.css"), "utf-8"),
    ).resolves.toContain("--color-nx-primary")
    await expect(
      readFile(join(tempDir, "src/lib/utils.ts"), "utf-8"),
    ).resolves.toContain("twMerge")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Button/Button.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-nx-primary")
    await expect(
      readFile(join(tempDir, "src/components/ui/Button/Button.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Card/Card.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-nx-surface")
    await expect(
      readFile(join(tempDir, "src/components/ui/Card/Card.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as {
      installed?: Record<string, string>
      style?: string
      tailwind?: { css?: string }
    }

    expect(config.style).toBe("default")
    expect(config.tailwind?.css).toBe("src/style.css")
    expect(config.installed).toEqual({ button: "0.0.1", card: "0.0.1" })
  })
})
