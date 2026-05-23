import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "../../../src/components/Tabs/Tabs.js"

describe("Tabs render", () => {
  it("renders tab list and active panel", () => {
    render(
      <Tabs defaultValue="one" className="custom-tabs">
        <TabsList>
          <TabsTab value="one">One</TabsTab>
          <TabsTab value="two">Two</TabsTab>
        </TabsList>
        <TabsPanel value="one">Panel one</TabsPanel>
        <TabsPanel value="two">Panel two</TabsPanel>
      </Tabs>,
    )

    expect(screen.getByRole("tab", { name: "One" })).toBeInTheDocument()
    expect(screen.getByText("Panel one")).toBeVisible()
  })
})
