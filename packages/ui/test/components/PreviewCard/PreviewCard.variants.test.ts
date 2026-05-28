import { describe, expect, it } from "vitest"
import {
  previewCardPopupVariants,
  previewCardTriggerVariants,
} from "../../../src/components/primitives/PreviewCard/PreviewCard.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("PreviewCard variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(previewCardTriggerVariants()).toContain("inline-flex")
  })

  it("reuses popover popup styling", () => {
    expect(previewCardPopupVariants()).toContain(
      `bg-(--${p}-popover-popup-background)`,
    )
  })
})
