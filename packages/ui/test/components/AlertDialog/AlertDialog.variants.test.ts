import { describe, expect, it } from "vitest"
import {
  alertDialogBackdropVariants,
  alertDialogPopupVariants,
  alertDialogTriggerVariants,
} from "../../../src/components/AlertDialog/AlertDialog.variants"

describe("AlertDialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(alertDialogTriggerVariants()).toContain(
      "bg-[var(--nx-alert-dialog-trigger-background)]",
    )
    expect(alertDialogPopupVariants()).toContain(
      "bg-[var(--nx-alert-dialog-popup-background)]",
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(alertDialogBackdropVariants()).toContain(
      "bg-[var(--nx-alert-dialog-backdrop-background)]",
    )
    expect(alertDialogBackdropVariants()).toContain(
      "duration-[var(--nx-alert-dialog-transition-duration)]",
    )
  })
})
