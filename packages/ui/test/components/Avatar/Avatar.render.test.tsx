import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Avatar,
  AvatarFallback,
} from "../../../src/components/Avatar/Avatar.js"

describe("Avatar render", () => {
  it("renders fallback initials with custom className", () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    )

    expect(screen.getByText("AB")).toBeInTheDocument()
    expect(screen.getByText("AB").closest(".custom-avatar")).not.toBeNull()
  })
})
