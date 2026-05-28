import { describe, expect, test } from "vitest"
import {
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
  cardVariants,
} from "../../../src/components/primitives/Card/Card.variants.js"

describe("cardVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = cardVariants()

    expect(className).toContain("rounded-(--lex-card-radius)")
    expect(className).toContain("border-(--lex-card-border-color)")
    expect(className).toContain("bg-(--lex-card-background)")
    expect(className).toContain("text-(--lex-card-foreground)")
  })

  test("defines token-backed slot spacing and text roles", () => {
    expect(cardHeaderClassName).toContain("p-(--lex-card-padding)")
    expect(cardTitleClassName).toContain("text-(--lex-card-title-foreground)")
    expect(cardDescriptionClassName).toContain(
      "text-(--lex-card-description-foreground)",
    )
    expect(cardContentClassName).toContain(
      "pt-(--lex-card-content-padding-top)",
    )
    expect(cardFooterClassName).toContain("gap-(--lex-card-gap-md)")
  })

  test("supports outlined, elevated, and ghost variants", () => {
    expect(cardVariants({ variant: "outlined" })).toContain(
      "border-(--lex-border-strong)",
    )
    expect(cardVariants({ variant: "elevated" })).toContain(
      "shadow-(--lex-elevation-shadow-raised-box-shadow)",
    )
    expect(cardVariants({ variant: "ghost" })).toContain("bg-transparent")
  })
})
