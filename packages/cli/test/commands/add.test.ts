import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/core/context.js"
import { runAdd } from "../../src/commands/add.js"

const writeJson = async (path: string, value: unknown): Promise<void> => {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf-8")
}

const consoleOutput = (): string => {
  return vi.mocked(console.log).mock.calls.flat().join("\n")
}

describe("runAdd", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-add-"))
    setCwd(tempDir)
    vi.spyOn(console, "log").mockImplementation(() => undefined)
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("does not track an item as installed when component files conflict", async () => {
    await writeJson(join(tempDir, "package.json"), {
      dependencies: {
        "@base-ui/react": "^1.0.0-beta.3",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "tailwind-merge": "^3.5.0",
      },
      packageManager: "pnpm@10.33.0",
    })

    const buttonDir = join(tempDir, "src/components/ui/Button")
    await mkdir(buttonDir, { recursive: true })
    await writeFile(join(buttonDir, "Button.tsx"), "user modified", "utf-8")

    await runAdd(["button"])

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as { installed?: Record<string, string> }

    expect(config.installed).toEqual({})
    expect(consoleOutput()).toContain("- tracked components: 0/1")
    expect(consoleOutput()).toContain("- components: 2 created, 1 conflicted")
  })

  test("installs styles required by registry metadata", async () => {
    await writeJson(join(tempDir, "package.json"), {
      dependencies: {
        "@base-ui/react": "^1.0.0-beta.3",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "tailwind-merge": "^3.5.0",
      },
      packageManager: "pnpm@10.33.0",
    })
    await mkdir(join(tempDir, "src"), { recursive: true })
    await writeFile(join(tempDir, "src/style.css"), ":root {}\n", "utf-8")

    await runAdd(["button"])

    await expect(
      readFile(join(tempDir, "styles/neurex/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-button-radius")
    await expect(
      readFile(join(tempDir, "styles/neurex/theme.css"), "utf-8"),
    ).resolves.toContain("@theme inline")
    await expect(
      readFile(join(tempDir, "src/style.css"), "utf-8"),
    ).resolves.toBe(
      '@import "../styles/neurex/tokens.css";\n' +
        '@import "../styles/neurex/theme.css";\n' +
        ":root {}\n",
    )

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as { installed?: Record<string, string>; tailwind?: { css?: string } }

    expect(config.installed).toEqual({ button: "0.0.1" })
    expect(consoleOutput()).toContain("- tracked components: 1/1")
    expect(config.tailwind?.css).toBe("src/style.css")
  })

  test("tracks an item as installed when only shared utilities conflict", async () => {
    await writeJson(join(tempDir, "package.json"), {
      dependencies: {
        "@base-ui/react": "^1.0.0-beta.3",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "tailwind-merge": "^3.5.0",
      },
      packageManager: "pnpm@10.33.0",
    })
    await mkdir(join(tempDir, "lib/neurex"), { recursive: true })
    await writeFile(join(tempDir, "lib/neurex/cn.ts"), "user cn", "utf-8")

    await runAdd(["button"])

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as { installed?: Record<string, string> }

    expect(config.installed).toEqual({ button: "0.0.1" })
    expect(consoleOutput()).toContain("- tracked components: 1/1")
    expect(consoleOutput()).toContain("- shared resources:")
    expect(consoleOutput()).toContain(
      "Shared resource conflicts were left untouched.",
    )
    await expect(
      readFile(join(tempDir, "lib/neurex/cn.ts"), "utf-8"),
    ).resolves.toBe("user cn")
  })
})
