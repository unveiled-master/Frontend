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
// import { ApiService } from "../services/api.service";
// import { useEffect, useState } from "react";
// import axios from "axios";
import  { type Sale, sales } from "../data/data";


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

// const service = new ApiService();

function Dashboard() {
  // const [data, setData] = useState<unknown>(null);

  // const user = JSON.parse(localStorage.getItem("user")!);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const result = await service.post("dashboard", {});
  //       setData(result);
  //       return result;
  //     } catch (error) {
  //       if(axios.isAxiosError(error)){
  //         console.log(error.response?.data)
  //         if(error.response?.status === 401){
  //           try{
  //             await service.refesh();
  //             const result = await service.post("dashboard", {});
  //             setData(result);
  //           } catch(error) {
  //             if(axios.isAxiosError(error)){
  //               // console.log(error.response?.data.message)
  //             }
  //           }
  //         }
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
    <section className={styles.kpiSection}>
      {
        KPIs.map(kpi => {
          return <KPICard key={kpi.title} theme={kpi.theme} title={kpi.title} icon={kpi.icon} trend={kpi.trend} value={kpi.value} change={kpi.change}/>
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
