import { describe, expect, it } from "vitest"
import {
  navigationMenuPopupVariants,
  navigationMenuTriggerVariants,
} from "../../../src/components/primitives/NavigationMenu/NavigationMenu.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("NavigationMenu variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(navigationMenuTriggerVariants()).toContain(
      `h-(--${p}-menu-trigger-height)`,
    )
  })

  it("uses token-backed popup styling", () => {
    expect(navigationMenuPopupVariants()).toContain(
      `bg-(--${p}-menu-popup-background)`,
    )
  })
})
