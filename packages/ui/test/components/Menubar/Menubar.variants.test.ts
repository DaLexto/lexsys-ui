import { describe, expect, it } from "vitest"
import { menubarVariants } from "../../../src/components/primitives/Menubar/Menubar.variants"

describe("Menubar variants", () => {
  it("uses token-backed menu styling", () => {
    expect(menubarVariants()).toContain("bg-(--nx-menu-trigger-background)")
    expect(menubarVariants()).toContain(
      "border-(--nx-menu-trigger-border-color)",
    )
  })
})
