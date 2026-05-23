import { describe, expect, it } from "vitest"
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "../../../src/components/Avatar/Avatar.variants.js"

describe("avatarVariants", () => {
  it("includes token-backed size, shape, image, and fallback classes", () => {
    expect(avatarVariants({ size: "lg", shape: "square" })).toContain(
      "size-(--nx-avatar-size-lg)",
    )
    expect(avatarVariants({ shape: "square" })).toContain(
      "rounded-(--nx-avatar-radius-square)",
    )
    expect(avatarImageVariants()).toContain("object-cover")
    expect(avatarFallbackVariants()).toContain(
      "bg-(--nx-avatar-fallback-background)",
    )
  })
})
