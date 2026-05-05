import { describe, expect, it } from "vitest"
import {
  sliderThumbVariants,
  sliderTrackVariants,
} from "../../../src/components/Slider/Slider.variants.js"

describe("sliderVariants", () => {
  it("styles the track and thumb", () => {
    expect(sliderTrackVariants()).toContain("bg-nx-muted")
    expect(sliderThumbVariants()).toContain("border-nx-primary")
  })
})
