import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowDownToLine, Boxes, PackagePlus, Search, TrendingDown } from "lucide-react";
import { api, type Product } from "../data/data";
import styles from "./styles/inventory.module.css";

type StockFilter = "All stock" | "Low stock" | "Out of stock";

function getStockState(product: Product) {
  if (product.currentStock <= 0) return "Out of stock";
  if (product.currentStock <= product.minimumStock) return "Low stock";
  return "In stock";
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StockFilter>("All stock");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("product")
      .then((result: Product[]) => {
        if (active) setProducts(Array.isArray(result) ? result : []);
      })
      .catch(() => { if (active) setError("Inventory could not be loaded. Please try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const lowCount = products.filter((product) => product.currentStock > 0 && product.currentStock <= product.minimumStock).length;
  const outCount = products.filter((product) => product.currentStock <= 0).length;
  const totalUnits = products.reduce((total, product) => total + product.currentStock, 0);
  const filteredProducts = useMemo(() => products.filter((product) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [product.name, product.sku, product.category]
      .some((value) => value?.toLowerCase().includes(term));
    const status = getStockState(product);
    return matchesSearch && (filter === "All stock" || status === filter);
  }), [products, search, filter]);

  const exportCsv = () => {
    const rows = [["Product", "SKU", "Category", "Available stock", "Minimum stock", "Unit cost", "Stock status"], ...filteredProducts.map((product) => [product.name, product.sku, product.category || "Uncategorized", String(product.currentStock), String(product.minimumStock), String(product.costPrice), getStockState(product)])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <div className={styles.page}>
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>INVENTORY</p><h1>Stock overview</h1><p className={styles.subtitle}>Track availability and identify products that need replenishing.</p></div>
      <div className={styles.actions}><button className={styles.exportButton} type="button" onClick={exportCsv} disabled={loading || filteredProducts.length === 0}><ArrowDownToLine size={16} /> Export</button><Link className={styles.addButton} to="/create-product"><PackagePlus size={17} /> Add product</Link></div>
    </header>

    <div className={styles.metrics}>
      <article className={styles.metricCard}><span className={styles.metricIcon}><Boxes size={19} /></span><div><p>Total products</p><strong>{loading ? "—" : products.length}</strong><small>Across your catalog</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.greenIcon}`}><PackagePlus size={19} /></span><div><p>Units in stock</p><strong>{loading ? "—" : totalUnits.toLocaleString()}</strong><small>Available inventory</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.amberIcon}`}><AlertTriangle size={19} /></span><div><p>Low stock</p><strong>{loading ? "—" : lowCount}</strong><small>At or below minimum</small></div></article>
      <article className={styles.metricCard}><span className={`${styles.metricIcon} ${styles.redIcon}`}><TrendingDown size={19} /></span><div><p>Out of stock</p><strong>{loading ? "—" : outCount}</strong><small>Need replenishment</small></div></article>
    </div>

    <section className={styles.inventoryPanel}>
      <div className={styles.panelHeading}><div><h2>Product stock</h2><p>Review stock levels across all products.</p></div><span className={styles.productCount}>{filteredProducts.length} products</span></div>
      <div className={styles.toolbar}>
        <label className={styles.search}><Search size={17} /><span className={styles.visuallyHidden}>Search inventory</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products, SKU or category" /></label>
        <div className={styles.filters} aria-label="Filter inventory">
          {(["All stock", "Low stock", "Out of stock"] as StockFilter[]).map((option) => <button key={option} type="button" aria-pressed={filter === option} className={filter === option ? styles.activeFilter : ""} onClick={() => setFilter(option)}>{option}{option === "Low stock" && lowCount > 0 && <span>{lowCount}</span>}{option === "Out of stock" && outCount > 0 && <span>{outCount}</span>}</button>)}
        </div>
      </div>

      {error && <div className={styles.error} role="alert">{error}</div>}
      <div className={styles.tableScroll}><table className={styles.table}>
        <thead><tr><th>Product</th><th>SKU</th><th>Category</th><th>Available</th><th>Stock level</th><th>Status</th></tr></thead>
        <tbody>
          {loading ? <tr><td className={styles.empty} colSpan={6}>Loading inventory…</td></tr> : filteredProducts.length === 0 ? <tr><td className={styles.empty} colSpan={6}>{error ? "Inventory data is unavailable." : products.length ? "No products match your filters." : "No products yet. Add a product to start tracking inventory."}</td></tr> : filteredProducts.map((product) => {
            const status = getStockState(product);
            const level = product.minimumStock > 0 ? Math.min(100, Math.round((product.currentStock / (product.minimumStock * 2)) * 100)) : (product.currentStock > 0 ? 100 : 0);
            const barClass = status === "Out of stock" ? styles.outBar : status === "Low stock" ? styles.lowBar : "";
            return <tr key={product.sku}>
              <td><div className={styles.product}><span className={styles.productMark}><Boxes size={16} /></span><strong>{product.name}</strong></div></td>
              <td className={styles.sku}>{product.sku}</td><td>{product.category || "Uncategorized"}</td>
              <td><strong className={styles.quantity}>{product.currentStock.toLocaleString()}</strong><span className={styles.minimum}> min. {product.minimumStock}</span></td>
              <td><div className={styles.stockTrack} aria-label={`${product.currentStock} units, minimum ${product.minimumStock}`}><span className={barClass} style={{ width: `${level}%` }} /></div></td>
              <td><span className={`${styles.status} ${status === "In stock" ? styles.inStock : status === "Low stock" ? styles.lowStock : styles.outOfStock}`}><i />{status}</span></td>
            </tr>;
          })}
        </tbody>
      </table></div>
      <footer className={styles.tableFooter}><span>Stock value is based on current quantities.</span><Link to="/products">View product catalog <span aria-hidden="true">→</span></Link></footer>
    </section>
  </div>;
}
