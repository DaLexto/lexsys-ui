import { describe, expect, it } from "vitest"
import { toggleGroupVariants } from "../../../src/components/primitives/ToggleGroup/ToggleGroup.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("toggleGroupVariants", () => {
  it("includes token-backed orientation and size classes", () => {
    const className = toggleGroupVariants({
      orientation: "vertical",
      size: "lg",
    })

    expect(className).toContain("flex-col")
    expect(className).toContain(`gap-(--${p}-toggle-group-gap-lg)`)
    expect(className).toContain(`bg-(--${p}-toggle-group-background)`)
  })
})
