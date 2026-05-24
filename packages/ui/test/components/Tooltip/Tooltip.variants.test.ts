import { describe, expect, it } from "vitest"
import {
  tooltipArrowVariants,
  tooltipPopupVariants,
} from "../../../src/components/primitives/Tooltip/Tooltip.variants.js"

describe("tooltipVariants", () => {
  it("styles popup and arrow", () => {
    expect(tooltipPopupVariants()).toContain("bg-(--lsys-tooltip-background)")
    expect(tooltipArrowVariants()).toContain("fill-(--lsys-tooltip-background)")
  })
})
