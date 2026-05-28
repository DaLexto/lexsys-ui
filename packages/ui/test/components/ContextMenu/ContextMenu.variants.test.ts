import { describe, expect, it } from "vitest"
import {
  contextMenuItemVariants,
  contextMenuPopupVariants,
} from "../../../src/components/primitives/ContextMenu/ContextMenu.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("ContextMenu variants", () => {
  it("reuses menu popup styling", () => {
    expect(contextMenuPopupVariants()).toContain(
      `bg-(--${p}-menu-popup-background)`,
    )
  })

  it("reuses menu item highlight states", () => {
    expect(contextMenuItemVariants()).toContain(
      `data-[highlighted]:bg-(--${p}-menu-item-highlight-background)`,
    )
  })
})
