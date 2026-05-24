import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Switch,
  SwitchThumb,
} from "../../../src/components/primitives/Switch/Switch.js"

describe("Switch render", () => {
  it("renders switch compound with custom className", () => {
    render(
      <Switch
        aria-label="Enable notifications"
        defaultChecked
        className="custom-switch"
      >
        <SwitchThumb />
      </Switch>,
    )

    expect(
      screen.getByRole("switch", { name: "Enable notifications" }),
    ).toHaveClass("custom-switch")
  })
})
