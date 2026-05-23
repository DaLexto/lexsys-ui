import { describe, expect, test } from "vitest"
import { inputVariants } from "../../../src/components/Input/Input.variants.js"

describe("inputVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = inputVariants()

    expect(className).toContain("rounded-(--nx-input-radius)")
    expect(className).toContain("border-(--nx-input-border-color)")
    expect(className).toContain("bg-(--nx-input-background)")
    expect(className).toContain("leading-(--nx-input-font-line-height)")
    expect(className).toContain("h-(--nx-input-height-md)")
  })

  test("includes focus, invalid, disabled, and size classes", () => {
    const className = inputVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-(--nx-input-focus-ring-color)",
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain("disabled:opacity-(--nx-opacity-disabled)")
    expect(className).toContain("h-(--nx-input-height-lg)")
  })
})
