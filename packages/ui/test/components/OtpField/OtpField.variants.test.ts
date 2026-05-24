import { describe, expect, it } from "vitest"
import {
  otpFieldInputVariants,
  otpFieldVariants,
} from "../../../src/components/primitives/OtpField/OtpField.variants.js"

describe("OtpField variants", () => {
  it("uses token-backed root and input sizing", () => {
    expect(otpFieldVariants()).toContain("text-(--lsys-field-foreground)")
    expect(otpFieldInputVariants({ size: "sm" })).toContain(
      "size-(--lsys-input-height-sm)",
    )
    expect(otpFieldInputVariants({ size: "lg" })).toContain(
      "size-(--lsys-input-height-lg)",
    )
    expect(otpFieldInputVariants()).toContain("bg-(--lsys-input-background)")
  })
})
