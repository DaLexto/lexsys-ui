import { describe, expect, it } from "vitest"
import {
  meterIndicatorVariants,
  meterTrackVariants,
  meterVariants,
} from "../../../src/components/primitives/Meter/Meter.variants.js"

describe("meterVariants", () => {
  it("includes token-backed root, track, and indicator classes", () => {
    expect(meterVariants()).toContain("gap-(--lsys-meter-gap)")
    expect(meterTrackVariants({ size: "lg" })).toContain(
      "h-(--lsys-meter-track-height-lg)",
    )
    expect(meterIndicatorVariants()).toContain(
      "data-[complete]:bg-(--lsys-meter-indicator-background-complete)",
    )
  })
})
