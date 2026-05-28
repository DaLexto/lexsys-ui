import { describe, expect, test } from "vitest"
import { formVariants } from "../../../src/components/primitives/Form/Form.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("form variants", () => {
  test("uses token-backed classes", () => {
    const className = formVariants()

    expect(className).toContain(`gap-(--${p}-form-gap)`)
    expect(className).toContain(`text-(--${p}-form-foreground)`)
  })
})
