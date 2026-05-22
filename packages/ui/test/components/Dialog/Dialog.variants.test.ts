import { describe, expect, it } from "vitest"
import {
  dialogBackdropVariants,
  dialogPopupVariants,
  dialogTriggerVariants,
} from "../../../src/components/Dialog/Dialog.variants"

describe("Dialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(dialogTriggerVariants()).toContain(
      "bg-(--nx-dialog-trigger-background)",
    )
    expect(dialogPopupVariants()).toContain("bg-(--nx-dialog-popup-background)")
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(dialogBackdropVariants()).toContain(
      "bg-(--nx-dialog-backdrop-background)",
    )
    expect(dialogBackdropVariants()).toContain(
      "duration-(--nx-dialog-transition-duration)",
    )
  })
})
