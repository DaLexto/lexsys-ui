import { describe, expect, test } from "vitest"
import { buttonVariants } from "../../../src/components/Button/Button.variants.js"

describe("buttonVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = buttonVariants()

    expect(className).toContain("bg-(--nx-button-primary-background)")
    expect(className).toContain("text-(--nx-button-primary-foreground)")
    expect(className).toContain("rounded-(--nx-button-radius)")
    expect(className).toContain("leading-(--nx-button-font-line-height)")
    expect(className).toContain("h-(--nx-button-height-md)")
  })

  test("includes focus, disabled, and loading state classes", () => {
    const className = buttonVariants({ variant: "secondary", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-(--nx-button-focus-ring-color)",
    )
    expect(className).toContain("disabled:opacity-50")
    expect(className).toContain("aria-busy:cursor-wait")
    expect(className).toContain("border-(--nx-button-secondary-border-color)")
    expect(className).toContain("h-(--nx-button-height-lg)")
  })
})
