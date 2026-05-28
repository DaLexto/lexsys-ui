import { describe, expect, it } from "vitest"
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "../../../src/components/primitives/Avatar/Avatar.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("avatarVariants", () => {
  it("includes token-backed size, shape, image, and fallback classes", () => {
    expect(avatarVariants({ size: "lg", shape: "square" })).toContain(
      `size-(--${p}-avatar-size-lg)`,
    )
    expect(avatarVariants({ shape: "square" })).toContain(
      `rounded-(--${p}-avatar-radius-square)`,
    )
    expect(avatarImageVariants()).toContain("object-cover")
    expect(avatarFallbackVariants()).toContain(
      `bg-(--${p}-avatar-fallback-background)`,
    )
  })
})
