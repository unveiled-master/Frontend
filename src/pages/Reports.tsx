import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, Banknote, Boxes, ShoppingCart, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { api, sales, type Product, type Sale } from "../data/data";
import styles from "./styles/reports.module.css";

type Range = "30" | "90" | "365";
const money = (value: number) => `GH₵ ${value.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const CHART_COLORS = ["#176b4c", "#4a9b70", "#78b990", "#a7d0b2", "#c7e2cd"];

export default function Reports() {
  const [range, setRange] = useState<Range>("90");
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryError, setInventoryError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("product")
      .then((result: Product[]) => { if (active) setProducts(Array.isArray(result) ? result : []); })
      .catch(() => { if (active) setInventoryError("Inventory summary is unavailable."); });
    return () => { active = false; };
  }, []);

  const rangeStart = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - Number(range));
    return date;
  }, [range]);
  const filteredSales = useMemo(() => sales.filter((sale) => {
    const date = new Date(`${sale.date}T00:00:00`);
    return !Number.isNaN(date.getTime()) && date >= rangeStart;
  }), [rangeStart]);
  const completedSales = filteredSales.filter((sale) => sale.status === "Completed");
  const revenue = completedSales.reduce((sum, sale) => sum + sale.amount, 0);
  const averageOrder = completedSales.length ? revenue / completedSales.length : 0;
  const lowStock = products.filter((product) => product.currentStock > 0 && product.currentStock <= product.minimumStock).length;
  const outOfStock = products.filter((product) => product.currentStock <= 0).length;

  const trendData = useMemo(() => {
    const daily = new Map<string, number>();
    completedSales.forEach((sale) => daily.set(sale.date, (daily.get(sale.date) || 0) + sale.amount));
    return Array.from(daily, ([date, amount]) => ({
      day: new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      amount,
      date,
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, [completedSales]);

  const topProducts = useMemo(() => {
    const byProduct = new Map<string, number>();
    filteredSales.filter((sale) => sale.status === "Completed").forEach((sale) => byProduct.set(sale.product, (byProduct.get(sale.product) || 0) + sale.amount));
    return Array.from(byProduct, ([product, amount]) => ({ product, amount })).sort((a, b) => b.amount - a.amount).slice(0, 5);
  }, [filteredSales]);

  const exportCsv = () => {
    const rows = [["Sale ID", "Date", "Product", "Customer", "Amount (GHS)", "Status"], ...filteredSales.map((sale: Sale) => [sale.id, sale.date, sale.product, sale.customer, sale.amount.toFixed(2), sale.status])];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <div className={styles.page}>
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>BUSINESS OVERVIEW</p><h1>Reports</h1><p className={styles.subtitle}>Understand sales performance and inventory health.</p></div>
      <div className={styles.actions}><label className={styles.rangeLabel}><span className={styles.visuallyHidden}>Report date range</span><select value={range} onChange={(event) => setRange(event.target.value as Range)}><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last 12 months</option></select></label><button className={styles.exportButton} type="button" onClick={exportCsv}><ArrowDownToLine size={16} /> Export report</button></div>
    </header>

    <section className={styles.metrics} aria-label="Sales summary">
      <article className={styles.metricCard}><span className={styles.metricIcon}><Banknote size={19} /></span><div><p>Completed revenue</p><strong>{money(revenue)}</strong><small>From completed sales</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.greenIcon}`}><ShoppingCart size={19} /></span><div><p>Completed orders</p><strong>{completedSales.length}</strong><small>In selected period</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.blueIcon}`}><TrendingUp size={19} /></span><div><p>Average order value</p><strong>{money(averageOrder)}</strong><small>Revenue per completed order</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.amberIcon}`}><Boxes size={19} /></span><div><p>Stock alerts</p><strong>{lowStock + outOfStock}</strong><small>{lowStock} low · {outOfStock} out of stock</small></div></article>
    </section>

    <div className={styles.chartGrid}>
      <section className={styles.chartCard}>
        <div className={styles.cardHeading}><div><h2>Revenue trend</h2><p>Completed sales by day</p></div><span className={styles.legend}><i /> Revenue</span></div>
        {trendData.length ? <div className={styles.chart}><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a9b70" stopOpacity={0.18} /><stop offset="100%" stopColor="#4a9b70" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid stroke="#edf1ee" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#89958e", fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} width={55} tick={{ fill: "#89958e", fontSize: 11 }} tickFormatter={(value: number) => `₵${value}`} /><Tooltip formatter={(value) => money(Number(value))} contentStyle={{ border: "1px solid #e5ebe7", borderRadius: 10, fontSize: 12 }} /><Area type="monotone" dataKey="amount" stroke="#24774f" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 4, fill: "#176b4c" }} /></AreaChart></ResponsiveContainer></div> : <div className={styles.chartEmpty}>No completed sales in this period.</div>}
      </section>
      <section className={styles.chartCard}>
        <div className={styles.cardHeading}><div><h2>Top products</h2><p>Revenue by product</p></div></div>
        {topProducts.length ? <div className={styles.chart}><ResponsiveContainer width="100%" height="100%"><BarChart data={topProducts} layout="vertical" margin={{ top: 4, right: 15, left: 8, bottom: 0 }}><CartesianGrid stroke="#edf1ee" horizontal={false} /><XAxis type="number" hide /><YAxis type="category" dataKey="product" width={122} axisLine={false} tickLine={false} tick={{ fill: "#68766e", fontSize: 11 }} /><Tooltip formatter={(value) => money(Number(value))} contentStyle={{ border: "1px solid #e5ebe7", borderRadius: 10, fontSize: 12 }} /><Bar dataKey="amount" name="Revenue" radius={[0, 5, 5, 0]} barSize={19}>{topProducts.map((item, index) => <Cell key={item.product} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}</Bar></BarChart></ResponsiveContainer></div> : <div className={styles.chartEmpty}>No product sales to report.</div>}
      </section>
    </div>

    <section className={styles.salesCard}>
      <div className={styles.cardHeading}><div><h2>Sales activity</h2><p>Transactions recorded in the selected period</p></div><span className={styles.count}>{filteredSales.length} records</span></div>
      <div className={styles.tableScroll}><table className={styles.table}><thead><tr><th>Sale</th><th>Product</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>
        {filteredSales.length ? filteredSales.map((sale) => <tr key={sale.id}><td className={styles.saleId}>{sale.id}</td><td>{sale.product}</td><td>{sale.customer}</td><td>{new Date(`${sale.date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td><td className={styles.amount}>{money(sale.amount)}</td><td><span className={`${styles.status} ${sale.status === "Completed" ? styles.completed : sale.status === "Pending" ? styles.pending : styles.cancelled}`}><i />{sale.status}</span></td></tr>) : <tr><td className={styles.empty} colSpan={6}>No sales in the selected period.</td></tr>}
      </tbody></table></div>
      <footer className={styles.footer}><span>{inventoryError || "Inventory alerts are based on current product stock."}</span><span><b>{products.length}</b> products tracked</span></footer>
    </section>
  </div>;
}
