import { describe, expect, it } from "vitest"
import {
  otpFieldInputVariants,
  otpFieldVariants,
} from "../../../src/components/primitives/OtpField/OtpField.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("OtpField variants", () => {
  it("uses token-backed root and input sizing", () => {
    expect(otpFieldVariants()).toContain(`text-(--${p}-field-foreground)`)
    expect(otpFieldInputVariants({ size: "sm" })).toContain(
      `size-(--${p}-input-height-sm)`,
    )
    expect(otpFieldInputVariants({ size: "lg" })).toContain(
      `size-(--${p}-input-height-lg)`,
    )
    expect(otpFieldInputVariants()).toContain(`bg-(--${p}-input-background)`)
  })
})
