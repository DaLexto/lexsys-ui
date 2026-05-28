import { describe, expect, it } from "vitest"
import {
  autocompleteInputVariants,
  autocompletePopupVariants,
  autocompleteTriggerVariants,
} from "../../../src/components/primitives/Autocomplete/Autocomplete.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Autocomplete variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(autocompleteTriggerVariants({ size: "sm" })).toContain(
      `h-(--${p}-select-height-sm)`,
    )
    expect(autocompleteTriggerVariants({ size: "lg" })).toContain(
      `h-(--${p}-select-height-lg)`,
    )
  })

  it("uses token-backed popup and input styling", () => {
    expect(autocompletePopupVariants()).toContain(
      `bg-(--${p}-select-popup-background)`,
    )
    expect(autocompleteInputVariants()).toContain(
      `placeholder:text-(--${p}-select-placeholder-color)`,
    )
  })
})
