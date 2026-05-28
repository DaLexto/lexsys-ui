import { describe, expect, it } from "vitest"
import {
  toastActionVariants,
  toastDescriptionVariants,
  toastVariants,
  toastViewportVariants,
} from "../../../src/components/primitives/Toast/Toast.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("toastVariants", () => {
  it("includes token-backed placement, status, swipe, and action classes", () => {
    expect(toastViewportVariants({ placement: "top-left" })).toContain(
      "left-0 top-0",
    )
    expect(toastViewportVariants()).toContain(
      `var(--${p}-toast-viewport-width)`,
    )
    expect(toastVariants()).toContain("data-[type=destructive]")
    expect(toastVariants()).toContain(`--${p}-toast-danger-background`)
    expect(toastVariants()).toContain("data-[type=success]")
    expect(toastVariants()).toContain(`--${p}-toast-success-background`)
    expect(toastVariants()).toContain("data-[type=info]")
    expect(toastVariants()).toContain(`--${p}-toast-info-background`)
    expect(toastViewportVariants()).toContain(`--${p}-toast-viewport-inset`)
    expect(toastVariants()).toContain("var(--toast-swipe-movement-x,0px)")
    expect(toastActionVariants()).toContain(
      `bg-(--${p}-toast-action-hover-background)`,
    )
  })

  it("maps typed toast descriptions to semantic foreground tokens", () => {
    expect(toastDescriptionVariants()).toContain(
      `data-[type=success]:text-(--${p}-toast-success-foreground)`,
    )
    expect(toastDescriptionVariants()).toContain(
      `data-[type=info]:text-(--${p}-toast-info-foreground)`,
    )
    expect(toastDescriptionVariants()).toContain(
      `data-[type=destructive]:text-(--${p}-toast-danger-foreground)`,
    )
  })
})
