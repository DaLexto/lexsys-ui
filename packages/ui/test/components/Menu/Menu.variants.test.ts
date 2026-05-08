import { describe, expect, it } from "vitest"
import {
  menuItemVariants,
  menuPopupVariants,
  menuTriggerVariants,
} from "../../../src/components/Menu/Menu.variants"

describe("Menu variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(menuTriggerVariants()).toContain("h-[var(--nx-menu-trigger-height)]")
    expect(menuTriggerVariants()).toContain(
      "data-[popup-open]:bg-[var(--nx-menu-trigger-open-background)]",
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(menuPopupVariants()).toContain(
      "bg-[var(--nx-menu-popup-background)]",
    )
    expect(menuItemVariants()).toContain(
      "data-[highlighted]:bg-[var(--nx-menu-item-highlight-background)]",
    )
    expect(menuItemVariants()).toContain(
      "data-[checked]:bg-[var(--nx-menu-item-checked-background)]",
    )
  })
})
