import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  AuthForm,
  AuthFormContent,
  AuthFormFooter,
  AuthFormHeader,
  AuthFormSubmit,
} from "../../../src/components/blocks/AuthForm/AuthForm.js"
import {
  FormField,
  FormFieldControl,
  FormFieldItem,
  FormFieldLabel,
} from "../../../src/components/blocks/FormField/FormField.js"
import { CardDescription, CardTitle } from "../../../src/components/primitives/Card/Card.js"

describe("AuthForm render", () => {
  it("renders compound auth shell with fields and submit", () => {
    render(
      <AuthForm>
        <AuthFormHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </AuthFormHeader>
        <AuthFormContent>
          <FormField>
            <FormFieldItem>
              <FormFieldLabel>Email</FormFieldLabel>
              <FormFieldControl type="email" autoComplete="email" />
            </FormFieldItem>
          </FormField>
          <FormField>
            <FormFieldItem>
              <FormFieldLabel>Password</FormFieldLabel>
              <FormFieldControl type="password" autoComplete="current-password" />
            </FormFieldItem>
          </FormField>
        </AuthFormContent>
        <AuthFormFooter>
          <AuthFormSubmit>Sign in</AuthFormSubmit>
        </AuthFormFooter>
      </AuthForm>,
    )

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument()
  })
})
