import { describe, expect, test } from "vitest"
import { textareaVariants } from "../../../src/components/primitives/Textarea/Textarea.variants.js"

describe("textareaVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = textareaVariants()

    expect(className).toContain("rounded-(--lex-textarea-radius)")
    expect(className).toContain("border-(--lex-textarea-border-color)")
    expect(className).toContain("bg-(--lex-textarea-background)")
    expect(className).toContain("min-h-(--lex-textarea-min-height-md)")
  })

  test("includes focus, invalid, disabled, resize, and size classes", () => {
    const className = textareaVariants({
      resize: "none",
      size: "lg",
      variant: "ghost",
    })

    expect(className).toContain(
      "focus-visible:ring-(--lex-textarea-focus-ring-color)",
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain(
      "data-[disabled]:opacity-(--lex-opacity-disabled)",
    )
    expect(className).toContain("resize-none")
    expect(className).toContain("min-h-(--lex-textarea-min-height-lg)")
  })
})
