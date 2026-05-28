import { describe, expect, it } from "vitest"
import {
  otpFieldInputVariants,
  otpFieldVariants,
} from "../../../src/components/primitives/OtpField/OtpField.variants.js"

describe("OtpField variants", () => {
  it("uses token-backed root and input sizing", () => {
    expect(otpFieldVariants()).toContain("text-(--lex-field-foreground)")
    expect(otpFieldInputVariants({ size: "sm" })).toContain(
      "size-(--lex-input-height-sm)",
    )
    expect(otpFieldInputVariants({ size: "lg" })).toContain(
      "size-(--lex-input-height-lg)",
    )
    expect(otpFieldInputVariants()).toContain("bg-(--lex-input-background)")
  })
})
