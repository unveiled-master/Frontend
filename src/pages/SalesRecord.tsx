import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../components/datatables/dataTable";
import DataTableHeader from "../components/datatables/dataTableHeader";
import type { features } from "../components/features";
import { sales, type Sale } from "../data/data";
import styles from "./styles/dashboard.module.css";

export default function SalesRecord () {
  const columnHelper = createColumnHelper<typeof features, Sale>();

  const columns = columnHelper.columns([
    columnHelper.accessor("id", {
      header: "Sale ID",
      cell: (info) => (
        <span className={styles.saleId}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("product", {
      header: "Product",
    }),
    columnHelper.accessor("customer", {
      header: "Customer",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) =>
        new Date(`${info.getValue()}T00:00:00`).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) =>
        `GH₵ ${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();

        const statusClass = {
          Completed: styles.completed,
          Pending: styles.pending,
          Cancelled: styles.cancelled,
        }[status];

        return (
          <span className={`${styles.status} ${statusClass}`}>
            {status}
          </span>
        );
      },
    }),
  ]);

  return <>
    <section>
      <DataTableHeader buttonClick={() => {}} onChange={() => {}} value="" addItem="Sale Record"/>
      <DataTable data={sales} columns={columns}/>
    </section>
  </>
}