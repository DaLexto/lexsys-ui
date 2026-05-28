/**
 * AuthForm.tsx
 *
 * Reference AuthForm block — compound Card form shell for auth screens.
 */

import type { FormEvent } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../primitives/Card/Card"
import { Button } from "../../primitives/Button/Button"
import type {
  AuthFormContentProps,
  AuthFormFooterProps,
  AuthFormHeaderProps,
  AuthFormProps,
  AuthFormSubmitProps,
} from "./AuthForm.types"
import { authFormFieldsClassName, authFormClasses } from "./AuthForm.variants"
import { cn } from "../../../utils/cn"

const AuthForm = ({
  ref,
  className,
  onSubmit,
  children,
  ...cardProps
}: AuthFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(event)
  }

  return (
    <Card className={cn(authFormClasses(), className)} {...cardProps}>
      <form ref={ref} onSubmit={handleSubmit}>
        {children}
      </form>
    </Card>
  )
}

AuthForm.displayName = "AuthForm"

const AuthFormHeader = ({ ref, className, ...props }: AuthFormHeaderProps) => {
  return <CardHeader ref={ref} className={className} {...props} />
}

AuthFormHeader.displayName = "AuthFormHeader"

const AuthFormContent = ({
  ref,
  className,
  ...props
}: AuthFormContentProps) => {
  return (
    <CardContent
      ref={ref}
      className={cn(authFormFieldsClassName, className)}
      {...props}
    />
  )
}

AuthFormContent.displayName = "AuthFormContent"

const AuthFormFooter = ({ ref, className, ...props }: AuthFormFooterProps) => {
  return (
    <CardFooter
      ref={ref}
      className={cn("flex-col gap-(--lsys-space-3)", className)}
      {...props}
    />
  )
}

AuthFormFooter.displayName = "AuthFormFooter"

const AuthFormSubmit = ({
  isLoading = false,
  disabled,
  children = "Submit",
  ...props
}: AuthFormSubmitProps) => {
  return (
    <Button
      type="submit"
      className="w-full"
      isLoading={isLoading}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  )
}

AuthFormSubmit.displayName = "AuthFormSubmit"

export {
  AuthForm,
  AuthFormHeader,
  AuthFormContent,
  AuthFormFooter,
  AuthFormSubmit,
}
