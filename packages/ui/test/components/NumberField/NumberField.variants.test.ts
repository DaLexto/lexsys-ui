import { describe, expect, test } from "vitest"
import {
  numberFieldButtonVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldScrubAreaCursorVariants,
  numberFieldScrubAreaVariants,
  numberFieldVariants,
} from "../../../src/components/primitives/NumberField/NumberField.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("number field variants", () => {
  test("uses token-backed classes for root, group, and input", () => {
    expect(numberFieldVariants()).toContain(`gap-(--${p}-number-field-gap)`)
    expect(numberFieldGroupVariants()).toContain(
      `border-(--${p}-number-field-border-color)`,
    )
    expect(numberFieldInputVariants()).toContain(
      `text-(--${p}-number-field-input-foreground)`,
    )
  })

  test("uses token-backed classes for steppers and scrub parts", () => {
    expect(
      numberFieldButtonVariants({ position: "decrement", size: "lg" }),
    ).toContain(`w-(--${p}-number-field-stepper-width-lg)`)
    expect(numberFieldScrubAreaVariants()).toContain(
      `text-(--${p}-number-field-scrub-foreground)`,
    )
    expect(numberFieldScrubAreaCursorVariants()).toContain(
      `bg-(--${p}-number-field-scrub-cursor-background)`,
    )
  })
})
