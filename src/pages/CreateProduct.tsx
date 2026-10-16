import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Barcode, Boxes, CircleDollarSign, ClipboardList, FileText, ImagePlus,
  Layers3, Package, Tag, Truck,
} from "lucide-react";
import InputField from "../components/forms/input-field";
import { Categories, Products, type Product } from "../data/data";
import styles from "./styles/createProduct.module.css";

type ProductForm = Omit<Product, "id" | "createdAt" | "img"> & { img: string };

const initialForm: ProductForm = {
  name: "", sku: "", barcode: "", category: "", supplier: "", description: "",
  costPrice: 0, sellingPrice: 0, currentStock: 0, reservedStock: 0,
  minimumStock: 0, status: "Active", img: "",
};

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [imageName, setImageName] = useState("");

  const update = (field: keyof ProductForm) => (value: string) => {
    setForm((current) => ({
      ...current,
      [field]: ["costPrice", "sellingPrice", "currentStock", "reservedStock", "minimumStock"].includes(field)
        ? (value === "" ? 0 : Number(value))
        : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product: Product = {
      ...form,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    Products.unshift(product);
    navigate("/products");
  };

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>INVENTORY</p>
          <h1>Create product</h1>
          <p className={styles.subtitle}>Add a product and its details to your inventory.</p>
        </div>
        <button className={styles.backButton} type="button" onClick={() => navigate("/products")}>Cancel</button>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIcon}><Package size={18} /></span>
            <div><h2>Product information</h2><p>Identify and describe the product.</p></div>
          </div>
          <div className={styles.fields}>
            <InputField label="Product name" icon={Tag} name="name" placeholder="e.g. Wireless keyboard" value={form.name} onFieldChanged={update("name")} required />
            <InputField label="SKU" icon={ClipboardList} name="sku" placeholder="e.g. KEY-WRL-001" value={form.sku} onFieldChanged={update("sku")} required />
            <InputField label="Category" icon={Layers3} name="category" type="select" value={form.category} options={Categories} onFieldChanged={() => {}} onSelectChanged={update("category")} required />
            <InputField label="Supplier" icon={Truck} name="supplier" placeholder="Supplier name" value={form.supplier} onFieldChanged={update("supplier")} />
            <div className={styles.fullWidth}>
              <InputField label="Barcode" icon={Barcode} name="barcode" placeholder="Scan or enter a barcode" value={form.barcode} onFieldChanged={update("barcode")} />
            </div>
            <div className={styles.fullWidth}>
              <InputField label="Description" icon={FileText} name="description" type="textarea" placeholder="Add product details" value={form.description} onFieldChanged={update("description")} />
            </div>
            <label className={`${styles.imageUpload} ${styles.fullWidth}`}>
              <ImagePlus size={20} />
              <span><strong>{imageName || "Choose a product image"}</strong><small>PNG, JPG or WEBP</small></span>
              <input type="file" accept="image/*" onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setImageName(file.name);
                setForm((current) => ({ ...current, img: URL.createObjectURL(file) }));
              }} />
            </label>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIcon}><CircleDollarSign size={18} /></span>
            <div><h2>Pricing & stock</h2><p>Set the product's prices and starting quantities.</p></div>
          </div>
          <div className={styles.fields}>
            <InputField label="Cost price" icon={CircleDollarSign} name="costPrice" type="number" placeholder="0.00" value={String(form.costPrice || "")} onFieldChanged={update("costPrice")} required />
            <InputField label="Selling price" icon={CircleDollarSign} name="sellingPrice" type="number" placeholder="0.00" value={String(form.sellingPrice || "")} onFieldChanged={update("sellingPrice")} required />
            <InputField label="Current stock" icon={Boxes} name="currentStock" type="number" placeholder="0" value={String(form.currentStock || "")} onFieldChanged={update("currentStock")} required />
            <InputField label="Minimum stock" icon={Boxes} name="minimumStock" type="number" placeholder="0" value={String(form.minimumStock || "")} onFieldChanged={update("minimumStock")} required />
            <InputField label="Reserved stock" icon={Boxes} name="reservedStock" type="number" placeholder="0" value={String(form.reservedStock || "")} onFieldChanged={update("reservedStock")} />
            <InputField label="Status" icon={Package} name="status" type="select" value={form.status} options={[{ id: "active", name: "Active" }, { id: "inactive", name: "Inactive" }]} onFieldChanged={() => {}} onSelectChanged={(value) => setForm((current) => ({ ...current, status: value as Product["status"] }))} required />
          </div>
        </section>

        <footer className={styles.formFooter}>
          <button className={styles.backButton} type="button" onClick={() => navigate("/products")}>Cancel</button>
          <button className={styles.submitButton} type="submit">Create product</button>
        </footer>
      </form>
    </main>
  );
}
