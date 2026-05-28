import { describe, expect, it } from "vitest"
import {
  switchThumbVariants,
  switchVariants,
} from "../../../src/components/primitives/Switch/Switch.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("switchVariants", () => {
  it("includes Lexsys switch states", () => {
    expect(switchVariants({ size: "md" })).toContain(
      `data-[checked]:bg-(--${p}-switch-checked-background)`,
    )
    expect(switchThumbVariants({ size: "md" })).toContain(
      `data-[checked]:translate-x-(--${p}-switch-thumb-translate-md)`,
    )
  })
})
