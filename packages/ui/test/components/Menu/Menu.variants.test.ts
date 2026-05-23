import { describe, expect, it } from "vitest"
import {
  menuItemVariants,
  menuPopupVariants,
  menuTriggerVariants,
} from "../../../src/components/primitives/Menu/Menu.variants"

describe("Menu variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(menuTriggerVariants()).toContain("h-(--nx-menu-trigger-height)")
    expect(menuTriggerVariants()).toContain(
      "data-[popup-open]:bg-(--nx-menu-trigger-open-background)",
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(menuPopupVariants()).toContain("bg-(--nx-menu-popup-background)")
    expect(menuItemVariants()).toContain(
      "data-[highlighted]:bg-(--nx-menu-item-highlight-background)",
    )
    expect(menuItemVariants()).toContain(
      "data-[checked]:bg-(--nx-menu-item-checked-background)",
    )
  })
})
