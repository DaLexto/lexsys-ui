import { describe, expect, it } from "vitest"
import {
  tooltipArrowVariants,
  tooltipPopupVariants,
} from "../../../src/components/Tooltip/Tooltip.variants.js"

describe("tooltipVariants", () => {
  it("styles popup and arrow", () => {
    expect(tooltipPopupVariants()).toContain("bg-nx-foreground")
    expect(tooltipArrowVariants()).toContain("fill-nx-foreground")
  })
})
