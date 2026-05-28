import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../src/components/blocks/Empty/Empty.js"

describe("Empty render", () => {
  it("renders title and description", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No results</EmptyTitle>
          <EmptyDescription>Try adjusting your search.</EmptyDescription>
        </EmptyHeader>
      </Empty>,
    )

    expect(screen.getByText("No results")).toBeInTheDocument()
    expect(screen.getByText("Try adjusting your search.")).toBeInTheDocument()
  })

  it("renders EmptyMedia slot inside EmptyHeader", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia data-testid="media">
            <svg aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No items</EmptyTitle>
        </EmptyHeader>
      </Empty>,
    )

    expect(screen.getByTestId("media")).toBeInTheDocument()
    expect(screen.getByText("No items")).toBeInTheDocument()
  })

  it("renders EmptyContent with actions", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No API keys</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <button type="button">Create key</button>
        </EmptyContent>
      </Empty>,
    )

    expect(
      screen.getByRole("button", { name: "Create key" }),
    ).toBeInTheDocument()
  })

  it("merges custom className on root", () => {
    const { container } = render(<Empty className="custom-empty" />)
    expect(container.firstChild).toHaveClass("custom-empty")
  })
})
