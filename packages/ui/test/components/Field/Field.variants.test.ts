import { describe, expect, test } from "vitest"
import {
  fieldControlVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldItemVariants,
  fieldLabelVariants,
  fieldVariants,
} from "../../../src/components/primitives/Field/Field.variants.js"

describe("field variants", () => {
  test("uses token-backed classes for field parts", () => {
    expect(fieldVariants()).toContain("gap-(--nx-field-gap)")
    expect(fieldLabelVariants()).toContain("text-(--nx-field-label-foreground)")
    expect(fieldDescriptionVariants()).toContain(
      "text-(--nx-field-description-foreground)",
    )
    expect(fieldErrorVariants()).toContain("text-(--nx-field-error-foreground)")
    expect(fieldItemVariants()).toContain("gap-(--nx-field-item-gap)")
  })

  test("uses token-backed classes for control states and sizes", () => {
    const className = fieldControlVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain("rounded-(--nx-field-control-radius)")
    expect(className).toContain("h-(--nx-field-control-height-lg)")
    expect(className).toContain(
      "focus-visible:ring-(--nx-field-control-focus-ring-color)",
    )
    expect(className).toContain(
      "data-[invalid]:border-(--nx-field-control-invalid-border-color)",
    )
  })
})
