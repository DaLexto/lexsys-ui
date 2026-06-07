import { describe, expect, it } from "vitest"
import {
  toolbarButtonVariants,
  toolbarInputVariants,
  toolbarSeparatorVariants,
} from "../../../src/components/primitives/Toolbar/Toolbar.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Toolbar variants", () => {
  it("uses dedicated toolbar button tokens", () => {
    expect(toolbarButtonVariants()).toContain(
      `h-(--${p}-toolbar-button-height)`,
    )
    expect(toolbarButtonVariants()).toContain(
      `text-(--${p}-toolbar-button-foreground)`,
    )
  })

  it("uses dedicated toolbar input tokens", () => {
    expect(toolbarInputVariants()).toContain(`h-(--${p}-toolbar-input-height)`)
    expect(toolbarInputVariants()).toContain(
      `bg-(--${p}-toolbar-input-background)`,
    )
  })

  it("uses toolbar separator margin token instead of primitive space", () => {
    expect(toolbarSeparatorVariants({ orientation: "vertical" })).toContain(
      `my-(--${p}-toolbar-separator-margin)`,
    )
    expect(toolbarSeparatorVariants({ orientation: "horizontal" })).toContain(
      `mx-(--${p}-toolbar-separator-margin)`,
    )
    expect(toolbarSeparatorVariants()).not.toContain(`--${p}-space-`)
  })
})
