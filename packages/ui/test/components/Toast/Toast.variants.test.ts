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
    expect(toastViewportVariants()).toContain(
      "var(--lsys-toast-viewport-width)",
    )
    expect(toastVariants()).toContain("data-[type=destructive]")
    expect(toastVariants()).toContain("--lsys-toast-danger-background")
    expect(toastVariants()).toContain("data-[type=success]")
    expect(toastVariants()).toContain("--lsys-toast-success-background")
    expect(toastVariants()).toContain("data-[type=info]")
    expect(toastVariants()).toContain("--lsys-toast-info-background")
    expect(toastViewportVariants()).toContain("--lsys-toast-viewport-inset")
    expect(toastVariants()).toContain("var(--toast-swipe-movement-x,0px)")
    expect(toastActionVariants()).toContain(
      "bg-(--lsys-toast-action-hover-background)",
    )
  })

  it("maps typed toast descriptions to semantic foreground tokens", () => {
    expect(toastDescriptionVariants()).toContain(
      "data-[type=success]:text-(--lsys-toast-success-foreground)",
    )
    expect(toastDescriptionVariants()).toContain(
      "data-[type=info]:text-(--lsys-toast-info-foreground)",
    )
    expect(toastDescriptionVariants()).toContain(
      "data-[type=destructive]:text-(--lsys-toast-danger-foreground)",
    )
  })
})
