import { describe, expect, test } from "vitest"
import { inputVariants } from "../../../src/components/Input/Input.variants.js"

describe("inputVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = inputVariants()

    expect(className).toContain("rounded-[var(--nx-input-radius)]")
    expect(className).toContain("border-[var(--nx-input-border-color)]")
    expect(className).toContain("bg-[var(--nx-input-background)]")
    expect(className).toContain("leading-[var(--nx-input-font-line-height)]")
    expect(className).toContain("h-[var(--nx-input-height-md)]")
  })

  test("includes focus, invalid, disabled, and size classes", () => {
    const className = inputVariants({ variant: "ghost", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-[var(--nx-input-focus-ring-color)]",
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain("disabled:opacity-50")
    expect(className).toContain("h-[var(--nx-input-height-lg)]")
  })
})
