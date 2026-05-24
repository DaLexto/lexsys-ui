import { describe, expect, test } from "vitest"
import { buttonVariants } from "../../../src/components/primitives/Button/Button.variants.js"

describe("buttonVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = buttonVariants()

    expect(className).toContain("bg-(--lsys-button-primary-background)")
    expect(className).toContain("text-(--lsys-button-primary-foreground)")
    expect(className).toContain("rounded-(--lsys-button-radius)")
    expect(className).toContain("leading-(--lsys-button-font-line-height)")
    expect(className).toContain("h-(--lsys-button-height-md)")
  })

  test("includes focus, disabled, and loading state classes", () => {
    const className = buttonVariants({ variant: "secondary", size: "lg" })

    expect(className).toContain(
      "focus-visible:ring-(--lsys-button-focus-ring-color)",
    )
    expect(className).toContain("disabled:opacity-(--lsys-opacity-disabled)")
    expect(className).toContain("aria-busy:opacity-(--lsys-opacity-busy)")
    expect(className).toContain("border-(--lsys-button-secondary-border-color)")
    expect(className).toContain("h-(--lsys-button-height-lg)")
  })

  test("maps ghost and outline variants through component tokens", () => {
    const ghostClassName = buttonVariants({ variant: "ghost" })
    expect(ghostClassName).toContain("bg-transparent")
    expect(ghostClassName).toContain(
      "text-(--lsys-button-secondary-foreground)",
    )

    const outlineClassName = buttonVariants({ variant: "outline" })
    expect(outlineClassName).toContain(
      "border-(--lsys-button-secondary-border-color)",
    )
    expect(outlineClassName).toContain("bg-transparent")
  })

  test("maps danger variant through component tokens", () => {
    const className = buttonVariants({ variant: "danger" })

    expect(className).toContain("bg-(--lsys-button-danger-background)")
    expect(className).toContain("text-(--lsys-button-danger-foreground)")
    expect(className).toContain(
      "hover:bg-(--lsys-button-danger-hover-background)",
    )
  })
})
