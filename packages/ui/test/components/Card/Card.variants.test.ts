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

    expect(className).toContain("rounded-[var(--nx-card-radius)]")
    expect(className).toContain("border-[var(--nx-card-border-color)]")
    expect(className).toContain("bg-[var(--nx-card-background)]")
    expect(className).toContain("text-[var(--nx-card-foreground)]")
  })

  test("defines token-backed slot spacing and text roles", () => {
    expect(cardHeaderClassName).toContain("p-[var(--nx-card-padding)]")
    expect(cardTitleClassName).toContain("text-nx-foreground")
    expect(cardDescriptionClassName).toContain("text-nx-muted-foreground")
    expect(cardContentClassName).toContain("pt-0")
    expect(cardFooterClassName).toContain("gap-[var(--nx-card-gap-md)]")
  })
})
