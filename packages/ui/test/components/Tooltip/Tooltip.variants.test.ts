import { describe, expect, it } from "vitest"
import {
  tooltipArrowVariants,
  tooltipPopupVariants,
} from "../../../src/components/Tooltip/Tooltip.variants.js"

describe("tooltipVariants", () => {
  it("styles popup and arrow", () => {
    expect(tooltipPopupVariants()).toContain(
      "bg-[var(--nx-tooltip-background)]",
    )
    expect(tooltipArrowVariants()).toContain(
      "fill-[var(--nx-tooltip-background)]",
    )
  })
})
