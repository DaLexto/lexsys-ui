import { describe, expect, test } from "vitest"
import {
  fieldControlVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldItemVariants,
  fieldLabelVariants,
  fieldVariants,
} from "../../../src/components/primitives/Field/Field.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("field variants", () => {
  test("uses token-backed classes for field parts", () => {
    expect(fieldVariants()).toContain(`gap-(--${p}-field-gap)`)
    expect(fieldLabelVariants()).toContain(
      `text-(--${p}-field-label-foreground)`,
    )
    expect(fieldDescriptionVariants()).toContain(
      `text-(--${p}-field-description-foreground)`,
    )
    expect(fieldErrorVariants()).toContain(
      `text-(--${p}-field-error-foreground)`,
    )
    expect(fieldItemVariants()).toContain(`gap-(--${p}-field-item-gap)`)
  })

  test("uses token-backed classes for control states and sizes", () => {
    const className = fieldControlVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain(`rounded-(--${p}-field-control-radius)`)
    expect(className).toContain(`h-(--${p}-field-control-height-lg)`)
    expect(className).toContain(
      `focus-visible:ring-(--${p}-field-control-focus-ring-color)`,
    )
    expect(className).toContain(
      `data-[invalid]:border-(--${p}-field-control-invalid-border-color)`,
    )
  })
})
