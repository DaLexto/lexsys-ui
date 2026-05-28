import { describe, expect, it } from "vitest"
import {
  toolbarButtonVariants,
  toolbarInputVariants,
} from "../../../src/components/primitives/Toolbar/Toolbar.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Toolbar variants", () => {
  it("uses token-backed button styling", () => {
    expect(toolbarButtonVariants()).toContain(`h-(--${p}-button-height-sm)`)
    expect(toolbarButtonVariants()).toContain(
      `text-(--${p}-button-secondary-foreground)`,
    )
  })

  it("uses token-backed input styling", () => {
    expect(toolbarInputVariants()).toContain(`h-(--${p}-input-height-sm)`)
    expect(toolbarInputVariants()).toContain(`bg-(--${p}-input-background)`)
  })
})
