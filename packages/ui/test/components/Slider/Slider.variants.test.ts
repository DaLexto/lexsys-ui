import { describe, expect, it } from "vitest"
import {
  sliderThumbVariants,
  sliderTrackVariants,
} from "../../../src/components/primitives/Slider/Slider.variants.js"

describe("sliderVariants", () => {
  it("styles the track and thumb", () => {
    expect(sliderTrackVariants()).toContain(
      "bg-(--lsys-slider-track-background)",
    )
    expect(sliderThumbVariants()).toContain(
      "border-(--lsys-slider-thumb-border-color)",
    )
  })
})
