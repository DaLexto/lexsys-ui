import { describe, expect, it } from "vitest"
import {
  radioGroupItemVariants,
  radioGroupVariants,
} from "../../../src/components/RadioGroup/RadioGroup.variants.js"

describe("radioGroupVariants", () => {
  it("styles group direction and item checked state", () => {
    expect(radioGroupVariants({ orientation: "horizontal" })).toContain(
      "grid-flow-col",
    )
    expect(radioGroupItemVariants({ size: "md" })).toContain(
      "data-[checked]:border-nx-primary",
    )
  })
})
