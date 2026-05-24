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

    expect(className).toContain("rounded-(--lsys-card-radius)")
    expect(className).toContain("border-(--lsys-card-border-color)")
    expect(className).toContain("bg-(--lsys-card-background)")
    expect(className).toContain("text-(--lsys-card-foreground)")
  })

  test("defines token-backed slot spacing and text roles", () => {
    expect(cardHeaderClassName).toContain("p-(--lsys-card-padding)")
    expect(cardTitleClassName).toContain("text-(--lsys-card-title-foreground)")
    expect(cardDescriptionClassName).toContain(
      "text-(--lsys-card-description-foreground)",
    )
    expect(cardContentClassName).toContain(
      "pt-(--lsys-card-content-padding-top)",
    )
    expect(cardFooterClassName).toContain("gap-(--lsys-card-gap-md)")
  })

  test("supports outlined, elevated, and ghost variants", () => {
    expect(cardVariants({ variant: "outlined" })).toContain(
      "border-(--lsys-border-strong)",
    )
    expect(cardVariants({ variant: "elevated" })).toContain(
      "shadow-(--lsys-elevation-shadow-raised-box-shadow)",
    )
    expect(cardVariants({ variant: "ghost" })).toContain("bg-transparent")
  })
})
