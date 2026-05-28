import { describe, expect, it } from "vitest"
import {
  tooltipArrowVariants,
  tooltipPopupVariants,
} from "../../../src/components/primitives/Tooltip/Tooltip.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("tooltipVariants", () => {
  it("styles popup and arrow", () => {
    expect(tooltipPopupVariants()).toContain(`bg-(--${p}-tooltip-background)`)
    expect(tooltipArrowVariants()).toContain(`fill-(--${p}-tooltip-background)`)
  })
})
