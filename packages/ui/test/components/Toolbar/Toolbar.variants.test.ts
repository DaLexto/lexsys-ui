import { describe, expect, it } from "vitest"
import {
  toolbarButtonVariants,
  toolbarInputVariants,
} from "../../../src/components/primitives/Toolbar/Toolbar.variants"

describe("Toolbar variants", () => {
  it("uses token-backed button styling", () => {
    expect(toolbarButtonVariants()).toContain("h-(--nx-button-height-sm)")
    expect(toolbarButtonVariants()).toContain(
      "text-(--nx-button-secondary-foreground)",
    )
  })

  it("uses token-backed input styling", () => {
    expect(toolbarInputVariants()).toContain("h-(--nx-input-height-sm)")
    expect(toolbarInputVariants()).toContain("bg-(--nx-input-background)")
  })
})
