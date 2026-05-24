import { describe, expect, it } from "vitest"
import {
  comboboxInputGroupVariants,
  comboboxPopupVariants,
  comboboxTriggerVariants,
} from "../../../src/components/primitives/Combobox/Combobox.variants.js"

describe("Combobox variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(comboboxTriggerVariants({ size: "sm" })).toContain(
      "h-(--nx-select-height-sm)",
    )
    expect(comboboxTriggerVariants({ size: "lg" })).toContain(
      "h-(--nx-select-height-lg)",
    )
  })

  it("uses token-backed popup, input group, and item states", () => {
    expect(comboboxPopupVariants()).toContain("bg-(--nx-select-popup-background)")
    expect(comboboxPopupVariants()).toContain("min-w-[var(--anchor-width)]")
    expect(comboboxInputGroupVariants()).toContain(
      "border-(--nx-select-border-color)",
    )
  })
})
