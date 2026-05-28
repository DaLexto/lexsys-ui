import { describe, expect, it } from "vitest"
import { separatorVariants } from "../../../src/components/primitives/Separator/Separator.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("separatorVariants", () => {
  it("supports both orientations", () => {
    expect(separatorVariants({ orientation: "horizontal" })).toContain(
      `h-(--${p}-separator-thickness)`,
    )
    expect(separatorVariants({ orientation: "vertical" })).toContain(
      `w-(--${p}-separator-thickness)`,
    )
  })
})
