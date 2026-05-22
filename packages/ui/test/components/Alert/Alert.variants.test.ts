import { describe, expect, test } from "vitest"
import {
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "../../../src/components/Alert/Alert.variants.js"

describe("alertVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = alertVariants()

    expect(className).toContain("rounded-(--nx-alert-radius)")
    expect(className).toContain("bg-(--nx-alert-background)")
    expect(className).toContain("text-(--nx-alert-foreground)")
    expect(className).toContain("border-(--nx-alert-border-color)")
  })

  test("maps alert tones and slots through component tokens", () => {
    const className = alertVariants({ tone: "destructive" })

    expect(className).toContain(
      "(--nx-alert-background:--nx-alert-destructive-background)",
    )
    expect(className).toContain(
      "(--nx-alert-foreground:--nx-alert-destructive-foreground)",
    )
    expect(alertTitleClassName).toContain("font-(--nx-alert-title-font-weight)")
    expect(alertDescriptionClassName).toContain(
      "text-(--nx-alert-description-foreground)",
    )
  })
})
