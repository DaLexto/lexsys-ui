import { describe, expect, test } from "vitest"
import {
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "../../../src/components/primitives/Alert/Alert.variants.js"

describe("alertVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = alertVariants()

    expect(className).toContain("rounded-(--lex-alert-radius)")
    expect(className).toContain("bg-(--lex-alert-neutral-background)")
    expect(className).toContain("text-(--lex-alert-neutral-foreground)")
    expect(className).toContain("border-(--lex-alert-neutral-border-color)")
  })

  test("maps alert variants and slots through component tokens", () => {
    const className = alertVariants({ variant: "danger" })

    expect(className).toContain("bg-(--lex-alert-danger-background)")
    expect(className).toContain("text-(--lex-alert-danger-foreground)")
    expect(className).toContain("border-(--lex-alert-danger-border-color)")
    expect(alertTitleClassName).toContain(
      "font-(--lex-alert-title-font-weight)",
    )
    expect(alertDescriptionClassName).toContain(
      "text-(--lex-alert-description-foreground)",
    )
  })
})
