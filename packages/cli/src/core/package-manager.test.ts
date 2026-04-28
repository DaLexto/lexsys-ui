import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "./context.js"

const execFileSyncMock = vi.hoisted(() => vi.fn())

vi.mock("node:child_process", () => ({
  execFileSync: execFileSyncMock,
}))

const { getPackageManagerInvocation, installDependencies } =
  await import("./package-manager.js")

const packageManagerCommand = (packageManager: "npm" | "pnpm" | "yarn") => {
  return getPackageManagerInvocation(packageManager, []).command
}

const packageManagerArgs = (
  packageManager: "npm" | "pnpm" | "yarn",
  args: string[],
) => {
  return getPackageManagerInvocation(packageManager, args).args
}

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
      packageManagerCommand("pnpm"),
      packageManagerArgs("pnpm", ["add", "tailwind-merge"]),
      {
        cwd: tempDir,
        stdio: "inherit",
      },
    )
  })

  test("installs missing dev dependencies with the detected package manager", async () => {
    await writeFile(
      join(tempDir, "package.json"),
      JSON.stringify(
        {
          devDependencies: {
            tailwindcss: "^4.2.4",
          },
          packageManager: "npm@11.0.0",
        },
        null,
        2,
      ),
      "utf-8",
    )

    await installDependencies(["tailwindcss", "@tailwindcss/vite"], {
      dev: true,
    })

    expect(execFileSyncMock).toHaveBeenCalledWith(
      packageManagerCommand("npm"),
      packageManagerArgs("npm", ["install", "--save-dev", "@tailwindcss/vite"]),
      {
        cwd: tempDir,
        stdio: "inherit",
      },
    )
  })

  test("rejects unsafe dependency names before invoking the package manager", async () => {
    await writeFile(
      join(tempDir, "package.json"),
      JSON.stringify({ packageManager: "npm@11.0.0" }, null, 2),
      "utf-8",
    )

    await expect(installDependencies(["clsx && bad"])).rejects.toThrow(
      "Invalid dependency name",
    )
    expect(execFileSyncMock).not.toHaveBeenCalled()
  })
})
