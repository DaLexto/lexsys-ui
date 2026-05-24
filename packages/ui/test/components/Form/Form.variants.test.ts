import { describe, expect, test } from "vitest"
import { formVariants } from "../../../src/components/primitives/Form/Form.variants.js"

describe("form variants", () => {
  test("uses token-backed classes", () => {
    const className = formVariants()

    expect(className).toContain("gap-(--lsys-form-gap)")
    expect(className).toContain("text-(--lsys-form-foreground)")
  })
})
