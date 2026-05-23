import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "../../../src/components/Accordion/Accordion.js"

describe("Accordion render", () => {
  it("renders trigger and panel when defaultOpen", () => {
    render(
      <Accordion defaultValue={["details"]} className="custom-accordion">
        <AccordionItem value="details">
          <AccordionHeader>
            <AccordionTrigger>Details</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>Accordion panel body</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    expect(screen.getByRole("button", { name: /Details/ })).toBeInTheDocument()
    expect(screen.getByText("Accordion panel body")).toBeVisible()
  })
})
