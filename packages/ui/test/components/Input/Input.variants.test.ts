import { describe, expect, test } from "vitest"
import { inputVariants } from "../../../src/components/primitives/Input/Input.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("inputVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = inputVariants()

    expect(className).toContain(`rounded-(--${p}-input-radius)`)
    expect(className).toContain(`border-(--${p}-input-border-color)`)
    expect(className).toContain(`bg-(--${p}-input-background)`)
    expect(className).toContain(`leading-(--${p}-input-font-line-height)`)
    expect(className).toContain(`h-(--${p}-input-height-md)`)
  })

  test("includes focus, invalid, disabled, and size classes", () => {
    const className = inputVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain(
      `focus-visible:ring-(--${p}-input-focus-ring-color)`,
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain(`disabled:opacity-(--${p}-opacity-disabled)`)
    expect(className).toContain(`h-(--${p}-input-height-lg)`)
  })
})
