import { describe, expect, test } from "vitest"
import {
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
  cardVariants,
} from "../../../src/components/primitives/Card/Card.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("cardVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = cardVariants()

    expect(className).toContain(`rounded-(--${p}-card-radius)`)
    expect(className).toContain(`border-(--${p}-card-border-color)`)
    expect(className).toContain(`bg-(--${p}-card-background)`)
    expect(className).toContain(`text-(--${p}-card-foreground)`)
  })

  test("defines token-backed slot spacing and text roles", () => {
    expect(cardHeaderClassName).toContain(`p-(--${p}-card-padding)`)
    expect(cardTitleClassName).toContain(`text-(--${p}-card-title-foreground)`)
    expect(cardDescriptionClassName).toContain(
      `text-(--${p}-card-description-foreground)`,
    )
    expect(cardContentClassName).toContain(
      `pt-(--${p}-card-content-padding-top)`,
    )
    expect(cardFooterClassName).toContain(`gap-(--${p}-card-gap-md)`)
  })

  test("supports outlined, elevated, and ghost variants", () => {
    expect(cardVariants({ variant: "outlined" })).toContain(
      `border-(--${p}-border-strong)`,
    )
    expect(cardVariants({ variant: "elevated" })).toContain(
      `shadow-(--${p}-elevation-shadow-raised-box-shadow)`,
    )
    expect(cardVariants({ variant: "ghost" })).toContain("bg-transparent")
  })
})
