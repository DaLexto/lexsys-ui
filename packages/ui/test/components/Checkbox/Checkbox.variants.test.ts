import { describe, expect, it } from "vitest"
import { checkboxVariants } from "../../../src/components/Checkbox/Checkbox.variants.js"

describe("checkboxVariants", () => {
  it("includes Neurex checkbox states", () => {
    const className = checkboxVariants({ size: "md" })

    expect(className).toContain("data-[checked]:bg-nx-primary")
    expect(className).toContain("data-[focused]:ring-nx-ring")
    expect(className).toContain("size-4")
  })
})
