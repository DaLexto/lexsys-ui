import { describe, expect, it } from "vitest"
import { menubarVariants } from "../../../src/components/primitives/Menubar/Menubar.variants"

describe("Menubar variants", () => {
  it("uses token-backed menu styling", () => {
    expect(menubarVariants()).toContain("bg-(--lex-menu-trigger-background)")
    expect(menubarVariants()).toContain(
      "border-(--lex-menu-trigger-border-color)",
    )
  })
})
