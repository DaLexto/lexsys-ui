import { describe, expect, test } from "vitest"
import { badgeVariants } from "../../../src/components/primitives/Badge/Badge.variants.js"

describe("badgeVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = badgeVariants()

    expect(className).toContain("rounded-(--lex-badge-radius)")
    expect(className).toContain("bg-(--lex-badge-neutral-background)")
    expect(className).toContain("text-(--lex-badge-neutral-foreground)")
    expect(className).toContain("border-(--lex-badge-neutral-border-color)")
  })

  test("maps variant, appearance, and size through component tokens", () => {
    const solidClassName = badgeVariants({
      variant: "primary",
      appearance: "solid",
      size: "sm",
    })

    expect(solidClassName).toContain("bg-(--lex-badge-primary-background)")
    expect(solidClassName).toContain("text-(--lex-badge-primary-foreground)")
    expect(solidClassName).toContain(
      "border-(--lex-badge-primary-border-color)",
    )
    expect(solidClassName).toContain("h-(--lex-badge-height-sm)")
    expect(solidClassName).toContain("text-(length:--lex-badge-font-size-sm)")

    const outlineClassName = badgeVariants({
      variant: "primary",
      appearance: "outline",
      size: "sm",
    })

    expect(outlineClassName).toContain("bg-(--lex-badge-outline-background)")
    expect(outlineClassName).toContain(
      "text-(--lex-badge-primary-border-color)",
    )
    expect(outlineClassName).not.toContain(
      "text-(--lex-badge-primary-foreground)",
    )
  })

  test("maps success and warning variants through feedback tokens", () => {
    const successClassName = badgeVariants({
      variant: "success",
      appearance: "solid",
    })

    expect(successClassName).toContain(
      "bg-(--lex-color-feedback-success-background)",
    )
    expect(successClassName).toContain(
      "text-(--lex-color-feedback-success-foreground)",
    )

    const warningClassName = badgeVariants({
      variant: "warning",
      appearance: "outline",
    })

    expect(warningClassName).toContain(
      "text-(--lex-color-feedback-warning-foreground)",
    )
  })
})
