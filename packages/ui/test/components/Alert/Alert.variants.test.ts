import { describe, expect, test } from "vitest"
import {
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "../../../src/components/Alert/Alert.variants.js"

describe("alertVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = alertVariants()

    expect(className).toContain("rounded-[var(--nx-alert-radius)]")
    expect(className).toContain("bg-[var(--nx-alert-background)]")
    expect(className).toContain("text-[var(--nx-alert-foreground)]")
    expect(className).toContain("border-[var(--nx-alert-border-color)]")
  })

  test("maps alert tones and slots through component tokens", () => {
    const className = alertVariants({ tone: "destructive" })

    expect(className).toContain(
      "[--nx-alert-background:var(--nx-alert-destructive-background)]",
    )
    expect(className).toContain(
      "[--nx-alert-foreground:var(--nx-alert-destructive-foreground)]",
    )
    expect(alertTitleClassName).toContain("font-semibold")
    expect(alertDescriptionClassName).toContain(
      "text-[var(--nx-alert-foreground)]/80",
    )
  })
})
