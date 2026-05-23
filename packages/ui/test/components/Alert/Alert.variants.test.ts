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
    expect(className).toContain("bg-(--nx-alert-neutral-background)")
    expect(className).toContain("text-(--nx-alert-neutral-foreground)")
    expect(className).toContain("border-(--nx-alert-neutral-border-color)")
  })

  test("maps alert variants and slots through component tokens", () => {
    const className = alertVariants({ variant: "danger" })

    expect(className).toContain("bg-(--nx-alert-danger-background)")
    expect(className).toContain("text-(--nx-alert-danger-foreground)")
    expect(className).toContain("border-(--nx-alert-danger-border-color)")
    expect(alertTitleClassName).toContain("font-(--nx-alert-title-font-weight)")
    expect(alertDescriptionClassName).toContain(
      "text-(--nx-alert-description-foreground)",
    )
  })
})
