import { describe, expect, it } from "vitest"
import {
  dialogBackdropVariants,
  dialogPopupVariants,
  dialogTriggerVariants,
} from "../../../src/components/primitives/Dialog/Dialog.variants"

describe("Dialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(dialogTriggerVariants()).toContain(
      "bg-(--lex-dialog-trigger-background)",
    )
    expect(dialogPopupVariants()).toContain(
      "bg-(--lex-dialog-popup-background)",
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(dialogBackdropVariants()).toContain(
      "bg-(--lex-dialog-backdrop-background)",
    )
    expect(dialogBackdropVariants()).toContain(
      "duration-(--lex-dialog-transition-duration)",
    )
  })
})
