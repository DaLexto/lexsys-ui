import { describe, expect, test } from "vitest"
import { badgeVariants } from "../../../src/components/Badge/Badge.variants.js"

describe("badgeVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = badgeVariants()

    expect(className).toContain("rounded-(--nx-badge-radius)")
    expect(className).toContain("bg-(--nx-badge-background)")
    expect(className).toContain("text-(--nx-badge-foreground)")
    expect(className).toContain("border-(--nx-badge-border-color)")
  })

  test("maps tone, variant, and size through component tokens", () => {
    const className = badgeVariants({
      tone: "primary",
      variant: "outline",
      size: "sm",
    })

    expect(className).toContain(
      "(--nx-badge-background:--nx-badge-primary-background)",
    )
    expect(className).toContain(
      "(--nx-badge-background:--nx-badge-outline-background)",
    )
    expect(className).toContain("h-(--nx-badge-height-sm)")
    expect(className).toContain("text-(length:--nx-badge-font-size-sm)")
  })
})
