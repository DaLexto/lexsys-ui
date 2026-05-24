import { describe, expect, it } from "vitest"
import {
  autocompleteInputVariants,
  autocompletePopupVariants,
  autocompleteTriggerVariants,
} from "../../../src/components/primitives/Autocomplete/Autocomplete.variants.js"

describe("Autocomplete variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(autocompleteTriggerVariants({ size: "sm" })).toContain(
      "h-(--lsys-select-height-sm)",
    )
    expect(autocompleteTriggerVariants({ size: "lg" })).toContain(
      "h-(--lsys-select-height-lg)",
    )
  })

  it("uses token-backed popup and input styling", () => {
    expect(autocompletePopupVariants()).toContain(
      "bg-(--lsys-select-popup-background)",
    )
    expect(autocompleteInputVariants()).toContain(
      "placeholder:text-(--lsys-select-placeholder-color)",
    )
  })
})
