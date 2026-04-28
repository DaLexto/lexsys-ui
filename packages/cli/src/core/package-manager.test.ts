import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "./context.js"

const execFileSyncMock = vi.hoisted(() => vi.fn())

vi.mock("node:child_process", () => ({
  execFileSync: execFileSyncMock,
}))

const { installDependencies } = await import("./package-manager.js")

describe("installDependencies", () => {
  let tempDir: string

  beforeEach(async () => {
    execFileSyncMock.mockReset()
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-pm-"))
    setCwd(tempDir)
  })

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("reads package.json from the configured cwd and installs only missing dependencies there", async () => {
    await writeFile(
      join(tempDir, "package.json"),
      JSON.stringify(
        {
          dependencies: {
            clsx: "^2.1.1",
          },
          packageManager: "pnpm@10.33.0",
        },
        null,
        2,
      ),
      "utf-8",
    )

    await installDependencies(["clsx", "tailwind-merge"])

    expect(execFileSyncMock).toHaveBeenCalledWith(
      "pnpm",
      ["add", "tailwind-merge"],
      {
        cwd: tempDir,
        stdio: "inherit",
      },
    )
  })
})
