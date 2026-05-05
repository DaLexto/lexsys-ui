import { describe, expect, it } from "vitest"
import {
  progressIndicatorVariants,
  progressTrackVariants,
} from "../../../src/components/Progress/Progress.variants.js"

describe("progressVariants", () => {
  it("styles track sizes and indeterminate state", () => {
    expect(progressTrackVariants({ size: "lg" })).toContain("h-3")
    expect(progressIndicatorVariants()).toContain(
      "data-[indeterminate]:animate-pulse",
    )
  })
})
