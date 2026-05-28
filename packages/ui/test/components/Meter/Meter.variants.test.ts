import { describe, expect, it } from "vitest"
import {
  meterIndicatorVariants,
  meterTrackVariants,
  meterVariants,
} from "../../../src/components/primitives/Meter/Meter.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("meterVariants", () => {
  it("includes token-backed root, track, and indicator classes", () => {
    expect(meterVariants()).toContain(`gap-(--${p}-meter-gap)`)
    expect(meterTrackVariants({ size: "lg" })).toContain(
      `h-(--${p}-meter-track-height-lg)`,
    )
    expect(meterIndicatorVariants()).toContain(
      `data-[complete]:bg-(--${p}-meter-indicator-background-complete)`,
    )
  })
})
