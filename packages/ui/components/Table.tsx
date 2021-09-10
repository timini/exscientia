import React, { ReactElement } from "react";
import { TableOptions, useSortBy, useTable } from "react-table";

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
}: TableOptions<T>): ReactElement {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns, data }, useSortBy);
  return (
    <table {...getTableProps()} className="table w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.getHeaderGroupProps().key}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.getHeaderProps(column.getSortByToggleProps()).key}
              >
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.getRowProps().key}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={row.getRowProps().key}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
