import { describe, expect, test } from "vitest"
import {
  numberFieldButtonVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldScrubAreaCursorVariants,
  numberFieldScrubAreaVariants,
  numberFieldVariants,
} from "../../../src/components/NumberField/NumberField.variants.js"

describe("number field variants", () => {
  test("uses token-backed classes for root, group, and input", () => {
    expect(numberFieldVariants()).toContain("gap-(--nx-number-field-gap)")
    expect(numberFieldGroupVariants()).toContain(
      "border-(--nx-number-field-border-color)",
    )
    expect(numberFieldInputVariants()).toContain(
      "text-(--nx-number-field-input-foreground)",
    )
  })

  test("uses token-backed classes for steppers and scrub parts", () => {
    expect(
      numberFieldButtonVariants({ position: "decrement", size: "lg" }),
    ).toContain("w-(--nx-number-field-stepper-width-lg)")
    expect(numberFieldScrubAreaVariants()).toContain(
      "text-(--nx-number-field-scrub-foreground)",
    )
    expect(numberFieldScrubAreaCursorVariants()).toContain(
      "bg-(--nx-number-field-scrub-cursor-background)",
    )
  })
})
