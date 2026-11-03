import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Barcode, Boxes, CircleDollarSign, ClipboardList, FileText, ImagePlus,
  Layers3, Package, Tag, Truck,
} from "lucide-react";
import InputField, { type Option } from "../components/forms/input-field";
import SubmitButton from "../components/forms/submit-button";
import { api, type Product, statusOptions } from "../data/data";
import styles from "./styles/createProduct.module.css";
import Alert from "../components/alert";

type ProductForm = Omit<Product, "id" | "createdAt" | "image"> & { image: string };

const initialForm: ProductForm = {
  name: "Wireless Keyboard", sku: "SKU-CLS-1199", barcode: "scbdjncjndjncd", categoryId: "", supplierId: "", description: "sadsadsx",
  costPrice: 0, sellingPrice: 0, currentStock: 0, reservedStock: 0,
  minimumStock: 0, status: "ACTIVE", image: "some-image",
};

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [imageName, setImageName] = useState("");
  const [preview, setPreview] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [categories, setCategories] = useState<Option[]>([]);
  const [suppliers, setSuppliers] = useState<Option[]>([]);
  
  const getCategories = async () => {
    try{
      const cs = await api.get('category');
      setCategories([...cs]);
    } catch (error) {
      console.log(error.message);
    }
  }
  const getSuppliers = async () => {
    try{
      const ss = await api.get('supplier');
      setSuppliers([...ss]);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await getCategories();
      await getSuppliers();
    }

    fetch();
  }, [])

  const update = (field: keyof ProductForm) => (value: string) => {
    setForm((current) => ({
      ...current,
      [field]: ["costPrice", "sellingPrice", "currentStock", "reservedStock", "minimumStock"].includes(field)
        ? (value === "" ? 0 : Number(value))
        : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const product = await api.post('product', form);
      setSuccess(true);
      setSuccessMessage(`Product: ${product.name}, Created Successfully`)
      event.currentTarget.reset();
    } catch(error){
      setSuccess(false);
      setSuccessMessage(`Product: ${form.name}, could not be created`);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  };

  return (
    <main className={styles.page}>
    <div className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.iconBg}><div className={styles.icon}><div className={styles.iconContainer}><Package /></div></div></div>
        <h1>Create product</h1>
        <p className={styles.subtitle}>Add a product to your inventory</p>
        <Alert success={success} message={successMessage} setSuccess={setSuccess} setSuccessMessage={setSuccessMessage}/>
        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIcon}><Package size={18} /></span>
            <div><h2>Product information</h2><p>Identify and describe the product.</p></div>
          </div>
          <div className={styles.fields}>
            <InputField label="Product name" icon={Tag} name="name" placeholder="e.g. Wireless keyboard" value={form.name} onFieldChanged={update("name")} required />
            <InputField label="SKU" icon={ClipboardList} name="sku" placeholder="e.g. KEY-WRL-001" value={form.sku} onFieldChanged={update("sku")} required />
            <InputField label="Category" icon={Layers3} name="category" type="select" value={form.categoryId} options={categories} onFieldChanged={() => {}} onSelectChanged={update("categoryId")} required />
            <InputField label="Supplier" icon={Truck} name="supplier" placeholder="Supplier name" value={form.supplierId} onFieldChanged={() => {}} onSelectChanged={update("supplierId")} type="select" options={suppliers}/>
            <div className={styles.fullWidth}>
            <InputField label="Barcode" icon={Barcode} name="barcode" placeholder="Scan or enter a barcode" value={form.barcode} onFieldChanged={update("barcode")} />
            </div>
            
            <div className={styles.fullWidth}>
              <InputField label="Description" icon={FileText} name="description" type="textarea" placeholder="Add product details" value={form.description} onFieldChanged={update("description")} />
            </div> 
            
            {/* {
              useLink! 
                ? */}
              <label className={`${styles.imageUpload} ${styles.fullWidth}`}>
              <ImagePlus size={20} />
              <span><strong>{imageName || "Choose a product image"}</strong><small>PNG, JPG or WEBP</small></span>
              <input type="file" accept="image/*" onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setImageName(file.name);
                setForm((current) => ({ ...current, img: URL.createObjectURL(file) }));
                setPreview(URL.createObjectURL(file));
              }} />
              </label>
                 {/* : 
            
               <input type="tex" accept="" onChange={(event) => {
                   const file = event.target.value;
                   if (!file) return;
                     setImageName(file);
                     setForm((current) => ({ ...current, img: URL.file }));
                     setPreview(URL.createObjectURL(file));
                 }} 
               />
             } */}
            
            {preview && (
              <img className={styles.previewImage} src={preview} alt={`Image of ${form.name}`} />
            )}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIcon}><CircleDollarSign size={18} /></span>
            <div><h2>Pricing & stock</h2><p>Set the product's prices and starting quantities.</p></div>
          </div>
          <div className={styles.fields}>
            <InputField label="Cost price" icon={CircleDollarSign} name="costPrice" type="number" placeholder="0.00" value={String(form.costPrice || "")} onFieldChanged={update("costPrice")} />
            <InputField label="Selling price" icon={CircleDollarSign} name="sellingPrice" type="number" placeholder="0.00" value={String(form.sellingPrice || "")} onFieldChanged={update("sellingPrice")} />
            <InputField label="Current stock" icon={Boxes} name="currentStock" type="number" placeholder="0" value={String(form.currentStock || "")} onFieldChanged={update("currentStock")} />
            <InputField label="Minimum stock" icon={Boxes} name="minimumStock" type="number" placeholder="0" value={String(form.minimumStock || "")} onFieldChanged={update("minimumStock")} />
            <InputField label="Reserved stock" icon={Boxes} name="reservedStock" type="number" placeholder="0" value={String(form.reservedStock || "")} onFieldChanged={update("reservedStock")} />
            <InputField label="Status" icon={Package} name="status" type="select" value={form.status} options={statusOptions} onFieldChanged={() => {}} onSelectChanged={(value) => setForm((current) => ({ ...current, status: value as Product["status"] }))} />
          </div>
        </section>
        
        <div id={styles.buttonArea}>
          <button className={styles.backButton} type="button" onClick={() => navigate("/products")}>Cancel</button>
          <SubmitButton name="Create product" />
        </div>

      </form>
      </div>
    </main>
  );
}
