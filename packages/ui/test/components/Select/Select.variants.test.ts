import { describe, expect, it } from "vitest"
import {
  selectItemClasses,
  selectPopupClasses,
  selectTriggerVariants,
} from "../../../src/components/primitives/Select/Select.variants"

describe("Select variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(selectTriggerVariants({ size: "sm" })).toContain(
      "h-(--lex-select-height-sm)",
    )
    expect(selectTriggerVariants({ size: "lg" })).toContain(
      "h-(--lex-select-height-lg)",
    )
  })

  it("uses token-backed popup and item states", () => {
    expect(selectPopupClasses).toContain("bg-(--lex-select-popup-background)")
    expect(selectPopupClasses).toContain("min-w-[var(--anchor-width)]")
    expect(selectItemClasses).toContain(
      "data-[selected]:bg-(--lex-select-item-selected-background)",
    )
  })
})
