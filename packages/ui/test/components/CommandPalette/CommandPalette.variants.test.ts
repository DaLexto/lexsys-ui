import { describe, expect, it } from "vitest"
import {
  commandPaletteEmptyClasses,
  commandPaletteGroupLabelClasses,
  commandPaletteItemClasses,
  commandPaletteListClasses,
  commandPaletteRootClasses,
} from "../../../src/components/blocks/CommandPalette/CommandPalette.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("CommandPalette variants", () => {
  it("uses command-palette component tokens for root and list chrome", () => {
    expect(commandPaletteRootClasses).toContain(
      `gap-(--${p}-command-palette-root-gap)`,
    )
    expect(commandPaletteListClasses).toContain(
      `max-h-(--${p}-command-palette-list-max-height)`,
    )
    expect(commandPaletteRootClasses).not.toContain(`--${p}-space-`)
  })

  it("uses command-palette component tokens for item and empty padding", () => {
    expect(commandPaletteGroupLabelClasses).toContain(
      `px-(--${p}-command-palette-group-label-padding-x)`,
    )
    expect(commandPaletteItemClasses).toContain(
      `gap-(--${p}-command-palette-item-gap)`,
    )
    expect(commandPaletteItemClasses).toContain(
      `hover:bg-(--${p}-command-palette-item-hover-background)`,
    )
    expect(commandPaletteEmptyClasses).toContain(
      `py-(--${p}-command-palette-empty-padding-y)`,
    )
    expect(commandPaletteItemClasses).not.toContain(`--${p}-space-`)
  })
})
