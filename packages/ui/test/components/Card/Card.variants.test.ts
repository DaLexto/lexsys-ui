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

    expect(className).toContain("rounded-(--nx-card-radius)")
    expect(className).toContain("border-(--nx-card-border-color)")
    expect(className).toContain("bg-(--nx-card-background)")
    expect(className).toContain("text-(--nx-card-foreground)")
  })

  test("defines token-backed slot spacing and text roles", () => {
    expect(cardHeaderClassName).toContain("p-(--nx-card-padding)")
    expect(cardTitleClassName).toContain("text-(--nx-card-title-foreground)")
    expect(cardDescriptionClassName).toContain(
      "text-(--nx-card-description-foreground)",
    )
    expect(cardContentClassName).toContain("pt-0")
    expect(cardFooterClassName).toContain("gap-(--nx-card-gap-md)")
  })
})
