import { describe, expect, it } from "vitest"
import {
  navigationMenuPopupVariants,
  navigationMenuTriggerVariants,
} from "../../../src/components/primitives/NavigationMenu/NavigationMenu.variants"

describe("NavigationMenu variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(navigationMenuTriggerVariants()).toContain(
      "h-(--lex-menu-trigger-height)",
    )
  })

  it("uses token-backed popup styling", () => {
    expect(navigationMenuPopupVariants()).toContain(
      "bg-(--lex-menu-popup-background)",
    )
  })
})
