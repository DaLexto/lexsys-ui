import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../src/components/primitives/Card/Card.js"

describe("Card render", () => {
  it("renders card title and content with custom className", () => {
    render(
      <Card className="custom-card">
        <CardHeader>
          <CardTitle>Project summary</CardTitle>
          <CardDescription>Overview of recent activity.</CardDescription>
        </CardHeader>
        <CardContent>Card body content</CardContent>
      </Card>,
    )

    expect(screen.getByText("Project summary")).toBeInTheDocument()
    expect(screen.getByText("Card body content")).toBeInTheDocument()
    expect(
      screen.getByText("Project summary").closest(".custom-card"),
    ).not.toBeNull()
  })

  it("renders CardAction inside CardHeader", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your preferences.</CardDescription>
          <CardAction>
            <button type="button">Edit</button>
          </CardAction>
        </CardHeader>
      </Card>,
    )

    expect(screen.getByText("Settings")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
  })

  it("renders CardFooter with content", () => {
    render(
      <Card>
        <CardContent>Body</CardContent>
        <CardFooter>
          <button type="button">Save</button>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })
})
