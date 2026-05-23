import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Separator } from "../../../src/components/Separator/Separator.js"

describe("Separator render", () => {
  it("renders separator with custom className", () => {
    render(<Separator className="custom-separator" />)

    expect(screen.getByRole("separator")).toHaveClass("custom-separator")
  })
})
