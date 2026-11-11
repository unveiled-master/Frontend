import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Grid2X2,
  List,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { api, type Product } from "../data/data";
import styles from "./styles/makeSale.module.css";

type CartItem = { product: Product; quantity: number };

const money = (amount: number) => `GH₵ ${amount.toFixed(2)}`;

export default function MakeSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All products");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [checkoutNotice, setCheckoutNotice] = useState("");

  useEffect(() => {
    let active = true;
    api.get("product")
      .then((result: Product[]) => {
        if (active) setProducts(Array.isArray(result) ? result : []);
      })
      .catch(() => {
        if (active) setLoadError("Products could not be loaded. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const categories = useMemo(
    () => ["All products", ...Array.from(new Set(products.map((product) => product.category || "Uncategorized")))],
    [products],
  );
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All products" || (product.category || "Uncategorized") === category;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [product.name, product.sku, product.barcode, product.category]
      .some((value) => value?.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  }), [products, category, search]);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

  const changeQuantity = (product: Product, delta: number) => {
    setCheckoutNotice("");
    setCart((current) => {
      const existing = current.find((item) => item.product.sku === product.sku);
      const nextQuantity = (existing?.quantity ?? 0) + delta;
      if (nextQuantity <= 0) return current.filter((item) => item.product.sku !== product.sku);
      if (nextQuantity > product.currentStock) return current;
      if (existing) return current.map((item) => item.product.sku === product.sku ? { ...item, quantity: nextQuantity } : item);
      return [...current, { product, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutNotice("");
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Link className={styles.backLink} to="/dashboard"><ArrowLeft size={16} /> Back to Dashboard</Link>
          <p className={styles.eyebrow}>SALES / POINT OF SALE</p>
          <h1>Make a sale</h1>
          <p className={styles.pageDescription}>Choose products and add them to the current order.</p>
        </div>
        <div className={styles.cartIndicator}><ShoppingCart size={17} /> {itemCount} {itemCount === 1 ? "item" : "items"}</div>
      </header>

      {checkoutNotice && <div className={styles.successMessage} role="status"><Check size={17} /> {checkoutNotice}</div>}
      {loadError && <div className={styles.errorMessage} role="alert">{loadError}</div>}

      <div className={styles.posLayout}>
        <section className={styles.catalog} aria-label="Product catalog">
          <div className={styles.catalogHeader}>
            <div><h2>Products</h2><p>{products.length} products available</p></div>
            <div className={styles.viewToggle} aria-label="Product view">
              <button type="button" className={view === "grid" ? styles.selectedView : ""} aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}><Grid2X2 size={16} /></button>
              <button type="button" className={view === "list" ? styles.selectedView : ""} aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}><List size={16} /></button>
            </div>
          </div>

          <label className={styles.searchBox}><Search size={17} /><span className={styles.visuallyHidden}>Search products</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name, SKU or barcode..." /></label>
          <div className={styles.categoryFilters} aria-label="Filter by category">
            {categories.map((item) => <button type="button" key={item} className={category === item ? styles.activeCategory : ""} onClick={() => setCategory(item)}>{item}</button>)}
          </div>

          {loading ? <div className={styles.emptyCatalog}>Loading products…</div> : visibleProducts.length === 0 ? (
            <div className={styles.emptyCatalog}>{loadError ? "Product catalog is unavailable." : products.length ? "No products match your search." : "No products are available yet."}</div>
          ) : view === "grid" ? (
            <div className={styles.productGrid}>
              {visibleProducts.map((product) => {
                const quantity = cart.find((item) => item.product.sku === product.sku)?.quantity ?? 0;
                return <article className={styles.productCard} key={product.sku}>
                  <div className={styles.productImageWrap}><div className={styles.productPlaceholder}><ShoppingBag size={26} /></div>{quantity > 0 && <span className={styles.inCartBadge}>{quantity} in order</span>}</div>
                  <div className={styles.productDetails}><span className={styles.productCategory}>{product.category || "Uncategorized"}</span><h3 title={product.name}>{product.name}</h3><p className={styles.productSku}>SKU: {product.sku}</p>
                    <div className={styles.productCardFooter}><div><strong>{money(product.sellingPrice)}</strong><span>{product.currentStock} in stock</span></div><button type="button" aria-label={`Add ${product.name} to order`} onClick={() => changeQuantity(product, 1)} disabled={product.currentStock <= quantity}><Plus size={17} /></button></div>
                  </div>
                </article>;
              })}
            </div>
          ) : (
            <div className={styles.tableWrap}><table className={styles.productTable}><thead><tr><th>Product</th><th>Price</th><th>Stock</th><th></th></tr></thead><tbody>
              {visibleProducts.map((product) => { const quantity = cart.find((item) => item.product.sku === product.sku)?.quantity ?? 0; return <tr key={product.sku}><td><div className={styles.tableProduct}><span><strong>{product.name}</strong><small>{product.sku}</small></span></div></td><td className={styles.tablePrice}>{money(product.sellingPrice)}</td><td>{product.currentStock}</td><td><button className={styles.tableAdd} type="button" onClick={() => changeQuantity(product, 1)} disabled={product.currentStock <= quantity}><Plus size={14} /> Add</button></td></tr>; })}
            </tbody></table></div>
          )}
        </section>

        <aside className={styles.orderPanel} aria-label="Current order">
          <div className={styles.orderHeader}><div><h2>Current order</h2><p>{itemCount} {itemCount === 1 ? "item" : "items"}</p></div>{cart.length > 0 && <button type="button" className={styles.clearButton} onClick={clearCart}>Clear all</button>}</div>
          {cart.length === 0 ? <div className={styles.emptyOrder}><ShoppingCart size={29} /><strong>Your order is empty</strong><p>Add products from the catalog to start a sale.</p></div> : <ul className={styles.cartItems}>{cart.map(({ product, quantity }) => <li className={styles.cartItem} key={product.sku}><div className={styles.cartItemInfo}><strong>{product.name}</strong><span>{money(product.sellingPrice)} each</span><div className={styles.quantityControl}><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(product, -1)}><Minus size={13} /></button><span>{quantity}</span><button type="button" aria-label={`Add one ${product.name}`} disabled={quantity >= product.currentStock} onClick={() => changeQuantity(product, 1)}><Plus size={13} /></button></div></div><div className={styles.cartItemEnd}><strong>{money(product.sellingPrice * quantity)}</strong><button type="button" aria-label={`Remove ${product.name} from order`} onClick={() => changeQuantity(product, -quantity)}><Trash2 size={14} /></button></div></li>)}</ul>}
          <div className={styles.orderSummary}><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Tax</span><span className={styles.taxNote}>Calculated at checkout</span></div><div className={styles.totalLine}><span>Total</span><strong>{money(subtotal)}</strong></div><button type="button" className={styles.checkoutButton} disabled><span>Complete sale</span><span>{money(subtotal)}</span></button><p className={styles.checkoutNote}>Sale processing will be available when checkout is connected.</p></div>
        </aside>
      </div>
    </div>
  );
}
