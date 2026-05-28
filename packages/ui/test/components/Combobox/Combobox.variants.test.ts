import { describe, expect, it } from "vitest"
import {
  comboboxInputGroupVariants,
  comboboxPopupVariants,
  comboboxTriggerVariants,
} from "../../../src/components/primitives/Combobox/Combobox.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Combobox variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(comboboxTriggerVariants({ size: "sm" })).toContain(
      `h-(--${p}-select-height-sm)`,
    )
    expect(comboboxTriggerVariants({ size: "lg" })).toContain(
      `h-(--${p}-select-height-lg)`,
    )
  })

  it("uses token-backed popup, input group, and item states", () => {
    expect(comboboxPopupVariants()).toContain(
      `bg-(--${p}-select-popup-background)`,
    )
    expect(comboboxPopupVariants()).toContain("min-w-[var(--anchor-width)]")
    expect(comboboxInputGroupVariants()).toContain(
      `border-(--${p}-select-border-color)`,
    )
  })
})
