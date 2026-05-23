import { describe, expect, it } from "vitest"
import {
  toastActionVariants,
  toastVariants,
  toastViewportVariants,
} from "../../../src/components/Toast/Toast.variants.js"

describe("toastVariants", () => {
  it("includes token-backed placement, status, swipe, and action classes", () => {
    expect(toastViewportVariants({ placement: "top-left" })).toContain(
      "left-0 top-0",
    )
    expect(toastViewportVariants()).toContain("var(--nx-toast-viewport-width)")
    expect(toastVariants()).toContain("data-[type=destructive]")
    expect(toastVariants()).toContain("var(--toast-swipe-movement-x,0px)")
    expect(toastActionVariants()).toContain(
      "bg-(--nx-toast-action-hover-background)",
    )
  })
})
