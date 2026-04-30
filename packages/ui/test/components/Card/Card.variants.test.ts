import { describe, expect, test } from "vitest"
import {
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
  cardVariants,
} from "../../../src/components/Card/Card.variants.js"

describe("cardVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = cardVariants()

    expect(className).toContain("rounded-[var(--nx-radius-lg)]")
    expect(className).toContain("border-nx-border")
    expect(className).toContain("bg-nx-surface")
    expect(className).toContain("text-nx-surface-foreground")
  })

  test("defines token-backed slot spacing and text roles", () => {
    expect(cardHeaderClassName).toContain("p-[var(--nx-space-6)]")
    expect(cardTitleClassName).toContain("text-nx-foreground")
    expect(cardDescriptionClassName).toContain("text-nx-muted-foreground")
    expect(cardContentClassName).toContain("pt-0")
    expect(cardFooterClassName).toContain("gap-[var(--nx-space-3)]")
  })
})
