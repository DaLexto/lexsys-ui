import { describe, expect, it } from "vitest"
import {
  dialogBackdropVariants,
  dialogPopupVariants,
  dialogTriggerVariants,
} from "../../../src/components/primitives/Dialog/Dialog.variants"

describe("Dialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(dialogTriggerVariants()).toContain(
      "bg-(--lsys-dialog-trigger-background)",
    )
    expect(dialogPopupVariants()).toContain(
      "bg-(--lsys-dialog-popup-background)",
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(dialogBackdropVariants()).toContain(
      "bg-(--lsys-dialog-backdrop-background)",
    )
    expect(dialogBackdropVariants()).toContain(
      "duration-(--lsys-dialog-transition-duration)",
    )
  })
})
