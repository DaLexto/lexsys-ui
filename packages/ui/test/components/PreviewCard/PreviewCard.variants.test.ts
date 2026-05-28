import { describe, expect, it } from "vitest"
import {
  previewCardPopupVariants,
  previewCardTriggerVariants,
} from "../../../src/components/primitives/PreviewCard/PreviewCard.variants"

describe("PreviewCard variants", () => {
  it("uses token-backed trigger styling", () => {
    expect(previewCardTriggerVariants()).toContain("inline-flex")
  })

  it("reuses popover popup styling", () => {
    expect(previewCardPopupVariants()).toContain(
      "bg-(--lex-popover-popup-background)",
    )
  })
})
