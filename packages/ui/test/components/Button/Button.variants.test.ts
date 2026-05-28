import { describe, expect, test } from "vitest"
import { buttonVariants } from "../../../src/components/primitives/Button/Button.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("buttonVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = buttonVariants()

    expect(className).toContain(`bg-(--${p}-button-primary-background)`)
    expect(className).toContain(`text-(--${p}-button-primary-foreground)`)
    expect(className).toContain(`rounded-(--${p}-button-radius)`)
    expect(className).toContain(`leading-(--${p}-button-font-line-height)`)
    expect(className).toContain(`h-(--${p}-button-height-md)`)
  })

  test("includes focus, disabled, and loading state classes", () => {
    const className = buttonVariants({ variant: "secondary", size: "lg" })

    expect(className).toContain(
      `focus-visible:ring-(--${p}-button-focus-ring-color)`,
    )
    expect(className).toContain(`disabled:opacity-(--${p}-opacity-disabled)`)
    expect(className).toContain(`aria-busy:opacity-(--${p}-opacity-busy)`)
    expect(className).toContain(`border-(--${p}-button-secondary-border-color)`)
    expect(className).toContain(`h-(--${p}-button-height-lg)`)
  })

  test("maps ghost and outline variants through component tokens", () => {
    const ghostClassName = buttonVariants({ variant: "ghost" })
    expect(ghostClassName).toContain("bg-transparent")
    expect(ghostClassName).toContain(
      `text-(--${p}-button-secondary-foreground)`,
    )

    const outlineClassName = buttonVariants({ variant: "outline" })
    expect(outlineClassName).toContain(
      `border-(--${p}-button-secondary-border-color)`,
    )
    expect(outlineClassName).toContain("bg-transparent")
  })

  test("maps danger variant through component tokens", () => {
    const className = buttonVariants({ variant: "danger" })

    expect(className).toContain(`bg-(--${p}-button-danger-background)`)
    expect(className).toContain(`text-(--${p}-button-danger-foreground)`)
    expect(className).toContain(
      `hover:bg-(--${p}-button-danger-hover-background)`,
    )
  })
})
