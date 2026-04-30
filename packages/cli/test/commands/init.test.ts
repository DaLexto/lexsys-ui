import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/core/context.js"
import { getPackageManagerInvocation } from "../../src/core/package-manager.js"

const execFileSyncMock = vi.hoisted(() => vi.fn())
const promptsMock = vi.hoisted(() => vi.fn())

vi.mock("node:child_process", () => ({
  execFileSync: execFileSyncMock,
}))

vi.mock("prompts", () => ({
  default: promptsMock,
}))

const packageManagerCommand = (packageManager: "npm" | "pnpm" | "yarn") => {
  return getPackageManagerInvocation(packageManager, []).command
}

const packageManagerArgs = (
  packageManager: "npm" | "pnpm" | "yarn",
  args: string[],
) => {
  return getPackageManagerInvocation(packageManager, args).args
}

describe("runInit", () => {
  let tempDir: string

  beforeEach(async () => {
    execFileSyncMock.mockReset()
    promptsMock.mockReset()
    vi.stubEnv("npm_config_user_agent", "pnpm/10.33.0 npm/? node/?")
    vi.spyOn(console, "log").mockImplementation(() => undefined)

    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-init-"))
    setCwd(tempDir)
  })

  afterEach(async () => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()

    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("scaffolds a Vite app in the provided directory and initializes Neurex", async () => {
    const { runInit } = await import("../../src/commands/init.js")

    await runInit(["vite", "my-app"])

    const appDir = join(tempDir, "my-app")
    const packageJson = JSON.parse(
      await readFile(join(appDir, "package.json"), "utf-8"),
    ) as { name?: string; packageManager?: string; scripts?: object }

    expect(packageJson.name).toBe("my-app")
    expect(packageJson.packageManager).toBe("pnpm@10.33.0")
    expect(packageJson.scripts).toEqual({
      build: "tsc -b && vite build",
      dev: "vite",
      preview: "vite preview",
    })
    await expect(
      readFile(join(appDir, "index.html"), "utf-8"),
    ).resolves.toContain("/src/main.tsx")
    await expect(
      readFile(join(appDir, "src", "main.tsx"), "utf-8"),
    ).resolves.toContain("ReactDOM.createRoot")
    await expect(
      readFile(join(appDir, "src", "vite-env.d.ts"), "utf-8"),
    ).resolves.toContain("vite/client")
    await expect(
      readFile(join(appDir, "tsconfig.json"), "utf-8"),
    ).resolves.toContain('"jsx": "react-jsx"')
    await expect(
      readFile(join(appDir, "vite.config.ts"), "utf-8"),
    ).resolves.toContain("plugins: [tailwindcss(), react()]")
    await expect(
      readFile(join(appDir, "src", "style.css"), "utf-8"),
    ).resolves.toContain('@import "tailwindcss";')
    await expect(
      readFile(join(appDir, "neurex.config.json"), "utf-8"),
    ).resolves.toContain('"componentsPath": "src/components/ui"')

    expect(execFileSyncMock).toHaveBeenCalledWith(
      packageManagerCommand("pnpm"),
      packageManagerArgs("pnpm", ["add", "react", "react-dom"]),
      {
        cwd: appDir,
        stdio: "inherit",
      },
    )
    expect(execFileSyncMock).toHaveBeenCalledWith(
      packageManagerCommand("pnpm"),
      packageManagerArgs("pnpm", [
        "add",
        "-D",
        "@types/react",
        "@types/react-dom",
        "@vitejs/plugin-react",
        "typescript",
        "vite",
      ]),
      {
        cwd: appDir,
        stdio: "inherit",
      },
    )
    expect(execFileSyncMock).toHaveBeenCalledWith(
      packageManagerCommand("pnpm"),
      packageManagerArgs("pnpm", [
        "add",
        "-D",
        "tailwindcss",
        "@tailwindcss/vite",
      ]),
      {
        cwd: appDir,
        stdio: "inherit",
      },
    )
  })

  test("uses the current directory when init vite has no directory argument", async () => {
    const { runInit } = await import("../../src/commands/init.js")

    await runInit(["vite"])

    await expect(
      readFile(join(tempDir, "package.json"), "utf-8"),
    ).resolves.toContain('"name":')
    await expect(
      readFile(join(tempDir, "src", "App.tsx"), "utf-8"),
    ).resolves.toContain("Neurex + Vite")
  })

  test("prompts to create a Vite scaffold when plain init has no supported app scaffold", async () => {
    promptsMock.mockResolvedValue({ useVite: true })
    const { runInit } = await import("../../src/commands/init.js")

    await runInit()

    expect(promptsMock).toHaveBeenCalledWith({
      type: "confirm",
      name: "useVite",
      message:
        "No supported app scaffold was detected. Create a Vite + React project here?",
      initial: true,
    })
    await expect(
      readFile(join(tempDir, "package.json"), "utf-8"),
    ).resolves.toContain('"name":')
    await expect(
      readFile(join(tempDir, "vite.config.ts"), "utf-8"),
    ).resolves.toContain("@vitejs/plugin-react")
  })

  test("does not change files when plain init prompt is declined", async () => {
    promptsMock.mockResolvedValue({ useVite: false })
    const { runInit } = await import("../../src/commands/init.js")

    await runInit()

    await expect(
      readFile(join(tempDir, "package.json"), "utf-8"),
    ).rejects.toThrow()
    expect(execFileSyncMock).not.toHaveBeenCalled()
  })

  test("refuses to overwrite existing scaffold files", async () => {
    await writeFile(join(tempDir, "package.json"), "user package", "utf-8")

    const { runInit } = await import("../../src/commands/init.js")

    await expect(runInit(["vite"])).rejects.toThrow(
      "Invalid existing package.json",
    )
    expect(execFileSyncMock).not.toHaveBeenCalled()
  })
})
