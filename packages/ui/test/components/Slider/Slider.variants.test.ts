import { describe, expect, it } from "vitest"
import {
  sliderThumbClasses,
  sliderTrackClasses,
} from "../../../src/components/primitives/Slider/Slider.variants.js"

describe("sliderVariants", () => {
  it("styles the track and thumb", () => {
    expect(sliderTrackClasses).toContain("bg-(--lsys-slider-track-background)")
    expect(sliderThumbClasses).toContain(
      "border-(--lsys-slider-thumb-border-color)",
    )
  })
})
