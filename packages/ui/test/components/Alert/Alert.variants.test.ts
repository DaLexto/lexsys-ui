import { describe, expect, test } from "vitest"
import {
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "../../../src/components/primitives/Alert/Alert.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("alertVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = alertVariants()

    expect(className).toContain(`rounded-(--${p}-alert-radius)`)
    expect(className).toContain(`bg-(--${p}-alert-neutral-background)`)
    expect(className).toContain(`text-(--${p}-alert-neutral-foreground)`)
    expect(className).toContain(`border-(--${p}-alert-neutral-border-color)`)
  })

  test("maps alert variants and slots through component tokens", () => {
    const className = alertVariants({ variant: "danger" })

    expect(className).toContain(`bg-(--${p}-alert-danger-background)`)
    expect(className).toContain(`text-(--${p}-alert-danger-foreground)`)
    expect(className).toContain(`border-(--${p}-alert-danger-border-color)`)
    expect(alertTitleClassName).toContain(
      `font-(--${p}-alert-title-font-weight)`,
    )
    expect(alertDescriptionClassName).toContain(
      `text-(--${p}-alert-description-foreground)`,
    )
  })
})
