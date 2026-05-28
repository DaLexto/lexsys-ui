import { describe, expect, it } from "vitest"
import {
  menuItemVariants,
  menuPopupVariants,
  menuTriggerVariants,
} from "../../../src/components/primitives/Menu/Menu.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Menu variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(menuTriggerVariants()).toContain(`h-(--${p}-menu-trigger-height)`)
    expect(menuTriggerVariants()).toContain(
      `data-[popup-open]:bg-(--${p}-menu-trigger-open-background)`,
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(menuPopupVariants()).toContain(`bg-(--${p}-menu-popup-background)`)
    expect(menuItemVariants()).toContain(
      `data-[highlighted]:bg-(--${p}-menu-item-highlight-background)`,
    )
    expect(menuItemVariants()).toContain(
      `data-[checked]:bg-(--${p}-menu-item-checked-background)`,
    )
  })
})
