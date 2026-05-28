import { describe, expect, it } from "vitest"
import { checkboxVariants } from "../../../src/components/primitives/Checkbox/Checkbox.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("checkboxVariants", () => {
  it("includes Lexsys checkbox states", () => {
    const className = checkboxVariants({ size: "md" })

    expect(className).toContain(
      `data-[checked]:bg-(--${p}-checkbox-checked-background)`,
    )
    expect(className).toContain(
      `data-[focused]:ring-(--${p}-checkbox-focus-ring-color)`,
    )
    expect(className).toContain(`size-(--${p}-checkbox-size-md)`)
  })
})
