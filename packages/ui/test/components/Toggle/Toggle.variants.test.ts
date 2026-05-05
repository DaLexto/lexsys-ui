import { describe, expect, it } from "vitest"
import { toggleVariants } from "../../../src/components/Toggle/Toggle.variants.js"

describe("toggleVariants", () => {
  it("includes pressed state styling", () => {
    const className = toggleVariants({ size: "md" })

    expect(className).toContain(
      "data-[pressed]:bg-[var(--nx-toggle-pressed-background)]",
    )
    expect(className).toContain("h-[var(--nx-toggle-height-md)]")
  })
})
