import { describe, expect, it } from "vitest"
import {
  sliderThumbVariants,
  sliderTrackVariants,
} from "../../../src/components/Slider/Slider.variants.js"

describe("sliderVariants", () => {
  it("styles the track and thumb", () => {
    expect(sliderTrackVariants()).toContain(
      "bg-[var(--nx-slider-track-background)]",
    )
    expect(sliderThumbVariants()).toContain(
      "border-[var(--nx-slider-thumb-border-color)]",
    )
  })
})
