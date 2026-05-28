import { describe, expect, it } from "vitest"
import { checkboxVariants } from "../../../src/components/primitives/Checkbox/Checkbox.variants.js"

describe("checkboxVariants", () => {
  it("includes Lexsys checkbox states", () => {
    const className = checkboxVariants({ size: "md" })

    expect(className).toContain(
      "data-[checked]:bg-(--lex-checkbox-checked-background)",
    )
    expect(className).toContain(
      "data-[focused]:ring-(--lex-checkbox-focus-ring-color)",
    )
    expect(className).toContain("size-(--lex-checkbox-size-md)")
  })
})
