import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../components/datatables/dataTable";
import DataTableHeader from "../components/datatables/dataTableHeader";
import type { features } from "../components/features";
import { api, type Sale } from "../data/data";
import styles from "./styles/dashboard.module.css";
import { useEffect, useState } from "react";
import Decimal from "decimal.js";

const columnHelper = createColumnHelper<typeof features, Sale>();

const columns = columnHelper.columns([
  columnHelper.accessor("saleNumber", {
    header: "Sale Number",
    cell: (info) => (
      <span className={styles.saleId}>
        {info.getValue()}
      </span>
    ),
  }),
  // columnHelper.accessor("product", {
  //   header: "Product",
  // }),
  // columnHelper.accessor("customer", {
  //   header: "Customer",
  // }),
  columnHelper.accessor("createdAt", {
    header: "Date",
    cell: (info) => {
      return <span>{new Date(info.getValue()).toDateString()}</span>
    }
  }),
  columnHelper.accessor("total", {
    header: "Total",
    cell: (info) =>
      `GH₵ ${new Decimal(info.getValue()).toFixed(2)}`,
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
export default function SalesRecord () {

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const ps: Sale[] = await api.get('sales');
      // const image: Image = await ps.image;
      // const category: Category = await ps.category;
      console.log(ps);
      setSales(ps);
    }
    fetch();
  }, [])

  return <>
    <section>
      <DataTableHeader buttonClick={() => {}} onChange={() => {}} value="" addItem="Sale Record"/>
      <DataTable data={sales} columns={columns}/>
    </section>
  </>
}