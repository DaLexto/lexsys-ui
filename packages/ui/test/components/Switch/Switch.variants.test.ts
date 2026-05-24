import { describe, expect, it } from "vitest"
import {
  switchThumbVariants,
  switchVariants,
} from "../../../src/components/primitives/Switch/Switch.variants.js"

describe("switchVariants", () => {
  it("includes Lexsys switch states", () => {
    expect(switchVariants({ size: "md" })).toContain(
      "data-[checked]:bg-(--lsys-switch-checked-background)",
    )
    expect(switchThumbVariants({ size: "md" })).toContain(
      "data-[checked]:translate-x-(--lsys-switch-thumb-translate-md)",
    )
  })
})
