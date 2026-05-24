import { describe, expect, it } from "vitest"
import {
  otpFieldInputVariants,
  otpFieldVariants,
} from "../../../src/components/primitives/OtpField/OtpField.variants.js"

describe("OtpField variants", () => {
  it("uses token-backed root and input sizing", () => {
    expect(otpFieldVariants()).toContain("text-(--nx-field-foreground)")
    expect(otpFieldInputVariants({ size: "sm" })).toContain(
      "size-(--nx-input-height-sm)",
    )
    expect(otpFieldInputVariants({ size: "lg" })).toContain(
      "size-(--nx-input-height-lg)",
    )
    expect(otpFieldInputVariants()).toContain("bg-(--nx-input-background)")
  })
})
