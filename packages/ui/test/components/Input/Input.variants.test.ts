import { describe, expect, test } from "vitest"
import { inputVariants } from "../../../src/components/primitives/Input/Input.variants.js"

describe("inputVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = inputVariants()

    expect(className).toContain("rounded-(--lsys-input-radius)")
    expect(className).toContain("border-(--lsys-input-border-color)")
    expect(className).toContain("bg-(--lsys-input-background)")
    expect(className).toContain("leading-(--lsys-input-font-line-height)")
    expect(className).toContain("h-(--lsys-input-height-md)")
  })

  test("includes focus, invalid, disabled, and size classes", () => {
    const className = inputVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-(--lsys-input-focus-ring-color)",
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain("disabled:opacity-(--lsys-opacity-disabled)")
    expect(className).toContain("h-(--lsys-input-height-lg)")
  })
})
