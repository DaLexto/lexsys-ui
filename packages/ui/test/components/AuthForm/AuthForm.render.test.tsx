import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { AuthForm } from "../../../src/components/blocks/AuthForm/AuthForm.js"

describe("AuthForm render", () => {
  it("renders login fields and submit button", () => {
    render(<AuthForm mode="login" />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument()
  })

  it("renders register name field", () => {
    render(<AuthForm mode="register" />)

    expect(screen.getByLabelText("Full name")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeInTheDocument()
  })
})
