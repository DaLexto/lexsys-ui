import { describe, expect, it } from "vitest"
import {
  alertDialogBackdropVariants,
  alertDialogPopupVariants,
  alertDialogTriggerVariants,
} from "../../../src/components/primitives/AlertDialog/AlertDialog.variants"

describe("AlertDialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(alertDialogTriggerVariants()).toContain(
      "bg-(--lsys-alert-dialog-trigger-background)",
    )
    expect(alertDialogPopupVariants()).toContain(
      "bg-(--lsys-alert-dialog-popup-background)",
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(alertDialogBackdropVariants()).toContain(
      "bg-(--lsys-alert-dialog-backdrop-background)",
    )
    expect(alertDialogBackdropVariants()).toContain(
      "duration-(--lsys-alert-dialog-transition-duration)",
    )
  })
})
