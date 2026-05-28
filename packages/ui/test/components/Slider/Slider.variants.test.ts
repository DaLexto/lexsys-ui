import { describe, expect, it } from "vitest"
import {
  sliderThumbClasses,
  sliderTrackClasses,
} from "../../../src/components/primitives/Slider/Slider.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("sliderVariants", () => {
  it("styles the track and thumb", () => {
    expect(sliderTrackClasses).toContain(`bg-(--${p}-slider-track-background)`)
    expect(sliderThumbClasses).toContain(
      `border-(--${p}-slider-thumb-border-color)`,
    )
  })
})
