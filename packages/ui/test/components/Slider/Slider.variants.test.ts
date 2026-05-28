import { describe, expect, it } from "vitest"
import {
  sliderThumbClasses,
  sliderTrackClasses,
} from "../../../src/components/primitives/Slider/Slider.variants.js"

describe("sliderVariants", () => {
  it("styles the track and thumb", () => {
    expect(sliderTrackClasses).toContain("bg-(--lex-slider-track-background)")
    expect(sliderThumbClasses).toContain(
      "border-(--lex-slider-thumb-border-color)",
    )
  })
})
