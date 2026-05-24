import { describe, expect, test } from "vitest"
import {
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "../../../src/components/primitives/Alert/Alert.variants.js"

describe("alertVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = alertVariants()

    expect(className).toContain("rounded-(--lsys-alert-radius)")
    expect(className).toContain("bg-(--lsys-alert-neutral-background)")
    expect(className).toContain("text-(--lsys-alert-neutral-foreground)")
    expect(className).toContain("border-(--lsys-alert-neutral-border-color)")
  })

  test("maps alert variants and slots through component tokens", () => {
    const className = alertVariants({ variant: "danger" })

    expect(className).toContain("bg-(--lsys-alert-danger-background)")
    expect(className).toContain("text-(--lsys-alert-danger-foreground)")
    expect(className).toContain("border-(--lsys-alert-danger-border-color)")
    expect(alertTitleClassName).toContain(
      "font-(--lsys-alert-title-font-weight)",
    )
    expect(alertDescriptionClassName).toContain(
      "text-(--lsys-alert-description-foreground)",
    )
  })
})
