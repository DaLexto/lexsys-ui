import { describe, expect, it } from "vitest"
import {
  autocompleteInputVariants,
  autocompletePopupVariants,
  autocompleteTriggerVariants,
} from "../../../src/components/primitives/Autocomplete/Autocomplete.variants.js"

describe("Autocomplete variants", () => {
  it("uses token-backed trigger sizing", () => {
    expect(autocompleteTriggerVariants({ size: "sm" })).toContain(
      "h-(--lex-select-height-sm)",
    )
    expect(autocompleteTriggerVariants({ size: "lg" })).toContain(
      "h-(--lex-select-height-lg)",
    )
  })

  it("uses token-backed popup and input styling", () => {
    expect(autocompletePopupVariants()).toContain(
      "bg-(--lex-select-popup-background)",
    )
    expect(autocompleteInputVariants()).toContain(
      "placeholder:text-(--lex-select-placeholder-color)",
    )
  })
})
