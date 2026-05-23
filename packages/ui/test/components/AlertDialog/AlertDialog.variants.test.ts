import { describe, expect, it } from "vitest"
import {
  alertDialogBackdropVariants,
  alertDialogPopupVariants,
  alertDialogTriggerVariants,
} from "../../../src/components/primitives/AlertDialog/AlertDialog.variants"

describe("AlertDialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(alertDialogTriggerVariants()).toContain(
      "bg-(--nx-alert-dialog-trigger-background)",
    )
    expect(alertDialogPopupVariants()).toContain(
      "bg-(--nx-alert-dialog-popup-background)",
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(alertDialogBackdropVariants()).toContain(
      "bg-(--nx-alert-dialog-backdrop-background)",
    )
    expect(alertDialogBackdropVariants()).toContain(
      "duration-(--nx-alert-dialog-transition-duration)",
    )
  })
})
