import { describe, expect, it } from "vitest"
import { checkboxVariants } from "../../../src/components/Checkbox/Checkbox.variants.js"

describe("checkboxVariants", () => {
  it("includes Neurex checkbox states", () => {
    const className = checkboxVariants({ size: "md" })

    expect(className).toContain(
      "data-[checked]:bg-[var(--nx-checkbox-checked-background)]",
    )
    expect(className).toContain(
      "data-[focused]:ring-[var(--nx-checkbox-focus-ring-color)]",
    )
    expect(className).toContain("size-[var(--nx-checkbox-size-md)]")
  })
})
