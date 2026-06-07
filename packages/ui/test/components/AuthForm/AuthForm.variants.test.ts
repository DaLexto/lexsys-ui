import { describe, expect, it } from "vitest"
import {
  authFormClasses,
  authFormContentClasses,
  authFormFooterClasses,
} from "../../../src/components/blocks/AuthForm/AuthForm.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("AuthForm variants", () => {
  it("uses auth-form component tokens for content and footer rhythm", () => {
    expect(authFormClasses()).toContain(
      `text-(--${p}-auth-form-root-foreground)`,
    )
    expect(authFormContentClasses()).toContain(
      `gap-(--${p}-auth-form-content-gap)`,
    )
    expect(authFormFooterClasses()).toContain(
      `gap-(--${p}-auth-form-footer-gap)`,
    )
    expect(authFormContentClasses()).not.toContain(`--${p}-space-`)
  })
})
