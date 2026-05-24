/**
 * AuthForm.types.ts
 *
 * Public types for the AuthForm block.
 */

import type { FormEventHandler, ReactNode, Ref } from "react"
import type { CardProps } from "../../primitives/Card/Card.types"
import type { ButtonProps } from "../../primitives/Button/Button.types"
import type {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
} from "../../primitives/Card/Card.types"

export interface AuthFormProps extends Omit<
  CardProps,
  "children" | "ref" | "onSubmit"
> {
  ref?: Ref<HTMLFormElement>
  className?: CardProps["className"]
  onSubmit?: FormEventHandler<HTMLFormElement>
  children?: ReactNode
}

export type AuthFormHeaderProps = CardHeaderProps

export type AuthFormContentProps = CardContentProps

export type AuthFormFooterProps = CardFooterProps

export interface AuthFormSubmitProps extends Omit<ButtonProps, "type"> {
  isLoading?: boolean
}
