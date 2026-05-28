import { describe, expect, it } from "vitest"
import { toggleVariants } from "../../../src/components/primitives/Toggle/Toggle.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("toggleVariants", () => {
  it("includes pressed state styling", () => {
    const className = toggleVariants({ size: "md" })

    expect(className).toContain(
      `data-[pressed]:bg-(--${p}-toggle-pressed-background)`,
    )
    expect(className).toContain(`h-(--${p}-toggle-height-md)`)
  })
})
