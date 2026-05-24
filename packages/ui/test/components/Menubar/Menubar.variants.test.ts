import { describe, expect, it } from "vitest"
import { menubarVariants } from "../../../src/components/primitives/Menubar/Menubar.variants"

describe("Menubar variants", () => {
  it("uses token-backed menu styling", () => {
    expect(menubarVariants()).toContain("bg-(--lsys-menu-trigger-background)")
    expect(menubarVariants()).toContain(
      "border-(--lsys-menu-trigger-border-color)",
    )
  })
})
