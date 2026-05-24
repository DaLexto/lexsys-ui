/**
 * AuthForm.tsx
 *
 * Reference AuthForm block — composes Card, Input, Button, and Separator primitives.
 */

import { useState, type FormEvent } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../primitives/Card/Card"
import { Input } from "../../primitives/Input/Input"
import { Button } from "../../primitives/Button/Button"
import { Separator } from "../../primitives/Separator/Separator"
import type { AuthFormProps } from "./AuthForm.types"
import {
  authFormFieldClassName,
  authFormFieldsClassName,
  authFormLabelClassName,
  authFormVariants,
} from "./AuthForm.variants"
import { cn } from "../../../utils/cn"

const defaultCopy = {
  login: {
    title: "Sign in",
    description: "Enter your credentials to access your account.",
    submitLabel: "Sign in",
  },
  register: {
    title: "Create account",
    description: "Start your workspace with a new account.",
    submitLabel: "Create account",
  },
} as const

const AuthForm = ({
  ref,
  mode = "login",
  title,
  description,
  submitLabel,
  isLoading = false,
  footer,
  className,
  onSubmit,
  onSubmitNative,
}: AuthFormProps) => {
  const copy = defaultCopy[mode]
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmitNative?.(event)
    if (event.defaultPrevented) return

    event.preventDefault()
    onSubmit?.({
      email,
      password,
      ...(mode === "register" ? { name } : {}),
    })
  }

  return (
    <Card className={cn(authFormVariants(), className)}>
      <form ref={ref} onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{title ?? copy.title}</CardTitle>
          <CardDescription>{description ?? copy.description}</CardDescription>
        </CardHeader>

        <CardContent className={authFormFieldsClassName}>
          {mode === "register" ? (
            <div className={authFormFieldClassName}>
              <label
                className={authFormLabelClassName}
                htmlFor="auth-form-name"
              >
                Full name
              </label>
              <Input
                id="auth-form-name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          ) : null}

          <div className={authFormFieldClassName}>
            <label className={authFormLabelClassName} htmlFor="auth-form-email">
              Email
            </label>
            <Input
              id="auth-form-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={authFormFieldClassName}>
            <label
              className={authFormLabelClassName}
              htmlFor="auth-form-password"
            >
              Password
            </label>
            <Input
              id="auth-form-password"
              type="password"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-(--lsys-space-3)">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            {submitLabel ?? copy.submitLabel}
          </Button>
          {footer ? (
            <>
              <Separator />
              {footer}
            </>
          ) : null}
        </CardFooter>
      </form>
    </Card>
  )
}

AuthForm.displayName = "AuthForm"

export { AuthForm }
