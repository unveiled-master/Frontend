import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, Mail, MapPin, Phone, Search, UserRound, UsersRound, UserX } from "lucide-react";
import { api } from "../data/data";
import styles from "./styles/customers.module.css";

type Customer = {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
  createdAt?: string;
};
type CustomerFilter = "All customers" | "Active" | "Inactive";

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CustomerFilter>("All customers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("customer")
      .then((result: Customer[] | { customers?: Customer[] }) => {
        if (!active) return;
        const records = Array.isArray(result) ? result : result?.customers;
        setCustomers(Array.isArray(records) ? records : []);
      })
      .catch(() => { if (active) setError("Customers could not be loaded. Please try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const activeCount = customers.filter((customer) => customer.status?.toUpperCase() !== "INACTIVE").length;
  const inactiveCount = customers.length - activeCount;
  const contactCount = customers.filter((customer) => customer.email || customer.phone).length;
  const filteredCustomers = useMemo(() => customers.filter((customer) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [customer.name, customer.email, customer.phone, customer.address]
      .some((value) => value?.toLowerCase().includes(term));
    const inactive = customer.status?.toUpperCase() === "INACTIVE";
    const matchesFilter = filter === "All customers" || (filter === "Inactive" ? inactive : !inactive);
    return matchesSearch && matchesFilter;
  }), [customers, search, filter]);

  const exportCsv = () => {
    const rows = [["Customer", "Email", "Phone", "Address", "Status", "Customer since"], ...filteredCustomers.map((customer) => [customer.name, customer.email || "", customer.phone || "", customer.address || "", customer.status || "ACTIVE", formatDate(customer.createdAt)])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "customers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <div className={styles.page}>
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>RELATIONSHIPS</p><h1>Customers</h1><p className={styles.subtitle}>Keep customer contact details organized in one place.</p></div>
      <button className={styles.exportButton} type="button" onClick={exportCsv} disabled={loading || filteredCustomers.length === 0}><ArrowDownToLine size={16} /> Export customers</button>
    </header>

    <div className={styles.metrics}>
      <article className={styles.metricCard}><span className={styles.metricIcon}><UsersRound size={19} /></span><div><p>Total customers</p><strong>{loading ? "—" : customers.length}</strong><small>In your directory</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.greenIcon}`}><UserRound size={19} /></span><div><p>Active</p><strong>{loading ? "—" : activeCount}</strong><small>Available for sales</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.amberIcon}`}><Mail size={19} /></span><div><p>With contact details</p><strong>{loading ? "—" : contactCount}</strong><small>Email or phone listed</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.mutedIcon}`}><UserX size={19} /></span><div><p>Inactive</p><strong>{loading ? "—" : inactiveCount}</strong><small>Not currently active</small></div></article>
    </div>

    <section className={styles.customerPanel}>
      <div className={styles.panelHeading}><div><h2>Customer directory</h2><p>Search and manage your customer contacts.</p></div><span className={styles.recordCount}>{filteredCustomers.length} records</span></div>
      <div className={styles.toolbar}>
        <label className={styles.search}><Search size={17} /><span className={styles.visuallyHidden}>Search customers</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, phone or location" /></label>
        <div className={styles.filters} aria-label="Filter customers">{(["All customers", "Active", "Inactive"] as CustomerFilter[]).map((option) => <button key={option} type="button" aria-pressed={filter === option} className={filter === option ? styles.activeFilter : ""} onClick={() => setFilter(option)}>{option}{option === "Active" && activeCount > 0 && <span>{activeCount}</span>}{option === "Inactive" && inactiveCount > 0 && <span>{inactiveCount}</span>}</button>)}</div>
      </div>
      {error && <div className={styles.error} role="alert">{error}</div>}
      <div className={styles.tableScroll}><table className={styles.table}>
        <thead><tr><th>Customer</th><th>Contact</th><th>Location</th><th>Customer since</th><th>Status</th></tr></thead>
        <tbody>{loading ? <tr><td className={styles.empty} colSpan={5}>Loading customers…</td></tr> : filteredCustomers.length === 0 ? <tr><td className={styles.empty} colSpan={5}>{error ? "Customer data is unavailable." : customers.length ? "No customers match your filters." : "No customers yet. Customer records will appear here once available."}</td></tr> : filteredCustomers.map((customer, index) => {
          const inactive = customer.status?.toUpperCase() === "INACTIVE";
          return <tr key={customer.id || `${customer.email || customer.name}-${index}`}>
            <td><div className={styles.customer}><span className={styles.avatar}>{customer.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?"}</span><div><strong>{customer.name}</strong><small>{customer.id ? `ID ${customer.id}` : "Customer"}</small></div></div></td>
            <td><div className={styles.contact}>{customer.email && <span><Mail size={13} />{customer.email}</span>}{customer.phone && <span><Phone size={13} />{customer.phone}</span>}{!customer.email && !customer.phone && <span className={styles.noContact}>No contact details</span>}</div></td>
            <td><span className={styles.location}>{customer.address ? <><MapPin size={14} />{customer.address}</> : "—"}</span></td>
            <td className={styles.date}>{formatDate(customer.createdAt)}</td>
            <td><span className={`${styles.status} ${inactive ? styles.inactive : styles.active}`}><i />{inactive ? "Inactive" : "Active"}</span></td>
          </tr>;
        })}</tbody>
      </table></div>
      <footer className={styles.tableFooter}><span>Customer details are synced from your customer records.</span><span>{filteredCustomers.length} shown</span></footer>
    </section>
  </div>;
}
