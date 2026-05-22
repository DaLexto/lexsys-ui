import { describe, expect, it } from "vitest"
import { scrollAreaScrollbarVariants } from "../../../src/components/ScrollArea/ScrollArea.variants.js"

describe("scrollAreaScrollbarVariants", () => {
  it("supports vertical and horizontal orientations", () => {
    expect(scrollAreaScrollbarVariants({ orientation: "vertical" })).toContain(
      "w-(--nx-scroll-area-scrollbar-size)",
    )
    expect(
      scrollAreaScrollbarVariants({ orientation: "horizontal" }),
    ).toContain("h-(--nx-scroll-area-scrollbar-size)")
  })
})
