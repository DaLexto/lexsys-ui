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
    expect(fieldVariants()).toContain("gap-(--lex-field-gap)")
    expect(fieldLabelVariants()).toContain(
      "text-(--lex-field-label-foreground)",
    )
    expect(fieldDescriptionVariants()).toContain(
      "text-(--lex-field-description-foreground)",
    )
    expect(fieldErrorVariants()).toContain(
      "text-(--lex-field-error-foreground)",
    )
    expect(fieldItemVariants()).toContain("gap-(--lex-field-item-gap)")
  })

  test("uses token-backed classes for control states and sizes", () => {
    const className = fieldControlVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain("rounded-(--lex-field-control-radius)")
    expect(className).toContain("h-(--lex-field-control-height-lg)")
    expect(className).toContain(
      "focus-visible:ring-(--lex-field-control-focus-ring-color)",
    )
    expect(className).toContain(
      "data-[invalid]:border-(--lex-field-control-invalid-border-color)",
    )
  })
})
