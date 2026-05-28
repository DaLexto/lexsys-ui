import { describe, expect, test } from "vitest"
import { inputVariants } from "../../../src/components/primitives/Input/Input.variants.js"

describe("inputVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = inputVariants()

    expect(className).toContain("rounded-(--lex-input-radius)")
    expect(className).toContain("border-(--lex-input-border-color)")
    expect(className).toContain("bg-(--lex-input-background)")
    expect(className).toContain("leading-(--lex-input-font-line-height)")
    expect(className).toContain("h-(--lex-input-height-md)")
  })

  test("includes focus, invalid, disabled, and size classes", () => {
    const className = inputVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-(--lex-input-focus-ring-color)",
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain("disabled:opacity-(--lex-opacity-disabled)")
    expect(className).toContain("h-(--lex-input-height-lg)")
  })
})
