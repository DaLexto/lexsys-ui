import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../src/components/primitives/Table/Table.js"

describe("Table render", () => {
  it("renders caption, header, body, and footer", () => {
    render(
      <Table className="custom-table">
        <TableCaption>Team members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alex</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>2 users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )

    expect(screen.getByText("Team members")).toBeInTheDocument()
    expect(screen.getByText("Alex")).toBeInTheDocument()
    expect(screen.getByText("2 users")).toBeInTheDocument()
    expect(screen.getByRole("table").className).toContain("custom-table")
  })
})
