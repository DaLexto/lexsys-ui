import { describe, expect, it } from "vitest"
import {
  dialogBackdropVariants,
  dialogPopupVariants,
  dialogTriggerVariants,
} from "../../../src/components/primitives/Dialog/Dialog.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Dialog variants", () => {
  it("uses token-backed trigger and popup styling", () => {
    expect(dialogTriggerVariants()).toContain(
      `bg-(--${p}-dialog-trigger-background)`,
    )
    expect(dialogPopupVariants()).toContain(
      `bg-(--${p}-dialog-popup-background)`,
    )
  })

  it("uses token-backed backdrop transition styling", () => {
    expect(dialogBackdropVariants()).toContain(
      `bg-(--${p}-dialog-backdrop-background)`,
    )
    expect(dialogBackdropVariants()).toContain(
      `duration-(--${p}-dialog-transition-duration)`,
    )
  })
})
