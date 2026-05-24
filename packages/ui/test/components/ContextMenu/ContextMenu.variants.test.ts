import { describe, expect, it } from "vitest"
import {
  contextMenuItemVariants,
  contextMenuPopupVariants,
} from "../../../src/components/primitives/ContextMenu/ContextMenu.variants"

describe("ContextMenu variants", () => {
  it("reuses menu popup styling", () => {
    expect(contextMenuPopupVariants()).toContain(
      "bg-(--lsys-menu-popup-background)",
    )
  })

  it("reuses menu item highlight states", () => {
    expect(contextMenuItemVariants()).toContain(
      "data-[highlighted]:bg-(--lsys-menu-item-highlight-background)",
    )
  })
})
