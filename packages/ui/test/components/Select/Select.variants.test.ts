import { describe, expect, it } from "vitest"
import {
  selectItemClasses,
  selectPopupClasses,
  selectTriggerVariants,
} from "../../../src/components/primitives/Select/Select.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Select variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(selectTriggerVariants({ size: "sm" })).toContain(
      `h-(--${p}-select-height-sm)`,
    )
    expect(selectTriggerVariants({ size: "lg" })).toContain(
      `h-(--${p}-select-height-lg)`,
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(selectPopupClasses).toContain(`bg-(--${p}-select-popup-background)`)
    expect(selectPopupClasses).toContain("min-w-[var(--anchor-width)]")
    expect(selectItemClasses).toContain(
      `data-[selected]:bg-(--${p}-select-item-selected-background)`,
    )
  })
})
