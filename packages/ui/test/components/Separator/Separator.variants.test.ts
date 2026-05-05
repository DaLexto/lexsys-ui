import { describe, expect, it } from "vitest"
import { separatorVariants } from "../../../src/components/Separator/Separator.variants.js"

describe("separatorVariants", () => {
  it("supports both orientations", () => {
    expect(separatorVariants({ orientation: "horizontal" })).toContain("h-px")
    expect(separatorVariants({ orientation: "vertical" })).toContain("w-px")
  })
})
