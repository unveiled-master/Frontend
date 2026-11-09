import { ArrowDownUp, ArrowUpRight, Boxes, LayoutDashboard, Package, Search, ShoppingBag, Users } from "lucide-react";
import styles from "../landing.module.css";

const items = [
  { name: "Product catalogue", description: "Your products, organized", icon: Package, color: "sage" },
  { name: "Inventory overview", description: "Stock activity in view", icon: Boxes, color: "blue" },
  { name: "Sales records", description: "Recent business activity", icon: ShoppingBag, color: "sand" },
];

export default function DashboardPreview() {
  return (
    <div className={styles.workspace} aria-label="Illustrative ProdUp workspace preview">
      <div className={styles.workspaceBar}>
        <div className={styles.workspaceLogo}><span><Boxes size={13} /></span> produp <i>/ workspace</i></div>
        <div className={styles.workspaceSearch}><Search size={11} /> Search products, sales...</div>
        <div className={styles.workspaceUser}>A</div>
      </div>
      <div className={styles.workspaceBody}>
        <aside className={styles.workspaceSidebar}>
          <small>YOUR BUSINESS</small>
          <span className={styles.workspaceNavActive}><LayoutDashboard size={13} /> Overview</span>
          <span><Package size={13} /> Products</span>
          <span><ArrowDownUp size={13} /> Inventory</span>
          <span><ShoppingBag size={13} /> Sales</span>
          <span><Users size={13} /> Contacts</span>
          <div className={styles.workspaceSidebarFoot}>BUSINESS WORKSPACE</div>
        </aside>
        <div className={styles.workspaceMain}>
          <div className={styles.workspaceHeading}><div><small>BUSINESS OVERVIEW</small><h3>Your day, at a glance.</h3></div><span>All activity <ArrowDownUp size={11} /></span></div>
          <div className={styles.workspaceMetrics}>
            <div><span>Sales</span><b>Overview</b><small>Recorded activity</small></div>
            <div><span>Products</span><b>Catalogue</b><small>Product records</small></div>
            <div><span>Inventory</span><b>Stock</b><small>Availability view</small></div>
          </div>
          <div className={styles.workspaceRecords}>
            <div className={styles.recordsHead}><div><b>Business essentials</b><small>Keep key information close</small></div><a href="/register">Open workspace <ArrowUpRight size={11} /></a></div>
            {items.map(({ name, description, icon: Icon, color }) => (
              <div className={styles.recordRow} key={name}><span className={`${styles.recordIcon} ${styles[color]}`}><Icon size={14} /></span><span><b>{name}</b><small>{description}</small></span><ArrowUpRight size={13} /></div>
            ))}
          </div>
          <div className={styles.workspaceNote}><span /> Illustration only · no business metrics shown</div>
        </div>
      </div>
    </div>
  );
}
