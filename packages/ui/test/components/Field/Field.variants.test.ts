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
    expect(fieldVariants()).toContain("gap-(--lsys-field-gap)")
    expect(fieldLabelVariants()).toContain(
      "text-(--lsys-field-label-foreground)",
    )
    expect(fieldDescriptionVariants()).toContain(
      "text-(--lsys-field-description-foreground)",
    )
    expect(fieldErrorVariants()).toContain(
      "text-(--lsys-field-error-foreground)",
    )
    expect(fieldItemVariants()).toContain("gap-(--lsys-field-item-gap)")
  })

  test("uses token-backed classes for control states and sizes", () => {
    const className = fieldControlVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain("rounded-(--lsys-field-control-radius)")
    expect(className).toContain("h-(--lsys-field-control-height-lg)")
    expect(className).toContain(
      "focus-visible:ring-(--lsys-field-control-focus-ring-color)",
    )
    expect(className).toContain(
      "data-[invalid]:border-(--lsys-field-control-invalid-border-color)",
    )
  })
})
