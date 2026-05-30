import { mkdtemp, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { afterEach, describe, expect, test } from "vitest"
import { getCwd, setCwd } from "../../src/utils/context.js"
import { loadConfig } from "../../src/config/config.js"

const originalCwd = getCwd()

afterEach(() => {
  setCwd(originalCwd)
})

describe("loadConfig", () => {
  test("persists legacy installed map as string array", async () => {
    const directory = await mkdtemp(join(tmpdir(), "lexsys-config-"))
    setCwd(directory)

    await writeFile(
      join(directory, "lexsys.config.json"),
      JSON.stringify(
        {
          style: "default",
          paths: {
            components: "src/components/ui",
            utilities: "src/lib",
            styles: "styles",
          },
          aliases: {
            components: "@/components/ui",
            ui: "@/components/ui",
            utils: "@/lib/utils",
            lib: "@/lib",
            hooks: "@/hooks",
          },
          tailwind: {
            version: "v4",
            css: "src/style.css",
          },
          installed: {
            button: "0.0.1",
            card: "0.0.2",
          },
        },
        null,
        2,
      ) + "\n",
      "utf-8",
    )

    const config = await loadConfig()

    expect(config.installed).toEqual(["button", "card"])

    const saved = JSON.parse(
      await readFile(join(directory, "lexsys.config.json"), "utf-8"),
    ) as { installed: string[] }

    expect(saved.installed).toEqual(["button", "card"])
  })
})
