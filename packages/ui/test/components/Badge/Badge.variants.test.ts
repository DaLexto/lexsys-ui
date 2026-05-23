import { describe, expect, test } from "vitest"
import { badgeVariants } from "../../../src/components/primitives/Badge/Badge.variants.js"

describe("badgeVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = badgeVariants()

    expect(className).toContain("rounded-(--nx-badge-radius)")
    expect(className).toContain("bg-(--nx-badge-neutral-background)")
    expect(className).toContain("text-(--nx-badge-neutral-foreground)")
    expect(className).toContain("border-(--nx-badge-neutral-border-color)")
  })

  test("maps variant, appearance, and size through component tokens", () => {
    const solidClassName = badgeVariants({
      variant: "primary",
      appearance: "solid",
      size: "sm",
    })

    expect(solidClassName).toContain("bg-(--nx-badge-primary-background)")
    expect(solidClassName).toContain("text-(--nx-badge-primary-foreground)")
    expect(solidClassName).toContain("border-(--nx-badge-primary-border-color)")
    expect(solidClassName).toContain("h-(--nx-badge-height-sm)")
    expect(solidClassName).toContain("text-(length:--nx-badge-font-size-sm)")

    const outlineClassName = badgeVariants({
      variant: "primary",
      appearance: "outline",
      size: "sm",
    })

    expect(outlineClassName).toContain("bg-(--nx-badge-outline-background)")
    expect(outlineClassName).toContain("text-(--nx-badge-primary-border-color)")
    expect(outlineClassName).not.toContain(
      "text-(--nx-badge-primary-foreground)",
    )
  })
})
