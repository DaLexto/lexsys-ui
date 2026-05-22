import { describe, expect, test } from "vitest"
import { textareaVariants } from "../../../src/components/Textarea/Textarea.variants.js"

describe("textareaVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = textareaVariants()

    expect(className).toContain("rounded-(--nx-textarea-radius)")
    expect(className).toContain("border-(--nx-textarea-border-color)")
    expect(className).toContain("bg-(--nx-textarea-background)")
    expect(className).toContain("min-h-(--nx-textarea-min-height-md)")
  })

  test("includes focus, invalid, disabled, resize, and size classes", () => {
    const className = textareaVariants({
      resize: "none",
      size: "lg",
      variant: "ghost",
    })

    expect(className).toContain(
      "focus-visible:ring-(--nx-textarea-focus-ring-color)",
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain("data-[disabled]:opacity-50")
    expect(className).toContain("resize-none")
    expect(className).toContain("min-h-(--nx-textarea-min-height-lg)")
  })
})
