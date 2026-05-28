import { describe, expect, it } from "vitest"
import {
  radioGroupItemVariants,
  radioGroupVariants,
} from "../../../src/components/primitives/RadioGroup/RadioGroup.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("radioGroupVariants", () => {
  it("styles group direction and item checked state", () => {
    expect(radioGroupVariants({ orientation: "horizontal" })).toContain(
      "grid-flow-col",
    )
    expect(radioGroupItemVariants({ size: "md" })).toContain(
      `data-[checked]:border-(--${p}-radio-group-item-checked-border-color)`,
    )
  })
})
