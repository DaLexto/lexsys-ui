import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/core/context.js"
import { runAdd } from "../../src/commands/add.js"
import { runUninstall } from "../../src/commands/uninstall.js"

const writeJson = async (path: string, value: unknown): Promise<void> => {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf-8")
}

const consoleOutput = (): string => {
  return vi.mocked(console.log).mock.calls.flat().join("\n")
}

const writeConsumerProject = async (root: string): Promise<void> => {
  await writeJson(join(root, "package.json"), {
    dependencies: {
      "@base-ui/react": "^1.0.0-beta.3",
      "class-variance-authority": "^0.7.1",
      clsx: "^2.1.1",
      "tailwind-merge": "^3.5.0",
    },
    packageManager: "pnpm@10.33.0",
  })
  await mkdir(join(root, "src"), { recursive: true })
  await writeFile(join(root, "src/style.css"), ":root {}\n", "utf-8")
}

describe("runUninstall", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-uninstall-"))
    setCwd(tempDir)
    vi.spyOn(console, "log").mockImplementation(() => undefined)
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("removes installed component files and untracks the component", async () => {
    await writeConsumerProject(tempDir)
    await runAdd(["button"])

    await runUninstall(["button"])

    await expect(
      readFile(join(tempDir, "src/components/ui/Button/Button.tsx"), "utf-8"),
    ).rejects.toThrow()

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as { installed?: Record<string, string> }

    expect(config.installed).toEqual({})
    expect(consoleOutput()).toContain("- untracked components: 1/1")
    expect(consoleOutput()).toContain("- components: 3 removed")
  })

  test("dry run reports targets without deleting files", async () => {
    await writeConsumerProject(tempDir)
    await runAdd(["button"])

    await runUninstall(["button", "--dry-run"])

    await expect(
      readFile(join(tempDir, "src/components/ui/Button/Button.tsx"), "utf-8"),
    ).resolves.toContain("export { Button }")

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as { installed?: Record<string, string> }

    expect(config.installed).toEqual({ button: "0.0.1" })
    expect(consoleOutput()).toContain("Dry run: no files will be removed.")
  })

  test("keeps modified files and leaves the component tracked", async () => {
    await writeConsumerProject(tempDir)
    await runAdd(["button"])

    const buttonPath = join(tempDir, "src/components/ui/Button/Button.tsx")
    await writeFile(buttonPath, "user modified", "utf-8")

    await runUninstall(["button"])

    await expect(readFile(buttonPath, "utf-8")).resolves.toBe("user modified")

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as { installed?: Record<string, string> }

    expect(config.installed).toEqual({ button: "0.0.1" })
    expect(consoleOutput()).toContain("- untracked components: 0/1")
    expect(consoleOutput()).toContain("1 conflicted")
  })

  test("reports components that are not tracked as installed", async () => {
    await writeConsumerProject(tempDir)

    await runUninstall(["button"])

    expect(consoleOutput()).toContain(
      'Component "button" is not tracked as installed.',
    )
  })
})
