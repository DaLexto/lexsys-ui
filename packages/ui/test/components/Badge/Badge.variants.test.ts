import { describe, expect, test } from "vitest"
import { badgeVariants } from "../../../src/components/primitives/Badge/Badge.variants.js"

describe("badgeVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = badgeVariants()

    expect(className).toContain("rounded-(--lsys-badge-radius)")
    expect(className).toContain("bg-(--lsys-badge-neutral-background)")
    expect(className).toContain("text-(--lsys-badge-neutral-foreground)")
    expect(className).toContain("border-(--lsys-badge-neutral-border-color)")
  })

  test("maps variant, appearance, and size through component tokens", () => {
    const solidClassName = badgeVariants({
      variant: "primary",
      appearance: "solid",
      size: "sm",
    })

    expect(solidClassName).toContain("bg-(--lsys-badge-primary-background)")
    expect(solidClassName).toContain("text-(--lsys-badge-primary-foreground)")
    expect(solidClassName).toContain(
      "border-(--lsys-badge-primary-border-color)",
    )
    expect(solidClassName).toContain("h-(--lsys-badge-height-sm)")
    expect(solidClassName).toContain("text-(length:--lsys-badge-font-size-sm)")

    const outlineClassName = badgeVariants({
      variant: "primary",
      appearance: "outline",
      size: "sm",
    })

    expect(outlineClassName).toContain("bg-(--lsys-badge-outline-background)")
    expect(outlineClassName).toContain(
      "text-(--lsys-badge-primary-border-color)",
    )
    expect(outlineClassName).not.toContain(
      "text-(--lsys-badge-primary-foreground)",
    )
  })

  test("maps success and warning variants through feedback tokens", () => {
    const successClassName = badgeVariants({
      variant: "success",
      appearance: "solid",
    })

    expect(successClassName).toContain(
      "bg-(--lsys-color-feedback-success-background)",
    )
    expect(successClassName).toContain(
      "text-(--lsys-color-feedback-success-foreground)",
    )

    const warningClassName = badgeVariants({
      variant: "warning",
      appearance: "outline",
    })

    expect(warningClassName).toContain(
      "text-(--lsys-color-feedback-warning-foreground)",
    )
  })
})
