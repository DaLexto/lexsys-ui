import { describe, expect, it } from "vitest"
import { scrollAreaScrollbarVariants } from "../../../src/components/primitives/ScrollArea/ScrollArea.variants.js"

describe("scrollAreaScrollbarVariants", () => {
  it("supports vertical and horizontal orientations", () => {
    expect(scrollAreaScrollbarVariants({ orientation: "vertical" })).toContain(
      "w-(--lsys-scroll-area-scrollbar-size)",
    )
    expect(
      scrollAreaScrollbarVariants({ orientation: "horizontal" }),
    ).toContain("h-(--lsys-scroll-area-scrollbar-size)")
  })
})
