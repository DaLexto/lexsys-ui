import { describe, expect, it } from "vitest"
import {
  selectItemVariants,
  selectPopupVariants,
  selectTriggerVariants,
} from "../../../src/components/primitives/Select/Select.variants"

describe("Select variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(selectTriggerVariants({ size: "sm" })).toContain(
      "h-(--lsys-select-height-sm)",
    )
    expect(selectTriggerVariants({ size: "lg" })).toContain(
      "h-(--lsys-select-height-lg)",
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(selectPopupVariants()).toContain(
      "bg-(--lsys-select-popup-background)",
    )
    expect(selectPopupVariants()).toContain("min-w-[var(--anchor-width)]")
    expect(selectItemVariants()).toContain(
      "data-[selected]:bg-(--lsys-select-item-selected-background)",
    )
  })
})
