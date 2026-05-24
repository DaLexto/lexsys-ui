import { describe, expect, it } from "vitest"
import { toggleVariants } from "../../../src/components/primitives/Toggle/Toggle.variants.js"

describe("toggleVariants", () => {
  it("includes pressed state styling", () => {
    const className = toggleVariants({ size: "md" })

    expect(className).toContain(
      "data-[pressed]:bg-(--lsys-toggle-pressed-background)",
    )
    expect(className).toContain("h-(--lsys-toggle-height-md)")
  })
})
