import { describe, expect, it } from "vitest"
import { checkboxGroupVariants } from "../../../src/components/primitives/CheckboxGroup/CheckboxGroup.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("CheckboxGroup variants", () => {
  it("uses checkbox and field token-backed layout", () => {
    expect(checkboxGroupVariants({ orientation: "vertical" })).toContain(
      `gap-(--${p}-checkbox-label-gap)`,
    )
    expect(checkboxGroupVariants({ orientation: "horizontal" })).toContain(
      "grid-flow-col",
    )
    expect(checkboxGroupVariants()).toContain(
      `text-(--${p}-checkbox-label-foreground)`,
    )
  })
})
