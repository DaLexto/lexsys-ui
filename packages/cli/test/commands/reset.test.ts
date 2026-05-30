import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/utils/context.js"
import { runAdd } from "../../src/commands/add.js"
import { runReset } from "../../src/commands/reset.js"

const writeJson = async (path: string, value: unknown): Promise<void> => {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf-8")
}

const consoleOutput = (): string => {
  return vi.mocked(console.log).mock.calls.flat().join("\n")
}

describe("runReset", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "lexsys-cli-reset-"))
    setCwd(tempDir)
    vi.spyOn(console, "log").mockImplementation(() => undefined)
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("restores modified component files from registry templates", async () => {
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

    const buttonPath = join(tempDir, "src/components/ui/Button/Button.tsx")
    await writeFile(buttonPath, "user modified", "utf-8")

    await runReset(["button"])

    const restored = await readFile(buttonPath, "utf-8")
    expect(restored).toContain("export { Button }")
    expect(restored).not.toBe("user modified")
    expect(consoleOutput()).toContain("updated successfully")
  })
})
