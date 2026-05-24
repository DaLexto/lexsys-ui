import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { registryItems } from "@lexsys/registry"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/core/context.js"
import { runAdd } from "../../src/commands/add.js"
import { runInit } from "../../src/commands/init.js"
import { runUninstall } from "../../src/commands/uninstall.js"
import { runUpdate } from "../../src/commands/update.js"
import { computeRegistryClosure } from "../../src/core/registry-closure.js"

const writeJson = async (path: string, value: unknown): Promise<void> => {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf-8")
}

const countOccurrences = (content: string, pattern: string): number => {
  return content.split(pattern).length - 1
}

const toTokenPrefix = (folder: string): string => {
  return folder.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

const getVariantsTokenPrefix = (canonicalName: string): string => {
  const reusedPrefixes: Record<string, string> = {
    Autocomplete: "select",
    CheckboxGroup: "checkbox",
    Combobox: "select",
    ContextMenu: "menu",
    Menubar: "menu",
    NavigationMenu: "menu",
    OtpField: "input",
    PreviewCard: "popover",
    Toolbar: "button",
  }

  return reusedPrefixes[canonicalName] ?? toTokenPrefix(canonicalName)
}

const componentRegistryItems = registryItems.filter((item) => {
  return item.type === "component"
})

const blockRegistryItems = registryItems.filter((item) => {
  return item.type === "block"
})

const assertFlatConsumerImportPaths = (content: string): void => {
  expect(content).not.toMatch(/\.\.\/\.\.\/(blocks|templates|primitives)\//)
  expect(content).not.toContain("blocks/")
  expect(content).not.toContain("templates/")
  expect(content).not.toContain("primitives/")
}

const readInstalledConfig = async (
  root: string,
): Promise<{ installed?: Record<string, string> }> => {
  return JSON.parse(
    await readFile(join(root, "lexsys.config.json"), "utf-8"),
  ) as { installed?: Record<string, string> }
}

const expectRegistryClosureInstalled = (
  installed: Record<string, string> | undefined,
  rootNames: string[],
): void => {
  const closure = computeRegistryClosure(rootNames, registryItems)

  for (const name of closure) {
    const item = registryItems.find((entry) => entry.name === name)

    if (!item) {
      throw new Error(`Missing registry item for closure member: ${name}`)
    }

    expect(installed?.[name]).toBe(item.version)
  }
}

const getTemplateFileName = (file: string): string => {
  const fileName = file.split("/").at(-1)

  if (!fileName) {
    throw new Error(`Invalid registry template file path: ${file}`)
  }

  return fileName
}

const writeViteConsumerFiles = async (root: string): Promise<void> => {
  await writeJson(join(root, "package.json"), {
    dependencies: {
      "@base-ui/react": "^1.4.1",
      "class-variance-authority": "^0.7.1",
      clsx: "^2.1.1",
      "lucide-react": "^1.14.0",
      "tailwind-merge": "^3.5.0",
    },
    devDependencies: {
      "@tailwindcss/vite": "^4.2.4",
      tailwindcss: "^4.2.4",
    },
    packageManager: "npm@11.0.0",
  })
  await mkdir(join(root, "src"), { recursive: true })
  await writeFile(join(root, "src/style.css"), ":root {}\n", "utf-8")
  await writeFile(
    join(root, "vite.config.ts"),
    'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n});\n',
    "utf-8",
  )
}

describe("install flow smoke", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "lexsys-cli-flow-"))
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
    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(["button", "card", "badge", "alert"])
    await runInit()
    await runAdd(["button", "card", "badge", "alert"])

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
    ).resolves.toContain("--lsys-alert-radius")
    await expect(
      readFile(join(tempDir, "styles/theme.css"), "utf-8"),
    ).resolves.toContain("--color-twix-background-base")
    await expect(
      readFile(join(tempDir, "src/lib/utils.ts"), "utf-8"),
    ).resolves.toContain("twMerge")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Button/Button.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-(--lsys-button-primary-background)")
    await expect(
      readFile(join(tempDir, "src/components/ui/Button/Button.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Card/Card.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-(--lsys-card-background)")
    await expect(
      readFile(join(tempDir, "src/components/ui/Card/Card.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Badge/Badge.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-(--lsys-badge-neutral-background)")
    await expect(
      readFile(join(tempDir, "src/components/ui/Badge/Badge.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Alert/Alert.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-(--lsys-alert-neutral-background)")
    await expect(
      readFile(join(tempDir, "src/components/ui/Alert/Alert.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")

    const config = JSON.parse(
      await readFile(join(tempDir, "lexsys.config.json"), "utf-8"),
    ) as {
      installed?: Record<string, string>
      style?: string
      tailwind?: { css?: string }
    }

    expect(config.style).toBe("default")
    expect(config.tailwind?.css).toBe("src/style.css")
    expect(config.installed).toEqual({
      alert: "0.0.1",
      badge: "0.0.1",
      button: "0.0.1",
      card: "0.0.1",
    })
  })

  test("installs every bundled registry component idempotently", async () => {
    const componentNames = componentRegistryItems.map((item) => item.name)
    const installedFileSnapshots = new Map<string, string>()

    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(componentNames)

    for (const item of componentRegistryItems) {
      for (const file of item.files) {
        const targetPath = join(
          tempDir,
          "src/components/ui",
          item.canonicalName,
          getTemplateFileName(file),
        )

        installedFileSnapshots.set(
          targetPath,
          await readFile(targetPath, "utf-8"),
        )
      }
    }

    await runInit()
    await runAdd(componentNames)

    const css = await readFile(join(tempDir, "src/style.css"), "utf-8")
    expect(countOccurrences(css, '@import "tailwindcss";')).toBe(1)
    expect(countOccurrences(css, "../styles/tokens.css")).toBe(1)
    expect(countOccurrences(css, "../styles/theme.css")).toBe(1)

    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-switch-thumb-translate-md")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-tabs-tab-active-background")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-field-control-background")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-dialog-popup-background")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-fieldset-legend-foreground")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-form-gap")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-textarea-min-height-md")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-number-field-stepper-width-md")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-popover-popup-background")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-select-popup-background")
    await expect(
      readFile(join(tempDir, "src/lib/utils.ts"), "utf-8"),
    ).resolves.toContain("twMerge")

    for (const item of componentRegistryItems) {
      for (const file of item.files) {
        const targetPath = join(
          tempDir,
          "src/components/ui",
          item.canonicalName,
          getTemplateFileName(file),
        )

        await expect(readFile(targetPath, "utf-8")).resolves.toBe(
          installedFileSnapshots.get(targetPath),
        )
      }

      await expect(
        readFile(
          join(
            tempDir,
            `src/components/ui/${item.canonicalName}/${item.canonicalName}.tsx`,
          ),
          "utf-8",
        ),
      ).resolves.toContain("@/lib/utils")
      await expect(
        readFile(
          join(
            tempDir,
            `src/components/ui/${item.canonicalName}/${item.canonicalName}.variants.ts`,
          ),
          "utf-8",
        ),
      ).resolves.toContain(
        `--lsys-${getVariantsTokenPrefix(item.canonicalName)}`,
      )
    }

    const config = JSON.parse(
      await readFile(join(tempDir, "lexsys.config.json"), "utf-8"),
    ) as {
      installed?: Record<string, string>
      style?: string
      tailwind?: { css?: string }
    }

    expect(config.style).toBe("default")
    expect(config.tailwind?.css).toBe("src/style.css")
    expect(config.installed).toEqual(
      Object.fromEntries(
        componentRegistryItems.map((item) => {
          return [item.name, item.version]
        }),
      ),
    )
  })

  test("installs every bundled registry block idempotently", async () => {
    const blockNames = blockRegistryItems.map((item) => item.name)
    const installedFileSnapshots = new Map<string, string>()

    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(blockNames)

    for (const item of blockRegistryItems) {
      for (const file of item.files) {
        const targetPath = join(
          tempDir,
          "src/components/ui",
          item.canonicalName,
          getTemplateFileName(file),
        )
        const content = await readFile(targetPath, "utf-8")

        assertFlatConsumerImportPaths(content)
        installedFileSnapshots.set(targetPath, content)
      }
    }

    await runInit()
    await runAdd(blockNames)

    for (const item of blockRegistryItems) {
      for (const file of item.files) {
        const targetPath = join(
          tempDir,
          "src/components/ui",
          item.canonicalName,
          getTemplateFileName(file),
        )

        await expect(readFile(targetPath, "utf-8")).resolves.toBe(
          installedFileSnapshots.get(targetPath),
        )
      }

      await expect(
        readFile(
          join(
            tempDir,
            `src/components/ui/${item.canonicalName}/${item.canonicalName}.tsx`,
          ),
          "utf-8",
        ),
      ).resolves.toContain("@/lib/utils")
      await expect(
        readFile(
          join(
            tempDir,
            `src/components/ui/${item.canonicalName}/${item.canonicalName}.variants.ts`,
          ),
          "utf-8",
        ),
      ).resolves.toMatch(/--lsys-|--color-twix-/)
    }

    const config = await readInstalledConfig(tempDir)
    const expectedInstalled = Object.fromEntries(
      [...computeRegistryClosure(blockNames, registryItems)].map((name) => {
        const registryItem = registryItems.find((entry) => entry.name === name)

        if (!registryItem) {
          throw new Error(`Missing registry item for closure member: ${name}`)
        }

        return [name, registryItem.version]
      }),
    )

    expect(config.installed).toEqual(expectedInstalled)
  })

  test.each(blockRegistryItems.map((item) => [item.name, item] as const))(
    "installs %s solo with transitive deps and flat consumer import paths",
    async (_name, item) => {
      await writeViteConsumerFiles(tempDir)

      await runInit()
      await runAdd([item.name])

      for (const file of item.files) {
        const content = await readFile(
          join(
            tempDir,
            "src/components/ui",
            item.canonicalName,
            getTemplateFileName(file),
          ),
          "utf-8",
        )

        assertFlatConsumerImportPaths(content)
      }

      const config = await readInstalledConfig(tempDir)
      expectRegistryClosureInstalled(config.installed, [item.name])
    },
  )

  test("sidebar solo install rewrites block imports to flat sibling paths", async () => {
    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(["sidebar"])

    await expect(
      readFile(join(tempDir, "src/components/ui/Sidebar/Sidebar.tsx"), "utf-8"),
    ).resolves.toContain('import { Button } from "../Button/Button"')

    const config = await readInstalledConfig(tempDir)

    expect(config.installed?.menu).toBeUndefined()
  })

  test("dashboard-shell solo install pulls sidebar block with flat template import", async () => {
    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(["dashboard-shell"])

    await expect(
      readFile(
        join(tempDir, "src/components/ui/DashboardShell/DashboardShell.tsx"),
        "utf-8",
      ),
    ).resolves.toContain('import { Sidebar } from "../Sidebar/Sidebar"')

    await expect(
      readFile(join(tempDir, "src/components/ui/Sidebar/Sidebar.tsx"), "utf-8"),
    ).resolves.toContain('import { Button } from "../Button/Button"')

    const config = await readInstalledConfig(tempDir)
    expectRegistryClosureInstalled(config.installed, ["dashboard-shell"])
    expect(config.installed?.menu).toBeUndefined()
  })

  test("settings-panel solo install pulls card primitive", async () => {
    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(["settings-panel"])

    await expect(
      readFile(
        join(tempDir, "src/components/ui/SettingsPanel/SettingsPanel.tsx"),
        "utf-8",
      ),
    ).resolves.toContain('from "../Card/Card"')

    const config = await readInstalledConfig(tempDir)
    expectRegistryClosureInstalled(config.installed, ["settings-panel"])
  })

  test("form-field solo install pulls field and input primitives", async () => {
    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(["form-field"])

    await expect(
      readFile(
        join(tempDir, "src/components/ui/FormField/FormField.tsx"),
        "utf-8",
      ),
    ).resolves.toContain('import { Input } from "../Input/Input"')

    const config = await readInstalledConfig(tempDir)
    expectRegistryClosureInstalled(config.installed, ["form-field"])
  })

  test("add, update styles, and uninstall round-trip in temp consumer", async () => {
    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(["button", "card"])

    await runUpdate(["--styles"])

    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--lsys-button-primary-background")

    await runUninstall(["button", "card"])

    await expect(
      readFile(join(tempDir, "src/components/ui/Button/Button.tsx"), "utf-8"),
    ).rejects.toThrow()

    const config = JSON.parse(
      await readFile(join(tempDir, "lexsys.config.json"), "utf-8"),
    ) as { installed?: Record<string, string> }

    expect(config.installed).toEqual({})
  })
})
