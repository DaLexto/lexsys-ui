import { describe, expect, it } from "vitest"
import { separatorVariants } from "../../../src/components/primitives/Separator/Separator.variants.js"

describe("separatorVariants", () => {
  it("supports both orientations", () => {
    expect(separatorVariants({ orientation: "horizontal" })).toContain(
      "h-(--lex-separator-thickness)",
    )
    expect(separatorVariants({ orientation: "vertical" })).toContain(
      "w-(--lex-separator-thickness)",
    )
  })
})
