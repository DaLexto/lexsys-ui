import { describe, expect, it } from "vitest"
import {
  progressIndicatorVariants,
  progressTrackVariants,
} from "../../../src/components/primitives/Progress/Progress.variants.js"

describe("progressVariants", () => {
  it("styles track sizes and indeterminate state", () => {
    expect(progressTrackVariants({ size: "lg" })).toContain(
      "h-(--lsys-progress-track-height-lg)",
    )
    expect(progressIndicatorVariants()).toContain(
      "data-[indeterminate]:animate-pulse",
    )
  })
})
