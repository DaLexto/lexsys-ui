import { describe, expect, test } from "vitest"
import { formVariants } from "../../../src/components/Form/Form.variants.js"

describe("form variants", () => {
  test("uses token-backed classes", () => {
    const className = formVariants()

    expect(className).toContain("gap-[var(--nx-form-gap)]")
    expect(className).toContain("text-[var(--nx-form-foreground)]")
  })
})
