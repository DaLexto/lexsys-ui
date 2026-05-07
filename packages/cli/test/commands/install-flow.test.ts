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

const toTokenPrefix = (folder: string): string => {
  return folder.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
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
    ).resolves.toContain("--nx-alert-radius")
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
    ).resolves.toContain("bg-[var(--nx-button-primary-background)]")
    await expect(
      readFile(join(tempDir, "src/components/ui/Button/Button.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Card/Card.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-[var(--nx-card-background)]")
    await expect(
      readFile(join(tempDir, "src/components/ui/Card/Card.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Badge/Badge.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-[var(--nx-badge-background)]")
    await expect(
      readFile(join(tempDir, "src/components/ui/Badge/Badge.tsx"), "utf-8"),
    ).resolves.toContain("@/lib/utils")
    await expect(
      readFile(
        join(tempDir, "src/components/ui/Alert/Alert.variants.ts"),
        "utf-8",
      ),
    ).resolves.toContain("bg-[var(--nx-alert-background)]")
    await expect(
      readFile(join(tempDir, "src/components/ui/Alert/Alert.tsx"), "utf-8"),
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
    expect(config.installed).toEqual({
      alert: "0.0.1",
      badge: "0.0.1",
      button: "0.0.1",
      card: "0.0.1",
    })
  })

  test("installs the Base UI component batch idempotently", async () => {
    const componentNames = [
      "accordion",
      "checkbox",
      "field",
      "fieldset",
      "form",
      "number-field",
      "progress",
      "radio-group",
      "separator",
      "select",
      "slider",
      "switch",
      "tabs",
      "textarea",
      "toggle",
      "tooltip",
    ]
    const installedFolders = [
      "Accordion",
      "Checkbox",
      "Field",
      "Fieldset",
      "Form",
      "NumberField",
      "Progress",
      "RadioGroup",
      "Separator",
      "Select",
      "Slider",
      "Switch",
      "Tabs",
      "Textarea",
      "Toggle",
      "Tooltip",
    ]

    await writeViteConsumerFiles(tempDir)

    await runInit()
    await runAdd(componentNames)
    await runInit()
    await runAdd(componentNames)

    const css = await readFile(join(tempDir, "src/style.css"), "utf-8")
    expect(countOccurrences(css, '@import "tailwindcss";')).toBe(1)
    expect(countOccurrences(css, "../styles/tokens.css")).toBe(1)
    expect(countOccurrences(css, "../styles/theme.css")).toBe(1)

    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-switch-thumb-translate-md")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-tabs-tab-active-background")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-field-control-background")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-fieldset-legend-foreground")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-form-gap")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-textarea-min-height-md")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-number-field-stepper-width-md")
    await expect(
      readFile(join(tempDir, "styles/tokens.css"), "utf-8"),
    ).resolves.toContain("--nx-select-popup-background")
    await expect(
      readFile(join(tempDir, "src/lib/utils.ts"), "utf-8"),
    ).resolves.toContain("twMerge")

    for (const folder of installedFolders) {
      await expect(
        readFile(
          join(tempDir, `src/components/ui/${folder}/${folder}.tsx`),
          "utf-8",
        ),
      ).resolves.toContain("@/lib/utils")
      await expect(
        readFile(
          join(tempDir, `src/components/ui/${folder}/${folder}.variants.ts`),
          "utf-8",
        ),
      ).resolves.toContain(`--nx-${toTokenPrefix(folder)}`)
    }

    const config = JSON.parse(
      await readFile(join(tempDir, "neurex.config.json"), "utf-8"),
    ) as {
      installed?: Record<string, string>
      style?: string
      tailwind?: { css?: string }
    }

    expect(config.style).toBe("default")
    expect(config.tailwind?.css).toBe("src/style.css")
    expect(config.installed).toEqual(
      Object.fromEntries(
        componentNames.map((componentName) => {
          return [componentName, "0.0.1"]
        }),
      ),
    )
  })
})
