import { describe, expect, it } from "vitest"
import {
  meterIndicatorVariants,
  meterTrackVariants,
  meterVariants,
} from "../../../src/components/Meter/Meter.variants.js"

describe("meterVariants", () => {
  it("includes token-backed root, track, and indicator classes", () => {
    expect(meterVariants()).toContain("gap-[var(--nx-meter-gap)]")
    expect(meterTrackVariants({ size: "lg" })).toContain(
      "h-[var(--nx-meter-track-height-lg)]",
    )
    expect(meterIndicatorVariants()).toContain(
      "data-[complete]:bg-[var(--nx-meter-indicator-background-complete)]",
    )
  })
})
