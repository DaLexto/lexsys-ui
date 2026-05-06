import { describe, expect, test } from "vitest"
import { buttonVariants } from "../../../src/components/Button/Button.variants.js"

describe("buttonVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = buttonVariants()

    expect(className).toContain("bg-[var(--nx-button-primary-background)]")
    expect(className).toContain("text-[var(--nx-button-primary-foreground)]")
    expect(className).toContain("rounded-[var(--nx-button-radius)]")
    expect(className).toContain("leading-[var(--nx-button-font-line-height)]")
    expect(className).toContain("h-[var(--nx-button-height-md)]")
  })

  test("includes focus, disabled, and loading state classes", () => {
    const className = buttonVariants({ variant: "secondary", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-[var(--nx-button-focus-ring-color)]",
    )
    expect(className).toContain("disabled:opacity-50")
    expect(className).toContain("aria-busy:cursor-wait")
    expect(className).toContain(
      "border-[var(--nx-button-secondary-border-color)]",
    )
    expect(className).toContain("h-[var(--nx-button-height-lg)]")
  })
})
