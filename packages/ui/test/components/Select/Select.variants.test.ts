import { describe, expect, it } from "vitest"
import {
  selectItemVariants,
  selectPopupVariants,
  selectTriggerVariants,
} from "../../../src/components/Select/Select.variants"

describe("Select variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(selectTriggerVariants({ size: "sm" })).toContain(
      "h-[var(--nx-select-height-sm)]",
    )
    expect(selectTriggerVariants({ size: "lg" })).toContain(
      "h-[var(--nx-select-height-lg)]",
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(selectPopupVariants()).toContain(
      "bg-[var(--nx-select-popup-background)]",
    )
    expect(selectItemVariants()).toContain(
      "data-[selected]:bg-[var(--nx-select-item-selected-background)]",
    )
  })
})
