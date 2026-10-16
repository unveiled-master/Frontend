import styles from "./styles/dashboard.module.css";
import {
  ShoppingCart,
  Package,
  Warehouse,
  Banknote,
} from "lucide-react";
import KPICard from "../components/kpiCard";
import InventoryActivity from "../components/inventoryActivity";
import TopCategories from "../components/topCategories";
import InventoryPerformance from "../components/inventoryPerformance";
import { createColumnHelper } from "@tanstack/react-table";
import { features } from "../components/features";
import DataTable from "../components/datatables/dataTable";
import DataTableHeader from "../components/datatables/dataTableHeader";

const KPIs = [
  {
    title: "Total Products",
    value: "1250",
    icon: Package,
    change: "+8.5%",
    trend: [80, 95, 90, 110, 105, 130, 145],
    theme: "green"
  },
  {
    title: "Stock Available",
    value: "8400",
    icon: Warehouse,
    change: "+5.2%",
    trend: [120, 115, 130, 125, 140, 135, 150],
    theme: "blue"
  },
  {
    title: "Total Orders",
    value: "356",
    icon: ShoppingCart,
    change: "+12.4%",
    trend: [40, 55, 48, 70, 65, 85, 100],
    theme: "gold"
  },
  {
    title: "Monthly Revenue",
    value: "GH₵ 24,850",
    icon: Banknote,
    change: "+10.8%",
    trend: [100, 120, 115, 145, 135, 170, 200],
    theme: "red"
  },
]


type Sale = {
  id: string;
  product: string;
  customer: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
};

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

const sales: Sale[] = [
  {
    id: "SAL-00124",
    product: "Wireless Mouse",
    customer: "John Mensah",
    date: "2026-10-12",
    amount: 250,
    status: "Completed",
  },
  {
    id: "SAL-00123",
    product: "USB-C Hub",
    customer: "Ama Owusu",
    date: "2026-10-12",
    amount: 420,
    status: "Pending",
  },
  {
    id: "SAL-00122",
    product: "Laptop Stand",
    customer: "Kwame Asare",
    date: "2026-10-11",
    amount: 180,
    status: "Completed",
  },
  {
    id: "SAL-00121",
    product: "Mechanical Keyboard",
    customer: "Akosua Boateng",
    date: "2026-10-11",
    amount: 650,
    status: "Cancelled",
  },
  {
    id: "SAL-00120",
    product: "USB Flash Drive",
    customer: "Kofi Addo",
    date: "2026-10-10",
    amount: 95,
    status: "Completed",
  },
];

function Dashboard() {
  

  return (
    <>
    <section className={styles.kpiSection}>
      {
        KPIs.map(kpi => {
          return <>
            <KPICard key={kpi.title} theme={kpi.theme} title={kpi.title} icon={kpi.icon} trend={kpi.trend} value={kpi.value} change={kpi.change}/>
          </>
        })
      }
    </section>

    <section className={styles.inventoryActivityGraph}>
      <h2>Weekly Inventory Activity</h2>
      <InventoryActivity/>
    </section>

    <div className={styles.row}>
      <section className={styles.topCategories}>
        <h2>Top Categories</h2>
        <TopCategories/>
      </section>

      <section className={styles.chartContainer}>
        <h2>Inventory Performance</h2>
        <p>Monthly inventory movement and stock levels</p>

        <InventoryPerformance />
      </section>
    </div>

    
    <section className={styles.recentSales}>
      <h2>Recent Sales</h2>
      <DataTableHeader buttonClick={() => {}} onChange={() => {}} value="" addItem="Add Category"/>
      <DataTable data={sales} columns={columns}/>
    </section>
    </>
  )
}

export default Dashboard