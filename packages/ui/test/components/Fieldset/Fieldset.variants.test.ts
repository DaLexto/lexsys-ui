import { describe, expect, test } from "vitest"
import {
  fieldsetLegendVariants,
  fieldsetVariants,
} from "../../../src/components/primitives/Fieldset/Fieldset.variants.js"

describe("fieldset variants", () => {
  test("uses token-backed classes for fieldset parts", () => {
    expect(fieldsetVariants()).toContain("gap-(--lex-fieldset-gap)")
    expect(fieldsetVariants()).toContain("border-(--lex-fieldset-border-color)")
    expect(fieldsetLegendVariants()).toContain(
      "text-(--lex-fieldset-legend-foreground)",
    )
  })

  test("supports the plain variant", () => {
    expect(fieldsetVariants({ variant: "plain" })).toContain(
      "border-transparent",
    )
  })
})
