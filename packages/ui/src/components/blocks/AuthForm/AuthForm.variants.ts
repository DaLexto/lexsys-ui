/**
 * AuthForm.variants.ts
 *
 * Variant classes for the AuthForm block.
 */

export const authFormClasses = (): string => {
  return "lex-auth-form w-full text-(--lex-auth-form-root-foreground)"
}

export const authFormContentClasses = (): string => {
  return "flex flex-col gap-(--lex-auth-form-content-gap)"
}

export const authFormFooterClasses = (): string => {
  return "flex-col gap-(--lex-auth-form-footer-gap)"
}
