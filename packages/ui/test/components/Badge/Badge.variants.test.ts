import { describe, expect, test } from "vitest"
import { badgeVariants } from "../../../src/components/primitives/Badge/Badge.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("badgeVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = badgeVariants()

    expect(className).toContain(`rounded-(--${p}-badge-radius)`)
    expect(className).toContain(`bg-(--${p}-badge-neutral-background)`)
    expect(className).toContain(`text-(--${p}-badge-neutral-foreground)`)
    expect(className).toContain(`border-(--${p}-badge-neutral-border-color)`)
  })

  test("maps variant, appearance, and size through component tokens", () => {
    const solidClassName = badgeVariants({
      variant: "primary",
      appearance: "solid",
      size: "sm",
    })

    expect(solidClassName).toContain(`bg-(--${p}-badge-primary-background)`)
    expect(solidClassName).toContain(`text-(--${p}-badge-primary-foreground)`)
    expect(solidClassName).toContain(
      `border-(--${p}-badge-primary-border-color)`,
    )
    expect(solidClassName).toContain(`h-(--${p}-badge-height-sm)`)
    expect(solidClassName).toContain(`text-(length:--${p}-badge-font-size-sm)`)

    const outlineClassName = badgeVariants({
      variant: "primary",
      appearance: "outline",
      size: "sm",
    })

    expect(outlineClassName).toContain(`bg-(--${p}-badge-outline-background)`)
    expect(outlineClassName).toContain(
      `text-(--${p}-badge-primary-border-color)`,
    )
    expect(outlineClassName).not.toContain(
      `text-(--${p}-badge-primary-foreground)`,
    )
  })

  test("maps success and warning variants through feedback tokens", () => {
    const successClassName = badgeVariants({
      variant: "success",
      appearance: "solid",
    })

    expect(successClassName).toContain(
      `bg-(--${p}-color-feedback-success-background)`,
    )
    expect(successClassName).toContain(
      `text-(--${p}-color-feedback-success-foreground)`,
    )

    const warningClassName = badgeVariants({
      variant: "warning",
      appearance: "outline",
    })

    expect(warningClassName).toContain(
      `text-(--${p}-color-feedback-warning-foreground)`,
    )
  })
})
