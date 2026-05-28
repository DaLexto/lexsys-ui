import { describe, expect, test } from "vitest"
import { buttonVariants } from "../../../src/components/primitives/Button/Button.variants.js"

describe("buttonVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = buttonVariants()

    expect(className).toContain("bg-(--lex-button-primary-background)")
    expect(className).toContain("text-(--lex-button-primary-foreground)")
    expect(className).toContain("rounded-(--lex-button-radius)")
    expect(className).toContain("leading-(--lex-button-font-line-height)")
    expect(className).toContain("h-(--lex-button-height-md)")
  })

  test("includes focus, disabled, and loading state classes", () => {
    const className = buttonVariants({ variant: "secondary", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-(--lex-button-focus-ring-color)",
    )
    expect(className).toContain("disabled:opacity-(--lex-opacity-disabled)")
    expect(className).toContain("aria-busy:opacity-(--lex-opacity-busy)")
    expect(className).toContain("border-(--lex-button-secondary-border-color)")
    expect(className).toContain("h-(--lex-button-height-lg)")
  })

  test("maps ghost and outline variants through component tokens", () => {
    const ghostClassName = buttonVariants({ variant: "ghost" })
    expect(ghostClassName).toContain("bg-transparent")
    expect(ghostClassName).toContain("text-(--lex-button-secondary-foreground)")

    const outlineClassName = buttonVariants({ variant: "outline" })
    expect(outlineClassName).toContain(
      "border-(--lex-button-secondary-border-color)",
    )
    expect(outlineClassName).toContain("bg-transparent")
  })

  test("maps danger variant through component tokens", () => {
    const className = buttonVariants({ variant: "danger" })

    expect(className).toContain("bg-(--lex-button-danger-background)")
    expect(className).toContain("text-(--lex-button-danger-foreground)")
    expect(className).toContain(
      "hover:bg-(--lex-button-danger-hover-background)",
    )
  })
})
