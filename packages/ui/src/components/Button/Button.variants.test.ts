import { describe, expect, test } from "vitest"
import { buttonVariants } from "./Button.variants.js"

describe("buttonVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = buttonVariants()

    expect(className).toContain("bg-nx-primary")
    expect(className).toContain("text-nx-primary-foreground")
    expect(className).toContain("rounded-[var(--nx-button-radius)]")
    expect(className).toContain("h-[var(--nx-button-height-md)]")
  })

  test("includes focus, disabled, and loading state classes", () => {
    const className = buttonVariants({ variant: "secondary", size: "lg" })

    expect(className).toContain("focus-visible:ring-nx-ring")
    expect(className).toContain("disabled:opacity-50")
    expect(className).toContain("aria-busy:cursor-wait")
    expect(className).toContain("border-nx-border")
    expect(className).toContain("h-[var(--nx-button-height-lg)]")
  })
})
