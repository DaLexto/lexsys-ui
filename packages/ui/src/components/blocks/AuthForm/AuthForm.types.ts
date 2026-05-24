/**
 * AuthForm.types.ts
 *
 * Public types for the AuthForm block.
 */

import type { FormEventHandler, ReactNode, Ref } from "react"

export type AuthFormMode = "login" | "register"

export interface AuthFormSubmitData {
  email: string
  password: string
  name?: string
}

export interface AuthFormProps {
  ref?: Ref<HTMLFormElement>
  mode?: AuthFormMode
  title?: string
  description?: string
  submitLabel?: string
  isLoading?: boolean
  footer?: ReactNode
  className?: string
  onSubmit?: (data: AuthFormSubmitData) => void
  onSubmitNative?: FormEventHandler<HTMLFormElement>
}
