import { describe, expect, it } from "vitest"
import { menubarVariants } from "../../../src/components/primitives/Menubar/Menubar.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Menubar variants", () => {
  it("uses token-backed menu styling", () => {
    expect(menubarVariants()).toContain(`bg-(--${p}-menu-trigger-background)`)
    expect(menubarVariants()).toContain(
      `border-(--${p}-menu-trigger-border-color)`,
    )
  })
})
