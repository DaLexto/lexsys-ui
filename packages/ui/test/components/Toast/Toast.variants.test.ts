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
    expect(toastViewportVariants()).toContain("var(--lex-toast-viewport-width)")
    expect(toastVariants()).toContain("data-[type=destructive]")
    expect(toastVariants()).toContain("--lex-toast-danger-background")
    expect(toastVariants()).toContain("data-[type=success]")
    expect(toastVariants()).toContain("--lex-toast-success-background")
    expect(toastVariants()).toContain("data-[type=info]")
    expect(toastVariants()).toContain("--lex-toast-info-background")
    expect(toastViewportVariants()).toContain("--lex-toast-viewport-inset")
    expect(toastVariants()).toContain("var(--toast-swipe-movement-x,0px)")
    expect(toastActionVariants()).toContain(
      "bg-(--lex-toast-action-hover-background)",
    )
  })

  it("maps typed toast descriptions to semantic foreground tokens", () => {
    expect(toastDescriptionVariants()).toContain(
      "data-[type=success]:text-(--lex-toast-success-foreground)",
    )
    expect(toastDescriptionVariants()).toContain(
      "data-[type=info]:text-(--lex-toast-info-foreground)",
    )
    expect(toastDescriptionVariants()).toContain(
      "data-[type=destructive]:text-(--lex-toast-danger-foreground)",
    )
  })
})
