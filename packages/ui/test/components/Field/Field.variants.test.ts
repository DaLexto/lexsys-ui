import { describe, expect, test } from "vitest"
import {
  fieldControlVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldItemVariants,
  fieldLabelVariants,
  fieldVariants,
} from "../../../src/components/Field/Field.variants.js"

describe("field variants", () => {
  test("uses token-backed classes for field parts", () => {
    expect(fieldVariants()).toContain("gap-[var(--nx-field-gap)]")
    expect(fieldLabelVariants()).toContain(
      "text-[var(--nx-field-label-foreground)]",
    )
    expect(fieldDescriptionVariants()).toContain(
      "text-[var(--nx-field-description-foreground)]",
    )
    expect(fieldErrorVariants()).toContain(
      "text-[var(--nx-field-error-foreground)]",
    )
    expect(fieldItemVariants()).toContain("gap-[var(--nx-field-item-gap)]")
  })

  test("uses token-backed classes for control states and sizes", () => {
    const className = fieldControlVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain("rounded-[var(--nx-field-control-radius)]")
    expect(className).toContain("h-[var(--nx-field-control-height-lg)]")
    expect(className).toContain(
      "focus-visible:ring-[var(--nx-field-control-focus-ring-color)]",
    )
    expect(className).toContain(
      "data-[invalid]:border-[var(--nx-field-control-invalid-border-color)]",
    )
  })
})
