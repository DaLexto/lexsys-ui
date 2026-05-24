import { describe, expect, test } from "vitest"
import {
  fieldsetLegendVariants,
  fieldsetVariants,
} from "../../../src/components/primitives/Fieldset/Fieldset.variants.js"

describe("fieldset variants", () => {
  test("uses token-backed classes for fieldset parts", () => {
    expect(fieldsetVariants()).toContain("gap-(--lsys-fieldset-gap)")
    expect(fieldsetVariants()).toContain(
      "border-(--lsys-fieldset-border-color)",
    )
    expect(fieldsetLegendVariants()).toContain(
      "text-(--lsys-fieldset-legend-foreground)",
    )
  })

  test("supports the plain variant", () => {
    expect(fieldsetVariants({ variant: "plain" })).toContain(
      "border-transparent",
    )
  })
})
