import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Card,
  CardContent,
  CardDescription,
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
})
