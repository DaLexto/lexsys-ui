import { describe, expect, it } from "vitest"
import { toggleGroupVariants } from "../../../src/components/ToggleGroup/ToggleGroup.variants.js"

describe("toggleGroupVariants", () => {
  it("includes token-backed orientation and size classes", () => {
    const className = toggleGroupVariants({
      orientation: "vertical",
      size: "lg",
    })

    expect(className).toContain("flex-col")
    expect(className).toContain("gap-(--nx-toggle-group-gap-lg)")
    expect(className).toContain("bg-(--nx-toggle-group-background)")
  })
})
