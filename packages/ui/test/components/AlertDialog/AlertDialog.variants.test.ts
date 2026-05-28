import { describe, expect, it } from "vitest"
import {
  alertDialogBackdropVariants,
  alertDialogPopupVariants,
  alertDialogTriggerVariants,
} from "../../../src/components/primitives/AlertDialog/AlertDialog.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("AlertDialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(alertDialogTriggerVariants()).toContain(
      `bg-(--${p}-alert-dialog-trigger-background)`,
    )
    expect(alertDialogPopupVariants()).toContain(
      `bg-(--${p}-alert-dialog-popup-background)`,
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(alertDialogBackdropVariants()).toContain(
      `bg-(--${p}-alert-dialog-backdrop-background)`,
    )
    expect(alertDialogBackdropVariants()).toContain(
      `duration-(--${p}-alert-dialog-transition-duration)`,
    )
  })
})
