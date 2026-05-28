import { describe, expect, test } from "vitest"
import {
  numberFieldButtonVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldScrubAreaCursorVariants,
  numberFieldScrubAreaVariants,
  numberFieldVariants,
} from "../../../src/components/primitives/NumberField/NumberField.variants.js"

describe("number field variants", () => {
  test("uses token-backed classes for root, group, and input", () => {
    expect(numberFieldVariants()).toContain("gap-(--lex-number-field-gap)")
    expect(numberFieldGroupVariants()).toContain(
      "border-(--lex-number-field-border-color)",
    )
    expect(numberFieldInputVariants()).toContain(
      "text-(--lex-number-field-input-foreground)",
    )
  })

  test("uses token-backed classes for steppers and scrub parts", () => {
    expect(
      numberFieldButtonVariants({ position: "decrement", size: "lg" }),
    ).toContain("w-(--lex-number-field-stepper-width-lg)")
    expect(numberFieldScrubAreaVariants()).toContain(
      "text-(--lex-number-field-scrub-foreground)",
    )
    expect(numberFieldScrubAreaCursorVariants()).toContain(
      "bg-(--lex-number-field-scrub-cursor-background)",
    )
  })
})
