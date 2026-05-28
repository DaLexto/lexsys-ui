import { describe, expect, test } from "vitest"
import { textareaVariants } from "../../../src/components/primitives/Textarea/Textarea.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("textareaVariants", () => {
  test("uses token-backed classes for base styling", () => {
    const className = textareaVariants()

    expect(className).toContain(`rounded-(--${p}-textarea-radius)`)
    expect(className).toContain(`border-(--${p}-textarea-border-color)`)
    expect(className).toContain(`bg-(--${p}-textarea-background)`)
    expect(className).toContain(`min-h-(--${p}-textarea-min-height-md)`)
  })

  test("includes focus, invalid, disabled, resize, and size classes", () => {
    const className = textareaVariants({
      resize: "none",
      size: "lg",
      variant: "ghost",
    })

    expect(className).toContain(
      `focus-visible:ring-(--${p}-textarea-focus-ring-color)`,
    )
    expect(className).toContain("aria-invalid:border-")
    expect(className).toContain(
      `data-[disabled]:opacity-(--${p}-opacity-disabled)`,
    )
    expect(className).toContain("resize-none")
    expect(className).toContain(`min-h-(--${p}-textarea-min-height-lg)`)
  })
})
