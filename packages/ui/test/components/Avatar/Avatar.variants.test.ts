import { describe, expect, it } from "vitest"
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "../../../src/components/Avatar/Avatar.variants.js"

describe("avatarVariants", () => {
  it("includes token-backed size, shape, image, and fallback classes", () => {
    expect(avatarVariants({ size: "lg", shape: "square" })).toContain(
      "size-[var(--nx-avatar-size-lg)]",
    )
    expect(avatarVariants({ shape: "square" })).toContain(
      "rounded-[var(--nx-avatar-radius-square)]",
    )
    expect(avatarImageVariants()).toContain("object-cover")
    expect(avatarFallbackVariants()).toContain(
      "bg-[var(--nx-avatar-fallback-background)]",
    )
  })
})
