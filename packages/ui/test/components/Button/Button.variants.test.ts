import { describe, expect, test } from "vitest"
import { buttonVariants } from "../../../src/components/primitives/Button/Button.variants.js"

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
    expect(className).toContain("disabled:opacity-(--nx-opacity-disabled)")
    expect(className).toContain("aria-busy:opacity-(--nx-opacity-busy)")
    expect(className).toContain("border-(--nx-button-secondary-border-color)")
    expect(className).toContain("h-(--nx-button-height-lg)")
  })

  test("maps danger variant through component tokens", () => {
    const className = buttonVariants({ variant: "danger" })

    expect(className).toContain("bg-(--nx-button-danger-background)")
    expect(className).toContain("text-(--nx-button-danger-foreground)")
    expect(className).toContain(
      "hover:bg-(--nx-button-danger-hover-background)",
    )
  })
})
