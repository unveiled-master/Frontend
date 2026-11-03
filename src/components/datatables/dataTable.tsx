
import {
  useTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";

import styles from "./dataTable.module.css";
import { features } from "../features";


type DataTableProps<TData extends RowData> = {
  data: TData[],
  columns: ColumnDef<typeof features, TData>[]
}

export default function DataTable<TData extends RowData>({data, columns} : DataTableProps<TData>) {
  const table = useTable({
    features,
    columns,
    data: data,
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={styles.sortHeader}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <table.FlexRender header={header} />

                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>

              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className={styles.empty}
                colSpan={columns.length}
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
