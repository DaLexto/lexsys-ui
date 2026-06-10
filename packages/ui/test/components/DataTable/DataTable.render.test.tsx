import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTablePagination,
  DataTablePaginationBar,
  DataTablePaginationContent,
  DataTablePaginationItem,
  DataTablePaginationLink,
  DataTablePaginationNext,
  DataTablePaginationPrevious,
  DataTableRow,
  DataTableTable,
} from "../../../src/components/blocks/DataTable/DataTable.js";

describe("DataTable render", () => {
  it("renders table rows and pagination controls", () => {
    render(
      <DataTable className="custom-data-table">
        <DataTableTable>
          <DataTableHeader>
            <DataTableRow>
              <DataTableHead>Name</DataTableHead>
              <DataTableHead>Role</DataTableHead>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Alex</DataTableCell>
              <DataTableCell>Admin</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTableTable>
        <DataTablePaginationBar>
          <DataTablePagination>
            <DataTablePaginationContent>
              <DataTablePaginationItem>
                <DataTablePaginationPrevious href="#" />
              </DataTablePaginationItem>
              <DataTablePaginationItem>
                <DataTablePaginationLink href="#" isActive>
                  1
                </DataTablePaginationLink>
              </DataTablePaginationItem>
              <DataTablePaginationItem>
                <DataTablePaginationNext href="#" />
              </DataTablePaginationItem>
            </DataTablePaginationContent>
          </DataTablePagination>
        </DataTablePaginationBar>
      </DataTable>,
    );

    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();

    const table = screen.getByText("Alex").closest(".custom-data-table");
    expect(table).not.toBeNull();
  });
});
