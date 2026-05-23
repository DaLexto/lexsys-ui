import { describe, expect, it } from "vitest"
import {
  toastActionVariants,
  toastDescriptionVariants,
  toastVariants,
  toastViewportVariants,
} from "../../../src/components/primitives/Toast/Toast.variants.js"

describe("toastVariants", () => {
  it("includes token-backed placement, status, swipe, and action classes", () => {
    expect(toastViewportVariants({ placement: "top-left" })).toContain(
      "left-0 top-0",
    )
    expect(toastViewportVariants()).toContain("var(--nx-toast-viewport-width)")
    expect(toastVariants()).toContain("data-[type=destructive]")
    expect(toastVariants()).toContain("--nx-toast-danger-background")
    expect(toastVariants()).toContain("data-[type=success]")
    expect(toastVariants()).toContain("--nx-toast-success-background")
    expect(toastVariants()).toContain("data-[type=info]")
    expect(toastVariants()).toContain("--nx-toast-info-background")
    expect(toastViewportVariants()).toContain("--nx-toast-viewport-inset")
    expect(toastVariants()).toContain("var(--toast-swipe-movement-x,0px)")
    expect(toastActionVariants()).toContain(
      "bg-(--nx-toast-action-hover-background)",
    )
  })

  it("maps typed toast descriptions to semantic foreground tokens", () => {
    expect(toastDescriptionVariants()).toContain(
      "data-[type=success]:text-(--nx-toast-success-foreground)",
    )
    expect(toastDescriptionVariants()).toContain(
      "data-[type=info]:text-(--nx-toast-info-foreground)",
    )
    expect(toastDescriptionVariants()).toContain(
      "data-[type=destructive]:text-(--nx-toast-danger-foreground)",
    )
  })
})
