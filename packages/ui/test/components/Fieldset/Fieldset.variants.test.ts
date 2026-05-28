import { describe, expect, test } from "vitest"
import {
  fieldsetLegendVariants,
  fieldsetVariants,
} from "../../../src/components/primitives/Fieldset/Fieldset.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("fieldset variants", () => {
  test("uses token-backed classes for fieldset parts", () => {
    expect(fieldsetVariants()).toContain(`gap-(--${p}-fieldset-gap)`)
    expect(fieldsetVariants()).toContain(
      `border-(--${p}-fieldset-border-color)`,
    )
    expect(fieldsetLegendVariants()).toContain(
      `text-(--${p}-fieldset-legend-foreground)`,
    )
  })

  test("supports the plain variant", () => {
    expect(fieldsetVariants({ variant: "plain" })).toContain(
      "border-transparent",
    )
  })
})
