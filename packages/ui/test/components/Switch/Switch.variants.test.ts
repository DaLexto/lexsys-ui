import { describe, expect, it } from "vitest"
import {
  switchThumbVariants,
  switchVariants,
} from "../../../src/components/Switch/Switch.variants.js"

describe("switchVariants", () => {
  it("includes Neurex switch states", () => {
    expect(switchVariants({ size: "md" })).toContain(
      "data-[checked]:bg-[var(--nx-switch-checked-background)]",
    )
    expect(switchThumbVariants({ size: "md" })).toContain(
      "data-[checked]:translate-x-[var(--nx-switch-thumb-translate-md)]",
    )
  })
})
