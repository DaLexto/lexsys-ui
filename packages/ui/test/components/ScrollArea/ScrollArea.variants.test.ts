import { describe, expect, it } from "vitest"
import { scrollAreaScrollbarVariants } from "../../../src/components/primitives/ScrollArea/ScrollArea.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("scrollAreaScrollbarVariants", () => {
  it("supports vertical and horizontal orientations", () => {
    expect(scrollAreaScrollbarVariants({ orientation: "vertical" })).toContain(
      `w-(--${p}-scroll-area-scrollbar-size)`,
    )
    expect(
      scrollAreaScrollbarVariants({ orientation: "horizontal" }),
    ).toContain(`h-(--${p}-scroll-area-scrollbar-size)`)
  })
})
